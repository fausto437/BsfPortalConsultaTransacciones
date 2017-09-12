PrimeFacesExt={getRequestUrlExtension:function(){return PrimeFacesExt.getUrlExtension(location.href)},getUrlExtension:function(a){return(a=a.substr(1+a.lastIndexOf("/")).split("?")[0]).substr(a.lastIndexOf("."))},getFacesResource:function(a,b,c){var d=PrimeFacesExt.getPrimeFacesExtensionsScriptURI(),d=d.replace("/primefaces-extensions.js",a),d=PrimeFacesExt.useUncompressedResources?d.replace("ln\x3d"+PrimeFacesExt.RESOURCE_LIBRARY_UNCOMPRESSED,"ln\x3d"+b):d.replace("ln\x3d"+PrimeFacesExt.RESOURCE_LIBRARY,
"ln\x3d"+b);a=/[?&]v=([^&]*)/.exec(d)[1];d=c?d.replace("v\x3d"+a,"v\x3d"+c):d.replace("v\x3d"+a,"");return location.protocol+"//"+location.host+d},getPrimeFacesExtensionsVersion:function(){if(!PrimeFacesExt.VERSION){var a=PrimeFacesExt.getPrimeFacesExtensionsScriptURI();PrimeFacesExt.VERSION=/[?&]v=([^&]*)/.exec(a)[1]}return PrimeFacesExt.VERSION},getPrimeFacesExtensionsResource:function(a){var b=PrimeFacesExt.RESOURCE_LIBRARY;PrimeFacesExt.useUncompressedResources&&(b=PrimeFacesExt.RESOURCE_LIBRARY_UNCOMPRESSED);
return PrimeFacesExt.getFacesResource(a,b,PrimeFacesExt.getPrimeFacesExtensionsVersion())},getPrimeFacesExtensionsCompressedResource:function(a){return PrimeFacesExt.getFacesResource(a,PrimeFacesExt.RESOURCE_LIBRARY,PrimeFacesExt.getPrimeFacesExtensionsVersion())},isExtensionMapping:function(){if(!PrimeFacesExt.IS_EXTENSION_MAPPING){var a=PrimeFacesExt.getPrimeFacesExtensionsScriptURI();PrimeFacesExt.IS_EXTENSION_MAPPING="."===a.charAt(a.indexOf("primefaces-extensions.js")+24)}return PrimeFacesExt.IS_EXTENSION_MAPPING},
getResourceUrlExtension:function(){if(!PrimeFacesExt.RESOURCE_URL_EXTENSION){var a=PrimeFacesExt.getPrimeFacesExtensionsScriptURI();PrimeFacesExt.RESOURCE_URL_EXTENSION=/primefaces-extensions.js.([^?]*)/.exec(a)[1]}return PrimeFacesExt.RESOURCE_URL_EXTENSION},useUncompressedResources:function(){if(!PrimeFacesExt.USE_UNCOMPRESSED_RESOURCES){var a=PrimeFacesExt.getPrimeFacesExtensionsScriptURI();PrimeFacesExt.USE_UNCOMPRESSED_RESOURCES=-1!==a.indexOf(RESOURCE_LIBRARY_UNCOMPRESSED)}return PrimeFacesExt.USE_UNCOMPRESSED_RESOURCES},
getPrimeFacesExtensionsScriptURI:function(){PrimeFacesExt.SCRIPT_URI||(PrimeFacesExt.SCRIPT_URI=$('script[src*\x3d"'+PrimeFacesExt.RESOURCE_IDENTIFIER+'/primefaces-extensions.js"]').attr("src"));return PrimeFacesExt.SCRIPT_URI},cw:function(a,b,c,d){PrimeFacesExt.createWidget(a,b,c,d)},createWidget:function(a,b,c,d){if(PrimeFacesExt.widget[a])PrimeFacesExt.initWidget(a,b,c);else{if(d)if(d=PrimeFacesExt.getPrimeFacesExtensionsResource("/"+a.toLowerCase()+"/"+a.toLowerCase()+".css"),$.browser.msie){for(var e,
f=0;f<document.styleSheets.length;f++)document.styleSheets[f].href&&-1!==document.styleSheets[f].href.toString().indexOf("ln\x3dprimefaces")&&(e=f+1);e?document.createStyleSheet(d,e):PrimeFaces.error("No style sheet from PrimeFaces or PrimeFaces Extensions included. StyleSheet for PrimeFaces Extensions Widget "+a+" will not be added.")}else e=$('link[href*\x3d"ln\x3dprimefaces"]:last'),0<e.length?e.after('\x3clink type\x3d"text/css" rel\x3d"stylesheet" href\x3d"'+d+'" /\x3e'):PrimeFaces.error("No style sheet from PrimeFaces or PrimeFaces Extensions included. StyleSheet for PrimeFaces Extensions Widget "+
a+" will not be added.");d=PrimeFacesExt.getPrimeFacesExtensionsResource("/"+a.toLowerCase()+"/"+a.toLowerCase()+".js");PrimeFaces.getScript(d,function(){PrimeFacesExt.initWidget(a,b,c)})}},initWidget:function(a,b,c){PrimeFaces.widgets[b]?PrimeFaces.widgets[b].refresh(c):(PrimeFaces.widgets[b]=new PrimeFacesExt.widget[a](c),PrimeFaces.settings.legacyWidgetNamespace&&(window[b]=PrimeFaces.widgets[b]))},configureLocale:function(a,b){if(PrimeFacesExt.locales&&PrimeFacesExt.locales[a]&&b.locale){var c=
PrimeFacesExt.locales[a][b.locale];if(c)for(var d in c)c.hasOwnProperty(d)&&(b[d]=c[d])}return b},changeTheme:function(a){$(document).trigger("PrimeFacesExt.themeChanged",a)},RESOURCE_IDENTIFIER:"/javax.faces.resource",RESOURCE_LIBRARY:"primefaces-extensions",RESOURCE_LIBRARY_UNCOMPRESSED:"primefaces-extensions-uncompressed",behavior:{},widget:{},locales:{}};PrimeFacesExt.locales.TimePicker={};PrimeFacesExt.locales.Timeline={};
PrimeFacesExt.behavior.Javascript=function(a,b){return a.execute.call(this,a.source,a.event,b.params,b)};(function(a){var b=PrimeFaces.changeTheme;PrimeFaces.changeTheme=function(a){b(a);PrimeFacesExt.changeTheme(a)}})(window);PrimeFacesExt.getAjaxErrorHandlerInstance=function(){if(!PrimeFacesExt.AJAX_ERROR_HANDLER_INSTANCE){var a=new PrimeFacesExt.widget.AjaxErrorHandler;PrimeFacesExt.AJAX_ERROR_HANDLER_INSTANCE=a}return PrimeFacesExt.AJAX_ERROR_HANDLER_INSTANCE};
PrimeFacesExt.widget.AjaxErrorHandler=PrimeFaces.widget.BaseWidget.extend({DEFAULT_HOSTNAME:"???unknown???",init:function(){this.popupWindowMask=this.popupWindowRoot=this.popupWindow=null;this.hostname=this.DEFAULT_HOSTNAME;this.settings=this.defaultSettings={title:"{error-name}",body:"{error-message}",button:"Reload",buttonOnclick:function(){document.location.href=document.location.href},onerror:function(a,b){}};this.otherSettings={};this.overwritePrimeFacesAjaxResponse()},overwritePrimeFacesAjaxResponse:function(){var a=
this;if(!a.isOveritedAjaxResponse){a.isOveritedAjaxResponse=!0;a.isOveritedAjaxResponse=!0;var b=function(c,b,e,f){try{if(c=f,!c&&b&&b.responseXML&&(c=b.responseXML),b=null,c&&(b=c.getElementsByTagName("error")),b&&b.length&&b[0].childNodes&&b[0].childNodes.length){c={};for(f=0;f<b[0].childNodes.length;f++){var h=b[0].childNodes[f],g=h.nodeName,r=h.nodeValue;h.childNodes&&h.childNodes.length&&(r=h.childNodes[0].nodeValue);c[g]=r}if(c["error-name"]){var p=a.findErrorSettings(c["error-name"]);if(p.onerror&&
!1===p.onerror.call(this,c,e))return!0;c.updateCustomContent&&"\x3cexception /\x3e"==c.updateCustomContent.substring(-13)&&(c.updateCustomContent=null);c.updateTitle&&"\x3cexception /\x3e"==c.updateTitle.substring(-13)&&(c.updateTitle=null);c.updateBody&&"\x3cexception /\x3e"==c.updateBody.substring(-13)&&(c.updateBody=null);c.updateViewState&&"\x3cexception /\x3e"==c.updateViewState.substring(-13)&&(c.updateViewState=null);p.updateCustomContent=c.updateCustomContent;p.updateTitle=c.updateTitle;p.updateBody=
c.updateBody;p.updateViewState=c.updateViewState;var t=a.replaceVariables(p,c);a.show(t);return!0}}}catch(m){try{console.error("Unknown response in AjaxExceptionHandler:",m)}catch(u){}}};$(document).ajaxComplete(b);$(document).on("pfAjaxComplete.ajaxerrorhandler",b)}},isVisible:function(){return this.popupWindow&&this.popupWindow.isVisible()},hide:function(){this.dialogWidget&&(this.dialogWidget.hide(),this.dialogWidget=null,this.dialog.remove())},show:function(a){this.hide();this.dialog=$('\x3cdiv id\x3d"ajaxErrorHandlerDialog" class\x3d"ui-dialog ui-widget ui-widget-content ui-overlay-hidden ui-corner-all ui-shadow pe-ajax-error-handler" style\x3d"width: auto; height: auto;"\x3e\x3c/div\x3e');
$("body").append(this.dialog);if(a.updateCustomContent)this.dialog.append(a.updateCustomContent);else{var b=$('\x3cdiv class\x3d"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"\x3e\x3c/div\x3e'),c=$('\x3cspan class\x3d"ui-dialog-title"\x3e\x3c/span\x3e'),d=$('\x3cdiv class\x3d"ui-dialog-content ui-widget-content" style\x3d"height: auto;"\x3e\x3c/div\x3e'),e=$('\x3cdiv class\x3d"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"\x3e\x3c/div\x3e');b.append(c);this.dialog.append(b);
this.dialog.append(d);this.dialog.append(e);var b=$('\x3cbutton class\x3d"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"\x3e\x3cspan class\x3d"ui-button-text"\x3e'+a.button+"\x3c/span\x3e\x3c/button\x3e"),f=a.buttonOnclick;b.click(function(){f.call(this)});e.append(b);a.updateTitle?c.append(a.updateTitle):c.append(a.title);a.updateBody?d.append(a.updateBody):d.append(a.body)}this.dialogWidget=new PrimeFaces.widget.Dialog({id:"ajaxErrorHandlerDialog",resizable:!0,draggable:!0,
modal:!0});this.dialogWidget.show()},getDefaultErrorTime:function(){return(new Date).toString()},findErrorSettings:function(a){if(!a)return jQuery.extend({},this.settings);this.otherSettings[a]||jQuery.extend({},this.settings);return jQuery.extend({},this.settings,this.otherSettings[a])},addErrorSettings:function(a){a&&(a.type?this.otherSettings[a.type]=jQuery.extend({},this.otherSettings[a.type]||{},a):this.settings=jQuery.extend({},this.settings,a))},replaceAll:function(a,b,c){for(var d;(d=a.replace(b,
c))!=a;)a=d;return a},replaceVariables:function(a,b){if(!a)return text;b=jQuery.extend({"error-hostname":this.hostname,"error-stacktrace":"","error-time":this.getDefaultErrorTime()},b);var c={};jQuery.each(a,$.proxy(function(a,e){"string"==typeof e&&jQuery.each(b,$.proxy(function(a,c){e=this.replaceAll(e,"{"+a+"}",c.replace(/\n/g,"\x3cbr /\x3e"))},this));c[a]=e},this));return c},setHostname:function(a){this.hostname=a}});PrimeFacesExt.widget.Spotlight=PrimeFaces.widget.BaseWidget.extend({init:function(a){this.id=a.id;this.blocked=a.blocked;this.content=$(PrimeFaces.escapeClientId(this.id));PrimeFacesExt.widget.Spotlight.cache=PrimeFacesExt.widget.Spotlight.cache||{};this.getMask=function(){var a=PrimeFacesExt.widget.Spotlight.cache["PrimeFacesExt.widget.Spotlight.MaskAround:"+this.id];a||(a=new PrimeFacesExt.widget.Spotlight.MaskAround(this.id),PrimeFacesExt.widget.Spotlight.cache["PrimeFacesExt.widget.Spotlight.MaskAround:"+
this.id]=a);return(this.getMask=function(){return a})()};this.block=function(){this.blocked=!0;this.getMask().show();this.enableModality()};this.unblock=function(){this.blocked=!1;this.getMask().hide();this.disableModality()};this.blocked?this.block():this.unblock();this.removeScriptElement(this.id)},enableModality:function(){this.disableModality();this.content.bind("keydown.lightspot",function(a){if(a.keyCode===$.ui.keyCode.TAB){var c=$(":tabbable",this),d=c.filter(":first"),c=c.filter(":last");
if(a.target===c[0]&&!a.shiftKey)return d.focus(1),!1;if(a.target===d[0]&&a.shiftKey)return c.focus(1),!1}});var a=$(":focus",this.content);a&&a.length||$(":tabbable",this.content).filter(":first").focus(1)},disableModality:function(){this.content.unbind(".lightspot")},block:function(){this.block()},unblock:function(){this.unblock()}});
PrimeFacesExt.widget.Spotlight.MaskAround=function(a){var b=a+"_maskAround",c=function(){var a=$('\x3cdiv class\x3d"ui-widget-overlay"\x3e\x3c/div\x3e');$("body").append(a);var c=a.css("opacity");a.remove();return c}(),d=function(d,e){var f=b+d,h=$(PrimeFaces.escapeClientId(f)).is(":visible"),g=function(){var c=$(PrimeFaces.escapeClientId(f));c&&c.length||(c=$('\x3cdiv id\x3d"'+f+'" /\x3e'),c.css({position:$.browser.webkit?"absolute":"fixed",top:0,left:0,display:"none",zIndex:e,overflow:"hidden",
border:"none"}),c.append($('\x3cdiv class\x3d"ui-widget-overlay" style\x3d"position:absolute;"\x3e\x3c/div\x3e').css("opacity",1)),$("body").append(c),c.click(function(){var c=$(PrimeFaces.escapeClientId(a));$(":tabbable",c).filter(":first").focus(1)}));return c},r=function(){var a=$(PrimeFaces.escapeClientId(f));return a&&a.length?a.is(":visible"):!1},q=function(){var a=$(PrimeFaces.escapeClientId(f));return a&&a.length?!0:!1},k=function(){if(h){if(!r()){var a=g();a.css("zIndex",e);a.fadeTo("fast",
c,k)}}else r()?g().fadeOut("fast",function(){k()}):q()&&g().remove()};return{updatePosition:function(a,c,b,d){if("fixed"==g().css("position")){var e=$(window).scrollLeft(),f=$(window).scrollTop();a-=e;b-=e;c-=f;d-=f}$('\x3cdiv class\x3d"ui-widget-overlay"\x3e\x3c/div\x3e');e=g();e.css({left:a,top:c,width:b-a,height:d-c});b=p();$(e.children()[0]).css({left:0-a,top:0-c,height:b.height,width:b.width})},show:function(a){h=!0;e=a;k()},hide:function(){h=!1;k()}}},e=++PrimeFaces.zindex,f=new d("_top",e),
h=new d("_left",e),g=new d("_bottom",e),r=new d("_right",e),p=function(){var a=$(window).width(),c=$(window).height(),b=$(document).width(),d=$(document).height();return{width:a>b?a:b,height:c>d?c:d}},t=!1,m=null;$(window).bind("resize",function(){m&&clearTimeout(m);m=setTimeout(u,100)});var u=function(){if(!0===t){for(var c=p(),b=c.width,c=c.height,d=$(PrimeFaces.escapeClientId(a)),e=d.offset().left,n=d.offset().top,m=e+d.outerWidth(),q=n+d.outerHeight(),k=d.parent();0<k.length&&"HTML"!=k[0].tagName;){var l=
k.css("overflow");("auto"==l||"hidden"==l||"scroll"==l)&&0<k.height()&&(l=k.offset(),e<l.left&&(e=l.left),n<l.top&&(n=l.top),m>l.left+k.outerWidth()&&(m=l.left+k.outerWidth()),q>l.top+k.outerHeight()&&(q=l.top+k.outerHeight()));k=k.parent()}0>e&&(e=0);0>n&&(n=0);m<e&&(m=e);q<n&&(q=n);if(0<d.outerHeight()&&5>=q-n)try{var s=$(PrimeFaces.escapeClientId(a)+" :focusable");if(2>s.length){var v=$('\x3ca href\x3d"#"\x3e \x3c/a\x3e');d.append(v);v.focus();v.remove()}else $(s[1]).focus();$(s[0]).focus()}catch(w){}s=
0;$.browser.msie&&document.documentMode&&!window.performance&&(s=1);f.updatePosition(0,0,b-0,n-0);g.updatePosition(0,q-0,b-0,c-0);h.updatePosition(0,n-0+s,e-0,q-0-s);r.updatePosition(m-0,n-0+s,b-0,q-0-s);setTimeout(u,150)}};return{show:function(){t=!0;u();var a=++PrimeFaces.zindex;f.show(a);g.show(a);h.show(a);r.show(a)},hide:function(){t=!1;f.hide();g.hide();h.hide();r.hide()}}};CKEDITOR_GETURL=function(a){if(-1!==a.indexOf("?resolve\x3dfalse"))a=a.replace("?resolve\x3dfalse","");else{var b=a.indexOf("v\x3d"+PrimeFacesExt.getPrimeFacesExtensionsVersion());if(-1!==b){if(b=a.substring(b+("v\x3d"+PrimeFacesExt.getPrimeFacesExtensionsVersion()).length),0<b.length){a=a.substring(0,a.length-b.length);var c=a.indexOf(PrimeFacesExt.RESOURCE_IDENTIFIER),d=PrimeFacesExt.isExtensionMapping()?a.lastIndexOf("."+PrimeFacesExt.getResourceUrlExtension()):a.indexOf("?");a=a.substring(c+PrimeFacesExt.RESOURCE_IDENTIFIER.length,
d);a=PrimeFacesExt.getPrimeFacesExtensionsCompressedResource(a+b)}}else a=-1===a.indexOf(PrimeFacesExt.RESOURCE_IDENTIFIER)?PrimeFacesExt.getPrimeFacesExtensionsCompressedResource("/ckeditor/"+a):a}return a};
PrimeFacesExt.widget.CKEditor=PrimeFaces.widget.DeferredWidget.extend({init:function(a){this._super(a);this.instance=null;this.options={};this.options.widgetVar=this.cfg.widgetVar;this.cfg.skin&&(this.options.skin=this.cfg.skin);this.cfg.width&&(this.options.width=this.cfg.width);this.cfg.height&&(this.options.height=this.cfg.height);this.cfg.theme&&(this.options.theme=this.cfg.theme);this.cfg.toolbar&&(this.options.toolbar=this.cfg.toolbar instanceof Array?this.cfg.toolbar:eval(this.cfg.toolbar));
this.cfg.readOnly&&(this.options.readOnly=this.cfg.readOnly);this.cfg.interfaceColor&&(this.options.uiColor=this.cfg.interfaceColor);this.cfg.language&&(this.options.language=this.cfg.language);this.cfg.defaultLanguage&&(this.options.defaultLanguage=this.cfg.defaultLanguage);this.cfg.contentsCss&&(this.options.contentsCss=this.cfg.contentsCss);this.cfg.customConfig&&(this.options.customConfig=this.cfg.customConfig+"?resolve\x3dfalse");if($.fn.ckeditor)this.renderDeferred();else{a=PrimeFacesExt.getPrimeFacesExtensionsCompressedResource("/ckeditor/ckeditor.js");
var b=PrimeFacesExt.getPrimeFacesExtensionsCompressedResource("/ckeditor/adapters/jquery.js");PrimeFaces.getScript(a,$.proxy(function(a,d){PrimeFaces.getScript(b,$.proxy(function(a,c){this.renderDeferred()},this))},this),!0)}},_render:function(){if(!this.instance){this.overwriteSaveButton();var a=CKEDITOR.instances[this.id];if(a)try{a.destroy(!0)}catch(b){window.console&&console.log&&console.log("CKEditor throwed a error while destroying the old instance: "+b)}this.jq.ckeditor($.proxy(function(){this.initialized()},
this),this.options)}},overwriteSaveButton:function(){CKEDITOR.plugins.registered.save={init:function(a){var b=PF(a.config.widgetVar);a.addCommand("save",{modes:{wysiwyg:1,source:1},exec:function(a){b.cfg.behaviors&&(a=b.cfg.behaviors.save)&&a.call(b,{params:[]})}});a.ui.addButton("Save",{label:a.lang.save,command:"save",title:""})}}},initialized:function(){this.instance=this.jq.ckeditorGet();this.fireEvent("initialize");this.instance.on("blur",$.proxy(function(){this.fireEvent("blur")},this));this.instance.on("focus",
$.proxy(function(){this.fireEvent("focus")},this));this.instance.on("contentDom",$.proxy(function(){this.fireEvent("wysiwygMode")},this));this.instance.on("mode",$.proxy(function(a){"source"==this.instance.mode&&this.fireEvent("sourceMode")},this))},fireEvent:function(a){this.cfg.behaviors&&(a=this.cfg.behaviors[a])&&a.call(this,{params:[]})},destroy:function(){if(this.instance){try{this.instance.destroy(!0)}catch(a){window.console&&console.log&&console.log("CKEditor throwed a error while destroying the old instance: "+
a)}this.instance=null}this.jq.show()},isDirty:function(){return this.instance?this.instance.checkDirty():!1},setReadOnly:function(a){this.instance.setReadOnly(!1!==a)},isReadOnly:function(){return this.instance.readOnly},hasFocus:function(){return this.instance.focusManager.hasFocus},getEditorInstance:function(){return this.instance}});PrimeFacesExt.widget.DynaForm=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);a.isPostback||(this.toggledExtended=!1);if(a.autoSubmit&&!PF(a.widgetVar))this.submitForm();else if(a.isPostback&&this.toggledExtended&&this.uuid==a.uuid){var b=this.jq.find("tr.pe-dynaform-extendedrow");0<b.length&&(this.openExtended?b.show():b.hide())}this.uuid=a.uuid},toggleExtended:function(){var a=this.jq.find("tr.pe-dynaform-extendedrow");0<a.length&&(a.toggle(),this.toggledExtended=!0,this.openExtended=
"none"!=$(a[0]).css("display"))},submitForm:function(){this.jq.find(":submit").trigger("click")}});PrimeFacesExt.widget.ImageRotateAndResize=PrimeFaces.widget.BaseWidget.extend({init:function(a){this.id=a.id;this.cfg=a;this.initialized=!1;this.removeScriptElement(this.id)},initializeLazy:function(){this.initialized||(this.target=PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.target)[0],this.imageSrc=this.target.src,this.imageWidth=this.target.width,this.imageHeight=this.target.height,this.degree=0,this.newImageWidth=this.target.width,this.newImageHeight=this.target.height,
this.initialized=!0)},reload:function(){this.initialized=!1;this.initializeLazy()},rotateLeft:function(a){this.initializeLazy();this.degree=0>=this.degree-a?360- -1*(this.degree-a):this.degree-a;this.redrawImage(!1,!0)},rotateRight:function(a){this.initializeLazy();this.degree=360<=this.degree+a?this.degree+a-360:this.degree+a;this.redrawImage(!1,!0)},resize:function(a,b){this.initializeLazy();this.newImageWidth=a;this.newImageHeight=b;this.redrawImage(!0,!1)},scale:function(a){this.initializeLazy();
this.newImageWidth*=a;this.newImageHeight*=a;this.redrawImage(!0,!1)},restoreDefaults:function(){this.initializeLazy();this.newImageWidth=this.imageWidth;this.newImageHeight=this.imageHeight;this.degree=0;this.redrawImage(!0,!0)},redrawImage:function(a,b){var c;c=0<=this.degree?Math.PI*this.degree/180:Math.PI*(360+this.degree)/180;var d=Math.cos(c),e=Math.sin(c);if($.browser.msie&&8>=parseInt($.browser.version)){var f=document.createElement("img");f.onload=$.proxy(function(){f.height=this.newImageHeight;
f.width=this.newImageWidth;f.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11\x3d"+d+",M12\x3d"+-1*e+",M21\x3d"+e+",M22\x3d"+d+",SizingMethod\x3d'auto expand')";f.id=this.target.id;this.target.parentNode.replaceChild(f,this.target);this.target=f;a&&this.fireResizeEvent();b&&this.fireRotateEvent()},this);f.src=this.imageSrc}else{var h=document.createElement("canvas"),g=new Image;g.onload=$.proxy(function(){h.style.width=h.width=Math.abs(d*g.width)+Math.abs(e*g.height);h.style.height=h.height=
Math.abs(d*g.height)+Math.abs(e*g.width);var f=h.getContext("2d");f.save();c<=Math.PI/2?f.translate(e*g.height,0):c<=Math.PI?f.translate(h.width,-1*d*g.height):c<=1.5*Math.PI?f.translate(-1*d*g.width,h.height):f.translate(0,-1*e*g.width);f.rotate(c);f.drawImage(g,0,0,g.width,g.height);f.restore();h.id=this.target.id;h.src=this.target.src;this.target.parentNode.replaceChild(h,this.target);this.target=h;a&&this.fireResizeEvent();b&&this.fireRotateEvent()},this);g.src=this.imageSrc;g.width=this.newImageWidth;
g.height=this.newImageHeight}},fireRotateEvent:function(){if(this.cfg.behaviors){var a=this.cfg.behaviors.rotate;a&&a.call(this,{params:[{name:this.id+"_degree",value:this.degree}]})}},fireResizeEvent:function(){if(this.cfg.behaviors){var a=this.cfg.behaviors.resize;a&&a.call(this,{params:[{name:this.id+"_width",value:this.newImageWidth},{name:this.id+"_height",value:this.newImageHeight}]})}}});PrimeFacesExt.widget.TriStateCheckbox=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.input=$(this.jqId+"_input");this.box=this.jq.find(".ui-chkbox-box");this.icon=this.box.children(".ui-chkbox-icon");this.itemLabel=this.jq.find(".ui-chkbox-label");this.disabled=this.input.is(":disabled");this.fixedMod=function(a,b){return(a%b+b)%b};var b=this;this.disabled||(this.box.mouseover(function(){b.box.addClass("ui-state-hover")}).mouseout(function(){b.box.removeClass("ui-state-hover")}).click(function(a){b.toggle(1);
a.preventDefault?a.preventDefault():a.returnValue=!1}),this.itemLabel.click(function(){b.toggle(1);event.preventDefault?event.preventDefault():event.returnValue=!1}),this.box.bind("keydown",function(a){switch(a.keyCode){case 38:b.toggle(1);a.preventDefault?a.preventDefault():a.returnValue=!1;break;case 40:b.toggle(-1);a.preventDefault?a.preventDefault():a.returnValue=!1;break;case 39:b.toggle(1);a.preventDefault?a.preventDefault():a.returnValue=!1;break;case 37:b.toggle(-1);a.preventDefault?a.preventDefault():
a.returnValue=!1;break;case 32:b.toggle(1),a.preventDefault?a.preventDefault():a.returnValue=!1}}),this.cfg.behaviors&&PrimeFaces.attachBehaviors(this.input,this.cfg.behaviors));this.input.data(PrimeFaces.CLIENT_ID_DATA,this.id)},toggle:function(a){if(!this.disabled){var b=parseInt(this.input.val());a=this.fixedMod(b+a,3);this.input.val(a);0==a?this.box.removeClass("ui-state-active"):this.box.addClass("ui-state-active");var c=this.box.data("iconstates");this.icon.removeClass(c[b]).addClass(c[a]);
b=this.box.data("titlestates");null!=b&&0<b.length&&this.box.attr("title",b[a]);this.input.change()}}});PrimeFacesExt.widget.TriStateManyCheckbox=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.outputs=this.jq.find(".ui-chkbox-box:not(.ui-state-disabled)");this.inputs=this.jq.find(":text:not(:disabled)");this.labels=this.jq.find("label:not(.ui-state-disabled)");this.fixedMod=function(a,b){return(a%b+b)%b};var b=this;this.outputs.mouseover(function(){$(this).addClass("ui-state-hover")}).mouseout(function(){$(this).removeClass("ui-state-hover")}).click(function(a){b.toggle($(this),
1);a.preventDefault?a.preventDefault():a.returnValue=!1});this.labels.click(function(a){var b=$(this);$(PrimeFaces.escapeClientId(b.attr("for"))).parent().next().click();a.preventDefault?a.preventDefault():a.returnValue=!1});this.outputs.bind("keydown",function(a){switch(a.keyCode){case 38:b.toggle($(this),1);a.preventDefault?a.preventDefault():a.returnValue=!1;break;case 40:b.toggle($(this),-1);a.preventDefault?a.preventDefault():a.returnValue=!1;break;case 39:b.toggle($(this),1);a.preventDefault?
a.preventDefault():a.returnValue=!1;break;case 37:b.toggle($(this),-1);a.preventDefault?a.preventDefault():a.returnValue=!1;break;case 32:b.toggle($(this),1),a.preventDefault?a.preventDefault():a.returnValue=!1}});this.cfg.behaviors&&PrimeFaces.attachBehaviors(this.inputs,this.cfg.behaviors);this.inputs.data(PrimeFaces.CLIENT_ID_DATA,this.id)},toggle:function(a,b){var c=a.prev().find(":input");if(!a.hasClass("ui-state-disabled")){var d=parseInt(c.val()),e=this.fixedMod(d+b,3);c.val(e);0==e?a.removeClass("ui-state-active"):
a.addClass("ui-state-active");var f=a.data("iconstates");a.children().removeClass(f[d]).addClass(f[e]);d=a.data("titlestates");null!=d&&0<d.length&&a.attr("title",d[e]);c.change()}}});PrimeFacesExt.widget.GChart=PrimeFaces.widget.BaseWidget.extend({init:function(a){var b=this;this._super(a);this.chart=a.chart?JSON.parse(a.chart):{data:[],options:{},type:""};this.data=this.chart.data;this.type=this.chart.type;this.height=a.height;this.width=a.width;this.title=a.title;this.options=this.chart.options;this.input=jQuery(this.jqId+"_hidden");google.load("visualization","1.0",{packages:[PrimeFacesExt.widget.GChart.packages[this.type]||"corechart"]});jQuery(document).ready(function(){google.visualization?
b.draw():google.setOnLoadCallback(function(){b.draw()})})},draw:function(){var a=google.visualization.arrayToDataTable(this.data),b=this;this.options.title=this.title;this.options.width=parseInt(this.width,10);this.options.height=parseInt(this.height,10);this.wrapper=new google.visualization.ChartWrapper({chartType:this.type,dataTable:a,options:this.options,containerId:this.id});this.cfg.behaviors&&this.cfg.behaviors.select&&google.visualization.events.addListener(this.wrapper,"select",function(a){console.log(b.wrapper.getChart().getSelection());
jQuery(b.jqId+"_hidden").val(JSON.stringify(b.wrapper.getChart().getSelection()));b.cfg.behaviors.select.call(jQuery(b.jqId+"_hidden"))});this.wrapper.draw()}});PrimeFacesExt.widget.GChart.packages={GeoChart:"geochart",OrgChart:"orgchart"};