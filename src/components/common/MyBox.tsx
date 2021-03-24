import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
});

const MyBox: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Card className={classes.root}>{children}</Card>;
};

export default MyBox;
