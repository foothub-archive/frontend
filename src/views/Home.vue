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
import { loginRoute } from '@/router';
import { AUTH_LOGOUT } from '@/store/actions/auth';

export default {
  name: 'Home',
  mounted() {
    // this.$store.dispatch(AUTH_REQUEST);
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({ name: loginRoute.name });
      }).catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>
