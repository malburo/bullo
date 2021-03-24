import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import MyBox from "../../../components/common/MyBox";
import { ITask } from "../../../graphql/Queries";

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    userSelect: "none",
    margin: `0 0 24px 0`,
    ...draggableStyle,
  };
};

export const getTasktStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: 250,
});

const useStyles = makeStyles({
  cover: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: "inherit",
  },
});
interface Props {
  data: ITask;
  index: number;
}
const TaskCard: React.FC<Props> = ({ data, index }: any) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <MyBox>
            <img
              src="https://avatars3.githubusercontent.com/u/22362391?v=4"
              alt="asd"
              className={classes.cover}
            />
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, 😁
            </Typography>
          </MyBox>
        </div>
      )}
    </Draggable>
  );
};
export default TaskCard;
