import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IList, ITask } from "../../../graphql/Queries";
import Task from "./Task";
import AddTask from "./AddTask";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
      padding: "40px",
      height: "68vh",
    },
  })
);

interface Props {
  data: IList;
  index: number;
}
const List: React.FC<Props> = ({ data, index }: any) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <Grid item xs={3} {...provided.draggableProps} ref={provided.innerRef}>
          <div className={classes.root} {...provided.dragHandleProps}>
            <Typography>{data.title}</Typography>
            <Droppable droppableId={data.id} type="tasks">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {data.tasks.map((item: ITask, index: number) => {
                    return <Task key={item.id} data={item} index={index} />;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <AddTask listId={data.id} />
        </Grid>
      )}
    </Draggable>
  );
};
export default List;
