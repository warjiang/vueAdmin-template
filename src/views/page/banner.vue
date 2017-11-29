<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="抓取连接">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="banner图片">
        <el-input v-model="form.imgSrc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chooseImg">选择图片</el-button>
        <el-button type="primary" @click="addRecommend">立即增加</el-button>
      </el-form-item>
      <div>
        <!--multiple="multiple"-->
        <input type="file" id="hiddenFile" style="display: none;" @change="updateFiles">
      </div>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="URL链接">
        <template scope="scope">
          {{scope.row.contentUrl}}
        </template>
      </el-table-column>
      <el-table-column label="banner图片">
        <template scope="scope">
          <img :src="scope.row.imgSrc+'?imageView2/1/w/80/h/80'" alt="">
        </template>
      </el-table-column>
      <el-table-column label="发布时间">
        <template scope="scope">
          {{scope.row.publishTime | formatTime('YMDHMS')}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {capturePage, addRecommend, getRecommend} from '@/api/recommend'
  import {getQiniuToken} from '@/api/qiniu'

  export default {
    data() {
      return {
        form: {
          title: '',
          url: '',
          imgSrc: '',
        },
        token: null,
        list: null,
        listLoading: true,
        baseUrl: 'https://archimg.spotty.com.cn/'
      }
    },
    created: function () {
      this.init();
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      addRecommend() {
        //console.log("add recommend")
        if(this.form.imgSrc == ''){
          this.$message({
            message: `请先上传banner图片`,
            type: 'error'
          })
          return;
        }
        if(this.form.url == ''){
          this.$message({
            message: `请输入抓取url`,
            type: 'error'
          })
          return;
        }
        const self = this
        if(this.form.url != '' && this.form.url!=undefined){
          capturePage(this.form.url).then(response => {
            self.form.url = response.data.url
            addRecommend(self.form.title,self.form.url,self.form.imgSrc).then(ret =>{
              console.log(ret)
              self.$message({
                message: `增加banner成功`,
                type: 'success'
              })
              //window.location.reload()
            })
          });
        }
      },
      init() {
        Promise.all([getRecommend(), getQiniuToken()]).then((d)=> {
          //console.log(d[0])
          //console.log(d[1])
          this.list = d[0].data
          this.token = d[1].data.upToken
          this.listLoading = false
        })
      },
      chooseImg(){
        console.log('chooseImg')
        document.getElementById('hiddenFile').click()
      },
      updateFiles(e){
        var self = this;
        let formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('token', this.token)
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let r = JSON.parse(xhr.responseText)
            let imgUrl = self.baseUrl + r['hash']
            self.form.imgSrc=imgUrl
          }
        }
        // xhr.open('POST', 'http://up.qiniu.com')
        xhr.open('POST', 'https://upload.qbox.me')
        xhr.send(formData)
      }
    }
  }
</script>
