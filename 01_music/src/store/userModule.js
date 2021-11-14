import Cookies from 'js-cookie';
import axios from '../config/axiosConfig';

const module = {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    signOut(state) {
      Cookies.set('token', Cookies.get('token'), { expires: -1 });
      state.user = null;
      state.token = null;
    },
  },

  actions: {
    signUpAsync(_, payload) {
      return axios.post('/user/signUp', payload);
    },
    signInAsync(_, payload) {
      return axios.post('/user/signIn', payload);
    },
    autoSignIn() {
      return axios.get('/user/autoSignIn', {
        headers: {
          authorization: Cookies.get('token'),
        },
      });
    },
  },
};

export default {
  ...module,
};
