<template>
  <div class="app-container">
    <div>
      <el-select v-model="selectedSchool" placeholder="请选择学校">
        <el-option
          v-for="item in schoolOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="selectedYear" placeholder="请选择年份">
        <el-option
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>


      <el-select v-model="selectedChapter" placeholder="请选择章节">
        <el-option
          v-for="item in chapterOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!--
      <select name="sortBySchool" id="sortBySchool">
        <options>东南大学</options>
        <options>南京大学</options>
      </select>

      <select name="sortByChapter" id="sortByChapter">
        <options>中建1</options>
        <options>外键1</options>
      </select>
      -->
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="margin-top: 5px">
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.row.questionId}}
        </template>
      </el-table-column>
      <el-table-column label="题目">
        <template scope="scope">
          {{scope.row.question}}
        </template>
      </el-table-column>
      <el-table-column label="来源" width="110" align="center">
        <template scope="scope">
          <span>{{scope.row.school}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年份" width="110" align="center">
        <template scope="scope">
          {{scope.row.year}}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110" align="center">
        <template scope="scope">
          {{scope.row.type}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyQuestions(scope.row.questionId,'edit')">编辑
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyQuestions(scope.$index,'delete',scope.row.questionId)">删除
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
  </div>
</template>

<script>
  import {
    getQuestions,
    deleteQuestionById,
    listYears,
    listSchools,
    listChapters,
    getQuestionByYear,
    getQuestionBySchool,
    getQuestionByChapter
  } from '@/api/questions'
  import {questionsType} from '@/api/conf'

export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      currentFilter:'DEFAULT',
      filterValue:'DEFAULT',
      selectedSchool: '所有学校',
      schoolOptions:[],
      selectedYear: '所有年份',
      yearOptions:[],
      selectedChapter: '所有章节',
      chapterOptions:[],
      currentPage:1
    }
  },
  created() {
    //var p1 = listYears();
    //var p2 = listSchools();
    //var p3 = listChapters();
    Promise.all([listYears(),listSchools(),listChapters()]).then(([years,schools,chapters])=>{
      this.yearOptions = years.data.map((value)=>{
        return {
          value: value,
          label: value
        }
      })
      this.schoolOptions = schools.data.map((value)=>{
        return {
          value: value,
          label: value
        }
      })

      this.chapterOptions = chapters.data.map((value)=>{
        return {
          value:value.id ,
          label: value.name
        }
      })
    })
    this.fetchData()

  },
  watch: {
    selectedSchool:function (currentSchool,oldSchool) {
      //console.log(`${currentSchool}=>${oldSchool}`)
      this.currentFilter = 'SCHOOL';
      this.filterValue = currentSchool;
      this.listLoading = true
      this.listQuery.page = 1
      getQuestionBySchool(currentSchool).then((response) => {
          console.log(response)
          this.total = response.data.total
          this.list = response.data.list.map((value, index, array) => {
            value['type'] = questionsType[value['type']]
            return value
          })
          this.listLoading = false
      })
    },
    selectedYear:function (currentYear,oldYear) {
      //console.log(`${currentYear}=>${oldYear}`)
      this.currentFilter = 'YEAR';
      this.filterValue = currentYear;
      this.listLoading = true
      this.listQuery.page = 1
      getQuestionByYear(currentYear).then((response)=>{
        console.log(response)
        this.total = response.data.total
        this.list = response.data.list.map((value, index, array) => {
          value['type'] = questionsType[value['type']]
          return value
        })
        this.listLoading = false
      })
    },
    selectedChapter:function (currentChapter,oldChapter) {
      //console.log(`${currentChapter}=>${oldChapter}`)
      this.currentFilter = 'CHAPTER';
      this.filterValue = currentChapter;
      this.listLoading = true
      this.listQuery.page = 1
      getQuestionByChapter(currentChapter).then((response) => {
        //console.log(value)
        this.total = response.data.total
        this.list = response.data.list.map((value, index, array) => {
          value['type'] = questionsType[value['type']]
          return value
        })
        this.listLoading = false
      })
    }
  },
  methods: {
    /*
    answer:"C"
    categoryl1:"-1"
    categoryl2:2
    categoryl3:24
    choices:"{"A":"\u4f0a\u745e\u514b\u5148\u795e\u5e99","B":"\u80dc\u5229\u795e\u5e99","C":"\u5361\u7eb3\u514b\u963f\u8499\u795e\u5e99","D":"\u6885\u677e\u5361\u745e\u795e\u5e99"}"
    difficultpoint:"几种不同的神庙的区别与特点"
    explanation:"伊瑞克先神庙、胜利神庙是雅典时期的神庙，伊瑞克先神庙是不对称对的，梅松卡瑞神庙是罗马时期仿照希腊时期神庙建造的，卡纳克阿蒙神庙是太阳神庙，是对称的。"
    imgList:[]
    point:"埃及建筑的类型"
    question:"古埃及神庙布局严谨，强调轴线和对称，著名实例有（ ）"
    questionId:1
    school:"浙江大学"
    type:1
    year:2003
    */
    fetchData() {
      this.listLoading = true
      getQuestions().then(response => {
        console.log(response.data)
        this.total = response.data.total
        this.list = response.data.list.map((value, index, array) => {
          value['type'] = questionsType[value['type']]
          return value
        })
        this.listLoading = false
      })
    },
    handleSizeChange() {
      console.log('handleSizeChange')
    },
    handleCurrentChange(val) {
      if (this.currentFilter === 'DEFAULT'){
        this.listQuery.page = val
        getQuestions(val).then(response => {
          this.total = response.data.total
          this.list = response.data.list.map((value, index, array) => {
            value['type'] = questionsType[value['type']]
            return value
          })
          this.listLoading = false
        })
      }else if (this.currentFilter === 'SCHOOL'){
        getQuestionBySchool(this.filterValue,val).then((response) => {
          this.listLoading = true
          this.total = response.data.total
          this.list = response.data.list.map((value, index, array) => {
            value['type'] = questionsType[value['type']]
            return value
          })
          this.listLoading = false
        })

      }else if(this.currentFilter === 'YEAR'){

        this.listLoading = true
        getQuestionByYear(this.filterValue,val).then((response)=>{
          console.log(response)
          this.total = response.data.total
          this.list = response.data.list.map((value, index, array) => {
            value['type'] = questionsType[value['type']]
            return value
          })
          this.listLoading = false
        })


      }else if (this.currentFilter === 'CHAPTER'){
        this.listLoading = true
        getQuestionByChapter(this.filterValue,val).then((response) => {
          //console.log(value)
          this.total = response.data.total
          this.list = response.data.list.map((value, index, array) => {
            value['type'] = questionsType[value['type']]
            return value
          })
          this.listLoading = false
        })
      }

    },
    handleModifyQuestions(questionId, action, systemId) {
      if (action === 'edit') {
        // redirect
        this.$router.push({ path: '/questions/edit', query: { questionId: questionId }})
      } else if (action === 'delete') {
        // console.log(this.list)
        // console.log(questionId)
        // this.list.splice(questionId, 1)
        //deleteQuestionById(questionId).then(response => {
        deleteQuestionById(systemId).then(response => {
          //console.log(response.data)
          if (response.data === null) {
            this.list.splice(questionId, 1)
            // console.log(this.list)
            this.$message({
              message: `删除题目成功`,
              type: 'success'
            })
          } else {
            this.$message({
              message: `删除题目失败`,
              type: 'error'
            })
          }
        })

      }
    }
  }
}
</script>
