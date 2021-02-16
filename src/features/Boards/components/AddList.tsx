import { useMutation } from "@apollo/client";
import { Button, Popover } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import InputField from "../../../components/form-control/InputField";
import { CREATE_LIST } from "../../../graphql/Mutations";
import { GET_BOARD } from "../../../graphql/Queries";

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

interface FormValues {
  title: string;
}
interface Params {
  boardId: string;
}
const AddList: React.FC = () => {
  const classes = useStyles();
  const { boardId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [addMember] = useMutation(CREATE_LIST, {
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: { id: boardId },
      },
    ],
  });
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
      title: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    addMember({
      variables: {
        input: {
          title: values.title,
          boardId,
        },
      },
    });
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
        Add List
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
            <InputField name="title" form={form} />
          </form>
        </div>
      </Popover>
    </div>
  );
};

export default AddList;
