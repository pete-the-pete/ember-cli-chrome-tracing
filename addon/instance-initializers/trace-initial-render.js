export function initialize() {
  if(window.location && window.location.search.indexOf('initial-render') > 1) {
    (function () {
      var endTrace = function() {
        //just before paint
        requestAnimationFrame(function() {
          //after paint
          requestAnimationFrame(function() {
            document.location.href = "about:blank";
          });
        });
      };

      window.addEventListener('load', function() {
        performance.mark("renderEnd");
        endTrace();
      });
    })();
  }
}

export default {
  name: 'trace-initial-render',
  initialize: initialize
};