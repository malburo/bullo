import { makeStyles } from "@material-ui/core";
import Header from "./Header";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  wrapper: {
    fontFamily: "Noto Sans,sans-serif",
    marginTop: 160,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function NotFound() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <p>
          Sorry, this page isn't available. Go back to{" "}
          <Link to="/">
            <span>Bullo app</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default NotFound;
