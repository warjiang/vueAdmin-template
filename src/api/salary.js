import fetch from '@/utils/fetch'

export function getTeacherSalary(page = 1, size = 20) {
  const query = `page=${page}&size=${size}`
  return fetch.post('/user/getTeacherSalary', query)
}

export function makeBalance(teacherId) {
  const query = `teacherId=${teacherId}`
  return fetch.post('/user/makeBalance', query)
}

