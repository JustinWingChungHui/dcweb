var customScripts = {
    profile: function () {
     	 var portfolio = $('#portfolio');
		var items = $('.items', portfolio); 
		var filters = $('.filters li a', portfolio); 
	
		items.imagesLoaded(function() {
			items.isotope({
				itemSelector: '.item',
				layoutMode: 'fitRows',
				transitionDuration: '0.7s'
			});
		});
		
		filters.click(function(){
			var el = $(this);
			filters.removeClass('active');
			el.addClass('active');
			var selector = el.attr('data-filter');
			items.isotope({ filter: selector });
			return false;
		});            
    },
    fancybox: function () {
        // fancybox
        $(".fancybox").fancybox();
    },
    onePageNav: function () {

        $('#mainNav').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 950,
            scrollThreshold: 0.2,
            filter: '',
            easing: 'swing',
            begin: function () {
				//I get fired when the animation is starting
            },
            end: function () {
                //I get fired when the animation is ending
				
            },
            scrollChange: function ($currentListItem) {
                //I get fired when you enter a section and I pass the list item of the section
			}
        });
		
		$("a[href='#top']").click(function () {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });
			$("a[href='#basics']").click(function () {
                $("html, body").animate({ scrollTop: $('#video').offset().top - 75 }, "slow"); 
                return false;
            });
    }, 
    bannerHeight: function () {
        var bHeight = $(".banner-container").height();
        $('#da-slider').height(bHeight);
        $(window).resize(function () {
            var bHeight = $(".banner-container").height();
            $('#da-slider').height(bHeight);
        });
    },
	waySlide: function(){
		  	/* Waypoints Animations
		   ------------------------------------------------------ */		   			  
		 			 						 
    },
    fitText: function(){			  
            setTimeout(function() {			
            $('h1.responsive-headline').fitText(1.2, { minFontSize: '16px', maxFontSize: '30px' });			
            }, 100);
    },
    masonry: function(){
        
        var width = 250;
        if ($(window).width() <= 700) {
            width = 150;
        }
        
        $('.grid').masonry({
        // options
            itemSelector: '.grid-item',
            columnWidth: width
        });
    },
    navigate_land: function(){
        
        function GetURLParameter(sParam){
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        }
              
        var section = GetURLParameter('section');
       setTimeout(function(){
       		if (section != null) {
            	$("html, body").animate({ scrollTop: $('#' + section).offset().top - 75 }, "slow"); 
       		}
        }, 1000);
    },        
	instagram: function(){
		var feed = new Instafeed({
			get: 'user',
			userId: '2533861072',
			clientId: 'dc1f563815f347a0b3efe09d7bdedf87',
			template: '<a href="{{link}}"><img src="{{image}}" class="instagram_link"/></a>',
			accessToken: '2533861072.1677ed0.e2547294968343c2b2ffe87873b3041c',
			limit: 50,
			filter: function(image) {
				return image.tags.indexOf('duckthieves') >= 0;
			 }
		});
		feed.run();
	},
	youtube: function() {
		var v = document.getElementsByClassName("youtube-player");
			for (var n = 0; n < v.length; n++) {
				var p = document.createElement("div");
				p.innerHTML = labnolThumb(v[n].dataset.id);
				p.onclick = labnolIframe;
				v[n].appendChild(p);
			}
	},
    init: function () {    
        customScripts.onePageNav();  
        customScripts.profile();
        customScripts.fancybox(); 
		customScripts.waySlide();
		customScripts.fitText();
        customScripts.bannerHeight();
        customScripts.masonry();
        customScripts.navigate_land();
		customScripts.instagram();
		customScripts.youtube();
    }
}
$('document').ready(function () {
    customScripts.init();
});

function labnolThumb(id) {
    return '<img class="youtube-thumb" src="//i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play-button"></div>';
}
 
function labnolIframe() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=0&showinfo=0");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "youtube-iframe");
    this.parentNode.replaceChild(iframe, this);
}





