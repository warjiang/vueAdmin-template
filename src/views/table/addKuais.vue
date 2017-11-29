<template>
  <div class="app-container">
    <el-form :model="postForm" label-width="80px" ref="postForm" v-if="question">
      <el-form-item label="描述">
        <el-input v-model="question.desc" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="question.school" placeholder="请输入学校"></el-input>
      </el-form-item>

      <el-form-item label="年份">
        <el-input v-model="question.year" placeholder="请输入年份"></el-input>
      </el-form-item>

      <el-row style="box-sizing: border-box;padding-left: 80px;">
        <img :src="img" alt="" v-for="img in uploadList" class="kuai-img">
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="chooseImg">选择图片</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>


      <div>
        <!--multiple="multiple"-->
        <input type="file" id="hiddenFile" style="display: none;" @change="updateFiles">
      </div>
    </el-form>

  </div>
</template>

<script>
  import { addKuais } from '@/api/kuais'
  import { getQiniuToken } from '@/api/qiniu'

  export default {
    components: {},
    data() {
      return {
        postForm: {
          title: '', // 文章题目
          content: '我是测试数据我是测试数据', // 文章内容
          content_short: ''
        },
        question: {
          desc: '',
          school: '',
          year: ''
        },
        token: null,
        files: [],
        uploadList: [],
        baseUrl: 'https://archimg.spotty.com.cn/'
      }
    },
    created() {
      console.log('created')
      getQiniuToken().then(response => {
        if (response.data === null) {
          this.$message({
            message: `更新题目成功`,
            type: 'success'
          })
        } else {
          this.token = response.data.upToken
        }
      })
    },
    methods: {
      addKuais() {
        console.log('fetch')
      },
      chooseImg() {
        console.log('chooseImg')
        document.getElementById('hiddenFile').click()
      },
      updateFiles(e) {
        var self = this;
        // console.log(e.target.files)
        let formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('token', this.token)

        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log(xhr.responseText)
            let r = JSON.parse(xhr.responseText)
            let imgUrl = self.baseUrl + r['hash']
            self.uploadList.push(imgUrl)
            // console.log(self.uploadList)
          }
        }
        // xhr.open('POST', 'http://up.qiniu.com')
        xhr.open('POST', 'https://upload.qbox.me')
        xhr.send(formData)
      },
      onSubmit() {
        // console.log(this.uploadList)
        // console.log(this.question)
        let q = this.question
        q.imgList = this.uploadList
        addKuais(q).then(response => {
          if (response.data === '发布快题成功') {
            this.$message({
              message: `增加成功`,
              type: 'success'
            })
          } else {
            this.$message({
              message: `增加失败`,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .kuai-img{
    width: 260px;
    height: 260px;
    border: 1px solid #ccc;
    margin-right: 20px;
  }
</style>
