define([
	'jquery',
	'cookie',
	'queryString'
], function ($) {

	'use strict';

	return {

		version: '1.1140826',

		title: '网络孔子学院',

		loginUrl: 'http://www.chinesecio.com/api/login.php?from_url=',
		
		regUrl: 'http://www.chinesecio.com/join.php',
		profileUrl: 'http://www.chinesecio.com/member.php',

		cookieDomain: '.chinesecio.com',

		dateFormat: 'YYYY/MM/DD HH:mm',

		loginState: false,

		getLoginUrl: function(){
			return this.loginUrl + window.location.href;
		},
		
		initLocale: function(){

			console.log('CIO v' + this.version);

			var hash = window.location.href;
		  var hashData = hash.queryStringToJSON();
		  var lang = hashData.lang;

		  //remove cookie of old version
		  $.removeCookie('lang', { path: '/Public' });

		  $.cookie.defaults.domain = this.cookieDomain;
		  $.cookie.defaults.path = '/';

		  var orig = $.cookie('lang');

		  if(lang){
		  	$.cookie('lang', lang);
		  }else{

		  	var nav_lang = navigator.language || navigator.browserLanguage;
		  	if(orig){
		  		lang = orig;
		  	}else if(/zh/.test(nav_lang)){
		  		lang = 'cn';
		  	}else if (/fr/.test(nav_lang)){
		  		lang = 'fr';
		  	}else if (/ru/.test(nav_lang)){
		  		lang = 'ru';
		  	}else if (/es/.test(nav_lang)){
		  		lang = 'es';
		  	}else if (/ko/.test(nav_lang)){
		  		lang = 'ko';
		  	}else if (nav_lang == 'ja'){
		  		lang = 'ja';
		  	}else{
		  		lang = 'en';
		  	}
		  	
		  	$.cookie('lang', lang);
		  }

		  // var json = $.ajax({
		  //   url: './resources/js/lang/'+ lang + '.json?v='+ this.version,
		  //   async: false,
		  //   cache: window.devMode == 'pro',
		  //   dataType: 'json'
		  // }).responseJSON; 

		  // if(json){
		  	this.language = lang;
		  	
		  //   this.lang = json;
		  //   this.lang.l = lang;

		    $('html').addClass(lang);

		  // }else{
		  // 	console.warn('Not found Locale Package');
		  // }

		},

		timestampToString: function(timestamp){
      var date = new Date(timestamp*1);

      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month < 10 ? '0'+ month : month;
      day = day < 10 ? '0'+ day : day;
      return '' + date.getFullYear() + '-' + month + '-' + day;
    }
	};

});