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
	$('select').on('change', function() {
		var _textDefault = $(this).find('option').first().text();
		var _selectedText = $(this).find('option:selected').text();
		$(this).toggleClass('input-complete', _selectedText !== _textDefault);
		$(this).closest('.select').toggleClass('input-complete', _selectedText !== _textDefault);
	});

	$( "input, textarea" ).on('change keyup', function() {
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
	var footer = $('.footer');
	if(footer.length){
		$(window).on('load resizeByWidth', function () {
			var footerOuterHeight = footer.outerHeight();
			footer.css({
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

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	stateFields();
	printShow();
	tabs();
	productsBehavior();
	equalHeightInit();
	headerFixed();
	shareEvents();
	footerBottom();
	hoverClassInit();
	navDropHeight();
	navDropBehavior();
	if(DESKTOP){
		// customSelect($('select.cselect'));
	}
});