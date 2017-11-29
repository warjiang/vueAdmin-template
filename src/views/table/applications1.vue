<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="110" align="center">
        <template scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="证件照">
        <template scope="scope">
          <!--<span>xxx</span>-->
          <!--<img src="http://archimg.spotty.com.cn/FtuXbtYkJ4PidJxmFCms_WEp4P3M?imageView2/1/w/80/h/80" alt="">-->
          <div @click="originCertfiedImg(scope.row.certifiedImg, $event)">
            <img :src="item+'?imageView2/1/w/80/h/80'" alt="" v-for="item in scope.row.certifiedImg" >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="110" align="center">
        <template scope="scope">
          {{scope.row.phoneNumber == '' ? '未知' : scope.row.phoneNumber}}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="200" align="center">
        <template scope="scope">
          {{scope.row.idCard}}
        </template>
      </el-table-column>
      <el-table-column label="学校" width="110" align="center">
        <template scope="scope">
          {{scope.row.institute}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyApplications(scope.row.userId,scope.$index,'accept')">通过
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyApplications(scope.row.userId,scope.$index, 'reject')">拒绝
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
  // import Vue from 'vue'
  // require("vue-zoombox")
  import zoombox from 'vue-zoombox'
  import { getApplications, acceptApplication, rejectApplication } from '@/api/applications'
  // import Tinymce from '@/components/Tinymce'
  // import MDinput from '@/components/MDinput'
  import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

  export default {
    components: {
      ElOption,
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
        getApplications().then(response => {
          this.total = response.data.total
          this.list = response.data.list.map((value, index, array) => {
            value['certifiedImg'] = JSON.parse(value['certifiedImg'])
            return value
          })
          this.listLoading = false
        })
      },
      handleSizeChange() {
        console.log('handleSizeChange')
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchApplications(val).then(response => {
          this.total = response.data.total
          this.list = response.data.list.map((value, index, array) => {
            value['certifiedImg'] = JSON.parse(value['certifiedImg'])
            return value
          })
          this.listLoading = false
        })
      },
      handleModifyApplications(id, index, action) {
        if (action === 'accept') {
          acceptApplication(id).then(responce => {
            this.list.splice(index, 1)
            this.$message({
              message: `通过申请成功`,
              type: 'success'
            })
          })
        } else if (action === 'reject') {
          rejectApplication(id).then(response => {
            this.list.splice(index, 1)
            this.$message({
              message: `拒绝申请成功`,
              type: 'success'
            })
          })
        }
      },
      originCertfiedImg(img, e) {
        //console.log(img)
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
