import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import primevue from './plugins/primevue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import i18n from './plugins/i18n';

const app = createApp(App);
app.use(store);
app.use(router);
primevue(app);
app.use(VueSweetalert2);
app.use(i18n);
app.mount('#app');
