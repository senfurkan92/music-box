import axios from '../config/axiosConfig';

const module = {
  namespaced: true,
  state: () => ({
    songs: [],
    currentSongs: [],
    uploadErrors: [],
    uploading: false,
  }),
  getters: {
    getSongs(state) {
      return state.songs;
    },
    getCurrentSongs(state) {
      return state.currentSongs;
    },
    getSong(state) {
      if (state.songs.length > 0) {
        return state.songs[0];
      }
      return null;
    },
    getUploading(state) {
      return state.uploading;
    },
    getUploadErrors(state) {
      return state.uploadErrors;
    },
  },
  mutations: {
    setSongs(state, songs) {
      songs.forEach((song) => {
        state.songs.push({
          file: song,
          rate: 0,
        });
      });
    },
    shiftSong(state) {
      state.songs.shift();
    },
    setUploading(state, val) {
      state.uploading = val;
    },
    setCurrentSong(state, songs) {
      songs.forEach((x) => state.currentSongs.push(x));
    },
    addCurrentSong(state, song) {
      state.currentSongs.push(song);
    },
    removeCurrentSong(state, id) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      state.currentSongs = state.currentSongs.filter((x) => x._id !== id);
    },
    updateCurrentSong(state, payload) {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      const song = state.currentSongs.find((x) => x._id === payload._id);
      song.title = payload.title;
      song.genre = payload.genre;
    },
    addUploadError(state, error) {
      state.uploadErrors.push(error);
    },
    removeUploadError(state) {
      state.uploadErrors.shift();
    },
  },
  actions: {
    fetchCurrentSongs({ commit }) {
      axios.get('/song/getAll')
        .then((resp) => commit('setCurrentSong', resp.data.data));
    },
    uploadSongAsync({ getters, dispatch, commit }) {
      const song = getters.getSong;
      if (song) {
        // payload
        const formData = new FormData();
        formData.append('song', song.file);
        formData.append('name', song.file.name);
        // options
        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const rate = Math.floor((loaded * 100) / total);
            song.rate = rate;
          },
        };
        // post
        axios.post('/song/upload', formData, options).then((resp) => {
          if (resp.data.success) {
            commit('addCurrentSong', {
              name: song.file.name,
              path: resp.data.data.path,
            });
            commit('shiftSong');
            dispatch('uploadSongAsync');
          } else {
            commit('shiftSong');
            commit('addUploadError', resp.data.description);
            dispatch('uploadSongAsync');
            setTimeout(() => {
              commit('removeUploadError');
            }, 2500);
          }
        });
      }
    },
    updateSongAsync({ commit }, payload) {
      axios.post('/song/update', payload)
        .then((resp) => {
          if (resp.data.success) {
            commit('updateCurrentSong', payload);
          } else {
            commit('addUploadError', resp.data.description);
            setTimeout(() => {
              commit('removeUploadError');
            }, 2500);
          }
        })
        .catch((err) => {
          commit('addUploadError', err.message);
          setTimeout(() => {
            commit('removeUploadError');
          }, 2500);
        });
    },
    deleteSongAsync({ commit }, id) {
      axios.get(`song/delete/${id}`)
        .then((resp) => {
          if (resp.data.success) {
            commit('removeCurrentSong', id);
          } else {
            commit('addUploadError', resp.data.description);
            setTimeout(() => {
              commit('removeUploadError');
            }, 2500);
          }
        })
        .catch((err) => {
          commit('addUploadError', err.message);
          setTimeout(() => {
            commit('removeUploadError');
          }, 2500);
        });
    },
  },
};

export default module;
