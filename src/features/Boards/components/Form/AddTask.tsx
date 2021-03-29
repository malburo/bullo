import { useMutation } from "@apollo/client";
import { Box, Button, Grid, InputBase, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MyBox from "../../../../components/common/MyBox";
import { CREATE_TASK } from "../../../../graphql/Mutations";
import { GET_BOARD } from "../../../../graphql/Queries";

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

const AddTask: React.FC<Props> = ({ listId, taskLength }) => {
  const { boardId } = useParams<Params>();
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const handleClick = () => {
    setIsToggle(true);
  };
  const handleCancel = () => {
    setIsToggle(false);
  };
  const [addTask] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: { id: boardId },
      },
    ],
  });

  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (values: FormValues) => {
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
    <>
      {isToggle || (
        <AddButton
          onClick={handleClick}
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add another card
        </AddButton>
      )}
      {isToggle && (
        <MyBox>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <InputBase
                name="title"
                placeholder="Enter a title for this card..."
                inputRef={form.register}
              />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                width="100%"
                marginTop="12px"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 12 }}
                >
                  save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                >
                  cancel
                </Button>
              </Box>
            </Grid>
          </form>
        </MyBox>
      )}
    </>
  );
};

export default AddTask;
