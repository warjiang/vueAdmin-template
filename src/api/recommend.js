import fetch from '@/utils/fetch'

export function capturePage(url) {
  return fetch.post('/scrapy/capturePage', `url=${url}`)
}

export function addRecommend(title, contentUrl, imgUrl) {
  const query = `title=${title}&contentUrl=${contentUrl}&imgUrl=${imgUrl}`
  return fetch.post('/scrapy/addRecommend', query)
}


export function getRecommend() {
  return fetch.post('/recommend/getRecommend')

}

