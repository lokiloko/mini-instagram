Vue.component('my-component', {
  template: `<span>{{ message }}</span>`,
  data: {
    message: 'hello'
  }
})

var app = new Vue({
  el: '#app',
})
