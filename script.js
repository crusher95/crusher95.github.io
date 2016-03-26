$(function(){
  
  
  var $screens = $('.screen'),
      $win = $(window),
      $overlay = $('.overlay'),
      $footer = $('footer'),
      hue = 180,
      $thingsILearnedToday = $('.things-i-learned-today li'),
      $hiddenTodayItems;
  
  
  $screens.height( $win.height() );
  
  $screens.click(function(e){
    var $this = $(this),
        $next = $this.next();
        
    $("html, body").animate({ scrollTop: $next.offset().top }, 750, 'easeInOutQuad');    
  });
  
  
  $(window).bind("scroll", function(){

    hue = ++hue % 360;
    var color = 'hsla(' + hue + ', 49%, 55%, 0.92)';
    console.log(color, $overlay);
    $overlay.css('background',color);
    $footer.css('color',color);
    
  });
  
  
  for (var i=0; i<3; i++){
    $hiddenTodayItems = $('.hidden-today li');  //   update the list
    var $thing = $hiddenTodayItems.eq( Math.round(Math.random() * ($hiddenTodayItems.length-1) ));
    
    $thingsILearnedToday.eq(i).html($thing.html());
    $thing.remove();
  }
  
});






/******************************************************************************/
/*********************************** EASING ***********************************/
/******************************************************************************/

(function() {

// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

var baseEasings = {};

$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
	baseEasings[ name ] = function( p ) {
		return Math.pow( p, i + 2 );
	};
});

$.extend( baseEasings, {
	Sine: function ( p ) {
		return 1 - Math.cos( p * Math.PI / 2 );
	},
	Circ: function ( p ) {
		return 1 - Math.sqrt( 1 - p * p );
	},
	Elastic: function( p ) {
		return p === 0 || p === 1 ? p :
			-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
	},
	Back: function( p ) {
		return p * p * ( 3 * p - 2 );
	},
	Bounce: function ( p ) {
		var pow2,
			bounce = 4;

		while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
		return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
	}
});

$.each( baseEasings, function( name, easeIn ) {
	$.easing[ "easeIn" + name ] = easeIn;
	$.easing[ "easeOut" + name ] = function( p ) {
		return 1 - easeIn( 1 - p );
	};
	$.easing[ "easeInOut" + name ] = function( p ) {
		return p < 0.5 ?
			easeIn( p * 2 ) / 2 :
			1 - easeIn( p * -2 + 2 ) / 2;
	};
});

})();