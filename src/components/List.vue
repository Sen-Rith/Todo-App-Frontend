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
				<v-form @submit.prevent="editList">
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
				<v-btn
					class="ma-2"
					color="success"
					dark
					v-bind="attrs"
					v-on="on"
				>
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
					<v-btn color="success" @click="addTaskToList">
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
import Task from "./Task.vue";
import draggable from "vuedraggable";

export default {
	name: "List",
	props: ["title", "listId", "lists", "tasks"],
	data() {
		return {
			newTitle: this.title,
			dialog: false,
			dialog2: false,
			newTask: {
				title: "",
				description: "",
			},
		};
	},
	components: {
		Task,
		draggable,
	},
	methods: {
		async editList() {
			this.dialog = false;
			this.$emit("edit", [this.newTitle, this.listId]);
		},
		async deleteList() {
			this.dialog = false;
			this.$emit("delete", this.listId);
		},
		async addTaskToList() {
			this.dialog2 = false;
			this.$emit("addTask", [this.listId, this.newTask]);
		},
		async deleteTask(taskId) {
			this.$emit("deleteTask", taskId);
		},
		async updateTask(payload) {
			this.$emit("updateTask", payload);
		},
		onUnchoose(evt) {
			this.$emit("updateTask", [
				evt.item.id,
				{ listId: parseInt(evt.to.id) },
			]);
		},
	},
	watch: {
		dialog: function (dialog) {
			if (!dialog) {
				this.newTitle = this.title;
			}
		},
		title: function (title) {
			this.newTitle = title;
		},
	},
};
</script>
