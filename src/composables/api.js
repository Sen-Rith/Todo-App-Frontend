import {
  useSubscription,
  useQuery,
  useResult,
  useMutation,
} from '@vue/apollo-composable';
import {
  ADD_LIST,
  DELETE_LIST,
  UPDATE_LIST,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../graphql/mutation';
import { ALL_LIST } from '../graphql/queries';
import { LIST_UPDATED } from '../graphql/subscription';

export default function api() {
  const { result, refetch } = useQuery(ALL_LIST);
  const lists = useResult(result);
  const { mutate: addList } = useMutation(ADD_LIST);
  const { mutate: deleteList } = useMutation(DELETE_LIST);
  const { mutate: updateList } = useMutation(UPDATE_LIST);
  const { mutate: addTask } = useMutation(ADD_TASK);
  const { mutate: updateTaskMutation } = useMutation(UPDATE_TASK);
  const { mutate: deleteTask } = useMutation(DELETE_TASK);
  function updateTask(payload) {
    lists.value.forEach((i) => {
      if (i.title == payload[1].listId) {
        payload[1].listId = parseInt(i.id);
      }
    });
    updateTaskMutation({ input: { id: parseInt(payload[0]), ...payload[1] } });
  }
  const { onResult } = useSubscription(LIST_UPDATED);
  onResult(() => {
    refetch();
  });
  return {
    lists,
    addList,
    deleteList,
    updateList,
    addTask,
    updateTask,
    deleteTask,
  };
}
