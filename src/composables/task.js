import { ref } from "@vue/composition-api";

export default function task(props) {
	const isComplete = ref(props.completed);
	const newTitle = ref(props.title);
	const newDescription = ref(props.newDescription);
	const dialog = ref(false);
	const newList = ref("");
	function completeTask() {
		this.$emit("updateTask", [
			props.taskId,
			{ completed: isComplete.value },
		]);
	}
	function updateTask() {
		dialog.value = false;
		this.$emit("updateTask", [
			props.taskId,
			{
				title: newTitle.value,
				description: newDescription.value,
			},
		]);
	}
	function changeTaskList() {
		dialog.value = false;
		this.$emit("updateTask", [props.taskId, { listId: newList.value }]);
	}
	function deleteTask() {
		dialog.value = false;
		this.$emit("deleted", props.taskId);
	}
	return {
		isComplete,
		newTitle,
		newDescription,
		dialog,
		newList,
		completeTask,
		deleteTask,
		updateTask,
		changeTaskList,
	};
}
