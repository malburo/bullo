import { gql } from "@apollo/client";

export const GET_BOARDS = gql`
  query getBoards {
    boards {
      id
      coverUrl
      title
      members {
        profilePictureUrl
      }
    }
  }
`;