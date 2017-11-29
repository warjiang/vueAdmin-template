<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="margin-top: 5px">


      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.row.dianpingid}}
        </template>
      </el-table-column>
      <el-table-column label="描述" width="280">
        <template scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column label="任务书">
        <template scope="scope">
          <div @click="originCertfiedImg(scope.row.mission, $event)">
            <img :src="item+'?imageView2/1/w/80/h/80'" alt="" v-for="item in scope.row.mission" >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="草图">
        <template scope="scope">
          <div @click="originCertfiedImg(scope.row.draft, $event)">
            <img :src="item+'?imageView2/1/w/80/h/80'" alt="" v-for="item in scope.row.draft" >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="200" align="center">
        <template scope="scope">
          {{scope.row.tags}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleModifyDianpings(scope.$index,scope.row.dianpingid,'pass')">通过
          </el-button>
          <el-button size="small" type="danger" @click="handleModifyDianpings(scope.$index,scope.row.dianpingid,'reject')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               size="tiny">
      <div>
        <img :src="item+'?imageView2/1/w/220/h/220'" alt="" v-for="item in currentImgs" class="dialogImg">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {listDianpings, passDianping, rejectDianping} from '@/api/dianpings'
  import {questionsType} from '@/api/conf'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      currentImgs: [],
      dialogVisible: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      currentPage:1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      listDianpings().then(response => {
        //console.log(response.data)
        //this.list = response.data.list;
        this.total = response.data.total;
        this.list = response.data.list.map((item,index,array)=>{
          let {avatar, commentnum, description, dianpingid, imglist, publishtime, reward, solverid, tags, thumbs, userid, username} = item;
          imglist = JSON.parse(imglist);
          let mission = imglist['mission'].map((img,index)=>{
            return "https://archimg.spotty.com.cn/"+img
          })
          let draft = imglist['draft'].map((img,index)=>{
            return "https://archimg.spotty.com.cn/"+img
          })

          return {
            avatar, commentnum, description, dianpingid,
            mission,draft,
            publishtime, reward, solverid,
            tags: JSON.parse(tags).join("/"),
            thumbs, userid, username
          }
        })
        this.listLoading = false
      })
    },
    handleSizeChange() {
      console.log('handleSizeChange')
    },
    handleCurrentChange(val) {
      this.listLoading = true
      listDianpings(val).then((response) => {

        this.total = response.data.total;
        this.list = response.data.list.map((item,index,array)=>{
          let {avatar, commentnum, description, dianpingid, imglist, publishtime, reward, solverid, tags, thumbs, userid, username} = item;
          imglist = JSON.parse(imglist);
          let mission = imglist['mission'].map((img,index)=>{
            return "https://archimg.spotty.com.cn/"+img
          })
          let draft = imglist['draft'].map((img,index)=>{
            return "https://archimg.spotty.com.cn/"+img
          })

          return {
            avatar, commentnum, description, dianpingid,
            mission,draft,
            publishtime, reward, solverid,
            tags: JSON.parse(tags).join("/"),
            thumbs, userid, username
          }
        })
        this.listLoading = false

      })
    },
    handleModifyDianpings(index,questionId, action) {
      // console.log(`${action}=>${index}=>${questionId}`);
      if (action === 'pass'){
        passDianping(questionId).then(response =>{
          this.$message({
            message: `${response.data}`,
            type: 'success'
          })
          this.list.splice(index,1)
        })
      }else if (action === 'reject'){
        rejectDianping(questionId).then(response =>{
          this.$message({
            message: `${response.data}`,
            type: 'success'
          })
          this.list.splice(index,1)
        })
      }
    },
    originCertfiedImg(img, e) {
      console.log(img)
      this.currentImgs = img
      this.dialogVisible = true
    }
  }
}
/*
avatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKSOdlyhhLrC3kGhBLDIOSt8mLqPUGbzIRwAM11onPyN0R2oIJgHvYu1fFCnyCnxIHyibibHGC0fl1w/0"
commentnum:2
description:"描述3"
dianpingid:61
imglist:"{"mission":["FuQ1Cw7ZXR5QaHLNn_TYFjMIWhXG"],"draft":["FiBj_GrViKNpy9AVhDv7B67R5fx2"]}"
publishtime:1504931151000
reward:1
solverid:-1
tags:"["规划设计"]"
thumbs:0
userid:4
username:"阿德"
*/
</script>
<style>
  .dialogImg {
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-right:5px;
  }
</style>
