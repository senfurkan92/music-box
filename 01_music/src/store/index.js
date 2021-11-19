import { createStore } from 'vuex';
import modules from './module';

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
  modules,
});
