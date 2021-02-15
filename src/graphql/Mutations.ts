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
export const ADD_MEMBER_MUTATION = gql`
  mutation addMember($input: addMemberInput!) {
    addMember(input: $input) {
      id
      username
    }
  }
`;
