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
  LOADED_G as LOADED_G,
  NAME_M as NAME_M,
  GET_A as GET_A,
  PUT_A as PUT_A,
} from '../store/constants/me';

export default {
  name: 'Home',
  computed: {
    loaded() {
      return this.$store.getters[LOADED_G];
    },
    email() {
      return 'email'; // this.$store.state.user('email');
    },
    username() {
      return 'username'; // this.$store.getters.user('username');
    },
    name: {
      get() {
        return this.$store.state.me.profile.name;
      },
      set(value) {
        this.$store.commit(NAME_M, value);
      },
    },
  },
  mounted() {
    if (!this.$store.getters[LOADED_G]) {
      this.$store.dispatch(GET_A);
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch(GET_A);
    },
    save() {
      this.$store.dispatch(PUT_A, this.$store.state.me.profile);
    },
  },
};
</script>
