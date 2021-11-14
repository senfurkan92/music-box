<template>
  <div>
    <Topbar/>
    <router-view/>
    <SignForm/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import Cookies from 'js-cookie';
import Topbar from '@/components/common/Topbar.vue';
import SignForm from '@/components/sign/SignForm.vue';

export default {
  name: 'App',
  components: {
    Topbar,
    SignForm,
  },
  methods: {
    ...mapActions(['autoSignIn', 'fetchCurrentSongs']),
    ...mapMutations(['setUser', 'setToken']),
  },
  created() {
    this.autoSignIn()
      .then((resp) => {
        this.setUser(resp.data.data);
        this.setToken(Cookies.get('token'));
        this.fetchCurrentSongs();
      })
      .catch(() => {
        alert('unauthorized');
      });
  },
};
</script>

<style lang="css">

</style>
