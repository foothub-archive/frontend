<template>
    <div>
        <el-input
            v-model="email"
            type="email"
            placeholder="email"/>
        <el-input
            v-model="username"
            placeholder="username"/>
        <el-input
            v-model="password"
            type="password"
            placeholder="password"/>
        <el-button
            :disabled="createButtonDisable"
            type="primary"
            @click="createAccount()">
            Create Account
            <font-awesome-icon icon="user-plus" />
        </el-button>
        <el-alert
            v-if="failedCreate"
            title="Unable to create account"
            type="error"
            show-icon/>
    </div>
</template>

<script>
import { loginRoute } from '../router';
import { POST_A as POST_A } from '../shared/src/vuex-store/constants/user';

export default {
  name: 'Resgiter',
  data() {
    return {
      email: undefined,
      username: undefined,
      password: undefined,
      failedCreate: false,
    };
  },
  computed: {
    createButtonDisable() {
      return !this.email || !this.username || !this.password;
    },
  },
  methods: {
    createAccount() {
      this.failedCreate = false;
      const { email, username, password } = this;
      this.$store.dispatch(POST_A, { email, username, password })
        .then(() => { this.$router.push(loginRoute.path); })
        .catch(() => { this.failedCreate = true; });
    },
  },
};
</script>
