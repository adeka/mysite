/*
setTimeout(function(){

	var path = document.querySelector('.layer path');
	var length = path.getTotalLength();
	// Clear any previous transition
	path.style.transition = path.style.WebkitTransition =
	  'none';
	// Set up the starting positions
	path.style.strokeDasharray = length + ' ' + length;
	path.style.strokeDashoffset = length;
	// Trigger a layout so styles are calculated & the browser
	// picks up the starting position before animating
	path.getBoundingClientRect();
	// Define our transition
	path.style.transition = path.style.WebkitTransition =
	  'stroke-dashoffset 2s ease-in-out';
	// Go!
	path.style.strokeDashoffset = '0';

}, 2000);
*/


$( "path" ).mouseover(function() {
//	$(this).fadeIn( "slow", function() {
	 // Animation complete.

});
var c = getRand(0,255);
$( document ).ready(function() {
	render = function(){
				c+=.1;
			var scheme = new ColorScheme;
			//getRand(0,255)

			scheme.from_hue(c)         // Start the scheme
						.scheme('contrast')     // Use the 'triade' scheme, that is, colors
																	// selected from 3 points equidistant around
																	// the color wheel.
						.variation('hard');   // Use the 'soft' color variation

			var colors = scheme.colors();
			$("body").css({background : "#"+colors[0]});
			$( "path" ).each(function(index, element) {
					if (--index < 0) index = colors.length - 1;
					$(this).css({ fill: "#"+colors[1 + index%(colors.length - 1)] });
			});
			$( "polygon" ).each(function(index, element) {
				if (--index < 0) index = colors.length - 1;
				$(this).css({ fill: "#"+colors[1 + index%(colors.length - 1)] });
			});


	}
	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

	(function animloop(){
	  requestAnimFrame(animloop);
	  render();
	})();

});

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
