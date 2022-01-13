import { gql } from "graphql-tag";

export const ADD_LIST = gql`
	mutation AddList($input: AddListInput!) {
		addList(input: $input) {
			id
			title
			tasks {
				id
				title
				description
				completed
			}
		}
	}
`;

export const UPDATE_LIST = gql`
	mutation Mutation($input: UpdateListInput!) {
		updateList(input: $input)
	}
`;

export const DELETE_LIST = gql`
	mutation DeleteList($deleteListId: Int!) {
		deleteList(id: $deleteListId)
	}
`;

export const ADD_TASK = gql`
	mutation Mutation($input: AddTaskInput!) {
		addTask(input: $input)
	}
`;

export const UPDATE_TASK = gql`
	mutation UpdateTask($input: UpdateTaskDetail!) {
		updateTask(input: $input)
	}
`;

export const DELETE_TASK = gql`
	mutation Mutation($deleteTaskId: Int!) {
		deleteTask(id: $deleteTaskId)
	}
`;
