import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import primevue from './plugins/primevue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import GlobalComponents from './plugins/_globals';
import ProgressBar from './includes/progress-bar';
import './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'nprogress/nprogress.css';

ProgressBar(router);

const app = createApp(App);
app.use(store);
app.use(router);
primevue(app);
app.use(VueSweetalert2);
app.use(i18n);
app.use(GlobalComponents);
app.mount('#app');
