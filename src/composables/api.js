import { useApolloClient } from "@vue/apollo-composable";
import { onMounted, ref } from "@vue/composition-api";
import {
	ALL_LIST_QUERY,
	ADD_LIST_QUERY,
	DELETE_LIST_QUERY,
	UPDATE_LIST_QUERY,
	ADD_TASK_QUERY,
	UPDATE_TASK_QUERY,
	DELETE_TASK_QUERY,
} from "./query";

export default function api() {
	const apolloClient = useApolloClient().client;
	const title = ref("");
	const dialog = ref(false);
	const lists = ref([]);
	async function getAllList() {
		let res = (
			await apolloClient.query({
				query: ALL_LIST_QUERY,
				fetchPolicy: "network-only",
			})
		).data.lists;
		lists.value = res;
	}
	async function addList() {
		dialog.value = false;
		await apolloClient.mutate({
			mutation: ADD_LIST_QUERY,
			variables: {
				input: {
					title: title.value,
				},
			},
		});
		title.value = "";
		getAllList();
	}
	async function deleteList(id) {
		await apolloClient.mutate({
			mutation: DELETE_LIST_QUERY,
			variables: {
				deleteListId: parseInt(id),
			},
		});
		getAllList();
	}
	async function updateList(payload) {
		await apolloClient.mutate({
			mutation: UPDATE_LIST_QUERY,
			variables: {
				input: {
					title: payload[0],
					id: parseInt(payload[1]),
				},
			},
		});
		getAllList();
	}
	async function addTask(payload) {
		await apolloClient.mutate({
			mutation: ADD_TASK_QUERY,
			variables: {
				input: {
					listId: parseInt(payload[0]),
					...payload[1],
				},
			},
		});
		getAllList();
	}
	async function updateTask(payload) {
		lists.value.forEach((i) => {
			if (i.title == payload[1].listId) {
				payload[1].listId = parseInt(i.id);
			}
		});
		await apolloClient.mutate({
			mutation: UPDATE_TASK_QUERY,
			variables: {
				input: {
					id: parseInt(payload[0]),
					...payload[1],
				},
			},
		});
		getAllList();
	}
	async function deleteTask(id) {
		await apolloClient.mutate({
			mutation: DELETE_TASK_QUERY,
			variables: {
				deleteTaskId: parseInt(id),
			},
		});
		getAllList();
	}

	onMounted(getAllList);
	return {
		dialog,
		lists,
		title,
		getAllList,
		addList,
		deleteList,
		updateList,
		addTask,
		updateTask,
		deleteTask,
	};
}
