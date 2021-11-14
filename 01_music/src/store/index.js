import { createStore } from 'vuex';
import userModule from './userModule';
import manageModule from './manageModule';
import songModule from './songModule';

export default createStore({
  state: {
    singSong: null,
  },
  getters: {
    getSingSong(state) {
      return state.singSong;
    },
  },
  mutations: {
    setSingSong(state, track) {
      state.singSong = track;
    },
  },
  actions: {
  },
  modules: {
    userModule,
    manageModule,
    songModule,
  },
});
