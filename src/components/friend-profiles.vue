<template>
    <el-row
        type="flex"
        class="row-bg"
        justify="space-between">
        <el-col>
            <el-input
                v-model="search"
                size="mini"
                placeholder="Type to search"
                @input="debouncedSearch"/>
            <br>
            <el-table
                v-loading.body="loading"
                v-if="hasResults"
                :data="results"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                style="width: 100%">
                <el-table-column
                    v-for="(header, index) in headers"
                    :prop="header.prop"
                    :label="header.label"
                    :key="index"/>
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <el-button
                            :disabled="AddFriendDisabled(scope.$index)"
                            size="mini"
                            @click="handleAddFriend(scope.$index)">
                            Add Friend
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :current-page="current"
                :page-size="pageSize"
                :total="count"
                :disabled="loading"
                layout="prev, pager, next"
                @current-change="handlePaginationChange"/>
        </el-col>
    </el-row>
</template>

<script>
import {
  LOADING_G as LOADING_G,
  HAS_RESULTS_G as HAS_RESULTS_G,
  SEARCH_M as SEARCH_M,
  CURRENT_M as CURRENT_M,
  LIST_A as LIST_A,
} from '../client-shared/src/vuex-store/constants/friend-profiles';

import { POST_A as POST_A } from '../client-shared/src/vuex-store/constants/friend-inviting';

export default {
  name: 'FriendProfiles',
  data() {
    return {
      headers: [
        {
          prop: 'name',
          label: 'Name',
        },
      ],
      searchTimeout: undefined,
      debounceTimer: 700, // ms
    };
  },
  computed: {
    results() {
      return this.$store.state.friendProfiles.paginated.results;
    },
    current: {
      get() {
        return this.$store.state.friendProfiles.paginated.current;
      },
      set(value) {
        return this.$store.commit(CURRENT_M, value);
      },
    },
    count() {
      return this.$store.state.friendProfiles.paginated.count;
    },
    pageSize() {
      return 14;
    },
    search: {
      get() {
        return this.$store.state.friendProfiles.paginated.search;
      },
      set(value) {
        this.debouncedSearch(value);
      },
    },
    loading() {
      return this.$store.getters[LOADING_G];
    },
    hasResults() {
      return this.$store.getters[HAS_RESULTS_G];
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch(LIST_A);
    },
    AddFriendDisabled(index) {
      const profile = this.results[index];
      return profile.is_friend || profile.has_friend_invitation;
    },
    handleAddFriend(index) {
      const profileUuid = this.results[index].uuid;
      this.$store.dispatch(POST_A, profileUuid)
        .then(() => {
          this.loadData();
        });
    },
    doSearch() {
      this.current = 1;
      this.loadData();
    },
    debouncedSearch(value) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.$store.commit(SEARCH_M, value);
        this.doSearch();
      }, this.debounceTimer);
    },
    handlePaginationChange(page) {
      this.current = page;
      this.loadData();
    },
  },
};
</script>
