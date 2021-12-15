<template>
	<div class="home">
		<v-card flat tile class="d-flex justify-start" :key="reload">
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
					v-on:edit="editList"
					v-on:changeTaskList="changeTaskList"
					v-on:deleteTask="deleteTask"
					v-on:editTask="editTask"
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
						<v-form @submit.prevent="addList">
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
import axios from "axios";
import List from "../components/List.vue";
import draggable from "vuedraggable";

export default {
	name: "Home",
	data() {
		return {
			lists: null,
			title: "",
			dialog: false,
			reload: 0,
		};
	},
	components: {
		List,
		draggable,
	},
	async mounted() {
		try {
			this.lists = (
				await axios.get("http://localhost:3000/allList")
			).data;
		} catch (error) {
			console.log(error.message);
		}
	},
	methods: {
		async addList() {
			this.dialog = false;
			try {
				const res = (
					await axios.post("http://localhost:3000/list", {
						title: this.title,
					})
				).data;
				if (res == "Invalid") {
					this.title = "";
					alert("Duplicate list");
				} else if (res == "No input") {
					alert("No input");
				} else {
					this.lists = (
						await axios.get("http://localhost:3000/allList")
					).data;
					this.title = "";
				}
			} catch (error) {
				alert("Error");
			}
		},
		async deleteList(listId) {
			try {
				await axios.delete(`http://localhost:3000/list/${listId}`);
				this.lists = (
					await axios.get("http://localhost:3000/allList")
				).data;
			} catch (error) {
				alert("Error");
			}
		},
		async editList(payload) {
			const newTitle = payload[0];
			const listId = payload[1];
			try {
				const res = (
					await axios.patch(`http://localhost:3000/list/${listId}`, {
						title: newTitle,
					})
				).data;
				if (res == "Invalid") {
					alert("Duplicate list");
				} else {
					this.lists = (
						await axios.get("http://localhost:3000/allList")
					).data;
				}
			} catch (error) {
				alert("Error");
			}
		},
		async changeTaskList(payload) {
			this.lists.forEach(async (i) => {
				if (i.title == payload[1]) {
					try {
						await this.revoke();
						this.reload += 1;
					} catch (error) {
						alert("Error");
					}
				} else {
					try {
						await axios.patch(
							`http://localhost:3000/update/${payload[0]}/${payload[1]}`
						);
					} catch (error) {
						alert("Error");
					}
				}
			});
		},
		async deleteTask(taskId) {
			try {
				await axios.delete(`http://localhost:3000/task/${taskId}`);
				await this.revoke();
			} catch (error) {
				alert("Error");
			}
		},
		async editTask(payload) {
			const taskId = payload[0];
			const data = payload[1];
			try {
				await axios.patch(`http://localhost:3000/task/${taskId}`, data);
				await this.revoke();
			} catch (error) {
				alert("Error");
			}
		},
		async addTask(payload) {
			const listId = payload[0]
			const newTask = payload[1]
			try {
				const res = (
					await axios.post(
						`http://localhost:3000/task/${listId}`,
						newTask
					)
				).data;
				if (res == "Invalid input") {
					alert("Invalid input");
				}
				await this.revoke()
			} catch (error) {
				alert("Error");
			}
		},
		async revoke() {
			this.lists = (
				await axios.get("http://localhost:3000/allList")
			).data;
		},
	},
};
</script>
