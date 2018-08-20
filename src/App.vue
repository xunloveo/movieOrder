<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
  color: #fff;
}
#app {
  font-family: Arial, "Hiragino Sans GB", 微软雅黑, 黑体-简, Helvetica, sans-serif;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;  
}
.el-table th {
  height: 35px;
}
.el-table td {
  height: 30px;
}
.el-table .cell {
  padding-left: 13px;
}
.el-table__header{
  font-size: 13px;
}
.el-table__body{
  font-size: 12px;
}
</style>
