import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($input: createBoardInput!) {
    createBoard(input: $input) {
      id
      coverUrl
      title
      members {
        profilePictureUrl
      }
    }
  }
`