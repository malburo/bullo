import { Box, Grid, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IList, ITask } from "../../../graphql/Queries";
import AddTask from "./Form/AddTask";
import TaskCard from "./TaskCard";

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    userSelect: "none",
    marginRight: "50px",
    ...draggableStyle,
  };
};

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

interface Props {
  data: IList;
  index: number;
}
const ListCard: React.FC<Props> = ({ data, index }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div style={{ display: "inline-block", verticalAlign: "top" }}>
          <Box>
            <div
              {...provided.draggableProps}
              ref={provided.innerRef}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <div
                {...provided.dragHandleProps}
                style={getListStyle(snapshot.isDragging)}
              >
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography>{data.title}</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizIcon />
                  </Grid>
                </Grid>
                <Box bgcolor="#F8F9FD" borderRadius="12px">
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
          </Box>
        </div>
      )}
    </Draggable>
  );
};
export default ListCard;
