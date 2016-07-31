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
	var $parent = $('.previews__list');
	if ($parent.length) {
		imagesLoaded($parent, function () {
			$parent.find('.previews__inner').equalHeight({
				useParent: true,
				parent: $parent,
				resize: true
			});
		});
	}
}
/*equal height elements end*/

/*products behavior*/
function productsBehavior() {
	$('.products__item, .previews__item').mouseenter(function () {
		$(this).closest('.main').css('z-index', '99');
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

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	stateFields();
	printShow();
	tabs();
	productsBehavior();
	equalHeightInit();
	footerBottom();
	if(DESKTOP){
		// customSelect($('select.cselect'));
	}
});