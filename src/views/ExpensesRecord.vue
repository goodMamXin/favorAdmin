<template>
  <div class="about">
    <h1>This is 消费记录</h1>
  </div>
</template>
<script>
export default {
  name: "ExpensesRecord",
  components: {},
  props: {},
  data() {    
    return {  
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      // this.changeFixed(this.clientHeight)
    }
  },
  computed() {},
  created() {},
  mounted() {},
  methods: {
  }
}
</script>
<style scoped>
</style>

