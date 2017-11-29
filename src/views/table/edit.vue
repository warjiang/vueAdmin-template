<template>
  <div class="app-container">
    <el-form :model="postForm" label-width="80px" ref="postForm" v-if="question">
      <el-form-item label="题目">
        <el-input v-model="question.question"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="答案">
          <el-col :span="4">
            <el-input v-model="question.answer"></el-input>
          </el-col>
        <!--</el-form-item>-->
        <!--<el-form-item label="类型">-->
          <el-col :span="4" style="margin-left: 10px;">
            <el-select v-model="question.categoryl1" placeholder="请选择一级分类">
              <el-option label="未知章节" value="-1"></el-option>
              <el-option v-bind:label="item['name']" v-for="(item, key) in L1Categories" v-bind:value="item['id']"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="question.categoryl2" placeholder="请选择二级分类">
              <el-option label="未知章节" value="-1"></el-option>
              <el-option v-bind:label="item['name']" v-for="(item, key) in L2Categories" v-bind:value="item['id']"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="question.categoryl3" placeholder="请选择三级分类">
              <el-option label="未知章节" value="-1"></el-option>
              <el-option v-bind:label="item['name']" v-for="(item, key) in L3Categories" v-bind:value="item['id']"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="其他">
          <el-col :span="4">
            <el-input v-model="question.school"></el-input>
          </el-col>
          <el-col :span="4" style="margin-left: 10px;">
            <el-input v-model="question.year"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item v-bind:label="'选项'+key" v-bind:item="key" v-for="(choice, key) in choices">
        <el-input v-model="choices[key]"></el-input>
      </el-form-item>
      <el-form-item label="考点">
        <el-input v-model="question['point']"></el-input>
      </el-form-item>

      <el-form-item label="难点">
        <el-input v-model="question['difficultpoint']"></el-input>
      </el-form-item>
      <el-form-item label="解析">
        <el-input v-model="question['explanation']"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新题库</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getQuestionDetailById, updateQuestion } from '@/api/questions'
// import { validateURL } from '@/utils/validate'
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import { categories, L1Categories } from '@/api/conf'
import ElOption from "../../../node_modules/element-ui/packages/select/src/option.vue";

export default {
  components: {
    ElOption,
    MDinput, Tinymce },
  data() {
    return {
      postForm: {
        title: '', // 文章题目
        content: '我是测试数据我是测试数据', // 文章内容
        content_short: ''
      },
      question: null,
      choices: null,
      L1Categories: L1Categories
    }
  },
  computed: {
    questionId: function() {
      return this.$route.query['questionId']
    },
    l1category: function() {
      if (this.question.categoryl1 === -1) {
        return '未知分类'
      } else {
        return L1Categories.filter((item, index) => {
          return item['id'] === this.question.categoryl1
        })['name']
      }
    },
    l2category: function() {
      return this.question.categoryl2
    },
    l3category: function() {
      return this.question.categoryl3
    },

    L2Categories: function() {
      // question.categoryl1
      return categories.filter((item, index) => {
        return item['parent'] === this.question.categoryl1
      })
    },
    L3Categories: function() {
      // question.categoryl2
      return categories.filter((item, index) => {
        return item['id'] === this.question.categoryl2
      })[0]['children']
    },
    answer: function() {
      return this.question.answer
    }
  },
  created() {
    this.fetchQuestion()
  },
  methods: {
    fetchQuestion() {
      getQuestionDetailById(this.questionId).then(response => {
        this.question = response.data
        this.choices = JSON.parse(this.question.choices)
        this.question.categoryl1 = +this.question.categoryl1
        this.question.categoryl2 = +this.question.categoryl2
        this.question.categoryl3 = +this.question.categoryl3
        return response.data
      })
    },
    onSubmit() {
      // console.log(this.question)
      let data = ''
      for (const key in this.question) {
        data += '&' + key + '=' + this.question[key]
      }
      data = data.slice(1)
      updateQuestion(data).then(response => {
        if (response.data === null) {
          this.$message({
            message: `更新题目成功`,
            type: 'success'
          })
        } else {
          this.$message({
            message: `更新题目失败`,
            type: 'error'
          })
        }
      })
      // console.log('submit!')
    }
  }
}
</script>
