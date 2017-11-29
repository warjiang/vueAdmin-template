<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" v-if="!isCompetitionStart">
      <el-form-item label="竞赛名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="竞赛时间">
        <el-col :span="8">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" disabled></el-date-picker>
        </el-col>
        <el-col class="line" :span="4"></el-col>
        <el-col :span="8">
          <el-date-picker type="date" placeholder="选择时间" v-model="form.date2" style="width: 100%;margin-left: 10px;" disabled></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="竞赛说明">
        <el-input type="textarea" v-model="form.ins"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startCompetition">立即开始</el-button>
      </el-form-item>
    </el-form>
    <h3 v-if="isCompetitionStart">竞赛已开始</h3>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.row.userId}}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="手机号码">
        <template scope="scope">
          {{scope.row.phoneNumber}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getRankList, generateCompetition } from '@/api/competition'
  export default {
    data() {
      const d1 = new Date()
      const d2 = new Date()
      d2.setHours(d1.getHours() + 72)
      return {
        form: {
          name: '',
          date1: d1,
          date2: d2,
          ins: ''
        },
        isCompetitionStart: false,
        list: null,
        listLoading: true
      }
    },
    created: function() {
      this.fetchRandList()
    },
    methods: {
      onSubmit() {
      console.log('submit!')
    },
      startCompetition() {
        generateCompetition(this.form.name, this.form.ins).then(response => {
          this.$message({
            type: 'success',
            message: response.data
          })
          this.isCompetitionStart = true
        })
      },
      fetchRandList() {
        getRankList().then(response => {
          console.log(response.data)
          if (response.data === '竞赛还未开始') {
            this.$message({
              type: 'info',
              message: '竞赛还未开始'
            })
            this.isCompetitionStart = false
            this.listLoading = false
          } else {
            this.list = response.data.users
            this.isCompetitionStart = true
            this.listLoading = false
          }
        })
      }
    }
}
</script>
