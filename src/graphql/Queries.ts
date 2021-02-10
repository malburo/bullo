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
