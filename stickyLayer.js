
$.fn.extend({
    stickyLayer: function (options) {
        var _options = options || {stopLayer: null},
            layer = this,
            layerTop = 0,
            layerLeft = 0,
            layerWidth = 0,
            layerHeight = 0,
            stopHeight = 0,
            interval = null,
            initialState = {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                position: 'static'
            };

        init();

        function init() {
            recalcForResize();
            $(window).resize(function (e) {
                recalcForResize();
            });
            if (layer.length > 0) {
                stopHeight = 0;
                interval = null;
                $(document).bind("scroll", function (e) {
                    checkLayer(e);
                });

                $(document).bind("touchstart", function (e) {
                    interval = setInterval(function () {
                        checkLayer(e);
                    }, 500);
                });
                $(document).bind("touchend", function (e) {
                    clearInterval(interval);
                });
                $(document).bind("touchmove", function (e) {
                    checkLayer(e);
                });

            }
        }

        function recalcForResize() {
            layerTop = layer.offset().top;
            layerLeft = layer.offset().left;
            layerWidth = layer.width();
            layerHeight = layer.height();
            initialState.left = layer.css("left");
            initialState.right = layer.css("right");
            initialState.bottom = layer.css("bottom");
            initialState["margin-top"] = layer.css("margin-top");
            initialState.top = layer.css("top");
            initialState.position = layer.css("position");
            //Error en firefox
            if (initialState.left != 'auto' && initialState.right != 'auto') {
                if (parseInt(initialState.left, 10) < parseInt(initialState.right, 10)) {
                    initialState.right = 'auto';
                } else {
                    initialState.left = 'auto';
                }
            }
        }

        function checkLayer(e) {
            if (_options.stopLayer != null) {
                stopHeight = $(_options.stopLayer).offset().top;
                if ($(window).scrollTop() + layerHeight > stopHeight) {
                    layer.css({
                        position: "absolute",
                        top: stopHeight - layerHeight
                        //                        width: layerWidth + "px"
                    });
                }
            }
            else if ($(window).scrollTop() > layerTop) {
                layer.css({
                    position: "fixed",
                    top: "0",
                    "margin-top": 0,
                    left: layerLeft,
                    width: layerWidth,
                    right: 'auto',
                    bottom: 'auto'
                });
            } else {
                layer.css(initialState);
            }
            updateStopLayer();
        }

        function updateStopLayer() {
//                if (typeof (_options.stopLayer) != 'undefined') {
//                    console.log("Updateando stop layer");
//                    stopHeight = $(_options.stopLayer).offset().top ;
//                } else {
//                    console.log("Updateando NO stop layer");
//                    stopHeight = $(document).height();
//                }
        }
    }
});
