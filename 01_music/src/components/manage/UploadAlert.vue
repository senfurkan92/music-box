<template>
  <div>
    <div v-for="error, index in getUploadErrors" :key="index"
        class="alert alert-danger" role="alert"
        style="position: fixed; right: 20px; z-index: 10;"
        :style="{'top': `${80 + (index-1) * 70}px` }">
        <small>{{error}}</small>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('manageModule', { getUploadErrors: 'getUploadErrors' }),
  },
};
</script>

<style>

</style>
