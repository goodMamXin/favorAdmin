<template>  
  <el-form :model="form" ref="addCollectionInfoForm" :rules="rules" label-width="120px">
    <el-form-item label="栏目" prop="resource">
      <el-radio-group v-model="form.resource">
          <el-radio label="1">开场搭讪</el-radio>
          <el-radio label="2">幽默情话</el-radio>
          <el-radio label="3">诗词情话</el-radio>
      </el-radio-group>
    </el-form-item>   
    <el-form-item label="内容" prop="content">
      <el-input v-model="form.content" type="textarea" />           
    </el-form-item>
    <el-form-item label="id" prop="id" style="display:none">
       <el-input v-model="form.id" placeholder="" />
    </el-form-item>
    <el-form-item style="margin-bottom:0;">
      <el-button type="primary" @click="onSubmit" :disabled="disable">保存</el-button>
      <el-button @click='resetForm'>清除输入</el-button>
    </el-form-item>
  </el-form>
  <!-- 数据列表 -->
  <div class="datalist">
    <el-table :data="tableData" 
      :row-class-name="rowClassName"
      :default-sort="{ prop: 'id', order: 'descending' }"       
      border style="width: 100%" 
      max-height="380">      
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="resource" label="栏目" width="120" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="date" label="创建日期" width="180" />
      <el-table-column prop="name" label="创建人"   width="180" />
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">          
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
          <el-button size="small" type="danger" @click="deleteRow(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <template v-slot:empty>     
          <!-- 
          <div style="color:#909399">
            <el-icon  style="vertical-align: middle;"><warning /></el-icon>
            <span style="vertical-align: middle"> 暂无数据 </span>
          </div>  
          -->
          <span><img :src="img" style="margin-bottom:-11px"/>暂无数据 </span>    
      </template>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: "LoveDictionary",
  components: {},
  props: {},
  data() {    
    return {   
      img: require('../assets/nodata.png'),
      currentTime:'',         
      tableData:[ //表格初始数据
        {          
          id: '1001',
          resource: '诗词情话',      
          content: '既许一人以偏爱，愿尽余生之慷慨。',
          date: '2020-07-25 13:14:52',
          name: '玄心',
          uid: 'luo168'
        },
        {          
          id: '1002',
          resource: '诗词情话',      
          content: '衣带渐宽终不悔，为伊消得人憔悴。',
          date: '2020-07-25 13:14:52',
          name: '小金翎',
          uid: 'luo168'
        }
      ],
      clientHeight:'',
      scrollbarMaxHeight:'',
      form: {          
          id: '', // 数据id         
          resource: '',
          content: '',
          date:'',
          name: '',
          uid:''
      },
      rules: {
          resource: [            
            { required: true, message: '请选择栏目', trigger: 'change' },
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
      },
      disable:false //true为禁用，false为启用
    }    
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      // this.changeFixed(this.clientHeight)
    }
  },
  computed: {},
  methods: {    
    // 提交表单
    onSubmit() {
      let that = this;  
      this.$refs['addCollectionInfoForm'].validate(valid => {        
        // 校验通过valid返回true，否则返回false
        if (valid) { 
            //禁用按钮
            this.disable = true ;
            this.currentTime = this.getCurrentDateTime();  //获取当前时间   
            // let theResource = this.transformResource(this.form.resource); //类型转换    
            // 表单上的数据        
            let formData = {
              id: this.form.id,
              resource: this.form.resource,      
              content: this.form.content,
              date: this.currentTime,
              name: '小金翎',
              uid:'kim520'
            }    
            console.log(formData);        
            // 异步保存数据
            const url = '/api/loveDictionary/save';
            axios.post(url,formData).then(response => {
              console.log(response);
              var errcode = response.data.errcode;
              if(errcode =='0') {                
                // 向数据表添加行
                let tobj = {
                  id: response.data.data.id,//后端id
                  resource: this.transformResource(this.form.resource),      
                  content: this.form.content,
                  date: this.currentTime,
                  name: '小金翎',
                  uid:'kim520'
                }                
                this.tableData.push(tobj);
                this.disable = false ;
                that.$message({ type: "success", message: "保存成功!", });
                // 重置表单
                this.resetForm();
                // 重载数据
                this.getData();
              } else {
                that.$message({ type: "error", message: "保存失败!" });
                this.disable = false ;
              }
            })
            .catch(err =>{// 请求服务器失败
              that.$message({ type: "error", message: err });
              this.disable = false ;
            })
        } else {          
          that.$message({ type: "error", message: "必填项不能为空!" });
          return false
        }
      })
      //console.log(this.form);
      //console.log(this.form.resource);
    },
    // 重置表单
    resetForm(){           
      this.$refs.addCollectionInfoForm.resetFields();      
    },
    handleEdit: function(index , row) {
      console.log(row)
      // 回显
      console.log(this.transformResource(row.resource))
      console.log(row.content)
      this.form.id = row.id;
      this.form.content = row.content;
      this.form.resource = this.transformResource(row.resource).toString();
      this.$message({ type: "success", message: "回显成功!", });
    },
    /**
     * 批量删除行
     * @param {object} row 行数据
     * @param {number} index 行数据的索引
     */
    deleteRow: function (index, row) {
        console.log('行索引=' + index)
        console.log('数据id=' + row.id)
        //this.tableData = this.tableData.filter(o => o.id != row.id)     
        this.$confirm("确定删除这条数据，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          // 删除api
          const url = '/api/loveDictionary/del';
          let paramObj = {
            "id": row.id
          }
          axios.post(url,paramObj).then(response => {
            console.log(response);
            if(response.data.errcode =='0'){
                this.$message({ type: "success", message: "删除成功!" });  
                // filter()对象遍历,true 返回对象参数值,如果多条数据,自动使用数组拼接
                this.tableData = this.tableData.filter(item  => {
                  //console.log(item)
                  if(item.id != row.id){
                    return item;//字符串索引有关键字值,返回true
                  }
                });
                // 输出过滤后的数据
                console.log(this.tableData); 
            }else {
                this.$message({ type: "error", message: "删除失败!" });  
            }    
          })
          .catch(err =>{// 请求服务器失败
            this.$message({ type: "error", message: err });
          })
          // 重置表单
          this.$refs.addCollectionInfoForm.resetFields();  
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        });
    },
    // 获取当前时间
    getCurrentDateTime: function() {        
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()+1 < 10? '0' + (new Date().getMonth() + 1): new Date().getMonth() + 1;
        let dd = new Date().getDate() < 10? '0' + new Date().getDate(): new Date().getDate();
        let hh =new Date().getHours() < 10? '0' + new Date().getHours(): new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        let time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        //console.log(time)
        return time
	  },
    rowClassName({ row, rowIndex }) {//实现第一列的序号字段。行的 className 的回调方法
      //row.id = rowIndex + 1;
    },
    // 栏目类型转换
    transformResource: function( type) {
      let result = "" ;
      switch(type) {
        case "1":
            result = '开场搭讪'
            break;
        case "2":
            result = '幽默情话'
            break;
        case "3":
            result = '诗词情话'
            break;        
        case "开场搭讪":
            result = '1'
            break;
        case "幽默情话":
            result = '2'
            break;
        case "诗词情话":
            result = '3'
            break;
        default:
            //
      }
      return result;
    },
    getData: function() {
      const url = '/api/loveDictionary/find';
      let paramObj = {
      }
      axios.post(url,paramObj).then(response => {
        console.log(response);
        if(response.data){ //不为空
            this.tableData = response.data;
        }        
      })
      .catch(err =>{// 请求服务器失败
        this.$message({ type: "error", message: err });
      })
    }
  },
  created() {},
  mounted() {
    // 请求数据
    let that = this ;
    that.getData();
  }  
};
</script>
<style scoped>
.el-form {
  background-color:#fff;
  padding:10px;
  border-radius: 6px;
}
.datalist {
  border-radius: 6px;
  padding:10px;
  margin-top: 10px;
  background-color:#fff;
}
</style>
