import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../../../graphql/Queries";

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    userSelect: "none",
    margin: `0 0 50px 0`,
    ...draggableStyle,
  };
};

export const getTasktStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 30,
  width: 250,
});

const useStyles = makeStyles({
  root: {
    width: 250,
    padding: 16,
    borderRadius: 12,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
    whiteSpace: "normal",
    boxSizing: "border-box",
    transition: "all 0.2s",
  },
  cover: {
    width: "100%",
    height: 130,
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
          <Card className={classes.root}>
            <img
              src="https://avatars3.githubusercontent.com/u/22362391?v=4"
              alt="asd"
              className={classes.cover}
            />
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica😁
            </Typography>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
export default TaskCard;
