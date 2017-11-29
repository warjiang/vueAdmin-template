import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限

Vue.use(ElementUI)

Vue.config.productionTip = false


//元素的补零计算
function addZero(val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
}

Vue.filter("formatTime", function (value, type) {
  let dataTime = "";
  let data = new Date();
  data.setTime(value);
  let year = data.getFullYear();
  let month = addZero(data.getMonth() + 1);
  let day = addZero(data.getDate());
  let hour = addZero(data.getHours());
  let minute = addZero(data.getMinutes());
  let second = addZero(data.getSeconds());
  if (type === "YMD") {
    dataTime = year + "-" + month + "-" + day;
  } else if (type === "YMDHMS") {
    dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  } else if (type === "HMS") {
    dataTime = hour + ":" + minute + ":" + second;
  } else if (type === "YM") {
    dataTime = year + "-" + month;
  }
  return dataTime;//将格式化后的字符串输出到前端显示
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
