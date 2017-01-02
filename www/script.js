// JavaScript Document
var currentSlide;
var latlngInit;
$(document).ready(function () {
	$('html,.bg').height($(window).innerHeight());
	geoFindMe();
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
	document.addEventListener("deviceready", onDeviceReady, false);
	
});

function setDirections(origin, end) {
	var request = {
		origin: origin,
		destination: end,
		travelMode: 'WALKING'
	};
	map.setCenter(origin);
	
	for (var i = 0; i < markerArray.length; i++) {
				markerArray[i].setMap(null);
			  }
	directionsService.route(request, function(response, status) {
				// Route the directions and pass the response to a function to create
				// markers for each step.
				if (status === 'OK') {
				  //alert('<b>' + response.routes[0].warnings + '</b>');
				  directionsDisplay.setDirections(response);
				  showSteps(response, markerArray, stepDisplay, mapdir);
				} else {
				  window.alert('Directions request failed due to ' + status);
				}
			  });	
}

function geoFindMe() {
	
  if (!navigator.geolocation){
    alert("<p>Geolocation is not supported by your browser</p>");
    return;
  }

  function success(position) { 
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
	alert(latitude + ',' + longitude);
	if(map && mapdir) {
	latlngInit = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
	setDirections(latlngInit,'Tzaneen, Limpopo');	
	map.setCenter(latlngInit);
	
	/*var marker = new google.maps.Marker({
					map: map,
					position: latlngInit
				});*/
	
	}
  }
  function error() {
    alert("Unable to retrieve your location");
  };

  navigator.geolocation.getCurrentPosition(success, error,{ enableHighAccuracy: true });
}	

function onDeviceReady() {
        //alert("Deviceready");
	if (cordova.platformId == 'android') {
		StatusBar.backgroundColorByHexString("#51c5e3");
	}
	facebookConnectPlugin.browserInit('914947415308783');
}
	
function onOnline() {
    console.log("onOnline");
}

function onOffline() {
    console.log("onOffline");
}

function slide($A, $B, $text) {
	$transition = $A.css('transition');
	$('section').css('transition','all 0s')
				.css('margin-left','100%');
	$B.css('margin-left','100%');
	$A.css('margin-left','0%');
	setTimeout(function () {
		$B.css('transition', $transition);
		$A.css('transition', $transition);	
		$('.infobar-text').html($text);
		$B.css('margin-left','0');
		$A.css('margin-left','-100%');	
		},20);			
}

function slideBack($B, $A, $text) {
	$transition = $A.css('transition');
	$('section').css('transition','all 0s')
				.css('margin-left','100%');
	$B.css('margin-left','0%');
	$A.css('margin-left','-100%');
	setTimeout(function () {
		$B.css('transition', $transition);
		$A.css('transition', $transition);	
		$('.infobar-text').html($text);
		$B.css('margin-left','100%');
		$A.css('margin-left','0%');	
		},20);			
}


function navigateMap () {
			var address = document.getElementById('text-address').value;
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == 'OK') {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
			  } else {
				//alert('Geocode was not successful for the following reason: ' + status);
			  }
			});	
		}
	  
	  $(function () {
		  $('#text-address').change(function () {
			  	setTimeout(navigateMap, 200);	
				console.log('changing');	
		  });
		  
		  $('#cta').click(function () {
				slide($('.screenA-main'),$('.screenB-main'),'Change your location ');
				$('a#cta2.apply').css('display','none'); 
				currentSlide = 2;
		  });
		  
		  $('.pin-bar').click(function () {
				slideBack($('.screenB-main'),$('.screenA-main'),'Jobs around you now');  
				currentSlide = 0;
				$('a#cta2.apply').css('display','none');
		  });
		  
		  $('.imglogo').click(function () {
				slideBack($('section').eq(currentSlide),$('.screenA-main'),'Jobs around you right now');  
				currentSlide = 0;
				$('a#cta2.apply').css('display','none');
		  });
		  
		  $('.back').click(function () {
			  	$('.megalogin-div').css('margin-top','105vh');	  
		  });
		  
		  $('.btn.login').click(function () {
			    $('.megalogin-div').css('margin-top','0');
				$('.title-head').html('SIGN IN');	
		  		$('.bglogin.active').removeClass('active');
				$('.bglogin').eq(0).addClass('active');
		  });
		  
		  $('.btn.register').click(function () {
			    $('.megalogin-div').css('margin-top','0');
				$('.title-head').html('REGISTER');	
		  		$('.bglogin.active').removeClass('active');
				$('.bglogin').eq(1).addClass('active');
		  });
		  
		  $('.soc-logo.google').click(function () {
			 	window.plugins.googleplus.login(
				  {
					'scopes': 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/tasks', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
					'webClientId': '861935090190-3d3gr9iuj37vmf8nal3tq9hh2co61qju', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
					'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
				  },
				  function (obj) {
					alert(obj.displayName); // do something useful instead of alerting
					window.location.href ="listings.html";
				  },
				  function (msg) {
					alert('error: ' + msg);
				  }
			  ); 
		  });
		  
		  $('.soc-logo.facebook').click(function () {
			 	var fbLoginSuccess = function (userData) {
				  alert("UserInfo: " +  JSON.stringify(userData));
				}
				
				facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
				  function loginError (error) {
					alert(error)
				  }
				); 
		  });
	  })
	  
	  

$(function () {
	$('.bg').click(function () {
		$('.moving-bg').css('transform','scale(2.2,2.2)')
					.css('opacity','0');
		$('.logo').css('transform','translateY(100px)')
				.css('opacity','0');
		setTimeout(function () {
			window.location.href = "login.html";	
			},700);
		
		
	});
	
	$('#text-address').focus(function () {
		$('.header-container').css('margin-top', '-140px');	
		$('.screenB-main').css('height', '100vh');	
	})
	
	$('#text-address').focusout(function () {
		$('.header-container').css('margin-top', '0');
		$('.screenB-main').css('height', 'calc(100vh - 140px)');	
	})
	
	$('.menu').click(function () {
		$('.side-panel').css('right','35%');
		$('.dark-overlay').css('display', 'block');
		setTimeout(function () {
			$('.dark-overlay').css('opacity','0.4');
			}, 50);
	});
	
	$('.dark-overlay').click(function () {
		$('.side-panel').css('right','100%');
		$('.dark-overlay').css('opacity','0');
		setTimeout(function () {
			$('.dark-overlay').css('display', 'none');
			}, 500);
							
	});
})