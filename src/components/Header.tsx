import { Avatar, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ViewListIcon from "@material-ui/icons/ViewList";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../public/Logo-small.svg";
import Search from "./Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
      backgroundColor: "#FFF",
      color: "black",
      fontSize: 18,
    },
    bullo: {
      fontWeight: 600,
      margin: "0px 100px 0px 20px",
    },
    boardName: {
      fontWeight: 500,
    },
    line: {
      width: 35,
      border: "1px solid #E0E0E0",
      transform: "rotate(90deg)",
    },
    search: {
      marginLeft: "auto",
      marginRight: 40,
    },
    avatar: {},
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const history = useHistory( );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <img src={Logo} alt="logo" />
        <Typography className={classes.bullo} variant="h6" noWrap>
          Bullo
        </Typography>
        <Typography className={classes.boardName} variant="h6" noWrap>
          Devchanllenge Board
        </Typography>
        <div className={classes.line} />
        <Button
          color="secondary"
          startIcon={<ViewListIcon />}
          onClick={() => history.push("/boards")}
        >
          All Boards
        </Button>
        <div className={classes.search}>
          <Search />
        </div>
        <div className={classes.avatar}>
          <Avatar
            variant="rounded"
            onClick={handleProfileMenuOpen}
            src="https://avatars3.githubusercontent.com/u/22362391?v=4"
          />
        </div>
      </Toolbar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
