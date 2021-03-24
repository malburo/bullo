import { Box, Button, Grid, Typography, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IList, ITask } from "../../../graphql/Queries";
import AddTask from "./Form/AddTask";
import TaskCard from "./TaskCard";

const AddButton = withStyles({
  root: {
    background: "#DAE4FD",
    borderRadius: 8,
    color: "#2F80ED",
    height: 32,
    width: 250,
    padding: "8px 15px",
    boxShadow: "none",
  },
  label: {
    justifyContent: "space-between",
  },
})(Button);

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
  "&:hover": {
    background: "black",
  },
});

interface Props {
  data: IList;
  index: number;
}
const ListCard: React.FC<Props> = ({ data, index }) => {
  const [isHiddenAddTask, setIsHiddenAddTask] = useState<boolean>(true);
  const [isHiddenAddList, setIsHiddenAddList] = useState<boolean>(true);
  const handleClickAddTaskButton = () => {
    setIsHiddenAddTask((prev) => !prev);
  };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <Box display="inline-block" style={{ verticalAlign: "top" }}>
          <Box>
            <div
              {...provided.draggableProps}
              ref={provided.innerRef}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <Box>
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
                </Box>
              </Box>
              {isHiddenAddTask || (
                <AddTask listId={data.id} taskLength={data.tasks.length} />
              )}
              <AddButton
                onClick={handleClickAddTaskButton}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Add another card
              </AddButton>
            </div>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
export default ListCard;
