Vue.component('my-component', {
  template: `<span>{{ message vue }}</span>`,
  data: {
    message: 'hello'
  }
})

var app = new Vue({
  el: '#app',
})
