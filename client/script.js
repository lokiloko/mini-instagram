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
          <form class="ui form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" name="email" placeholder="E-mail address">
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input type="password" name="password" placeholder="Password">
                </div>
              </div>
              <div class="ui fluid large teal submit button">Login</div>
            </div>
            <div class="ui error message"></div>
          </form>
          <div class="ui message">
            New to us? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>`,})

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
              <input class="prompt" placeholder="Search..." type="text">
              <i class="search link icon"></i>
            </div>
            <div class="results"></div>
          </div>
        </div>
      </div>
  </div>`
    ,})

Vue.component('menu-index', {
  template: `
  <div>
  <br> <br> <br> <br>
  <div class="ui grid">
    <div class="three wide column">
      <div class="ui container">
        <div class="ui left vertical menu">
          <div class="item">
            <div class="header">My Profile</div>
            <div class="menu">
              <div class="ui simple dropdown item">
                Handphone and Tablet
                <i class="dropdown icon"></i>
                <div class="menu">
                  <a class="item"><i class="edit icon"></i> Edit Profile</a>
                  <a class="item"><i class="globe icon"></i> Choose Language</a>
                  <a class="item"><i class="settings icon"></i> Account Settings</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <br>
      <div class="ten wide column">
        <div class="ui grid">
          <!-- product -->
          <div class="four wide column">
            <br>
            <div class="ui card">
              <div class="content">
                <div class="right floated meta">14h</div>
                Elliot
              </div>
              <div class="image">
                <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAA0xAAAAJGY0ZDJmM2QyLTkyODEtNDIyZi1hNmI5LWFhYmEyNDFkOGUzZA.jpg">
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
          <div class="four wide column">
            <br>
            <div class="ui card">
              <div class="content">
                <div class="right floated meta">14h</div>
                <img class="ui avatar image" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAA0xAAAAJGY0ZDJmM2QyLTkyODEtNDIyZi1hNmI5LWFhYmEyNDFkOGUzZA.jpg"> Elliot
              </div>
              <div class="image">
                <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAA0xAAAAJGY0ZDJmM2QyLTkyODEtNDIyZi1hNmI5LWFhYmEyNDFkOGUzZA.jpg">
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
    </div>`,})

Vue.component('file-upload',{
  template:`
    <div>
      <form class="ui form segment">
      <div class="field">
        <label>File</label>
        <input type="file" name="fileInput"></input>
      </div>
      <div class="ui blue submit button">Submit</div>
      <div class="ui reset button">Reset</div>
      <div class="ui clear button">Clear</div>
      </form>
    </div>`,
  })


new Vue({
  el: '#app',
})
