define([
	'jquery',
	'common',
	'bootstrap',
	'niceScroll_plus'
],function ($, Common) {

	'use strict';
    
	var PageView = function(){
		this.render();
	};

	PageView.prototype = {

		animated_hero: false,
		animated_content: false,
		animated_button: false,

		isVisiable:function(el,wh,st,delta){
      delta=delta || 100;
      return $(el).offset().top<wh+st-delta;
    },

    animations:{
      hero: function(wh,st){
      	var me = this;
        var $el = $('#hero'),
        	$hero_content = $('.hero-content', $el),
					$button = $('.buttons', $el),
					$scroll = $('#scroll-btn'),
					content_h = 344,
					button_h = 204,
					scroll_h = 700;

        if(!me.animated_hero){

          $('.hero-bg', $el).animate({opacity:1},500);

          var opacity;

          setTimeout(function(){
          	st = $(window).scrollTop();
						var opacity = st < content_h ? (content_h - st)/content_h : 0;
						$hero_content.animate({top:90,opacity:opacity},233, function(){
							me.animated_content = true;
						});
          }, 400);

          setTimeout(function(){
          	st = $(window).scrollTop();
						var opacity = st < button_h ? (button_h - st)/button_h : 0;
						$button.animate({top:0,opacity:opacity},233, function(){
							me.animated_button = true;
						});
          }, 533);
 
          me.animated_hero = true;
          
        }
      	if(me.animated_content){
      		me.setOpacity($hero_content, content_h, st );
      	}
      	if(me.animated_button){
      		me.setOpacity($button, button_h, st );
      	}
        me.setOpacity($scroll, scroll_h, st );
      },

      character:function(wh,st){
        var $el = $('.features');
        if(this.isVisiable($el,wh,st)){
          var $items = $el.find('.item');
          $items.eq(0).animate({top:0,opacity:1},333);
          $items.eq(1).delay(200).animate({top:0,opacity:1},533);
          $items.eq(2).delay(400).animate({top:0,opacity:1},733);

          delete this.animations.character;
        }
      },

      intro1:function(wh,st){
        var $el=$('#intro1');
        if(this.isVisiable($el,wh,st)){
          $el.find('img').animate({
            top:0,
            opacity:1
          },500);
          $el.find('.proof-content').delay(167).animate({opacity:1},500);
          delete this.animations.intro1;
        }
      },

      intro2:function(wh,st){
        var $el=$('#intro2');
        if(this.isVisiable($el,wh,st)){
          $el.find('img').animate({
            top:0,
            opacity:1
          },500);
          $el.find('.proof-content').delay(167).animate({opacity:1},500);
          delete this.animations.intro2;
        }
      },

      counter: function(wh,st){
      	var me = this;
      	
      	var $el = $('#counters'),
						$nums = $('span.count', $el);

      	if(this.isVisiable($el,wh,st)){

					var duration = 2000;
					var interval = 40;
					var steps = duration / interval;
					var currentArr = [0,0,0,0];
					var incrementArr = [];
					var counter = 0;
					
					for(var i in me.counterArr){
						incrementArr[i] = me.counterArr[i] / steps;
					}
			
					// console.log('currentArr: '+ me.counterArr);
					// console.log('incrementArr: '+ incrementArr);

					var timer = setInterval(function() {

						if (counter < steps) {
							counter++;

							$nums.each(function(index) {
								currentArr[index] +=  incrementArr[index];
								$(this).text(parseInt(currentArr[index]));
							});
								
						} else {
							window.clearInterval(timer);

							$nums.each(function(index) {
								$(this).text(me.counterArr[index]);
							});
						}

						// console.log('Current: ' + currentArr);
					}, interval);

          delete this.animations.counter;
        }
      }
       
    },

		render: function(){
			var me = this,
					$counters = $('#counters'),
					$nums = $('span.count', $counters);

			// init Counters
			me.counterArr = [];

			$nums.each(function(index) {
				var total = $(this).text()*1;
				me.counterArr[index] = total;
				$(this).text(0);
			});

			me.initLanguage();

			me.initEvents();
		},

		initLanguage: function(){
			var me = this;

			var lang = Common.language;

			var $lang = $('#lang-btn');
			var $label = $('.sub-link', $lang);

			$('.sub a', $lang).each(function(){
				var $me = $(this)
				if($me.data('label') == lang){
					$label.html($me.text() + ' <span class="glyphicon glyphicon-chevron-down"></span>');
				}
			}).on('click', me, me.setLanguage);

		},

		setLanguage: function(e){
			e.preventDefault();

			var lang = $(this).data('label');
			
			$.cookie('lang', lang);

			var url = window.location.href;
			var regex = /lang=\w+/;
			if(regex.test(url)){
				url = url.replace(/lang=\w+/, '');
				window.location.href = url;
			}else{
				window.location.reload();
			}
			
    },

		initEvents: function(){
			var me = this,
			 		$top = $('.main-header'),
			 		$gradient = $('.gradient', $top),
					$hero = $('.hero'),
					$scroll = $('#scroll-btn');

			$('html').niceScroll({styler:'fb',cursorcolor:'#fff'});

			$(window).on('scroll', function(){

			  var scrollTop  = $(this).scrollTop();
			  var winHeight = $(window).height();

			  if(scrollTop> $hero.height() - $top.height() - 10){
			  	$gradient.addClass('show');
			  }else{
			  	$gradient.removeClass('show');
			  }

			  for(var name in me.animations){
          me.animations[name].apply(me, [winHeight, scrollTop]);
        }

			});

			$scroll.on('click', function(){
				var width = $(window).width();
				var height;
				if(width <=1024){
					height = $hero.height() + $top.height();
				}else{
					height = $hero.height() - $top.height();
				}
				$('html,body').animate({
					scrollTop: height + 'px'
				}, 1000);
				return false;
			});

			//IE 8 hover
			if($('html').hasClass('lt-ie9')){
				$('.submenu').on('mouseenter', function(){
					$(this).find('ul').show();
				}).on('mouseleave', function(){
					$(this).find('ul').hide();
				})
			}

			$(window).trigger('scroll');

			
			me.initFooter();
		},

		setOpacity: function(el, height, top){
		  var opacity = top < height ? (height - top)/height : 0;
	    el.css({
	      opacity: opacity
	    });
		},

		initFooter: function(){
			var me = this;

			$('#weixin-btn').popover({
				content: [
					'<img src="resources/img/weixin.jpg" class="code">',
					'<p>扫描二维码<br/>关注网络孔子学院</p>'
				].join(''),
				html: true,
				placement: 'top',
				trigger: 'hover'
			});

			me.$search = $("#search-box");
			me.$input = $('input', me.$search);
			me.$searchBtn = $('.search-btn', me.$search);

			me.$input.on('keyup', me, function(e){
				if(e.keyCode == 13){
					e.data.doSearch();
				}
			});

			me.$searchBtn.on('click', me, function(e){
				e.preventDefault();
				e.data.doSearch();
			});

		},

		doSearch: function(){
			var me = this;

      var value = $.trim(me.$input.val());

      if(value){
      	window.location.href = 'http://www.chinesecio.com/cms/search-keyword?combine='+ value;
      }else{
      	me.$input.val('');
      }
    }
	};

	return PageView;
    
});