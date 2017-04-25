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
            tempLayers[i].style.left = (i * 15).toString() + 'px';
            tempLayers[i].style.top = (i * 45).toString() + 'px';

            var tempChildNodes = tempLayers[i].childNodes;
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
        tempChildNodes[1].style.fontWeight= "400";
        tempChildNodes[1].style.fontSize= "24px";

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
            }
            currentLayerPositions.push(currentLayerPositionMapping);
        }

        return currentLayerPositions;
    }


    function createClickEventListener() {
        var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');
        for (var i = 0; i < tempLayers.length; i++) {
            tempLayers[i].addEventListener("click", function (e) {
                setInitialLayerCSSPropertyValue();
                shuffleLayers(e);
            }, false);
        }
    }

    function shuffleLayers(e) {
        var tempLayerPositions = createLayerMapping();
        var clickedElement = (e.target.id).replace('_header', '');
        console.log(clickedElement);

        //Change the topPosition Value for Selected Layer
        for (var i = 0; i < tempLayerPositions.length; i++) {
            if (tempLayerPositions[i].layerName == clickedElement) {
                tempLayerPositions[i].topPosition = 9999;
                break;
            }
        }

        //Sort the tempLayerPositions array based on updated topPosition

        tempLayerPositions.sort(function (a, b) {
            if (a['topPosition'] > b['topPosition']) return 1;
            if (a['topPosition'] < b['topPosition']) return -1;
            return 0;
        });

        //Reset CCS PropertyValue & Shuffle Layers
        for (var i = 0; i < tempLayerPositions.length; i++) {
            var tempLayer = document.getElementById(tempLayerPositions[i].layerName);
            tempLayer.style.zIndex = i;
            tempLayer.style.left = (i * 15).toString() + 'px';
            tempLayer.style.top = (i * 45).toString() + 'px';
            tempLayer.style.background = "#FDFFFC";
            tempLayer.style.color = "#808080";
            tempLayer.style.borderColor = "#808080";
            tempLayer.style.borderBottom = "0";
            tempLayer.style.borderRight = "0";
            tempLayer.style.height = "480px";

            var tempChildNodes = tempLayer.childNodes;
            // Reset Header
            tempChildNodes[1].style.fontWeight= "300";
            tempChildNodes[1].style.fontSize= "16px";

            for (var j = 2; j < tempChildNodes.length; j++) {
                if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                    tempChildNodes[j].style.opacity = 0;
                    tempChildNodes[j].style.height = 0;
                }
            }
        }

        //Highlight the clicked layer

        var clickedLayer = document.getElementById(tempLayerPositions[tempLayerPositions.length - 1].layerName);
        clickedLayer.style.background = " #E7F6FE";
        clickedLayer.style.color = "#53A0C7";
        clickedLayer.style.borderColor = "#53A0C7";
        clickedLayer.style.border = "solid 1px #53A0C7";
        clickedLayer.style.height = "auto";

        var tempChildNodes = clickedLayer.childNodes;

        // Setup Header
        tempChildNodes[1].style.fontWeight= "400";
        tempChildNodes[1].style.fontSize= "24px";

        for (var j = 2; j < tempChildNodes.length; j++) {
            if (tempChildNodes[j].nodeName.toLowerCase() == 'div') {
                tempChildNodes[j].style.opacity = 1;
                tempChildNodes[j].style.height = 'auto';
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

    function setHeaderPositionToVertical() {

    }

    function setHeaderPositionToHorizontal() {

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