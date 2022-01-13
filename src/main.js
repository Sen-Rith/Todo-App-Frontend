import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vueCompositionApi, { provide } from "@vue/composition-api";
import { DefaultApolloClient } from "@vue/apollo-composable";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";

Vue.config.productionTip = false;
Vue.use(vueCompositionApi);
const wsLink = new WebSocketLink({
	uri: "ws://localhost:4000/subscription",
	options: {
		reconnect: true,
	},
});
const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
});

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === "OperationDefinition" && operation === "subscription";
	},
	wsLink,
	httpLink
);

const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

new Vue({
	router,
	vuetify,
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},
	render: function (h) {
		return h(App);
	},
}).$mount("#app");
