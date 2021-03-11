import { Box, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IList, ITask } from "../../../graphql/Queries";
import AddTask from "./Form/AddTask";
import TaskCard from "./TaskCard";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "20px",
    },
  })
);

interface Props {
  data: IList;
  index: number;
}
const ListCard: React.FC<Props> = ({ data, index }) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div style={{ display: "inline-block", verticalAlign: "top" }}>
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div className={classes.root} {...provided.dragHandleProps}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography>{data.title}</Typography>
                </Grid>
                <Grid item>
                  <MoreHorizIcon />
                </Grid>
              </Grid>
              <Box bgcolor="#F8F9FD" padding="30px" borderRadius="12px">
                <Droppable droppableId={data.id} type="tasks">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {data.tasks.map((item: ITask, index: number) => {
                        return (
                          <TaskCard key={item.id} data={item} index={index} />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <AddTask listId={data.id} taskLength={data.tasks.length} />
              </Box>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default ListCard;
