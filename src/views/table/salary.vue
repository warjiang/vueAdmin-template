<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="150">
        <template scope="scope">
          <img :src="scope.row.avatar" alt="" style="width: 50px;max-width: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="150" align="center">
        <template scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column label="手机号码"  align="center">
        <template scope="scope">
          {{scope.row.phoneNumber == '' ? '未知手机号码' : scope.row.phoneNumber}}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template scope="scope">
          {{scope.row.idCard == ''? '未知身份证' : scope.row.idCard }}
        </template>
      </el-table-column>
      <el-table-column label="薪水(元)" width="200" align="center">
        <template scope="scope">
          {{scope.row.reward/100 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="makeSalaryBalance(scope.$index,scope.row.userId)">结算
          </el-button>
        </template>
      </el-table-column>


    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               size="tiny">
      <div>
        <img :src="item+'?imageView2/1/w/220/h/220'" alt="" v-for="item in currentImgs" class="certfiedImg">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import zoombox from 'vue-zoombox'
  import { getTeacherSalary,makeBalance } from '@/api/salary'

  export default {
    components: {
      zoombox
    },
    data() {
      return {
        dialogVisible: false,
        list: null,
        total: null,
        listLoading: true,
        currentImgs: [],
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        }
      }
    },
    computed: {
    },
    created() {
      this.fetchSalary()
    },
    methods: {
      fetchSalary() {
        getTeacherSalary().then(response => {
          this.total = response.data.total
          this.list = response.data.list
          this.listLoading = false
        })
      },
      handleSizeChange() {
        console.log('handleSizeChange')
      },
      makeSalaryBalance(index,userId){
          console.log(index,userId)
          //this.list[index].reward = 0
          //Objectcode: 200data: desc: "清算成功"id: 1reward: 0__proto__: Objectmessage: "SUCCESS"__proto__: Object
          makeBalance(userId).then(response=>{
              //console.dir(response.data.desc)
              if(response.data.desc == '清算成功'){
                  this.$message({
                    message: `结算成功`,
                    type: 'success'
                  })
                  this.list.splice(index,1)
              }else {
                this.$message({
                  message: `结算失败`,
                  type: 'error'
                })
              }
          })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        getTeacherSalary(val).then(response => {
          this.total = response.data.total
          this.list = response.data.list
          this.listLoading = false
        })
      },
      handleModifyApplications(id, index, action) {

      },
      originCertfiedImg(img, e) {
        this.currentImgs = img
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang="scss">
  .certfiedImg {
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-right:5px;
  }
</style>
