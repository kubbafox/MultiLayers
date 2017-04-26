/**
 * Created by Neverland on 4/24/17.
 */


(function () {
    "use strict";

    //Constructors
    setInitialLayerCSSPropertyValue();
    createLayerMapping();
    createClickEventListener();
    createScrollEventListener();


    function setInitialLayerCSSPropertyValue() {
        var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');

        //Setup CCS Property for All Layers
        for (var i = 0; i < tempLayers.length; i++) {
            tempLayers[i].style.zIndex = i;
            tempLayers[i].style.left = (i * 25).toString() + 'px';
            tempLayers[i].style.top = (i * 45).toString() + 'px';

            //Setup Header
            var tempChildNodes = tempLayers[i].childNodes;
            tempChildNodes[1].style.transitionDelay = "0.6s";

            //Setup Other Div Tags
            for (var j = 2; j < tempChildNodes.length; j++) {
                if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                    tempChildNodes[j].style.opacity = 0;
                    tempChildNodes[j].style.height = 0;
                }
            }
        }

        //Display & Highlight the Last Layer
        var theLastLayer = tempLayers[tempLayers.length - 1];
        theLastLayer.style.background = "#E7F6FE";
        theLastLayer.style.color = "#53A0C7";
        theLastLayer.style.border = "solid 1px #53A0C7";
        theLastLayer.style.height = "auto";

        var tempChildNodes = theLastLayer.childNodes;
        // Setup Header
        tempChildNodes[1].style.fontWeight = "400";
        tempChildNodes[1].style.fontSize = "22px";
        tempChildNodes[1].style.transitionDelay = "0.6s";

        for (var j = 2; j < tempChildNodes.length; j++) {
            if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                tempChildNodes[j].style.opacity = 1;
                tempChildNodes[j].style.height = 'auto';
            }
        }

    }


    function createLayerMapping() {
        var currentLayerPositions = [];
        var currentLayerPositionMapping = {};
        var layerNumbers = getLayerNumbers();

        for (var i = 1; i < layerNumbers + 1; i++) {
            var topPosition = getLayerTopPosition(i);
            var cssZIndexOrderValue = window.getComputedStyle(document.getElementById('evo_js_multiLayers_layer_' + i)).getPropertyValue('z-index');
            var cssTopValue = window.getComputedStyle(document.getElementById('evo_js_multiLayers_layer_' + i)).getPropertyValue('top');
            var cssLeftValue = window.getComputedStyle(document.getElementById('evo_js_multiLayers_layer_' + i)).getPropertyValue('left');

            currentLayerPositionMapping = {
                'layerName': 'evo_js_multiLayers_layer_' + i,
                'topPosition': topPosition,
                'zIndex': cssZIndexOrderValue,
                'top': cssTopValue,
                'left': cssLeftValue
            };
            currentLayerPositions.push(currentLayerPositionMapping);
        }

        return currentLayerPositions;
    }


    function createClickEventListener() {
        var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');
        for (var i = 0; i < tempLayers.length; i++) {
            tempLayers[i].addEventListener("click", function (e) {

                shuffleLayers(e);
                setCheckMark(e);
            }, false);
        }
    }

    function setCheckMark(e) {

        var clickedElement = (e.target.id).replace('_header', '');
        var clickedMark = document.getElementById(clickedElement).childNodes[1].childNodes[1];
        clickedMark.style.opacity = "1";

        var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');
        var theLastLayerMark = tempLayers[tempLayers.length - 1].childNodes[1].childNodes[1];
        theLastLayerMark.style.opacity = "1";
        theLastLayerMark.style.transitionDelay = "1s";

    }

    function shuffleLayers(e) {
        var tempLayerPositions = createLayerMapping();
        var clickedElement = (e.target.id).replace('_header', '');

        //Change the topPosition Value for Selected Layer
        for (var i = 0; i < tempLayerPositions.length; i++) {
            if (tempLayerPositions[i].layerName == clickedElement) {
                tempLayerPositions[i].topPosition = 999999;
                break;
            }
        }
        //Sort the tempLayerPositions array based on updated topPosition
        tempLayerPositions.sort(function (a, b) {
            if (a['topPosition'] > b['topPosition']) return 1;
            if (a['topPosition'] < b['topPosition']) return -1;
            return 0;
        });

        console.log(tempLayerPositions);


        setTimeout(function () {
            hideUnselectedLayerA();
        }, 200);
        setTimeout(function () {
            hideUnselectedLayerB();
        }, 400);
        setTimeout(function () {
            hideUnselectedLayerC();
        }, 600);
        setTimeout(function () {
            resetZIndexUnselectedLayerC();
            resetZIndexUnselectedLayerB();
            resetZIndexUnselectedLayerA();
            pushClickedLayer();
            highLightClickedLayer();
        }, 1000);


        function resetZIndexUnselectedLayerA() {
            var tempLayer = document.getElementById(tempLayerPositions[2].layerName);
            tempLayer.style.zIndex = 2;
        }

        function resetZIndexUnselectedLayerB() {
            var tempLayer = document.getElementById(tempLayerPositions[1].layerName);
            tempLayer.style.zIndex = 1;
        }

        function resetZIndexUnselectedLayerC() {
            var tempLayer = document.getElementById(tempLayerPositions[0].layerName);
            tempLayer.style.zIndex = 0;
        }

        function hideUnselectedLayerA() {

            var tempLayer = document.getElementById(tempLayerPositions[2].layerName);
            tempLayer.style.zIndex = 10;
            tempLayer.style.left = (2 * 25).toString() + 'px';
            tempLayer.style.top = (2 * 45).toString() + 'px';
            tempLayer.style.background = "#FDFFFC";
            tempLayer.style.color = "#808080";
            tempLayer.style.borderColor = "#808080";
            tempLayer.style.borderBottom = "0";
            tempLayer.style.borderRight = "0";
            tempLayer.style.height = "480px";

            var tempChildNodes = tempLayer.childNodes;
            // Reset Header
            tempChildNodes[1].style.fontWeight = "300";
            tempChildNodes[1].style.fontSize = "16px";

            for (var j = 2; j < tempChildNodes.length; j++) {
                if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                    tempChildNodes[j].style.opacity = 0;
                }
            }
        }

        function hideUnselectedLayerB() {
            console.log('B');

            var tempLayer = document.getElementById(tempLayerPositions[1].layerName);
            tempLayer.style.zIndex = 9;
            tempLayer.style.left = (1 * 25).toString() + 'px';
            tempLayer.style.top = (1 * 45).toString() + 'px';
            tempLayer.style.background = "#FDFFFC";
            tempLayer.style.color = "#808080";
            tempLayer.style.borderColor = "#808080";
            tempLayer.style.borderBottom = "0";
            tempLayer.style.borderRight = "0";
            tempLayer.style.height = "480px";

            var tempChildNodes = tempLayer.childNodes;
            // Reset Header
            tempChildNodes[1].style.fontWeight = "300";
            tempChildNodes[1].style.fontSize = "16px";

            for (var j = 2; j < tempChildNodes.length; j++) {
                if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                    tempChildNodes[j].style.opacity = 0;
                    tempChildNodes[j].style.height = 0;
                }
            }
        }

        function hideUnselectedLayerC() {
            console.log('C');

            var tempLayer = document.getElementById(tempLayerPositions[0].layerName);
            tempLayer.style.zIndex = 8;
            tempLayer.style.left = (0 * 25).toString() + 'px';
            tempLayer.style.top = (0 * 45).toString() + 'px';
            tempLayer.style.background = "#FDFFFC";
            tempLayer.style.color = "#808080";
            tempLayer.style.borderColor = "#808080";
            tempLayer.style.borderBottom = "0";
            tempLayer.style.borderRight = "0";
            tempLayer.style.height = "480px";

            var tempChildNodes = tempLayer.childNodes;
            // Reset Header
            tempChildNodes[1].style.fontWeight = "300";
            tempChildNodes[1].style.fontSize = "16px";

            for (var j = 2; j < tempChildNodes.length; j++) {
                if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                    tempChildNodes[j].style.opacity = 0;
                    tempChildNodes[j].style.height = 0;
                }
            }
        }

        function pushClickedLayer() {
            console.log('P');
            var tempLayer = document.getElementById(tempLayerPositions[3].layerName);
            tempLayer.style.zIndex = 3;
            tempLayer.style.left = (3 * 25).toString() + 'px';
            tempLayer.style.top = (3 * 45).toString() + 'px';
        }


        // Reset CCS PropertyValue & Shuffle Layers


        //Highlight the clicked layer



        function highLightClickedLayer() {
            var clickedLayer = document.getElementById(tempLayerPositions[tempLayerPositions.length - 1].layerName);
            clickedLayer.style.background = " #E7F6FE";
            clickedLayer.style.color = "#53A0C7";
            clickedLayer.style.borderColor = "#53A0C7";
            clickedLayer.style.border = "solid 1px #53A0C7";
            clickedLayer.style.height = "auto";

            var tempChildNodes = clickedLayer.childNodes;

            // Setup Header
            tempChildNodes[1].style.fontWeight = "400";
            tempChildNodes[1].style.fontSize = "22px";

            for (var j = 2; j < tempChildNodes.length; j++) {
                if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                    tempChildNodes[j].style.opacity = 1;
                    tempChildNodes[j].style.height = 'auto';
                }
            }
        }
    }

    function createScrollEventListener() {
        window.addEventListener('scroll', function () {
            var currentScrollTopPosition = checkCurrentScrollPosition();
            var containerTopPosition = getContainerTopPosition();
            var layerNumbers = getLayerNumbers();

            if (currentScrollTopPosition > containerTopPosition + layerNumbers * 38) {
                setHeaderPositionToVertical();
            } else {
                setHeaderPositionToHorizontal();
            }
        }, false);
    }

    var headerPositionIndicator = 0;

    function setHeaderPositionToVertical() {
        var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');

        for (var i = 0; i < tempLayers.length; i++) {

            // tempLayers[i].style.left = (i * 25).toString() + 'px';

            var tempChildNodes = tempLayers[i].childNodes;
            tempChildNodes[1].style.transform = "rotate(90deg)";
            tempChildNodes[1].style.top = "600px";
            tempChildNodes[1].style.left = "-53%";
            tempChildNodes[1].style.whiteSpace = "nowrap";

            tempChildNodes[1].childNodes[1].style.float = "none";
            tempChildNodes[1].childNodes[1].style.width = "12px";
            tempChildNodes[1].childNodes[1].style.height = "12px";
        }

        headerPositionIndicator = 1;
    }

    function setHeaderPositionToHorizontal() {
        if (headerPositionIndicator == 1) {
            var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');

            for (var i = 0; i < tempLayers.length; i++) {

                // tempLayers[i].style.left = (i * 15).toString() + 'px';

                var tempChildNodes = tempLayers[i].childNodes;
                tempChildNodes[1].style.transform = "rotate(0deg)";
                tempChildNodes[1].style.top = "0";
                tempChildNodes[1].style.left = "0";
                tempChildNodes[1].style.whiteSpace = "normal";

                tempChildNodes[1].childNodes[1].style.float = "right";
                tempChildNodes[1].childNodes[1].style.width = "15px";
                tempChildNodes[1].childNodes[1].style.height = "15px";
            }

            headerPositionIndicator = 2;
        }

    }

    function checkCurrentScrollPosition() {
        return document.body.scrollTop;
    }

    function getLayerTopPosition(layerId) {
        return document.getElementById('evo_js_multiLayers_layer_' + layerId).offsetTop;
    }

    function getContainerTopPosition() {
        return document.getElementById('evo_js_multiLayers_container').offsetTop;
    }

    function getLayerNumbers() {
        return document.getElementsByClassName('evo_js_multiLayers_layer').length;
    }
})();