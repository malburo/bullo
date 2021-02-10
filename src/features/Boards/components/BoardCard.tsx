import { Avatar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Link } from "react-router-dom";
import { Board } from "../../../graphql/Queries";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "280px",
    maxHeight: "280px",
    padding: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
  },
  media: {
    height: "130px",
    borderRadius: "12px",
  },
});

interface Props {
  data: Board;
}

const BoardCard: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Link to={`/board/${data.id}`}>
        <CardMedia
          className={classes.media}
          image={data.coverUrl}
          title="Contemplative Reptile"
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {data.title}
        </Typography>
      </CardContent>
      <AvatarGroup max={3}>
        {data.members.map((member) => (
          <Avatar variant="rounded" src={member.profilePictureUrl} />
        ))}
      </AvatarGroup>
    </Card>
  );
};
export default BoardCard;
