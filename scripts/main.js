"use strict";function authenticate(e){e.preventDefault(),e.stopPropagation();var t=document.getElementById("password-form"),o=document.getElementById("password").value;"r3fug33s-w3lc0m3"===o?(t.style.display="none",document.cookie="access=granted; expires=Thu, 18 Dec 2015 12:00:00 UTC"):window.alert("Wrong Password")}!function(){{var e=document.getElementById("password-form");document.getElementById("password").value}document.cookie.match(/access=granted/)&&(e.style.display="none")}();