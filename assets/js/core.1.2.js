/* -----------------------------------------------------------------------------
 Mi. - Ultimate Personal Resume vCard Template
 File:           JS Core (minified)
 Version:        1.2
 Last change:    01/01/16
 Author:         Suelo
 -------------------------------------------------------------------------------- */
"use strict";
var Mi = {
    init: function() {
        this.Basic.init(), this.Components.init()
    },
    Basic: {
        init: function() {
            var e = this;
            //Pace.on("done", function() {
                $("#page-loader").fadeOut(200), e.animations()
            //})
            e.mobileDetector(), e.backgrounds(), e.scroller(), e.masonry(), e.ajaxLoader(), e.mobileNav(), e.map(), e.forms()
        },
        mobileDetector: function() {
            var e = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i)
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i)
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i)
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i)
                },
                any: function() {
                    return e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
                }
            };
            window.trueMobile = e.any(), trueMobile && $("audio").remove()
        },
        backgrounds: function() {
            $(".bg-image").each(function() {
                var e = $(this).children("img").attr("src");
                $(this).css("background-image", "url(" + e + ")").children("img").hide()
            })
        },
        animations: function() {
            $(".animated-hover").on("mouseenter", function() {
                var e = $(this).data("hover-animation"),
                    t = $(this).data("hover-animation-duration");
                $(this).stop().css({
                    "-webkit-animation-duration": t + "ms",
                    "animation-duration": t + "ms"
                }).addClass(e)
            }).on("mouseleave", function() {
                var e = ($(this), $(this).data("hover-animation"));
                $(this).data("hover-animation-duration");
                $(this).stop().removeAttr("style").removeClass(e)
            }), $(".animated").appear(function() {
                $(this).each(function() {
                    var e = $(this),
                        t = 200 + $(this).data("animation-delay");
                    setTimeout(function() {
                        e.addClass(e.data("animation")).addClass("visible")
                    }, t)
                })
            })
        },
        scroller: function() {
            var e = ($("#header"), $("#header").height()),
                t = ($("#mobile-nav"), $(".section", "#content")),
                a = $("body"),
                o = 0;
            a.hasClass("header-horizontal") && (o = -e);
            var i = $('#header, #mobile-nav, [data-target="local-scroll"]');
            i.find("a").on("click", function() {
                $(this).blur()
            }), i.localScroll({
                offset: o,
                duration: 800,
                easing: $("#content").data("scroll-easing")
            });
            var n = $("#main-menu li > a, #mobile-nav li > a"),
                r = function(e) {
                    n.each(function() {
                        var t = $(this).attr("href");
                        e == t ? $(this).addClass("active") : $(this).removeClass("active")
                    })
                };
            t.waypoint({
                handler: function(e) {
                    if ("up" == e) {
                        var t = "#" + this.element.id;
                        r(t)
                    }
                },
                offset: function() {
                    return a.hasClass("header-horizontal") ? -this.element.clientHeight + e : -this.element.clientHeight + 2
                }
            }), t.waypoint({
                handler: function(e) {
                    if ("down" == e) {
                        var t = "#" + this.element.id;
                        r(t)
                    }
                },
                offset: function() {
                    return a.hasClass("header-horizontal") ? e + 1 : 1
                }
            }),
                $(window).resize(function() {
                setTimeout(function() {
                    Waypoint.refreshAll()
                }, 600)
            })
        },
        masonry: function() {
            var e = $(".masonry");
            e.masonry({
                columnWidth: ".masonry-sizer",
                itemSelector: ".masonry-item",
                percentPosition: !0
            }), e.imagesLoaded().progress(function() {
                e.masonry("layout")
            }), e.on("layoutComplete", Waypoint.refreshAll())
        },
        ajaxLoader: function() {
            function e() {
                r.fadeIn(200, function() {
                    $("html").addClass("locked-scrolling")
                })
            }

            function t() {
                r.load(o)
            }

            function a() {
                s = !1, $("html").removeClass("locked-scrolling"), $("body").removeClass("ajax-modal-opened"), $(document).scrollTop(i), r.fadeOut(200).scrollTop(0)
            }
            var o, i, n = $("#ajax-loader"),
                r = $("#ajax-modal"),
                s = !1;
            $('[data-target="ajax-modal"]').on("click", function() {
                return s = !0, i = $(document).scrollTop(), o = $(this).attr("href"), t(), $("body").addClass("ajax-modal-opened"), !1
            }), $(document).ajaxStart(function() {
                s && n.fadeIn(200)
            }), $(document).ajaxStop(function() {
                s && n.fadeOut(200, function() {
                    e()
                })
            }), r.delegate('*[data-dismiss="close"]', "click", function() {
                return a(), !1
            })
        },
        mobileNav: function() {
            $('[data-target="mobile-nav"]').on("click", function() {
                return $("body").toggleClass("mobile-nav-open"), !1
            })
        },
        map: function() {
            function mapInitialize() {
                var $googleMap = $("#google-map"),
                    yourLatitude = $googleMap.data("latitude"),
                    yourLongitude = $googleMap.data("longitude"),
                    pickedStyle = $googleMap.data("style"),
                    dark = [{
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [{
                            saturation: 36
                        }, {
                            color: "#000000"
                        }, {
                            lightness: 40
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }, {
                            weight: 1.2
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 29
                        }, {
                            weight: .2
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 18
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 19
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }]
                    }],
                    light = [{
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#e9e9e9"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            color: "#f5f5f5"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 29
                        }, {
                            weight: .2
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 18
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{
                            color: "#f5f5f5"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [{
                            color: "#dedede"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#ffffff"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        elementType: "labels.text.fill",
                        stylers: [{
                            saturation: 36
                        }, {
                            color: "#333333"
                        }, {
                            lightness: 40
                        }]
                    }, {
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                            color: "#f2f2f2"
                        }, {
                            lightness: 19
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#fefefe"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#fefefe"
                        }, {
                            lightness: 17
                        }, {
                            weight: 1.2
                        }]
                    }],
                    pickedStyle = $googleMap.data("style"),
                    myOptions = {
                        zoom: 14,
                        center: new google.maps.LatLng(yourLatitude, yourLongitude - .03),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        mapTypeControl: !1,
                        panControl: !1,
                        zoomControl: !0,
                        scaleControl: !1,
                        streetViewControl: !1,
                        scrollwheel: !1,
                        styles: eval(pickedStyle)
                    };
                window.map = new google.maps.Map(document.getElementById("google-map"), myOptions);
                var image = "assets/img/my-location.png",
                    myLatLng = new google.maps.LatLng(yourLatitude, yourLongitude),
                    myLocation = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        icon: image
                    })
            }
            google.maps.event.addDomListener(window, "load", mapInitialize)
        },
        forms: function() {
            var e, t, a = $(".basic-form");
            a.validate({
                errorPlacement: function(e, t) {}
            }), a.submit(function() {
                e = $(this).find(".form-alert"), t = $(this).find(".form-error"), a.valid() || t.show()
            });
            var o = $("#contact-form");
            o.validate({
                errorElement: "span",
                errorContainer: o.find(".form-error"),
                errorLabelContainer: o.find(".form-error ul"),
                wrapper: "li",
                rules: {
                    name: {
                        required: !0,
                        minlength: 2
                    },
                    email: {
                        required: !0,
                        email: !0
                    },
                    message: {
                        required: !0,
                        minlength: 10
                    }
                },
                messages: {
                    name: {
                        required: "Please enter your name.",
                        minlength: "Your name needs to be at least 2 characters"
                    },
                    email: {
                        required: "Please enter your email address.",
                        minlength: "You entered an invalid email address."
                    },
                    message: {
                        required: "Please enter a message.",
                        minlength: "Your message needs to be at least 10 characters"
                    }
                }
            }), o.submit(function() {
                e = $(this).find(".form-alert"), t = $(this).find(".form-error");
                var a;
                return e.hide().html(), o.valid() ? ($.ajax({
                    type: "POST",
                    url: "assets/php/contact-form.php",
                    data: $(this).serialize(),
                    success: function(t) {
                        a = "SEND" === t ? '<div class="alert alert-success">Done! Thank for your message - You will get you an answer as fast as possible!' : '<div class="alert alert-danger">Ooops... It seems that we have a problem.', e.html(a), e.show()
                    }
                }), !1) : !1
            })
        }
    },
    Components: {
        init: function() {
            this.carousel(), this.modal(), this.chart(), this.progressBar(), this.tooltip(), this.popover(), this.messenger(), this.videoPlayer(), this.navToggleable(), this.navFilter()
        },
        modal: function() {
            $(".modal").on("show.bs.modal", function() {
                $("body").addClass("modal-opened")
            }), $(".modal").on("hide.bs.modal", function() {
                $("body").removeClass("modal-opened")
            }), $("#mapModal").on("shown.bs.modal", function() {
                google.maps.event.trigger(map, "resize")
            })
        },
        chart: function() {
            $(".chart").each(function() {
                var e = $(this).data("size");
                $(this).easyPieChart({
                    barColor: $(this).data("bar-color"),
                    trackColor: $(this).data("track-color"),
                    scaleColor: $(this).data("scale-color"),
                    size: e,
                    lineWidth: $(this).data("line-width"),
                    animate: 1e3,
                    onStep: function(e, t, a) {
                        $(this.el).find(".percent").text(Math.round(a))
                    }
                }).css({
                    width: e + "px",
                    height: e + "px"
                }).children(".percent").css("line-height", e + "px")
            }), $(".chart").appear(function() {
                $(this).each(function() {
                    var e = $(this);
                    e.hasClass("visible") || e.addClass("visible");
                    var t = $(this).data("value");
                    setTimeout(function() {
                        e.data("easyPieChart").update(t)
                    }, 200)
                })
            })
        },
        progressBar: function() {
            $(".progress-animated").appear(function() {
                var e = $(this).find(".progress-bar");
                e.each(function() {
                    setTimeout(function() {
                        var t = e.attr("aria-valuenow"),
                            a = 0;
                        setInterval(function() {
                            a++, t >= a && e.children("span").text(a + "%")
                        }, 15), e.css("width", t + "%")
                    }, 300)
                })
            })
        },
        carousel: function() {
            $(".carousel").owlCarousel({
                items: $(this).data("items"),
                itemsDesktop: $(this).data("items-desktop"),
                itemsDesktopSmall: !1,
                itemsTablet: $(this).data("items-tablet"),
                itemsMobile: $(this).data("items-mobile"),
                singleItem: $(this).data("single-item"),
                autoPlay: $(this).data("auto-play"),
                pagination: $(this).data("pagination"),
                stopOnHover: !0
            })
        },
        tooltip: function() {
            $("[data-toggle='tooltip']").tooltip()
        },
        popover: function() {
            $("[rel='popover']").popover()
        },
        videoPlayer: function() {
            var e = $(".video-player");
            e && e.YTPlayer(), trueMobile && e.hasClass("bg-video") && (e.prev(".bg-video-placeholder").show(), e.remove())
        },
        messenger: function() {
            $('[data-target="messenger"]').on("click", function() {
                var e = $("#messenger"),
                    t = $("#messenger-box");
                return e.hasClass("active") ? (t.find(".messenger-box-content").fadeOut(), e.fadeOut(300).removeClass("active")) : e.fadeIn(300, function() {
                    t.find(".messenger-box-content").fadeIn(400)
                }).addClass("active"), !1
            })
        },
        navToggleable: function() {
            $(".nav-toggleable > li.dropdown > a").on("click", function() {
                return $(this).parent("li").toggleClass("active"), !1
            })
        },
        navFilter: function() {
            var e = $(".nav-filter");
            e.on("click", "a", function() {
                var e = $($(this).parents(".nav-filter").data("filter-grid")),
                    t = $(this).attr("data-filter");
                return e.isotope({
                    filter: t
                }), $(this).parents(".nav").find(".active").removeClass("active"), $(this).parent("li").addClass("active"), !1
            })
        }
    }
};
$(document).ready(function() {
    Mi.init()
});