<template>
  <div class="frame" v-show="getSingSong">
    <div class="player shadow text-center">
        <div class="d-flex flex-row bd-highlight">
            <!-- <div class="p-2 bd-highlight align-self-center">
                <span class="pi pi-play text-primary h5"></span>
                &nbsp;
                <span class="text-secondary h5">00:00</span>
            </div> -->
            <div class="p-2 bd-highlight align-self-center flex-fill text-center">
                <small><b>{{getSingSong ? getSingSong.name : ''}}</b></small>
                <audio controls class="w-100">
                  <source type="audio/mpeg">
                </audio>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getSingSong']),
  },
  watch: {
    getSingSong() {
      this.setAudioSrc();
    },
  },
  methods: {
    ...mapMutations(['setSingSong']),
    setAudioSrc() {
      document.querySelector('audio').pause();
      document.querySelector('audio').setAttribute('src', `http://localhost:3000${this.getSingSong ? this.getSingSong.path : ''}`);
      document.querySelector('audio').load();
      document.querySelector('audio').play();
    },
  },
  unmounted() {
    this.setSingSong(null);
  },
};
</script>

<style>
  .frame {
    position: fixed;
    width: 100%;
    padding: 20px;
    bottom: 0px;
  }

  .player {
    border-radius: 10px;
    padding: 10px;
    position: relative;
    background-image: linear-gradient(to right,rgba(214, 237, 240, 0.999),
                    rgba(255, 217, 217, 0.95)),
                      url("/img/music-banner1.png");
    background-position-y: center;
    background-size: cover;
  }
</style>
