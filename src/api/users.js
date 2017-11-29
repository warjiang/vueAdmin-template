import fetch from '@/utils/fetch'

export function getUsers(role = 'S', page = 1, size = 20) {
  const query = `page=${page}&size=${size}&role=${role}`
  return fetch.post('/user/list', query)
}

