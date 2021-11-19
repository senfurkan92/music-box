<template>
    <div>
        <ul class="list-group p-md-5 p-3 shadow py-3">
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-self-center">
                    <div class="p-2 bd-highlight">
                        <span style="font-weight:1000; font-size:1.2rem">
                            Songs
                        </span>
                    </div>
                    <div class="bd-highlight align-self-center px-3">
                        <span class="pi pi-volume-up text-success"
                        style="font-weight:1000; font-size:1.2rem">
                        </span>
                    </div>
                </div>
            </li>
            <Track v-for="(track,index) in getPlayableSongs" :key="index" :track="track" >
            </Track>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Track from '@/components/home/Track.vue';

export default {
  data() {
    return {
      tracks: [],
    };
  },
  components: {
    Track,
  },
  computed: {
    ...mapGetters('songModule', { getPlayableSongs: 'getPlayableSongs' }),
  },
};
</script>

<style>

</style>
