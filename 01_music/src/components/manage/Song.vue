<template>
    <div class="p-2">
        <div class="border border-2 rounded" :class="{'bg-show': show}">
            <div class="d-flex align-items-center justify-content-between">
                <div class="p-2 bd-highlight align-self-center">
                    <h6><b>{{index + 1}}.</b> {{song.name}}</h6>
                    <small>{{song.path}}</small>
                </div>
                <div class="p-2 bd-highlight btn-group btn-group-sm align-self-center" v-if="!show">
                    <button class="btn btn-primary" @click="show = true">
                        <span class="pi pi-pencil" style="font-size:12px"></span>
                    </button>
                    <button class="btn btn-danger" @click="trash()">
                        <span class="pi pi-trash" style="font-size:12px"></span>
                    </button>
                </div>
            </div>
            <div v-show="show" class="p-2">
                <div class="mb-3">
                    <small style="font-weight:500">
                        <i>{{song.title ? song.title : '---'}}</i>
                    </small>
                    <input class="form-control" placeholder="Enter Song Title"
                        v-model="title"/>
                </div>
                <div class="mb-3">
                    <small style="font-weight:500">
                        <i>{{song.genre ? song.genre : '---'}}</i>
                    </small>
                    <input class="form-control" placeholder="Enter Genre"
                        v-model="genre"/>
                </div>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-success" @click="submit">
                        Submit
                    </button>
                    <button class="btn btn-secondary" @click="show = false">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    song: Object,
    index: Number,
  },
  data() {
    return {
      show: false,
      title: '',
      genre: '',
    };
  },
  methods: {
    ...mapActions('manageModule', { updateSongAsync: 'updateSongAsync', deleteSongAsync: 'deleteSongAsync' }),
    submit() {
      const payload = {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        _id: this.song._id,
        title: this.title,
        genre: this.genre,
      };
      this.updateSongAsync(payload);
    },
    trash() {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      this.deleteSongAsync(this.song._id);
    },
  },
};
</script>

<style scoped>
    .bg-show {
        background-color: rgb(255, 227, 227);
    }
</style>
