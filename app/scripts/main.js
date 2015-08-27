'use strict';

(function() {
  var passwordForm = document.getElementById('password-form');
  var password = document.getElementById('password').value;

  if(document.cookie.match(/access=granted/)){
    passwordForm.style.display = 'none';
  }

})();

function authenticate(event) {
  event.preventDefault();
  event.stopPropagation();
  var passwordForm = document.getElementById('password-form');
  var password = document.getElementById('password').value;

  if (password === 'r3fug33s-w3lc0m3') {
    passwordForm.style.display = 'none';
    document.cookie="access=granted";
  } else {
    window.alert('Wrong Password');
  }
}

