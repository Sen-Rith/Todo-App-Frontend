<template>
  <v-card flat tile class="d-flex flex-column" width="250">
    <v-dialog v-model="dialog" width="300">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="ma-2 pa-2 text-h6 white--text text-center"
          color="success"
          hover
          v-bind="attrs"
          v-on="on"
        >
          {{ title }}
        </v-card>
      </template>
      <v-card class="pa-2 text-center">
        <v-form
          @submit.prevent="editList(newTitle)"
          v-on:submit="dialog = false"
        >
          <v-text-field
            v-model="newTitle"
            label="Title"
            required
          ></v-text-field>
        </v-form>
        <v-btn color="error" @click="deleteList">
          Delete
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" width="300">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-2" color="success" dark v-bind="attrs" v-on="on">
          <v-icon> mdi-plus-thick </v-icon>
        </v-btn>
      </template>
      <v-card class="pa-2 text-center">
        <v-form>
          <v-text-field
            v-model="newTask.title"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="newTask.description"
            label="Description"
            required
          ></v-text-field>
          <v-btn
            color="success"
            @click="addTask(newTask)"
            v-on:click="dialog2 = false"
          >
            Add task
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <draggable
      :list="lists"
      group="tasks"
      @unchoose="onUnchoose"
      v-bind:id="listId"
      style="height: 100%"
    >
      <Task
        v-for="task in tasks"
        :key="task.id"
        :title="task.title"
        :description="task.description"
        :taskId="task.id"
        :completed="task.completed"
        v-on:updateTask="updateTask"
        v-on:deleted="deleteTask"
      />
    </draggable>
  </v-card>
</template>

<script>
import Task from './Task.vue';
import draggable from 'vuedraggable';
import list from '../composables/list';
import { ref } from '@vue/composition-api';

export default {
  name: 'List',
  components: {
    Task,
    draggable,
  },
  props: ['title', 'listId', 'lists', 'tasks'],

  setup(props) {
    const {
      editList,
      deleteList,
      addTask,
      deleteTask,
      updateTask,
      onUnchoose,
    } = list(props);
    const newTitle = ref(props.title);
    const dialog = ref(false);
    const dialog2 = ref(false);
    const newTask = ref({ title: '', description: '' });
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
  },
};
</script>
