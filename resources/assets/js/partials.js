window.Vue = require('vue');
Vue.component('user', require('./components/users/user.vue'));
new Vue({
    el: '#testing'
});
