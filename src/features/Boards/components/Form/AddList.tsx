import { useMutation } from "@apollo/client";
import { Box, Button, Grid, InputBase } from "@material-ui/core";
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
import MyBox from "../../../../components/common/MyBox";
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
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggle(true);
  };
  const handleCancel = () => {
    setIsToggle(false);
  };
  const [addMember] = useMutation(CREATE_LIST, {
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
    <div>
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
                placeholder="Enter a title for this list..."
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
    </div>
  );
};

export default AddList;
