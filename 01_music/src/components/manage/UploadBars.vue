<template>
    <div>
        <div v-for="(item, index) in getList" :key="index" class="px-3">
            <small>
                <b><i>{{item.name}}</i></b>
            </small>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    :style="{width: `${item.rate}%`}" :aria-valuenow="item.rate"
                    aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('manageModule', { getSongs: 'getSongs' }),
    getList() {
      const array = this.getSongs.map((x) => ({
        name: x.file.name,
        rate: x.rate,
      }));
      return array;
    },
  },
};
</script>

<style>

</style>
