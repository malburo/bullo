import { Box, Grid, Popover, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import React, { useState } from "react";

const EditVisibility: React.FC = () => {
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
    setAnchorEl(null);
  };
  const handleClickPrivate = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        startIcon={<LockIcon />}
        style={{ marginRight: "16px" }}
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
        <Box padding="20px" border="1px solid #E0E0E0" borderRadius="10px">
          <Typography variant="h6" color="initial">
            Visibility
          </Typography>
          <Typography variant="subtitle2" color="initial">
            Choose who can see to this board.
          </Typography>
          <Box>
            <Grid container alignItems="center">
              <LockIcon />
              <Typography variant="h6" color="initial">
                Public
              </Typography>
            </Grid>
            <Typography variant="subtitle2" color="initial">
              Anyone on the internet can see this.
            </Typography>
          </Box>
          <Box>
            <Grid container alignItems="center">
              <LockIcon />
              <Typography variant="h6" color="initial">
                Private
              </Typography>
            </Grid>
            <Typography variant="subtitle2" color="initial">
              Anyone on the internet can see this.
            </Typography>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default EditVisibility;
