import { useMutation } from "@apollo/client";
import { Button, Popover } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import InputField from "../../../../components/form-control/InputField";
import { ADD_MEMBER_MUTATION } from "../../../../graphql/Mutations";
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

interface FormValues {
  search: string;
}
interface Params {
  boardId: string;
}
const AddMember: React.FC = () => {
  const classes = useStyles();
  const { boardId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [addMember] = useMutation(ADD_MEMBER_MUTATION, {
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
    addMember({
      variables: {
        input: {
          email: values.search,
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
      />
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
        </div>
      </Popover>
    </div>
  );
};

export default AddMember;
