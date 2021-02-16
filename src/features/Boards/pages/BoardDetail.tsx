/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@apollo/client";
import { Avatar, Button, Grid, makeStyles } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Route, Switch, useParams } from "react-router-dom";
import { GET_BOARD, IList, User } from "../../../graphql/Queries";
import AddList from "../components/AddList";
import AddMember from "../components/AddMember";
import List from "../components/List";
import CardDetailModal from "./CardDetailModal";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#F8F9FD",
    borderRadius: "24px",
    margin: 24,
  },
});

interface Params {
  boardId: string;
}

const BoardDetail: React.FC = (): any => {
  const classes = useStyles();
  const { boardId } = useParams<Params>();
  const { loading, error, data } = useQuery(GET_BOARD, {
    variables: { id: boardId },
  });
  console.log(data);
  if (loading) return <p>loading</p>;
  if (error) return <p>Error! ${error}</p>;
  // const [lists, setLists] = useState([]);
  // useEffect(() => {
  //   if (loading === false && data) {
  //     setLists(data.board.lists);
  //   }
  // }, [loading, data]);
  const onDragEnd = () => {};
  // const onDragEnd = (result: DropResult) => {
  //   const { destination, source, type } = result;
  //   if (!destination) return;
  //   const listsClone: any = [...lists];
  //   if (type === "lists") {
  //     const list = listsClone.splice(source.index, 1);
  //     listsClone.splice(destination.index, 0, ...list);
  //     setLists(listsClone);
  //     return;
  //   }
  //   const [listStart, listStartIndex]: any = findItemFromArray(
  //     listsClone,
  //     source.droppableId
  //   );
  //   const [listEnd, listEndIndex]: any = findItemFromArray(
  //     listsClone,
  //     destination.droppableId
  //   );
  //   if (destination.droppableId === source.droppableId) {
  //     const cards = [...listStart.cards];
  //     const card = cards.splice(source.index, 1);
  //     cards.splice(destination.index, 0, ...card);
  //     const newList = { ...listStart, cards };
  //     listsClone[listStartIndex] = newList;
  //   } else {
  //     const cardsStart = [...listStart.cards];
  //     const cardsEnd = [...listEnd.cards];
  //     const card = cardsStart.splice(source.index, 1);
  //     cardsEnd.splice(destination.index, 0, ...card);
  //     const newListStart = { ...listStart, cards: cardsStart };
  //     const newListEnd = { ...listEnd, cards: cardsEnd };
  //     listsClone[listStartIndex] = newListStart;
  //     listsClone[listEndIndex] = newListEnd;
  //   }
  //   setLists(listsClone);
  // };
  return (
    <div className={classes.root}>
      <AddList />
      <Switch>
        <Route path={`/card/:cardId`} component={CardDetailModal} />
      </Switch>
      <Grid container>
        <Button color="secondary" startIcon={<LockIcon />}>
          Private
        </Button>
        <AvatarGroup max={10}>
          {data.board.members.map((member: User) => (
            <Avatar variant="rounded" src={member.profilePictureUrl} />
          ))}
        </AvatarGroup>
        <AddMember />
      </Grid>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="lists">
          {(provided) => (
            <Grid
              container
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.board.lists.map((item: IList, index: number) => (
                <List data={item} index={index} key={item.id} />
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardDetail;
