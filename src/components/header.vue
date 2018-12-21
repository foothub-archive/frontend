<template>
    <el-menu
        :router="true"
        :default-active="this.$route.path"
        mode="horizontal"
        class="el-menu-demo">
        <template v-for="(route, key) in $router.options.routes">
            <el-menu-item
                v-if="route.meta.navBar"
                :index="route.path"
                :key="key"
            >
                {{ route.name }}
            </el-menu-item>
        </template>
    </el-menu>
</template>
<style scoped lang='scss' rel="stylesheet/scss">
</style>
<script type='text/babel'>
export default {
};
</script>
