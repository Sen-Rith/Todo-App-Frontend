export default function task(props) {
  function completeTask(isComplete) {
    this.$emit('updateTask', [props.taskId, { completed: isComplete }]);
  }
  function updateTask(newTitle, newDescription) {
    this.$emit('updateTask', [
      props.taskId,
      {
        title: newTitle,
        description: newDescription,
      },
    ]);
  }
  function changeTaskList(newList) {
    this.$emit('updateTask', [props.taskId, { listId: newList }]);
  }
  function deleteTask() {
    this.$emit('deleted', props.taskId);
  }
  return {
    completeTask,
    deleteTask,
    updateTask,
    changeTaskList,
  };
}
