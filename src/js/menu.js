import $ from 'jquery';

$(document).ready(function() {
  "use strict";

  function stickyNav() {
    var scrollTop = $(window).scrollTop(),
      noSticky = $('.no-sticky'),
      viewportSm = $('.viewport-sm'),
      viewportLg = $('.viewport-lg'),
      viewportLgBody = viewportLg.parent('body'),
      viewportLgNosticky = $('.viewport-lg.no-sticky'),
      viewportLgNostickyBody = viewportLgNosticky.parent('body'),
      viewportLgLogo = viewportLg.find('.logo img'),
      viewportLgNostickyLogo = viewportLgNosticky.find('.logo img'),
      headerTransparentLg = $('.viewport-lg.header-transparent'),
      headerTransparentLgNosticky = $('.viewport-lg.header-transparent.no-sticky'),
      headerTransparentLgBody = headerTransparentLg.parent('body'),
      headerOpacityLg = $('.viewport-lg.header-opacity'),
      headerOpacityLgNosticky = $('.viewport-lg.header-opacity.no-sticky'),
      headerOpacityLgBody = headerOpacityLg.parent('body');

    if (scrollTop > navikHeaderHeight) {
      navikHeader.addClass('sticky');
      viewportLgLogo.attr('src', stickyLogoSrc);
      viewportLgNostickyLogo.attr('src', logoSrc);
      headerTransparentLg.removeClass('header-transparent-on');
      headerOpacityLg.removeClass('header-opacity-on');
      headerTransparentLgNosticky.addClass('header-transparent-on');
      headerOpacityLgNosticky.addClass('header-opacity-on');
      viewportLgBody.css("margin-top", navikHeaderHeight);
      viewportLg.css("margin-top", -navikHeaderHeight);
    } else {
      navikHeader.removeClass('sticky');
      viewportLgLogo.attr('src', logoSrc);
      headerTransparentLg.addClass('header-transparent-on');
      headerOpacityLg.addClass('header-opacity-on');
      viewportLgBody.add(viewportLg).css("margin-top", "0");
    }

    noSticky.removeClass('sticky');
    viewportSm.removeClass('sticky');
    
    headerTransparentLg.add(headerTransparentLgBody).add(headerOpacityLg).add(headerOpacityLgBody).add(viewportLgNostickyBody).add(viewportLgNosticky).css("margin-top", "0");

    var logoCenterWidth = $('.logoCenter .logo img').width(),
      menuCenterOneWidth = $('.center-menu-1 .navik-menu').width(),
      menuCenterOneListMenu = $('.center-menu-1 .navik-menu > ul'),
      menuCenterOneListWidth = menuCenterOneWidth - logoCenterWidth;

    if ($(window).width() < 1200) {
      menuCenterOneListMenu.outerWidth( menuCenterOneWidth );
    } else {
      menuCenterOneListMenu.outerWidth( menuCenterOneListWidth / 2 );
    }

    $('.logoCenter').width(logoCenterWidth);
  }

  function overlayMenuTransition() {
    var overlayMenuFirst = $('.navik-menu-overlay > ul > li:first-child'),
      overlayMenuList = $('.navik-menu-overlay > ul > li');

    overlayMenuFirst.attr('data-delay', '0');

    overlayMenuList.each(function(){
      var $this = $(this),
        overlayMenuNext = $this.next('li'),
        menuDataDelay = $this.attr('data-delay'),
        menuDataDelayNext = parseInt(menuDataDelay) + parseInt('100');

      overlayMenuNext.attr('data-delay', menuDataDelayNext);

      $this.delay(menuDataDelay).queue(function(next) {
        $(this).addClass("menuSlideIn");
        next();
      });
    });
  }

  if ($('.navik-header').length) {
    var navikHeader = $('.navik-header'),
      navikHeaderHeight = navikHeader.height(),
      logo = navikHeader.find('.logo'),
      logoImg = logo.find('img'),
      logoSrc = logoImg.attr('src'),
      logoClone = logo.clone(),
      mobileLogoSrc = logo.data('mobile-logo'),
      stickyLogoSrc = logo.data('sticky-logo'),
      burgerMenu = navikHeader.find('.burger-menu'),
      navikMenuListWrapper = $('.navik-menu > ul'),
      navikMenuListDropdown = $('.navik-menu ul li:has(ul)'),
      headerShadow = $('.navik-header.header-shadow'),
      headerTransparent = $('.navik-header.header-transparent'),
      headerOpacity = $('.navik-header.header-opacity'),
      megaMenuFullwidthContainer = $('.mega-menu-fullwidth .mega-menu-container');

    megaMenuFullwidthContainer.each(function(){
      $(this).children().wrapAll('<div class="mega-menu-fullwidth-container"></div>');
    });

    $(window).on("resize", function() {
      var megaMenuContainer = $('.mega-menu-fullwidth-container');
      if ($(window).width() < 1200) {
        logoImg.attr('src', mobileLogoSrc);
        navikHeader.removeClass('viewport-lg');
        headerTransparent.removeClass('header-transparent-on');
        headerOpacity.removeClass('header-opacity-on');
        megaMenuContainer.removeClass('container');
      } else {
        logoImg.attr('src', logoSrc);
        navikHeader.addClass('viewport-lg');
        headerTransparent.addClass('header-transparent-on');
        headerOpacity.addClass('header-opacity-on');
        megaMenuContainer.addClass('container');
      }
      stickyNav();
    }).resize();

    burgerMenu.on("click", function(){
      $(this).toggleClass('menu-open');
      navikMenuListWrapper.slideToggle(300);
    });

    navikMenuListDropdown.each(function(){
      $(this).append( '<span class="dropdown-plus"></span>' );
      $(this).addClass('dropdown_menu');
    });

    $('.dropdown-plus').on("click", function(){
      $(this).prev('ul').slideToggle(300);
      $(this).toggleClass('dropdown-open');
    });

    $('.dropdown_menu a').append('<span></span>');

    headerShadow.append('<div class="header-shadow-wrapper"></div>');

    $(window).on("scroll", function() {
      stickyNav();
    }).scroll();

    var listMenuHover4 = $('.navik-menu.menu-hover-4 > ul > li > a');
    listMenuHover4.append('<div class="hover-transition"></div>');
  }

  if ($('.navik-header-overlay').length) {
    var navikHeaderOverlay = $('.navik-header-overlay'),
      navikMenuOverlay = $('.navik-menu-overlay'),
      burgerMenuOverlay = navikHeaderOverlay.find('.burger-menu'),
      lineMenuOverlay = navikHeaderOverlay.find('.line-menu'),
      menuOverlayLogo = navikHeaderOverlay.find('.logo'),
      overlayLogoClone = menuOverlayLogo.clone(),
      menuWrapperLogoSrc = menuOverlayLogo.data('overlay-logo'),
      menuOverlayListDropdown = $('.navik-menu-overlay > ul > li:has(ul)'),
      menuOverlayLink = $('.navik-menu-overlay > ul > li > a'),
      menuSlide = $('.navik-header-overlay.menu-slide'),
      menuSlideSubmenuLink = menuSlide.find('.navik-menu-overlay > ul ul a'),
      menuSlideSubmenuDropdown = menuSlide.find('.navik-menu-overlay > ul > li > ul li:has(ul)'),
      menuSocialMedia = navikMenuOverlay.next('.menu-social-media'),
      submenuVerticalListItem = $('.submenu-vertical > ul > li > ul li:has(ul)'),
      submenuVerticalLink = $('.submenu-vertical > ul > li > ul a');

    lineMenuOverlay.wrapAll('<span></span>');
    menuOverlayLink.wrap('<div class="menu-overlay-link"></div>');
    submenuVerticalLink.wrap('<div class="menu-overlay-link"></div>');
    menuSlideSubmenuLink.wrap('<div class="menu-overlay-link"></div>');

    menuOverlayListDropdown.each(function(){
      var menuOverlayDropdownLink = $(this).children('.menu-overlay-link');
      menuOverlayDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
      $(this).addClass('overlay_dropdown_menu');
    });

    submenuVerticalListItem.each(function(){
      var submenuVerticalDropdownLink = $(this).children('.menu-overlay-link');
      submenuVerticalDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
      $(this).addClass('overlay_dropdown_menu');
    });

    menuSlideSubmenuDropdown.each(function(){
      var submenuVerticalDropdownLink = $(this).children('.menu-overlay-link');
      submenuVerticalDropdownLink.prepend( '<span class="overlay-dropdown-plus"></span>' );
      $(this).addClass('overlay_dropdown_menu');
    });

    $('.overlay_dropdown_menu > ul').addClass('overlay-submenu-close');
    
    $('.overlay-dropdown-plus').on("click", function(){
      var $thisParent = $(this).parent('.menu-overlay-link');
      $thisParent.next('ul').slideToggle(300);
      $thisParent.next('ul').toggleClass('overlay-submenu-close overlay-submenu-open');
      $(this).toggleClass('dropdown-open');
    });

    burgerMenuOverlay.on("click", function(){
      $(this).toggleClass('menu-open');
      navikMenuOverlay.toggleClass('menu-open');
      menuSocialMedia.toggleClass('menu-open');
      overlayMenuTransition();
    });

    if ( $('.navik-header-overlay.menu-mobile').length ) {
      burgerMenuOverlay.on("click", function(){
        menuOverlayLogo.toggleClass('menu-open');
      });
    }

    $(window).on("scroll", function() {
      var scrollTop = $(window).scrollTop(),
        headerOpacityScroll = $('.navik-header-overlay.menu-fixed.header-opacity');

      if (scrollTop > navikHeaderOverlay.height()) {
        headerOpacityScroll.addClass('scroll');
      } else {
        headerOpacityScroll.removeClass('scroll');
      }
    }).scroll();
  }
});
