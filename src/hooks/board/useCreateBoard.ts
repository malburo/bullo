import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "../../graphql/Mutations";
import { GET_BOARDS } from "../../graphql/Queries";

interface CreateBoardInput {
  variables: {
    input: {
      title: string;
      isPrivate: boolean;
      description: string;
      coverUrl: string;
    };
  };
}

export const useCreateBoard = (): ((
  createBoardInput: CreateBoardInput
) => any) => {
  const [createBoard] = useMutation(CREATE_BOARD, {
    update: (store, { data }) => {
      const boardData: any = store.readQuery({ query: GET_BOARDS });
      store.writeQuery({
        query: GET_BOARDS,
        data: {
          boards: [...boardData.boards, data.createBoard],
        },
      });
    },
  });
  return createBoard;
};
