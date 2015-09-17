'use strict';

(function() {
  var passwordForm, password;

  if (document.getElementById('password') != null) {
    passwordForm = document.getElementById('password-form');
    password = document.getElementById('password').value;
  }

  if(document.cookie.match(/access=granted/)){
    if (document.getElementById('password-form') != null) {
      passwordForm.style.display = 'none';
    }
  }

})();

function authenticate(event) {
  event.preventDefault();
  event.stopPropagation();
  var passwordForm = document.getElementById('password-form');
  var password = document.getElementById('password').value;

  if (password === 'r3fug33s-w3lc0m3') {
    passwordForm.style.display = 'none';
    document.cookie = 'access=granted; expires=Thu, 18 Dec 2015 12:00:00 UTC';
  } else {
    window.alert('Wrong Password');
  }
}


(function() {
  if (document.getElementById('js-age-input') != null) {
    document.getElementById('js-age-input').focus();
  }
})();
