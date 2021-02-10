import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "../../components/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AuthFeature: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/login`} component={Login} />
      <Route exact path={`${match.url}/register`} component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AuthFeature;
