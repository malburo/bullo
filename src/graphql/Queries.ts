import { gql } from "@apollo/client";

export interface Board {
  id: string;
  coverUrl: string;
  title: string;
  members: User[];
  admin: User;
}
export interface User {
  id: string;
  username: string;
  email: string;
  profilePictureUrl: string;
}
export const GET_ME_QUERIES = gql`
  query getMe {
    id
    email
    username
    profilePictureUrl
  }
`;

export const GET_BOARDS = gql`
  query getBoards {
    boards {
      id
      coverUrl
      title
      admin {
        id
        profilePictureUrl
      }
      members {
        profilePictureUrl
      }
    }
  }
`;

export const GET_BOARD = gql`
  query getBoard($id: ID!) {
    board(id: $id) {
      id
      isPrivate
      title
      members {
        id
        profilePictureUrl
      }
      lists {
        id
        title
        cards {
          id
          coverUrl
          title
          members {
            id
            profilePictureUrl
          }
          labels {
            id
            name
            color
          }
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers{
    users {
      id
      username
    }
  }
`