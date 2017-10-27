Vue.component('form-register', {
  template: `
  <div class="login-heula">
    <br> <br> <br> <br>
    <div class="ui middle aligned center aligned grid apa">
      <div class="column">
        <h2 class="ui teal image header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" class="ui large image">
          <div class="content">
            Sign Up        </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="Name" v-model:value="name">
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="username" placeholder="username" v-model:value="username">
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="mail icon"></i>
                <input type="text" name="email" placeholder="E-mail address" v-model:value="email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="password" name="password" placeholder="Password" v-model:value="password">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password2" placeholder="Re-Password">
              </div>
            </div>

            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" name="terms" tabindex="0" class="hidden">
                <label>I agree to the terms and conditions</label>
              </div>
            </div>
            <div class="ui fluid large teal submit button" v-on:click="register">Sign Up</div>
            <div class="ui fluid large tea">
              Have account: <a href="#" v-on:click="switchtoLogin">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <notification v-bind:id="modal" v-bind:title="title" v-bind:message="message" v-bind:icon="icon"></notification>
  </div>`,
  data: () => {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      title: '',
      message: '',
      icon: '',
      modal: 'register'
    }
  },
  methods: {
    switchtoLogin() {
      $('#form-register').hide();
      $('#form-login').show();
    },
    register() {
      $('#loading').show();
      axios.post('https://lokilokostudio.tk/api/auth/register', {
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then((response) => {
          $('#loading').hide();
          this.title = 'Register Success';
          this.message = 'You have successfully register \n Go login now';
          this.icon = 'check circle'
          $('#register').modal('show');
          $('#form-register').hide()
          $('#form-login').show()
        })
        .catch((error) => {
          $('#loading').hide();
          this.title = 'Register Failed';
          this.message = 'Please insert valid data';
          this.icon = 'remove circle'
          $('register').modal('show');
          console.log(error);
        });
    }
  }
})
Vue.component('form-login', {
  template: `
    <div id="login-form" class="login-heula">
      <div class="ui middle aligned center aligned grid apa">
        <div class="column">
          <h2 class="ui teal image header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" class="ui large image">
            <div class="content">
              Log-in to your account
            </div>
          </h2>
          <form class="ui form" v-on:submit.prevent="doLogin">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" name="username" placeholder="Username" v-model="username">
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input type="password" name="password" placeholder="Password" v-model="password">
                </div>
              </div>
              <input type="submit" value="Login" class="ui fluid large teal submit button">
            </div>
            <div class="ui error message"></div>
          </form>
          <div class="ui message">
            New to us? <a href="#" v-on:click="switchtoRegister">Sign Up</a><br />
            or <br />
            <a href="#" v-on:click="loginFB">Sign in with facebook</a>
          </div>
        </div>
      </div>
      <notification v-bind:id="modal" v-bind:title="title" v-bind:message="message" v-bind:icon="icon"></notification>
    </div>`,
  data: () => {
    return {
      username: '',
      password: '',
      title: '',
      message: '',
      icon: '',
      modal: 'login'
    }
  },
  methods: {
    switchtoRegister() {
      $('#form-register').show();
      $('#form-login').hide();
    },
    doLogin() {
      $('#loading').show();
      axios.post('https://lokilokostudio.tk/api/auth/login', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          $('#loading').hide();
          this.title = 'Login Success';
          this.message = 'You have successfully logged in to our page';
          this.icon = 'check circle'
          $('#login').modal('show');
          localStorage.setItem('token', response.data.token)
          $('#menu-index').show()
          $('#form-login').hide()
        })
        .catch((error) => {
          $('#loading').hide();
          this.title = 'Login Failed';
          this.message = 'Please insert valid username and password';
          this.icon = 'remove circle'
          $('#login').modal('show');
          console.log(error);
        });
    },
    loginFB() {
      $('#loading').show();
      FB.login((response) => {
        console.log(response);
        axios.post('https://lokilokostudio.tk/api/auth/loginFB', {
          accessToken: response.authResponse.accessToken,
          fb_id: response.authResponse.userID
        }).then((res) => {
          $('#loading').hide();
          this.title = 'FB Login Success';
          this.message = 'You have successfully logged in to our page with facebook account';
          this.icon = 'check circle'
          $('.ui.basic.modal').modal('show');
          localStorage.setItem('token', res.data.token)
          $('#form-login').hide();
          $('#menu-index').show()
        }).catch((err) => {
          $('#loading').hide();
          this.title = 'FB login Failed';
          this.message = 'Sorry something went wrong with your facebook account';
          this.icon = 'remove circle'
          $('.ui.basic.modal').modal('show');
          console.log(err);
        })
      }, {
        scope: 'public_profile,email'
      })
    }
  }
})
Vue.component('loader', {
  template: `
  <div id="loading" style="display:none"></div>
`
})

Vue.component('notification', {
  props: ['title', 'message', 'icon', 'id'],
  template: `
  <div class="ui basic modal" v-bind:id="id">
    <div class="ui icon header">
      <i v-bind:class="icon + ' icon'"></i>
        {{title}}
    </div>
    <div class="content">
      <p>{{message}}</p>
    </div>
    <div class="actions">
      <div class="ui green ok inverted button" v-if="title.indexOf('Success')">
        <i class="checkmark icon"></i>
        Cool!
      </div>
      <div class="ui red basic cancel inverted button" v-else>
        <i class="remove icon"></i>
        Sad :(
      </div>
    </div>
  </div>
    `,
})

Vue.component('menu-header', {
  template: `
    <div id="header" class="header-menu">
      <div class="ui top attached menu">
        <div class="ui dropdown icon item">
          <i class="huge home icon"></i>

        </div>
        <div class="right menu">
          <div class="ui right aligned category search item">
            <div class="ui transparent icon input">
              <input class="prompt" placeholder="Search..." type="text" v-on:keyup.enter="searchPost" v-model:value="search">
              <i class="search link icon"></i>
            </div>
            <div class="results"></div>
          </div>
        </div>
      </div>
  </div>`,
  data: () => {
    return {
      search: ''
    }
  },
  methods: {
    searchPost() {
      this.$emit('search', this.search)
    },
  }
})
Vue.component('menu-index', {
  template: `
  <div>
  <menu-header v-on:search="search"></menu-header>
  <br> <br> <br> <br>
  <div class="ui grid">
    <div class="four wide column">
      <div class="ui container">
        <div class="ui left vertical menu">
          <div class="item" id="upload-foto">
            <button class="ui instagram button">
              <i class="instagram icon"></i>
              New Post
            </button>
          </div>
          <div class="item" id="logout">
            <button class="ui instagram button" v-on:click="doLogout">
              <i class="sign out icon"></i>
              Sign out
            </button>
          </div>
        </div>
      </div>
      </div>
      <br>
      <div class="ten wide column">
        <div class="ui centered grid">
          <!-- product -->
          <div class="five wide column" v-for="post in normalizedSize">
            <br>
            <div class="ui centered card">
              <div class="image">
                <img v-bind:src="post.fileUrl">
              </div>
              <div class="content">
                <div class="right floated meta">{{hitungHour(post.created_at)}}h</div>
                  {{post.posted_by.username}}
              </div>
              <div class="content">
                  {{post.post}}
              </div>
              <div class="content">
                <div class="ui accordion">
                  <div class="title" v-on:click="accordionActive(post._id)">
                    <span class="right floated">
                      <i class="heart outline like icon" v-on:click="postLove(post._id)"></i>
                      {{post.love.length}} likes
                    </span>
                    <i class="comment icon"></i>
                      {{post.comment.length}} comments
                  </div>
                  <div class="content" v-bind:id="post._id">
                    <div class="extra content">
                      <div class="ui large transparent left icon input" v-for="comment in post.comment">
                        <i class="comment icon"></i>
                        <input placeholder="Add Comment..." type="text" v-bind:value="comment.comment" disabled>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content">
                <div class="ui large transparent left icon input">
                  <i class="heart outline icon"></i>
                  <input placeholder="Add Comment..." type="text" v-on:keyup.enter="postComment(post._id)" v-bind:id="post._id">
                </div>
              </div>
            </div>
          </div>
          <div class="five wide column">
            <br>
            <div class="ui card">
              <div class="image">
                <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAA0xAAAAJGY0ZDJmM2QyLTkyODEtNDIyZi1hNmI5LWFhYmEyNDFkOGUzZA.jpg">
              </div>
              <div class="content">
                <div class="right floated meta">14h</div>
                  Elliot
              </div>
              <div class="content">
                <span class="right floated">
                  <i class="heart outline like icon"></i>
                  17 likes
                </span>
                <i class="comment icon"></i>
                3 comments
              </div>
              <div class="extra content">
                <div class="ui large transparent left icon input">
                  <i class="heart outline icon"></i>
                  <input placeholder="Add Comment..." type="text">
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <notification v-bind:id="modal" v-bind:title="title" v-bind:message="message" v-bind:icon="icon"></notification>
  <file-upload v-on:postbarunih="tambahposts"></file-upload>
</div>`,
  data: () => {
    return {
      posts: [],
      title: '',
      message: '',
      icon: '',
      modal: 'menu',
      searchPost: ''
    }
  },
  computed: {
    normalizedSize: function() {
      if (this.searchPost == '')
        return this.posts
      else {
        var showedData = []
        this.posts.forEach(post => {
          if (post.post.toLowerCase().indexOf(this.searchPost.toLowerCase()) > -1) {
            showedData.push(post)
          }
        })
        return showedData
      }
    }
  },
  methods: {
    search(value) {
      this.searchPost = value
    },
    tambahposts(value) {
      this.posts.unshift(value);
    },
    accordionActive(id) {
      $('div#' + id).toggleClass('active');
    },
    updatePost(data) {
      this.posts = data
    },
    doLogout() {
      localStorage.removeItem('token');
      location.reload()
    },
    hitungHour(tanggal) {
      var dateSekarang = Date(Date.now())
      var datePost = new Date(tanggal)
      var dateOneObj = new Date(dateSekarang);
      var dateTwoObj = new Date(datePost);
      var hours = Math.round(Math.abs(dateTwoObj - dateOneObj) / 36e5)
      return hours;
    },
    postComment(id) {
      $('#loading').show();
      var isiComment = $('#' + id).val();
      axios.post('https://lokilokostudio.tk/api/posts/addComment/' + id, {
          comment: isiComment,
          user: localStorage.getItem('token')
        })
        .then((response) => {
          $('#loading').hide();
          this.title = 'Comment Success';
          this.message = 'You have successfully comment to this post';
          this.icon = 'check circle'
          $('#menu').modal('show');
        })
        .catch((error) => {
          $('#loading').hide();
          this.title = 'Comment Failed';
          this.message = 'Something went wrong';
          this.icon = 'remove circle'
          $('#menu').modal('show');
          console.log(error);
        });
    },
    postLove(id) {
      $('#loading').show();
      axios.post('https://lokilokostudio.tk/api/posts/giveLove/' + id, {
          user: localStorage.getItem('token')
        })
        .then((response) => {
          $('#loading').hide();
          this.title = 'Love Success';
          this.message = 'You have successfully love this post';
          this.icon = 'check circle'
          $('#menu').modal('show');
        })
        .catch((error) => {
          $('#loading').hide();
          this.title = 'Love Failed';
          this.message = 'You have love this post before';
          this.icon = 'remove circle'
          $('#menu').modal('show');
          console.log(error);
        });
    }
  },
  created: function() {
    axios.get('https://lokilokostudio.tk/api/posts')
      .then((response) => {
        this.posts = response.data.data
        console.log(this.posts)
      })
      .catch((error) => {
        console.log(error);
      });
  }
})

Vue.component('file-upload', {
  template: `
    <div>
        <div class="ui modal" id="new-post">
          <div class="image content">
            <div class="ui medium image">
            </div>
            <form id="post" enctype="multipart/form-data" v-on:submit.prevent="uploadFile">
            <img id="blah" v-bind:src="image" alt="">
              <input type="file" name="file" id="fileuploader" v-on:change="readURL">
            </form>
            <div class="description modal-style" >
              <div class="ui header">Write Something...</div>
              <div class="ui left icon input">
              <input placeholder="Add caption..." type="text" v-model:value="caption">
              <i class="write icon"></i>
              </div>
            </div>
            <div class="ui container">
            </div>
          </div>
          <div class="actions">
            <div class="ui black deny button">
              Cancel
            </div>
            <div class="ui positive right labeled icon button" v-on:click="uploadFile">
              Upload
              <i class="checkmark icon"></i>
            </div>
          </div>
      </div>
    </div>`,
  data: () => {
    return {
      image: '#',
      caption: ''
    }
  },
  methods: {
    uploadFile() {
      $('#loading').show();
      var data = new FormData();
      data.append('post', this.caption);
      data.append('posted_by', localStorage.getItem('token'));
      data.append('imageFile', document.getElementById('fileuploader').files[0]);
      axios.post('https://lokilokostudio.tk/api/posts', data)
        .then((res)=> {
          $('#loading').hide();
          this.$emit('postbarunih', res.data.data)
        })
        .catch((err)=> {
          $('#loading').hide();
          console.log(err)
        });
    },
    readURL(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  }
})


new Vue({
  el: '#app',
})
