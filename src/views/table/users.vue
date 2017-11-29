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

      <el-table-column label="手机号码" width="150" align="center">
        <template scope="scope">
          {{scope.row.phoneNumber == '' ? '未知手机号码' : scope.row.phoneNumber}}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="200" align="center">
        <template scope="scope">
          {{scope.row.idCard == ''? '未知身份证' : scope.row.idCard }}
        </template>
      </el-table-column>
      <el-table-column label="学校" align="center">
        <template scope="scope">
          {{scope.row.oldSchool == ''? '未知本科院校' : scope.row.oldSchool }}
        </template>
      </el-table-column>
      <el-table-column label="目标学校" align="center">
        <template scope="scope">
          {{scope.row.targetSchool== ''? '未知目标院校' : scope.row.targetSchool}}
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
  import { getUsers } from '@/api/users'

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
      questionId: function() {
        return this.$route.query['questionId']
      }
    },
    created() {
      this.fetchApplications()
    },
    methods: {
      fetchApplications() {
        getUsers('S').then(response => {
          this.total = response.data.total
          this.list = response.data.list
          this.listLoading = false
        })
      },
      handleSizeChange() {
        console.log('handleSizeChange')
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        getUsers('S',val).then(response => {
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
    /*
    avatar:"http://img.jsqq.net/uploads/allimg/150111/1_150111080328_19.jpg"
    certifiedImg:""
    extra:""
    idCard:""
    institute:""
    major:82
    oldSchool:"东南大学"
    openid:"o_Xzs0J1Z9yRgV1dpVt61EcWOrgE"
    password:""
    phoneNumber:"13770507225"
    reward:0
    role:"S"
    status:0
    targetSchool:"清华大学"
    userId:3
    username:"丁文江"
    */
  }
</script>
<style lang="scss">
  .certfiedImg {
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-right:5px;
  }
</style>
