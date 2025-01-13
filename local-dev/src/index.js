import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import * as fs from 'fs'
import * as CryptoJS from 'crypto-js';
import mongo from './mongo';
import {UserModel, RestaurantModel} from './models/models';
import cors from "cors";
import express from "express";
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Restaurant from './resolvers/Restaurant';
import path from "path";
/*const password = 123456;
const secretKey = "mySecretKey";
const encrypt = CryptoJS.AES.encrypt(password.toString(),secretKey);
console.log(encrypt.toString());
const decrypt = CryptoJS.AES.decrypt(encrypt,secretKey);
console.log(decrypt.toString(CryptoJS.enc.Utf8));*/

mongo.connect();



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





const port = process.env.PORT || 4000;


const app = express();
app.use(cors());
app.use(express.json());
const __dirname = path.resolve();


const server = createServer(app);

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




app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});

app.use('/graphql', yoga);


server.listen({port}, () => {
  console.log(`The server is up on port ${port}!`);
});
