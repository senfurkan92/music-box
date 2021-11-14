<template>
  <div class="bg-body shadow p-lg-4 p-3 rounded-3 mb-3">
    <div class="d-flex align-items-center justify-content-between">
        <div class="p-2 bd-highlight">
            <b>My Songs</b>
        </div>
        <div class="p-2 bd-highlight pi pi-play text-success icon"></div>
    </div>
    <hr>
    <!-- current songs -->
    <Song v-for="song, index in getCurrentSongs" :song="song" :index="index" :key="index"></Song>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Song from './Song.vue';

export default {
  components: {
    Song,
  },
  computed: {
    ...mapGetters(['getCurrentSongs']),
  },
};
</script>

<style scoped>
    .icon {
        font-weight: 900;
        font-size: medium;
    }

    .bordered {
        border: gray dashed 2px;
    }
</style>
