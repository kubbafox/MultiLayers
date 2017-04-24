/**
 * Created by Neverland on 4/24/17.
 */


(function () {
    "use strict";

    //Constructors
    setInitialLayerCSSPropertyValue();
    createLayerMapping();
    createClickEventListener();


    function setInitialLayerCSSPropertyValue() {
        var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');
        for (var i = 0; i < tempLayers.length; i++) {
            tempLayers[i].style.zIndex = i;
            tempLayers[i].style.left = (i * 15).toString() + 'px';
            tempLayers[i].style.top = (i * 45).toString() + 'px';
        }

        tempLayers[tempLayers.length - 1].style.background = "#C3E2F1"
        tempLayers[tempLayers.length - 1].style.color = "#53A0C7"
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

            currentLayerPositionMapping = {'layerName': 'evo_js_multiLayers_layer_' + i, 'topPosition': topPosition, 'zIndex': cssZIndexOrderValue , 'top': cssTopValue , 'left': cssLeftValue}
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
        
        //Sort the tempLayerPositions Array based on updated topPosition

        tempLayerPositions.sort(function (a, b) {
            if (a['topPosition'] > b['topPosition']) return 1;
            if (a['topPosition'] < b['topPosition']) return -1;
            return 0;
        });

        //Update CCS PropertyValue & Shuffle Layers
        // var tempLayers = document.getElementsByClassName('evo_js_multiLayers_layer');
        for (var i = 0; i < tempLayerPositions.length; i++) {
            var tempLayer = document.getElementById(tempLayerPositions[i].layerName);
            tempLayer.style.zIndex = i;
            tempLayer.style.left = (i * 15).toString() + 'px';
            tempLayer.style.top = (i * 45).toString() + 'px';
        }
    }

    function getLayerTopPosition(layerId) {
        var tempLayerTop = document.getElementById('evo_js_multiLayers_layer_' + layerId).offsetTop;
        return tempLayerTop;
    }

    function getLayerNumbers() {
        return document.getElementsByClassName('evo_js_multiLayers_layer').length;
    }
})();