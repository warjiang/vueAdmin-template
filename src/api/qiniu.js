import fetch from '@/utils/fetch'

export function getQiniuToken() {
  return fetch({
    url: '/qiniu/generateUpToken',
    method: 'get'
  })
}
