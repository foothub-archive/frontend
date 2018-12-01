<template>
  <div>
    <div>
      My Profile
    </div>
    <el-form v-if="isMyProfileLoaded" label-width="120px">
      <el-form-item label="Name">
          <el-input v-model="myName"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="refresh()">
      Refresh
    </el-button>
  </div>
</template>

<script>
import { RETRIEVE_ME } from '@/store/actions/me';

export default {
  name: 'home',
  computed: {
    isMyProfileLoaded() {
      return this.$store.getters.isMyProfileLoaded;
    },
    myName() {
      return this.$store.getters.myProfile('name');
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
  },
};
</script>
