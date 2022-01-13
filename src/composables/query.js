import { gql } from "graphql-tag";

export const ALL_LIST_QUERY = gql`
	query Query {
		lists {
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

export const ADD_LIST_QUERY = gql`
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

export const UPDATE_LIST_QUERY = gql`
	mutation Mutation($input: UpdateListInput!) {
		updateList(input: $input)
	}
`;

export const DELETE_LIST_QUERY = gql`
	mutation DeleteList($deleteListId: Int!) {
		deleteList(id: $deleteListId)
	}
`;

export const ADD_TASK_QUERY = gql`
	mutation Mutation($input: AddTaskInput!) {
		addTask(input: $input)
	}
`;

export const UPDATE_TASK_QUERY = gql`
	mutation UpdateTask($input: UpdateTaskDetail!) {
		updateTask(input: $input)
	}
`;

export const DELETE_TASK_QUERY = gql`
	mutation Mutation($deleteTaskId: Int!) {
		deleteTask(id: $deleteTaskId)
	}
`;
