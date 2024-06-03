<template>
  <div class="login-form-container">
    <b-card header="Login" class="login-card">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            placeholder="Enter username"
            :state="errors.username ? false : null"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            :state="errors.password ? false : null"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">
          Submit
        </b-button>
      </b-form>
    </b-card>

    <b-card bg-variant="light" class="mt-3 text-center new-account-card">
      <b-card-text>
        New here? Make a new account
      </b-card-text>
      <b-button href="/sign-up" variant="success">Sign Up</b-button>
    </b-card>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import JwtService from "@/services/JwtService";
import router from "@/router";
import LoadingOverlay from "@/components/LoadingOverlay.vue"
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  components: {LoadingOverlay},
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      errors: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(['showLoading', 'hideLoading']),
    async onSubmit() {
      try {
        this.showLoading();
        const response = await AuthService.login(this.form.username, this.form.password);
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        await JwtService.login(token);
        this.hideLoading();
        await router.push('/home');
      } catch (error) {
        this.hideLoading();
        this.handleLoginError(error);
      }
    },
    handleLoginError(error) {
      if (error.response && error.response.data.errors) {
        this.errors.username = error.response.data.errors.username || null;
        this.errors.password = error.response.data.errors.password || null;
      }
    },
  },
};
</script>

<style scoped>
.login-form-container {
  max-width: 500px;
  margin: auto;
  padding: 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-card, .new-account-card {
  border: none;
}

.forgot-password {
  margin-top: 0.5rem;
}
</style>
