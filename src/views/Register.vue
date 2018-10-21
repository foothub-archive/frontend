<template>
  <div>
    <el-input placeholder="username" v-model="username"></el-input>
    <el-input placeholder="email" v-model="email"></el-input>
    <el-input type="password" placeholder="password" v-model="password"></el-input>
    <el-button type="primary" :disabled="createButtonDisable" @click="createAccount()">
      Create Account
      <font-awesome-icon icon="user-plus" />
    </el-button>
    <el-alert
            v-if="failedCreate"
            title="Unable to create account"
            type="error"
            show-icon>
    </el-alert>
  </div>
</template>

<script>
import { loginRoute } from '@/router';
import { AUTH_SIGNUP } from '@/store/actions/auth';

export default {
  name: 'resgiter',
  data() {
    return {
      email: undefined,
      username: undefined,
      password: undefined,
    };
  },
  computed: {
    failedLogin() {
      return this.$store.getters.authStatus === 'error';
    },
    createButtonDisable() {
      return !this.email || !this.username || !this.password;
    },
  },
  methods: {
    createAccount() {
      const { email, username, password } = this;
      this.$store
        .dispatch(AUTH_SIGNUP, { email, username, password })
        .then(() => {
          this.$router.push(loginRoute.path);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
