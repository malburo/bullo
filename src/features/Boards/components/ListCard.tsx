import { Box, Grid, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IList, ITask } from "../../../graphql/Queries";
import AddTask from "./Form/AddTask";
import TaskCard from "./TaskCard";

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    userSelect: "none",
    marginRight: "32px",
    ...draggableStyle,
  };
};

export const getListStyle = (isDraggingOver: boolean) => ({
  background: "rgb(248, 249, 253)",
  marginBottom: "12px",
});

interface Props {
  data: IList;
  index: number;
}
const ListCard: React.FC<Props> = ({ data, index }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Grid
            container
            justify="space-between"
            {...provided.dragHandleProps}
            style={getListStyle(snapshot.isDragging)}
          >
            <Grid item>
              <Typography>{data.title}</Typography>
            </Grid>
            <Grid item>
              <MoreHorizIcon />
            </Grid>
          </Grid>
          <Box borderRadius="8px">
            <Droppable
              droppableId={data.id}
              type="tasks"
              isCombineEnabled={true}
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Box
                    style={{
                      height: "60vh",
                      overflowX: "hidden",
                      overflowY: "scroll",
                    }}
                  >
                    {data.tasks.map((item: ITask, index: number) => {
                      return (
                        <TaskCard key={item.id} data={item} index={index} />
                      );
                    })}
                    {provided.placeholder}
                    <AddTask listId={data.id} taskLength={data.tasks.length} />
                  </Box>
                </div>
              )}
            </Droppable>
          </Box>
        </div>
      )}
    </Draggable>
  );
};
export default ListCard;
