<template>
    <div class="home">
        <div>
            Home
        </div>
        <el-button
            type="danger"
            @click="logout()">
            Logout
        </el-button>
    </div>
</template>

<script>
import { loginRoute } from '../router';
import { LOGOUT_A as LOGOUT_A } from '../shared/src/vuex-store/constants/auth';

export default {
  name: 'Home',
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT_A)
        .then(() => {
          localStorage.removeItem('user-token');
          this.$router.push({ name: loginRoute.name });
        })
        .catch(() => {});
    },
  },
};
</script>
