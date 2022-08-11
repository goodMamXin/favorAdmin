<template>
  <h1>这是home页面</h1>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: "Home",
  components: {
    //HelloWorld
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
      scrollbarMaxHeight:''
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
    },
  },
  created() {},
  mounted() {
    /*
    // 获取浏览器可视区域高度
    this.clientHeight =  `${document.documentElement.clientHeight}`              
    // console.log(this.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };*/
  }
};
</script>
<style scoped>

</style>
