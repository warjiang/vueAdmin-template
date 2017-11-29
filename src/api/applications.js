import fetch from '@/utils/fetch'

/*
  return fetch({
    url: '/user/listApplication',
    method: 'post',
    data: {
      page,
      size
    }
  })
*/
export function getApplications(status = 1, page = 1, size = 10) {
  const query = `page=${page}&size=${size}&status=${status}`
  return fetch.post('/user/listApplication', query)
}

export function acceptApplication(id) {
  return fetch.post('/user/acceptApplication', `id=${id}`)
  /*
  return fetch({
    url: '/user/acceptApplication',
    method: 'post',
    data: {
      id
    }
  })
  */
}

export function rejectApplication(id) {
  return fetch.post('/user/rejectApplication', `id=${id}`)
  /*
  return fetch({
    url: '/user/rejectApplication',
    method: 'post',
    data: {
      id
    }
  })
  */
}
