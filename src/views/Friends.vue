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
                v-if="data"
                :data="data"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                style="width: 100%">
                <el-table-column
                    v-for="(header,index) of headers"
                    :prop="header.prop"
                    :label="header.label"
                    :key="index"/>
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="goToDetails(scope.$index)">
                            Details
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
                :current-page="paginationCurrentPage"
                :page-size="paginationPageSize"
                :total="paginationCount"
                :disabled="loading"
                layout="prev, pager, next"
                @current-change="handlePaginationChange"/>
        </el-col>
        <el-col :span="6"/>
    </el-row>
</template>

<script>
import { LIST_FRIENDS, DESTROY_FRIEND, FRIENDS_SEARCH } from '@/store/actions/friends';

export default {
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
    data() {
      return this.$store.state.friends.data.results;
    },
    paginationCurrentPage: {
      get() {
        return this.$store.state.friends.data.current;
      },
      set(value) {
        return this.$store.commit('FRIENDS_CURRENT_PAGE', value);
      },
    },
    paginationCount() {
      return this.$store.state.friends.data.count;
    },
    paginationPageSize() {
      return 14;
    },
    search: {
      get() {
        return this.$store.state.friends.search;
      },
      set(value) {
        console.log('on set', value);
        this.debouncedSearch(value);
      },
    },
    loading() {
      return this.$store.getters.friendsAreLoading;
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch(LIST_FRIENDS);
    },
    goToDetails(index) {
      console.log(index);
    },
    handleDelete(index) {
      this.$store.dispatch(DESTROY_FRIEND, this.data[index].id)
        .then(() => {
          this.loadData();
        });
    },
    doSearch() {
      this.paginationCurrentPage = 1;
      console.log('search?', this.search);
      this.loadData();
    },
    debouncedSearch(value) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.$store.commit(FRIENDS_SEARCH, value);
        this.doSearch();
      }, this.debounceTimer);
    },
    handlePaginationChange(page) {
      this.paginationCurrentPage = page;
      this.loadData();
    },
  },
};
</script>
