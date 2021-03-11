import { Box, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/form-control/InputField";
import { useCreateBoard } from "../../../../hooks/board/useCreateBoard";
import SearchPhoto from "./SearchPhoto";
import Visibility from "../Visibility";

interface FormValues {
  title: string;
}

const AddBoard = () => {
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const createBoard = useCreateBoard();
  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSelectPhoto = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };
  const onChangeVisibility = (isPrivate: boolean) => {
    setIsPrivate(isPrivate);
  };
  const onSubmit = ({ title }: FormValues) => {
    createBoard({
      variables: {
        input: {
          title,
          coverUrl: selectedPhoto,
          isPrivate,
        },
      },
    });
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box width={400} padding="24px">
          {selectedPhoto ? (
            <img
              src={`${selectedPhoto}`}
              alt="selectedPhoto"
              style={{ height: 200, objectFit: "cover", width: "100%" }}
            />
          ) : (
            <img
              src={`https://images.unsplash.com/photo-1561948955-570b270e7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDM1NTJ8MHwxfHNlYXJjaHwyfHxjYXR8ZW58MHx8fA&ixlib=rb-1.2.1&q=80&w=400`}
              alt="cover"
              style={{ height: 200, objectFit: "cover", width: "100%" }}
            />
          )}
          <DialogContent>
            <form id="update-form" onSubmit={form.handleSubmit(onSubmit)}>
              <InputField name="title" form={form} />
            </form>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <SearchPhoto onSelectPhoto={onSelectPhoto} />
              </Grid>
              <Grid item xs={6}>
                <Visibility onChangeVisibility={onChangeVisibility} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" form="update-form" color="primary">
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddBoard;
