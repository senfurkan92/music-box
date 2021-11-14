<template>
  <li class="list-group-item" style="cursor: pointer"
    @click="sing">
    <div class="d-flex justify-content-between">
      <div class="p-2 bd-highlight align-self-center">
          <span style="font-weight:600">{{track.name}}</span>
          <br />
          <small><i>{{track.title}}/{{track.genre}}</i></small>
      </div>
      <div class="p-2 bd-highlight align-self-center">
          <span class="pi pi-comments"></span>
          {{track.commentCount}}
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    track: Object,
  },
  methods: {
    ...mapMutations(['setSingSong']),
    sing() {
      const payload = {
        path: this.track.path,
        name: this.track.name,
        title: this.track.title,
        genre: this.track.genre,
      };
      this.setSingSong(payload);
    },
  },
};
</script>

<style>

</style>
