import { Route, Switch } from "react-router-dom";
import Header from "../../components/Header";
import BoardDetail from "./pages/BoardDetail";
import Boards from "./pages/Boards";

const BoardFeature: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={`/boards`} component={Boards} />
        <Route path={`/board/:boardId`} component={BoardDetail} />
        <Route path={`/card/:cardId`} component={BoardDetail} />
      </Switch>
    </>
  );
};

export default BoardFeature;
