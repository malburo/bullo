import { Button, Grid, Popover } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-control/InputField";
import ImageIcon from "@material-ui/icons/Image";

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

interface Photo {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

interface FormValues {
  search: String;
}

interface SearchPhotoProps {
  onSelectPhoto: (photoUrl: string) => any;
}

const SearchPhoto: React.FC<SearchPhotoProps> = ({ onSelectPhoto }) => {
  const classes = useStyles();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${values.search}&client_id=W303w_kojjo6CfWav2VMJTtRKB1H2rMKGx6HKxU404Y`
    );
    const photos = await response.json();
    setPhotos(photos.results);
  };
  const handleSelectPhoto = (photoUrl: string) => {
    onSelectPhoto(photoUrl);
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        startIcon={<ImageIcon />}
        fullWidth
      >
        Cover
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
        <div className={classes.paper}>
          <form id="update-form" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField name="search" form={form} />
          </form>
          <Grid container spacing={1}>
            {photos.length > 0 &&
              photos.map((photo) => (
                <Grid item xs={4}>
                  <img
                    src={photo.urls.small}
                    alt={photo.id}
                    style={{ width: "100%", height: 75, objectFit: "cover" }}
                    onClick={(e) => handleSelectPhoto(photo.urls.small)}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </Popover>
    </div>
  );
};

export default SearchPhoto;
