import fetch from '@/utils/fetch'

export function addKuais({desc, imgList, school, year}) {
  // console.log(desc)
  // console.log(imgList)
  // console.log(school)
  // console.log(year)
  // return fetch({
  //   url: '/kuais/add',
  //   method: 'post',
  //   params: {
  //     desc, imgList, school, year
  //   }
  // })
  return fetch.post('/kuais/add', `desc=${desc}&imgList=${JSON.stringify(imgList)}&school=${school}&year=${year}`)
}

export function listAllKuais(page=1,size=10) {
  let query = `page=${page}&size=${size}`;
  return fetch.post('/kuais/listAll', query);
}

export function deleteKuais(kuaisId) {
  let query = `kuaisId=${kuaisId}`;
  return fetch.post('/kuais/deleteItem', query)
}
