<template>
    <el-row
        type="flex"
        class="row-bg"
        justify="space-between">
        <el-col :span="6"/>
        <el-col :span="12">
            <el-row
                type="flex"
                class="row-bg"
                justify="space-between">
                <el-col :span="6"/>
                <el-col :span="12">
                    <el-input
                        v-model="search"
                        placeholder="Type to search"
                        @input="debouncedSearch"/>
                </el-col>
                <el-col :span="6"/>
            </el-row>
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
                            size="mini"
                            @click="handleAccept(scope.$index)">
                            Accept
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)">
                            Delete
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
        <el-col :span="6"/>
    </el-row>
</template>

<script>
import {
  LOADING_G as LOADING_G,
  HAS_RESULTS_G as HAS_RESULTS_G,
  SEARCH_M as SEARCH_M,
  CURRENT_M as CURRENT_M,
  ACCEPT_A as ACCEPT_A,
  DELETE_A as DELETE_A,
  LIST_A as LIST_A,
} from '../store/constants/friend-invites';

export default {
  name: 'FriendInvites',
  data() {
    return {
      headers: [
        {
          prop: 'friend.name',
          label: 'Name',
        },
      ],
      searchTimeout: undefined,
      debounceTimer: 700, // ms
    };
  },
  computed: {
    results() {
      return this.$store.state.friendInvites.paginated.results;
    },
    current: {
      get() {
        return this.$store.state.friendInvites.paginated.current;
      },
      set(value) {
        return this.$store.commit(CURRENT_M, value);
      },
    },
    count() {
      return this.$store.state.friendInvites.paginated.count;
    },
    pageSize() {
      return 14;
    },
    search: {
      get() {
        return this.$store.state.friendInvites.paginated.search;
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
    handleAccept(index) {
      this.$store.dispatch(ACCEPT_A, this.results[index].id)
        .then(() => {
          this.loadData();
        });
    },
    handleDelete(index) {
      this.$store.dispatch(DELETE_A, this.results[index].id)
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
