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

export const CREATE_LIST = gql`
  mutation createList($input: createListInput!) {
    createList(input: $input) {
      id
    }
  }
`;
export const CREATE_TASK = gql`
  mutation createTask($input: createTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`;

export const UPDATE_POS_LIST = gql`
  mutation updatePosList($input: updatePosListInput!) {
    updatePosList(input: $input) {
      message
    }
  }
`;

export const UPDATE_POS_TASK = gql`
  mutation updatePosTask($input: updatePosTaskInput!) {
    updatePosTask(input: $input) {
      message
    }
  }
`;
