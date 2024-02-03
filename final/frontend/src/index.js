import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HookProvider} from './container/hooks/Hooks';
import {ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HookProvider>
        <App />
      </HookProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/*process.env.NODE_ENV === "production"
  ? "/api"
  : "http://localhost:4000/graphql",//'http://localhost:4000/graphql',*/