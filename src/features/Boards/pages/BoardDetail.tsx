/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "@apollo/client";
import { Avatar, Button, Grid, makeStyles } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { UPDATE_POS_LIST, UPDATE_POS_TASK } from "../../../graphql/Mutations";
import { GET_BOARD, IList, User } from "../../../graphql/Queries";
import { findItemFromArray } from "../../../utils";
import AddList from "../components/Form/AddList";
import AddMember from "../components/Form/AddMember";
import ListCard from "../components/ListCard";
import { AvatarGroup } from "@material-ui/lab";
const useStyles = makeStyles({
  root: {
    margin: 24,
  },
  avatar: {
    marginRight: 8,
    marginLeft: 8,
  },
});

interface Params {
  boardId: string;
}

const BoardDetail: React.FC = (): any => {
  const classes = useStyles();
  const { boardId } = useParams<Params>();
  const [lists, setLists] = useState<IList[]>([]);
  const [isDrag, setIsDrag] = useState(false);

  const { loading, error, data } = useQuery(GET_BOARD, {
    variables: { id: boardId },
  });
  const [updatePosList] = useMutation(UPDATE_POS_LIST);
  const [updatePosTask] = useMutation(UPDATE_POS_TASK);
  useEffect(() => {
    if (!loading && data) {
      setLists(data.board.lists);
    }
  }, [loading, data]);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error! ${error}</p>;

  const onDragStart = () => {
    setIsDrag(true);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      setIsDrag(false);
      return;
    }
    const listsClone: IList[] = [...lists];
    if (type === "lists") {
      updatePosList({
        variables: {
          input: {
            boardId,
            listId: draggableId,
            destination: destination.index,
            source: source.index,
          },
        },
      });
      const list = listsClone.splice(source.index, 1);
      listsClone.splice(destination.index, 0, ...list);
      setLists(listsClone);
      setIsDrag(false);
      return;
    }
    const [listStart, listStartIndex]: any = findItemFromArray(
      listsClone,
      source.droppableId
    );
    if (destination.droppableId === source.droppableId) {
      updatePosTask({
        variables: {
          input: {
            taskId: draggableId,
            destination,
            source,
          },
        },
      });
      const tasks = [...listStart.tasks];
      const task = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, ...task);
      listsClone[listStartIndex] = { ...listStart, tasks };
      setLists(listsClone);
      setIsDrag(false);
      return;
    }
    updatePosTask({
      variables: {
        input: {
          taskId: draggableId,
          source,
          destination,
        },
      },
    });
    const [listEnd, listEndIndex]: any = findItemFromArray(
      listsClone,
      destination.droppableId
    );
    const tasksStart = [...listStart.tasks];
    const tasksEnd = [...listEnd.tasks];
    const task = tasksStart.splice(source.index, 1);
    tasksEnd.splice(destination.index, 0, ...task);
    listsClone[listStartIndex] = { ...listStart, tasks: tasksStart };
    listsClone[listEndIndex] = { ...listEnd, tasks: tasksEnd };
    setLists(listsClone);
    setIsDrag(false);
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Button color="secondary" startIcon={<LockIcon />}>
          Private
        </Button>
        <AvatarGroup max={10} classes={{ avatar: classes.avatar }}>
          {data.board.members.map((member: User) => (
            <Avatar
              variant="rounded"
              src={member.profilePictureUrl}
              key={member.id}
            />
          ))}
        </AvatarGroup>
        <AddMember />
      </Grid>
      <div>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable
            droppableId="all-lists"
            direction="horizontal"
            type="lists"
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div style={{ whiteSpace: "nowrap" }}>
                  {lists.map((item: IList, index: number) => (
                    <ListCard data={item} index={index} key={item.id} />
                  ))}
                  {provided.placeholder}
                  {isDrag || (
                    <AddList listLength={data?.board?.lists?.length} />
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardDetail;
