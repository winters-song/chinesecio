define([
	'jquery',
	'common',
	'slider'
],function ($, Common) {

	'use strict';
    
	var PartnersView = function(){
		this.render();
	};

	PartnersView.prototype = {

		render: function(){
			var me = this;

			me.$el = $('#partners');
			me.$btn = $('.btn', me.$el);
			me.$list = $('.item-list ul', me.$el);
			me.$prev = $('#partners-prev', me.$el);
			me.$next = $('#partners-next', me.$el);

			me.initEvents();	
		},

		initEvents: function(){
			var me = this;

			me.slider = new sy.ui.Slider({
		    id: 'partners-slider',
		    $prev: me.$prev,
		    $next: me.$next,
		    autoScroll: true
		  });
		}
	};

	return PartnersView;
    
});