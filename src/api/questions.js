import fetch from '@/utils/fetch'

export function getQuestions(page = 1, size = 20) {
  return fetch({
    url: '/questions/list',
    method: 'post',
    params: {
      page, size
    }
  })
}
export function getQuestionDetailById(questionId) {
  return fetch({
    url: '/questions/detail',
    method: 'post',
    params: {
      id: questionId
    }
  })
}


export function getQuestionByYear(year,page = 1, size = 20) {
  return fetch.post('/questions/getQuestionByYear', "year="+year+'&page='+page+'&size='+size)
}

export function getQuestionBySchool(school,page = 1, size = 20) {
  return fetch.post('/questions/getQuestionBySchool', "school="+school+'&page='+page+'&size='+size)
}

export function getQuestionByChapter(chapterId,page = 1, size = 20) {
  return fetch.post('/questions/getQuestionByChapter', "chapterId="+chapterId+'&page='+page+'&size='+size)
}

export function listYears() {
  return fetch.post('/questions/listYears')
}
export function listSchools() {
  return fetch.post('/questions/listSchools')
}
export function listChapters() {
  return fetch.post('/category/listChapters')
}

export function updateQuestion(questions) {
  // return fetch({
  //   url: '/questions/update',
  //   method: 'post',
  //   data: {
  //     questions: JSON.stringify(questions)
  //   }
  // })
  return fetch.post('/questions/update', questions)
}

export function addQuestion(questions) {
  return fetch.post('/questions/add', questions)
}

export function deleteQuestionById(questionId) {
  return fetch({
    url: '/questions/delete',
    method: 'post',
    params: {
      id: questionId
    }
  })
}
