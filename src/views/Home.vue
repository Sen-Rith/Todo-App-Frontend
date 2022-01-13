<template>
	<div class="home">
		<v-card flat tile class="d-flex justify-start">
			<draggable
				:list="lists"
				group="lists"
				class="d-flex justify-start"
				style="height: 100%"
			>
				<List
					v-for="list in lists"
					:key="list.id"
					:listId="list.id"
					:title="list.title"
					:tasks="list.tasks"
					:list="lists"
					v-on:delete="deleteList"
					v-on:edit="updateList"
					v-on:deleteTask="deleteTask"
					v-on:updateTask="updateTask"
					v-on:addTask="addTask"
				/>
			</draggable>
			<v-card flat tile>
				<v-dialog v-model="dialog" width="300">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							class="ma-2"
							height="48"
							width="100"
							color="success"
							dark
							v-bind="attrs"
							v-on="on"
						>
							<v-icon> mdi-plus-thick </v-icon>
						</v-btn>
					</template>
					<v-card class="pa-2">
						<v-form @submit.prevent="addList(title)">
							<v-text-field
								v-model="title"
								label="Title"
								required
							></v-text-field>
						</v-form>
					</v-card>
				</v-dialog>
			</v-card>
		</v-card>
	</div>
</template>

<script>
import List from "../components/List.vue";
import draggable from "vuedraggable";
import api from "../composables/api";

export default {
	name: "Home",
	components: {
		List,
		draggable,
	},
	setup() {
		const {
			lists,
			dialog,
			title,
			getAllList,
			addList,
			deleteList,
			updateList,
			addTask,
			updateTask,
			deleteTask
		} = api();
		return {
			lists,
			dialog,
			title,
			addList,
			getAllList,
			deleteList,
			updateList,
			addTask,
			updateTask,
			deleteTask,
		};
	},
};
</script>
