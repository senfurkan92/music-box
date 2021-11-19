<template>
  <nav class="navbar navbar-expand-lg navbar-bg navbar-dark px-lg-5 px-1">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name : 'Home'}" active-class="text-warning">
        {{ $t('topbar.music') }}
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a type="button" class="nav-link" data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                v-if="!isAuth">
              Login/Register
            </a>
            <div class="dropdown" v-else>
              <a class="nav-link" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{getUser.email}}
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <button class="dropdown-item" href="#" @click="out">Sign Out</button>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item" v-if="isAuth">
            <router-link class="nav-link" :to="{ name : 'Manage'}"
              active-class="text-warning" exact>
                Manage
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters('userModule', { getUser: 'getUser', getToken: 'getToken' }),
    isAuth() {
      return (this.getUser && this.getToken);
    },
  },
  methods: {
    ...mapMutations('userModule', { signOut: 'signOut' }),
    out() {
      this.signOut();
      this.$router.replace('/');
    },
  },
};
</script>

<style scoped>
  .navbar-bg {
    background-image: linear-gradient(to right, #444 , #888);
  }
</style>
