({
  baseUrl:'../js',

  shim: {
    underscore: {
      deps: ['jquery'],
      exports: '_'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: '$.fn.popover'
    },
    slider:{
      deps: ['jquery']
    },
    niceScroll: {
      deps: ['jquery']
    },
    niceScroll_plus: {
      deps: ['niceScroll']
    }
  },

  paths: {
    jquery: 'libs/jquery/jquery-1.11.0.min',
    underscore: 'libs/underscore/underscore-min',
    cookie: 'libs/jquery/jquery.cookie',
    bootstrap : 'libs/bootstrap/js/bootstrap.min',
    queryString: 'libs/utils/queryString',
    niceScroll: 'libs/jquery/jquery.nicescroll.min',
    niceScroll_plus: 'libs/jquery/jquery.nicescroll.plus',
    slider: 'libs/utils/Slider'
  },
  findNestedDependencies : true,
  preserveLicenseComments: false,
	name: "index",
 	out: "../built/index.js"
})
