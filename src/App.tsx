import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Route, Switch } from "react-router-dom";
import AuthFeature from "./features/Auth";
import BoardFeature from "./features/Boards";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/auth" component={AuthFeature} />
        <Route path="/" component={BoardFeature} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
