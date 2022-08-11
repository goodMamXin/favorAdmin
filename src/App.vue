<template>
  <el-container ref="homePage">
      <el-header>
        <div class="nav-header">
          <div>logo</div>
          <div>
            <!-- 用户头像-->
            <div class="block">
              <el-avatar :size="35" :src="uImag"/>
              <span class="uname" >{{uname}}</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-container style="padding-top: 50px;">
        <el-aside>
            <el-scrollbar :max-height="scrollbarMaxHeight">
              <el-menu
                default-active="1"
                router
                class="el-menu-vertical-demo"                
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >                
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon><edit /></el-icon>
                    <span>词库宝典</span>
                  </template>                  
                  <el-menu-item index="/">缠绵文案</el-menu-item>
                  <el-menu-item index="/declarationOfLove">为爱宣言</el-menu-item>                                   
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><histogram /></el-icon>
                    <span>数据统计</span>
                  </template>                  
                  <el-menu-item index="/rechargeRecord">充值记录</el-menu-item>
                  <el-menu-item index="/expensesRecord">消费记录</el-menu-item>                                   
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>                    
                    <el-icon><avatar /></el-icon>
                    <span>用户管理</span>
                  </template>                  
                  <el-menu-item index="/userInfo">用户信息</el-menu-item>
                  <el-menu-item index="/userSettings">用户设置</el-menu-item>                                   
                </el-sub-menu> 
              </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-main style="background-color:#f6f6f6;--el-main-padding: 5px;" :max-height="scrollbarMaxHeight">
          <router-view/>
        </el-main>
      </el-container>
  </el-container>
</template>

<script>
//import Home from "@/views/Home.vue";
export default {
  name: "App",
  components: {
    //Home,
  },
  props: {},
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      clientHeight:'',
      scrollbarMaxHeight:'400px',
      uname:'小金翎',
      uImag:require('./assets/uImag.png')
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  computed: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeFixed(clientHeight){ // 动态修改样式
      // console.log(clientHeight);
      this.$refs.homePage.$el.style.height = clientHeight+'px';
      this.scrollbarMaxHeight = (this.clientHeight -50)+'px'
    },
  },
  created() {},
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight =  `${document.documentElement.clientHeight}`              
    // console.log(this.clientHeight);
    // 菜单滚动条的最大高度
    this.scrollbarMaxHeight = (this.clientHeight -50)+'px'
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.scrollbarMaxHeight = (this.clientHeight -50)+'px'
    };
  }
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
  color: #2c3e50;
  height: 100%;
}
.el-header {
  background-color: #5383c3;
  color: #fff;
  line-height: 50px;
  height: 50px; 
  cursor: pointer;
  position: fixed; 
  z-index: 1;
  width: 100%;
}
.nav-header {
  display: flex;/* 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效 */
  display: -webkit-flex; /* Safari */
  justify-content:space-between;/* 两端对齐，项目之间的间隔都相等 */
  align-items:center;/*交叉轴的中点对齐*/ 
}
.block {
  display: flex;/* 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效 */
  display: -webkit-flex; /* Safari */
  justify-content:space-between;/* 两端对齐，项目之间的间隔都相等 */
  align-items:center;/*交叉轴的中点对齐*/
}
.uname { 
  margin-left:5px;display:block
}
.el-aside {  
  background-color: #545c64;
  color: #ffffff;
  overflow: hidden;
  width: 168px;
}
.el-sub-menu  {
  width: 168px;
}
.el-sub-menu .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0px;
    min-width:168px;
}
 
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
