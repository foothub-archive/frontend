<template>
    <el-form>
        <el-form-item
            label="Name">
            <el-input
                v-model="friend.name"
                disabled/>
        </el-form-item>
    </el-form>
</template>

<script>
import {
  GET_A as GET_FRIEND_A,
} from '../client-shared/src/vuex-store/constants/friends'
import { friendsRoute } from '../router';

export default {
  name: 'Friend',
  data() {
    return {
      friendship: {},
    };
  },
  computed: {
    friendshipId() {
      return this.$route.params.id;
    },
    friend() {
      return this.friendship.friend || {};
    }
  },
  mounted() {
    this.loadFriend();
  },
  methods: {
    loadFriend() {
      this.$store.dispatch(GET_FRIEND_A, this.friendshipId)
        .then(resp => this.friendship = resp.data)
        .catch(() => this.$router.push({ name: friendsRoute.name }));
    }
  }
};
</script>

<style scoped>

</style>
