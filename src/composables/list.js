export default function list(props) {
  function editList(newTitle) {
    this.$emit('edit', {
      input: { title: newTitle, id: parseInt(props.listId) },
    });
  }
  function deleteList() {
    this.$emit('delete', { deleteListId: parseInt(props.listId) });
  }
  function addTask(newTask) {
    console.log(newTask);
    this.$emit('addTask', {
      input: { listId: parseInt(props.listId), ...newTask },
    });
  }
  function deleteTask(taskId) {
    this.$emit('deleteTask', { deleteTaskId: parseInt(taskId) });
  }
  function updateTask(payload) {
    this.$emit('updateTask', payload);
  }
  function onUnchoose(evt) {
    this.$emit('updateTask', [evt.item.id, { listId: parseInt(evt.to.id) }]);
  }
  return {
    editList,
    deleteList,
    addTask,
    deleteTask,
    updateTask,
    onUnchoose,
  };
}
