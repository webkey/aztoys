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

/* tabs */
function equalHeightForTabs(parentElement){
	var $parent = $('.products__list');
	if ($parent.length) {
		imagesLoaded($parent, function () {
			$parent.find('.products__img').attr('style', '').equalHeight({
				useParent: true,
				parent: $parent,
				resize: true
			});
			$parent.find('.products__inner').attr('style', '').equalHeight({
				useParent: true,
				parent: $parent,
				resize: true
			});
		});
	}
}

function tabs() {
	var $helpfulTabs = $('.tabs-wrap');
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
			load: function(){
				setTimeout(function () {
					// equalHeightForTabs();
				}, 100);
			},
			activate: function() {
				// equalHeightForTabs();
			}
		});

		$('.tab-controls').on('click', 'a', function () {
			if (!$(this).is(':animated')) {
				$('html,body').stop().animate({scrollTop: $helpfulTabs.offset().top - ($('.main-nav').outerHeight() + 20)}, 300);
			}
		})
	}
}
/* tabs end */

/*equal height elements*/
function equalHeightInit(){
	/*previews*/
	var $previewsList = $('.previews__list');
	if ($previewsList.length) {
		imagesLoaded($previewsList, function () {
			$previewsList.find('.previews__inner').equalHeight({
				useParent: true,
				parent: $previewsList,
				resize: true
			});
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
			filtersInit();
		});
	}
}
/*equal height elements end*/

/*products behavior*/
function productsBehavior() {
	$('.products__item, .previews__item').mouseenter(function () {
		$(this).closest('.main').css('z-index', '9');
	}).mouseleave(function () {
		$(this).closest('.main').css('z-index', '4');
	});
}
/*products behavior end*/

/* multiselect init */
// add ui position add class
function addPositionClass(position, feedback, obj){
	removePositionClass(obj);
	obj.css( position );
	obj
		.addClass( feedback.vertical )
		.addClass( feedback.horizontal );
}
// add ui position remove class
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

/*header fixed*/
function headerFixed(){
	var $page = $('html');
	var $headerPanel = $('.main-nav');
	var $headerPanelWrap = $('.main-nav-wrap');
	if (!$headerPanel.length) {
		return;
	}

	$(window).on('load scroll resizeByWidth', function () {
		var scrollTop = $(window).scrollTop();

		$page.toggleClass('header-fixed', scrollTop >= $headerPanelWrap.offset().top);

		$page.toggleClass('header-hide', scrollTop >= $('.footer').offset().top - $headerPanel.outerHeight());
	});
}
/*header fixed end*/

/* footer at bottom */
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
/* footer at bottom end */

/**! filters
 * filter products for tags */
function filtersInit() {
	// external js: Isotope PACKAGED v3.0.1 (widgets.js);
	var $filtersWrapper = $('.products'),
		$filtersTagsGroup = $('.filters-tags-js'),
		tags = {};

	// init Isotope
	var $grid = $filtersWrapper.isotope({
		itemSelector: '.products__item',
		layoutMode: 'fitRows',
		percentPosition: true
	});

	// bind filter tag click

	$filtersTagsGroup.on( 'click', 'a', function(e) {
		e.preventDefault;
		var $currentTag = $( this );
		var dataTagsGroup = $currentTag.closest('.tags-group').attr('data-tags-group');
		dataTagsGroup = (dataTagsGroup == undefined) ? $currentTag.attr('data-filter') : dataTagsGroup;
		tags[ dataTagsGroup ] = $currentTag.hasClass('is-checked') ? '' : $currentTag.attr('data-filter');
		var filterValue = concatValues( tags );
		$grid.isotope({ filter: filterValue });
	});

	//concatenation values of tags
	function concatValues(obj) {
		var value = '';
		for ( var prop in obj ) {
			value += obj[ prop ];
		}
		return value;
	}

	//clear filter tags
	$('.clear-filter').on('click', function () {
		if($(this).hasClass('disabled')) return;

		$filtersTagsGroup.find('.is-checked').removeClass('is-checked');
		$grid.isotope({ filter: '*' });
		tags = {};

		clearBtnState();
	});

	// state clear button
	function clearBtnState() {
		$('.clear-filter').toggleClass('disabled', !$filtersTagsGroup.find('.is-checked').length);
	}
	clearBtnState();

	// change is-checked class on button group
	// $filtersTagsGroup.each( function( i, buttonGroup ) {
	// 	var $buttonGroup = $( buttonGroup );
	// 	$buttonGroup.on( 'click', 'a', function(e) {
	// 		e.preventDefault;
	// 		$buttonGroup.find('.is-checked').not(e.target).removeClass('is-checked');
	// 		$( this ).toggleClass('is-checked');
	//
	// 		clearBtnState();
	// 	});
	// });

	$filtersTagsGroup.on( 'click', 'a', function(e) {
		e.preventDefault;
		$( this ).closest('.button-group-js').find('.is-checked').not(e.target).removeClass('is-checked');
		$( this ).toggleClass('is-checked');

		clearBtnState();
	});


	// count items
	var tempNoProducts = $('<h2 style="text-align: center;">No products</h2>');
	$filtersWrapper.after(tempNoProducts.hide());

	$grid.on( 'arrangeComplete', function( event, filteredItems ) {
		var lengthItems = filteredItems.length;
		$('.filters-counter-js').html('Found: <strong>' + lengthItems + '</strong>');
		if (!lengthItems) {
			tempNoProducts.show();
		} else {
			tempNoProducts.hide();
		}
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

		$wrapper
			.on('mouseenter', function () {
				tw.play();
			}).on('mouseleave', function () {
				tw.reverse();
		});
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
	$(window).on('load resize', function () {
		$('.js-nav-drop').css('height', $(window).outerHeight());
		$('.nav-drop__group').css('min-height', $(window).outerHeight());
	})
}

function navDropBehavior(){
	var $navDrop = $('.nav-drop');
	if($navDrop.length){
		var $html = $('html'),
			$item = $('.nav-list .has-drop'),
			activeClass = 'show-nav-drop',
			animateSpeed = 0.3,
			$sidebarOverlay = $('<div class="overlay">');

		$item.each(function () {
			var $currentItem = $(this),
				$currentNavDrop = $currentItem.find('.nav-drop');

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

			if (DESKTOP) {
				$currentItem.on('mouseenter', function () {

					TweenMax.set($currentNavDrop, {display: 'block'});
					TweenMax.to($currentNavDrop, animateSpeed, {autoAlpha:1});

					createOverlay();
				}).on('mouseleave', function () {

					TweenMax.to($currentNavDrop, animateSpeed, {autoAlpha:0, onComplete: function () {
						$currentNavDrop.hide();
					}});

					createOverlay('close');
				});
			}

			if(!DESKTOP){
				$currentItem.on('click', function (e) {
					//e.preventDefault();

					$html.addClass(activeClass);
					if($sidebarOverlay.is(':hidden')){
						createOverlay();
					}
				});
			}

			$(document).on('click', function () {
				$html.removeClass(activeClass);
				createOverlay('close');
			});

			$currentItem.on('click', function (e) {
				e.stopPropagation();
			});
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

var styleMap = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

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
	var $locate = $('.locate-js');
	if (!$locate.length) return false;

	var activeClass = 'active',
		hideClass = 'hide';

	$('.locate-controls-js').on('click', 'a', function (e) {
		e.preventDefault();

		var $currentBtn = $(this);

		if ($currentBtn.hasClass(activeClass)) return false;

		var index = $currentBtn.index(),
			$currentWrapper = $currentBtn.closest($locate);
		
		$('.locate-controls-js a').removeClass(activeClass);
		$currentBtn.addClass(activeClass);

		if (!$('.see-map-js').hasClass(activeClass)){
			$currentWrapper.find('.locate-bg-js, .locate-adr-js, .locate-cont-js').removeClass(activeClass);
			$currentWrapper.find('.locate-bg-js').eq(index).addClass(activeClass);
			$currentWrapper.find('.locate-adr-js').eq(index).addClass(activeClass);
			$currentWrapper.find('.locate-cont-js').eq(index).addClass(activeClass);
		}

		if ($('.see-map-js').hasClass(activeClass)){
			$currentWrapper.find('.local-map-js').removeClass(activeClass);
			$currentWrapper.find('.local-map-js').eq(index).addClass(activeClass);
		}
	});

	$('.see-map-js').on('click', function (e) {
		e.preventDefault();

		var $currentBtn = $(this);

		var $currentWrapper = $currentBtn.closest($locate),
			$map = $currentWrapper.find('.local-map-js'),
			$tabs = $currentWrapper.find('.locate-tabs-js'),
			$bg = $currentWrapper.find('.locate-bg-js'),
			index = $currentWrapper.find('.locate-controls-js a.active').index();

		if ($currentBtn.hasClass(activeClass)) {
			$currentBtn.removeClass(activeClass);
			$map.removeClass(activeClass);
			$tabs.removeClass(hideClass);

			$currentWrapper.find('.locate-bg-js, .locate-adr-js, .locate-cont-js').removeClass(activeClass);
			$currentWrapper.find('.locate-bg-js').eq(index).addClass(activeClass);
			$currentWrapper.find('.locate-adr-js').eq(index).addClass(activeClass);
			$currentWrapper.find('.locate-cont-js').eq(index).addClass(activeClass);

			return false;
		}

		$currentBtn.addClass(activeClass);

		$map.removeClass(activeClass);
		$bg.removeClass(activeClass);
		$tabs.addClass(hideClass);

		$map.eq(index).addClass(activeClass);
	})
}
/*locate events end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	stateFields();
	printShow();
	tabs();
	productsBehavior();
	equalHeightInit();
	customSelect($('.cselect'));
	//headerFixed();
	shareEvents();
	footerBottom();
	hoverClassInit();
	navDropHeight();
	navDropBehavior();
	mapMainInit();
	locateEvents();
	if(DESKTOP){
		customSelect($('select.cselect'));
	}
});