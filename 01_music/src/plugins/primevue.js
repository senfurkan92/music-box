import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

export default (app) => {
  app.use(PrimeVue, { ripple: true });
  app.component('Dialog', Dialog);
  app.component('Toolbar', Toolbar);
  app.component('InputText', InputText);
  app.component('Password', Password);
};
