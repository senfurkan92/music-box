<template>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <b>Your Account</b>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="nav nav-pills nav-fill">
                        <li class="nav-item">
                            <a class="nav-link"
                                @click="currentComp='SignIn'"
                                :class="{'active':currentComp=='SignIn'}">
                                Sign In
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                                @click="currentComp='SignUp'"
                                :class="{'active':currentComp=='SignUp'}">
                                Sign Up
                            </a>
                        </li>
                    </ul>
                    <component :is="currentComp">
                    </component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

export default {
  data() {
    return {
      currentComp: 'SignIn',
    };
  },
  components: {
    SignIn,
    SignUp,
  },
};
</script>

<style scoped>
    a {
        cursor: pointer;
    }
</style>
