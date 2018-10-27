<template>
  <div>
    <el-input placeholder="username" v-model="username"></el-input>
    <el-input type="password" placeholder="password" v-model="password"></el-input>
    <el-button type="primary" :disabled="loginButtonDisable" @click="login()">
      Login
      <font-awesome-icon icon="user" />
    </el-button>
    <el-alert
            v-if="failedLogin"
            title="Unable to log in with provided credentials"
            type="error"
            show-icon>
    </el-alert>
  </div>
</template>

<script>
import { homeRoute } from '@/router';
import { AUTH_LOGIN } from '@/store/actions/auth';

export default {
  name: 'login',
  data() {
    return {
      username: undefined,
      password: undefined,
    };
  },
  computed: {
    failedLogin() {
      return this.$store.getters.authStatus === 'error';
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
      this.$store.dispatch(AUTH_LOGIN, { username, password }).then(() => {
        this.$router.push({ name: this.nextUrlName });
      }).catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>
