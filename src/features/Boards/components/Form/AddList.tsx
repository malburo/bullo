import { useMutation } from "@apollo/client";
import { Button, Popover } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import InputField from "../../../../components/form-control/InputField";
import { CREATE_LIST } from "../../../../graphql/Mutations";
import { GET_BOARD } from "../../../../graphql/Queries";

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
  listLength: number;
}

const AddList: React.FC<Props> = ({ listLength }) => {
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
          pos: listLength,
          boardId,
        },
      },
    });
  };
  return (
    <div style={{ display: "inline-block", position: "absolute" }}>
      <AddButton
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        endIcon={<AddIcon />}
      >
        Add List
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

export default AddList;
