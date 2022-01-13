import { useApolloClient } from "@vue/apollo-composable";
import { onMounted, ref } from "@vue/composition-api";
import {
	ADD_LIST,
	DELETE_LIST,
	UPDATE_LIST,
	ADD_TASK,
	UPDATE_TASK,
	DELETE_TASK,
} from "../graphql/mutation";
import { ALL_LIST } from "../graphql/queries";

export default function api() {
	const apolloClient = useApolloClient().client;
	const title = ref("");
	const dialog = ref(false);
	const lists = ref([]);
	async function getAllList() {
		let res = (
			await apolloClient.query({
				query: ALL_LIST,
				fetchPolicy: "network-only",
			})
		).data.lists;
		lists.value = res;
	}
	async function addList() {
		dialog.value = false;
		await apolloClient.mutate({
			mutation: ADD_LIST,
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
			mutation: DELETE_LIST,
			variables: {
				deleteListId: parseInt(id),
			},
		});
		getAllList();
	}
	async function updateList(payload) {
		await apolloClient.mutate({
			mutation: UPDATE_LIST,
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
			mutation: ADD_TASK,
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
			mutation: UPDATE_TASK,
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
			mutation: DELETE_TASK,
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
