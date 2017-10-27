Vue.component('form-register', {
  template: `
<div>
  <br> <br> <br> <br>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png" class="ui large image">
        <div class="content">
          Sign Up
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">

          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="name" placeholder="Name">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="username" placeholder="username">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="mail icon"></i>
              <input type="text" name="email" placeholder="E-mail address">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password">
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


          <div class="ui fluid large teal submit button">Sign Up</div>
        </div>
        <div class="ui error message"></div>
      </form>
      <div class="ui message">
        Have account: <a href="#">Login</a>
      </div>
    </div>
  </div>

</div>`,})

new Vue({
  el: '#app',
})
