## A Simple Multi Layers UI Element With Lite Swap Animation. 
 An *Evolution UI Framework* Component
 #### Live Demo
 https://kubbafox.github.io/MultiLayers/
 
 #### I. A few features
 - Click & Swap Layers
 - Fade The Visited Layer
 - Scroll Down & Change Layer Title to Vetical Position
 - Clickable Vertical Positon Title
 
 #### II. How to use it
 Simply use HTML Tags and import JS/CSS files to your project. 
 
 ```HTML
 <div class="evo_c_multiLayers_container" id="evo_js_multiLayers_container">
   <section class="evo_c_multiLayers_layer evo_js_multiLayers_layer" id="evo_js_multiLayers_layer_1">
     <div class="evo_c_multiLayer_header" id="evo_js_multiLayers_layer_header_1">
       Layer Header 1
     </div>
    </section>
    <section class="evo_c_multiLayers_layer evo_js_multiLayers_layer" id="evo_js_multiLayers_layer_2">
     <div class="evo_c_multiLayer_header" id="evo_js_multiLayers_layer_header_2">
       Layer Header 2
     </div>
    </section>
    
    ...
    
    <section class="evo_c_multiLayers_layer evo_js_multiLayers_layer" id="evo_js_multiLayers_layer_n">
     <div class="evo_c_multiLayer_header" id="evo_js_multiLayers_layer_header_n">
       Layer Header N
     </div>
    </section>
 </div>   
 ```
 There are a few pre-defined text blocks for you to use **after** the `<div class="evo_c_multiLayer_header">` tag
 
 
 ```HTML
     <div class="evo_c_multiLayer_title">
       Accumsan pellentesque
     </div>
 ```
 
 ```HTML
     <div class="evo_c_multiLayer_content">
       Accumsan pellentesque
     </div>
 ```
 
 ```HTML
     <div class="evo_c_multiLayer_bullet_point">
       Accumsan pellentesque
     </div>
 ```
 
 Or you can create your own `div` tags based on your need. 
 
 *Please do not overwirte the `left` value in `.evo_c_multiLayers_container section div` css properties*
 
 #### III. A few dependencies
 I am using following dependecies to provide smoonth srcoll.
 
 ```HTML
 <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
 <script src="//s3-us-west-2.amazonaws.com/s.cdpn.io/16327/TweenMax-latest-beta.js?v=corn"></script>
 <script src="//s3-us-west-2.amazonaws.com/s.cdpn.io/16327/ScrollToPlugin-latest-beta.js?v=corn"></script>
 ```
 
 If you would like to use pure JS solution. You can use your own method and replace this function in `script.js` file.
 ```JavaScript
  function scrollBackToContainerTop() {
         ///Replace it by using your own smooth scroll method
         TweenLite.to(window, 0.8, {scrollTo: 0, autoKill: false, ease: Power2.easeOut});
     }
 ```
