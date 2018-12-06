<template>
    <div>
        <el-input
            v-model="username"
            placeholder="username"/>
        <el-input
            v-model="password"
            type="password"
            placeholder="password"/>
        <el-button
            :disabled="loginButtonDisable"
            type="primary"
            @click="login()">
            Login
            <font-awesome-icon icon="user" />
        </el-button>
        <el-alert
            v-if="failedLogin"
            title="Unable to log in with provided credentials"
            type="error"
            show-icon/>
    </div>
</template>

<script>
import { homeRoute } from '../router';
import { LOGIN_A as LOGIN_A } from '../store/constants/auth';

export default {
  name: 'Login',
  data() {
    return {
      username: undefined,
      password: undefined,
    };
  },
  computed: {
    failedLogin() {
      return this.$store.state.auth.status === 'error';
    },
    loginButtonDisable() {
      return !this.username || !this.password;
    },
    nextUrlName() {
      return this.$route.query.next || homeRoute.name;
    },
  },
  methods: {
    login() {
      const { username, password } = this;
      this.$store.dispatch(LOGIN_A, { username, password })
        .then(() => { this.$router.push({ name: this.nextUrlName }); })
        .catch(() => {});
    },
  },
};
</script>
