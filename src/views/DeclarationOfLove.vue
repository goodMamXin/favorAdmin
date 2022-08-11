<template>
  <div class="about">
    <h1>这是爱的宣言</h1>
  </div>
</template>
<script>
export default {
  name: "DeclarationOfLove",
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
