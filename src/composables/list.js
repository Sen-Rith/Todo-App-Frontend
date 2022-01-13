import { ref, watch } from "@vue/composition-api";

export default function list(props) {
	const newTitle = ref(props.title);
	const dialog = ref(false);
	const dialog2 = ref(false);
	const newTask = ref({ title: "", description: "" });
	function editList() {
		dialog.value = false;
		this.$emit("edit", [newTitle.value, props.listId]);
	}
	function deleteList() {
		dialog.value = false;
		this.$emit("delete", props.listId);
	}
	function addTask() {
		dialog2.value = false;
		this.$emit("addTask", [props.listId, newTask.value]);
	}
	function deleteTask(taskId) {
		this.$emit("deleteTask", taskId);
	}
	function updateTask(payload) {
		this.$emit("updateTask", payload);
	}
	function onUnchoose(evt) {
		this.$emit("updateTask", [
			evt.item.id,
			{ listId: parseInt(evt.to.id) },
		]);
	}

	watch(dialog, (dialog) => {
		if (!dialog.value) {
			newTitle.value = props.title;
		}
	});
	return {
		newTitle,
		dialog,
		dialog2,
		newTask,
		editList,
		deleteList,
		addTask,
		deleteTask,
		updateTask,
		onUnchoose,
	};
}
