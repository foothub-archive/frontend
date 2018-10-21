<template>
  <div>
    <el-input placeholder="username" v-model="username"></el-input>
    <el-input type="password" placeholder="password" v-model="password"></el-input>
    <el-button type="primary" @click="login()">
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
import { homeRoute } from '../router';
import { AUTH_REQUEST } from '../store/actions/auth';

export default {
  name: 'login',
  data() {
    return {
      username: 'chi',
      password: 'ola123OLEa',
    };
  },
  computed: {
    failedLogin() {
      return this.$store.getters.authStatus === 'error';
    },
  },
  methods: {
    login() {
      const { username, password } = this;
      this.$store
        .dispatch(AUTH_REQUEST, { username, password })
        .then(() => {
          this.$router.push(homeRoute.path);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
