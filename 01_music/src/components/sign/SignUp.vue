<template>
  <div>
    <hr>
    <form>
      <!-- name -->
      <div class="p-field mb-3">
        <label>Name</label>
        <input class="form-control" type="text" required v-model="signUp.name"
          :class="{'is-invalid':v$.signUp.name.$invalid}">
        <small class="text-danger" v-if='v$.signUp.name.required.$invalid'>
          {{v$.signUp.name.required.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signUp.name.maxLength.$invalid'>
          {{v$.signUp.name.maxLength.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signUp.name.alpha.$invalid'>
          {{v$.signUp.name.alpha.$message}}
        </small>
      </div>
      <!-- email -->
      <div class="p-field mb-3">
        <label>Email</label>
        <input class="form-control" type="email" required v-model="signUp.email"
          :class="{'is-invalid':v$.signUp.email.$invalid}">
        <small class="text-danger" v-if='v$.signUp.email.required.$invalid'>
          {{v$.signUp.email.required.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signUp.email.maxLength.$invalid'>
          {{v$.signUp.email.maxLength.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signUp.email.Email.$invalid'>
          {{v$.signUp.email.Email.$message}}
        </small>
      </div>
      <!-- age -->
      <div class="p-field mb-3">
        <label>Age</label>
        <input class="form-control" type="number" step="1" required v-model="signUp.age"
          :class="{'is-invalid':v$.signUp.age.$invalid}">
        <small class="text-danger" v-if='v$.signUp.age.required.$invalid'>
          {{v$.signUp.age.required.$message}}
        </small>
        <small class="text-danger" v-if='v$.signUp.age.numeric.$invalid'>
          {{v$.signUp.age.numeric.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signUp.age.between.$invalid'>
          {{v$.signUp.age.between.$message}}
        </small>
      </div>
      <!-- password -->
      <div class="p-field mb-3">
        <label>Password</label>
        <input class="form-control" type="password" required v-model="signUp.password"
          :class="{'is-invalid':v$.signUp.password.$invalid}">
        <small class="text-danger" v-if='v$.signUp.password.required.$invalid'>
          {{v$.signUp.password.required.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signUp.password.regexPassword.$invalid'>
          Not strong enough
        </small>
      </div>
      <!-- repassword -->
      <div class="p-field mb-3">
        <label>Confirm Password</label>
        <input class="form-control" type="password" required v-model="signUp.repassword"
          :class="{'is-invalid':v$.signUp.repassword.$invalid}">
        <small class="text-danger" v-if='v$.signUp.repassword.required.$invalid'>
          {{v$.signUp.repassword.required.$message}}
        </small>
        <small class="text-danger" v-else-if='v$.signUp.repassword.sameAs.$invalid'>
          {{v$.signUp.repassword.sameAs.$message.replace('the other value','password')}}
        </small>
      </div>
      <!-- country -->
      <div class="p-field mb-3">
        <label>Country</label>
        <select class="form-control" required v-model="signUp.country"
          :class="{'is-invalid':v$.signUp.country.$invalid}">
          <option value="USA">USA</option>
          <option value="France">France</option>
          <option value="Italy">Italy</option>
        </select>
      </div>
      <!-- accept -->
      <div class="p-field mb-3">
        <div class="input-group">
          <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="true"
            v-model="signUp.accept"
              :class="{'is-invalid':v$.signUp.accept.$invalid}">
          </div>
          <input type="text" class="form-control" value="Accept terms of service" readonly
            :class="{'is-invalid':v$.signUp.accept.$invalid}">
        </div>
        <small class="text-danger" v-if='v$.signUp.accept.checked.$invalid'>
            Must be approved
          </small>
      </div>
      <div class="d-grid">
        <button class="btn btn-outline-primary" type="button" :disabled="v$.signUp.$invalid"
          @click="submit()">
          <span v-if="v$.signUp.$invalid">
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
import { required, sameAs } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import { SignUp, signUpValidation } from '../../models/signUp';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      signUp: new SignUp('', '', null, '', '', 'USA', false),
    };
  },
  validations() {
    return {
      signUp: {
        ...signUpValidation(),
        repassword: {
          required,
          sameAs: sameAs(this.signUp.password),
        },
      },
    };
  },
  methods: {
    ...mapActions(['signUpAsync']),
    async submit() {
      const result = await this.signUpAsync(this.signUp);
      if (result.data.success) {
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
