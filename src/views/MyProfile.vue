<template>
    <div>
        <div>
            My Profile
        </div>
        <el-form
            v-if="loaded"
            label-width="120px">
            <el-form-item label="Email">
                <el-input
                    v-model="email"
                    :disabled="true"/>
            </el-form-item>
            <el-form-item label="Username">
                <el-input
                    v-model="username"
                    :disabled="true"/>
            </el-form-item>
            <el-form-item label="Name">
                <el-input v-model="name"/>
            </el-form-item>
        </el-form>
        <el-button
            type="primary"
            @click="refresh()">
            Refresh
        </el-button>
        <el-button
            type="primary"
            @click="save()">
            Save
        </el-button>
    </div>
</template>

<script>
import {
  LOADED_G as LOADED_USER_G,
  GET_A as GET_USER_A
} from '../shared/src/vuex-store/constants/user';
import {
  LOADED_G as LOADED_PROFILE_G,
  NAME_M as PROFILE_NAME_M,
  GET_A as GET_PROFILE_A,
  PUT_A as PUT_PROFILE_A,
} from '../shared/src/vuex-store/constants/me';

export default {
  name: 'Home',
  computed: {
    loaded() {
      return this.$store.getters[LOADED_USER_G] &&
        this.$store.getters[LOADED_PROFILE_G];
    },
    email() {
      return this.$store.state.user.user.email;
    },
    username() {
      return this.$store.state.user.user.username;
    },
    name: {
      get() {
        return this.$store.state.me.profile.name;
      },
      set(value) {
        this.$store.commit(PROFILE_NAME_M, value);
      },
    },
  },
  mounted() {
    if (!this.$store.getters[LOADED_USER_G]) {
      this.$store.dispatch(GET_USER_A);
    }
    if (!this.$store.getters[LOADED_PROFILE_G]) {
      this.$store.dispatch(GET_PROFILE_A);
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch(GET_PROFILE_A);
    },
    save() {
      this.$store.dispatch(PUT_PROFILE_A, this.$store.state.me.profile);
    },
  },
};
</script>
