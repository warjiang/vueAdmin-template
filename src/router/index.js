import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

/* login */
const Login = _import('login/index')

/* dashboard */
const dashboard = _import('dashboard/index')

/* error page */
const Err404 = _import('404')

/* demo page */
const Form = _import('page/form')
const Table = _import('table/index')
const Question = _import('table/questions')
// const Applications = _import('table/applications')
const Applications1 = _import('table/applications1')
const Applications2 = _import('table/applications2')
const Users = _import('table/users')
const Salary = _import('table/salary')
const Edit = _import('table/edit')
const Add = _import('table/add')
const Competition = _import('page/competition')
const Banner = _import('page/banner')
const AddKuais = _import('table/addKuais')
const Dianpings0 = _import('table/dianping0')
const Dianpings1 = _import('table/dianping1')
const Dianpings2 = _import('table/dianping2')
const Kuais = _import('table/kuais')

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/questions',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/*
{
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', component: Form, name: 'Form', icon: 'zonghe' }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', component: Table, name: 'Table', meta: { role: ['admin'] }}]
  },
*/
export const asyncRouterMap = [
  {
    path: '/questions',
    component: Layout,
    redirect: '/questions/index',
    name: '题库',
    icon: 'shouce',
    noDropdown: false,
    children: [
      { path: 'index', component: Question, name: '浏览', meta: { role: ['admin'] }},
      { path: 'edit', component: Edit, name: '编辑', meta: { role: ['admin'] }},
      { path: 'add', component: Add, name: '增加', meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/applications',
    component: Layout,
    redirect: '/applications/1',
    name: '用户管理',
    icon: 'shouce',
    noDropdown: false,
    children: [
      { path: '1', component: Applications1, name: '教师申请中', meta: { role: ['admin'] }},
      { path: '2', component: Applications2, name: '教师申请通过', meta: { role: ['admin'] }},
      { path: '3', component: Users, name: '学生浏览', meta: { role: ['admin'] }},
      { path: '4', component: Salary, name: '教师薪水', meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/competitions',
    component: Layout,
    redirect: '/competitions/index',
    name: '竞赛',
    icon: 'shouce',
    noDropdown: false,
    children: [
      { path: 'index', component: Competition, name: '竞赛相关', meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/index',
    name: 'Banner',
    icon: 'shouce',
    noDropdown: false,
    children: [
      { path: 'index', component: Banner, name: 'Banner配置', meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/kuais',
    component: Layout,
    redirect: '/kuais/index',
    name: '快题',
    icon: 'shouce',
    noDropdown: false,
    children: [
      { path: 'index', component: AddKuais, name: '快题发布', meta: { role: ['admin'] }},
      { path: 'explore', component: Kuais, name: '快题浏览', meta: { role: ['admin'] }},
    ]
  },
  {
    path: '/dianpings',
    component: Layout,
    redirect: '/dianpings/index',
    name: '评图',
    icon: 'shouce',
    noDropdown: false,
    children: [
      { path: '0', component: Dianpings0, name: '待审核', meta: { role: ['admin'] }},
      { path: '1', component: Dianpings1, name: '审核通过', meta: { role: ['admin'] }},
      { path: '2', component: Dianpings2, name: '审核未通过', meta: { role: ['admin'] }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
