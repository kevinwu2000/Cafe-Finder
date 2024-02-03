import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import * as fs from 'fs'
import * as CryptoJS from 'crypto-js';
import mongo from './mongo';
import {UserModel, RestaurantModel} from './models/models';
//import cors from "cors";
//import express from "express";
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Restaurant from './resolvers/Restaurant';

/*const password = 123456;
const secretKey = "mySecretKey";
const encrypt = CryptoJS.AES.encrypt(password.toString(),secretKey);
console.log(encrypt.toString());
const decrypt = CryptoJS.AES.decrypt(encrypt,secretKey);
console.log(decrypt.toString(CryptoJS.enc.Utf8));*/

mongo.connect();

/*const app = express();
app.use(cors());
app.use(express.json());*/

const pubsub = createPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8'
    ),
    resolvers: {
      Query,
      Mutation,
      User,
      Restaurant,
    },
  }),
  context: {
    UserModel, 
    RestaurantModel,
    pubsub,
  },
  /*graphqlEndpoint: process.env.NODE_ENV === "production"
  ? "/api"
  : "/graphql",   // uncomment this to send the app to: 4000/
  graphiql: {
    subscriptionsProtocol: 'WS',
  },*/
});

const server = createServer(yoga)

const wsServer = new WebSocketServer({
  server: server,
  path: yoga.graphqlEndpoint,
})

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
  },
  wsServer,
)

const port = process.env.PORT || 4000;
server.listen({port}, () => {
  console.log(`The server is up on port ${port}!`);
});

/* 
import { WebSocketServer } from 'ws'
const server = createServer(yoga)

const wsServer = new WebSocketServer({
  server: server,
  path: yoga.graphqlEndpoint,
})
const app = express();
if(process.env.NODE_DEV == "development")app.use(cors());

const port = process.env.PORT || 4000;
app.use('/api',wsServer)
*/
