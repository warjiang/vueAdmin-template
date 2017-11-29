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
            <el-select v-model="question.type" placeholder="请选择题目类型">
              <el-option v-for="(item, key) in questionsType"
                         v-bind:label=item
                         v-bind:value=key></el-option>
            </el-select>
          </el-col>
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
        <el-button type="primary" @click="addOptions">增加选项</el-button>
        <el-button type="primary" @click="onSubmit">更新题库</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { addQuestion } from '@/api/questions'
  // import { validateURL } from '@/utils/validate'
  import Tinymce from '@/components/Tinymce'
  import MDinput from '@/components/MDinput'
  import { categories, L1Categories, questionsType } from '@/api/conf'
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
        question: {
          type: '1',
          categoryl1: 82,
          categoryl2: -1,
          categoryl3: -1,
          school: '其他',
          year: '1970'
        },
        choicesMap: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
        choicesIndex: 0,
        choices: {},
        L1Categories: L1Categories,
        questionsType: questionsType
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
        // return this.question
      },
      l3category: function() {
        // return this.question
      },

      L2Categories: function() {
        // question.categoryl1
        return categories.filter((item, index) => {
          return item['parent'] === this.question.categoryl1
        })
      },
      L3Categories: function() {
        // question.categoryl2
        if (this.question.categoryl2 === -1) {
          return []
        } else {
          return categories.filter((item, index) => {
            return item['id'] === this.question.categoryl2
          })[0]['children']
        }
      }
    },
    created() {
      console.log('created')
    },
    methods: {
      fetchQuestion() {
        console.log('fetch')
      },
      addOptions() {
        console.log('addOptions')
        // this.choices[this.choicesMap[this.choicesIndex]] = '选项内容'
        Vue.set(this.choices, this.choicesMap[this.choicesIndex], '选项内容')
        console.log(this.choices)
        this.choicesIndex++
      },
      onSubmit() {
        // console.log(this.question)
        this.question['choices'] = JSON.stringify(this.choices)
        console.log(this.question)
        let data = ''
        for (const key in this.question) {
          data += '&' + key + '=' + this.question[key]
        }
        data = data.slice(1)
        addQuestion(data).then(response => {
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
        console.log('submit!')
      }
    }
  }
</script>
