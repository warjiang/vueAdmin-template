import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getQuestions(page = 1, size = 10) {
  return fetch({
    url: '/questions/list',
    method: 'post',
    params: {
      page, size
    }
  })
}
