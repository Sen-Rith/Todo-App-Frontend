import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vueCompositionApi, { provide } from "@vue/composition-api";
import { DefaultApolloClient } from '@vue/apollo-composable'
import ApolloClient from 'apollo-boost'

Vue.config.productionTip = false;
Vue.use(vueCompositionApi);
const apolloClient = new ApolloClient({
  connectToDevTools: true,
    uri: "http://localhost:4000/graphql"
})

new Vue({
	router,
	vuetify,
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
	render: function (h) {
		return h(App);
	},
}).$mount("#app");
