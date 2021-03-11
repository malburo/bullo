import { useMutation } from "@apollo/client";
import { Button, Popover } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import InputField from "../../../../components/form-control/InputField";
import { CREATE_TASK } from "../../../../graphql/Mutations";
import { GET_BOARD } from "../../../../graphql/Queries";
import AddIcon from "@material-ui/icons/Add";

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
const AddButton = withStyles({
  root: {
    background: "#DAE4FD",
    borderRadius: 8,
    color: "#2F80ED",
    height: 32,
    width: 250,
    padding: "8px 15px",
    boxShadow: "none",
  },
  label: {
    justifyContent: "space-between",
  },
})(Button);

interface FormValues {
  title: string;
}
interface Params {
  boardId: string;
}

interface Props {
  listId: string;
  taskLength: number;
}

const AddTask: React.FC<Props> = ({ listId, taskLength }) => {
  const classes = useStyles();
  const { boardId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [addTask] = useMutation(CREATE_TASK, {
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
      search: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    addTask({
      variables: {
        input: {
          title: values.title,
          pos: taskLength,
          listId,
        },
      },
    });
  };
  return (
    <div>
      <AddButton
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        endIcon={<AddIcon />}
      >
        Add another card
      </AddButton>
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

export default AddTask;
