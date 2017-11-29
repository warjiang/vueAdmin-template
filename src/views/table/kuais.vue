<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="margin-top: 5px">


      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column label="学校">
        <template scope="scope">
          {{scope.row.school}}
        </template>
      </el-table-column>
      <el-table-column label="年份">
        <template scope="scope">
          {{scope.row.year}}
        </template>
      </el-table-column>
      <el-table-column label="题目">
        <template scope="scope">
          <div @click="originCertfiedImg(scope.row.imglist, $event)">
            <img :src="item+'?imageView2/1/w/80/h/80'" alt="" v-for="item in scope.row.imglist" >
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleModifyDianpings(scope.$index,scope.row.kuaiid,'delete')">删除
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
  import {listAllKuais,deleteKuais} from '@/api/kuais'
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
        limit: 10,
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
      listAllKuais().then(response => {
        this.total = response.data.total;
        this.list = response.data.list.map((value,index)=>{
          const {description,imglist,kuaiid,school,year} = value;
          return {
            description,
            imglist:JSON.parse(imglist),kuaiid,school,year
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
      listAllKuais(val).then((response) => {
        this.total = response.data.total;
        this.list = response.data.list.map((value,index)=>{
          const {description,imglist,kuaiid,school,year} = value;
          return {
            description,
            imglist:JSON.parse(imglist),kuaiid,school,year
          }
        })
        this.listLoading = false
      })
    },
    handleModifyDianpings(index,kuaisId, action) {
      if(action === 'delete'){
        console.log(`${action}=>${kuaisId}=>${index}`)
        deleteKuais(kuaisId).then(response => {
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
description:"这里是快题介绍"
imglist:"["https://archimg.spotty.com.cn/Fh8IbmAT9OR41IaQP6qAQ-YIbhjQ","https://archimg.spotty.com.cn/FnMhomMRGBrg6UZm8slH89xltpk2"]"
kuaiid:1
school:"东南大学"
year:2017
*/
</script>
<style>
  .dialogImg {
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-right:5px;
  }
</style>
