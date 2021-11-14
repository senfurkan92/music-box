<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-4 col-md-6 col-12">
        <Upload></Upload>
      </div>
      <div class="col-lg-8 col-md-6 col-12">
        <Songs></Songs>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/manage/Upload.vue';
import Songs from '@/components/manage/Songs.vue';

export default {
  components: {
    Upload,
    Songs,
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (window.confirm('All inputs will be cleared If you leave, do you approve?')) {
      next();
    }
  },
};
</script>
