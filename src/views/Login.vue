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
import { homeRoute } from '@/router';
import { AUTH_LOGIN } from '@/store/actions/auth';

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
