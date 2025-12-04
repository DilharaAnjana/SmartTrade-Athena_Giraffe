(function(window, document, $, undefined) {
    'use strict';

    var axilInit = {
        i: function(e) {
            axilInit.s();
            axilInit.methods();
        },

        s: function(e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },

        methods: function(e) {
            axilInit.w();
            axilInit.contactForm();
            axilInit.axilBackToTop();
            axilInit.shopFilterWidget();
            axilInit.mobileMenuActivation();
            axilInit.menuLinkActive();
            axilInit.headerIconToggle();
            axilInit.priceRangeSlider();
            axilInit.quantityRanger();
            axilInit.axilSlickActivation();
            axilInit.countdownInit('.coming-countdown', '2024/10/10');
            axilInit.campaignCountdown('.campaign-countdown', '2024/10/10');
            axilInit.countdownInit('.poster-countdown', '2024/10/10');
            axilInit.countdownInit('.sale-countdown', '2024/10/10');
            axilInit.sideOffcanvasToggle('.cart-dropdown-btn', '#cart-dropdown');
            axilInit.sideOffcanvasToggle('.mobile-nav-toggler', '.header-main-nav');
            axilInit.sideOffcanvasToggle('.department-side-menu', '.department-nav-menu');
            axilInit.sideOffcanvasToggle('.filter-toggle', '.axil-shop-sidebar');
            axilInit.sideOffcanvasToggle('.axil-search', '#header-search-modal');
            axilInit.sideOffcanvasToggle('.popup-close, .closeMask', "#offer-popup-modal");
            axilInit.stickyHeaderMenu();
            axilInit.salActivation();
            axilInit.magnificPopupActivation();
            axilInit.colorVariantActive();
            axilInit.headerCampaignRemove();
            // axilInit.offerPopupActivation();
            axilInit.axilMasonary();
            axilInit.counterUpActivation();
            axilInit.scrollSmoth();
            axilInit.onLoadClassAdd();
            axilInit.dropdownMenuSlide();
           
           
        },

        w: function(e) {
            this._window.on('load', axilInit.l).on('scroll', axilInit.res)
        },

        contactForm: function() {
            $('.axil-contact-form').on('submit', function(e) {
                e.preventDefault();
                var _self = $(this);
                var _selector = _self.closest('input,textarea');
                _self.closest('div').find('input,textarea').removeAttr('style');
                _self.find('.error-msg').remove();
                _self.closest('div').find('button[type="submit"]').attr('disabled', 'disabled');
                var data = $(this).serialize();
                $.ajax({
                    url: 'mail.php',
                    type: "post",
                    dataType: 'json',
                    data: data,
                    success: function(data) {
                        _self.closest('div').find('button[type="submit"]').removeAttr('disabled');
                        if (data.code == false) {
                            _self.closest('div').find('[name="' + data.field + '"]');
                            _self.find('.axil-btn').after('<div class="error-msg"><p>*' + data.err + '</p></div>');
                        } else {
                            $('.error-msg').hide();
                            $('.form-group').removeClass('focused');
                            _self.find('.axil-btn').after('<div class="success-msg"><p>' + data.success + '</p></div>');
                            _self.closest('div').find('input,textarea').val('');

                            setTimeout(function() {
                                $('.success-msg').fadeOut('slow');
                            }, 5000);
                        }
                    }
                });
            });
        },

        counterUpActivation: function () {
			var _counter = $('.count');
			if (_counter.length) {
				_counter.counterUp({
					delay: 10,
					time: 1000,
					triggerOnce: true
				});
			}
        },

        scrollSmoth: function (e) {
            $(document).on('click', '.smoth-animation', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 200);
            });
        },

        axilBackToTop: function() {
            var btn = $('#backto-top');
            $(window).scroll(function() {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            });
            btn.on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, '300');
            });
        },

        shopFilterWidget: function() {
            $('.toggle-list > .title').on('click', function(e) {

                var target = $(this).parent().children('.shop-submenu');
                var target2 = $(this).parent();
                $(target).slideToggle();
                $(target2).toggleClass('active');
            });

            $('.toggle-btn').on('click', function(e) {

                var target = $(this).parent().siblings('.toggle-open');
                var target2 = $(this).parent();
                $(target).slideToggle();
                $(target2).toggleClass('active');
            });
        },

        mobileMenuActivation: function(e) {
            
            $('.menu-item-has-children > a').on('click', function(e) {

                var targetParent = $(this).parents('.header-main-nav');
                var target = $(this).siblings('.axil-submenu');

                if (targetParent.hasClass('open')) {
                    $(target).slideToggle(400);
                    $(this).parent('.menu-item-has-children').toggleClass('open');
                }

            });

            $('.nav-link.has-megamenu').on('click', function(e) {

                var $this = $(this),
                targetElm = $this.siblings('.megamenu-mobile-toggle');
                targetElm.slideToggle(500);
            });

            // Mobile Sidemenu Class Add
            function resizeClassAdd() {
                if (window.matchMedia('(max-width: 1199px)').matches) {
                    $('.department-title').addClass('department-side-menu');
                    $('.department-megamenu').addClass('megamenu-mobile-toggle');
                } else {
                    $('.department-title').removeClass('department-side-menuu');
                    $('.department-megamenu').removeClass('megamenu-mobile-toggle').removeAttr('style');
                }
            }

            $(window).resize(function() {
                resizeClassAdd();
            });

            resizeClassAdd();
        },

        menuLinkActive: function () {
            var currentPage = location.pathname.split("/"),
                current = currentPage[currentPage.length-1];
            $('.mainmenu li a, .main-navigation li a').each(function(){
                var $this = $(this);
                if($this.attr('href') === current){
                    $this.addClass('active');
                    $this.parents('.menu-item-has-children').addClass('menu-item-open')
                }
            });
        },

        headerIconToggle: function() {

            $('.my-account > a').on('click', function(e) {
                $(this).toggleClass('open').siblings().toggleClass('open');
            })
        },

        priceRangeSlider: function(e) {
            $('#slider-range').slider({
                range: true,
                min: 0,
                max: 1000000,
                values: [0, 1000000],
                slide: function(event, ui) {
                    $('#amount').val('Rs.' + ui.values[0] + '  Rs.' + ui.values[1]);
                }
            });
            $('#amount').val('Rs.' + $('#slider-range').slider('values', 0) +
                '  Rs.' + $('#slider-range').slider('values', 1));

        },

        quantityRanger: function() {
            $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
            $('.pro-qty').append('<span class="inc qtybtn">+</span>');
            $('.qtybtn').on('click', function() {
                var $button = $(this);
                var oldValue = $button.parent().find('input').val();
                if ($button.hasClass('inc')) {
                    var newVal = parseFloat(oldValue) + 1;
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 0) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }
                $button.parent().find('input').val(newVal);
            });
        },

        axilSlickActivation: function(e) {
            $('.categrie-product-activation').slick({
                infinite: true,
                slidesToShow: 7,
                slidesToScroll: 7,
                arrows: true,
                dots: false,
                autoplay: false,
                speed: 1000,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 6,
                            slidesToScroll: 6
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 479,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },

                ]
            });

            $('.categrie-product-activation-3').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: true,
                dots: false,
                autoplay: false,
                speed: 1000,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 479,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },

                ]
            });

            $('.categrie-product-activation-4').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                autoplay: false,
                speed: 1000,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
            });

            $('.categrie-product-activation-2').slick({
                infinite: true,
                slidesToShow: 7,
                slidesToScroll: 7,
                arrows: true,
                dots: false,
                autoplay: true,
                speed: 1000,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1399,
                        settings: {
                            slidesToShow: 6,
                            slidesToScroll: 6
                        }
                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 479,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            $('.explore-product-activation').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                
            });

            $('.popular-product-activation').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
                
            });

            $('.new-arrivals-product-activation').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                dots: false,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            $('.new-arrivals-product-activation-2').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                dots: false,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            variableWidth: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            $('.recently-viwed-activation').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                dots: false,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
                responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            $('.header-campaign-activation').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                autoplay: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>'
            });

            $('.testimonial-slick-activation-two').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>'
            });

            $('.testimonial-slick-activation').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                speed: 500,
                draggable: true,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });

            var $slideStatus = $('.slick-slide-count');
            
            $('.testimonial-slick-activation-three').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                var i = (currentSlide ? currentSlide : 0) + 1;
                $slideStatus.text(i + '/' + slick.slideCount);
            });

            $('.testimonial-slick-activation-three').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                speed: 500,
                draggable: true,
                prevArrow: $('.prev-custom-nav'),
                nextArrow: $('.next-custom-nav'),
                responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });

            $('.product-small-thumb').slick({
                infinite: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                focusOnSelect: true,
                vertical: true,
                speed: 800,
                asNavFor: '.product-large-thumbnail',
                responsive: [{
                        breakpoint: 992,
                        settings: {
                            vertical: false,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            vertical: false,
                            slidesToShow: 4,
                        }
                    }
                ]

            });

            $('.product-large-thumbnail').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                speed: 800,
                draggable: false,
                asNavFor: '.product-small-thumb'
            });

            $('.product-small-thumb-2').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                focusOnSelect: true,
                speed: 800,
                asNavFor: '.product-large-thumbnail-2',
                responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 5,
                        }
                    },
                    {
                        breakpoint: 479,
                        settings: {
                            slidesToShow: 4,
                        }
                    }
                ]

            });

            $('.product-large-thumbnail-2').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                speed: 800,
                draggable: false,
                asNavFor: '.product-small-thumb-2',
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>'
            });

            $('.product-small-thumb-3').slick({
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                focusOnSelect: true,
                vertical: true,
                speed: 800,
                draggable: false,
                swipe: false,
                asNavFor: '.product-large-thumbnail-3',
                responsive: [{
                        breakpoint: 992,
                        settings: {
                            vertical: false,
                        }
                    }
                ]

            });

            $('.product-large-thumbnail-3').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                speed: 800,
                draggable: false,
                swipe: false,
                asNavFor: '.product-small-thumb-3'
            });

            // New Page
            $('.product-small-thumb-4').slick({
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                focusOnSelect: true,
                speed: 800,
                asNavFor: '.product-large-thumbnail-4',
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
                responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 5,
                        }
                    },
                    {
                        breakpoint: 479,
                        settings: {
                            slidesToShow: 4,
                        }
                    }
                ]

            });

            $('.product-large-thumbnail-4').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                speed: 800,
                draggable: false,
                swipe: false,
                asNavFor: '.product-small-thumb-4'
            });

            //

            $('.related-blog-activation').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                speed: 500,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                        }
                    }

                ]
            });

            $('.blog-gallery-activation').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                speed: 500,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
            });

            $('#quick-view-modal').on('shown.bs.modal', function (event) {
                $('.slick-slider').slick('setPosition');
            });

            

            $('.slider-thumb-activation-two').slick({
                infinite: true,
                slidesToShow: 3,
                centerPadding: '0',
                arrows: false,
                dots: true,
                speed: 1500,
                autoplay: false,
                centerMode: true,
                responsive: [{
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });

            $('.slider-thumb-activation-three').slick({
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                focusOnSelect: false,
                speed: 1500,
                autoplay: true,
                responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]

            });

            

            $('.slider-activation-one').slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                fade: true,
                focusOnSelect: false,
                speed: 400

            });

            $('.slider-activation-two').slick({
                infinite: true,
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                fade: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                speed: 400
            });

            $('.team-slide-activation').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                dots: false,
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                responsive: [{
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },

        countdownInit: function(countdownSelector, countdownTime) {
            var eventCounter = $(countdownSelector);
            if (eventCounter.length) {
                eventCounter.countdown(countdownTime, function(e) {
                    $(this).html(
                        e.strftime(
                            "<div class='countdown-section'><div><div class='countdown-number'>%-D</div> <div class='countdown-unit'>Day</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hrs</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Min</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Sec</div> </div></div>"
                        )
                    );
                });
            }
        },

        campaignCountdown: function(countdownSelector, countdownTime) {
            var eventCounter = $(countdownSelector);
            if (eventCounter.length) {
                eventCounter.countdown(countdownTime, function(e) {
                    $(this).html(
                        e.strftime(
                            "<div class='countdown-section'><div><div class='countdown-number'>%-D</div> <div class='countdown-unit'>D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>M</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>S</div> </div></div>"
                        )
                    );
                });
            }
        },

        sideOffcanvasToggle: function(selectbtn, openElement) {

            $('body').on('click', selectbtn, function(e) {
                e.preventDefault();

                var $this = $(this),
                    wrapp = $this.parents('body'),
                    wrapMask = $('<div / >').addClass('closeMask'),
                    cartDropdown = $(openElement);

                if (!(cartDropdown).hasClass('open')) {
                    wrapp.addClass('open');
                    cartDropdown.addClass('open');
                    cartDropdown.parent().append(wrapMask);
                    wrapp.css({
                        'overflow': 'hidden'

                    });

                } else {
                    removeSideMenu();
                }

                function removeSideMenu() {
                    wrapp.removeAttr('style');
                    wrapp.removeClass('open').find('.closeMask').remove();
                    cartDropdown.removeClass('open');
                }

                $('.sidebar-close, .closeMask').on('click', function() {
                    removeSideMenu();
                });

            });
        },

        stickyHeaderMenu: function() {

            $(window).on('scroll', function() {
                // Sticky Class Add
                if ($('body').hasClass('sticky-header')) {
                    var stickyPlaceHolder = $('#axil-sticky-placeholder'),
                        menu = $('.axil-mainmenu'),
                        menuH = menu.outerHeight(),
                        topHeaderH = $('.axil-header-top').outerHeight() || 0,
                        headerCampaign = $('.header-top-campaign').outerHeight() || 0,
                        targrtScroll = topHeaderH + headerCampaign;
                    if ($(window).scrollTop() > targrtScroll) {
                        menu.addClass('axil-sticky');
                        stickyPlaceHolder.height(menuH);
                    } else {
                        menu.removeClass('axil-sticky');
                        stickyPlaceHolder.height(0);
                    }
                }
            });
        },

        salActivation: function() {
            sal({
                threshold: 0.3,
                once: true
            });
        },

        magnificPopupActivation: function() {

            var yPopup = $('.popup-youtube');
            if (yPopup.length) {
                yPopup.magnificPopup({
                    disableOn: 300,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            if ($('.zoom-gallery').length) {
                $('.zoom-gallery').each(function() {
                    $(this).magnificPopup({
                        delegate: 'a.popup-zoom',
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                });
            }
        },

        colorVariantActive: function() {
            $('.color-variant > li').on('click', function(e) {
                $(this).addClass('active').siblings().removeClass('active');
            })
        },

        headerCampaignRemove: function() {
           $('.remove-campaign').on('click', function() {
                var targetElem = $('.header-top-campaign');
                targetElem.slideUp(function() {
                    $(this).remove();
                });
           });
        },

        offerPopupActivation: function() {
            if ($('body').hasClass('newsletter-popup-modal')) {
                setTimeout(function(){ 
                    $('body').addClass('open');
                    $('#offer-popup-modal').addClass('open');
                }, 1000);
            }
        },

        axilMasonary: function () {
            $('.axil-isotope-wrapper').imagesLoaded(function () {
                // filter items on button click
                $('.isotope-button').on('click', 'button', function () {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });
                
                // init Isotope
                var $grid = $('.isotope-list').isotope({
                    itemSelector: '.product',
                    percentPosition: true,
                    transitionDuration: '0.7s',
                    layoutMode: 'fitRows',
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: 1,
                    }
                });
            });
        
            $('.isotope-button button').on('click', function (event) {
                $(this).siblings('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
                event.preventDefault();
            });
        },

        onLoadClassAdd: function () {
            this._window.on( "load", function() {
                setTimeout(function() {
                    $('.main-slider-style-4').addClass('animation-init');
                }, 500);
            });

        },

        dropdownMenuSlide: function () {
            if (window.matchMedia('(max-width: 991px)').matches) {
                $('#dropdown-header-menu').removeAttr('data-bs-toggle');
                $('#dropdown-header-menu').on('click', function() {
                   $(this).siblings('.dropdown-menu').slideToggle();
                    // console.log(this)
                })
            }

        },

    }
    axilInit.i();

})(window, document, jQuery);