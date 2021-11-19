<template>
  <div>
    <Banner/>
    <MusicList/>
    <div style="margin-bottom:130px"></div>
    <Player/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Banner from '@/components/home/Banner.vue';
import MusicList from '@/components/home/MusicList.vue';
import Player from '../components/home/Player.vue';

export default {
  components: {
    Banner,
    MusicList,
    Player,
  },
  name: 'Home',
  created() {
    this.onbottomFetch();
    this.fetchPlayableSongs();
  },
  methods: {
    ...mapActions('songModule', { fetchPlayableSongs: 'fetchPlayableSongs' }),
    onbottomFetch() {
      document.addEventListener('scroll', () => {
        const allHeight = document.documentElement.scrollHeight;
        const scrollTopWithUnscroll = window.scrollY + window.innerHeight;
        const diff = Math.abs(allHeight - scrollTopWithUnscroll);
        if (diff < 10) {
          this.fetchPlayableSongs();
        }
      });
    },
  },
};
</script>
