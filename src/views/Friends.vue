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
import { friendRoute } from '@/router';

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
    results() {
      return this.$store.state.friends.paginated.results;
    },
    current: {
      get() {
        return this.$store.state.friends.paginated.current;
      },
      set(value) {
        return this.$store.commit('friends/paginated/PAGINATED_CURRENT_M', value);
      },
    },
    count() {
      return this.$store.state.friends.paginated.count;
    },
    pageSize() {
      return 14;
    },
    search: {
      get() {
        return this.$store.state.friends.paginated.search;
      },
      set(value) {
        this.debouncedSearch(value);
      },
    },
    loading() {
      return this.$store.getters['friends/paginated/loading'];
    },
    hasResults() {
      return this.$store.getters['friends/paginated/hasResults'];
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch(`friends/paginated/PAGINATED_LIST_A`);
    },
    goToDetails(index) {
      this.$router.push({ name: friendRoute.name, params: { id: this.results[index].id}});
    },
    handleDelete(index) {
      this.$store.dispatch('friends/DELETE_FRIEND_A', this.results[index].id)
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
        this.$store.commit('friends/paginated/PAGINATED_SEARCH_M', value);
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
