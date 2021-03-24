import { useMutation } from "@apollo/client";
import { Button, Grid, InputBase } from "@material-ui/core";
import React from "react";
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

const AddTask: React.FC<Props> = ({ listId, taskLength }) => {
  const { boardId } = useParams<Params>();

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
          <Button type="submit" variant="contained" color="primary">
            save
          </Button>
        </Grid>
      </form>
    </MyBox>
  );
};

export default AddTask;
