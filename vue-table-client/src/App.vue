<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header class="head" height="100px">
      <h2>Vue小模块</h2>
      <h4>功 能 全 面 的 表 格</h4>
    </el-header>
    <!-- 主区域 -->
    <el-main>
      <data-table></data-table>
    </el-main>
  </el-container>
</template>

<script>
import DataTable from './components/DataTable'

export default {
  name: 'App',
  components: {
    DataTable
  }
}
</script>

<style>
.head{
  background-color: #409EFF;
  color: white;
}
</style>
