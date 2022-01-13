<template>
	<v-dialog v-model="dialog" width="300">
		<template v-slot:activator="{ on, attrs }">
			<v-card
				color="success"
				flat
				tile
				class="d-flex ma-2 justify-start align-center"
				v-bind:id="taskId"
			>
				<v-checkbox
					@click.prevent="complete"
					v-model="isComplete"
					class="my-2 ml-2"
					color="white"
					hide-details
				/>
				<v-card
					tile
					flat
					width="100%"
					color="success"
					v-bind="attrs"
					v-on="on"
				>
					<p class="my-2 mr-2 text-subtitle-2 white--text">
						{{ title }}
					</p>
				</v-card>
			</v-card>
		</template>
		<v-card class="pa-2 text-center">
			<v-form>
				<v-text-field
					v-model="newTitle"
					label="Title"
					required
				></v-text-field>
				<v-text-field
					v-model="newDescription"
					label="Description"
					required
				></v-text-field>
				<v-btn color="success" @click="editTask" class="mr-2">
					Edit
					<v-icon> mdi-pencil </v-icon>
				</v-btn>
				<v-btn color="error" @click="deleteTask" class="ml-2">
					Delete
					<v-icon> mdi-delete </v-icon>
				</v-btn>
			</v-form>
			<v-text-field
				v-model="newList"
				label="Change to list:"
			></v-text-field>
			<v-btn color="success" @click="changeTaskList">
				<v-icon> mdi-arrow-right-thick </v-icon>
			</v-btn>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: "Task",
	props: ["taskId", "title", "description", "completed"],
	data() {
		return {
			isComplete: this.completed,
			newTitle: this.title,
			newDescription: this.description,
			dialog: false,
			newList: null,
		};
	},
	methods: {
		complete() {
			this.$emit("updateTask", [this.taskId, { completed: this.isComplete}]);
		},
		deleteTask() {
			this.dialog = false;
			this.$emit("deleted", this.taskId);
		},
		editTask() {
			this.dialog = false;
			this.$emit("updateTask", [
				this.taskId,
				{
					title: this.newTitle,
					description: this.newDescription,
				},
			]);
		},
		changeTaskList() {
			this.dialog = false;
			this.$emit("updateTask", [this.taskId, {listId: this.newList}]);
		},
	},
};
</script>
