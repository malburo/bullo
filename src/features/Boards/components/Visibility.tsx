import { Popover } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: "1px solid",
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      maxWidth: 250,
    },
  })
);

interface VisibilityProps {
  onChangeVisibility: (isPrivate: boolean) => any;
}

const Visibility: React.FC<VisibilityProps> = ({ onChangeVisibility }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClickPublic = () => {
    onChangeVisibility(false);
    setAnchorEl(null);
  };
  const handleClickPrivate = () => {
    onChangeVisibility(true);
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        startIcon={<LockIcon />}
        fullWidth
      >
        Private
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ButtonGroup variant="contained" color="default" aria-label="">
          <Button onClick={handleClickPublic}>Public</Button>
          <Button onClick={handleClickPrivate}>Private</Button>
        </ButtonGroup>
      </Popover>
    </div>
  );
};

export default Visibility;
