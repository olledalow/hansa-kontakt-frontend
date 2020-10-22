import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";

import BaseCard from "./components/UI/BaseCard.vue";
import BaseButton from "./components/UI/BaseButton.vue";

import LoadingSpinner from "./components/UI/LoadingSpinner.vue";

const app = createApp(App);
app.use(router);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("loading-spinner", LoadingSpinner);

app.mount("#app");
