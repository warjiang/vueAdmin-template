import fetch from '@/utils/fetch'

export function xx(page = 1, size = 20) {
  return fetch({
    url: '/questions/list',
    method: 'post',
    params: {
      page, size
    }
  })
}

export function listDianpings(page = 1, size = 20, type = 0) {
  let query = `tag=&status=0&page=${page}&size=${size}&type=${type}`;
  return fetch.post('/dianping/list', query)
}

export function passDianping(dianpingId) {
  let query = `dianpingId=${dianpingId}`;
  return fetch.post('/dianping/passDianping', query)
}

export function rejectDianping(dianpingId) {
  let query = `dianpingId=${dianpingId}`;
  return fetch.post('/dianping/rejectDianping', query)
}
