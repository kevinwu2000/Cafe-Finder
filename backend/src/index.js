import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import * as fs from 'fs';
import mongo from './mongo.js';
import { UserModel, RestaurantModel } from './models/models.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import User from './resolvers/User.js';
import Restaurant from './resolvers/Restaurant.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

mongo.connect();

const pubsub = createPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      path.resolve('./backend/src/schema.graphql'),
      'utf-8'
    ),
    resolvers: {
      Query,
      Mutation,
      User,
      Restaurant,
    },
  }),
  graphqlEndpoint: '/graphql',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
  },
  context: {
    UserModel,
    RestaurantModel,
    pubsub,
  },
});

const server = createServer(yoga);

const wsServer = new WebSocketServer({
  server,
  path: yoga.graphqlEndpoint,
});

useServer({
  execute: (args) => args.rootValue.execute(args),
  subscribe: (args) => args.rootValue.subscribe(args),
  onSubscribe: async (ctx, msg) => {
    const { schema, execute, subscribe, contextFactory, parse, validate } =
      yoga.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params: msg.payload,
      });

    const args = {
      schema,
      operationName: msg.payload.operationName,
      document: parse(msg.payload.query),
      variableValues: msg.payload.variables,
      contextValue: await contextFactory(),
      rootValue: {
        execute,
        subscribe,
      },
    };

    const errors = validate(args.schema, args.document);
    if (errors.length) return errors;
    return args;
  },
}, wsServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  const app = express();

  const buildPath = path.join(__dirname, '../../frontend/build');
  app.use(express.static(buildPath));

  // Serve React app for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  server.on('request', (req, res) => {
    if (req.url.startsWith('/graphql')) {
      yoga.handleNodeRequest(req, res);
    } else {
      app(req, res);
    }
  });
}

const port = process.env.PORT || 4000;
server.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});