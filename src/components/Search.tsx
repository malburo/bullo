import { Button } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      borderRadius: 12,
    },
    input: {
      position: "relative",
      width: 300,
      height: 36,
      margin: "0px 20px",
    },
    iconButton: {
      position: "absolute",
      right: 0,
    },
  })
);

const Search: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <InputBase placeholder="Keyword..." className={classes.input} />

      <Button color="primary" variant="contained" type="submit">
        Search
      </Button>
    </div>
  );
};

export default Search;
