<template>
  <div>
    <div>
      My Profile
    </div>
    <el-form v-if="isMyProfileLoaded" label-width="120px">
    <el-form-item label="Email">
        <el-input v-model="email" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="Username">
        <el-input v-model="username" :disabled="true"></el-input>
    </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="myName"></el-input>
    </el-form-item>
    </el-form>
    <el-button type="primary" @click="refresh()">
      Refresh
    </el-button>
    <el-button type="primary" @click="save()">
      Save
    </el-button>
  </div>
</template>

<script>
import { RETRIEVE_ME, UPDATE_ME, ME_NAME } from '@/store/actions/me';

export default {
  name: 'home',
  computed: {
    isMyProfileLoaded() {
      return this.$store.getters.isMyProfileLoaded;
    },
    email() {
      return this.$store.getters.user('email');
    },
    username() {
      return this.$store.getters.user('username');
    },
    myName: {
      get() {
        return this.$store.getters.myProfile('name');
      },
      set(value) {
        this.$store.commit(ME_NAME, value);
      },
    },
  },
  mounted() {
    if (!this.$store.getters.isMyProfileLoaded) {
      this.$store.dispatch(RETRIEVE_ME);
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch(RETRIEVE_ME);
    },
    save() {
      this.$store.dispatch(UPDATE_ME, this.$store.state.me.data);
    },
  },
};
</script>
