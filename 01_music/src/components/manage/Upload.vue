<template>
  <div class="bg-body shadow p-lg-4 p-3 rounded-3 mb-3">
    <div class="d-flex align-items-center justify-content-between">
        <div class="p-2 bd-highlight">
            <b>Upload</b>
        </div>
        <div class="p-2 bd-highlight pi pi-upload text-success icon"></div>
    </div>
    <hr>
    <!-- upload -->
    <div :class="{ 'drop-area': !dragProcess, 'drop-area-hover': dragProcess }"
        draggable="false">
        <div class="drop-area-text"
            @dragenter.prevent.stop="dragProcess= true"
            @dragover.prevent.stop="dragProcess= true"
            @drag="dragProcess= true"
            @dragend.prevent.stop="dragProcess= false"
            @dragleave.prevent.stop="dragProcess= false"
            @drop.prevent.stop="upload($event)">
            <h6>Drop your files here</h6>
        </div>
    </div>
    <hr>
    <!-- progress -->
    <Progress/>
    <UploadAlert/>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import Progress from './UploadBars.vue';
import UploadAlert from './UploadAlert.vue';

export default {
  data() {
    return {
      dragProcess: false,
    };
  },
  methods: {
    ...mapMutations(['setSongs', 'shiftSong']),
    ...mapActions(['uploadSongAsync']),
    upload(e) {
      this.dragProcess = false;
      const files = [...e.dataTransfer.files];
      this.setSongs(files);
      this.uploadSongAsync();
    },
  },
  components: {
    Progress,
    UploadAlert,
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

    .drop-area {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
        border: 2px #666 dashed;
        color: #666;
        text-align: center;
        min-height: 200px;
        position: relative;
    }

    .drop-area-hover {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
        border: 2px rgb(108, 243, 45) dashed;
        color: rgb(169, 231, 133);
        text-align: center;
        min-height: 200px;
        position: relative;
    }

    .drop-area-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>
