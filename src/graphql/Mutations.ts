import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($input: loginInput!) {
    login(input: $input) {
      access_token
    }
  }
`;
export const REGISTER_MUTATION = gql`
  mutation register($input: registerInput!) {
    register(input: $input) {
      access_token
    }
  }
`;

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
`;
export const UPDATE_MEMBERS_MUTATION = gql`
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
`;
