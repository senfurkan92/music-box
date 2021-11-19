<template>
  <div>
  <hr>
    <form>
      <!-- email -->
      <div class="p-field mb-3">
        <label>Email</label>
        <input class="form-control" type="email" required v-model="signIn.email"
          :class="{'is-invalid':v$.signIn.email.$invalid}">
        <small class="text-danger" v-if='v$.signIn.email.required.$invalid'>
          {{v$.signIn.email.required.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signIn.email.maxLength.$invalid'>
          {{v$.signIn.email.maxLength.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signIn.email.Email.$invalid'>
          {{v$.signIn.email.Email.$message}}
        </small>
      </div>
      <!-- password -->
      <div class="p-field mb-3">
        <label>Password</label>
        <input class="form-control" type="password" required v-model="signIn.password"
          :class="{'is-invalid':v$.signIn.password.$invalid}">
        <small class="text-danger" v-if='v$.signIn.password.required.$invalid'>
          {{v$.signIn.password.required.$message}}
        </small>
      </div>
      <div class="d-grid">
        <button class="btn btn-outline-primary" type="button" :disabled="v$.signIn.$invalid"
          @click="submit">
          <span v-if="v$.signIn.$invalid">
            Fill all required inputs
          </span>
          <span v-else>
            Submit
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { mapActions, mapMutations } from 'vuex';
import Cookies from 'js-cookie';
import { SignIn, signInValidation } from '../../models/signIn';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      signIn: new SignIn('', ''),
    };
  },
  validations() {
    return {
      signIn: {
        ...signInValidation(),
      },
    };
  },
  methods: {
    ...mapActions('userModule', { signInAsync: 'signInAsync' }),
    ...mapMutations('userModule', { setUser: 'setUser', setToken: 'setToken' }),
    async submit() {
      const result = await this.signInAsync(this.signIn);
      if (result.data.success) {
        this.setUser(result.data.data.user);
        this.setToken(result.data.data.token);
        Cookies.set('token', result.data.data.token, { expires: 1 / 24 });
        this.$swal(
          'Sign In',
          result.data.description,
          'success',
        );
      } else {
        this.$swal(
          'Sign In',
          result.data.description,
          'error',
        );
      }
    },
  },
};
</script>

<style>

</style>
