import Vue from 'vue'
import moment from 'moment'


//日期过滤器
 //value 需要处理的数据 format 日期格式
Vue.filter('dateFormat', function (value,format='YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(format);
})

/*
Vue.filter('date-format2', function (value, format) { // 需要处理的数据(表达式的值)
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})

*/

