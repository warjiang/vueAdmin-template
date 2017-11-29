import fetch from '@/utils/fetch'

export function getRankList() {
  return fetch({
    url: '/questions/getRankList',
    method: 'post'
  })
}

export function generateCompetition(name, ins) {
  return fetch.post('/questions/generateCompetition', `name=${name}&ins=${ins}`)
}
