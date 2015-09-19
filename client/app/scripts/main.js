'use strict';

(function() {
  if (document.getElementById('js-age-input') != null) {
    document.getElementById('js-age-input').focus();
  }
})();


(function() {
  setTimeout(function(){
      var counterKm    = document.getElementById('js-counterKm');
      var counterSteps = document.getElementById('js-counterSteps');
      if (counterKm)    { counterKm.innerHTML    = 4380; }
      if (counterSteps) { counterSteps.innerHTML = 742328; }
  }, 2000);
})();
