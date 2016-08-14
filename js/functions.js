/*resize only width*/
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth != currentWidth;
	if(resizeByWidth){
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});
/*resize only width end*/

/*device detected*/
var DESKTOP = device.desktop();
//console.log('DESKTOP: ', DESKTOP);
var MOBILE = device.mobile();
//console.log('MOBILE: ', MOBILE);
var TABLET = device.tablet();
//console.log('MOBILE: ', MOBILE);
/*device detected end*/

/*placeholder */
function placeholderInit(){
	$('[placeholder]').placeholder();
}
/*placeholder end*/

/*state form fields*/
function stateFields(){
	$('.is-validate select').on('change', function(event) {
		var $currentSelect = $(this);
		var selectedOptionIndex = $currentSelect.find('option:selected').index();
		var completeClass = 'input-complete';

		$currentSelect
			.toggleClass(completeClass, selectedOptionIndex != 0)
			.closest('.select')
			.toggleClass(completeClass, selectedOptionIndex != 0);
	});

	$( ".is-validate input, .is-validate textarea" ).on('change keyup', function() {
		var _textDefault = $(this).val().length;
		$(this).toggleClass('input-complete', !!_textDefault);
	});
}
/*state form fields*/

/*print*/
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}
/*print end*/

/*events main screen*/
function eventsMainScreen() {
	var $html = $('html, body'),
		page = '.home-page',
		$page = $(page),
		$screen = $('.screen'),
		_minScrollTop = 20,
		_animationSpeed = 400,
		_flagPositionCorrection = true;

	$(window).on('load scroll resizeByWidth', function () {

		var currentScrollTop = $(window).scrollTop(),
			_hideScreen = currentScrollTop > _minScrollTop;

		// $page.toggleClass('hide-screen', _hideScreen && _flagPositionCorrection); // uncomment if need show $screen
		if ( _hideScreen && _flagPositionCorrection ) $page.addClass('hide-screen'); // comment if need show $screen
		// if ( _hideScreen ) {
		// 	var tlHide = new TimelineMax();
		// 	tlHide
		// 		.to($screen, _animationSpeed/1000, {scale: 0.8, autoAlpha: 0, ease: Power2.easeInOut})
		// } else {
		// 	var tlShow = new TimelineMax();
		// 	tlShow
		// 		.to($screen, _animationSpeed/1000, {scale: 1, autoAlpha: 1, ease: Power2.easeInOut});
		// }
	});

	$(window).on('load scroll resizeByWidth', function () {

		var currentScrollTop = $(window).scrollTop(),
			hideScreen = currentScrollTop > _minScrollTop;

		// if ( !hideScreen ) _flagPositionCorrection = true; // uncomment if need show $screen
		if ( $('body').hasClass(page.substring(1)) && hideScreen && !$html.is(':animated') && _flagPositionCorrection ) {
			$html.stop().animate({
				// scrollTop: _minScrollTop + 1}, { // uncomment if need show $screen
				scrollTop: 0}, { // comment if need show $screen
				duration: 300,
				complete: function(){
					_flagPositionCorrection = false;
				}
			});
		};
	});
}
/*events main screen end*/

/* tabs */
function tabs() {
	var $helpfulTabs = $('.tabs-wrap');
	var equalTimer;
	if ($helpfulTabs) {
		$helpfulTabs.responsiveTabs({
			active: 0,
			rotate: false,
			startCollapsed: 'accordion',
			collapsible: 'accordion',
			setHash: false,
			animation: 'fade', // slide
			duration: 300, // default 500
			animationQueue: true,
			// load: function(event, firstTab){
			// 	equalHeightForTabs($(firstTab.panel));
			// },
			activate: function(event, tab) {
				clearTimeout(equalTimer);
				equalTimer = setTimeout(function () {
					equalHeightForTabs($(tab.panel));
				}, 500)
			}
		});
	}
}

function equalHeightForTabs(content){
	var $parent = content.find('.products__list');
	if ($parent.length) {
		$parent.find('.products__inner').equalHeight({
			useParent: true,
			parent: $parent,
			resize: true
		});
		$parent.find('.products__img').equalHeight({
			useParent: true,
			parent: $parent,
			resize: true
		});
		$parent.find('.products__content').equalHeight({
			useParent: true,
			parent: $parent,
			resize: true
		});
	}
}
/* tabs end */

/*equal height elements*/
function equalHeightInit(){
	/*previews*/
	var $previewsList = $('.previews__list');
	if ($previewsList.length) {
		// imagesLoaded($previewsList, function () {
		//
		// });
		// var previewsInner = $previewsList.find('.previews__inner');
		var $previewsInner = $('.previews__inner');
		$previewsInner.equalHeight({
			// useParent: true,
			// parent: $previewsList,
			resize: true,
			amount: $previewsInner.length
		});
	}

	/*products*/
	var $products = $('.products');
	if ($products.length) {
		imagesLoaded($products, function () {
			var $productsInner = $('.products__inner');
			var elementLength = $productsInner.length;
			$productsInner.equalHeight({
				amount: elementLength,
				resize: true
			});
			$('.products__img').equalHeight({
				amount: elementLength,
				resize: true
			});
			filtersEvents();
		});
	}
}
/*equal height elements end*/

/*products behavior*/
function productsBehavior() {
	var $main = $('.main'),
		$filters = $('.filters'),
		zIndexMain = $main.css('z-index'),
		zIndexFilters = $filters.css('z-index');

	$(window).load(function () {
		$('.products__item, .previews__item').mouseenter(function () {
			$main.css('z-index', '91');
			$filters.css('z-index', '99');
		}).mouseleave(function () {
			$main.css('z-index', zIndexMain);
			$filters.css('z-index', zIndexFilters);
		});
	})
}
/*products behavior end*/

/* multiselect init */
/*add ui position add class*/
function addPositionClass(position, feedback, obj){
	removePositionClass(obj);
	obj.css( position );
	obj
		.addClass( feedback.vertical )
		.addClass( feedback.horizontal );
}

/*add ui position remove class*/
function removePositionClass(obj){
	obj.removeClass('top');
	obj.removeClass('bottom');
	obj.removeClass('center');
	obj.removeClass('left');
	obj.removeClass('right');
}

function customSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
			var placeholderText = $(selectItem).attr('data-placeholder');
			var flag = true;
			if ( placeholderText === undefined ) {
				placeholderText = $(selectItem).find(':selected').html();
				flag = false;
			}
			var classes = $(selectItem).attr('class');
			selectArray[selectIndex] = $(selectItem).multiselect({
				header: false,
				height: 'auto',
				minWidth: 50,
				selectedList: 1,
				classes: classes,
				multiple: false,
				noneSelectedText: placeholderText,
				show: ['fade', 100],
				hide: ['fade', 100],
				create: function(event){
					var select = $(this);
					var button = $(this).multiselect('getButton');
					var widget = $(this).multiselect('widget');
					button.wrapInner('<span class="select-inner"></span>');
					button.find('.ui-icon').append('<i class="arrow-select"></i>')
						.siblings('span').addClass('select-text');
					widget.find('.ui-multiselect-checkboxes li:last')
						.addClass('last')
						.siblings().removeClass('last');
					if ( flag ) {
						$(selectItem).multiselect('uncheckAll');
						$(selectItem)
							.multiselect('widget')
							.find('.ui-state-active')
							.removeClass('ui-state-active')
							.find('input')
							.removeAttr('checked');
					}
				},
				selectedText: function(number, total, checked){
					var checkedText = checked[0].title;
					return checkedText;
				},
				position: {
					my: 'left top',
					at: 'left bottom',
					using: function( position, feedback ) {
						addPositionClass(position, feedback, $(this));
					}
				}
			});
		});
		$(window).resize(selectResize);
	}
}

function selectResize(){
	if ( selectArray.length ) {
		$.each(selectArray, function(i, el){
			var checked = $(el).multiselect('getChecked');
			var flag = true;
			if ( !checked.length ) {
				flag = false
			}
			$(el).multiselect('refresh');
			if ( !flag ) {
				$(el).multiselect('uncheckAll');
				$(el)
					.multiselect('widget')
					.find('.ui-state-active')
					.removeClass('ui-state-active')
					.find('input')
					.removeAttr('checked');
			}
			$(el).multiselect('close');
		});
	}
}
/* multiselect init end */

/**! filters
 * filter products for tags */
// external js:
// 1) TweetMax VERSION: 1.19.0 (widgets.js);
function filtersEvents() {
	// external js: Isotope PACKAGED v3.0.1 (widgets.js);
	var $body = $('body'),
		$filtersWrapper = $('.products'),
		$filters = $('.filters-js'),
		$filtersTagsGroup = $('.filters-tags-js'),
		tags = {},
		isCheckedClass = 'is-checked',
		isCheckedCounter = 0,
		animationSpeed = 200,
		animationSpeedTween = animationSpeed/1000,
		showButtonFind = false;

	// init Isotope
	var $grid = $filtersWrapper.isotope({
		itemSelector: '.products__item',
		layoutMode: 'fitRows',
		percentPosition: true
	});

	var filtersTLL = new TimelineLite();
	$body.on('click', '.btn-filter-opener-js', function () {
		filtersTLL
			.set($filters, {autoAlpha:1, transitionDuration: 0})
			.to($filters, animationSpeedTween, {x: 0, ease: Power2.easeInOut});

		return false;
	});

	$body.on('click', '.btn-filter-close-js', function () {
		var filtersWidth = $('.filters-js').outerWidth();
		filtersTLL.to($filters, animationSpeedTween, {x: -filtersWidth, ease: Power2.easeInOut});

		return false;
	});

	// clear on horizontal resize
	$(window).on('resizeByWidth', function () {
		if ( $filters.attr('style') ) {
			console.log(1);
			$filters.attr('style','');
		}
	});

	// bind filter tag click
	$filtersTagsGroup.on( 'click', 'a', function(e) {
		e.preventDefault();
		var $currentTag = $( this );
		var dataTagsGroup = $currentTag.closest('.tags-group').attr('data-tags-group');

		dataTagsGroup = (dataTagsGroup == undefined) ?
			$currentTag.attr('data-filter') :
			dataTagsGroup;

		tags[ dataTagsGroup ] = ($currentTag.hasClass(isCheckedClass)) ?
			'' :
			$currentTag.attr('data-filter');

		var filterValue = concatValues( tags );
		$grid.isotope({ filter: filterValue });

		showButtonFind = true;
	});

	//concatenation values of tags
	function concatValues(obj) {
		var value = '';
		for ( var prop in obj ) {
			value += obj[ prop ];
		}
		return value;
	}

	$filtersTagsGroup.on( 'click', 'a', function(e) {
		e.preventDefault();
		var $this = $( this );
		$this.closest('.button-group-js').find('.is-checked').not(e.target).removeClass('is-checked');

		$this.toggleClass('is-checked');

		clearBtnState();
	});

	// state clear button
	function clearBtnState() {
		$('.clear-filter').toggleClass('disabled', !$filtersTagsGroup.find('.is-checked').length);
	}
	clearBtnState();

	// more options drop
	var $jsDropContent = $('.filters-content-js'),
		jsDrop = '.filters-drop-js',
		$jsDrop = $(jsDrop),
		jsDropOpener = '.filter-more-options-js',
		$jsDropOpener = $(jsDropOpener),
		classShowDrop = 'show-drop';

	if (!$jsDropContent.length) return false;

	$jsDropContent.on('click', jsDropOpener, function () {
		var $currentJsDropContent = $(this).closest($jsDropContent),
			ifOpened = $currentJsDropContent.hasClass(classShowDrop),
			$currentDrop = $currentJsDropContent.find($jsDrop);

		// switch classes
		switchClass($jsDropContent,$currentJsDropContent,!ifOpened);
		switchClass($jsDropOpener,$(this),!ifOpened);
		switchClass($jsDrop,$currentDrop,!ifOpened);

		eventDrop($jsDrop,$currentDrop,!ifOpened);

		recalcPhonesDrop.call();

		return false;
	});

	// if (DESKTOP) {
	// 	$jsDrop.on('mouseleave', function () {
	// 		switchClass($jsDropContent);
	// 		switchClass($jsDropOpener);
	// 		switchClass($jsDrop);
	// 		eventDrop($jsDrop);
	//
	// 		return false;
	// 	});
	// }

	function switchClass(remove,add,condition) {
		// remove - element with remove class
		// add - element with add class
		// condition - condition add class

		remove.removeClass(classShowDrop);

		if(add === undefined) return false;
		add.toggleClass(classShowDrop, condition)
	}

	function eventDrop(drops,currentDrop,condition) {

		TweenMax.to(drops, animationSpeedTween, {autoAlpha: 0, ease: Power2.easeInOut});

		if(currentDrop === undefined) return false;
		if(condition){
			TweenMax.to(currentDrop, animationSpeedTween, {autoAlpha: 1, ease: Power2.easeInOut});
		} else {
			TweenMax.to(currentDrop, animationSpeedTween, {autoAlpha: 0, ease: Power2.easeInOut});
		}

	}

	$jsDropContent.on('click', jsDrop, function (e) {
		e.stopPropagation();
		return false;
	});

	$jsDropContent.on('click', '.phones-drop a', function (e) {
		document.location.href = $(this).attr('href');
	});

	//recalculate height of phone drop
	$(window).on('resize scroll', function () {
		recalcPhonesDrop.call();
	});

	function recalcPhonesDrop() {
		var topSpace = $('.filters').outerHeight();
		var windowHeight = $(window).height() - topSpace;

		$jsDrop.css('height', windowHeight);
	}

	// no product show / hide
	var tempNoProducts = $('<h2 style="text-align: center;">Items not found</h2>');
	$filtersWrapper.after(tempNoProducts.hide());

	$grid.on( 'arrangeComplete', function( event, filteredItems ) {
		var lengthItems = filteredItems.length;

		if (!lengthItems) {
			tempNoProducts.show();
		} else {
			tempNoProducts.hide();
		}
	});

	// search counter
	$grid.on( 'arrangeComplete', function( event, filteredItems ) {
		var lengthItems = filteredItems.length,
			filterCounterContent = 'Items <br /> not found';

		if( lengthItems > 0 ) {
			var items = (filteredItems.length > 1) ? 'items' : 'item';
			filterCounterContent = 'Found <br /> <strong>' + lengthItems + '</strong> ' + items
		}

		$('.filters-counter-js')
			.html(filterCounterContent)
			.closest('.button')
			.toggleClass('btn-show', showButtonFind);
	});

	// clear filter tags
	$('.clear-filter').on('click', function (e) {
		e.preventDefault();
		if($(this).hasClass('disabled')) return;

		$filtersTagsGroup.find('.is-checked').removeClass('is-checked');
		$grid.isotope({ filter: '*' });
		tags = {};

		switchClass($jsDropContent);
		switchClass($jsDropOpener);
		switchClass($jsDrop);
		eventDrop($jsDrop);

		clearBtnState();

		showButtonFind = false;
	});
}
/*filters end*/

/*share events*/
function shareEvents() {
	var $btn = $('.open-share-js');
	$btn.each(function () {
		var $currentBtn = $(this),
			$wrapper = $currentBtn.parent(),
			$itemList = $wrapper.find('.soc-square'),
			$item = $wrapper.find('.soc-square li');

		var tw = new TimelineLite({paused: true});

		tw
			.set($itemList, {perspective: 500})
			.set($item, {display: "block"})
			.staggerFrom($item, 0.25, {autoAlpha: 0, rotationX: -90, transformOrigin: "50% 0"}, 0.15);

		$currentBtn
			.on('click', function (e) {
				e.preventDefault();
			});

		if (DESKTOP) {
			$wrapper.on('mouseenter', function () {
					tw.play();
				}).on('mouseleave', function () {
					tw.reverse();
				});
		} else {
			$wrapper.on('click', function () {
				if (tw.progress() != 0) {
					tw.reverse();

					return false;
				}
				tw.play();
			})
		}
	});
}
/*share events end*/

/*hover class*/
(function ($) {
	var HoverClass = function (settings) {
		var options = $.extend({
			container: 'ul',
			item: 'li',
			drop: 'ul'
		},settings || {});

		var self = this;
		self.options = options;

		var container = $(options.container);
		self.$container = container;
		self.$item = $(options.item, container);
		self.$drop = $(options.drop, container);

		self.modifiers = {
			hover: 'hover'
		};

		// self.md = new MobileDetect(window.navigator.userAgent);
		self.md = device;

		self.addClassHover();

		if (self.md.mobile()) {
			$(window).on('debouncedresize', function () {
				self.removeClassHover();
			});
		}
	};

	HoverClass.prototype.addClassHover = function () {
		var self = this,
			_hover = this.modifiers.hover,
			item = self.options.item,
			$item = self.$item,
			$container = self.$container;

		if (!self.md.desktop()) {
			$container.on('click', ''+item+'', function (e) {
				var $currentAnchor = $(this);
				var currentItem = $currentAnchor.closest($item);

				if (!currentItem.has(self.$drop).length){ return; }

				e.stopPropagation();

				if (currentItem.hasClass(_hover)){
					currentItem.removeClass(_hover).find('.'+_hover+'').removeClass(_hover);
					return;
				}

				$('.'+_hover+'').not($currentAnchor.parents('.'+_hover+''))
					.removeClass(_hover)
					.find('.'+_hover+'')
					.removeClass(_hover);
				currentItem.addClass(_hover);

				e.preventDefault();
			});

			$container.on('click', ''+self.options.drop+'', function (e) {
				e.stopPropagation();
			});

			$(document).on('click', function () {
				$item.removeClass(_hover);
			});
		} else {
			$container.on('mouseenter', ''+item+'', function () {
				var currentItem = $(this);

				if (currentItem.prop('hoverTimeout')) {
					currentItem.prop('hoverTimeout',
						clearTimeout(currentItem.prop('hoverTimeout')
						)
					);
				}

				currentItem.prop('hoverIntent', setTimeout(function () {
					currentItem.addClass(_hover);
				}, 50));

			});
			$container.on('mouseleave', ''+ item+'', function () {
				var currentItem = $(this);

				if (currentItem.prop('hoverIntent')) {
					currentItem.prop('hoverIntent',
						clearTimeout(currentItem.prop('hoverIntent')
						)
					);
				}

				currentItem.prop('hoverTimeout', setTimeout(function () {
					currentItem.removeClass(_hover);
				}, 100));
			});

		}
	};

	HoverClass.prototype.removeClassHover = function () {
		var self = this;
		self.$item.removeClass(self.modifiers.hover );
	};

	window.HoverClass = HoverClass;

}(jQuery));

function hoverClassInit(){
	var $navList = $('.nav');
	if($navList.length){
		new HoverClass({
			container: $navList,
			drop: '.js-nav-drop'
		});
	}
}
/*hover class end*/

/*navigation drop behavior*/
function navDropHeight() {
	var $navDrop = $('.js-nav-drop');
	if (!$navDrop.length) return false;

	$(window).on('load resize', function () {
		$navDrop.css('height', $(window).outerHeight());
	})
}

function navDropBehavior(){
	var $navDrop = $('.js-nav-drop');
	if($navDrop.length){
		var $html = $('html'),
			$item = $('.nav-list .has-drop'),
			activeClass = 'show-nav-drop',
			animateSpeed = 0.2,
			$sidebarOverlay = $('<div class="overlay">');

		$item.each(function () {
			var $currentItem = $(this),
				$currentNavDrop = $currentItem.find('.nav-drop');

			if (DESKTOP) {
				$currentItem.on('mouseenter', function () {

					openNavDrop();

				}).on('mouseleave', function () {

					closeNavDrop();

				});

				$currentItem.on('click', function (e) {
					e.stopPropagation();
				});
			}

			if(!DESKTOP){
				$currentItem.on('click', function (e) {
					openNavDrop();

					equalHeightNavDropGroup();
					createOverlay();
				});
			}

			$(document).on('click', function () {
				closeNavDrop()
			});

			$('.close-nav-drop-js').on('click', function (e) {
				e.preventDefault();

				closeNavDrop();
			});

			function openNavDrop() {
				// $html.addClass(activeClass);
				TweenMax.set($currentNavDrop, {display: 'block'});
				TweenMax.to($currentNavDrop, animateSpeed, {autoAlpha: 1});

				equalHeightNavDropGroup();
				createOverlay();
			}

			function closeNavDrop() {
				// $html.removeClass(activeClass);
				TweenMax.to($currentNavDrop, animateSpeed, {
					autoAlpha: 0, onComplete: function () {
						$currentNavDrop.hide();
					}
				});
				createOverlay('close');
			}

			function equalHeightNavDropGroup() {
				var $navDropGroup = $navDrop.find('.nav-drop__group');

				$navDropGroup.equalHeight({
					resize: true,
					amount: $navDropGroup.length
				});

				$navDropGroup.css('min-height', $(window).outerHeight());
			}

			function createOverlay(close) {
				if(close == "close"){
					TweenMax.to($sidebarOverlay, animateSpeed, {autoAlpha:0, onComplete:completeHandler});
					function completeHandler() {
						$sidebarOverlay.remove();
					}
				} else {
					$sidebarOverlay.appendTo('body');
					TweenMax.to($sidebarOverlay, animateSpeed, {autoAlpha:0.8});
				}
			}
		})
	}
}
/*navigation drop behavior end*/

/*map init*/
var largePinMap = 'img/map-pin.png';

var localObjects = [
	[
		{lat: 32.9122, lng: -96.7391}, //coordinates of marker
		{latBias: 0.0020, lngBias: 0}, //bias coordinates for center map
		largePinMap, //image pin
		15,
		{
			title: 'USA & Canada',
			address: '<b>Address:</b> <div>9330 LBJ Freeway, Suite 900 <br> Dallas, TX 75243 <br> PO Box 647, LIghtfoot, VA 23090</div>',
			phone: '<b>Tel.:</b> <div><a href="tel:2145613922">(214) 561-3922</a></div>',
			works: '<b>E-mail:</b> <div><a href="mailto:info@aztoys.com">info@aztoys.com</a></div>'
		}
	],[
		{lat: 59.4384, lng: 24.7340}, //coordinates of marker
		{latBias: 0.0020, lngBias: 0}, //bias coordinates for center map
		largePinMap, //image pin
		15,
		{
			title: 'USA & Canada',
			address: '<b>Address:</b> <div>Toompuiestee 35, korrus 2, <br> Tallinn 10133, Estonia</div>',
			phone: '<b>Tel.:</b> <div><a href="tel:003725183088"></div>',
			works: '<b>E-mail:</b> <div><a href="mailto:info@aztoys.com">info@aztoys.com</a></div>'
		}
	]
];

var styleMap = [
	{"featureType": "all", "elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]}, {
	"featureType": "all",
	"elementType": "labels.text.stroke",
	"stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
}, {"featureType": "all", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
	"featureType": "administrative",
	"elementType": "geometry.fill",
	"stylers": [{"color": "#000000"}, {"lightness": 20}]
}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]}, {
	"featureType": "landscape",
	"elementType": "geometry",
	"stylers": [{"color": "#000000"}, {"lightness": 20}]
}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 21}]}, {
	"featureType": "road.highway",
	"elementType": "geometry.fill",
	"stylers": [{"color": "#000000"}, {"lightness": 17}]
}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]}, {
	"featureType": "road.arterial",
	"elementType": "geometry",
	"stylers": [{"color": "#000000"}, {"lightness": 18}]
}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 16}]}, {
	"featureType": "transit",
	"elementType": "geometry",
	"stylers": [{"color": "#000000"}, {"lightness": 19}]
}, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 17}]}
];

var styleMap = [
	{"featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{"color": "#f7f1df"}]}, {
	"featureType": "landscape.natural",
	"elementType": "geometry",
	"stylers": [{"color": "#d0e3b4"}]
}, {"featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{"visibility": "off"}]}, {
	"featureType": "poi",
	"elementType": "labels",
	"stylers": [{"visibility": "off"}]
}, {"featureType": "poi.business", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "poi.medical", "elementType": "geometry", "stylers": [{"color": "#fbd3da"}]}, {
	"featureType": "poi.park",
	"elementType": "geometry",
	"stylers": [{"color": "#bde6ab"}]
}, {"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]}, {"featureType": "road", "elementType": "labels"}, {
	"featureType": "road.highway",
	"elementType": "geometry.fill",
	"stylers": [{"color": "#ffe15f"}]
}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#efd151"}]}, {
	"featureType": "road.arterial",
	"elementType": "geometry.fill",
	"stylers": [{"color": "#ffffff"}]
}, {"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{"color": "black"}]}, {
	"featureType": "transit.station.airport",
	"elementType": "geometry.fill",
	"stylers": [{"color": "#cfb2db"}]
}, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#a2daf2"}]}
];

function mapMainInit(){
	if (!$('[id*="-map"]').length) {return;}

	function mapCenter(index){
		var localObject = localObjects[index];

		return{
			lat: localObject[0].lat + localObject[1].latBias,
			lng: localObject[0].lng + localObject[1].lngBias
		};
	}

	var mapOptions = {};

	var markers = [],
		elementById = [
			document.getElementById('local-01-map'),
			document.getElementById('local-02-map')
		];

	if($(elementById[0]).length){
		mapOptions = {
			zoom: 15,
			center: mapCenter(0),
			styles: styleMap,
			mapTypeControl: false,
			scaleControl: false,
			scrollwheel: false
		};

		var map0 = new google.maps.Map(elementById[0], mapOptions);
		addMarker(0,map0);

		/*aligned after resize*/
		var resizeTimer0;
		$(window).on('resize', function () {
			clearTimeout(resizeTimer0);
			resizeTimer0 = setTimeout(function () {
				moveToLocation(0,map0);
			}, 500);
		});
	}

	if($(elementById[1]).length){
		mapOptions = {
			zoom: 15,
			center: mapCenter(1),
			styles: styleMap,
			mapTypeControl: false,
			scaleControl: false,
			scrollwheel: false
		};

		var map1 = new google.maps.Map(elementById[1], mapOptions);
		addMarker(1,map1);

		/*aligned after resize*/
		var resizeTimer1;
		$(window).on('resize', function () {
			clearTimeout(resizeTimer1);
			resizeTimer1 = setTimeout(function () {
				moveToLocation(1,map1);
			}, 500);
		});
	}

	/*move to location*/
	function moveToLocation(index, map){
		var object = localObjects[index];
		var center = new google.maps.LatLng(mapCenter(index));
		map.panTo(center);
		map.setZoom(object[3]);
	}

	var infoWindow = new google.maps.InfoWindow({
		maxWidth: 220
	});

	function addMarker(index,map) {
		var object = localObjects[index];

		var marker = new google.maps.Marker({
			position: object[0],
			//animation: google.maps.Animation.DROP,
			map: map,
			icon: object[2],
			title: object[4].title
		});

		markers.push(marker);

		function onMarkerClick() {
			var marker = this;

			infoWindow.setContent(
				'<div class="map-popup">' +
				'<h4>'+object[4].title+'</h4>' +
				'<div class="map-popup__list">' +
				'<div class="map-popup__row">'+object[4].address+'</div>' +
				'<div class="map-popup__row">'+object[4].phone+'</div>' +
				'<div class="map-popup__row">'+object[4].works+'</div>' +
				'</div>' +
				'</div>'
			);

			infoWindow.close();

			infoWindow.open(map, marker);
		}

		map.addListener('click', function () {
			infoWindow.close();
		});

		marker.addListener('click', onMarkerClick);
	}
}
/*map init end*/

/*locate events*/
function locateEvents() {
	'use strict';

	var $locate = $('.locate-js');
	if (!$locate.length) return false;

	var activeClass = 'active',
		hideClass = 'hide',
		tabEvent = true,
		index = 0;

	var $tab = [
		'.locate-bg-js',
		'.locate-adr-js',
		'.locate-cont-js'
	];

	var $map = $('.local-map-js');

	$('.locate-controls-js').on('click', 'a', function (e) {
		e.preventDefault();

		var $currentBtn = $(this);

		if ($currentBtn.hasClass(activeClass)) return false;

		var $currentWrapper = $currentBtn.closest($locate);
		index = $currentBtn.index();

		$('.locate-controls-js a').removeClass(activeClass);
		$currentBtn.addClass(activeClass);

		if (tabEvent){
			switchStateTab($currentWrapper,$tab);
			switchStateTab($currentWrapper,$tab,index);
		}

		if (!tabEvent){
			switchStateTab($currentWrapper,$map);
			switchStateTab($currentWrapper,$map,index);
		}

		return index;
	});

	$('.see-map-js').on('click', function (e) {
		e.preventDefault();

		var $currentBtn = $(this),
			$currentWrapper = $currentBtn.closest('.locate-js');

		$currentBtn.toggleClass(activeClass, tabEvent);
		$currentWrapper.toggleClass('map-show', tabEvent);
		$currentWrapper.find('.locate-tabs-js').toggleClass(hideClass, tabEvent);

		if (!tabEvent) {
			tabEvent = true;

			switchStateTab($currentWrapper,$tab,index);
			switchStateTab($currentWrapper,$map);

		} else {
			tabEvent = false;

			switchStateTab($currentWrapper,$tab);
			switchStateTab($currentWrapper,$map,index);
		}
	});

	function switchStateTab(content,tab,index) {
		// if property "index" length class added
		// else class removed
		if (Array.isArray(tab)){
			for(var i = 0; i < tab.length; i++) {
				if (index !== undefined) {
					content.find(tab[i]).eq(index).addClass(activeClass);
				} else {
					content.find(tab[i]).removeClass(activeClass);
				}
			}
		} else {
			if (index !== undefined) {
				content.find(tab).eq(index).addClass(activeClass);
			} else {
				content.find(tab).removeClass(activeClass);
			}
		}
	}
}
/*locate events end*/

/*swiper slider initial*/
// external js:
// 1) Swiper 3.3.1 (widgets.js);
// 2) TweetMax VERSION: 1.19.0 (widgets.js);
function swiperSliderInit() {
	var $slider = $('.swiper-container'),
		slideHolder = '.swiper-holder',
		$sliderBg = $('.swiper-img-js'),
		$sliderTitle = $('.swipe-title-js'),
		playVideoBtn = '.play-video-js',
		closeVideoBtn = '.close-video-js',
		classVideoPlayed = 'video-played',
		animateSpeed = 0.3;

	new Swiper ($slider, {
		// Optional parameters
		// direction: 'vertical',
		loop: true,

		// If we need pagination
		// pagination: '.swiper-pagination',

		// Navigation arrows
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',

		// And if we need scrollbar
		// scrollbar: '.swiper-scrollbar',
		effect: 'coverflow',
		grabCursor: false,
		// loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		speed: 600,
		// autoplay: 7000,
		parallax: false,
		simulateTouch: true,
		coverflow: {
			rotate: 0,
			modifier: 4,
			stretch: 0,
			slideShadows : false,
			scale: 0.8
		},
		slideNextClass: 'swiper-slide-next',
		slidePrevClass: 'swiper-slide-prev',
		onInit: function(event){
			var $iframe = $('<iframe src="about:blank" frameborder="0" allowfullscreen></iframe>'),
				thisSlideHolder = $(event.slides).find(slideHolder);

			TweenMax.set($iframe, {autoAlpha:0});

			$iframe
				.addClass('swiper-video')
				.css({
					'width': '100%',
					'height': '100%'
				})
				.prependTo(thisSlideHolder);

			playSwiperVideo(event.slides);
			eventBtnCloseVideo(event.slides);
		},
		onSlideChangeStart: function(event){
			var $slideWithVideoPlayed = $(event.container).find('.video-played');
			closeSwiperVideo($slideWithVideoPlayed);
		}
	});

	/*add video to each slide*/
	function playSwiperVideo(content) {
		$slider.on('click', playVideoBtn, function (e) {
			e.preventDefault();

			var $playBtn = $(this),
				$container = $playBtn.closest(content),
				$img = $container.find($sliderBg),
				$title = $container.find($sliderTitle),
				$iframe = $container.find('iframe'),
				$slidePrev = $playBtn.closest($slider).find('.swiper-button-prev'),
				$slideNext = $playBtn.closest($slider).find('.swiper-button-next'),
				$closeVideoBtn = $container.find(closeVideoBtn);

			$container.addClass(classVideoPlayed);

			TweenMax.to($playBtn, animateSpeed, {autoAlpha:0});
			TweenMax.to($img, animateSpeed, {autoAlpha:0});
			TweenMax.to($title, animateSpeed, {autoAlpha:0});
			TweenMax.to($title, animateSpeed, {autoAlpha:0});
			TweenMax.to($slidePrev, animateSpeed, {autoAlpha:0});
			TweenMax.to($slideNext, animateSpeed, {autoAlpha:0});

			var src = $playBtn.attr('href');

			$iframe
				.attr("src", src + '?rel=0&autoplay=1');

			TweenMax.to($iframe, animateSpeed, {autoAlpha:1});

			TweenMax.to($closeVideoBtn, animateSpeed, {autoAlpha:1});
		})
	}

	function closeSwiperVideo(content) {
		var $img = content.find($sliderBg),
			$title = content.find($sliderTitle),
			$iframe = content.find('iframe'),
			$playVideoBtn = content.find(playVideoBtn),
			$slidePrev = $('.swiper-button-prev'),
			$slideNext = $('.swiper-button-next'),
			$closeVideoBtn = content.find(closeVideoBtn);

		TweenMax.to($closeVideoBtn, animateSpeed, {autoAlpha: 0});
		TweenMax.to($img, animateSpeed, {autoAlpha: 1});
		TweenMax.to($title, animateSpeed, {autoAlpha: 1});
		TweenMax.to($playVideoBtn, animateSpeed, {autoAlpha: 1});
		TweenMax.to($slidePrev, animateSpeed, {autoAlpha:0.75});
		TweenMax.to($slideNext, animateSpeed, {autoAlpha:0.75});

		$iframe.attr("src", 'about:blank');

		TweenMax.to($iframe, animateSpeed, {autoAlpha: 0});

		content.removeClass(classVideoPlayed);
	}

	function eventBtnCloseVideo(content) {
		$slider.on('click', closeVideoBtn, function (e) {
			e.preventDefault();

			var $closeBtn = $(this);
			var $container = $closeBtn.closest(content);

			closeSwiperVideo($container);
		})
	}
}
/*swiper slider initial end*/

/*share fixed*/
function shareFixed(){
	var $fixedBox = $('.soc-js');

	if(!$fixedBox.length) return false;

	var fixedBoxTopPosition = $fixedBox.offset().top,
		$barrier = $('.main-img-js'),
		$bottom = $('.footer'),
		topSpace = 50;

	$(window).on('load scroll resizeByWidth', function () {

		var barrierTopPosition = $barrier.offset().top,
			barrierHeight = $barrier.outerHeight(),
			fixedBoxHeight = $fixedBox.outerHeight(),
			bottomTopPosition = $bottom.offset().top,
			currentScrollTop = $(window).scrollTop();

		if (currentScrollTop >= (fixedBoxTopPosition - topSpace)) {
			$fixedBox
				.addClass('fixed')
				.css({
					'position': 'fixed',
					'top': topSpace
				});
		} else {
			$fixedBox
				.removeClass('fixed')
				.css({
					'position': 'relative',
					'top': 'auto'
				});
		}

		if (currentScrollTop >= barrierTopPosition - fixedBoxHeight - topSpace*2
			&& currentScrollTop < barrierTopPosition + barrierHeight
			|| currentScrollTop >= bottomTopPosition - fixedBoxHeight - topSpace*2) {
			var tl = TweenMax.to($fixedBox, 0.1, {autoAlpha: 0, ease: Power2.easeInOut});
		} else {
			TweenMax.to($fixedBox, 0.1, {autoAlpha: 1, ease: Power2.easeInOut});
		}
	});
}
/*share fixed end*/

/*parallax background page*/
function parallaxBg() {
	var $page = $('body');

	if (DESKTOP) return false;

	$(window).on('load scroll', function () {
		var currentScrollTop = $(window).scrollTop();

		$page.css({
			'background-position-y': currentScrollTop/1.2,
		})
	});
}
/*parallax background page end*/

/*header fixed*/

function headerFixed(){
	var $page = $('body'),
		minScrollTop = $('.header').outerHeight(),
		previousScrollTop = $(window).scrollTop();

	$(window).on('load scroll resizeByWidth', function () {
		var currentScrollTop = $(window).scrollTop(),
			showHeaderPanel = currentScrollTop < minScrollTop || currentScrollTop < previousScrollTop;

		$page.toggleClass('header-show', showHeaderPanel);

		previousScrollTop = currentScrollTop;
	});
}
/*header fixed end*/

/*main navigation*/
(function ($) {
	// external js:
	// 1) TweetMax VERSION: 1.19.0 (widgets.js);
	// 2) device.js 0.2.7 (widgets.js);
	// 3) debouncedresize (widgets.js);
	var MainNavigation = function (settings) {
		var options = $.extend({
			navContainer: null,
			navMenu: '.nav-list',
			btnMenu: '.btn-menu',
			btnClose: '.btn-nav-close',
			navMenuItem: '.nav-list > li',
			navMenuAnchor: 'a',
			navDropMenu: '.js-nav-drop',
			overlayClass: '.nav-overlay',
			overlayAppend: 'body',
			overlayAlpha: 0.8,
			classNoClickDrop: '.no-click', // Класс, при наличии которого дроп не буте открываться по клику
			classReturn: null,
			overlayBoolean: false,
			animationSpeed: 300,
			animationSpeedOverlay: null,
			minWidthItem: 100
		},settings || {});

		var self = this,
			container = $(options.navContainer),
			_animateSpeed = options.animationSpeed;

		self.options = options;
		self.$navContainer = container;
		self.$navMenu = $(options.navMenu);
		self.$btnMenu = $(options.btnMenu);                        // Кнопка открытия/закрытия меню для моб. верси;
		self.$btnClose = $(options.btnClose);                      // Кнопка закрытия меню для моб. верси;
		self.$navMenuItem = $(options.navMenuItem, container);     // Пункты навигации;
		self.$navMenuAnchor = $(options.navMenuAnchor, container); // Элемент, по которому производится событие (клик);
		self.$navDropMenu = $(options.navDropMenu, container);     // Дроп-меню всех уровней;
		self._animateSpeed = _animateSpeed;
		self._classNoClick = options.classNoClickDrop;

		// overlay
		self._overlayBoolean = options.overlayBoolean;            // Добавить оверлей (по-умолчанию == false). Если не true, то не будет работать по клику вне навигации;
		self._overlayClass = options.overlayClass;                // Класс оверлея;
		self.overlayAppend = options.overlayAppend;                // Элемент ДОМ, вконец которого добавится оверлей, по умолчанию <body></body>;
		self.$overlay = $('<div class="' + self._overlayClass.substring(1) + '"></div>'); // Темплейт оверлея;
		self._overlayAlpha = options.overlayAlpha;
		self._animateSpeedOverlay = options.animationSpeedOverlay || _animateSpeed;

		self._minWidthItem = options.minWidthItem;

		self.desktop = device.desktop();

		self.modifiers = {
			active: 'active',
			hover: 'hover',
			opened: 'nav-opened',
			position: 'position',
			current: 'current',
			alignRight: 'align-right'
		};

		self.navSwitch();
		self.createOverlay();
		self.initNavTween();
		self.clearing();
	};

	// init tween animation
	MainNavigation.prototype.showOverlayTween = new TimelineMax({paused: true});

	// create overlay
	// and append to "overlayAppend"
	MainNavigation.prototype.createOverlay = function () {
		var self = this;
		if (!self._overlayBoolean) return false;

		var $overlay = self.$overlay;
		$overlay.appendTo(self.overlayAppend);
		TweenMax.set($overlay, {autoAlpha: 0});

		self.showOverlayTween.to($overlay, self._animateSpeedOverlay / 1000, {autoAlpha: self._overlayAlpha});
	};

	// show/hide overlay
	MainNavigation.prototype.showOverlay = function () {
		var self = this;
		if (!self._overlayBoolean) return false;

		var showOverlayTween = self.showOverlayTween;

		if (showOverlayTween.progress() != 0 && !showOverlayTween.reversed()) {
			showOverlayTween.reverse();
			return false;
		}
		showOverlayTween.play();
	};

	MainNavigation.prototype.navTween = new TimelineMax({paused: true});

	MainNavigation.prototype.initNavTween = function () {
		var self = this,
			_animationSpeed = self._animateSpeedOverlay,
			$navContainer = self.$navContainer;

		this.navTween
			.to($navContainer, _animationSpeed/1000, {x:0});
	};

	MainNavigation.prototype.navSwitch = function () {
		var self = this,
			$html = $('html'),
			$buttonMenu = self.$btnMenu,
			modifiers = self.modifiers,
			_activeClass = modifiers.active;

		$buttonMenu.on('click', function (e) {
			var thisBtnMenu = $(this);

			if (thisBtnMenu.hasClass(_activeClass)) {
				self.closeNav($html,$buttonMenu);
			} else {
				self.openNav($html,$buttonMenu);
			}

			e.preventDefault();
		});

		$(document).on('click', self._overlayClass, function () {
			self.closeNav($html,$buttonMenu);
		});

		if(self.desktop){
			$(window).on('debouncedresize', function () {
				self.closeNav($html,$buttonMenu);
			});
		}
	};

	MainNavigation.prototype.openNav = function(content,btn) {
		var self = this,
			_animationSpeed = self._animateSpeed,
			$navContainer = self.$navContainer,
			$staggerItems = self.$navMenu.children('li').children('a').children('span'),
			$sbFooter = $navContainer.find('.sidebar-footer__holder');

		content.addClass(self.modifiers.opened);
		btn.addClass(self.modifiers.active);
		$navContainer.css({
			'-webkit-transition-duration': '0s',
			'transition-duration': '0s'
		});

		var itemsTween = TweenMax.staggerFrom($staggerItems, _animationSpeed/1000*2, {opacity:0, x:-40, ease:Elastic.easeOut}, 0.05);
		var footerTween = TweenMax.from($sbFooter, _animationSpeed/1000, {opacity:0, yPercent: 100});

		var navTween = self.navTween;

		if (navTween.progress() != 0 && !navTween.reversed()) {
			navTween.reverse();
			return false;
		}
		navTween.play();
		var tlmAdd = new TimelineMax();
		tlmAdd
			.add(itemsTween)
			.add(footerTween, "-=0.4");
		self.showOverlay();
	};

	MainNavigation.prototype.closeNav = function(content,btn) {
		var self = this,
			_animationSpeed = self._animateSpeed,
			$navContainer = self.$navContainer,
			$buttonMenu = self.$btnMenu,
			navContainerWidth = $navContainer.outerWidth();

		content.removeClass(self.modifiers.opened);
		btn.removeClass(self.modifiers.active);
		self.showOverlay();
		if ($buttonMenu.is(':hidden')) {
			$navContainer.attr('style','');
			return false;
		}
		//TweenMax.to($navContainer, _animationSpeed/1000, {x:-navContainerWidth});
		var navTween = self.navTween;

		if (navTween.progress() != 0 && !navTween.reversed()) {
			navTween.reverse();
			return false;
		}
		navTween.play();
	};

	// clearing inline styles
	MainNavigation.prototype.clearing = function() {
		var self = this,
			$navContainer = self.$navContainer;

		//clear on horizontal resize
		$(window).on('resizeByWidth', function () {
			if($navContainer.attr('style') && !self.$btnMenu.hasClass(self.modifiers.active)){
				$navContainer.attr('style','');
			}
		});
	};

	window.MainNavigation = MainNavigation;

}(jQuery));

function mainNavigationInit(){
	var $container = $('.sidebar');
	if(!$container.length){ return; }
	new MainNavigation({
		navContainer: $container,
		animationSpeed: 300,
		overlayBoolean: true,
		overlayAlpha: 0.75
	});
}
/*main navigation end*/

/*footer at bottom*/
function footerBottom(){
	var $footer = $('.footer');
	if($footer.length){
		$(window).on('load resizeByWidth', function () {
			var footerOuterHeight = $footer.outerHeight();
			$footer.css({
				'margin-top': -footerOuterHeight
			});
			$('.spacer').css({
				'height': footerOuterHeight
			});
		})
	}
}
/*footer at bottom end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	stateFields();
	printShow();
	eventsMainScreen();
	tabs();
	productsBehavior();
	equalHeightInit();
	if(DESKTOP){
		customSelect($('select.cselect'));
	}
	//filtersEvents();
	shareEvents();
	hoverClassInit();
	navDropHeight();
	navDropBehavior();
	mapMainInit();
	locateEvents();
	swiperSliderInit();
	shareFixed();
	// parallaxBg();
	headerFixed();
	mainNavigationInit();

	footerBottom();
});