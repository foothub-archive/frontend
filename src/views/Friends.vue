<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="6"></el-col>
    <el-col :span="12">
      <div>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6"></el-col>
          <el-col :span="12">
            <el-input v-model="search" debounce="600" placeholder="Type to search"/>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <el-table v-if="data" :data="data" style="width: 100%">
          <el-table-column label="Name" prop="friend.name">
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="details(scope.$index, scope.row)">
                Details
              </el-button>
              <el-button size="mini" type="danger" @click="delete(scope.$index, scope.row)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
import { LIST_FRIENDS } from '@/store/actions/friends';

export default {
  data() {
    return {
      search: '',
    };
  },
  computed: {
    data() {
      console.warn(this.$store.state.friends);
      return this.$store.getters.friendResults;
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(this.tableData[index].name);
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  mounted() {
    console.log('HEHEH', LIST_FRIENDS);
    this.$store.dispatch(LIST_FRIENDS);
  },
};
</script>
