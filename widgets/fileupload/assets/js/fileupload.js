!function(e){"use strict";var t=function(e,i,a){var o,r,n=document.createElement("img");if(n.onerror=i,n.onload=function(){!r||a&&a.noRevoke||t.revokeObjectURL(r),i&&i(t.scale(n,a))},t.isInstanceOf("Blob",e)||t.isInstanceOf("File",e))o=r=t.createObjectURL(e),n._type=e.type;else{if("string"!=typeof e)return!1;o=e,a&&a.crossOrigin&&(n.crossOrigin=a.crossOrigin)}return o?(n.src=o,n):t.readFile(e,function(e){var t=e.target;t&&t.result?n.src=t.result:i&&i(e)})},i=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;t.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},t.transformCoordinates=function(){},t.getTransformedOptions=function(e,t){var i,a,o,r,n=t.aspectRatio;if(!n)return t;i={};for(a in t)t.hasOwnProperty(a)&&(i[a]=t[a]);return i.crop=!0,o=e.naturalWidth||e.width,r=e.naturalHeight||e.height,o/r>n?(i.maxWidth=r*n,i.maxHeight=r):(i.maxWidth=o,i.maxHeight=o/n),i},t.renderImageToCanvas=function(e,t,i,a,o,r,n,s,l,d){return e.getContext("2d").drawImage(t,i,a,o,r,n,s,l,d),e},t.hasCanvasOption=function(e){return e.canvas||e.crop||!!e.aspectRatio},t.scale=function(e,i){function a(){var e=Math.max((s||y)/y,(l||v)/v);e>1&&(y*=e,v*=e)}function o(){var e=Math.min((r||y)/y,(n||v)/v);1>e&&(y*=e,v*=e)}i=i||{};var r,n,s,l,d,u,c,g,f,h,m,p=document.createElement("canvas"),S=e.getContext||t.hasCanvasOption(i)&&p.getContext,b=e.naturalWidth||e.width,x=e.naturalHeight||e.height,y=b,v=x;if(S&&(i=t.getTransformedOptions(e,i),c=i.left||0,g=i.top||0,i.sourceWidth?(d=i.sourceWidth,void 0!==i.right&&void 0===i.left&&(c=b-d-i.right)):d=b-c-(i.right||0),i.sourceHeight?(u=i.sourceHeight,void 0!==i.bottom&&void 0===i.top&&(g=x-u-i.bottom)):u=x-g-(i.bottom||0),y=d,v=u),r=i.maxWidth,n=i.maxHeight,s=i.minWidth,l=i.minHeight,S&&r&&n&&i.crop?(y=r,v=n,m=d/u-r/n,0>m?(u=n*d/r,void 0===i.top&&void 0===i.bottom&&(g=(x-u)/2)):m>0&&(d=r*u/n,void 0===i.left&&void 0===i.right&&(c=(b-d)/2))):((i.contain||i.cover)&&(s=r=r||s,l=n=n||l),i.cover?(o(),a()):(a(),o())),S){if(f=i.pixelRatio,f>1&&(p.style.width=y+"px",p.style.height=v+"px",y*=f,v*=f,p.getContext("2d").scale(f,f)),h=i.downsamplingRatio,h>0&&1>h&&d>y&&u>v)for(;d*h>y;)p.width=d*h,p.height=u*h,t.renderImageToCanvas(p,e,c,g,d,u,0,0,p.width,p.height),d=p.width,u=p.height,e=document.createElement("canvas"),e.width=d,e.height=u,t.renderImageToCanvas(e,p,0,0,d,u,0,0,d,u);return p.width=y,p.height=v,t.transformCoordinates(p,i),t.renderImageToCanvas(p,e,c,g,d,u,0,0,y,v)}return e.width=y,e.height=v,e},t.createObjectURL=function(e){return i?i.createObjectURL(e):!1},t.revokeObjectURL=function(e){return i?i.revokeObjectURL(e):!1},t.readFile=function(e,t,i){if(window.FileReader){var a=new FileReader;if(a.onload=a.onerror=t,i=i||"readAsDataURL",a[i])return a[i](e),a}return!1},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:e.loadImage=t}(window),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image"],e):e("object"==typeof module&&module.exports?require("./load-image"):window.loadImage)}(function(e){"use strict";var t=e.hasCanvasOption,i=e.transformCoordinates,a=e.getTransformedOptions;e.hasCanvasOption=function(i){return!!i.orientation||t.call(e,i)},e.transformCoordinates=function(t,a){i.call(e,t,a);var o=t.getContext("2d"),r=t.width,n=t.height,s=t.style.width,l=t.style.height,d=a.orientation;if(d&&!(d>8))switch(d>4&&(t.width=n,t.height=r,t.style.width=l,t.style.height=s),d){case 2:o.translate(r,0),o.scale(-1,1);break;case 3:o.translate(r,n),o.rotate(Math.PI);break;case 4:o.translate(0,n),o.scale(1,-1);break;case 5:o.rotate(.5*Math.PI),o.scale(1,-1);break;case 6:o.rotate(.5*Math.PI),o.translate(0,-n);break;case 7:o.rotate(.5*Math.PI),o.translate(r,-n),o.scale(-1,1);break;case 8:o.rotate(-.5*Math.PI),o.translate(-r,0)}},e.getTransformedOptions=function(t,i){var o,r,n=a.call(e,t,i),s=n.orientation;if(!s||s>8||1===s)return n;o={};for(r in n)n.hasOwnProperty(r)&&(o[r]=n[r]);switch(n.orientation){case 2:o.left=n.right,o.right=n.left;break;case 3:o.left=n.right,o.top=n.bottom,o.right=n.left,o.bottom=n.top;break;case 4:o.top=n.bottom,o.bottom=n.top;break;case 5:o.left=n.top,o.top=n.left,o.right=n.bottom,o.bottom=n.right;break;case 6:o.left=n.top,o.top=n.right,o.right=n.bottom,o.bottom=n.left;break;case 7:o.left=n.bottom,o.top=n.right,o.right=n.top,o.bottom=n.left;break;case 8:o.left=n.bottom,o.top=n.left,o.right=n.top,o.bottom=n.right}return n.orientation>4&&(o.maxWidth=n.maxHeight,o.maxHeight=n.maxWidth,o.minWidth=n.minHeight,o.minHeight=n.minWidth,o.sourceWidth=n.sourceHeight,o.sourceHeight=n.sourceWidth),o}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image"],e):e("object"==typeof module&&module.exports?require("./load-image"):window.loadImage)}(function(e){"use strict";var t=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);e.blobSlice=t&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},e.metaDataParsers={jpeg:{65505:[]}},e.parseMetaData=function(t,i,a){a=a||{};var o=this,r=a.maxMetaDataSize||262144,n={},s=!(window.DataView&&t&&t.size>=12&&"image/jpeg"===t.type&&e.blobSlice);(s||!e.readFile(e.blobSlice.call(t,0,r),function(t){if(t.target.error)return console.log(t.target.error),void i(n);var r,s,l,d,u=t.target.result,c=new DataView(u),g=2,f=c.byteLength-4,h=g;if(65496===c.getUint16(0)){for(;f>g&&(r=c.getUint16(g),r>=65504&&65519>=r||65534===r);){if(s=c.getUint16(g+2)+2,g+s>c.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(l=e.metaDataParsers.jpeg[r])for(d=0;d<l.length;d+=1)l[d].call(o,c,g,s,n,a);g+=s,h=g}!a.disableImageHead&&h>6&&(u.slice?n.imageHead=u.slice(0,h):n.imageHead=new Uint8Array(u).subarray(0,h))}else console.log("Invalid JPEG file: Missing JPEG marker.");i(n)},"readAsArrayBuffer"))&&i(n)}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(e){"use strict";e.ExifMap=function(){return this},e.ExifMap.prototype.map={Orientation:274},e.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},e.getExifThumbnail=function(e,t,i){var a,o,r;if(!i||t+i>e.byteLength)return void console.log("Invalid Exif data: Invalid thumbnail data.");for(a=[],o=0;i>o;o+=1)r=e.getUint8(t+o),a.push((16>r?"0":"")+r.toString(16));return"data:image/jpeg,%"+a.join("%")},e.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},e.exifTagTypes[7]=e.exifTagTypes[1],e.getExifValue=function(t,i,a,o,r,n){var s,l,d,u,c,g,f=e.exifTagTypes[o];if(!f)return void console.log("Invalid Exif data: Invalid tag type.");if(s=f.size*r,l=s>4?i+t.getUint32(a+8,n):a+8,l+s>t.byteLength)return void console.log("Invalid Exif data: Invalid data offset.");if(1===r)return f.getValue(t,l,n);for(d=[],u=0;r>u;u+=1)d[u]=f.getValue(t,l+u*f.size,n);if(f.ascii){for(c="",u=0;u<d.length&&(g=d[u],"\x00"!==g);u+=1)c+=g;return c}return d},e.parseExifTag=function(t,i,a,o,r){var n=t.getUint16(a,o);r.exif[n]=e.getExifValue(t,i,a,t.getUint16(a+2,o),t.getUint32(a+4,o),o)},e.parseExifTags=function(e,t,i,a,o){var r,n,s;if(i+6>e.byteLength)return void console.log("Invalid Exif data: Invalid directory offset.");if(r=e.getUint16(i,a),n=i+2+12*r,n+4>e.byteLength)return void console.log("Invalid Exif data: Invalid directory size.");for(s=0;r>s;s+=1)this.parseExifTag(e,t,i+2+12*s,a,o);return e.getUint32(n,a)},e.parseExifData=function(t,i,a,o,r){if(!r.disableExif){var n,s,l,d=i+10;if(1165519206===t.getUint32(i+4)){if(d+8>t.byteLength)return void console.log("Invalid Exif data: Invalid segment size.");if(0!==t.getUint16(i+8))return void console.log("Invalid Exif data: Missing byte alignment offset.");switch(t.getUint16(d)){case 18761:n=!0;break;case 19789:n=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}if(42!==t.getUint16(d+2,n))return void console.log("Invalid Exif data: Missing TIFF marker.");s=t.getUint32(d+4,n),o.exif=new e.ExifMap,s=e.parseExifTags(t,d,d+s,n,o),s&&!r.disableExifThumbnail&&(l={exif:{}},s=e.parseExifTags(t,d,d+s,n,l),l.exif[513]&&(o.exif.Thumbnail=e.getExifThumbnail(t,d+l.exif[513],l.exif[514]))),o.exif[34665]&&!r.disableExifSub&&e.parseExifTags(t,d,d+o.exif[34665],n,o),o.exif[34853]&&!r.disableExifGps&&e.parseExifTags(t,d,d+o.exif[34853],n,o)}}},e.metaDataParsers.jpeg[65505].push(e.parseExifData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-exif"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-exif")):e(window.loadImage)}(function(e){"use strict";e.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},e.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},e.ExifMap.prototype.getText=function(e){var t=this.get(e);switch(e){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[e][t];case"ExifVersion":case"FlashpixVersion":return String.fromCharCode(t[0],t[1],t[2],t[3]);case"ComponentsConfiguration":return this.stringValues[e][t[0]]+this.stringValues[e][t[1]]+this.stringValues[e][t[2]]+this.stringValues[e][t[3]];case"GPSVersionID":return t[0]+"."+t[1]+"."+t[2]+"."+t[3]}return String(t)},function(e){var t,i=e.tags,a=e.map;for(t in i)i.hasOwnProperty(t)&&(a[i[t]]=t)}(e.ExifMap.prototype),e.ExifMap.prototype.getAll=function(){var e,t,i={};for(e in this)this.hasOwnProperty(e)&&(t=this.tags[e],t&&(i[t]=this.getText(t)));return i}});
//# sourceMappingURL=load-image.all.min.js.map
!function(t){"use strict";var e=t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype,o=t.Blob&&function(){try{return Boolean(new Blob)}catch(t){return!1}}(),n=o&&t.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(t){return!1}}(),r=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||t.MSBlobBuilder,a=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,i=(o||r)&&t.atob&&t.ArrayBuffer&&t.Uint8Array&&function(t){var e,i,l,u,b,c,d,B,f;if(e=t.match(a),!e)throw new Error("invalid data URI");for(i=e[2]?e[1]:"text/plain"+(e[3]||";charset=US-ASCII"),l=!!e[4],u=t.slice(e[0].length),b=l?atob(u):decodeURIComponent(u),c=new ArrayBuffer(b.length),d=new Uint8Array(c),B=0;B<b.length;B+=1)d[B]=b.charCodeAt(B);return o?new Blob([n?d:c],{type:i}):(f=new r,f.append(c),f.getBlob(i))};t.HTMLCanvasElement&&!e.toBlob&&(e.mozGetAsFile?e.toBlob=function(t,o,n){t(n&&e.toDataURL&&i?i(this.toDataURL(o,n)):this.mozGetAsFile("blob",o))}:e.toDataURL&&i&&(e.toBlob=function(t,e,o){t(i(this.toDataURL(e,o)))})),"function"==typeof define&&define.amd?define(function(){return i}):"object"==typeof module&&module.exports?module.exports=i:t.dataURLtoBlob=i}(window);
//# sourceMappingURL=canvas-to-blob.min.js.map
!function(e){"use strict";var n=function(e,t){var r=/[^\w\-\.:]/.test(e)?new Function(n.arg+",tmpl","var _e=tmpl.encode"+n.helper+",_s='"+e.replace(n.regexp,n.func)+"';return _s;"):n.cache[e]=n.cache[e]||n(n.load(e));return t?r(t,n):function(e){return r(e,n)}};n.cache={},n.load=function(e){return document.getElementById(e).innerHTML},n.regexp=/([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,n.func=function(e,n,t,r,c,u){return n?{"\n":"\\n","\r":"\\r","	":"\\t"," ":" "}[n]||"\\"+n:t?"="===t?"'+_e("+r+")+'":"'+("+r+"==null?'':"+r+")+'":c?"';":u?"_s+='":void 0},n.encReg=/[<>&"'\x00]/g,n.encMap={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"},n.encode=function(e){return(null==e?"":""+e).replace(n.encReg,function(e){return n.encMap[e]||""})},n.arg="o",n.helper=",print=function(s,e){_s+=e?(s==null?'':s):_e(s);},include=function(s,d){_s+=tmpl(s,d);}","function"==typeof define&&define.amd?define(function(){return n}):"object"==typeof module&&module.exports?module.exports=n:e.tmpl=n}(this);
//# sourceMappingURL=tmpl.min.js.map
/*! jQuery UI - v1.11.4+CommonJS - 2015-08-28
* http://jqueryui.com
* Includes: widget.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );

	} else if ( typeof exports === "object" ) {

		// Node/CommonJS
		factory( require( "jquery" ) );

	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat(args) );
			}

			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;



}));

/*
 * jQuery Iframe Transport Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts four additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    // options.initialIframeSrc: the URL of the initial iframe src,
    //  by default set to "javascript:false;"
    $.ajaxTransport('iframe', function (options) {
        if (options.async) {
            // javascript:false as initial iframe src
            // prevents warning popups on HTTPS in IE6:
            /*jshint scripturl: true */
            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',
            /*jshint scripturl: false */
                form,
                iframe,
                addParamChar;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    addParamChar = /\?/.test(options.url) ? '&' : '?';
                    // XDomainRequest only supports GET and POST:
                    if (options.type === 'DELETE') {
                        options.url = options.url + addParamChar + '_method=DELETE';
                        options.type = 'POST';
                    } else if (options.type === 'PUT') {
                        options.url = options.url + addParamChar + '_method=PUT';
                        options.type = 'POST';
                    } else if (options.type === 'PATCH') {
                        options.url = options.url + addParamChar + '_method=PATCH';
                        options.type = 'POST';
                    }
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    counter += 1;
                    iframe = $(
                        '<iframe src="' + initialIframeSrc +
                            '" name="iframe-transport-' + counter + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="' + initialIframeSrc + '"></iframe>')
                                    .appendTo(form);
                                window.setTimeout(function () {
                                    // Removing the form in a setTimeout call
                                    // allows Chrome's developer tools to display
                                    // the response result
                                    form.remove();
                                }, 0);
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                            // Remove the HTML5 form attribute from the input(s):
                            options.fileInput.removeAttr('form');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                // Restore the original name and form properties:
                                $(input)
                                    .prop('name', clone.prop('name'))
                                    .attr('form', clone.attr('form'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', initialIframeSrc);
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, xml
    // and script.
    // Please note that the Content-Type for JSON responses has to be text/plain
    // or text/html, if the browser doesn't include application/json in the
    // Accept header, else IE will show a download dialog.
    // The Content-Type for XML responses on the other hand has to be always
    // application/xml or text/xml, so IE properly parses the XML response.
    // See also
    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return iframe && $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return iframe && $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return iframe && $(iframe[0].body).html();
            },
            'iframe xml': function (iframe) {
                var xmlDoc = iframe && iframe[0];
                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc :
                        $.parseXML((xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml) ||
                            $(xmlDoc.body).html());
            },
            'iframe script': function (iframe) {
                return iframe && $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));

/*
 * jQuery File Upload Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document, location, Blob, FormData */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('./vendor/jquery.ui.widget')
        );
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        type,
                        $.Event(type, {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).pipe(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (!filesLength) {
                return false;
            }
            if (limitSize && files[0].size === undefined) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (data) {
            var input = data.fileInput,
                inputClone = input.clone(true),
                restoreFocus = input.is(document.activeElement);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // If the fileInput had focus before it was detached,
            // restore focus to the inputClone.
            if (restoreFocus) {
                inputClone.focus();
            }
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                successHandler = function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                },
                dirReader, entries = [];
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                data = this.element.data();
            // Initialize options set via HTML5 data-attributes:
            $.each(
                this.element[0].attributes,
                function (index, attr) {
                    var key = attr.name.toLowerCase(),
                        value;
                    if (/^data-/.test(key)) {
                        // Convert hyphen-ated key to camelCase:
                        key = key.slice(5).replace(/-[a-z]/g, function (str) {
                            return str.charAt(1).toUpperCase();
                        });
                        value = data[key];
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));

/*
 * jQuery File Upload Processing Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    var originalAdd = $.blueimp.fileupload.prototype.options.add;

    // The File Upload Processing plugin extends the fileupload widget
    // with file processing functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The list of processing actions:
            processQueue: [
                /*
                {
                    action: 'log',
                    type: 'debug'
                }
                */
            ],
            add: function (e, data) {
                var $this = $(this);
                data.process(function () {
                    return $this.fileupload('process', data);
                });
                originalAdd.call(this, e, data);
            }
        },

        processActions: {
            /*
            log: function (data, options) {
                console[options.type](
                    'Processing "' + data.files[data.index].name + '"'
                );
            }
            */
        },

        _processFile: function (data, originalData) {
            var that = this,
                dfd = $.Deferred().resolveWith(that, [data]),
                chain = dfd.promise();
            this._trigger('process', null, data);
            $.each(data.processQueue, function (i, settings) {
                var func = function (data) {
                    if (originalData.errorThrown) {
                        return $.Deferred()
                                .rejectWith(that, [originalData]).promise();
                    }
                    return that.processActions[settings.action].call(
                        that,
                        data,
                        settings
                    );
                };
                chain = chain.pipe(func, settings.always && func);
            });
            chain
                .done(function () {
                    that._trigger('processdone', null, data);
                    that._trigger('processalways', null, data);
                })
                .fail(function () {
                    that._trigger('processfail', null, data);
                    that._trigger('processalways', null, data);
                });
            return chain;
        },

        // Replaces the settings of each processQueue item that
        // are strings starting with an "@", using the remaining
        // substring as key for the option map,
        // e.g. "@autoUpload" is replaced with options.autoUpload:
        _transformProcessQueue: function (options) {
            var processQueue = [];
            $.each(options.processQueue, function () {
                var settings = {},
                    action = this.action,
                    prefix = this.prefix === true ? action : this.prefix;
                $.each(this, function (key, value) {
                    if ($.type(value) === 'string' &&
                            value.charAt(0) === '@') {
                        settings[key] = options[
                            value.slice(1) || (prefix ? prefix +
                                key.charAt(0).toUpperCase() + key.slice(1) : key)
                        ];
                    } else {
                        settings[key] = value;
                    }

                });
                processQueue.push(settings);
            });
            options.processQueue = processQueue;
        },

        // Returns the number of files currently in the processsing queue:
        processing: function () {
            return this._processing;
        },

        // Processes the files given as files property of the data parameter,
        // returns a Promise object that allows to bind callbacks:
        process: function (data) {
            var that = this,
                options = $.extend({}, this.options, data);
            if (options.processQueue && options.processQueue.length) {
                this._transformProcessQueue(options);
                if (this._processing === 0) {
                    this._trigger('processstart');
                }
                $.each(data.files, function (index) {
                    var opts = index ? $.extend({}, options) : options,
                        func = function () {
                            if (data.errorThrown) {
                                return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                            }
                            return that._processFile(opts, data);
                        };
                    opts.index = index;
                    that._processing += 1;
                    that._processingQueue = that._processingQueue.pipe(func, func)
                        .always(function () {
                            that._processing -= 1;
                            if (that._processing === 0) {
                                that._trigger('processstop');
                            }
                        });
                });
            }
            return this._processingQueue;
        },

        _create: function () {
            this._super();
            this._processing = 0;
            this._processingQueue = $.Deferred().resolveWith(this)
                .promise();
        }

    });

}));

/*
 * jQuery File Upload Image Preview & Resize Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, Blob */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            'load-image-meta',
            'load-image-exif',
            'canvas-to-blob',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('blueimp-load-image/js/load-image'),
            require('blueimp-load-image/js/load-image-meta'),
            require('blueimp-load-image/js/load-image-exif'),
            require('blueimp-canvas-to-blob'),
            require('./jquery.fileupload-process')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadImageMetaData',
            disableImageHead: '@',
            disableExif: '@',
            disableExifThumbnail: '@',
            disableExifSub: '@',
            disableExifGps: '@',
            disabled: '@disableImageMetaDataLoad'
        },
        {
            action: 'loadImage',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            noRevoke: '@',
            disabled: '@disableImageLoad'
        },
        {
            action: 'resizeImage',
            // Use "image" as prefix for the "@" options:
            prefix: 'image',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            forceResize: '@',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImage',
            quality: '@imageQuality',
            type: '@imageType',
            disabled: '@disableImageResize'
        },
        {
            action: 'saveImageMetaData',
            disabled: '@disableImageMetaDataSave'
        },
        {
            action: 'resizeImage',
            // Use "preview" as prefix for the "@" options:
            prefix: 'preview',
            maxWidth: '@',
            maxHeight: '@',
            minWidth: '@',
            minHeight: '@',
            crop: '@',
            orientation: '@',
            thumbnail: '@',
            canvas: '@',
            disabled: '@disableImagePreview'
        },
        {
            action: 'setImage',
            name: '@imagePreviewName',
            disabled: '@disableImagePreview'
        },
        {
            action: 'deleteImageReferences',
            disabled: '@disableImageReferencesDeletion'
        }
    );

    // The File Upload Resize plugin extends the fileupload widget
    // with image resize functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression for the types of images to load:
            // matched against the file type:
            loadImageFileTypes: /^image\/(gif|jpeg|png|svg\+xml)$/,
            // The maximum file size of images to load:
            loadImageMaxFileSize: 10000000, // 10MB
            // The maximum width of resized images:
            imageMaxWidth: 1920,
            // The maximum height of resized images:
            imageMaxHeight: 1080,
            // Defines the image orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            imageOrientation: false,
            // Define if resized images should be cropped or only scaled:
            imageCrop: false,
            // Disable the resize image functionality by default:
            disableImageResize: true,
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // Defines the preview orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            previewOrientation: true,
            // Create the preview using the Exif data thumbnail:
            previewThumbnail: true,
            // Define if preview images should be cropped or only scaled:
            previewCrop: false,
            // Define if preview images should be resized as canvas elements:
            previewCanvas: true
        },

        processActions: {

            // Loads the image given via data.files and data.index
            // as img element, if the browser supports the File API.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadImage: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (($.type(options.maxFileSize) === 'number' &&
                            file.size > options.maxFileSize) ||
                        (options.fileTypes &&
                            !options.fileTypes.test(file.type)) ||
                        !loadImage(
                            file,
                            function (img) {
                                if (img.src) {
                                    data.img = img;
                                }
                                dfd.resolveWith(that, [data]);
                            },
                            options
                        )) {
                    return data;
                }
                return dfd.promise();
            },

            // Resizes the image given as data.canvas or data.img
            // and updates data.canvas or data.img with the resized image.
            // Also stores the resized image as preview property.
            // Accepts the options maxWidth, maxHeight, minWidth,
            // minHeight, canvas and crop:
            resizeImage: function (data, options) {
                if (options.disabled || !(data.canvas || data.img)) {
                    return data;
                }
                options = $.extend({canvas: true}, options);
                var that = this,
                    dfd = $.Deferred(),
                    img = (options.canvas && data.canvas) || data.img,
                    resolve = function (newImg) {
                        if (newImg && (newImg.width !== img.width ||
                                newImg.height !== img.height ||
                                options.forceResize)) {
                            data[newImg.getContext ? 'canvas' : 'img'] = newImg;
                        }
                        data.preview = newImg;
                        dfd.resolveWith(that, [data]);
                    },
                    thumbnail;
                if (data.exif) {
                    if (options.orientation === true) {
                        options.orientation = data.exif.get('Orientation');
                    }
                    if (options.thumbnail) {
                        thumbnail = data.exif.get('Thumbnail');
                        if (thumbnail) {
                            loadImage(thumbnail, resolve, options);
                            return dfd.promise();
                        }
                    }
                    // Prevent orienting the same image twice:
                    if (data.orientation) {
                        delete options.orientation;
                    } else {
                        data.orientation = options.orientation;
                    }
                }
                if (img) {
                    resolve(loadImage.scale(img, options));
                    return dfd.promise();
                }
                return data;
            },

            // Saves the processed image given as data.canvas
            // inplace at data.index of data.files:
            saveImage: function (data, options) {
                if (!data.canvas || options.disabled) {
                    return data;
                }
                var that = this,
                    file = data.files[data.index],
                    dfd = $.Deferred();
                if (data.canvas.toBlob) {
                    data.canvas.toBlob(
                        function (blob) {
                            if (!blob.name) {
                                if (file.type === blob.type) {
                                    blob.name = file.name;
                                } else if (file.name) {
                                    blob.name = file.name.replace(
                                        /\.\w+$/,
                                        '.' + blob.type.substr(6)
                                    );
                                }
                            }
                            // Don't restore invalid meta data:
                            if (file.type !== blob.type) {
                                delete data.imageHead;
                            }
                            // Store the created blob at the position
                            // of the original file in the files list:
                            data.files[data.index] = blob;
                            dfd.resolveWith(that, [data]);
                        },
                        options.type || file.type,
                        options.quality
                    );
                } else {
                    return data;
                }
                return dfd.promise();
            },

            loadImageMetaData: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var that = this,
                    dfd = $.Deferred();
                loadImage.parseMetaData(data.files[data.index], function (result) {
                    $.extend(data, result);
                    dfd.resolveWith(that, [data]);
                }, options);
                return dfd.promise();
            },

            saveImageMetaData: function (data, options) {
                if (!(data.imageHead && data.canvas &&
                        data.canvas.toBlob && !options.disabled)) {
                    return data;
                }
                var file = data.files[data.index],
                    blob = new Blob([
                        data.imageHead,
                        // Resized images always have a head size of 20 bytes,
                        // including the JPEG marker and a minimal JFIF header:
                        this._blobSlice.call(file, 20)
                    ], {type: file.type});
                blob.name = file.name;
                data.files[data.index] = blob;
                return data;
            },

            // Sets the resized version of the image as a property of the
            // file object, must be called after "saveImage":
            setImage: function (data, options) {
                if (data.preview && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.preview;
                }
                return data;
            },

            deleteImageReferences: function (data, options) {
                if (!options.disabled) {
                    delete data.img;
                    delete data.canvas;
                    delete data.preview;
                    delete data.imageHead;
                }
                return data;
            }

        }

    });

}));

/*
 * jQuery File Upload Audio Preview Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('load-image')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadAudio',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            disabled: '@disableAudioPreview'
        },
        {
            action: 'setAudio',
            name: '@audioPreviewName',
            disabled: '@disableAudioPreview'
        }
    );

    // The File Upload Audio Preview plugin extends the fileupload widget
    // with audio preview functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression for the types of audio files to load,
            // matched against the file type:
            loadAudioFileTypes: /^audio\/.*$/
        },

        _audioElement: document.createElement('audio'),

        processActions: {

            // Loads the audio file given via data.files and data.index
            // as audio element if the browser supports playing it.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadAudio: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var file = data.files[data.index],
                    url,
                    audio;
                if (this._audioElement.canPlayType &&
                        this._audioElement.canPlayType(file.type) &&
                        ($.type(options.maxFileSize) !== 'number' ||
                            file.size <= options.maxFileSize) &&
                        (!options.fileTypes ||
                            options.fileTypes.test(file.type))) {
                    url = loadImage.createObjectURL(file);
                    if (url) {
                        audio = this._audioElement.cloneNode(false);
                        audio.src = url;
                        audio.controls = true;
                        data.audio = audio;
                        return data;
                    }
                }
                return data;
            },

            // Sets the audio element as a property of the file object:
            setAudio: function (data, options) {
                if (data.audio && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.audio;
                }
                return data;
            }

        }

    });

}));

/*
 * jQuery File Upload Video Preview Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'load-image',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('load-image')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.loadImage
        );
    }
}(function ($, loadImage) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'loadVideo',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            disabled: '@disableVideoPreview'
        },
        {
            action: 'setVideo',
            name: '@videoPreviewName',
            disabled: '@disableVideoPreview'
        }
    );

    // The File Upload Video Preview plugin extends the fileupload widget
    // with video preview functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // The regular expression for the types of video files to load,
            // matched against the file type:
            loadVideoFileTypes: /^video\/.*$/
        },

        _videoElement: document.createElement('video'),

        processActions: {

            // Loads the video file given via data.files and data.index
            // as video element if the browser supports playing it.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadVideo: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var file = data.files[data.index],
                    url,
                    video;
                if (this._videoElement.canPlayType &&
                        this._videoElement.canPlayType(file.type) &&
                        ($.type(options.maxFileSize) !== 'number' ||
                            file.size <= options.maxFileSize) &&
                        (!options.fileTypes ||
                            options.fileTypes.test(file.type))) {
                    url = loadImage.createObjectURL(file);
                    if (url) {
                        video = this._videoElement.cloneNode(false);
                        video.src = url;
                        video.controls = true;
                        data.video = video;
                        return data;
                    }
                }
                return data;
            },

            // Sets the video element as a property of the file object:
            setVideo: function (data, options) {
                if (data.video && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.video;
                }
                return data;
            }

        }

    });

}));

/*
 * jQuery File Upload Validation Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, require, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {
    'use strict';

    // Append to the default processQueue:
    $.blueimp.fileupload.prototype.options.processQueue.push(
        {
            action: 'validate',
            // Always trigger this action,
            // even if the previous action was rejected:
            always: true,
            // Options taken from the global options map:
            acceptFileTypes: '@',
            maxFileSize: '@',
            minFileSize: '@',
            maxNumberOfFiles: '@',
            disabled: '@disableValidation'
        }
    );

    // The File Upload Validation plugin extends the fileupload widget
    // with file validation functionality:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            /*
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            // The maximum allowed file size in bytes:
            maxFileSize: 10000000, // 10 MB
            // The minimum allowed file size in bytes:
            minFileSize: undefined, // No minimal file size
            // The limit of files to be uploaded:
            maxNumberOfFiles: 10,
            */

            // Function returning the current number of files,
            // has to be overriden for maxNumberOfFiles validation:
            getNumberOfFiles: $.noop,

            // Error and info messages:
            messages: {
                maxNumberOfFiles: 'Maximum number of files exceeded',
                acceptFileTypes: 'File type not allowed',
                maxFileSize: 'File is too large',
                minFileSize: 'File is too small'
            }
        },

        processActions: {

            validate: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var dfd = $.Deferred(),
                    settings = this.options,
                    file = data.files[data.index],
                    fileSize;
                if (options.minFileSize || options.maxFileSize) {
                    fileSize = file.size;
                }
                if ($.type(options.maxNumberOfFiles) === 'number' &&
                        (settings.getNumberOfFiles() || 0) + data.files.length >
                            options.maxNumberOfFiles) {
                    file.error = settings.i18n('maxNumberOfFiles');
                } else if (options.acceptFileTypes &&
                        !(options.acceptFileTypes.test(file.type) ||
                        options.acceptFileTypes.test(file.name))) {
                    file.error = settings.i18n('acceptFileTypes');
                } else if (fileSize > options.maxFileSize) {
                    file.error = settings.i18n('maxFileSize');
                } else if ($.type(fileSize) === 'number' &&
                        fileSize < options.minFileSize) {
                    file.error = settings.i18n('minFileSize');
                } else {
                    delete file.error;
                }
                if (file.error || data.files.error) {
                    data.files.error = true;
                    dfd.rejectWith(this, [data]);
                } else {
                    dfd.resolveWith(this, [data]);
                }
                return dfd.promise();
            }

        }

    });

}));

/*
 * jQuery File Upload User Interface Plugin
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, require, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            './jquery.fileupload-image',
            './jquery.fileupload-audio',
            './jquery.fileupload-video',
            './jquery.fileupload-validate'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(
            require('jquery'),
            require('tmpl')
        );
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl
        );
    }
}(function ($, tmpl) {
    'use strict';

    $.blueimp.fileupload.prototype._specialOptions.push(
        'filesContainer',
        'uploadTemplateId',
        'downloadTemplateId'
    );

    // The UI version extends the file upload widget
    // and adds complete user interface interaction:
    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            // By default, files added to the widget are uploaded as soon
            // as the user clicks on the start buttons. To enable automatic
            // uploads, set the following option to true:
            autoUpload: false,
            // The ID of the upload template:
            uploadTemplateId: 'template-upload',
            // The ID of the download template:
            downloadTemplateId: 'template-download',
            // The container for the list of files. If undefined, it is set to
            // an element with class "files" inside of the widget element:
            filesContainer: undefined,
            // By default, files are appended to the files container.
            // Set the following option to true, to prepend files instead:
            prependFiles: false,
            // The expected data type of the upload response, sets the dataType
            // option of the $.ajax upload requests:
            dataType: 'json',

            // Error and info messages:
            messages: {
                unknownError: 'Unknown error'
            },

            // Function returning the current number of files,
            // used by the maxNumberOfFiles validation:
            getNumberOfFiles: function () {
                return this.filesContainer.children()
                    .not('.processing').length;
            },

            // Callback to retrieve the list of files from the server response:
            getFilesFromResponse: function (data) {
                if (data.result && $.isArray(data.result.files)) {
                    return data.result.files;
                }
                return [];
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var $this = $(this),
                    that = $this.data('blueimp-fileupload') ||
                        $this.data('fileupload'),
                    options = that.options;
                data.context = that._renderUpload(data.files)
                    .data('data', data)
                    .addClass('processing');
                options.filesContainer[
                    options.prependFiles ? 'prepend' : 'append'
                ](data.context);
                that._forceReflow(data.context);
                that._transition(data.context);
                data.process(function () {
                    return $this.fileupload('process', data);
                }).always(function () {
                    data.context.each(function (index) {
                        $(this).find('.size').text(
                            that._formatFileSize(data.files[index].size)
                        );
                    }).removeClass('processing');
                    that._renderPreviews(data);
                }).done(function () {
                    data.context.find('.start').prop('disabled', false);
                    if ((that._trigger('added', e, data) !== false) &&
                            (options.autoUpload || data.autoUpload) &&
                            data.autoUpload !== false) {
                        data.submit();
                    }
                }).fail(function () {
                    if (data.files.error) {
                        data.context.each(function (index) {
                            var error = data.files[index].error;
                            if (error) {
                                $(this).find('.error').text(error);
                            }
                        });
                    }
                });
            },
            // Callback for the start of each file upload request:
            send: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload');
                if (data.context && data.dataType &&
                        data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress').addClass(
                            !$.support.transition && 'progress-animated'
                        )
                        .attr('aria-valuenow', 100)
                        .children().first().css(
                            'width',
                            '100%'
                        );
                }
                return that._trigger('sent', e, data);
            },
            // Callback for successful uploads:
            done: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    getFilesFromResponse = data.getFilesFromResponse ||
                        that.options.getFilesFromResponse,
                    files = getFilesFromResponse(data),
                    template,
                    deferred;
                if (data.context) {
                    data.context.each(function (index) {
                        var file = files[index] ||
                                {error: 'Empty file upload result'};
                        deferred = that._addFinishedDeferreds();
                        that._transition($(this)).done(
                            function () {
                                var node = $(this);
                                template = that._renderDownload([file])
                                    .replaceAll(node);
                                that._forceReflow(template);
                                that._transition(template).done(
                                    function () {
                                        data.context = $(this);
                                        that._trigger('completed', e, data);
                                        that._trigger('finished', e, data);
                                        deferred.resolve();
                                    }
                                );
                            }
                        );
                    });
                } else {
                    template = that._renderDownload(files)[
                        that.options.prependFiles ? 'prependTo' : 'appendTo'
                    ](that.options.filesContainer);
                    that._forceReflow(template);
                    deferred = that._addFinishedDeferreds();
                    that._transition(template).done(
                        function () {
                            data.context = $(this);
                            that._trigger('completed', e, data);
                            that._trigger('finished', e, data);
                            deferred.resolve();
                        }
                    );
                }
            },
            // Callback for failed (abort or error) uploads:
            fail: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    template,
                    deferred;
                if (data.context) {
                    data.context.each(function (index) {
                        if (data.errorThrown !== 'abort') {
                            var file = data.files[index];
                            file.error = file.error || data.errorThrown ||
                                data.i18n('unknownError');
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    var node = $(this);
                                    template = that._renderDownload([file])
                                        .replaceAll(node);
                                    that._forceReflow(template);
                                    that._transition(template).done(
                                        function () {
                                            data.context = $(this);
                                            that._trigger('failed', e, data);
                                            that._trigger('finished', e, data);
                                            deferred.resolve();
                                        }
                                    );
                                }
                            );
                        } else {
                            deferred = that._addFinishedDeferreds();
                            that._transition($(this)).done(
                                function () {
                                    $(this).remove();
                                    that._trigger('failed', e, data);
                                    that._trigger('finished', e, data);
                                    deferred.resolve();
                                }
                            );
                        }
                    });
                } else if (data.errorThrown !== 'abort') {
                    data.context = that._renderUpload(data.files)[
                        that.options.prependFiles ? 'prependTo' : 'appendTo'
                    ](that.options.filesContainer)
                        .data('data', data);
                    that._forceReflow(data.context);
                    deferred = that._addFinishedDeferreds();
                    that._transition(data.context).done(
                        function () {
                            data.context = $(this);
                            that._trigger('failed', e, data);
                            that._trigger('finished', e, data);
                            deferred.resolve();
                        }
                    );
                } else {
                    that._trigger('failed', e, data);
                    that._trigger('finished', e, data);
                    that._addFinishedDeferreds().resolve();
                }
            },
            // Callback for upload progress events:
            progress: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var progress = Math.floor(data.loaded / data.total * 100);
                if (data.context) {
                    data.context.each(function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', progress)
                            .children().first().css(
                                'width',
                                progress + '%'
                            );
                    });
                }
            },
            // Callback for global upload progress events:
            progressall: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var $this = $(this),
                    progress = Math.floor(data.loaded / data.total * 100),
                    globalProgressNode = $this.find('.fileupload-progress'),
                    extendedProgressNode = globalProgressNode
                        .find('.progress-extended');
                if (extendedProgressNode.length) {
                    extendedProgressNode.html(
                        ($this.data('blueimp-fileupload') || $this.data('fileupload'))
                            ._renderExtendedProgress(data)
                    );
                }
                globalProgressNode
                    .find('.progress')
                    .attr('aria-valuenow', progress)
                    .children().first().css(
                        'width',
                        progress + '%'
                    );
            },
            // Callback for uploads start, equivalent to the global ajaxStart event:
            start: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload');
                that._resetFinishedDeferreds();
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        that._trigger('started', e);
                    }
                );
            },
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            stop: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    deferred = that._addFinishedDeferreds();
                $.when.apply($, that._getFinishedDeferreds())
                    .done(function () {
                        that._trigger('stopped', e);
                    });
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', '0')
                            .children().first().css('width', '0%');
                        $(this).find('.progress-extended').html('&nbsp;');
                        deferred.resolve();
                    }
                );
            },
            processstart: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                $(this).addClass('fileupload-processing');
            },
            processstop: function (e) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                $(this).removeClass('fileupload-processing');
            },
            // Callback for file deletion:
            destroy: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var that = $(this).data('blueimp-fileupload') ||
                        $(this).data('fileupload'),
                    removeNode = function () {
                        that._transition(data.context).done(
                            function () {
                                $(this).remove();
                                that._trigger('destroyed', e, data);
                            }
                        );
                    };
                if (data.url) {
                    data.dataType = data.dataType || that.options.dataType;
                    $.ajax(data).done(removeNode).fail(function () {
                        that._trigger('destroyfailed', e, data);
                    });
                } else {
                    removeNode();
                }
            }
        },

        _resetFinishedDeferreds: function () {
            this._finishedUploads = [];
        },

        _addFinishedDeferreds: function (deferred) {
            if (!deferred) {
                deferred = $.Deferred();
            }
            this._finishedUploads.push(deferred);
            return deferred;
        },

        _getFinishedDeferreds: function () {
            return this._finishedUploads;
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (ignore) {}
            });
        },

        _formatFileSize: function (bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },

        _formatBitrate: function (bits) {
            if (typeof bits !== 'number') {
                return '';
            }
            if (bits >= 1000000000) {
                return (bits / 1000000000).toFixed(2) + ' Gbit/s';
            }
            if (bits >= 1000000) {
                return (bits / 1000000).toFixed(2) + ' Mbit/s';
            }
            if (bits >= 1000) {
                return (bits / 1000).toFixed(2) + ' kbit/s';
            }
            return bits.toFixed(2) + ' bit/s';
        },

        _formatTime: function (seconds) {
            var date = new Date(seconds * 1000),
                days = Math.floor(seconds / 86400);
            days = days ? days + 'd ' : '';
            return days +
                ('0' + date.getUTCHours()).slice(-2) + ':' +
                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                ('0' + date.getUTCSeconds()).slice(-2);
        },

        _formatPercentage: function (floatValue) {
            return (floatValue * 100).toFixed(2) + ' %';
        },

        _renderExtendedProgress: function (data) {
            return this._formatBitrate(data.bitrate) + ' | ' +
                this._formatTime(
                    (data.total - data.loaded) * 8 / data.bitrate
                ) + ' | ' +
                this._formatPercentage(
                    data.loaded / data.total
                ) + ' | ' +
                this._formatFileSize(data.loaded) + ' / ' +
                this._formatFileSize(data.total);
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        _renderPreviews: function (data) {
            data.context.find('.preview').each(function (index, elm) {
                $(elm).append(data.files[index].preview);
            });
        },

        _renderUpload: function (files) {
            return this._renderTemplate(
                this.options.uploadTemplate,
                files
            );
        },

        _renderDownload: function (files) {
            return this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
        },

        _startHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget),
                template = button.closest('.template-upload'),
                data = template.data('data');
            button.prop('disabled', true);
            if (data && data.submit) {
                data.submit();
            }
        },

        _cancelHandler: function (e) {
            e.preventDefault();
            var template = $(e.currentTarget)
                    .closest('.template-upload,.template-download'),
                data = template.data('data') || {};
            data.context = data.context || template;
            if (data.abort) {
                data.abort();
            } else {
                data.errorThrown = 'abort';
                this._trigger('fail', e, data);
            }
        },

        _deleteHandler: function (e) {
            e.preventDefault();
            var button = $(e.currentTarget);
            this._trigger('destroy', e, $.extend({
                context: button.closest('.template-download'),
                type: 'DELETE'
            }, button.data()));
        },

        _forceReflow: function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        },

        _transition: function (node) {
            var dfd = $.Deferred();
            if ($.support.transition && node.hasClass('fade') && node.is(':visible')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            dfd.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                dfd.resolveWith(node);
            }
            return dfd;
        },

        _initButtonBarEventHandlers: function () {
            var fileUploadButtonBar = this.element.find('.fileupload-buttonbar'),
                filesList = this.options.filesContainer;
            this._on(fileUploadButtonBar.find('.start'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.start').click();
                }
            });
            this._on(fileUploadButtonBar.find('.cancel'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.cancel').click();
                }
            });
            this._on(fileUploadButtonBar.find('.delete'), {
                click: function (e) {
                    e.preventDefault();
                    filesList.find('.toggle:checked')
                        .closest('.template-download')
                        .find('.delete').click();
                    fileUploadButtonBar.find('.toggle')
                        .prop('checked', false);
                }
            });
            this._on(fileUploadButtonBar.find('.toggle'), {
                change: function (e) {
                    filesList.find('.toggle').prop(
                        'checked',
                        $(e.currentTarget).is(':checked')
                    );
                }
            });
        },

        _destroyButtonBarEventHandlers: function () {
            this._off(
                this.element.find('.fileupload-buttonbar')
                    .find('.start, .cancel, .delete'),
                'click'
            );
            this._off(
                this.element.find('.fileupload-buttonbar .toggle'),
                'change.'
            );
        },

        _initEventHandlers: function () {
            this._super();
            this._on(this.options.filesContainer, {
                'click .start': this._startHandler,
                'click .cancel': this._cancelHandler,
                'click .delete': this._deleteHandler
            });
            this._initButtonBarEventHandlers();
        },

        _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers();
            this._off(this.options.filesContainer, 'click');
            this._super();
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
        },

        _initTemplates: function () {
            var options = this.options;
            options.templatesContainer = this.document[0].createElement(
                options.filesContainer.prop('nodeName')
            );
            if (tmpl) {
                if (options.uploadTemplateId) {
                    options.uploadTemplate = tmpl(options.uploadTemplateId);
                }
                if (options.downloadTemplateId) {
                    options.downloadTemplate = tmpl(options.downloadTemplateId);
                }
            }
        },

        _initFilesContainer: function () {
            var options = this.options;
            if (options.filesContainer === undefined) {
                options.filesContainer = this.element.find('.files');
            } else if (!(options.filesContainer instanceof $)) {
                options.filesContainer = $(options.filesContainer);
            }
        },

        _initSpecialOptions: function () {
            this._super();
            this._initFilesContainer();
            this._initTemplates();
        },

        _create: function () {
            this._super();
            this._resetFinishedDeferreds();
            if (!$.support.fileInput) {
                this._disableFileInputButton();
            }
        },

        enable: function () {
            var wasDisabled = false;
            if (this.options.disabled) {
                wasDisabled = true;
            }
            this._super();
            if (wasDisabled) {
                this.element.find('input, button').prop('disabled', false);
                this._enableFileInputButton();
            }
        },

        disable: function () {
            if (!this.options.disabled) {
                this.element.find('input, button').prop('disabled', true);
                this._disableFileInputButton();
            }
            this._super();
        }

    });

}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWQtaW1hZ2UuYWxsLm1pbi5qcyIsImNhbnZhcy10by1ibG9iLm1pbi5qcyIsInRtcGwubWluLmpzIiwianF1ZXJ5LnVpLndpZGdldC5qcyIsImpxdWVyeS5pZnJhbWUtdHJhbnNwb3J0LmpzIiwianF1ZXJ5LmZpbGV1cGxvYWQuanMiLCJqcXVlcnkuZmlsZXVwbG9hZC1wcm9jZXNzLmpzIiwianF1ZXJ5LmZpbGV1cGxvYWQtaW1hZ2UuanMiLCJqcXVlcnkuZmlsZXVwbG9hZC1hdWRpby5qcyIsImpxdWVyeS5maWxldXBsb2FkLXZpZGVvLmpzIiwianF1ZXJ5LmZpbGV1cGxvYWQtdmFsaWRhdGUuanMiLCJqcXVlcnkuZmlsZXVwbG9hZC11aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQ0RBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1akJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3I4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmaWxldXBsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO3ZhciB0PWZ1bmN0aW9uKGUsaSxhKXt2YXIgbyxyLG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtpZihuLm9uZXJyb3I9aSxuLm9ubG9hZD1mdW5jdGlvbigpeyFyfHxhJiZhLm5vUmV2b2tlfHx0LnJldm9rZU9iamVjdFVSTChyKSxpJiZpKHQuc2NhbGUobixhKSl9LHQuaXNJbnN0YW5jZU9mKFwiQmxvYlwiLGUpfHx0LmlzSW5zdGFuY2VPZihcIkZpbGVcIixlKSlvPXI9dC5jcmVhdGVPYmplY3RVUkwoZSksbi5fdHlwZT1lLnR5cGU7ZWxzZXtpZihcInN0cmluZ1wiIT10eXBlb2YgZSlyZXR1cm4hMTtvPWUsYSYmYS5jcm9zc09yaWdpbiYmKG4uY3Jvc3NPcmlnaW49YS5jcm9zc09yaWdpbil9cmV0dXJuIG8/KG4uc3JjPW8sbik6dC5yZWFkRmlsZShlLGZ1bmN0aW9uKGUpe3ZhciB0PWUudGFyZ2V0O3QmJnQucmVzdWx0P24uc3JjPXQucmVzdWx0OmkmJmkoZSl9KX0saT13aW5kb3cuY3JlYXRlT2JqZWN0VVJMJiZ3aW5kb3d8fHdpbmRvdy5VUkwmJlVSTC5yZXZva2VPYmplY3RVUkwmJlVSTHx8d2luZG93LndlYmtpdFVSTCYmd2Via2l0VVJMO3QuaXNJbnN0YW5jZU9mPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KT09PVwiW29iamVjdCBcIitlK1wiXVwifSx0LnRyYW5zZm9ybUNvb3JkaW5hdGVzPWZ1bmN0aW9uKCl7fSx0LmdldFRyYW5zZm9ybWVkT3B0aW9ucz1mdW5jdGlvbihlLHQpe3ZhciBpLGEsbyxyLG49dC5hc3BlY3RSYXRpbztpZighbilyZXR1cm4gdDtpPXt9O2ZvcihhIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShhKSYmKGlbYV09dFthXSk7cmV0dXJuIGkuY3JvcD0hMCxvPWUubmF0dXJhbFdpZHRofHxlLndpZHRoLHI9ZS5uYXR1cmFsSGVpZ2h0fHxlLmhlaWdodCxvL3I+bj8oaS5tYXhXaWR0aD1yKm4saS5tYXhIZWlnaHQ9cik6KGkubWF4V2lkdGg9byxpLm1heEhlaWdodD1vL24pLGl9LHQucmVuZGVySW1hZ2VUb0NhbnZhcz1mdW5jdGlvbihlLHQsaSxhLG8scixuLHMsbCxkKXtyZXR1cm4gZS5nZXRDb250ZXh0KFwiMmRcIikuZHJhd0ltYWdlKHQsaSxhLG8scixuLHMsbCxkKSxlfSx0Lmhhc0NhbnZhc09wdGlvbj1mdW5jdGlvbihlKXtyZXR1cm4gZS5jYW52YXN8fGUuY3JvcHx8ISFlLmFzcGVjdFJhdGlvfSx0LnNjYWxlPWZ1bmN0aW9uKGUsaSl7ZnVuY3Rpb24gYSgpe3ZhciBlPU1hdGgubWF4KChzfHx5KS95LChsfHx2KS92KTtlPjEmJih5Kj1lLHYqPWUpfWZ1bmN0aW9uIG8oKXt2YXIgZT1NYXRoLm1pbigocnx8eSkveSwobnx8dikvdik7MT5lJiYoeSo9ZSx2Kj1lKX1pPWl8fHt9O3ZhciByLG4scyxsLGQsdSxjLGcsZixoLG0scD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFM9ZS5nZXRDb250ZXh0fHx0Lmhhc0NhbnZhc09wdGlvbihpKSYmcC5nZXRDb250ZXh0LGI9ZS5uYXR1cmFsV2lkdGh8fGUud2lkdGgseD1lLm5hdHVyYWxIZWlnaHR8fGUuaGVpZ2h0LHk9Yix2PXg7aWYoUyYmKGk9dC5nZXRUcmFuc2Zvcm1lZE9wdGlvbnMoZSxpKSxjPWkubGVmdHx8MCxnPWkudG9wfHwwLGkuc291cmNlV2lkdGg/KGQ9aS5zb3VyY2VXaWR0aCx2b2lkIDAhPT1pLnJpZ2h0JiZ2b2lkIDA9PT1pLmxlZnQmJihjPWItZC1pLnJpZ2h0KSk6ZD1iLWMtKGkucmlnaHR8fDApLGkuc291cmNlSGVpZ2h0Pyh1PWkuc291cmNlSGVpZ2h0LHZvaWQgMCE9PWkuYm90dG9tJiZ2b2lkIDA9PT1pLnRvcCYmKGc9eC11LWkuYm90dG9tKSk6dT14LWctKGkuYm90dG9tfHwwKSx5PWQsdj11KSxyPWkubWF4V2lkdGgsbj1pLm1heEhlaWdodCxzPWkubWluV2lkdGgsbD1pLm1pbkhlaWdodCxTJiZyJiZuJiZpLmNyb3A/KHk9cix2PW4sbT1kL3Utci9uLDA+bT8odT1uKmQvcix2b2lkIDA9PT1pLnRvcCYmdm9pZCAwPT09aS5ib3R0b20mJihnPSh4LXUpLzIpKTptPjAmJihkPXIqdS9uLHZvaWQgMD09PWkubGVmdCYmdm9pZCAwPT09aS5yaWdodCYmKGM9KGItZCkvMikpKTooKGkuY29udGFpbnx8aS5jb3ZlcikmJihzPXI9cnx8cyxsPW49bnx8bCksaS5jb3Zlcj8obygpLGEoKSk6KGEoKSxvKCkpKSxTKXtpZihmPWkucGl4ZWxSYXRpbyxmPjEmJihwLnN0eWxlLndpZHRoPXkrXCJweFwiLHAuc3R5bGUuaGVpZ2h0PXYrXCJweFwiLHkqPWYsdio9ZixwLmdldENvbnRleHQoXCIyZFwiKS5zY2FsZShmLGYpKSxoPWkuZG93bnNhbXBsaW5nUmF0aW8saD4wJiYxPmgmJmQ+eSYmdT52KWZvcig7ZCpoPnk7KXAud2lkdGg9ZCpoLHAuaGVpZ2h0PXUqaCx0LnJlbmRlckltYWdlVG9DYW52YXMocCxlLGMsZyxkLHUsMCwwLHAud2lkdGgscC5oZWlnaHQpLGQ9cC53aWR0aCx1PXAuaGVpZ2h0LGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxlLndpZHRoPWQsZS5oZWlnaHQ9dSx0LnJlbmRlckltYWdlVG9DYW52YXMoZSxwLDAsMCxkLHUsMCwwLGQsdSk7cmV0dXJuIHAud2lkdGg9eSxwLmhlaWdodD12LHQudHJhbnNmb3JtQ29vcmRpbmF0ZXMocCxpKSx0LnJlbmRlckltYWdlVG9DYW52YXMocCxlLGMsZyxkLHUsMCwwLHksdil9cmV0dXJuIGUud2lkdGg9eSxlLmhlaWdodD12LGV9LHQuY3JlYXRlT2JqZWN0VVJMPWZ1bmN0aW9uKGUpe3JldHVybiBpP2kuY3JlYXRlT2JqZWN0VVJMKGUpOiExfSx0LnJldm9rZU9iamVjdFVSTD1mdW5jdGlvbihlKXtyZXR1cm4gaT9pLnJldm9rZU9iamVjdFVSTChlKTohMX0sdC5yZWFkRmlsZT1mdW5jdGlvbihlLHQsaSl7aWYod2luZG93LkZpbGVSZWFkZXIpe3ZhciBhPW5ldyBGaWxlUmVhZGVyO2lmKGEub25sb2FkPWEub25lcnJvcj10LGk9aXx8XCJyZWFkQXNEYXRhVVJMXCIsYVtpXSlyZXR1cm4gYVtpXShlKSxhfXJldHVybiExfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIHR9KTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10OmUubG9hZEltYWdlPXR9KHdpbmRvdyksZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCIuL2xvYWQtaW1hZ2VcIl0sZSk6ZShcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9yZXF1aXJlKFwiLi9sb2FkLWltYWdlXCIpOndpbmRvdy5sb2FkSW1hZ2UpfShmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1lLmhhc0NhbnZhc09wdGlvbixpPWUudHJhbnNmb3JtQ29vcmRpbmF0ZXMsYT1lLmdldFRyYW5zZm9ybWVkT3B0aW9ucztlLmhhc0NhbnZhc09wdGlvbj1mdW5jdGlvbihpKXtyZXR1cm4hIWkub3JpZW50YXRpb258fHQuY2FsbChlLGkpfSxlLnRyYW5zZm9ybUNvb3JkaW5hdGVzPWZ1bmN0aW9uKHQsYSl7aS5jYWxsKGUsdCxhKTt2YXIgbz10LmdldENvbnRleHQoXCIyZFwiKSxyPXQud2lkdGgsbj10LmhlaWdodCxzPXQuc3R5bGUud2lkdGgsbD10LnN0eWxlLmhlaWdodCxkPWEub3JpZW50YXRpb247aWYoZCYmIShkPjgpKXN3aXRjaChkPjQmJih0LndpZHRoPW4sdC5oZWlnaHQ9cix0LnN0eWxlLndpZHRoPWwsdC5zdHlsZS5oZWlnaHQ9cyksZCl7Y2FzZSAyOm8udHJhbnNsYXRlKHIsMCksby5zY2FsZSgtMSwxKTticmVhaztjYXNlIDM6by50cmFuc2xhdGUocixuKSxvLnJvdGF0ZShNYXRoLlBJKTticmVhaztjYXNlIDQ6by50cmFuc2xhdGUoMCxuKSxvLnNjYWxlKDEsLTEpO2JyZWFrO2Nhc2UgNTpvLnJvdGF0ZSguNSpNYXRoLlBJKSxvLnNjYWxlKDEsLTEpO2JyZWFrO2Nhc2UgNjpvLnJvdGF0ZSguNSpNYXRoLlBJKSxvLnRyYW5zbGF0ZSgwLC1uKTticmVhaztjYXNlIDc6by5yb3RhdGUoLjUqTWF0aC5QSSksby50cmFuc2xhdGUociwtbiksby5zY2FsZSgtMSwxKTticmVhaztjYXNlIDg6by5yb3RhdGUoLS41Kk1hdGguUEkpLG8udHJhbnNsYXRlKC1yLDApfX0sZS5nZXRUcmFuc2Zvcm1lZE9wdGlvbnM9ZnVuY3Rpb24odCxpKXt2YXIgbyxyLG49YS5jYWxsKGUsdCxpKSxzPW4ub3JpZW50YXRpb247aWYoIXN8fHM+OHx8MT09PXMpcmV0dXJuIG47bz17fTtmb3IociBpbiBuKW4uaGFzT3duUHJvcGVydHkocikmJihvW3JdPW5bcl0pO3N3aXRjaChuLm9yaWVudGF0aW9uKXtjYXNlIDI6by5sZWZ0PW4ucmlnaHQsby5yaWdodD1uLmxlZnQ7YnJlYWs7Y2FzZSAzOm8ubGVmdD1uLnJpZ2h0LG8udG9wPW4uYm90dG9tLG8ucmlnaHQ9bi5sZWZ0LG8uYm90dG9tPW4udG9wO2JyZWFrO2Nhc2UgNDpvLnRvcD1uLmJvdHRvbSxvLmJvdHRvbT1uLnRvcDticmVhaztjYXNlIDU6by5sZWZ0PW4udG9wLG8udG9wPW4ubGVmdCxvLnJpZ2h0PW4uYm90dG9tLG8uYm90dG9tPW4ucmlnaHQ7YnJlYWs7Y2FzZSA2Om8ubGVmdD1uLnRvcCxvLnRvcD1uLnJpZ2h0LG8ucmlnaHQ9bi5ib3R0b20sby5ib3R0b209bi5sZWZ0O2JyZWFrO2Nhc2UgNzpvLmxlZnQ9bi5ib3R0b20sby50b3A9bi5yaWdodCxvLnJpZ2h0PW4udG9wLG8uYm90dG9tPW4ubGVmdDticmVhaztjYXNlIDg6by5sZWZ0PW4uYm90dG9tLG8udG9wPW4ubGVmdCxvLnJpZ2h0PW4udG9wLG8uYm90dG9tPW4ucmlnaHR9cmV0dXJuIG4ub3JpZW50YXRpb24+NCYmKG8ubWF4V2lkdGg9bi5tYXhIZWlnaHQsby5tYXhIZWlnaHQ9bi5tYXhXaWR0aCxvLm1pbldpZHRoPW4ubWluSGVpZ2h0LG8ubWluSGVpZ2h0PW4ubWluV2lkdGgsby5zb3VyY2VXaWR0aD1uLnNvdXJjZUhlaWdodCxvLnNvdXJjZUhlaWdodD1uLnNvdXJjZVdpZHRoKSxvfX0pLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wiLi9sb2FkLWltYWdlXCJdLGUpOmUoXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/cmVxdWlyZShcIi4vbG9hZC1pbWFnZVwiKTp3aW5kb3cubG9hZEltYWdlKX0oZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9d2luZG93LkJsb2ImJihCbG9iLnByb3RvdHlwZS5zbGljZXx8QmxvYi5wcm90b3R5cGUud2Via2l0U2xpY2V8fEJsb2IucHJvdG90eXBlLm1velNsaWNlKTtlLmJsb2JTbGljZT10JiZmdW5jdGlvbigpe3ZhciBlPXRoaXMuc2xpY2V8fHRoaXMud2Via2l0U2xpY2V8fHRoaXMubW96U2xpY2U7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSxlLm1ldGFEYXRhUGFyc2Vycz17anBlZzp7NjU1MDU6W119fSxlLnBhcnNlTWV0YURhdGE9ZnVuY3Rpb24odCxpLGEpe2E9YXx8e307dmFyIG89dGhpcyxyPWEubWF4TWV0YURhdGFTaXplfHwyNjIxNDQsbj17fSxzPSEod2luZG93LkRhdGFWaWV3JiZ0JiZ0LnNpemU+PTEyJiZcImltYWdlL2pwZWdcIj09PXQudHlwZSYmZS5ibG9iU2xpY2UpOyhzfHwhZS5yZWFkRmlsZShlLmJsb2JTbGljZS5jYWxsKHQsMCxyKSxmdW5jdGlvbih0KXtpZih0LnRhcmdldC5lcnJvcilyZXR1cm4gY29uc29sZS5sb2codC50YXJnZXQuZXJyb3IpLHZvaWQgaShuKTt2YXIgcixzLGwsZCx1PXQudGFyZ2V0LnJlc3VsdCxjPW5ldyBEYXRhVmlldyh1KSxnPTIsZj1jLmJ5dGVMZW5ndGgtNCxoPWc7aWYoNjU0OTY9PT1jLmdldFVpbnQxNigwKSl7Zm9yKDtmPmcmJihyPWMuZ2V0VWludDE2KGcpLHI+PTY1NTA0JiY2NTUxOT49cnx8NjU1MzQ9PT1yKTspe2lmKHM9Yy5nZXRVaW50MTYoZysyKSsyLGcrcz5jLmJ5dGVMZW5ndGgpe2NvbnNvbGUubG9nKFwiSW52YWxpZCBtZXRhIGRhdGE6IEludmFsaWQgc2VnbWVudCBzaXplLlwiKTticmVha31pZihsPWUubWV0YURhdGFQYXJzZXJzLmpwZWdbcl0pZm9yKGQ9MDtkPGwubGVuZ3RoO2QrPTEpbFtkXS5jYWxsKG8sYyxnLHMsbixhKTtnKz1zLGg9Z30hYS5kaXNhYmxlSW1hZ2VIZWFkJiZoPjYmJih1LnNsaWNlP24uaW1hZ2VIZWFkPXUuc2xpY2UoMCxoKTpuLmltYWdlSGVhZD1uZXcgVWludDhBcnJheSh1KS5zdWJhcnJheSgwLGgpKX1lbHNlIGNvbnNvbGUubG9nKFwiSW52YWxpZCBKUEVHIGZpbGU6IE1pc3NpbmcgSlBFRyBtYXJrZXIuXCIpO2kobil9LFwicmVhZEFzQXJyYXlCdWZmZXJcIikpJiZpKG4pfX0pLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wiLi9sb2FkLWltYWdlXCIsXCIuL2xvYWQtaW1hZ2UtbWV0YVwiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9lKHJlcXVpcmUoXCIuL2xvYWQtaW1hZ2VcIikscmVxdWlyZShcIi4vbG9hZC1pbWFnZS1tZXRhXCIpKTplKHdpbmRvdy5sb2FkSW1hZ2UpfShmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtlLkV4aWZNYXA9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30sZS5FeGlmTWFwLnByb3RvdHlwZS5tYXA9e09yaWVudGF0aW9uOjI3NH0sZS5FeGlmTWFwLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXNbZV18fHRoaXNbdGhpcy5tYXBbZV1dfSxlLmdldEV4aWZUaHVtYm5haWw9ZnVuY3Rpb24oZSx0LGkpe3ZhciBhLG8scjtpZighaXx8dCtpPmUuYnl0ZUxlbmd0aClyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhcIkludmFsaWQgRXhpZiBkYXRhOiBJbnZhbGlkIHRodW1ibmFpbCBkYXRhLlwiKTtmb3IoYT1bXSxvPTA7aT5vO28rPTEpcj1lLmdldFVpbnQ4KHQrbyksYS5wdXNoKCgxNj5yP1wiMFwiOlwiXCIpK3IudG9TdHJpbmcoMTYpKTtyZXR1cm5cImRhdGE6aW1hZ2UvanBlZywlXCIrYS5qb2luKFwiJVwiKX0sZS5leGlmVGFnVHlwZXM9ezE6e2dldFZhbHVlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuZ2V0VWludDgodCl9LHNpemU6MX0sMjp7Z2V0VmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlLmdldFVpbnQ4KHQpKX0sc2l6ZToxLGFzY2lpOiEwfSwzOntnZXRWYWx1ZTpmdW5jdGlvbihlLHQsaSl7cmV0dXJuIGUuZ2V0VWludDE2KHQsaSl9LHNpemU6Mn0sNDp7Z2V0VmFsdWU6ZnVuY3Rpb24oZSx0LGkpe3JldHVybiBlLmdldFVpbnQzMih0LGkpfSxzaXplOjR9LDU6e2dldFZhbHVlOmZ1bmN0aW9uKGUsdCxpKXtyZXR1cm4gZS5nZXRVaW50MzIodCxpKS9lLmdldFVpbnQzMih0KzQsaSl9LHNpemU6OH0sOTp7Z2V0VmFsdWU6ZnVuY3Rpb24oZSx0LGkpe3JldHVybiBlLmdldEludDMyKHQsaSl9LHNpemU6NH0sMTA6e2dldFZhbHVlOmZ1bmN0aW9uKGUsdCxpKXtyZXR1cm4gZS5nZXRJbnQzMih0LGkpL2UuZ2V0SW50MzIodCs0LGkpfSxzaXplOjh9fSxlLmV4aWZUYWdUeXBlc1s3XT1lLmV4aWZUYWdUeXBlc1sxXSxlLmdldEV4aWZWYWx1ZT1mdW5jdGlvbih0LGksYSxvLHIsbil7dmFyIHMsbCxkLHUsYyxnLGY9ZS5leGlmVGFnVHlwZXNbb107aWYoIWYpcmV0dXJuIHZvaWQgY29uc29sZS5sb2coXCJJbnZhbGlkIEV4aWYgZGF0YTogSW52YWxpZCB0YWcgdHlwZS5cIik7aWYocz1mLnNpemUqcixsPXM+ND9pK3QuZ2V0VWludDMyKGErOCxuKTphKzgsbCtzPnQuYnl0ZUxlbmd0aClyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhcIkludmFsaWQgRXhpZiBkYXRhOiBJbnZhbGlkIGRhdGEgb2Zmc2V0LlwiKTtpZigxPT09cilyZXR1cm4gZi5nZXRWYWx1ZSh0LGwsbik7Zm9yKGQ9W10sdT0wO3I+dTt1Kz0xKWRbdV09Zi5nZXRWYWx1ZSh0LGwrdSpmLnNpemUsbik7aWYoZi5hc2NpaSl7Zm9yKGM9XCJcIix1PTA7dTxkLmxlbmd0aCYmKGc9ZFt1XSxcIlxceDAwXCIhPT1nKTt1Kz0xKWMrPWc7cmV0dXJuIGN9cmV0dXJuIGR9LGUucGFyc2VFeGlmVGFnPWZ1bmN0aW9uKHQsaSxhLG8scil7dmFyIG49dC5nZXRVaW50MTYoYSxvKTtyLmV4aWZbbl09ZS5nZXRFeGlmVmFsdWUodCxpLGEsdC5nZXRVaW50MTYoYSsyLG8pLHQuZ2V0VWludDMyKGErNCxvKSxvKX0sZS5wYXJzZUV4aWZUYWdzPWZ1bmN0aW9uKGUsdCxpLGEsbyl7dmFyIHIsbixzO2lmKGkrNj5lLmJ5dGVMZW5ndGgpcmV0dXJuIHZvaWQgY29uc29sZS5sb2coXCJJbnZhbGlkIEV4aWYgZGF0YTogSW52YWxpZCBkaXJlY3Rvcnkgb2Zmc2V0LlwiKTtpZihyPWUuZ2V0VWludDE2KGksYSksbj1pKzIrMTIqcixuKzQ+ZS5ieXRlTGVuZ3RoKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKFwiSW52YWxpZCBFeGlmIGRhdGE6IEludmFsaWQgZGlyZWN0b3J5IHNpemUuXCIpO2ZvcihzPTA7cj5zO3MrPTEpdGhpcy5wYXJzZUV4aWZUYWcoZSx0LGkrMisxMipzLGEsbyk7cmV0dXJuIGUuZ2V0VWludDMyKG4sYSl9LGUucGFyc2VFeGlmRGF0YT1mdW5jdGlvbih0LGksYSxvLHIpe2lmKCFyLmRpc2FibGVFeGlmKXt2YXIgbixzLGwsZD1pKzEwO2lmKDExNjU1MTkyMDY9PT10LmdldFVpbnQzMihpKzQpKXtpZihkKzg+dC5ieXRlTGVuZ3RoKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKFwiSW52YWxpZCBFeGlmIGRhdGE6IEludmFsaWQgc2VnbWVudCBzaXplLlwiKTtpZigwIT09dC5nZXRVaW50MTYoaSs4KSlyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhcIkludmFsaWQgRXhpZiBkYXRhOiBNaXNzaW5nIGJ5dGUgYWxpZ25tZW50IG9mZnNldC5cIik7c3dpdGNoKHQuZ2V0VWludDE2KGQpKXtjYXNlIDE4NzYxOm49ITA7YnJlYWs7Y2FzZSAxOTc4OTpuPSExO2JyZWFrO2RlZmF1bHQ6cmV0dXJuIHZvaWQgY29uc29sZS5sb2coXCJJbnZhbGlkIEV4aWYgZGF0YTogSW52YWxpZCBieXRlIGFsaWdubWVudCBtYXJrZXIuXCIpfWlmKDQyIT09dC5nZXRVaW50MTYoZCsyLG4pKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKFwiSW52YWxpZCBFeGlmIGRhdGE6IE1pc3NpbmcgVElGRiBtYXJrZXIuXCIpO3M9dC5nZXRVaW50MzIoZCs0LG4pLG8uZXhpZj1uZXcgZS5FeGlmTWFwLHM9ZS5wYXJzZUV4aWZUYWdzKHQsZCxkK3MsbixvKSxzJiYhci5kaXNhYmxlRXhpZlRodW1ibmFpbCYmKGw9e2V4aWY6e319LHM9ZS5wYXJzZUV4aWZUYWdzKHQsZCxkK3MsbixsKSxsLmV4aWZbNTEzXSYmKG8uZXhpZi5UaHVtYm5haWw9ZS5nZXRFeGlmVGh1bWJuYWlsKHQsZCtsLmV4aWZbNTEzXSxsLmV4aWZbNTE0XSkpKSxvLmV4aWZbMzQ2NjVdJiYhci5kaXNhYmxlRXhpZlN1YiYmZS5wYXJzZUV4aWZUYWdzKHQsZCxkK28uZXhpZlszNDY2NV0sbixvKSxvLmV4aWZbMzQ4NTNdJiYhci5kaXNhYmxlRXhpZkdwcyYmZS5wYXJzZUV4aWZUYWdzKHQsZCxkK28uZXhpZlszNDg1M10sbixvKX19fSxlLm1ldGFEYXRhUGFyc2Vycy5qcGVnWzY1NTA1XS5wdXNoKGUucGFyc2VFeGlmRGF0YSl9KSxmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcIi4vbG9hZC1pbWFnZVwiLFwiLi9sb2FkLWltYWdlLWV4aWZcIl0sZSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/ZShyZXF1aXJlKFwiLi9sb2FkLWltYWdlXCIpLHJlcXVpcmUoXCIuL2xvYWQtaW1hZ2UtZXhpZlwiKSk6ZSh3aW5kb3cubG9hZEltYWdlKX0oZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZS5FeGlmTWFwLnByb3RvdHlwZS50YWdzPXsyNTY6XCJJbWFnZVdpZHRoXCIsMjU3OlwiSW1hZ2VIZWlnaHRcIiwzNDY2NTpcIkV4aWZJRkRQb2ludGVyXCIsMzQ4NTM6XCJHUFNJbmZvSUZEUG9pbnRlclwiLDQwOTY1OlwiSW50ZXJvcGVyYWJpbGl0eUlGRFBvaW50ZXJcIiwyNTg6XCJCaXRzUGVyU2FtcGxlXCIsMjU5OlwiQ29tcHJlc3Npb25cIiwyNjI6XCJQaG90b21ldHJpY0ludGVycHJldGF0aW9uXCIsMjc0OlwiT3JpZW50YXRpb25cIiwyNzc6XCJTYW1wbGVzUGVyUGl4ZWxcIiwyODQ6XCJQbGFuYXJDb25maWd1cmF0aW9uXCIsNTMwOlwiWUNiQ3JTdWJTYW1wbGluZ1wiLDUzMTpcIllDYkNyUG9zaXRpb25pbmdcIiwyODI6XCJYUmVzb2x1dGlvblwiLDI4MzpcIllSZXNvbHV0aW9uXCIsMjk2OlwiUmVzb2x1dGlvblVuaXRcIiwyNzM6XCJTdHJpcE9mZnNldHNcIiwyNzg6XCJSb3dzUGVyU3RyaXBcIiwyNzk6XCJTdHJpcEJ5dGVDb3VudHNcIiw1MTM6XCJKUEVHSW50ZXJjaGFuZ2VGb3JtYXRcIiw1MTQ6XCJKUEVHSW50ZXJjaGFuZ2VGb3JtYXRMZW5ndGhcIiwzMDE6XCJUcmFuc2ZlckZ1bmN0aW9uXCIsMzE4OlwiV2hpdGVQb2ludFwiLDMxOTpcIlByaW1hcnlDaHJvbWF0aWNpdGllc1wiLDUyOTpcIllDYkNyQ29lZmZpY2llbnRzXCIsNTMyOlwiUmVmZXJlbmNlQmxhY2tXaGl0ZVwiLDMwNjpcIkRhdGVUaW1lXCIsMjcwOlwiSW1hZ2VEZXNjcmlwdGlvblwiLDI3MTpcIk1ha2VcIiwyNzI6XCJNb2RlbFwiLDMwNTpcIlNvZnR3YXJlXCIsMzE1OlwiQXJ0aXN0XCIsMzM0MzI6XCJDb3B5cmlnaHRcIiwzNjg2NDpcIkV4aWZWZXJzaW9uXCIsNDA5NjA6XCJGbGFzaHBpeFZlcnNpb25cIiw0MDk2MTpcIkNvbG9yU3BhY2VcIiw0MDk2MjpcIlBpeGVsWERpbWVuc2lvblwiLDQwOTYzOlwiUGl4ZWxZRGltZW5zaW9uXCIsNDIyNDA6XCJHYW1tYVwiLDM3MTIxOlwiQ29tcG9uZW50c0NvbmZpZ3VyYXRpb25cIiwzNzEyMjpcIkNvbXByZXNzZWRCaXRzUGVyUGl4ZWxcIiwzNzUwMDpcIk1ha2VyTm90ZVwiLDM3NTEwOlwiVXNlckNvbW1lbnRcIiw0MDk2NDpcIlJlbGF0ZWRTb3VuZEZpbGVcIiwzNjg2NzpcIkRhdGVUaW1lT3JpZ2luYWxcIiwzNjg2ODpcIkRhdGVUaW1lRGlnaXRpemVkXCIsMzc1MjA6XCJTdWJTZWNUaW1lXCIsMzc1MjE6XCJTdWJTZWNUaW1lT3JpZ2luYWxcIiwzNzUyMjpcIlN1YlNlY1RpbWVEaWdpdGl6ZWRcIiwzMzQzNDpcIkV4cG9zdXJlVGltZVwiLDMzNDM3OlwiRk51bWJlclwiLDM0ODUwOlwiRXhwb3N1cmVQcm9ncmFtXCIsMzQ4NTI6XCJTcGVjdHJhbFNlbnNpdGl2aXR5XCIsMzQ4NTU6XCJQaG90b2dyYXBoaWNTZW5zaXRpdml0eVwiLDM0ODU2OlwiT0VDRlwiLDM0ODY0OlwiU2Vuc2l0aXZpdHlUeXBlXCIsMzQ4NjU6XCJTdGFuZGFyZE91dHB1dFNlbnNpdGl2aXR5XCIsMzQ4NjY6XCJSZWNvbW1lbmRlZEV4cG9zdXJlSW5kZXhcIiwzNDg2NzpcIklTT1NwZWVkXCIsMzQ4Njg6XCJJU09TcGVlZExhdGl0dWRleXl5XCIsMzQ4Njk6XCJJU09TcGVlZExhdGl0dWRlenp6XCIsMzczNzc6XCJTaHV0dGVyU3BlZWRWYWx1ZVwiLDM3Mzc4OlwiQXBlcnR1cmVWYWx1ZVwiLDM3Mzc5OlwiQnJpZ2h0bmVzc1ZhbHVlXCIsMzczODA6XCJFeHBvc3VyZUJpYXNcIiwzNzM4MTpcIk1heEFwZXJ0dXJlVmFsdWVcIiwzNzM4MjpcIlN1YmplY3REaXN0YW5jZVwiLDM3MzgzOlwiTWV0ZXJpbmdNb2RlXCIsMzczODQ6XCJMaWdodFNvdXJjZVwiLDM3Mzg1OlwiRmxhc2hcIiwzNzM5NjpcIlN1YmplY3RBcmVhXCIsMzczODY6XCJGb2NhbExlbmd0aFwiLDQxNDgzOlwiRmxhc2hFbmVyZ3lcIiw0MTQ4NDpcIlNwYXRpYWxGcmVxdWVuY3lSZXNwb25zZVwiLDQxNDg2OlwiRm9jYWxQbGFuZVhSZXNvbHV0aW9uXCIsNDE0ODc6XCJGb2NhbFBsYW5lWVJlc29sdXRpb25cIiw0MTQ4ODpcIkZvY2FsUGxhbmVSZXNvbHV0aW9uVW5pdFwiLDQxNDkyOlwiU3ViamVjdExvY2F0aW9uXCIsNDE0OTM6XCJFeHBvc3VyZUluZGV4XCIsNDE0OTU6XCJTZW5zaW5nTWV0aG9kXCIsNDE3Mjg6XCJGaWxlU291cmNlXCIsNDE3Mjk6XCJTY2VuZVR5cGVcIiw0MTczMDpcIkNGQVBhdHRlcm5cIiw0MTk4NTpcIkN1c3RvbVJlbmRlcmVkXCIsNDE5ODY6XCJFeHBvc3VyZU1vZGVcIiw0MTk4NzpcIldoaXRlQmFsYW5jZVwiLDQxOTg4OlwiRGlnaXRhbFpvb21SYXRpb1wiLDQxOTg5OlwiRm9jYWxMZW5ndGhJbjM1bW1GaWxtXCIsNDE5OTA6XCJTY2VuZUNhcHR1cmVUeXBlXCIsNDE5OTE6XCJHYWluQ29udHJvbFwiLDQxOTkyOlwiQ29udHJhc3RcIiw0MTk5MzpcIlNhdHVyYXRpb25cIiw0MTk5NDpcIlNoYXJwbmVzc1wiLDQxOTk1OlwiRGV2aWNlU2V0dGluZ0Rlc2NyaXB0aW9uXCIsNDE5OTY6XCJTdWJqZWN0RGlzdGFuY2VSYW5nZVwiLDQyMDE2OlwiSW1hZ2VVbmlxdWVJRFwiLDQyMDMyOlwiQ2FtZXJhT3duZXJOYW1lXCIsNDIwMzM6XCJCb2R5U2VyaWFsTnVtYmVyXCIsNDIwMzQ6XCJMZW5zU3BlY2lmaWNhdGlvblwiLDQyMDM1OlwiTGVuc01ha2VcIiw0MjAzNjpcIkxlbnNNb2RlbFwiLDQyMDM3OlwiTGVuc1NlcmlhbE51bWJlclwiLDA6XCJHUFNWZXJzaW9uSURcIiwxOlwiR1BTTGF0aXR1ZGVSZWZcIiwyOlwiR1BTTGF0aXR1ZGVcIiwzOlwiR1BTTG9uZ2l0dWRlUmVmXCIsNDpcIkdQU0xvbmdpdHVkZVwiLDU6XCJHUFNBbHRpdHVkZVJlZlwiLDY6XCJHUFNBbHRpdHVkZVwiLDc6XCJHUFNUaW1lU3RhbXBcIiw4OlwiR1BTU2F0ZWxsaXRlc1wiLDk6XCJHUFNTdGF0dXNcIiwxMDpcIkdQU01lYXN1cmVNb2RlXCIsMTE6XCJHUFNET1BcIiwxMjpcIkdQU1NwZWVkUmVmXCIsMTM6XCJHUFNTcGVlZFwiLDE0OlwiR1BTVHJhY2tSZWZcIiwxNTpcIkdQU1RyYWNrXCIsMTY6XCJHUFNJbWdEaXJlY3Rpb25SZWZcIiwxNzpcIkdQU0ltZ0RpcmVjdGlvblwiLDE4OlwiR1BTTWFwRGF0dW1cIiwxOTpcIkdQU0Rlc3RMYXRpdHVkZVJlZlwiLDIwOlwiR1BTRGVzdExhdGl0dWRlXCIsMjE6XCJHUFNEZXN0TG9uZ2l0dWRlUmVmXCIsMjI6XCJHUFNEZXN0TG9uZ2l0dWRlXCIsMjM6XCJHUFNEZXN0QmVhcmluZ1JlZlwiLDI0OlwiR1BTRGVzdEJlYXJpbmdcIiwyNTpcIkdQU0Rlc3REaXN0YW5jZVJlZlwiLDI2OlwiR1BTRGVzdERpc3RhbmNlXCIsMjc6XCJHUFNQcm9jZXNzaW5nTWV0aG9kXCIsMjg6XCJHUFNBcmVhSW5mb3JtYXRpb25cIiwyOTpcIkdQU0RhdGVTdGFtcFwiLDMwOlwiR1BTRGlmZmVyZW50aWFsXCIsMzE6XCJHUFNIUG9zaXRpb25pbmdFcnJvclwifSxlLkV4aWZNYXAucHJvdG90eXBlLnN0cmluZ1ZhbHVlcz17RXhwb3N1cmVQcm9ncmFtOnswOlwiVW5kZWZpbmVkXCIsMTpcIk1hbnVhbFwiLDI6XCJOb3JtYWwgcHJvZ3JhbVwiLDM6XCJBcGVydHVyZSBwcmlvcml0eVwiLDQ6XCJTaHV0dGVyIHByaW9yaXR5XCIsNTpcIkNyZWF0aXZlIHByb2dyYW1cIiw2OlwiQWN0aW9uIHByb2dyYW1cIiw3OlwiUG9ydHJhaXQgbW9kZVwiLDg6XCJMYW5kc2NhcGUgbW9kZVwifSxNZXRlcmluZ01vZGU6ezA6XCJVbmtub3duXCIsMTpcIkF2ZXJhZ2VcIiwyOlwiQ2VudGVyV2VpZ2h0ZWRBdmVyYWdlXCIsMzpcIlNwb3RcIiw0OlwiTXVsdGlTcG90XCIsNTpcIlBhdHRlcm5cIiw2OlwiUGFydGlhbFwiLDI1NTpcIk90aGVyXCJ9LExpZ2h0U291cmNlOnswOlwiVW5rbm93blwiLDE6XCJEYXlsaWdodFwiLDI6XCJGbHVvcmVzY2VudFwiLDM6XCJUdW5nc3RlbiAoaW5jYW5kZXNjZW50IGxpZ2h0KVwiLDQ6XCJGbGFzaFwiLDk6XCJGaW5lIHdlYXRoZXJcIiwxMDpcIkNsb3VkeSB3ZWF0aGVyXCIsMTE6XCJTaGFkZVwiLDEyOlwiRGF5bGlnaHQgZmx1b3Jlc2NlbnQgKEQgNTcwMCAtIDcxMDBLKVwiLDEzOlwiRGF5IHdoaXRlIGZsdW9yZXNjZW50IChOIDQ2MDAgLSA1NDAwSylcIiwxNDpcIkNvb2wgd2hpdGUgZmx1b3Jlc2NlbnQgKFcgMzkwMCAtIDQ1MDBLKVwiLDE1OlwiV2hpdGUgZmx1b3Jlc2NlbnQgKFdXIDMyMDAgLSAzNzAwSylcIiwxNzpcIlN0YW5kYXJkIGxpZ2h0IEFcIiwxODpcIlN0YW5kYXJkIGxpZ2h0IEJcIiwxOTpcIlN0YW5kYXJkIGxpZ2h0IENcIiwyMDpcIkQ1NVwiLDIxOlwiRDY1XCIsMjI6XCJENzVcIiwyMzpcIkQ1MFwiLDI0OlwiSVNPIHN0dWRpbyB0dW5nc3RlblwiLDI1NTpcIk90aGVyXCJ9LEZsYXNoOnswOlwiRmxhc2ggZGlkIG5vdCBmaXJlXCIsMTpcIkZsYXNoIGZpcmVkXCIsNTpcIlN0cm9iZSByZXR1cm4gbGlnaHQgbm90IGRldGVjdGVkXCIsNzpcIlN0cm9iZSByZXR1cm4gbGlnaHQgZGV0ZWN0ZWRcIiw5OlwiRmxhc2ggZmlyZWQsIGNvbXB1bHNvcnkgZmxhc2ggbW9kZVwiLDEzOlwiRmxhc2ggZmlyZWQsIGNvbXB1bHNvcnkgZmxhc2ggbW9kZSwgcmV0dXJuIGxpZ2h0IG5vdCBkZXRlY3RlZFwiLDE1OlwiRmxhc2ggZmlyZWQsIGNvbXB1bHNvcnkgZmxhc2ggbW9kZSwgcmV0dXJuIGxpZ2h0IGRldGVjdGVkXCIsMTY6XCJGbGFzaCBkaWQgbm90IGZpcmUsIGNvbXB1bHNvcnkgZmxhc2ggbW9kZVwiLDI0OlwiRmxhc2ggZGlkIG5vdCBmaXJlLCBhdXRvIG1vZGVcIiwyNTpcIkZsYXNoIGZpcmVkLCBhdXRvIG1vZGVcIiwyOTpcIkZsYXNoIGZpcmVkLCBhdXRvIG1vZGUsIHJldHVybiBsaWdodCBub3QgZGV0ZWN0ZWRcIiwzMTpcIkZsYXNoIGZpcmVkLCBhdXRvIG1vZGUsIHJldHVybiBsaWdodCBkZXRlY3RlZFwiLDMyOlwiTm8gZmxhc2ggZnVuY3Rpb25cIiw2NTpcIkZsYXNoIGZpcmVkLCByZWQtZXllIHJlZHVjdGlvbiBtb2RlXCIsNjk6XCJGbGFzaCBmaXJlZCwgcmVkLWV5ZSByZWR1Y3Rpb24gbW9kZSwgcmV0dXJuIGxpZ2h0IG5vdCBkZXRlY3RlZFwiLDcxOlwiRmxhc2ggZmlyZWQsIHJlZC1leWUgcmVkdWN0aW9uIG1vZGUsIHJldHVybiBsaWdodCBkZXRlY3RlZFwiLDczOlwiRmxhc2ggZmlyZWQsIGNvbXB1bHNvcnkgZmxhc2ggbW9kZSwgcmVkLWV5ZSByZWR1Y3Rpb24gbW9kZVwiLDc3OlwiRmxhc2ggZmlyZWQsIGNvbXB1bHNvcnkgZmxhc2ggbW9kZSwgcmVkLWV5ZSByZWR1Y3Rpb24gbW9kZSwgcmV0dXJuIGxpZ2h0IG5vdCBkZXRlY3RlZFwiLDc5OlwiRmxhc2ggZmlyZWQsIGNvbXB1bHNvcnkgZmxhc2ggbW9kZSwgcmVkLWV5ZSByZWR1Y3Rpb24gbW9kZSwgcmV0dXJuIGxpZ2h0IGRldGVjdGVkXCIsODk6XCJGbGFzaCBmaXJlZCwgYXV0byBtb2RlLCByZWQtZXllIHJlZHVjdGlvbiBtb2RlXCIsOTM6XCJGbGFzaCBmaXJlZCwgYXV0byBtb2RlLCByZXR1cm4gbGlnaHQgbm90IGRldGVjdGVkLCByZWQtZXllIHJlZHVjdGlvbiBtb2RlXCIsOTU6XCJGbGFzaCBmaXJlZCwgYXV0byBtb2RlLCByZXR1cm4gbGlnaHQgZGV0ZWN0ZWQsIHJlZC1leWUgcmVkdWN0aW9uIG1vZGVcIn0sU2Vuc2luZ01ldGhvZDp7MTpcIlVuZGVmaW5lZFwiLDI6XCJPbmUtY2hpcCBjb2xvciBhcmVhIHNlbnNvclwiLDM6XCJUd28tY2hpcCBjb2xvciBhcmVhIHNlbnNvclwiLDQ6XCJUaHJlZS1jaGlwIGNvbG9yIGFyZWEgc2Vuc29yXCIsNTpcIkNvbG9yIHNlcXVlbnRpYWwgYXJlYSBzZW5zb3JcIiw3OlwiVHJpbGluZWFyIHNlbnNvclwiLDg6XCJDb2xvciBzZXF1ZW50aWFsIGxpbmVhciBzZW5zb3JcIn0sU2NlbmVDYXB0dXJlVHlwZTp7MDpcIlN0YW5kYXJkXCIsMTpcIkxhbmRzY2FwZVwiLDI6XCJQb3J0cmFpdFwiLDM6XCJOaWdodCBzY2VuZVwifSxTY2VuZVR5cGU6ezE6XCJEaXJlY3RseSBwaG90b2dyYXBoZWRcIn0sQ3VzdG9tUmVuZGVyZWQ6ezA6XCJOb3JtYWwgcHJvY2Vzc1wiLDE6XCJDdXN0b20gcHJvY2Vzc1wifSxXaGl0ZUJhbGFuY2U6ezA6XCJBdXRvIHdoaXRlIGJhbGFuY2VcIiwxOlwiTWFudWFsIHdoaXRlIGJhbGFuY2VcIn0sR2FpbkNvbnRyb2w6ezA6XCJOb25lXCIsMTpcIkxvdyBnYWluIHVwXCIsMjpcIkhpZ2ggZ2FpbiB1cFwiLDM6XCJMb3cgZ2FpbiBkb3duXCIsNDpcIkhpZ2ggZ2FpbiBkb3duXCJ9LENvbnRyYXN0OnswOlwiTm9ybWFsXCIsMTpcIlNvZnRcIiwyOlwiSGFyZFwifSxTYXR1cmF0aW9uOnswOlwiTm9ybWFsXCIsMTpcIkxvdyBzYXR1cmF0aW9uXCIsMjpcIkhpZ2ggc2F0dXJhdGlvblwifSxTaGFycG5lc3M6ezA6XCJOb3JtYWxcIiwxOlwiU29mdFwiLDI6XCJIYXJkXCJ9LFN1YmplY3REaXN0YW5jZVJhbmdlOnswOlwiVW5rbm93blwiLDE6XCJNYWNyb1wiLDI6XCJDbG9zZSB2aWV3XCIsMzpcIkRpc3RhbnQgdmlld1wifSxGaWxlU291cmNlOnszOlwiRFNDXCJ9LENvbXBvbmVudHNDb25maWd1cmF0aW9uOnswOlwiXCIsMTpcIllcIiwyOlwiQ2JcIiwzOlwiQ3JcIiw0OlwiUlwiLDU6XCJHXCIsNjpcIkJcIn0sT3JpZW50YXRpb246ezE6XCJ0b3AtbGVmdFwiLDI6XCJ0b3AtcmlnaHRcIiwzOlwiYm90dG9tLXJpZ2h0XCIsNDpcImJvdHRvbS1sZWZ0XCIsNTpcImxlZnQtdG9wXCIsNjpcInJpZ2h0LXRvcFwiLDc6XCJyaWdodC1ib3R0b21cIiw4OlwibGVmdC1ib3R0b21cIn19LGUuRXhpZk1hcC5wcm90b3R5cGUuZ2V0VGV4dD1mdW5jdGlvbihlKXt2YXIgdD10aGlzLmdldChlKTtzd2l0Y2goZSl7Y2FzZVwiTGlnaHRTb3VyY2VcIjpjYXNlXCJGbGFzaFwiOmNhc2VcIk1ldGVyaW5nTW9kZVwiOmNhc2VcIkV4cG9zdXJlUHJvZ3JhbVwiOmNhc2VcIlNlbnNpbmdNZXRob2RcIjpjYXNlXCJTY2VuZUNhcHR1cmVUeXBlXCI6Y2FzZVwiU2NlbmVUeXBlXCI6Y2FzZVwiQ3VzdG9tUmVuZGVyZWRcIjpjYXNlXCJXaGl0ZUJhbGFuY2VcIjpjYXNlXCJHYWluQ29udHJvbFwiOmNhc2VcIkNvbnRyYXN0XCI6Y2FzZVwiU2F0dXJhdGlvblwiOmNhc2VcIlNoYXJwbmVzc1wiOmNhc2VcIlN1YmplY3REaXN0YW5jZVJhbmdlXCI6Y2FzZVwiRmlsZVNvdXJjZVwiOmNhc2VcIk9yaWVudGF0aW9uXCI6cmV0dXJuIHRoaXMuc3RyaW5nVmFsdWVzW2VdW3RdO2Nhc2VcIkV4aWZWZXJzaW9uXCI6Y2FzZVwiRmxhc2hwaXhWZXJzaW9uXCI6cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodFswXSx0WzFdLHRbMl0sdFszXSk7Y2FzZVwiQ29tcG9uZW50c0NvbmZpZ3VyYXRpb25cIjpyZXR1cm4gdGhpcy5zdHJpbmdWYWx1ZXNbZV1bdFswXV0rdGhpcy5zdHJpbmdWYWx1ZXNbZV1bdFsxXV0rdGhpcy5zdHJpbmdWYWx1ZXNbZV1bdFsyXV0rdGhpcy5zdHJpbmdWYWx1ZXNbZV1bdFszXV07Y2FzZVwiR1BTVmVyc2lvbklEXCI6cmV0dXJuIHRbMF0rXCIuXCIrdFsxXStcIi5cIit0WzJdK1wiLlwiK3RbM119cmV0dXJuIFN0cmluZyh0KX0sZnVuY3Rpb24oZSl7dmFyIHQsaT1lLnRhZ3MsYT1lLm1hcDtmb3IodCBpbiBpKWkuaGFzT3duUHJvcGVydHkodCkmJihhW2lbdF1dPXQpfShlLkV4aWZNYXAucHJvdG90eXBlKSxlLkV4aWZNYXAucHJvdG90eXBlLmdldEFsbD1mdW5jdGlvbigpe3ZhciBlLHQsaT17fTtmb3IoZSBpbiB0aGlzKXRoaXMuaGFzT3duUHJvcGVydHkoZSkmJih0PXRoaXMudGFnc1tlXSx0JiYoaVt0XT10aGlzLmdldFRleHQodCkpKTtyZXR1cm4gaX19KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvYWQtaW1hZ2UuYWxsLm1pbi5qcy5tYXAiLCIhZnVuY3Rpb24odCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9dC5IVE1MQ2FudmFzRWxlbWVudCYmdC5IVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUsbz10LkJsb2ImJmZ1bmN0aW9uKCl7dHJ5e3JldHVybiBCb29sZWFuKG5ldyBCbG9iKX1jYXRjaCh0KXtyZXR1cm4hMX19KCksbj1vJiZ0LlVpbnQ4QXJyYXkmJmZ1bmN0aW9uKCl7dHJ5e3JldHVybiAxMDA9PT1uZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoMTAwKV0pLnNpemV9Y2F0Y2godCl7cmV0dXJuITF9fSgpLHI9dC5CbG9iQnVpbGRlcnx8dC5XZWJLaXRCbG9iQnVpbGRlcnx8dC5Nb3pCbG9iQnVpbGRlcnx8dC5NU0Jsb2JCdWlsZGVyLGE9L15kYXRhOigoLio/KSg7Y2hhcnNldD0uKj8pPykoO2Jhc2U2NCk/LC8saT0ob3x8cikmJnQuYXRvYiYmdC5BcnJheUJ1ZmZlciYmdC5VaW50OEFycmF5JiZmdW5jdGlvbih0KXt2YXIgZSxpLGwsdSxiLGMsZCxCLGY7aWYoZT10Lm1hdGNoKGEpLCFlKXRocm93IG5ldyBFcnJvcihcImludmFsaWQgZGF0YSBVUklcIik7Zm9yKGk9ZVsyXT9lWzFdOlwidGV4dC9wbGFpblwiKyhlWzNdfHxcIjtjaGFyc2V0PVVTLUFTQ0lJXCIpLGw9ISFlWzRdLHU9dC5zbGljZShlWzBdLmxlbmd0aCksYj1sP2F0b2IodSk6ZGVjb2RlVVJJQ29tcG9uZW50KHUpLGM9bmV3IEFycmF5QnVmZmVyKGIubGVuZ3RoKSxkPW5ldyBVaW50OEFycmF5KGMpLEI9MDtCPGIubGVuZ3RoO0IrPTEpZFtCXT1iLmNoYXJDb2RlQXQoQik7cmV0dXJuIG8/bmV3IEJsb2IoW24/ZDpjXSx7dHlwZTppfSk6KGY9bmV3IHIsZi5hcHBlbmQoYyksZi5nZXRCbG9iKGkpKX07dC5IVE1MQ2FudmFzRWxlbWVudCYmIWUudG9CbG9iJiYoZS5tb3pHZXRBc0ZpbGU/ZS50b0Jsb2I9ZnVuY3Rpb24odCxvLG4pe3QobiYmZS50b0RhdGFVUkwmJmk/aSh0aGlzLnRvRGF0YVVSTChvLG4pKTp0aGlzLm1vekdldEFzRmlsZShcImJsb2JcIixvKSl9OmUudG9EYXRhVVJMJiZpJiYoZS50b0Jsb2I9ZnVuY3Rpb24odCxlLG8pe3QoaSh0aGlzLnRvRGF0YVVSTChlLG8pKSl9KSksXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBpfSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9aTp0LmRhdGFVUkx0b0Jsb2I9aX0od2luZG93KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhbnZhcy10by1ibG9iLm1pbi5qcy5tYXAiLCIhZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZnVuY3Rpb24oZSx0KXt2YXIgcj0vW15cXHdcXC1cXC46XS8udGVzdChlKT9uZXcgRnVuY3Rpb24obi5hcmcrXCIsdG1wbFwiLFwidmFyIF9lPXRtcGwuZW5jb2RlXCIrbi5oZWxwZXIrXCIsX3M9J1wiK2UucmVwbGFjZShuLnJlZ2V4cCxuLmZ1bmMpK1wiJztyZXR1cm4gX3M7XCIpOm4uY2FjaGVbZV09bi5jYWNoZVtlXXx8bihuLmxvYWQoZSkpO3JldHVybiB0P3IodCxuKTpmdW5jdGlvbihlKXtyZXR1cm4gcihlLG4pfX07bi5jYWNoZT17fSxuLmxvYWQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUpLmlubmVySFRNTH0sbi5yZWdleHA9LyhbXFxzJ1xcXFxdKSg/ISg/Oltee118XFx7KD8hJSkpKiVcXH0pfCg/OlxceyUoPXwjKShbXFxzXFxTXSs/KSVcXH0pfChcXHslKXwoJVxcfSkvZyxuLmZ1bmM9ZnVuY3Rpb24oZSxuLHQscixjLHUpe3JldHVybiBuP3tcIlxcblwiOlwiXFxcXG5cIixcIlxcclwiOlwiXFxcXHJcIixcIlx0XCI6XCJcXFxcdFwiLFwiIFwiOlwiIFwifVtuXXx8XCJcXFxcXCIrbjp0P1wiPVwiPT09dD9cIicrX2UoXCIrcitcIikrJ1wiOlwiJysoXCIrcitcIj09bnVsbD8nJzpcIityK1wiKSsnXCI6Yz9cIic7XCI6dT9cIl9zKz0nXCI6dm9pZCAwfSxuLmVuY1JlZz0vWzw+JlwiJ1xceDAwXS9nLG4uZW5jTWFwPXtcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIixcIiZcIjpcIiZhbXA7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiMzOTtcIn0sbi5lbmNvZGU9ZnVuY3Rpb24oZSl7cmV0dXJuKG51bGw9PWU/XCJcIjpcIlwiK2UpLnJlcGxhY2Uobi5lbmNSZWcsZnVuY3Rpb24oZSl7cmV0dXJuIG4uZW5jTWFwW2VdfHxcIlwifSl9LG4uYXJnPVwib1wiLG4uaGVscGVyPVwiLHByaW50PWZ1bmN0aW9uKHMsZSl7X3MrPWU/KHM9PW51bGw/Jyc6cyk6X2Uocyk7fSxpbmNsdWRlPWZ1bmN0aW9uKHMsZCl7X3MrPXRtcGwocyxkKTt9XCIsXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBufSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9bjplLnRtcGw9bn0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10bXBsLm1pbi5qcy5tYXAiLCIvKiEgalF1ZXJ5IFVJIC0gdjEuMTEuNCtDb21tb25KUyAtIDIwMTUtMDgtMjhcbiogaHR0cDovL2pxdWVyeXVpLmNvbVxuKiBJbmNsdWRlczogd2lkZ2V0LmpzXG4qIENvcHlyaWdodCAyMDE1IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnM7IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24oIGZhY3RvcnkgKSB7XG5cdGlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cblx0XHQvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG5cdFx0ZGVmaW5lKFsgXCJqcXVlcnlcIiBdLCBmYWN0b3J5ICk7XG5cblx0fSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyBOb2RlL0NvbW1vbkpTXG5cdFx0ZmFjdG9yeSggcmVxdWlyZSggXCJqcXVlcnlcIiApICk7XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIEJyb3dzZXIgZ2xvYmFsc1xuXHRcdGZhY3RvcnkoIGpRdWVyeSApO1xuXHR9XG59KGZ1bmN0aW9uKCAkICkge1xuLyohXG4gKiBqUXVlcnkgVUkgV2lkZ2V0IDEuMTEuNFxuICogaHR0cDovL2pxdWVyeXVpLmNvbVxuICpcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogaHR0cDovL2FwaS5qcXVlcnl1aS5jb20valF1ZXJ5LndpZGdldC9cbiAqL1xuXG5cbnZhciB3aWRnZXRfdXVpZCA9IDAsXG5cdHdpZGdldF9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuJC5jbGVhbkRhdGEgPSAoZnVuY3Rpb24oIG9yaWcgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cdFx0dmFyIGV2ZW50cywgZWxlbSwgaTtcblx0XHRmb3IgKCBpID0gMDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0dHJ5IHtcblxuXHRcdFx0XHQvLyBPbmx5IHRyaWdnZXIgcmVtb3ZlIHdoZW4gbmVjZXNzYXJ5IHRvIHNhdmUgdGltZVxuXHRcdFx0XHRldmVudHMgPSAkLl9kYXRhKCBlbGVtLCBcImV2ZW50c1wiICk7XG5cdFx0XHRcdGlmICggZXZlbnRzICYmIGV2ZW50cy5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0JCggZWxlbSApLnRyaWdnZXJIYW5kbGVyKCBcInJlbW92ZVwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvODIzNVxuXHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXHRcdH1cblx0XHRvcmlnKCBlbGVtcyApO1xuXHR9O1xufSkoICQuY2xlYW5EYXRhICk7XG5cbiQud2lkZ2V0ID0gZnVuY3Rpb24oIG5hbWUsIGJhc2UsIHByb3RvdHlwZSApIHtcblx0dmFyIGZ1bGxOYW1lLCBleGlzdGluZ0NvbnN0cnVjdG9yLCBjb25zdHJ1Y3RvciwgYmFzZVByb3RvdHlwZSxcblx0XHQvLyBwcm94aWVkUHJvdG90eXBlIGFsbG93cyB0aGUgcHJvdmlkZWQgcHJvdG90eXBlIHRvIHJlbWFpbiB1bm1vZGlmaWVkXG5cdFx0Ly8gc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBhcyBhIG1peGluIGZvciBtdWx0aXBsZSB3aWRnZXRzICgjODg3Nilcblx0XHRwcm94aWVkUHJvdG90eXBlID0ge30sXG5cdFx0bmFtZXNwYWNlID0gbmFtZS5zcGxpdCggXCIuXCIgKVsgMCBdO1xuXG5cdG5hbWUgPSBuYW1lLnNwbGl0KCBcIi5cIiApWyAxIF07XG5cdGZ1bGxOYW1lID0gbmFtZXNwYWNlICsgXCItXCIgKyBuYW1lO1xuXG5cdGlmICggIXByb3RvdHlwZSApIHtcblx0XHRwcm90b3R5cGUgPSBiYXNlO1xuXHRcdGJhc2UgPSAkLldpZGdldDtcblx0fVxuXG5cdC8vIGNyZWF0ZSBzZWxlY3RvciBmb3IgcGx1Z2luXG5cdCQuZXhwclsgXCI6XCIgXVsgZnVsbE5hbWUudG9Mb3dlckNhc2UoKSBdID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuICEhJC5kYXRhKCBlbGVtLCBmdWxsTmFtZSApO1xuXHR9O1xuXG5cdCRbIG5hbWVzcGFjZSBdID0gJFsgbmFtZXNwYWNlIF0gfHwge307XG5cdGV4aXN0aW5nQ29uc3RydWN0b3IgPSAkWyBuYW1lc3BhY2UgXVsgbmFtZSBdO1xuXHRjb25zdHJ1Y3RvciA9ICRbIG5hbWVzcGFjZSBdWyBuYW1lIF0gPSBmdW5jdGlvbiggb3B0aW9ucywgZWxlbWVudCApIHtcblx0XHQvLyBhbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgXCJuZXdcIiBrZXl3b3JkXG5cdFx0aWYgKCAhdGhpcy5fY3JlYXRlV2lkZ2V0ICkge1xuXHRcdFx0cmV0dXJuIG5ldyBjb25zdHJ1Y3Rvciggb3B0aW9ucywgZWxlbWVudCApO1xuXHRcdH1cblxuXHRcdC8vIGFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCBpbml0aWFsaXppbmcgZm9yIHNpbXBsZSBpbmhlcml0YW5jZVxuXHRcdC8vIG11c3QgdXNlIFwibmV3XCIga2V5d29yZCAodGhlIGNvZGUgYWJvdmUgYWx3YXlzIHBhc3NlcyBhcmdzKVxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHRoaXMuX2NyZWF0ZVdpZGdldCggb3B0aW9ucywgZWxlbWVudCApO1xuXHRcdH1cblx0fTtcblx0Ly8gZXh0ZW5kIHdpdGggdGhlIGV4aXN0aW5nIGNvbnN0cnVjdG9yIHRvIGNhcnJ5IG92ZXIgYW55IHN0YXRpYyBwcm9wZXJ0aWVzXG5cdCQuZXh0ZW5kKCBjb25zdHJ1Y3RvciwgZXhpc3RpbmdDb25zdHJ1Y3Rvciwge1xuXHRcdHZlcnNpb246IHByb3RvdHlwZS52ZXJzaW9uLFxuXHRcdC8vIGNvcHkgdGhlIG9iamVjdCB1c2VkIHRvIGNyZWF0ZSB0aGUgcHJvdG90eXBlIGluIGNhc2Ugd2UgbmVlZCB0b1xuXHRcdC8vIHJlZGVmaW5lIHRoZSB3aWRnZXQgbGF0ZXJcblx0XHRfcHJvdG86ICQuZXh0ZW5kKCB7fSwgcHJvdG90eXBlICksXG5cdFx0Ly8gdHJhY2sgd2lkZ2V0cyB0aGF0IGluaGVyaXQgZnJvbSB0aGlzIHdpZGdldCBpbiBjYXNlIHRoaXMgd2lkZ2V0IGlzXG5cdFx0Ly8gcmVkZWZpbmVkIGFmdGVyIGEgd2lkZ2V0IGluaGVyaXRzIGZyb20gaXRcblx0XHRfY2hpbGRDb25zdHJ1Y3RvcnM6IFtdXG5cdH0pO1xuXG5cdGJhc2VQcm90b3R5cGUgPSBuZXcgYmFzZSgpO1xuXHQvLyB3ZSBuZWVkIHRvIG1ha2UgdGhlIG9wdGlvbnMgaGFzaCBhIHByb3BlcnR5IGRpcmVjdGx5IG9uIHRoZSBuZXcgaW5zdGFuY2Vcblx0Ly8gb3RoZXJ3aXNlIHdlJ2xsIG1vZGlmeSB0aGUgb3B0aW9ucyBoYXNoIG9uIHRoZSBwcm90b3R5cGUgdGhhdCB3ZSdyZVxuXHQvLyBpbmhlcml0aW5nIGZyb21cblx0YmFzZVByb3RvdHlwZS5vcHRpb25zID0gJC53aWRnZXQuZXh0ZW5kKCB7fSwgYmFzZVByb3RvdHlwZS5vcHRpb25zICk7XG5cdCQuZWFjaCggcHJvdG90eXBlLCBmdW5jdGlvbiggcHJvcCwgdmFsdWUgKSB7XG5cdFx0aWYgKCAhJC5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cHJveGllZFByb3RvdHlwZVsgcHJvcCBdID0gdmFsdWU7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHByb3hpZWRQcm90b3R5cGVbIHByb3AgXSA9IChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBfc3VwZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gYmFzZS5wcm90b3R5cGVbIHByb3AgXS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdF9zdXBlckFwcGx5ID0gZnVuY3Rpb24oIGFyZ3MgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJhc2UucHJvdG90eXBlWyBwcm9wIF0uYXBwbHkoIHRoaXMsIGFyZ3MgKTtcblx0XHRcdFx0fTtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIF9fc3VwZXIgPSB0aGlzLl9zdXBlcixcblx0XHRcdFx0XHRfX3N1cGVyQXBwbHkgPSB0aGlzLl9zdXBlckFwcGx5LFxuXHRcdFx0XHRcdHJldHVyblZhbHVlO1xuXG5cdFx0XHRcdHRoaXMuX3N1cGVyID0gX3N1cGVyO1xuXHRcdFx0XHR0aGlzLl9zdXBlckFwcGx5ID0gX3N1cGVyQXBwbHk7XG5cblx0XHRcdFx0cmV0dXJuVmFsdWUgPSB2YWx1ZS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cblx0XHRcdFx0dGhpcy5fc3VwZXIgPSBfX3N1cGVyO1xuXHRcdFx0XHR0aGlzLl9zdXBlckFwcGx5ID0gX19zdXBlckFwcGx5O1xuXG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblx0fSk7XG5cdGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQud2lkZ2V0LmV4dGVuZCggYmFzZVByb3RvdHlwZSwge1xuXHRcdC8vIFRPRE86IHJlbW92ZSBzdXBwb3J0IGZvciB3aWRnZXRFdmVudFByZWZpeFxuXHRcdC8vIGFsd2F5cyB1c2UgdGhlIG5hbWUgKyBhIGNvbG9uIGFzIHRoZSBwcmVmaXgsIGUuZy4sIGRyYWdnYWJsZTpzdGFydFxuXHRcdC8vIGRvbid0IHByZWZpeCBmb3Igd2lkZ2V0cyB0aGF0IGFyZW4ndCBET00tYmFzZWRcblx0XHR3aWRnZXRFdmVudFByZWZpeDogZXhpc3RpbmdDb25zdHJ1Y3RvciA/IChiYXNlUHJvdG90eXBlLndpZGdldEV2ZW50UHJlZml4IHx8IG5hbWUpIDogbmFtZVxuXHR9LCBwcm94aWVkUHJvdG90eXBlLCB7XG5cdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdG5hbWVzcGFjZTogbmFtZXNwYWNlLFxuXHRcdHdpZGdldE5hbWU6IG5hbWUsXG5cdFx0d2lkZ2V0RnVsbE5hbWU6IGZ1bGxOYW1lXG5cdH0pO1xuXG5cdC8vIElmIHRoaXMgd2lkZ2V0IGlzIGJlaW5nIHJlZGVmaW5lZCB0aGVuIHdlIG5lZWQgdG8gZmluZCBhbGwgd2lkZ2V0cyB0aGF0XG5cdC8vIGFyZSBpbmhlcml0aW5nIGZyb20gaXQgYW5kIHJlZGVmaW5lIGFsbCBvZiB0aGVtIHNvIHRoYXQgdGhleSBpbmhlcml0IGZyb21cblx0Ly8gdGhlIG5ldyB2ZXJzaW9uIG9mIHRoaXMgd2lkZ2V0LiBXZSdyZSBlc3NlbnRpYWxseSB0cnlpbmcgdG8gcmVwbGFjZSBvbmVcblx0Ly8gbGV2ZWwgaW4gdGhlIHByb3RvdHlwZSBjaGFpbi5cblx0aWYgKCBleGlzdGluZ0NvbnN0cnVjdG9yICkge1xuXHRcdCQuZWFjaCggZXhpc3RpbmdDb25zdHJ1Y3Rvci5fY2hpbGRDb25zdHJ1Y3RvcnMsIGZ1bmN0aW9uKCBpLCBjaGlsZCApIHtcblx0XHRcdHZhciBjaGlsZFByb3RvdHlwZSA9IGNoaWxkLnByb3RvdHlwZTtcblxuXHRcdFx0Ly8gcmVkZWZpbmUgdGhlIGNoaWxkIHdpZGdldCB1c2luZyB0aGUgc2FtZSBwcm90b3R5cGUgdGhhdCB3YXNcblx0XHRcdC8vIG9yaWdpbmFsbHkgdXNlZCwgYnV0IGluaGVyaXQgZnJvbSB0aGUgbmV3IHZlcnNpb24gb2YgdGhlIGJhc2Vcblx0XHRcdCQud2lkZ2V0KCBjaGlsZFByb3RvdHlwZS5uYW1lc3BhY2UgKyBcIi5cIiArIGNoaWxkUHJvdG90eXBlLndpZGdldE5hbWUsIGNvbnN0cnVjdG9yLCBjaGlsZC5fcHJvdG8gKTtcblx0XHR9KTtcblx0XHQvLyByZW1vdmUgdGhlIGxpc3Qgb2YgZXhpc3RpbmcgY2hpbGQgY29uc3RydWN0b3JzIGZyb20gdGhlIG9sZCBjb25zdHJ1Y3RvclxuXHRcdC8vIHNvIHRoZSBvbGQgY2hpbGQgY29uc3RydWN0b3JzIGNhbiBiZSBnYXJiYWdlIGNvbGxlY3RlZFxuXHRcdGRlbGV0ZSBleGlzdGluZ0NvbnN0cnVjdG9yLl9jaGlsZENvbnN0cnVjdG9ycztcblx0fSBlbHNlIHtcblx0XHRiYXNlLl9jaGlsZENvbnN0cnVjdG9ycy5wdXNoKCBjb25zdHJ1Y3RvciApO1xuXHR9XG5cblx0JC53aWRnZXQuYnJpZGdlKCBuYW1lLCBjb25zdHJ1Y3RvciApO1xuXG5cdHJldHVybiBjb25zdHJ1Y3Rvcjtcbn07XG5cbiQud2lkZ2V0LmV4dGVuZCA9IGZ1bmN0aW9uKCB0YXJnZXQgKSB7XG5cdHZhciBpbnB1dCA9IHdpZGdldF9zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSxcblx0XHRpbnB1dEluZGV4ID0gMCxcblx0XHRpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0XHRrZXksXG5cdFx0dmFsdWU7XG5cdGZvciAoIDsgaW5wdXRJbmRleCA8IGlucHV0TGVuZ3RoOyBpbnB1dEluZGV4KysgKSB7XG5cdFx0Zm9yICgga2V5IGluIGlucHV0WyBpbnB1dEluZGV4IF0gKSB7XG5cdFx0XHR2YWx1ZSA9IGlucHV0WyBpbnB1dEluZGV4IF1bIGtleSBdO1xuXHRcdFx0aWYgKCBpbnB1dFsgaW5wdXRJbmRleCBdLmhhc093blByb3BlcnR5KCBrZXkgKSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHQvLyBDbG9uZSBvYmplY3RzXG5cdFx0XHRcdGlmICggJC5pc1BsYWluT2JqZWN0KCB2YWx1ZSApICkge1xuXHRcdFx0XHRcdHRhcmdldFsga2V5IF0gPSAkLmlzUGxhaW5PYmplY3QoIHRhcmdldFsga2V5IF0gKSA/XG5cdFx0XHRcdFx0XHQkLndpZGdldC5leHRlbmQoIHt9LCB0YXJnZXRbIGtleSBdLCB2YWx1ZSApIDpcblx0XHRcdFx0XHRcdC8vIERvbid0IGV4dGVuZCBzdHJpbmdzLCBhcnJheXMsIGV0Yy4gd2l0aCBvYmplY3RzXG5cdFx0XHRcdFx0XHQkLndpZGdldC5leHRlbmQoIHt9LCB2YWx1ZSApO1xuXHRcdFx0XHQvLyBDb3B5IGV2ZXJ5dGhpbmcgZWxzZSBieSByZWZlcmVuY2Vcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YXJnZXRbIGtleSBdID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbiQud2lkZ2V0LmJyaWRnZSA9IGZ1bmN0aW9uKCBuYW1lLCBvYmplY3QgKSB7XG5cdHZhciBmdWxsTmFtZSA9IG9iamVjdC5wcm90b3R5cGUud2lkZ2V0RnVsbE5hbWUgfHwgbmFtZTtcblx0JC5mblsgbmFtZSBdID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdFx0dmFyIGlzTWV0aG9kQ2FsbCA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiLFxuXHRcdFx0YXJncyA9IHdpZGdldF9zbGljZS5jYWxsKCBhcmd1bWVudHMsIDEgKSxcblx0XHRcdHJldHVyblZhbHVlID0gdGhpcztcblxuXHRcdGlmICggaXNNZXRob2RDYWxsICkge1xuXHRcdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgbWV0aG9kVmFsdWUsXG5cdFx0XHRcdFx0aW5zdGFuY2UgPSAkLmRhdGEoIHRoaXMsIGZ1bGxOYW1lICk7XG5cdFx0XHRcdGlmICggb3B0aW9ucyA9PT0gXCJpbnN0YW5jZVwiICkge1xuXHRcdFx0XHRcdHJldHVyblZhbHVlID0gaW5zdGFuY2U7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggIWluc3RhbmNlICkge1xuXHRcdFx0XHRcdHJldHVybiAkLmVycm9yKCBcImNhbm5vdCBjYWxsIG1ldGhvZHMgb24gXCIgKyBuYW1lICsgXCIgcHJpb3IgdG8gaW5pdGlhbGl6YXRpb247IFwiICtcblx0XHRcdFx0XHRcdFwiYXR0ZW1wdGVkIHRvIGNhbGwgbWV0aG9kICdcIiArIG9wdGlvbnMgKyBcIidcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggISQuaXNGdW5jdGlvbiggaW5zdGFuY2Vbb3B0aW9uc10gKSB8fCBvcHRpb25zLmNoYXJBdCggMCApID09PSBcIl9cIiApIHtcblx0XHRcdFx0XHRyZXR1cm4gJC5lcnJvciggXCJubyBzdWNoIG1ldGhvZCAnXCIgKyBvcHRpb25zICsgXCInIGZvciBcIiArIG5hbWUgKyBcIiB3aWRnZXQgaW5zdGFuY2VcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG1ldGhvZFZhbHVlID0gaW5zdGFuY2VbIG9wdGlvbnMgXS5hcHBseSggaW5zdGFuY2UsIGFyZ3MgKTtcblx0XHRcdFx0aWYgKCBtZXRob2RWYWx1ZSAhPT0gaW5zdGFuY2UgJiYgbWV0aG9kVmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZSA9IG1ldGhvZFZhbHVlICYmIG1ldGhvZFZhbHVlLmpxdWVyeSA/XG5cdFx0XHRcdFx0XHRyZXR1cm5WYWx1ZS5wdXNoU3RhY2soIG1ldGhvZFZhbHVlLmdldCgpICkgOlxuXHRcdFx0XHRcdFx0bWV0aG9kVmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBBbGxvdyBtdWx0aXBsZSBoYXNoZXMgdG8gYmUgcGFzc2VkIG9uIGluaXRcblx0XHRcdGlmICggYXJncy5sZW5ndGggKSB7XG5cdFx0XHRcdG9wdGlvbnMgPSAkLndpZGdldC5leHRlbmQuYXBwbHkoIG51bGwsIFsgb3B0aW9ucyBdLmNvbmNhdChhcmdzKSApO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBpbnN0YW5jZSA9ICQuZGF0YSggdGhpcywgZnVsbE5hbWUgKTtcblx0XHRcdFx0aWYgKCBpbnN0YW5jZSApIHtcblx0XHRcdFx0XHRpbnN0YW5jZS5vcHRpb24oIG9wdGlvbnMgfHwge30gKTtcblx0XHRcdFx0XHRpZiAoIGluc3RhbmNlLl9pbml0ICkge1xuXHRcdFx0XHRcdFx0aW5zdGFuY2UuX2luaXQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JC5kYXRhKCB0aGlzLCBmdWxsTmFtZSwgbmV3IG9iamVjdCggb3B0aW9ucywgdGhpcyApICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXR1cm5WYWx1ZTtcblx0fTtcbn07XG5cbiQuV2lkZ2V0ID0gZnVuY3Rpb24oIC8qIG9wdGlvbnMsIGVsZW1lbnQgKi8gKSB7fTtcbiQuV2lkZ2V0Ll9jaGlsZENvbnN0cnVjdG9ycyA9IFtdO1xuXG4kLldpZGdldC5wcm90b3R5cGUgPSB7XG5cdHdpZGdldE5hbWU6IFwid2lkZ2V0XCIsXG5cdHdpZGdldEV2ZW50UHJlZml4OiBcIlwiLFxuXHRkZWZhdWx0RWxlbWVudDogXCI8ZGl2PlwiLFxuXHRvcHRpb25zOiB7XG5cdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXG5cdFx0Ly8gY2FsbGJhY2tzXG5cdFx0Y3JlYXRlOiBudWxsXG5cdH0sXG5cdF9jcmVhdGVXaWRnZXQ6IGZ1bmN0aW9uKCBvcHRpb25zLCBlbGVtZW50ICkge1xuXHRcdGVsZW1lbnQgPSAkKCBlbGVtZW50IHx8IHRoaXMuZGVmYXVsdEVsZW1lbnQgfHwgdGhpcyApWyAwIF07XG5cdFx0dGhpcy5lbGVtZW50ID0gJCggZWxlbWVudCApO1xuXHRcdHRoaXMudXVpZCA9IHdpZGdldF91dWlkKys7XG5cdFx0dGhpcy5ldmVudE5hbWVzcGFjZSA9IFwiLlwiICsgdGhpcy53aWRnZXROYW1lICsgdGhpcy51dWlkO1xuXG5cdFx0dGhpcy5iaW5kaW5ncyA9ICQoKTtcblx0XHR0aGlzLmhvdmVyYWJsZSA9ICQoKTtcblx0XHR0aGlzLmZvY3VzYWJsZSA9ICQoKTtcblxuXHRcdGlmICggZWxlbWVudCAhPT0gdGhpcyApIHtcblx0XHRcdCQuZGF0YSggZWxlbWVudCwgdGhpcy53aWRnZXRGdWxsTmFtZSwgdGhpcyApO1xuXHRcdFx0dGhpcy5fb24oIHRydWUsIHRoaXMuZWxlbWVudCwge1xuXHRcdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0XHRpZiAoIGV2ZW50LnRhcmdldCA9PT0gZWxlbWVudCApIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmRvY3VtZW50ID0gJCggZWxlbWVudC5zdHlsZSA/XG5cdFx0XHRcdC8vIGVsZW1lbnQgd2l0aGluIHRoZSBkb2N1bWVudFxuXHRcdFx0XHRlbGVtZW50Lm93bmVyRG9jdW1lbnQgOlxuXHRcdFx0XHQvLyBlbGVtZW50IGlzIHdpbmRvdyBvciBkb2N1bWVudFxuXHRcdFx0XHRlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQgKTtcblx0XHRcdHRoaXMud2luZG93ID0gJCggdGhpcy5kb2N1bWVudFswXS5kZWZhdWx0VmlldyB8fCB0aGlzLmRvY3VtZW50WzBdLnBhcmVudFdpbmRvdyApO1xuXHRcdH1cblxuXHRcdHRoaXMub3B0aW9ucyA9ICQud2lkZ2V0LmV4dGVuZCgge30sXG5cdFx0XHR0aGlzLm9wdGlvbnMsXG5cdFx0XHR0aGlzLl9nZXRDcmVhdGVPcHRpb25zKCksXG5cdFx0XHRvcHRpb25zICk7XG5cblx0XHR0aGlzLl9jcmVhdGUoKTtcblx0XHR0aGlzLl90cmlnZ2VyKCBcImNyZWF0ZVwiLCBudWxsLCB0aGlzLl9nZXRDcmVhdGVFdmVudERhdGEoKSApO1xuXHRcdHRoaXMuX2luaXQoKTtcblx0fSxcblx0X2dldENyZWF0ZU9wdGlvbnM6ICQubm9vcCxcblx0X2dldENyZWF0ZUV2ZW50RGF0YTogJC5ub29wLFxuXHRfY3JlYXRlOiAkLm5vb3AsXG5cdF9pbml0OiAkLm5vb3AsXG5cblx0ZGVzdHJveTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5fZGVzdHJveSgpO1xuXHRcdC8vIHdlIGNhbiBwcm9iYWJseSByZW1vdmUgdGhlIHVuYmluZCBjYWxscyBpbiAyLjBcblx0XHQvLyBhbGwgZXZlbnQgYmluZGluZ3Mgc2hvdWxkIGdvIHRocm91Z2ggdGhpcy5fb24oKVxuXHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0LnVuYmluZCggdGhpcy5ldmVudE5hbWVzcGFjZSApXG5cdFx0XHQucmVtb3ZlRGF0YSggdGhpcy53aWRnZXRGdWxsTmFtZSApXG5cdFx0XHQvLyBzdXBwb3J0OiBqcXVlcnkgPDEuNi4zXG5cdFx0XHQvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC85NDEzXG5cdFx0XHQucmVtb3ZlRGF0YSggJC5jYW1lbENhc2UoIHRoaXMud2lkZ2V0RnVsbE5hbWUgKSApO1xuXHRcdHRoaXMud2lkZ2V0KClcblx0XHRcdC51bmJpbmQoIHRoaXMuZXZlbnROYW1lc3BhY2UgKVxuXHRcdFx0LnJlbW92ZUF0dHIoIFwiYXJpYS1kaXNhYmxlZFwiIClcblx0XHRcdC5yZW1vdmVDbGFzcyhcblx0XHRcdFx0dGhpcy53aWRnZXRGdWxsTmFtZSArIFwiLWRpc2FibGVkIFwiICtcblx0XHRcdFx0XCJ1aS1zdGF0ZS1kaXNhYmxlZFwiICk7XG5cblx0XHQvLyBjbGVhbiB1cCBldmVudHMgYW5kIHN0YXRlc1xuXHRcdHRoaXMuYmluZGluZ3MudW5iaW5kKCB0aGlzLmV2ZW50TmFtZXNwYWNlICk7XG5cdFx0dGhpcy5ob3ZlcmFibGUucmVtb3ZlQ2xhc3MoIFwidWktc3RhdGUtaG92ZXJcIiApO1xuXHRcdHRoaXMuZm9jdXNhYmxlLnJlbW92ZUNsYXNzKCBcInVpLXN0YXRlLWZvY3VzXCIgKTtcblx0fSxcblx0X2Rlc3Ryb3k6ICQubm9vcCxcblxuXHR3aWRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XG5cdH0sXG5cblx0b3B0aW9uOiBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHR2YXIgb3B0aW9ucyA9IGtleSxcblx0XHRcdHBhcnRzLFxuXHRcdFx0Y3VyT3B0aW9uLFxuXHRcdFx0aTtcblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdC8vIGRvbid0IHJldHVybiBhIHJlZmVyZW5jZSB0byB0aGUgaW50ZXJuYWwgaGFzaFxuXHRcdFx0cmV0dXJuICQud2lkZ2V0LmV4dGVuZCgge30sIHRoaXMub3B0aW9ucyApO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdC8vIGhhbmRsZSBuZXN0ZWQga2V5cywgZS5nLiwgXCJmb28uYmFyXCIgPT4geyBmb286IHsgYmFyOiBfX18gfSB9XG5cdFx0XHRvcHRpb25zID0ge307XG5cdFx0XHRwYXJ0cyA9IGtleS5zcGxpdCggXCIuXCIgKTtcblx0XHRcdGtleSA9IHBhcnRzLnNoaWZ0KCk7XG5cdFx0XHRpZiAoIHBhcnRzLmxlbmd0aCApIHtcblx0XHRcdFx0Y3VyT3B0aW9uID0gb3B0aW9uc1sga2V5IF0gPSAkLndpZGdldC5leHRlbmQoIHt9LCB0aGlzLm9wdGlvbnNbIGtleSBdICk7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoIC0gMTsgaSsrICkge1xuXHRcdFx0XHRcdGN1ck9wdGlvblsgcGFydHNbIGkgXSBdID0gY3VyT3B0aW9uWyBwYXJ0c1sgaSBdIF0gfHwge307XG5cdFx0XHRcdFx0Y3VyT3B0aW9uID0gY3VyT3B0aW9uWyBwYXJ0c1sgaSBdIF07XG5cdFx0XHRcdH1cblx0XHRcdFx0a2V5ID0gcGFydHMucG9wKCk7XG5cdFx0XHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdFx0XHRyZXR1cm4gY3VyT3B0aW9uWyBrZXkgXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGN1ck9wdGlvblsga2V5IF07XG5cdFx0XHRcdH1cblx0XHRcdFx0Y3VyT3B0aW9uWyBrZXkgXSA9IHZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnNbIGtleSBdID09PSB1bmRlZmluZWQgPyBudWxsIDogdGhpcy5vcHRpb25zWyBrZXkgXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvcHRpb25zWyBrZXkgXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX3NldE9wdGlvbnMoIG9wdGlvbnMgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXHRfc2V0T3B0aW9uczogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdFx0dmFyIGtleTtcblxuXHRcdGZvciAoIGtleSBpbiBvcHRpb25zICkge1xuXHRcdFx0dGhpcy5fc2V0T3B0aW9uKCBrZXksIG9wdGlvbnNbIGtleSBdICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdF9zZXRPcHRpb246IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHRoaXMub3B0aW9uc1sga2V5IF0gPSB2YWx1ZTtcblxuXHRcdGlmICgga2V5ID09PSBcImRpc2FibGVkXCIgKSB7XG5cdFx0XHR0aGlzLndpZGdldCgpXG5cdFx0XHRcdC50b2dnbGVDbGFzcyggdGhpcy53aWRnZXRGdWxsTmFtZSArIFwiLWRpc2FibGVkXCIsICEhdmFsdWUgKTtcblxuXHRcdFx0Ly8gSWYgdGhlIHdpZGdldCBpcyBiZWNvbWluZyBkaXNhYmxlZCwgdGhlbiBub3RoaW5nIGlzIGludGVyYWN0aXZlXG5cdFx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0XHR0aGlzLmhvdmVyYWJsZS5yZW1vdmVDbGFzcyggXCJ1aS1zdGF0ZS1ob3ZlclwiICk7XG5cdFx0XHRcdHRoaXMuZm9jdXNhYmxlLnJlbW92ZUNsYXNzKCBcInVpLXN0YXRlLWZvY3VzXCIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRlbmFibGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9zZXRPcHRpb25zKHsgZGlzYWJsZWQ6IGZhbHNlIH0pO1xuXHR9LFxuXHRkaXNhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fc2V0T3B0aW9ucyh7IGRpc2FibGVkOiB0cnVlIH0pO1xuXHR9LFxuXG5cdF9vbjogZnVuY3Rpb24oIHN1cHByZXNzRGlzYWJsZWRDaGVjaywgZWxlbWVudCwgaGFuZGxlcnMgKSB7XG5cdFx0dmFyIGRlbGVnYXRlRWxlbWVudCxcblx0XHRcdGluc3RhbmNlID0gdGhpcztcblxuXHRcdC8vIG5vIHN1cHByZXNzRGlzYWJsZWRDaGVjayBmbGFnLCBzaHVmZmxlIGFyZ3VtZW50c1xuXHRcdGlmICggdHlwZW9mIHN1cHByZXNzRGlzYWJsZWRDaGVjayAhPT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRoYW5kbGVycyA9IGVsZW1lbnQ7XG5cdFx0XHRlbGVtZW50ID0gc3VwcHJlc3NEaXNhYmxlZENoZWNrO1xuXHRcdFx0c3VwcHJlc3NEaXNhYmxlZENoZWNrID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gbm8gZWxlbWVudCBhcmd1bWVudCwgc2h1ZmZsZSBhbmQgdXNlIHRoaXMuZWxlbWVudFxuXHRcdGlmICggIWhhbmRsZXJzICkge1xuXHRcdFx0aGFuZGxlcnMgPSBlbGVtZW50O1xuXHRcdFx0ZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblx0XHRcdGRlbGVnYXRlRWxlbWVudCA9IHRoaXMud2lkZ2V0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW1lbnQgPSBkZWxlZ2F0ZUVsZW1lbnQgPSAkKCBlbGVtZW50ICk7XG5cdFx0XHR0aGlzLmJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5hZGQoIGVsZW1lbnQgKTtcblx0XHR9XG5cblx0XHQkLmVhY2goIGhhbmRsZXJzLCBmdW5jdGlvbiggZXZlbnQsIGhhbmRsZXIgKSB7XG5cdFx0XHRmdW5jdGlvbiBoYW5kbGVyUHJveHkoKSB7XG5cdFx0XHRcdC8vIGFsbG93IHdpZGdldHMgdG8gY3VzdG9taXplIHRoZSBkaXNhYmxlZCBoYW5kbGluZ1xuXHRcdFx0XHQvLyAtIGRpc2FibGVkIGFzIGFuIGFycmF5IGluc3RlYWQgb2YgYm9vbGVhblxuXHRcdFx0XHQvLyAtIGRpc2FibGVkIGNsYXNzIGFzIG1ldGhvZCBmb3IgZGlzYWJsaW5nIGluZGl2aWR1YWwgcGFydHNcblx0XHRcdFx0aWYgKCAhc3VwcHJlc3NEaXNhYmxlZENoZWNrICYmXG5cdFx0XHRcdFx0XHQoIGluc3RhbmNlLm9wdGlvbnMuZGlzYWJsZWQgPT09IHRydWUgfHxcblx0XHRcdFx0XHRcdFx0JCggdGhpcyApLmhhc0NsYXNzKCBcInVpLXN0YXRlLWRpc2FibGVkXCIgKSApICkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gKCB0eXBlb2YgaGFuZGxlciA9PT0gXCJzdHJpbmdcIiA/IGluc3RhbmNlWyBoYW5kbGVyIF0gOiBoYW5kbGVyIClcblx0XHRcdFx0XHQuYXBwbHkoIGluc3RhbmNlLCBhcmd1bWVudHMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY29weSB0aGUgZ3VpZCBzbyBkaXJlY3QgdW5iaW5kaW5nIHdvcmtzXG5cdFx0XHRpZiAoIHR5cGVvZiBoYW5kbGVyICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRoYW5kbGVyUHJveHkuZ3VpZCA9IGhhbmRsZXIuZ3VpZCA9XG5cdFx0XHRcdFx0aGFuZGxlci5ndWlkIHx8IGhhbmRsZXJQcm94eS5ndWlkIHx8ICQuZ3VpZCsrO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbWF0Y2ggPSBldmVudC5tYXRjaCggL14oW1xcdzotXSopXFxzKiguKikkLyApLFxuXHRcdFx0XHRldmVudE5hbWUgPSBtYXRjaFsxXSArIGluc3RhbmNlLmV2ZW50TmFtZXNwYWNlLFxuXHRcdFx0XHRzZWxlY3RvciA9IG1hdGNoWzJdO1xuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0ZGVsZWdhdGVFbGVtZW50LmRlbGVnYXRlKCBzZWxlY3RvciwgZXZlbnROYW1lLCBoYW5kbGVyUHJveHkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuYmluZCggZXZlbnROYW1lLCBoYW5kbGVyUHJveHkgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRfb2ZmOiBmdW5jdGlvbiggZWxlbWVudCwgZXZlbnROYW1lICkge1xuXHRcdGV2ZW50TmFtZSA9IChldmVudE5hbWUgfHwgXCJcIikuc3BsaXQoIFwiIFwiICkuam9pbiggdGhpcy5ldmVudE5hbWVzcGFjZSArIFwiIFwiICkgK1xuXHRcdFx0dGhpcy5ldmVudE5hbWVzcGFjZTtcblx0XHRlbGVtZW50LnVuYmluZCggZXZlbnROYW1lICkudW5kZWxlZ2F0ZSggZXZlbnROYW1lICk7XG5cblx0XHQvLyBDbGVhciB0aGUgc3RhY2sgdG8gYXZvaWQgbWVtb3J5IGxlYWtzICgjMTAwNTYpXG5cdFx0dGhpcy5iaW5kaW5ncyA9ICQoIHRoaXMuYmluZGluZ3Mubm90KCBlbGVtZW50ICkuZ2V0KCkgKTtcblx0XHR0aGlzLmZvY3VzYWJsZSA9ICQoIHRoaXMuZm9jdXNhYmxlLm5vdCggZWxlbWVudCApLmdldCgpICk7XG5cdFx0dGhpcy5ob3ZlcmFibGUgPSAkKCB0aGlzLmhvdmVyYWJsZS5ub3QoIGVsZW1lbnQgKS5nZXQoKSApO1xuXHR9LFxuXG5cdF9kZWxheTogZnVuY3Rpb24oIGhhbmRsZXIsIGRlbGF5ICkge1xuXHRcdGZ1bmN0aW9uIGhhbmRsZXJQcm94eSgpIHtcblx0XHRcdHJldHVybiAoIHR5cGVvZiBoYW5kbGVyID09PSBcInN0cmluZ1wiID8gaW5zdGFuY2VbIGhhbmRsZXIgXSA6IGhhbmRsZXIgKVxuXHRcdFx0XHQuYXBwbHkoIGluc3RhbmNlLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdFx0dmFyIGluc3RhbmNlID0gdGhpcztcblx0XHRyZXR1cm4gc2V0VGltZW91dCggaGFuZGxlclByb3h5LCBkZWxheSB8fCAwICk7XG5cdH0sXG5cblx0X2hvdmVyYWJsZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dGhpcy5ob3ZlcmFibGUgPSB0aGlzLmhvdmVyYWJsZS5hZGQoIGVsZW1lbnQgKTtcblx0XHR0aGlzLl9vbiggZWxlbWVudCwge1xuXHRcdFx0bW91c2VlbnRlcjogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHQkKCBldmVudC5jdXJyZW50VGFyZ2V0ICkuYWRkQ2xhc3MoIFwidWktc3RhdGUtaG92ZXJcIiApO1xuXHRcdFx0fSxcblx0XHRcdG1vdXNlbGVhdmU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0JCggZXZlbnQuY3VycmVudFRhcmdldCApLnJlbW92ZUNsYXNzKCBcInVpLXN0YXRlLWhvdmVyXCIgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRfZm9jdXNhYmxlOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHR0aGlzLmZvY3VzYWJsZSA9IHRoaXMuZm9jdXNhYmxlLmFkZCggZWxlbWVudCApO1xuXHRcdHRoaXMuX29uKCBlbGVtZW50LCB7XG5cdFx0XHRmb2N1c2luOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdCQoIGV2ZW50LmN1cnJlbnRUYXJnZXQgKS5hZGRDbGFzcyggXCJ1aS1zdGF0ZS1mb2N1c1wiICk7XG5cdFx0XHR9LFxuXHRcdFx0Zm9jdXNvdXQ6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0JCggZXZlbnQuY3VycmVudFRhcmdldCApLnJlbW92ZUNsYXNzKCBcInVpLXN0YXRlLWZvY3VzXCIgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRfdHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGV2ZW50LCBkYXRhICkge1xuXHRcdHZhciBwcm9wLCBvcmlnLFxuXHRcdFx0Y2FsbGJhY2sgPSB0aGlzLm9wdGlvbnNbIHR5cGUgXTtcblxuXHRcdGRhdGEgPSBkYXRhIHx8IHt9O1xuXHRcdGV2ZW50ID0gJC5FdmVudCggZXZlbnQgKTtcblx0XHRldmVudC50eXBlID0gKCB0eXBlID09PSB0aGlzLndpZGdldEV2ZW50UHJlZml4ID9cblx0XHRcdHR5cGUgOlxuXHRcdFx0dGhpcy53aWRnZXRFdmVudFByZWZpeCArIHR5cGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdC8vIHRoZSBvcmlnaW5hbCBldmVudCBtYXkgY29tZSBmcm9tIGFueSBlbGVtZW50XG5cdFx0Ly8gc28gd2UgbmVlZCB0byByZXNldCB0aGUgdGFyZ2V0IG9uIHRoZSBuZXcgZXZlbnRcblx0XHRldmVudC50YXJnZXQgPSB0aGlzLmVsZW1lbnRbIDAgXTtcblxuXHRcdC8vIGNvcHkgb3JpZ2luYWwgZXZlbnQgcHJvcGVydGllcyBvdmVyIHRvIHRoZSBuZXcgZXZlbnRcblx0XHRvcmlnID0gZXZlbnQub3JpZ2luYWxFdmVudDtcblx0XHRpZiAoIG9yaWcgKSB7XG5cdFx0XHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cdFx0XHRcdGlmICggISggcHJvcCBpbiBldmVudCApICkge1xuXHRcdFx0XHRcdGV2ZW50WyBwcm9wIF0gPSBvcmlnWyBwcm9wIF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmVsZW1lbnQudHJpZ2dlciggZXZlbnQsIGRhdGEgKTtcblx0XHRyZXR1cm4gISggJC5pc0Z1bmN0aW9uKCBjYWxsYmFjayApICYmXG5cdFx0XHRjYWxsYmFjay5hcHBseSggdGhpcy5lbGVtZW50WzBdLCBbIGV2ZW50IF0uY29uY2F0KCBkYXRhICkgKSA9PT0gZmFsc2UgfHxcblx0XHRcdGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICk7XG5cdH1cbn07XG5cbiQuZWFjaCggeyBzaG93OiBcImZhZGVJblwiLCBoaWRlOiBcImZhZGVPdXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBkZWZhdWx0RWZmZWN0ICkge1xuXHQkLldpZGdldC5wcm90b3R5cGVbIFwiX1wiICsgbWV0aG9kIF0gPSBmdW5jdGlvbiggZWxlbWVudCwgb3B0aW9ucywgY2FsbGJhY2sgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG9wdGlvbnMgPSB7IGVmZmVjdDogb3B0aW9ucyB9O1xuXHRcdH1cblx0XHR2YXIgaGFzT3B0aW9ucyxcblx0XHRcdGVmZmVjdE5hbWUgPSAhb3B0aW9ucyA/XG5cdFx0XHRcdG1ldGhvZCA6XG5cdFx0XHRcdG9wdGlvbnMgPT09IHRydWUgfHwgdHlwZW9mIG9wdGlvbnMgPT09IFwibnVtYmVyXCIgP1xuXHRcdFx0XHRcdGRlZmF1bHRFZmZlY3QgOlxuXHRcdFx0XHRcdG9wdGlvbnMuZWZmZWN0IHx8IGRlZmF1bHRFZmZlY3Q7XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdFx0aWYgKCB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdG9wdGlvbnMgPSB7IGR1cmF0aW9uOiBvcHRpb25zIH07XG5cdFx0fVxuXHRcdGhhc09wdGlvbnMgPSAhJC5pc0VtcHR5T2JqZWN0KCBvcHRpb25zICk7XG5cdFx0b3B0aW9ucy5jb21wbGV0ZSA9IGNhbGxiYWNrO1xuXHRcdGlmICggb3B0aW9ucy5kZWxheSApIHtcblx0XHRcdGVsZW1lbnQuZGVsYXkoIG9wdGlvbnMuZGVsYXkgKTtcblx0XHR9XG5cdFx0aWYgKCBoYXNPcHRpb25zICYmICQuZWZmZWN0cyAmJiAkLmVmZmVjdHMuZWZmZWN0WyBlZmZlY3ROYW1lIF0gKSB7XG5cdFx0XHRlbGVtZW50WyBtZXRob2QgXSggb3B0aW9ucyApO1xuXHRcdH0gZWxzZSBpZiAoIGVmZmVjdE5hbWUgIT09IG1ldGhvZCAmJiBlbGVtZW50WyBlZmZlY3ROYW1lIF0gKSB7XG5cdFx0XHRlbGVtZW50WyBlZmZlY3ROYW1lIF0oIG9wdGlvbnMuZHVyYXRpb24sIG9wdGlvbnMuZWFzaW5nLCBjYWxsYmFjayApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtZW50LnF1ZXVlKGZ1bmN0aW9uKCBuZXh0ICkge1xuXHRcdFx0XHQkKCB0aGlzIClbIG1ldGhvZCBdKCk7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCggZWxlbWVudFsgMCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bmV4dCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufSk7XG5cbnZhciB3aWRnZXQgPSAkLndpZGdldDtcblxuXG5cbn0pKTtcbiIsIi8qXG4gKiBqUXVlcnkgSWZyYW1lIFRyYW5zcG9ydCBQbHVnaW5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL2pRdWVyeS1GaWxlLVVwbG9hZFxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiBnbG9iYWwgZGVmaW5lLCByZXF1aXJlLCB3aW5kb3csIGRvY3VtZW50ICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBBTUQgbW9kdWxlOlxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KUzpcbiAgICAgICAgZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzOlxuICAgICAgICBmYWN0b3J5KHdpbmRvdy5qUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBIZWxwZXIgdmFyaWFibGUgdG8gY3JlYXRlIHVuaXF1ZSBuYW1lcyBmb3IgdGhlIHRyYW5zcG9ydCBpZnJhbWVzOlxuICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgIC8vIFRoZSBpZnJhbWUgdHJhbnNwb3J0IGFjY2VwdHMgZm91ciBhZGRpdGlvbmFsIG9wdGlvbnM6XG4gICAgLy8gb3B0aW9ucy5maWxlSW5wdXQ6IGEgalF1ZXJ5IGNvbGxlY3Rpb24gb2YgZmlsZSBpbnB1dCBmaWVsZHNcbiAgICAvLyBvcHRpb25zLnBhcmFtTmFtZTogdGhlIHBhcmFtZXRlciBuYW1lIGZvciB0aGUgZmlsZSBmb3JtIGRhdGEsXG4gICAgLy8gIG92ZXJyaWRlcyB0aGUgbmFtZSBwcm9wZXJ0eSBvZiB0aGUgZmlsZSBpbnB1dCBmaWVsZChzKSxcbiAgICAvLyAgY2FuIGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MuXG4gICAgLy8gb3B0aW9ucy5mb3JtRGF0YTogYW4gYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIG5hbWUgYW5kIHZhbHVlIHByb3BlcnRpZXMsXG4gICAgLy8gIGVxdWl2YWxlbnQgdG8gdGhlIHJldHVybiBkYXRhIG9mIC5zZXJpYWxpemVBcnJheSgpLCBlLmcuOlxuICAgIC8vICBbe25hbWU6ICdhJywgdmFsdWU6IDF9LCB7bmFtZTogJ2InLCB2YWx1ZTogMn1dXG4gICAgLy8gb3B0aW9ucy5pbml0aWFsSWZyYW1lU3JjOiB0aGUgVVJMIG9mIHRoZSBpbml0aWFsIGlmcmFtZSBzcmMsXG4gICAgLy8gIGJ5IGRlZmF1bHQgc2V0IHRvIFwiamF2YXNjcmlwdDpmYWxzZTtcIlxuICAgICQuYWpheFRyYW5zcG9ydCgnaWZyYW1lJywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYXN5bmMpIHtcbiAgICAgICAgICAgIC8vIGphdmFzY3JpcHQ6ZmFsc2UgYXMgaW5pdGlhbCBpZnJhbWUgc3JjXG4gICAgICAgICAgICAvLyBwcmV2ZW50cyB3YXJuaW5nIHBvcHVwcyBvbiBIVFRQUyBpbiBJRTY6XG4gICAgICAgICAgICAvKmpzaGludCBzY3JpcHR1cmw6IHRydWUgKi9cbiAgICAgICAgICAgIHZhciBpbml0aWFsSWZyYW1lU3JjID0gb3B0aW9ucy5pbml0aWFsSWZyYW1lU3JjIHx8ICdqYXZhc2NyaXB0OmZhbHNlOycsXG4gICAgICAgICAgICAvKmpzaGludCBzY3JpcHR1cmw6IGZhbHNlICovXG4gICAgICAgICAgICAgICAgZm9ybSxcbiAgICAgICAgICAgICAgICBpZnJhbWUsXG4gICAgICAgICAgICAgICAgYWRkUGFyYW1DaGFyO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZW5kOiBmdW5jdGlvbiAoXywgY29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtID0gJCgnPGZvcm0gc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+PC9mb3JtPicpO1xuICAgICAgICAgICAgICAgICAgICBmb3JtLmF0dHIoJ2FjY2VwdC1jaGFyc2V0Jywgb3B0aW9ucy5mb3JtQWNjZXB0Q2hhcnNldCk7XG4gICAgICAgICAgICAgICAgICAgIGFkZFBhcmFtQ2hhciA9IC9cXD8vLnRlc3Qob3B0aW9ucy51cmwpID8gJyYnIDogJz8nO1xuICAgICAgICAgICAgICAgICAgICAvLyBYRG9tYWluUmVxdWVzdCBvbmx5IHN1cHBvcnRzIEdFVCBhbmQgUE9TVDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ0RFTEVURScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgKyBhZGRQYXJhbUNoYXIgKyAnX21ldGhvZD1ERUxFVEUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlID0gJ1BPU1QnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ1BVVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgKyBhZGRQYXJhbUNoYXIgKyAnX21ldGhvZD1QVVQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlID0gJ1BPU1QnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudHlwZSA9PT0gJ1BBVENIJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLnVybCArIGFkZFBhcmFtQ2hhciArICdfbWV0aG9kPVBBVENIJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudHlwZSA9ICdQT1NUJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJRSB2ZXJzaW9ucyBiZWxvdyBJRTggY2Fubm90IHNldCB0aGUgbmFtZSBwcm9wZXJ0eSBvZlxuICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50cyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGFkZGVkIHRvIHRoZSBET00sXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIHNldCB0aGUgbmFtZSBhbG9uZyB3aXRoIHRoZSBpZnJhbWUgSFRNTCBtYXJrdXA6XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lID0gJChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aWZyYW1lIHNyYz1cIicgKyBpbml0aWFsSWZyYW1lU3JjICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCIgbmFtZT1cImlmcmFtZS10cmFuc3BvcnQtJyArIGNvdW50ZXIgKyAnXCI+PC9pZnJhbWU+J1xuICAgICAgICAgICAgICAgICAgICApLmJpbmQoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZUlucHV0Q2xvbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZXMgPSAkLmlzQXJyYXkob3B0aW9ucy5wYXJhbU5hbWUpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGFyYW1OYW1lIDogW29wdGlvbnMucGFyYW1OYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51bmJpbmQoJ2xvYWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5iaW5kKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdyYXAgaW4gYSB0cnkvY2F0Y2ggYmxvY2sgdG8gY2F0Y2ggZXhjZXB0aW9ucyB0aHJvd25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB0cnlpbmcgdG8gYWNjZXNzIGNyb3NzLWRvbWFpbiBpZnJhbWUgY29udGVudHM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGlmcmFtZS5jb250ZW50cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR29vZ2xlIENocm9tZSBhbmQgRmlyZWZveCBkbyBub3QgdGhyb3cgYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4Y2VwdGlvbiB3aGVuIGNhbGxpbmcgaWZyYW1lLmNvbnRlbnRzKCkgb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNyb3NzLWRvbWFpbiByZXF1ZXN0cywgc28gd2UgdW5pZnkgdGhlIHJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5sZW5ndGggfHwgIXJlc3BvbnNlWzBdLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGNvbXBsZXRlIGNhbGxiYWNrIHJldHVybnMgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmcmFtZSBjb250ZW50IGRvY3VtZW50IGFzIHJlc3BvbnNlIG9iamVjdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnaWZyYW1lJzogcmVzcG9uc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpeCBmb3IgSUUgZW5kbGVzcyBwcm9ncmVzcyBiYXIgYWN0aXZpdHkgYnVnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIChoYXBwZW5zIG9uIGZvcm0gc3VibWl0cyB0byBpZnJhbWUgdGFyZ2V0cyk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJzxpZnJhbWUgc3JjPVwiJyArIGluaXRpYWxJZnJhbWVTcmMgKyAnXCI+PC9pZnJhbWU+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGZvcm0gaW4gYSBzZXRUaW1lb3V0IGNhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbG93cyBDaHJvbWUncyBkZXZlbG9wZXIgdG9vbHMgdG8gZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHJlc3BvbnNlIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ3RhcmdldCcsIGlmcmFtZS5wcm9wKCduYW1lJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2FjdGlvbicsIG9wdGlvbnMudXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdtZXRob2QnLCBvcHRpb25zLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5mb3JtRGF0YSwgZnVuY3Rpb24gKGluZGV4LCBmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiLz4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ25hbWUnLCBmaWVsZC5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChmaWVsZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbGVJbnB1dCAmJiBvcHRpb25zLmZpbGVJbnB1dC5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlID09PSAnUE9TVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wdXRDbG9uZXMgPSBvcHRpb25zLmZpbGVJbnB1dC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluc2VydCBhIGNsb25lIGZvciBlYWNoIGZpbGUgaW5wdXQgZmllbGQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlSW5wdXQuYWZ0ZXIoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlSW5wdXRDbG9uZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBhcmFtTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZpbGVJbnB1dC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcm9wKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWVzW2luZGV4XSB8fCBvcHRpb25zLnBhcmFtTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZGluZyB0aGUgZmlsZSBpbnB1dCBmaWVsZHMgdG8gdGhlIGhpZGRlbiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlcyB0aGVtIGZyb20gdGhlaXIgb3JpZ2luYWwgbG9jYXRpb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKG9wdGlvbnMuZmlsZUlucHV0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZW5jdHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5jdHlwZSBtdXN0IGJlIHNldCBhcyBlbmNvZGluZyBmb3IgSUU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdlbmNvZGluZycsICdtdWx0aXBhcnQvZm9ybS1kYXRhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBIVE1MNSBmb3JtIGF0dHJpYnV0ZSBmcm9tIHRoZSBpbnB1dChzKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZpbGVJbnB1dC5yZW1vdmVBdHRyKCdmb3JtJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBmaWxlIGlucHV0IGZpZWxkcyBhdCB0aGVpciBvcmlnaW5hbCBsb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnkgcmVwbGFjaW5nIHRoZSBjbG9uZXMgd2l0aCB0aGUgb3JpZ2luYWxzOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVJbnB1dENsb25lcyAmJiBmaWxlSW5wdXRDbG9uZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlSW5wdXQuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbG9uZSA9ICQoZmlsZUlucHV0Q2xvbmVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIG5hbWUgYW5kIGZvcm0gcHJvcGVydGllczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChpbnB1dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCduYW1lJywgY2xvbmUucHJvcCgnbmFtZScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2Zvcm0nLCBjbG9uZS5hdHRyKCdmb3JtJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZS5yZXBsYWNlV2l0aChpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZChpZnJhbWUpLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gamF2YXNjcmlwdDpmYWxzZSBhcyBpZnJhbWUgc3JjIGFib3J0cyB0aGUgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHByZXZlbnRzIHdhcm5pbmcgcG9wdXBzIG9uIEhUVFBTIGluIElFNi5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbmNhdCBpcyB1c2VkIHRvIGF2b2lkIHRoZSBcIlNjcmlwdCBVUkxcIiBKU0xpbnQgZXJyb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5iaW5kKCdsb2FkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnc3JjJywgaW5pdGlhbElmcmFtZVNyYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUaGUgaWZyYW1lIHRyYW5zcG9ydCByZXR1cm5zIHRoZSBpZnJhbWUgY29udGVudCBkb2N1bWVudCBhcyByZXNwb25zZS5cbiAgICAvLyBUaGUgZm9sbG93aW5nIGFkZHMgY29udmVydGVycyBmcm9tIGlmcmFtZSB0byB0ZXh0LCBqc29uLCBodG1sLCB4bWxcbiAgICAvLyBhbmQgc2NyaXB0LlxuICAgIC8vIFBsZWFzZSBub3RlIHRoYXQgdGhlIENvbnRlbnQtVHlwZSBmb3IgSlNPTiByZXNwb25zZXMgaGFzIHRvIGJlIHRleHQvcGxhaW5cbiAgICAvLyBvciB0ZXh0L2h0bWwsIGlmIHRoZSBicm93c2VyIGRvZXNuJ3QgaW5jbHVkZSBhcHBsaWNhdGlvbi9qc29uIGluIHRoZVxuICAgIC8vIEFjY2VwdCBoZWFkZXIsIGVsc2UgSUUgd2lsbCBzaG93IGEgZG93bmxvYWQgZGlhbG9nLlxuICAgIC8vIFRoZSBDb250ZW50LVR5cGUgZm9yIFhNTCByZXNwb25zZXMgb24gdGhlIG90aGVyIGhhbmQgaGFzIHRvIGJlIGFsd2F5c1xuICAgIC8vIGFwcGxpY2F0aW9uL3htbCBvciB0ZXh0L3htbCwgc28gSUUgcHJvcGVybHkgcGFyc2VzIHRoZSBYTUwgcmVzcG9uc2UuXG4gICAgLy8gU2VlIGFsc29cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9qUXVlcnktRmlsZS1VcGxvYWQvd2lraS9TZXR1cCNjb250ZW50LXR5cGUtbmVnb3RpYXRpb25cbiAgICAkLmFqYXhTZXR1cCh7XG4gICAgICAgIGNvbnZlcnRlcnM6IHtcbiAgICAgICAgICAgICdpZnJhbWUgdGV4dCc6IGZ1bmN0aW9uIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWZyYW1lICYmICQoaWZyYW1lWzBdLmJvZHkpLnRleHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnaWZyYW1lIGpzb24nOiBmdW5jdGlvbiAoaWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlmcmFtZSAmJiAkLnBhcnNlSlNPTigkKGlmcmFtZVswXS5ib2R5KS50ZXh0KCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdpZnJhbWUgaHRtbCc6IGZ1bmN0aW9uIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWZyYW1lICYmICQoaWZyYW1lWzBdLmJvZHkpLmh0bWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnaWZyYW1lIHhtbCc6IGZ1bmN0aW9uIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeG1sRG9jID0gaWZyYW1lICYmIGlmcmFtZVswXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geG1sRG9jICYmICQuaXNYTUxEb2MoeG1sRG9jKSA/IHhtbERvYyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkLnBhcnNlWE1MKCh4bWxEb2MuWE1MRG9jdW1lbnQgJiYgeG1sRG9jLlhNTERvY3VtZW50LnhtbCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHhtbERvYy5ib2R5KS5odG1sKCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdpZnJhbWUgc2NyaXB0JzogZnVuY3Rpb24gKGlmcmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZnJhbWUgJiYgJC5nbG9iYWxFdmFsKCQoaWZyYW1lWzBdLmJvZHkpLnRleHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkpO1xuIiwiLypcbiAqIGpRdWVyeSBGaWxlIFVwbG9hZCBQbHVnaW5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL2pRdWVyeS1GaWxlLVVwbG9hZFxuICpcbiAqIENvcHlyaWdodCAyMDEwLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiBqc2hpbnQgbm9tZW46ZmFsc2UgKi9cbi8qIGdsb2JhbCBkZWZpbmUsIHJlcXVpcmUsIHdpbmRvdywgZG9jdW1lbnQsIGxvY2F0aW9uLCBCbG9iLCBGb3JtRGF0YSAqL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgQU1EIG1vZHVsZTpcbiAgICAgICAgZGVmaW5lKFtcbiAgICAgICAgICAgICdqcXVlcnknLFxuICAgICAgICAgICAgJ2pxdWVyeS51aS53aWRnZXQnXG4gICAgICAgIF0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlM6XG4gICAgICAgIGZhY3RvcnkoXG4gICAgICAgICAgICByZXF1aXJlKCdqcXVlcnknKSxcbiAgICAgICAgICAgIHJlcXVpcmUoJy4vdmVuZG9yL2pxdWVyeS51aS53aWRnZXQnKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsczpcbiAgICAgICAgZmFjdG9yeSh3aW5kb3cualF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gRGV0ZWN0IGZpbGUgaW5wdXQgc3VwcG9ydCwgYmFzZWQgb25cbiAgICAvLyBodHRwOi8vdmlsamFtaXMuY29tL2Jsb2cvMjAxMi9maWxlLXVwbG9hZC1zdXBwb3J0LW9uLW1vYmlsZS9cbiAgICAkLnN1cHBvcnQuZmlsZUlucHV0ID0gIShuZXcgUmVnRXhwKFxuICAgICAgICAvLyBIYW5kbGUgZGV2aWNlcyB3aGljaCBnaXZlIGZhbHNlIHBvc2l0aXZlcyBmb3IgdGhlIGZlYXR1cmUgZGV0ZWN0aW9uOlxuICAgICAgICAnKEFuZHJvaWQgKDFcXFxcLlswMTU2XXwyXFxcXC5bMDFdKSknICtcbiAgICAgICAgICAgICd8KFdpbmRvd3MgUGhvbmUgKE9TIDd8OFxcXFwuMCkpfChYQkxXUCl8KFp1bmVXUCl8KFdQRGVza3RvcCknICtcbiAgICAgICAgICAgICd8KHcoZWIpP09TQnJvd3Nlcil8KHdlYk9TKScgK1xuICAgICAgICAgICAgJ3woS2luZGxlLygxXFxcXC4wfDJcXFxcLlswNV18M1xcXFwuMCkpJ1xuICAgICkudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgfHxcbiAgICAgICAgLy8gRmVhdHVyZSBkZXRlY3Rpb24gZm9yIGFsbCBvdGhlciBkZXZpY2VzOlxuICAgICAgICAkKCc8aW5wdXQgdHlwZT1cImZpbGVcIj4nKS5wcm9wKCdkaXNhYmxlZCcpKTtcblxuICAgIC8vIFRoZSBGaWxlUmVhZGVyIEFQSSBpcyBub3QgYWN0dWFsbHkgdXNlZCwgYnV0IHdvcmtzIGFzIGZlYXR1cmUgZGV0ZWN0aW9uLFxuICAgIC8vIGFzIHNvbWUgU2FmYXJpIHZlcnNpb25zICg1Pykgc3VwcG9ydCBYSFIgZmlsZSB1cGxvYWRzIHZpYSB0aGUgRm9ybURhdGEgQVBJLFxuICAgIC8vIGJ1dCBub3Qgbm9uLW11bHRpcGFydCBYSFIgZmlsZSB1cGxvYWRzLlxuICAgIC8vIHdpbmRvdy5YTUxIdHRwUmVxdWVzdFVwbG9hZCBpcyBub3QgYXZhaWxhYmxlIG9uIElFMTAsIHNvIHdlIGNoZWNrIGZvclxuICAgIC8vIHdpbmRvdy5Qcm9ncmVzc0V2ZW50IGluc3RlYWQgdG8gZGV0ZWN0IFhIUjIgZmlsZSB1cGxvYWQgY2FwYWJpbGl0eTpcbiAgICAkLnN1cHBvcnQueGhyRmlsZVVwbG9hZCA9ICEhKHdpbmRvdy5Qcm9ncmVzc0V2ZW50ICYmIHdpbmRvdy5GaWxlUmVhZGVyKTtcbiAgICAkLnN1cHBvcnQueGhyRm9ybURhdGFGaWxlVXBsb2FkID0gISF3aW5kb3cuRm9ybURhdGE7XG5cbiAgICAvLyBEZXRlY3Qgc3VwcG9ydCBmb3IgQmxvYiBzbGljaW5nIChyZXF1aXJlZCBmb3IgY2h1bmtlZCB1cGxvYWRzKTpcbiAgICAkLnN1cHBvcnQuYmxvYlNsaWNlID0gd2luZG93LkJsb2IgJiYgKEJsb2IucHJvdG90eXBlLnNsaWNlIHx8XG4gICAgICAgIEJsb2IucHJvdG90eXBlLndlYmtpdFNsaWNlIHx8IEJsb2IucHJvdG90eXBlLm1velNsaWNlKTtcblxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgZHJhZyBoYW5kbGVycyBmb3IgZHJhZ292ZXIvZHJhZ2VudGVyL2RyYWdsZWF2ZTpcbiAgICBmdW5jdGlvbiBnZXREcmFnSGFuZGxlcih0eXBlKSB7XG4gICAgICAgIHZhciBpc0RyYWdPdmVyID0gdHlwZSA9PT0gJ2RyYWdvdmVyJztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLmRhdGFUcmFuc2ZlciA9IGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgICAgICAgICAgdmFyIGRhdGFUcmFuc2ZlciA9IGUuZGF0YVRyYW5zZmVyO1xuICAgICAgICAgICAgaWYgKGRhdGFUcmFuc2ZlciAmJiAkLmluQXJyYXkoJ0ZpbGVzJywgZGF0YVRyYW5zZmVyLnR5cGVzKSAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KHR5cGUsIHtkZWxlZ2F0ZWRFdmVudDogZX0pXG4gICAgICAgICAgICAgICAgICAgICkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChpc0RyYWdPdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBUaGUgZmlsZXVwbG9hZCB3aWRnZXQgbGlzdGVucyBmb3IgY2hhbmdlIGV2ZW50cyBvbiBmaWxlIGlucHV0IGZpZWxkcyBkZWZpbmVkXG4gICAgLy8gdmlhIGZpbGVJbnB1dCBzZXR0aW5nIGFuZCBwYXN0ZSBvciBkcm9wIGV2ZW50cyBvZiB0aGUgZ2l2ZW4gZHJvcFpvbmUuXG4gICAgLy8gSW4gYWRkaXRpb24gdG8gdGhlIGRlZmF1bHQgalF1ZXJ5IFdpZGdldCBtZXRob2RzLCB0aGUgZmlsZXVwbG9hZCB3aWRnZXRcbiAgICAvLyBleHBvc2VzIHRoZSBcImFkZFwiIGFuZCBcInNlbmRcIiBtZXRob2RzLCB0byBhZGQgb3IgZGlyZWN0bHkgc2VuZCBmaWxlcyB1c2luZ1xuICAgIC8vIHRoZSBmaWxldXBsb2FkIEFQSS5cbiAgICAvLyBCeSBkZWZhdWx0LCBmaWxlcyBhZGRlZCB2aWEgZmlsZSBpbnB1dCBzZWxlY3Rpb24sIHBhc3RlLCBkcmFnICYgZHJvcCBvclxuICAgIC8vIFwiYWRkXCIgbWV0aG9kIGFyZSB1cGxvYWRlZCBpbW1lZGlhdGVseSwgYnV0IGl0IGlzIHBvc3NpYmxlIHRvIG92ZXJyaWRlXG4gICAgLy8gdGhlIFwiYWRkXCIgY2FsbGJhY2sgb3B0aW9uIHRvIHF1ZXVlIGZpbGUgdXBsb2Fkcy5cbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywge1xuXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIC8vIFRoZSBkcm9wIHRhcmdldCBlbGVtZW50KHMpLCBieSB0aGUgZGVmYXVsdCB0aGUgY29tcGxldGUgZG9jdW1lbnQuXG4gICAgICAgICAgICAvLyBTZXQgdG8gbnVsbCB0byBkaXNhYmxlIGRyYWcgJiBkcm9wIHN1cHBvcnQ6XG4gICAgICAgICAgICBkcm9wWm9uZTogJChkb2N1bWVudCksXG4gICAgICAgICAgICAvLyBUaGUgcGFzdGUgdGFyZ2V0IGVsZW1lbnQocyksIGJ5IHRoZSBkZWZhdWx0IHVuZGVmaW5lZC5cbiAgICAgICAgICAgIC8vIFNldCB0byBhIERPTSBub2RlIG9yIGpRdWVyeSBvYmplY3QgdG8gZW5hYmxlIGZpbGUgcGFzdGluZzpcbiAgICAgICAgICAgIHBhc3RlWm9uZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gVGhlIGZpbGUgaW5wdXQgZmllbGQocyksIHRoYXQgYXJlIGxpc3RlbmVkIHRvIGZvciBjaGFuZ2UgZXZlbnRzLlxuICAgICAgICAgICAgLy8gSWYgdW5kZWZpbmVkLCBpdCBpcyBzZXQgdG8gdGhlIGZpbGUgaW5wdXQgZmllbGRzIGluc2lkZVxuICAgICAgICAgICAgLy8gb2YgdGhlIHdpZGdldCBlbGVtZW50IG9uIHBsdWdpbiBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgICAgIC8vIFNldCB0byBudWxsIHRvIGRpc2FibGUgdGhlIGNoYW5nZSBsaXN0ZW5lci5cbiAgICAgICAgICAgIGZpbGVJbnB1dDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgdGhlIGZpbGUgaW5wdXQgZmllbGQgaXMgcmVwbGFjZWQgd2l0aCBhIGNsb25lIGFmdGVyXG4gICAgICAgICAgICAvLyBlYWNoIGlucHV0IGZpZWxkIGNoYW5nZSBldmVudC4gVGhpcyBpcyByZXF1aXJlZCBmb3IgaWZyYW1lIHRyYW5zcG9ydFxuICAgICAgICAgICAgLy8gcXVldWVzIGFuZCBhbGxvd3MgY2hhbmdlIGV2ZW50cyB0byBiZSBmaXJlZCBmb3IgdGhlIHNhbWUgZmlsZVxuICAgICAgICAgICAgLy8gc2VsZWN0aW9uLCBidXQgY2FuIGJlIGRpc2FibGVkIGJ5IHNldHRpbmcgdGhlIGZvbGxvd2luZyBvcHRpb24gdG8gZmFsc2U6XG4gICAgICAgICAgICByZXBsYWNlRmlsZUlucHV0OiB0cnVlLFxuICAgICAgICAgICAgLy8gVGhlIHBhcmFtZXRlciBuYW1lIGZvciB0aGUgZmlsZSBmb3JtIGRhdGEgKHRoZSByZXF1ZXN0IGFyZ3VtZW50IG5hbWUpLlxuICAgICAgICAgICAgLy8gSWYgdW5kZWZpbmVkIG9yIGVtcHR5LCB0aGUgbmFtZSBwcm9wZXJ0eSBvZiB0aGUgZmlsZSBpbnB1dCBmaWVsZCBpc1xuICAgICAgICAgICAgLy8gdXNlZCwgb3IgXCJmaWxlc1tdXCIgaWYgdGhlIGZpbGUgaW5wdXQgbmFtZSBwcm9wZXJ0eSBpcyBhbHNvIGVtcHR5LFxuICAgICAgICAgICAgLy8gY2FuIGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3M6XG4gICAgICAgICAgICBwYXJhbU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIGVhY2ggZmlsZSBvZiBhIHNlbGVjdGlvbiBpcyB1cGxvYWRlZCB1c2luZyBhbiBpbmRpdmlkdWFsXG4gICAgICAgICAgICAvLyByZXF1ZXN0IGZvciBYSFIgdHlwZSB1cGxvYWRzLiBTZXQgdG8gZmFsc2UgdG8gdXBsb2FkIGZpbGVcbiAgICAgICAgICAgIC8vIHNlbGVjdGlvbnMgaW4gb25lIHJlcXVlc3QgZWFjaDpcbiAgICAgICAgICAgIHNpbmdsZUZpbGVVcGxvYWRzOiB0cnVlLFxuICAgICAgICAgICAgLy8gVG8gbGltaXQgdGhlIG51bWJlciBvZiBmaWxlcyB1cGxvYWRlZCB3aXRoIG9uZSBYSFIgcmVxdWVzdCxcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZm9sbG93aW5nIG9wdGlvbiB0byBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiAwOlxuICAgICAgICAgICAgbGltaXRNdWx0aUZpbGVVcGxvYWRzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIG9wdGlvbiBsaW1pdHMgdGhlIG51bWJlciBvZiBmaWxlcyB1cGxvYWRlZCB3aXRoIG9uZVxuICAgICAgICAgICAgLy8gWEhSIHJlcXVlc3QgdG8ga2VlcCB0aGUgcmVxdWVzdCBzaXplIHVuZGVyIG9yIGVxdWFsIHRvIHRoZSBkZWZpbmVkXG4gICAgICAgICAgICAvLyBsaW1pdCBpbiBieXRlczpcbiAgICAgICAgICAgIGxpbWl0TXVsdGlGaWxlVXBsb2FkU2l6ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gTXVsdGlwYXJ0IGZpbGUgdXBsb2FkcyBhZGQgYSBudW1iZXIgb2YgYnl0ZXMgdG8gZWFjaCB1cGxvYWRlZCBmaWxlLFxuICAgICAgICAgICAgLy8gdGhlcmVmb3JlIHRoZSBmb2xsb3dpbmcgb3B0aW9uIGFkZHMgYW4gb3ZlcmhlYWQgZm9yIGVhY2ggZmlsZSB1c2VkXG4gICAgICAgICAgICAvLyBpbiB0aGUgbGltaXRNdWx0aUZpbGVVcGxvYWRTaXplIGNvbmZpZ3VyYXRpb246XG4gICAgICAgICAgICBsaW1pdE11bHRpRmlsZVVwbG9hZFNpemVPdmVyaGVhZDogNTEyLFxuICAgICAgICAgICAgLy8gU2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIHRydWUgdG8gaXNzdWUgYWxsIGZpbGUgdXBsb2FkIHJlcXVlc3RzXG4gICAgICAgICAgICAvLyBpbiBhIHNlcXVlbnRpYWwgb3JkZXI6XG4gICAgICAgICAgICBzZXF1ZW50aWFsVXBsb2FkczogZmFsc2UsXG4gICAgICAgICAgICAvLyBUbyBsaW1pdCB0aGUgbnVtYmVyIG9mIGNvbmN1cnJlbnQgdXBsb2FkcyxcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZm9sbG93aW5nIG9wdGlvbiB0byBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiAwOlxuICAgICAgICAgICAgbGltaXRDb25jdXJyZW50VXBsb2FkczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gU2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIHRydWUgdG8gZm9yY2UgaWZyYW1lIHRyYW5zcG9ydCB1cGxvYWRzOlxuICAgICAgICAgICAgZm9yY2VJZnJhbWVUcmFuc3BvcnQ6IGZhbHNlLFxuICAgICAgICAgICAgLy8gU2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIHRoZSBsb2NhdGlvbiBvZiBhIHJlZGlyZWN0IHVybCBvbiB0aGVcbiAgICAgICAgICAgIC8vIG9yaWdpbiBzZXJ2ZXIsIGZvciBjcm9zcy1kb21haW4gaWZyYW1lIHRyYW5zcG9ydCB1cGxvYWRzOlxuICAgICAgICAgICAgcmVkaXJlY3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIFRoZSBwYXJhbWV0ZXIgbmFtZSBmb3IgdGhlIHJlZGlyZWN0IHVybCwgc2VudCBhcyBwYXJ0IG9mIHRoZSBmb3JtXG4gICAgICAgICAgICAvLyBkYXRhIGFuZCBzZXQgdG8gJ3JlZGlyZWN0JyBpZiB0aGlzIG9wdGlvbiBpcyBlbXB0eTpcbiAgICAgICAgICAgIHJlZGlyZWN0UGFyYW1OYW1lOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZvbGxvd2luZyBvcHRpb24gdG8gdGhlIGxvY2F0aW9uIG9mIGEgcG9zdE1lc3NhZ2Ugd2luZG93LFxuICAgICAgICAgICAgLy8gdG8gZW5hYmxlIHBvc3RNZXNzYWdlIHRyYW5zcG9ydCB1cGxvYWRzOlxuICAgICAgICAgICAgcG9zdE1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIFhIUiBmaWxlIHVwbG9hZHMgYXJlIHNlbnQgYXMgbXVsdGlwYXJ0L2Zvcm0tZGF0YS5cbiAgICAgICAgICAgIC8vIFRoZSBpZnJhbWUgdHJhbnNwb3J0IGlzIGFsd2F5cyB1c2luZyBtdWx0aXBhcnQvZm9ybS1kYXRhLlxuICAgICAgICAgICAgLy8gU2V0IHRvIGZhbHNlIHRvIGVuYWJsZSBub24tbXVsdGlwYXJ0IFhIUiB1cGxvYWRzOlxuICAgICAgICAgICAgbXVsdGlwYXJ0OiB0cnVlLFxuICAgICAgICAgICAgLy8gVG8gdXBsb2FkIGxhcmdlIGZpbGVzIGluIHNtYWxsZXIgY2h1bmtzLCBzZXQgdGhlIGZvbGxvd2luZyBvcHRpb25cbiAgICAgICAgICAgIC8vIHRvIGEgcHJlZmVycmVkIG1heGltdW0gY2h1bmsgc2l6ZS4gSWYgc2V0IHRvIDAsIG51bGwgb3IgdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gb3IgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgcmVxdWlyZWQgQmxvYiBBUEksIGZpbGVzIHdpbGxcbiAgICAgICAgICAgIC8vIGJlIHVwbG9hZGVkIGFzIGEgd2hvbGUuXG4gICAgICAgICAgICBtYXhDaHVua1NpemU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIFdoZW4gYSBub24tbXVsdGlwYXJ0IHVwbG9hZCBvciBhIGNodW5rZWQgbXVsdGlwYXJ0IHVwbG9hZCBoYXMgYmVlblxuICAgICAgICAgICAgLy8gYWJvcnRlZCwgdGhpcyBvcHRpb24gY2FuIGJlIHVzZWQgdG8gcmVzdW1lIHRoZSB1cGxvYWQgYnkgc2V0dGluZ1xuICAgICAgICAgICAgLy8gaXQgdG8gdGhlIHNpemUgb2YgdGhlIGFscmVhZHkgdXBsb2FkZWQgYnl0ZXMuIFRoaXMgb3B0aW9uIGlzIG1vc3RcbiAgICAgICAgICAgIC8vIHVzZWZ1bCB3aGVuIG1vZGlmeWluZyB0aGUgb3B0aW9ucyBvYmplY3QgaW5zaWRlIG9mIHRoZSBcImFkZFwiIG9yXG4gICAgICAgICAgICAvLyBcInNlbmRcIiBjYWxsYmFja3MsIGFzIHRoZSBvcHRpb25zIGFyZSBjbG9uZWQgZm9yIGVhY2ggZmlsZSB1cGxvYWQuXG4gICAgICAgICAgICB1cGxvYWRlZEJ5dGVzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCBmYWlsZWQgKGFib3J0IG9yIGVycm9yKSBmaWxlIHVwbG9hZHMgYXJlIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIGdsb2JhbCBwcm9ncmVzcyBjYWxjdWxhdGlvbi4gU2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIGZhbHNlIHRvXG4gICAgICAgICAgICAvLyBwcmV2ZW50IHJlY2FsY3VsYXRpbmcgdGhlIGdsb2JhbCBwcm9ncmVzcyBkYXRhOlxuICAgICAgICAgICAgcmVjYWxjdWxhdGVQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIEludGVydmFsIGluIG1pbGxpc2Vjb25kcyB0byBjYWxjdWxhdGUgYW5kIHRyaWdnZXIgcHJvZ3Jlc3MgZXZlbnRzOlxuICAgICAgICAgICAgcHJvZ3Jlc3NJbnRlcnZhbDogMTAwLFxuICAgICAgICAgICAgLy8gSW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzIHRvIGNhbGN1bGF0ZSBwcm9ncmVzcyBiaXRyYXRlOlxuICAgICAgICAgICAgYml0cmF0ZUludGVydmFsOiA1MDAsXG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCB1cGxvYWRzIGFyZSBzdGFydGVkIGF1dG9tYXRpY2FsbHkgd2hlbiBhZGRpbmcgZmlsZXM6XG4gICAgICAgICAgICBhdXRvVXBsb2FkOiB0cnVlLFxuXG4gICAgICAgICAgICAvLyBFcnJvciBhbmQgaW5mbyBtZXNzYWdlczpcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgdXBsb2FkZWRCeXRlczogJ1VwbG9hZGVkIGJ5dGVzIGV4Y2VlZCBmaWxlIHNpemUnXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBUcmFuc2xhdGlvbiBmdW5jdGlvbiwgZ2V0cyB0aGUgbWVzc2FnZSBrZXkgdG8gYmUgdHJhbnNsYXRlZFxuICAgICAgICAgICAgLy8gYW5kIGFuIG9iamVjdCB3aXRoIGNvbnRleHQgc3BlY2lmaWMgZGF0YSBhcyBhcmd1bWVudHM6XG4gICAgICAgICAgICBpMThuOiBmdW5jdGlvbiAobWVzc2FnZSwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VzW21lc3NhZ2VdIHx8IG1lc3NhZ2UudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goY29udGV4dCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoJ3snICsga2V5ICsgJ30nLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIEFkZGl0aW9uYWwgZm9ybSBkYXRhIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgZmlsZSB1cGxvYWRzIGNhbiBiZSBzZXRcbiAgICAgICAgICAgIC8vIHVzaW5nIHRoaXMgb3B0aW9uLCB3aGljaCBhY2NlcHRzIGFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBuYW1lIGFuZFxuICAgICAgICAgICAgLy8gdmFsdWUgcHJvcGVydGllcywgYSBmdW5jdGlvbiByZXR1cm5pbmcgc3VjaCBhbiBhcnJheSwgYSBGb3JtRGF0YVxuICAgICAgICAgICAgLy8gb2JqZWN0IChmb3IgWEhSIGZpbGUgdXBsb2FkcyksIG9yIGEgc2ltcGxlIG9iamVjdC5cbiAgICAgICAgICAgIC8vIFRoZSBmb3JtIG9mIHRoZSBmaXJzdCBmaWxlSW5wdXQgaXMgZ2l2ZW4gYXMgcGFyYW1ldGVyIHRvIHRoZSBmdW5jdGlvbjpcbiAgICAgICAgICAgIGZvcm1EYXRhOiBmdW5jdGlvbiAoZm9ybSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBUaGUgYWRkIGNhbGxiYWNrIGlzIGludm9rZWQgYXMgc29vbiBhcyBmaWxlcyBhcmUgYWRkZWQgdG8gdGhlIGZpbGV1cGxvYWRcbiAgICAgICAgICAgIC8vIHdpZGdldCAodmlhIGZpbGUgaW5wdXQgc2VsZWN0aW9uLCBkcmFnICYgZHJvcCwgcGFzdGUgb3IgYWRkIEFQSSBjYWxsKS5cbiAgICAgICAgICAgIC8vIElmIHRoZSBzaW5nbGVGaWxlVXBsb2FkcyBvcHRpb24gaXMgZW5hYmxlZCwgdGhpcyBjYWxsYmFjayB3aWxsIGJlXG4gICAgICAgICAgICAvLyBjYWxsZWQgb25jZSBmb3IgZWFjaCBmaWxlIGluIHRoZSBzZWxlY3Rpb24gZm9yIFhIUiBmaWxlIHVwbG9hZHMsIGVsc2VcbiAgICAgICAgICAgIC8vIG9uY2UgZm9yIGVhY2ggZmlsZSBzZWxlY3Rpb24uXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVGhlIHVwbG9hZCBzdGFydHMgd2hlbiB0aGUgc3VibWl0IG1ldGhvZCBpcyBpbnZva2VkIG9uIHRoZSBkYXRhIHBhcmFtZXRlci5cbiAgICAgICAgICAgIC8vIFRoZSBkYXRhIG9iamVjdCBjb250YWlucyBhIGZpbGVzIHByb3BlcnR5IGhvbGRpbmcgdGhlIGFkZGVkIGZpbGVzXG4gICAgICAgICAgICAvLyBhbmQgYWxsb3dzIHlvdSB0byBvdmVycmlkZSBwbHVnaW4gb3B0aW9ucyBhcyB3ZWxsIGFzIGRlZmluZSBhamF4IHNldHRpbmdzLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIExpc3RlbmVycyBmb3IgdGhpcyBjYWxsYmFjayBjYW4gYWxzbyBiZSBib3VuZCB0aGUgZm9sbG93aW5nIHdheTpcbiAgICAgICAgICAgIC8vIC5iaW5kKCdmaWxldXBsb2FkYWRkJywgZnVuYyk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gZGF0YS5zdWJtaXQoKSByZXR1cm5zIGEgUHJvbWlzZSBvYmplY3QgYW5kIGFsbG93cyB0byBhdHRhY2ggYWRkaXRpb25hbFxuICAgICAgICAgICAgLy8gaGFuZGxlcnMgdXNpbmcgalF1ZXJ5J3MgRGVmZXJyZWQgY2FsbGJhY2tzOlxuICAgICAgICAgICAgLy8gZGF0YS5zdWJtaXQoKS5kb25lKGZ1bmMpLmZhaWwoZnVuYykuYWx3YXlzKGZ1bmMpO1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYXV0b1VwbG9hZCB8fCAoZGF0YS5hdXRvVXBsb2FkICE9PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maWxldXBsb2FkKCdvcHRpb24nLCAnYXV0b1VwbG9hZCcpKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnByb2Nlc3MoKS5kb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIE90aGVyIGNhbGxiYWNrczpcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHRoZSBzdWJtaXQgZXZlbnQgb2YgZWFjaCBmaWxlIHVwbG9hZDpcbiAgICAgICAgICAgIC8vIHN1Ym1pdDogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZHN1Ym1pdCcsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdGhlIHN0YXJ0IG9mIGVhY2ggZmlsZSB1cGxvYWQgcmVxdWVzdDpcbiAgICAgICAgICAgIC8vIHNlbmQ6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRzZW5kJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBzdWNjZXNzZnVsIHVwbG9hZHM6XG4gICAgICAgICAgICAvLyBkb25lOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkZG9uZScsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgZmFpbGVkIChhYm9ydCBvciBlcnJvcikgdXBsb2FkczpcbiAgICAgICAgICAgIC8vIGZhaWw6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRmYWlsJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBjb21wbGV0ZWQgKHN1Y2Nlc3MsIGFib3J0IG9yIGVycm9yKSByZXF1ZXN0czpcbiAgICAgICAgICAgIC8vIGFsd2F5czogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZGFsd2F5cycsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdXBsb2FkIHByb2dyZXNzIGV2ZW50czpcbiAgICAgICAgICAgIC8vIHByb2dyZXNzOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkcHJvZ3Jlc3MnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIGdsb2JhbCB1cGxvYWQgcHJvZ3Jlc3MgZXZlbnRzOlxuICAgICAgICAgICAgLy8gcHJvZ3Jlc3NhbGw6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRwcm9ncmVzc2FsbCcsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdXBsb2FkcyBzdGFydCwgZXF1aXZhbGVudCB0byB0aGUgZ2xvYmFsIGFqYXhTdGFydCBldmVudDpcbiAgICAgICAgICAgIC8vIHN0YXJ0OiBmdW5jdGlvbiAoZSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2Fkc3RhcnQnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHVwbG9hZHMgc3RvcCwgZXF1aXZhbGVudCB0byB0aGUgZ2xvYmFsIGFqYXhTdG9wIGV2ZW50OlxuICAgICAgICAgICAgLy8gc3RvcDogZnVuY3Rpb24gKGUpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZHN0b3AnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIGNoYW5nZSBldmVudHMgb2YgdGhlIGZpbGVJbnB1dChzKTpcbiAgICAgICAgICAgIC8vIGNoYW5nZTogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZGNoYW5nZScsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgcGFzdGUgZXZlbnRzIHRvIHRoZSBwYXN0ZVpvbmUocyk6XG4gICAgICAgICAgICAvLyBwYXN0ZTogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZHBhc3RlJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBkcm9wIGV2ZW50cyBvZiB0aGUgZHJvcFpvbmUocyk6XG4gICAgICAgICAgICAvLyBkcm9wOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkZHJvcCcsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgZHJhZ292ZXIgZXZlbnRzIG9mIHRoZSBkcm9wWm9uZShzKTpcbiAgICAgICAgICAgIC8vIGRyYWdvdmVyOiBmdW5jdGlvbiAoZSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkZHJhZ292ZXInLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHRoZSBzdGFydCBvZiBlYWNoIGNodW5rIHVwbG9hZCByZXF1ZXN0OlxuICAgICAgICAgICAgLy8gY2h1bmtzZW5kOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkY2h1bmtzZW5kJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBzdWNjZXNzZnVsIGNodW5rIHVwbG9hZHM6XG4gICAgICAgICAgICAvLyBjaHVua2RvbmU6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRjaHVua2RvbmUnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIGZhaWxlZCAoYWJvcnQgb3IgZXJyb3IpIGNodW5rIHVwbG9hZHM6XG4gICAgICAgICAgICAvLyBjaHVua2ZhaWw6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRjaHVua2ZhaWwnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIGNvbXBsZXRlZCAoc3VjY2VzcywgYWJvcnQgb3IgZXJyb3IpIGNodW5rIHVwbG9hZCByZXF1ZXN0czpcbiAgICAgICAgICAgIC8vIGNodW5rYWx3YXlzOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkY2h1bmthbHdheXMnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gVGhlIHBsdWdpbiBvcHRpb25zIGFyZSB1c2VkIGFzIHNldHRpbmdzIG9iamVjdCBmb3IgdGhlIGFqYXggY2FsbHMuXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZSBqUXVlcnkgYWpheCBzZXR0aW5ncyByZXF1aXJlZCBmb3IgdGhlIGZpbGUgdXBsb2FkczpcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBIGxpc3Qgb2Ygb3B0aW9ucyB0aGF0IHJlcXVpcmUgcmVpbml0aWFsaXppbmcgZXZlbnQgbGlzdGVuZXJzIGFuZC9vclxuICAgICAgICAvLyBzcGVjaWFsIGluaXRpYWxpemF0aW9uIGNvZGU6XG4gICAgICAgIF9zcGVjaWFsT3B0aW9uczogW1xuICAgICAgICAgICAgJ2ZpbGVJbnB1dCcsXG4gICAgICAgICAgICAnZHJvcFpvbmUnLFxuICAgICAgICAgICAgJ3Bhc3RlWm9uZScsXG4gICAgICAgICAgICAnbXVsdGlwYXJ0JyxcbiAgICAgICAgICAgICdmb3JjZUlmcmFtZVRyYW5zcG9ydCdcbiAgICAgICAgXSxcblxuICAgICAgICBfYmxvYlNsaWNlOiAkLnN1cHBvcnQuYmxvYlNsaWNlICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzbGljZSA9IHRoaXMuc2xpY2UgfHwgdGhpcy53ZWJraXRTbGljZSB8fCB0aGlzLm1velNsaWNlO1xuICAgICAgICAgICAgcmV0dXJuIHNsaWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX0JpdHJhdGVUaW1lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXAgPSAoKERhdGUubm93KSA/IERhdGUubm93KCkgOiAobmV3IERhdGUoKSkuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuYml0cmF0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLmdldEJpdHJhdGUgPSBmdW5jdGlvbiAobm93LCBsb2FkZWQsIGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVEaWZmID0gbm93IC0gdGhpcy50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJpdHJhdGUgfHwgIWludGVydmFsIHx8IHRpbWVEaWZmID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXRyYXRlID0gKGxvYWRlZCAtIHRoaXMubG9hZGVkKSAqICgxMDAwIC8gdGltZURpZmYpICogODtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSBsb2FkZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXN0YW1wID0gbm93O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5iaXRyYXRlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaXNYSFJVcGxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gIW9wdGlvbnMuZm9yY2VJZnJhbWVUcmFuc3BvcnQgJiZcbiAgICAgICAgICAgICAgICAoKCFvcHRpb25zLm11bHRpcGFydCAmJiAkLnN1cHBvcnQueGhyRmlsZVVwbG9hZCkgfHxcbiAgICAgICAgICAgICAgICAkLnN1cHBvcnQueGhyRm9ybURhdGFGaWxlVXBsb2FkKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Rm9ybURhdGE6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgZm9ybURhdGE7XG4gICAgICAgICAgICBpZiAoJC50eXBlKG9wdGlvbnMuZm9ybURhdGEpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZm9ybURhdGEob3B0aW9ucy5mb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkLmlzQXJyYXkob3B0aW9ucy5mb3JtRGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5mb3JtRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkLnR5cGUob3B0aW9ucy5mb3JtRGF0YSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZm9ybURhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5mb3JtRGF0YSwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnB1c2goe25hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0VG90YWw6IGZ1bmN0aW9uIChmaWxlcykge1xuICAgICAgICAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAgICAgICAgICQuZWFjaChmaWxlcywgZnVuY3Rpb24gKGluZGV4LCBmaWxlKSB7XG4gICAgICAgICAgICAgICAgdG90YWwgKz0gZmlsZS5zaXplIHx8IDE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b3RhbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdFByb2dyZXNzT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSB7XG4gICAgICAgICAgICAgICAgbG9hZGVkOiAwLFxuICAgICAgICAgICAgICAgIHRvdGFsOiAwLFxuICAgICAgICAgICAgICAgIGJpdHJhdGU6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAob2JqLl9wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICQuZXh0ZW5kKG9iai5fcHJvZ3Jlc3MsIHByb2dyZXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqLl9wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9pbml0UmVzcG9uc2VPYmplY3Q6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBwcm9wO1xuICAgICAgICAgICAgaWYgKG9iai5fcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHByb3AgaW4gb2JqLl9yZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLl9yZXNwb25zZS5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9iai5fcmVzcG9uc2VbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iai5fcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25Qcm9ncmVzczogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gKChEYXRlLm5vdykgPyBEYXRlLm5vdygpIDogKG5ldyBEYXRlKCkpLmdldFRpbWUoKSksXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZDtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5fdGltZSAmJiBkYXRhLnByb2dyZXNzSW50ZXJ2YWwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChub3cgLSBkYXRhLl90aW1lIDwgZGF0YS5wcm9ncmVzc0ludGVydmFsKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZS5sb2FkZWQgIT09IGUudG90YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhLl90aW1lID0gbm93O1xuICAgICAgICAgICAgICAgIGxvYWRlZCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgIGUubG9hZGVkIC8gZS50b3RhbCAqIChkYXRhLmNodW5rU2l6ZSB8fCBkYXRhLl9wcm9ncmVzcy50b3RhbClcbiAgICAgICAgICAgICAgICApICsgKGRhdGEudXBsb2FkZWRCeXRlcyB8fCAwKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIGRpZmZlcmVuY2UgZnJvbSB0aGUgcHJldmlvdXNseSBsb2FkZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgZ2xvYmFsIGxvYWRlZCBjb3VudGVyOlxuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2dyZXNzLmxvYWRlZCArPSAobG9hZGVkIC0gZGF0YS5fcHJvZ3Jlc3MubG9hZGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmVzcy5iaXRyYXRlID0gdGhpcy5fYml0cmF0ZVRpbWVyLmdldEJpdHJhdGUoXG4gICAgICAgICAgICAgICAgICAgIG5vdyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MubG9hZGVkLFxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJpdHJhdGVJbnRlcnZhbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZGF0YS5fcHJvZ3Jlc3MubG9hZGVkID0gZGF0YS5sb2FkZWQgPSBsb2FkZWQ7XG4gICAgICAgICAgICAgICAgZGF0YS5fcHJvZ3Jlc3MuYml0cmF0ZSA9IGRhdGEuYml0cmF0ZSA9IGRhdGEuX2JpdHJhdGVUaW1lci5nZXRCaXRyYXRlKFxuICAgICAgICAgICAgICAgICAgICBub3csXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5iaXRyYXRlSW50ZXJ2YWxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgYSBjdXN0b20gcHJvZ3Jlc3MgZXZlbnQgd2l0aCBhIHRvdGFsIGRhdGEgcHJvcGVydHkgc2V0XG4gICAgICAgICAgICAgICAgLy8gdG8gdGhlIGZpbGUgc2l6ZShzKSBvZiB0aGUgY3VycmVudCB1cGxvYWQgYW5kIGEgbG9hZGVkIGRhdGFcbiAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0eSBjYWxjdWxhdGVkIGFjY29yZGluZ2x5OlxuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgICdwcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgICQuRXZlbnQoJ3Byb2dyZXNzJywge2RlbGVnYXRlZEV2ZW50OiBlfSksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgYSBnbG9iYWwgcHJvZ3Jlc3MgZXZlbnQgZm9yIGFsbCBjdXJyZW50IGZpbGUgdXBsb2FkcyxcbiAgICAgICAgICAgICAgICAvLyBpbmNsdWRpbmcgYWpheCBjYWxscyBxdWV1ZWQgZm9yIHNlcXVlbnRpYWwgZmlsZSB1cGxvYWRzOlxuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgICdwcm9ncmVzc2FsbCcsXG4gICAgICAgICAgICAgICAgICAgICQuRXZlbnQoJ3Byb2dyZXNzYWxsJywge2RlbGVnYXRlZEV2ZW50OiBlfSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2dyZXNzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdFByb2dyZXNzTGlzdGVuZXI6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgeGhyID0gb3B0aW9ucy54aHIgPyBvcHRpb25zLnhocigpIDogJC5hamF4U2V0dGluZ3MueGhyKCk7XG4gICAgICAgICAgICAvLyBBY2Nlc3NzIHRvIHRoZSBuYXRpdmUgWEhSIG9iamVjdCBpcyByZXF1aXJlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAgICAvLyBmb3IgdGhlIHVwbG9hZCBwcm9ncmVzcyBldmVudDpcbiAgICAgICAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgICAgICAgICAgJCh4aHIudXBsb2FkKS5iaW5kKCdwcm9ncmVzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBwcm9ncmVzcyBldmVudCBwcm9wZXJ0aWVzIGdldCBjb3BpZWQgb3ZlcjpcbiAgICAgICAgICAgICAgICAgICAgZS5sZW5ndGhDb21wdXRhYmxlID0gb2UubGVuZ3RoQ29tcHV0YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgZS5sb2FkZWQgPSBvZS5sb2FkZWQ7XG4gICAgICAgICAgICAgICAgICAgIGUudG90YWwgPSBvZS50b3RhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fb25Qcm9ncmVzcyhlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnhociA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhocjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9pc0luc3RhbmNlT2Y6IGZ1bmN0aW9uICh0eXBlLCBvYmopIHtcbiAgICAgICAgICAgIC8vIENyb3NzLWZyYW1lIGluc3RhbmNlb2YgY2hlY2tcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIHR5cGUgKyAnXSc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRYSFJEYXRhOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLFxuICAgICAgICAgICAgICAgIGZpbGUgPSBvcHRpb25zLmZpbGVzWzBdLFxuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBub24tbXVsdGlwYXJ0IHNldHRpbmcgaWYgbm90IHN1cHBvcnRlZDpcbiAgICAgICAgICAgICAgICBtdWx0aXBhcnQgPSBvcHRpb25zLm11bHRpcGFydCB8fCAhJC5zdXBwb3J0LnhockZpbGVVcGxvYWQsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lID0gJC50eXBlKG9wdGlvbnMucGFyYW1OYW1lKSA9PT0gJ2FycmF5JyA/XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGFyYW1OYW1lWzBdIDogb3B0aW9ucy5wYXJhbU5hbWU7XG4gICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbnRlbnRSYW5nZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQ29udGVudC1SYW5nZSddID0gb3B0aW9ucy5jb250ZW50UmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW11bHRpcGFydCB8fCBvcHRpb25zLmJsb2IgfHwgIXRoaXMuX2lzSW5zdGFuY2VPZignRmlsZScsIGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydDb250ZW50LURpc3Bvc2l0aW9uJ10gPSAnYXR0YWNobWVudDsgZmlsZW5hbWU9XCInICtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJKGZpbGUubmFtZSkgKyAnXCInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtdWx0aXBhcnQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRlbnRUeXBlID0gZmlsZS50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuYmxvYiB8fCBmaWxlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkLnN1cHBvcnQueGhyRm9ybURhdGFGaWxlVXBsb2FkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9zdE1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2luZG93LnBvc3RNZXNzYWdlIGRvZXMgbm90IGFsbG93IHNlbmRpbmcgRm9ybURhdGFcbiAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0cywgc28gd2UganVzdCBhZGQgdGhlIEZpbGUvQmxvYiBvYmplY3RzIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBmb3JtRGF0YSBhcnJheSBhbmQgbGV0IHRoZSBwb3N0TWVzc2FnZSB3aW5kb3dcbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBGb3JtRGF0YSBvYmplY3Qgb3V0IG9mIHRoaXMgYXJyYXk6XG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhID0gdGhpcy5fZ2V0Rm9ybURhdGEob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHBhcmFtTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9ucy5ibG9iXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChvcHRpb25zLmZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogKCQudHlwZShvcHRpb25zLnBhcmFtTmFtZSkgPT09ICdhcnJheScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGFyYW1OYW1lW2luZGV4XSkgfHwgcGFyYW1OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5faXNJbnN0YW5jZU9mKCdGb3JtRGF0YScsIG9wdGlvbnMuZm9ybURhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YSA9IG9wdGlvbnMuZm9ybURhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMuX2dldEZvcm1EYXRhKG9wdGlvbnMpLCBmdW5jdGlvbiAoaW5kZXgsIGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGZpZWxkLm5hbWUsIGZpZWxkLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChwYXJhbU5hbWUsIG9wdGlvbnMuYmxvYiwgZmlsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChvcHRpb25zLmZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGNoZWNrIGFsbG93cyB0aGUgdGVzdHMgdG8gcnVuIHdpdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkdW1teSBvYmplY3RzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Ll9pc0luc3RhbmNlT2YoJ0ZpbGUnLCBmaWxlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5faXNJbnN0YW5jZU9mKCdCbG9iJywgZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCQudHlwZShvcHRpb25zLnBhcmFtTmFtZSkgPT09ICdhcnJheScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBhcmFtTmFtZVtpbmRleF0pIHx8IHBhcmFtTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnVwbG9hZE5hbWUgfHwgZmlsZS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhID0gZm9ybURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBCbG9iIHJlZmVyZW5jZSBpcyBub3QgbmVlZGVkIGFueW1vcmUsIGZyZWUgbWVtb3J5OlxuICAgICAgICAgICAgb3B0aW9ucy5ibG9iID0gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdElmcmFtZVNldHRpbmdzOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHRhcmdldEhvc3QgPSAkKCc8YT48L2E+JykucHJvcCgnaHJlZicsIG9wdGlvbnMudXJsKS5wcm9wKCdob3N0Jyk7XG4gICAgICAgICAgICAvLyBTZXR0aW5nIHRoZSBkYXRhVHlwZSB0byBpZnJhbWUgZW5hYmxlcyB0aGUgaWZyYW1lIHRyYW5zcG9ydDpcbiAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAnaWZyYW1lICcgKyAob3B0aW9ucy5kYXRhVHlwZSB8fCAnJyk7XG4gICAgICAgICAgICAvLyBUaGUgaWZyYW1lIHRyYW5zcG9ydCBhY2NlcHRzIGEgc2VyaWFsaXplZCBhcnJheSBhcyBmb3JtIGRhdGE6XG4gICAgICAgICAgICBvcHRpb25zLmZvcm1EYXRhID0gdGhpcy5fZ2V0Rm9ybURhdGEob3B0aW9ucyk7XG4gICAgICAgICAgICAvLyBBZGQgcmVkaXJlY3QgdXJsIHRvIGZvcm0gZGF0YSBvbiBjcm9zcy1kb21haW4gdXBsb2FkczpcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJlZGlyZWN0ICYmIHRhcmdldEhvc3QgJiYgdGFyZ2V0SG9zdCAhPT0gbG9jYXRpb24uaG9zdCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9ybURhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdGlvbnMucmVkaXJlY3RQYXJhbU5hbWUgfHwgJ3JlZGlyZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbnMucmVkaXJlY3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdERhdGFTZXR0aW5nczogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1hIUlVwbG9hZChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY2h1bmtlZFVwbG9hZChvcHRpb25zLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdFhIUkRhdGEob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdFByb2dyZXNzTGlzdGVuZXIob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBvc3RNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldHRpbmcgdGhlIGRhdGFUeXBlIHRvIHBvc3RtZXNzYWdlIGVuYWJsZXMgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvc3RNZXNzYWdlIHRyYW5zcG9ydDpcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhVHlwZSA9ICdwb3N0bWVzc2FnZSAnICsgKG9wdGlvbnMuZGF0YVR5cGUgfHwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdElmcmFtZVNldHRpbmdzKG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRQYXJhbU5hbWU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgZmlsZUlucHV0ID0gJChvcHRpb25zLmZpbGVJbnB1dCksXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lID0gb3B0aW9ucy5wYXJhbU5hbWU7XG4gICAgICAgICAgICBpZiAoIXBhcmFtTmFtZSkge1xuICAgICAgICAgICAgICAgIHBhcmFtTmFtZSA9IFtdO1xuICAgICAgICAgICAgICAgIGZpbGVJbnB1dC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBpbnB1dC5wcm9wKCduYW1lJykgfHwgJ2ZpbGVzW10nLFxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IChpbnB1dC5wcm9wKCdmaWxlcycpIHx8IFsxXSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lLnB1c2gobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcmFtTmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lID0gW2ZpbGVJbnB1dC5wcm9wKCduYW1lJykgfHwgJ2ZpbGVzW10nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEkLmlzQXJyYXkocGFyYW1OYW1lKSkge1xuICAgICAgICAgICAgICAgIHBhcmFtTmFtZSA9IFtwYXJhbU5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtTmFtZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdEZvcm1TZXR0aW5nczogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIG1pc3Npbmcgb3B0aW9ucyBmcm9tIHRoZSBpbnB1dCBmaWVsZCBhbmQgdGhlXG4gICAgICAgICAgICAvLyBhc3NvY2lhdGVkIGZvcm0sIGlmIGF2YWlsYWJsZTpcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5mb3JtIHx8ICFvcHRpb25zLmZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JtID0gJChvcHRpb25zLmZpbGVJbnB1dC5wcm9wKCdmb3JtJykpO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBnaXZlbiBmaWxlIGlucHV0IGRvZXNuJ3QgaGF2ZSBhbiBhc3NvY2lhdGVkIGZvcm0sXG4gICAgICAgICAgICAgICAgLy8gdXNlIHRoZSBkZWZhdWx0IHdpZGdldCBmaWxlIGlucHV0J3MgZm9ybTpcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JtID0gJCh0aGlzLm9wdGlvbnMuZmlsZUlucHV0LnByb3AoJ2Zvcm0nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9ucy5wYXJhbU5hbWUgPSB0aGlzLl9nZXRQYXJhbU5hbWUob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudXJsKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy51cmwgPSBvcHRpb25zLmZvcm0ucHJvcCgnYWN0aW9uJykgfHwgbG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZSBIVFRQIHJlcXVlc3QgbWV0aG9kIG11c3QgYmUgXCJQT1NUXCIgb3IgXCJQVVRcIjpcbiAgICAgICAgICAgIG9wdGlvbnMudHlwZSA9IChvcHRpb25zLnR5cGUgfHxcbiAgICAgICAgICAgICAgICAoJC50eXBlKG9wdGlvbnMuZm9ybS5wcm9wKCdtZXRob2QnKSkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9ybS5wcm9wKCdtZXRob2QnKSkgfHwgJydcbiAgICAgICAgICAgICAgICApLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy50eXBlICE9PSAnUE9TVCcgJiYgb3B0aW9ucy50eXBlICE9PSAnUFVUJyAmJlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnR5cGUgIT09ICdQQVRDSCcpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnR5cGUgPSAnUE9TVCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuZm9ybUFjY2VwdENoYXJzZXQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvcm1BY2NlcHRDaGFyc2V0ID0gb3B0aW9ucy5mb3JtLmF0dHIoJ2FjY2VwdC1jaGFyc2V0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldEFKQVhTZXR0aW5nczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0Rm9ybVNldHRpbmdzKG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5faW5pdERhdGFTZXR0aW5ncyhvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGpRdWVyeSAxLjYgZG9lc24ndCBwcm92aWRlIC5zdGF0ZSgpLFxuICAgICAgICAvLyB3aGlsZSBqUXVlcnkgMS44KyByZW1vdmVkIC5pc1JlamVjdGVkKCkgYW5kIC5pc1Jlc29sdmVkKCk6XG4gICAgICAgIF9nZXREZWZlcnJlZFN0YXRlOiBmdW5jdGlvbiAoZGVmZXJyZWQpIHtcbiAgICAgICAgICAgIGlmIChkZWZlcnJlZC5zdGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5zdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlZmVycmVkLmlzUmVzb2x2ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmVzb2x2ZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlZmVycmVkLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmVqZWN0ZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdwZW5kaW5nJztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBNYXBzIGpxWEhSIGNhbGxiYWNrcyB0byB0aGUgZXF1aXZhbGVudFxuICAgICAgICAvLyBtZXRob2RzIG9mIHRoZSBnaXZlbiBQcm9taXNlIG9iamVjdDpcbiAgICAgICAgX2VuaGFuY2VQcm9taXNlOiBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgcHJvbWlzZS5zdWNjZXNzID0gcHJvbWlzZS5kb25lO1xuICAgICAgICAgICAgcHJvbWlzZS5lcnJvciA9IHByb21pc2UuZmFpbDtcbiAgICAgICAgICAgIHByb21pc2UuY29tcGxldGUgPSBwcm9taXNlLmFsd2F5cztcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENyZWF0ZXMgYW5kIHJldHVybnMgYSBQcm9taXNlIG9iamVjdCBlbmhhbmNlZCB3aXRoXG4gICAgICAgIC8vIHRoZSBqcVhIUiBtZXRob2RzIGFib3J0LCBzdWNjZXNzLCBlcnJvciBhbmQgY29tcGxldGU6XG4gICAgICAgIF9nZXRYSFJQcm9taXNlOiBmdW5jdGlvbiAocmVzb2x2ZU9yUmVqZWN0LCBjb250ZXh0LCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBkZmQucHJvbWlzZSgpO1xuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcy5vcHRpb25zLmNvbnRleHQgfHwgcHJvbWlzZTtcbiAgICAgICAgICAgIGlmIChyZXNvbHZlT3JSZWplY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc29sdmVPclJlamVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBkZmQucmVqZWN0V2l0aChjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb21pc2UuYWJvcnQgPSBkZmQucHJvbWlzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmhhbmNlUHJvbWlzZShwcm9taXNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBZGRzIGNvbnZlbmllbmNlIG1ldGhvZHMgdG8gdGhlIGRhdGEgY2FsbGJhY2sgYXJndW1lbnQ6XG4gICAgICAgIF9hZGRDb252ZW5pZW5jZU1ldGhvZHM6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZ2V0UHJvbWlzZSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZVdpdGgodGhhdCwgYXJncykucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkYXRhLnByb2Nlc3MgPSBmdW5jdGlvbiAocmVzb2x2ZUZ1bmMsIHJlamVjdEZ1bmMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZUZ1bmMgfHwgcmVqZWN0RnVuYykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLl9wcm9jZXNzUXVldWUgPSB0aGlzLl9wcm9jZXNzUXVldWUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX3Byb2Nlc3NRdWV1ZSB8fCBnZXRQcm9taXNlKFt0aGlzXSkpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWplY3RXaXRoKHRoYXQsIFtkYXRhXSkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRQcm9taXNlKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKS5waXBlKHJlc29sdmVGdW5jLCByZWplY3RGdW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NRdWV1ZSB8fCBnZXRQcm9taXNlKFt0aGlzXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGF0YS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUoKSAhPT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuanFYSFIgPSB0aGlzLmpxWEhSID1cbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGF0Ll90cmlnZ2VyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdWJtaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuRXZlbnQoJ3N1Ym1pdCcsIHtkZWxlZ2F0ZWRFdmVudDogZX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICkgIT09IGZhbHNlKSAmJiB0aGF0Ll9vblNlbmQoZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmpxWEhSIHx8IHRoYXQuX2dldFhIUlByb21pc2UoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkYXRhLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmpxWEhSKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmpxWEhSLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JUaHJvd24gPSAnYWJvcnQnO1xuICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZhaWwnLCBudWxsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5fZ2V0WEhSUHJvbWlzZShmYWxzZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGF0YS5zdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qcVhIUikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5fZ2V0RGVmZXJyZWRTdGF0ZSh0aGlzLmpxWEhSKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Byb2Nlc3NRdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5fZ2V0RGVmZXJyZWRTdGF0ZSh0aGlzLl9wcm9jZXNzUXVldWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkYXRhLnByb2Nlc3NpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmpxWEhSICYmIHRoaXMuX3Byb2Nlc3NRdWV1ZSAmJiB0aGF0XG4gICAgICAgICAgICAgICAgICAgIC5fZ2V0RGVmZXJyZWRTdGF0ZSh0aGlzLl9wcm9jZXNzUXVldWUpID09PSAncGVuZGluZyc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGF0YS5wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3M7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGF0YS5yZXNwb25zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFBhcnNlcyB0aGUgUmFuZ2UgaGVhZGVyIGZyb20gdGhlIHNlcnZlciByZXNwb25zZVxuICAgICAgICAvLyBhbmQgcmV0dXJucyB0aGUgdXBsb2FkZWQgYnl0ZXM6XG4gICAgICAgIF9nZXRVcGxvYWRlZEJ5dGVzOiBmdW5jdGlvbiAoanFYSFIpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCdSYW5nZScpLFxuICAgICAgICAgICAgICAgIHBhcnRzID0gcmFuZ2UgJiYgcmFuZ2Uuc3BsaXQoJy0nKSxcbiAgICAgICAgICAgICAgICB1cHBlckJ5dGVzUG9zID0gcGFydHMgJiYgcGFydHMubGVuZ3RoID4gMSAmJlxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChwYXJ0c1sxXSwgMTApO1xuICAgICAgICAgICAgcmV0dXJuIHVwcGVyQnl0ZXNQb3MgJiYgdXBwZXJCeXRlc1BvcyArIDE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVXBsb2FkcyBhIGZpbGUgaW4gbXVsdGlwbGUsIHNlcXVlbnRpYWwgcmVxdWVzdHNcbiAgICAgICAgLy8gYnkgc3BsaXR0aW5nIHRoZSBmaWxlIHVwIGluIG11bHRpcGxlIGJsb2IgY2h1bmtzLlxuICAgICAgICAvLyBJZiB0aGUgc2Vjb25kIHBhcmFtZXRlciBpcyB0cnVlLCBvbmx5IHRlc3RzIGlmIHRoZSBmaWxlXG4gICAgICAgIC8vIHNob3VsZCBiZSB1cGxvYWRlZCBpbiBjaHVua3MsIGJ1dCBkb2VzIG5vdCBpbnZva2UgYW55XG4gICAgICAgIC8vIHVwbG9hZCByZXF1ZXN0czpcbiAgICAgICAgX2NodW5rZWRVcGxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zLCB0ZXN0T25seSkge1xuICAgICAgICAgICAgb3B0aW9ucy51cGxvYWRlZEJ5dGVzID0gb3B0aW9ucy51cGxvYWRlZEJ5dGVzIHx8IDA7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZmlsZSA9IG9wdGlvbnMuZmlsZXNbMF0sXG4gICAgICAgICAgICAgICAgZnMgPSBmaWxlLnNpemUsXG4gICAgICAgICAgICAgICAgdWIgPSBvcHRpb25zLnVwbG9hZGVkQnl0ZXMsXG4gICAgICAgICAgICAgICAgbWNzID0gb3B0aW9ucy5tYXhDaHVua1NpemUgfHwgZnMsXG4gICAgICAgICAgICAgICAgc2xpY2UgPSB0aGlzLl9ibG9iU2xpY2UsXG4gICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBkZmQucHJvbWlzZSgpLFxuICAgICAgICAgICAgICAgIGpxWEhSLFxuICAgICAgICAgICAgICAgIHVwbG9hZDtcbiAgICAgICAgICAgIGlmICghKHRoaXMuX2lzWEhSVXBsb2FkKG9wdGlvbnMpICYmIHNsaWNlICYmICh1YiB8fCBtY3MgPCBmcykpIHx8XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZXN0T25seSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHViID49IGZzKSB7XG4gICAgICAgICAgICAgICAgZmlsZS5lcnJvciA9IG9wdGlvbnMuaTE4bigndXBsb2FkZWRCeXRlcycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRYSFJQcm9taXNlKFxuICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICBbbnVsbCwgJ2Vycm9yJywgZmlsZS5lcnJvcl1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlIGNodW5rIHVwbG9hZCBtZXRob2Q6XG4gICAgICAgICAgICB1cGxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2xvbmUgdGhlIG9wdGlvbnMgb2JqZWN0IGZvciBlYWNoIGNodW5rIHVwbG9hZDpcbiAgICAgICAgICAgICAgICB2YXIgbyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExvYWRlZCA9IG8uX3Byb2dyZXNzLmxvYWRlZDtcbiAgICAgICAgICAgICAgICBvLmJsb2IgPSBzbGljZS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgICAgICAgICB1YixcbiAgICAgICAgICAgICAgICAgICAgdWIgKyBtY3MsXG4gICAgICAgICAgICAgICAgICAgIGZpbGUudHlwZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGN1cnJlbnQgY2h1bmsgc2l6ZSwgYXMgdGhlIGJsb2IgaXRzZWxmXG4gICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBkZXJlZmVyZW5jZWQgYWZ0ZXIgZGF0YSBwcm9jZXNzaW5nOlxuICAgICAgICAgICAgICAgIG8uY2h1bmtTaXplID0gby5ibG9iLnNpemU7XG4gICAgICAgICAgICAgICAgLy8gRXhwb3NlIHRoZSBjaHVuayBieXRlcyBwb3NpdGlvbiByYW5nZTpcbiAgICAgICAgICAgICAgICBvLmNvbnRlbnRSYW5nZSA9ICdieXRlcyAnICsgdWIgKyAnLScgK1xuICAgICAgICAgICAgICAgICAgICAodWIgKyBvLmNodW5rU2l6ZSAtIDEpICsgJy8nICsgZnM7XG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgdXBsb2FkIGRhdGEgKHRoZSBibG9iIGFuZCBwb3RlbnRpYWwgZm9ybSBkYXRhKTpcbiAgICAgICAgICAgICAgICB0aGF0Ll9pbml0WEhSRGF0YShvKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgcHJvZ3Jlc3MgbGlzdGVuZXJzIGZvciB0aGlzIGNodW5rIHVwbG9hZDpcbiAgICAgICAgICAgICAgICB0aGF0Ll9pbml0UHJvZ3Jlc3NMaXN0ZW5lcihvKTtcbiAgICAgICAgICAgICAgICBqcVhIUiA9ICgodGhhdC5fdHJpZ2dlcignY2h1bmtzZW5kJywgbnVsbCwgbykgIT09IGZhbHNlICYmICQuYWpheChvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2dldFhIUlByb21pc2UoZmFsc2UsIG8uY29udGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1YiA9IHRoYXQuX2dldFVwbG9hZGVkQnl0ZXMoanFYSFIpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHViICsgby5jaHVua1NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgcHJvZ3Jlc3MgZXZlbnQgaWYgbm8gZmluYWwgcHJvZ3Jlc3MgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpdGggbG9hZGVkIGVxdWFsaW5nIHRvdGFsIGhhcyBiZWVuIHRyaWdnZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHRoaXMgY2h1bms6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudExvYWRlZCArIG8uY2h1bmtTaXplIC0gby5fcHJvZ3Jlc3MubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fb25Qcm9ncmVzcygkLkV2ZW50KCdwcm9ncmVzcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkOiB1YiAtIG8udXBsb2FkZWRCeXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWw6IHViIC0gby51cGxvYWRlZEJ5dGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksIG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy51cGxvYWRlZEJ5dGVzID0gby51cGxvYWRlZEJ5dGVzID0gdWI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8udGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLmpxWEhSID0ganFYSFI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdjaHVua2RvbmUnLCBudWxsLCBvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2NodW5rYWx3YXlzJywgbnVsbCwgbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodWIgPCBmcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbGUgdXBsb2FkIG5vdCB5ZXQgY29tcGxldGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29udGludWUgd2l0aCB0aGUgbmV4dCBjaHVuazpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uanFYSFIgPSBqcVhIUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8udGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLmVycm9yVGhyb3duID0gZXJyb3JUaHJvd247XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdjaHVua2ZhaWwnLCBudWxsLCBvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2NodW5rYWx3YXlzJywgbnVsbCwgbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVqZWN0V2l0aChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2pxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bl1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2VuaGFuY2VQcm9taXNlKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ganFYSFIuYWJvcnQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1cGxvYWQoKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9iZWZvcmVTZW5kOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIHRoZSBzdGFydCBjYWxsYmFjayBpcyB0cmlnZ2VyZWQgd2hlbiBhbiB1cGxvYWQgc3RhcnRzXG4gICAgICAgICAgICAgICAgLy8gYW5kIG5vIG90aGVyIHVwbG9hZHMgYXJlIGN1cnJlbnRseSBydW5uaW5nLFxuICAgICAgICAgICAgICAgIC8vIGVxdWl2YWxlbnQgdG8gdGhlIGdsb2JhbCBhamF4U3RhcnQgZXZlbnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcignc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGltZXIgZm9yIGdsb2JhbCBiaXRyYXRlIHByb2dyZXNzIGNhbGN1bGF0aW9uOlxuICAgICAgICAgICAgICAgIHRoaXMuX2JpdHJhdGVUaW1lciA9IG5ldyB0aGlzLl9CaXRyYXRlVGltZXIoKTtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgZ2xvYmFsIHByb2dyZXNzIHZhbHVlczpcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmVzcy5sb2FkZWQgPSB0aGlzLl9wcm9ncmVzcy50b3RhbCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MuYml0cmF0ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGNvbnRhaW5lciBvYmplY3RzIGZvciB0aGUgLnJlc3BvbnNlKCkgYW5kXG4gICAgICAgICAgICAvLyAucHJvZ3Jlc3MoKSBtZXRob2RzIG9uIHRoZSBkYXRhIG9iamVjdCBhcmUgYXZhaWxhYmxlXG4gICAgICAgICAgICAvLyBhbmQgcmVzZXQgdG8gdGhlaXIgaW5pdGlhbCBzdGF0ZTpcbiAgICAgICAgICAgIHRoaXMuX2luaXRSZXNwb25zZU9iamVjdChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRQcm9ncmVzc09iamVjdChkYXRhKTtcbiAgICAgICAgICAgIGRhdGEuX3Byb2dyZXNzLmxvYWRlZCA9IGRhdGEubG9hZGVkID0gZGF0YS51cGxvYWRlZEJ5dGVzIHx8IDA7XG4gICAgICAgICAgICBkYXRhLl9wcm9ncmVzcy50b3RhbCA9IGRhdGEudG90YWwgPSB0aGlzLl9nZXRUb3RhbChkYXRhLmZpbGVzKSB8fCAxO1xuICAgICAgICAgICAgZGF0YS5fcHJvZ3Jlc3MuYml0cmF0ZSA9IGRhdGEuYml0cmF0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmUgKz0gMTtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGdsb2JhbCBwcm9ncmVzcyB2YWx1ZXM6XG4gICAgICAgICAgICB0aGlzLl9wcm9ncmVzcy5sb2FkZWQgKz0gZGF0YS5sb2FkZWQ7XG4gICAgICAgICAgICB0aGlzLl9wcm9ncmVzcy50b3RhbCArPSBkYXRhLnRvdGFsO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkRvbmU6IGZ1bmN0aW9uIChyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgdG90YWwgPSBvcHRpb25zLl9wcm9ncmVzcy50b3RhbCxcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IG9wdGlvbnMuX3Jlc3BvbnNlO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuX3Byb2dyZXNzLmxvYWRlZCA8IHRvdGFsKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgcHJvZ3Jlc3MgZXZlbnQgaWYgbm8gZmluYWwgcHJvZ3Jlc3MgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyB3aXRoIGxvYWRlZCBlcXVhbGluZyB0b3RhbCBoYXMgYmVlbiB0cmlnZ2VyZWQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fb25Qcm9ncmVzcygkLkV2ZW50KCdwcm9ncmVzcycsIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVkOiB0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsXG4gICAgICAgICAgICAgICAgfSksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2UucmVzdWx0ID0gb3B0aW9ucy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICByZXNwb25zZS50ZXh0U3RhdHVzID0gb3B0aW9ucy50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcbiAgICAgICAgICAgIHJlc3BvbnNlLmpxWEhSID0gb3B0aW9ucy5qcVhIUiA9IGpxWEhSO1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcignZG9uZScsIG51bGwsIG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkZhaWw6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24sIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IG9wdGlvbnMuX3Jlc3BvbnNlO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVjYWxjdWxhdGVQcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZmFpbGVkIChlcnJvciBvciBhYm9ydCkgZmlsZSB1cGxvYWQgZnJvbVxuICAgICAgICAgICAgICAgIC8vIHRoZSBnbG9iYWwgcHJvZ3Jlc3MgY2FsY3VsYXRpb246XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MubG9hZGVkIC09IG9wdGlvbnMuX3Byb2dyZXNzLmxvYWRlZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmVzcy50b3RhbCAtPSBvcHRpb25zLl9wcm9ncmVzcy50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3BvbnNlLmpxWEhSID0gb3B0aW9ucy5qcVhIUiA9IGpxWEhSO1xuICAgICAgICAgICAgcmVzcG9uc2UudGV4dFN0YXR1cyA9IG9wdGlvbnMudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XG4gICAgICAgICAgICByZXNwb25zZS5lcnJvclRocm93biA9IG9wdGlvbnMuZXJyb3JUaHJvd24gPSBlcnJvclRocm93bjtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ2ZhaWwnLCBudWxsLCBvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25BbHdheXM6IGZ1bmN0aW9uIChqcVhIUm9yUmVzdWx0LCB0ZXh0U3RhdHVzLCBqcVhIUm9yRXJyb3IsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGpxWEhSb3JSZXN1bHQsIHRleHRTdGF0dXMgYW5kIGpxWEhSb3JFcnJvciBhcmUgYWRkZWQgdG8gdGhlXG4gICAgICAgICAgICAvLyBvcHRpb25zIG9iamVjdCB2aWEgZG9uZSBhbmQgZmFpbCBjYWxsYmFja3NcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ2Fsd2F5cycsIG51bGwsIG9wdGlvbnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vblNlbmQ6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoIWRhdGEuc3VibWl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQ29udmVuaWVuY2VNZXRob2RzKGUsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGpxWEhSLFxuICAgICAgICAgICAgICAgIGFib3J0ZWQsXG4gICAgICAgICAgICAgICAgc2xvdCxcbiAgICAgICAgICAgICAgICBwaXBlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB0aGF0Ll9nZXRBSkFYU2V0dGluZ3MoZGF0YSksXG4gICAgICAgICAgICAgICAgc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fc2VuZGluZyArPSAxO1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGltZXIgZm9yIGJpdHJhdGUgcHJvZ3Jlc3MgY2FsY3VsYXRpb246XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX2JpdHJhdGVUaW1lciA9IG5ldyB0aGF0Ll9CaXRyYXRlVGltZXIoKTtcbiAgICAgICAgICAgICAgICAgICAganFYSFIgPSBqcVhIUiB8fCAoXG4gICAgICAgICAgICAgICAgICAgICAgICAoKGFib3J0ZWQgfHwgdGhhdC5fdHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2VuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5FdmVudCgnc2VuZCcsIHtkZWxlZ2F0ZWRFdmVudDogZX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICkgPT09IGZhbHNlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fZ2V0WEhSUHJvbWlzZShmYWxzZSwgb3B0aW9ucy5jb250ZXh0LCBhYm9ydGVkKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2NodW5rZWRVcGxvYWQob3B0aW9ucykgfHwgJC5hamF4KG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgICkuZG9uZShmdW5jdGlvbiAocmVzdWx0LCB0ZXh0U3RhdHVzLCBqcVhIUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fb25Eb25lKHJlc3VsdCwgdGV4dFN0YXR1cywganFYSFIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX29uRmFpbChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKGpxWEhSb3JSZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSb3JFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fb25BbHdheXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganFYSFJvclJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpxWEhSb3JFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fc2VuZGluZyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fYWN0aXZlIC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5saW1pdENvbmN1cnJlbnRVcGxvYWRzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubGltaXRDb25jdXJyZW50VXBsb2FkcyA+IHRoYXQuX3NlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdGFydCB0aGUgbmV4dCBxdWV1ZWQgdXBsb2FkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgaGFzIG5vdCBiZWVuIGFib3J0ZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRTbG90ID0gdGhhdC5fc2xvdHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dFNsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2dldERlZmVycmVkU3RhdGUobmV4dFNsb3QpID09PSAncGVuZGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbG90LnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbG90ID0gdGhhdC5fc2xvdHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5fYWN0aXZlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHN0b3AgY2FsbGJhY2sgaXMgdHJpZ2dlcmVkIHdoZW4gYWxsIHVwbG9hZHMgaGF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJlZW4gY29tcGxldGVkLCBlcXVpdmFsZW50IHRvIHRoZSBnbG9iYWwgYWpheFN0b3AgZXZlbnQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignc3RvcCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpxWEhSO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9iZWZvcmVTZW5kKGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zZXF1ZW50aWFsVXBsb2FkcyB8fFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5vcHRpb25zLmxpbWl0Q29uY3VycmVudFVwbG9hZHMgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpbWl0Q29uY3VycmVudFVwbG9hZHMgPD0gdGhpcy5fc2VuZGluZykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpbWl0Q29uY3VycmVudFVwbG9hZHMgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsb3QgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nsb3RzLnB1c2goc2xvdCk7XG4gICAgICAgICAgICAgICAgICAgIHBpcGUgPSBzbG90LnBpcGUoc2VuZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VxdWVuY2UgPSB0aGlzLl9zZXF1ZW5jZS5waXBlKHNlbmQsIHNlbmQpO1xuICAgICAgICAgICAgICAgICAgICBwaXBlID0gdGhpcy5fc2VxdWVuY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgcGlwZWQgUHJvbWlzZSBvYmplY3QsIGVuaGFuY2VkIHdpdGggYW4gYWJvcnQgbWV0aG9kLFxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIGlzIGRlbGVnYXRlZCB0byB0aGUganFYSFIgb2JqZWN0IG9mIHRoZSBjdXJyZW50IHVwbG9hZCxcbiAgICAgICAgICAgICAgICAvLyBhbmQganFYSFIgY2FsbGJhY2tzIG1hcHBlZCB0byB0aGUgZXF1aXZhbGVudCBQcm9taXNlIG1ldGhvZHM6XG4gICAgICAgICAgICAgICAgcGlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgYWJvcnRlZCA9IFt1bmRlZmluZWQsICdhYm9ydCcsICdhYm9ydCddO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWpxWEhSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xvdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3QucmVqZWN0V2l0aChvcHRpb25zLmNvbnRleHQsIGFib3J0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganFYSFIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmhhbmNlUHJvbWlzZShwaXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZW5kKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQWRkOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIGRhdGEpLFxuICAgICAgICAgICAgICAgIGZpbGVzID0gZGF0YS5maWxlcyxcbiAgICAgICAgICAgICAgICBmaWxlc0xlbmd0aCA9IGZpbGVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IG9wdGlvbnMubGltaXRNdWx0aUZpbGVVcGxvYWRzLFxuICAgICAgICAgICAgICAgIGxpbWl0U2l6ZSA9IG9wdGlvbnMubGltaXRNdWx0aUZpbGVVcGxvYWRTaXplLFxuICAgICAgICAgICAgICAgIG92ZXJoZWFkID0gb3B0aW9ucy5saW1pdE11bHRpRmlsZVVwbG9hZFNpemVPdmVyaGVhZCxcbiAgICAgICAgICAgICAgICBiYXRjaFNpemUgPSAwLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZSA9IHRoaXMuX2dldFBhcmFtTmFtZShvcHRpb25zKSxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWVTZXQsXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lU2xpY2UsXG4gICAgICAgICAgICAgICAgZmlsZVNldCxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgaWYgKCFmaWxlc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW1pdFNpemUgJiYgZmlsZXNbMF0uc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGltaXRTaXplID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEob3B0aW9ucy5zaW5nbGVGaWxlVXBsb2FkcyB8fCBsaW1pdCB8fCBsaW1pdFNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgICF0aGlzLl9pc1hIUlVwbG9hZChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIGZpbGVTZXQgPSBbZmlsZXNdO1xuICAgICAgICAgICAgICAgIHBhcmFtTmFtZVNldCA9IFtwYXJhbU5hbWVdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKG9wdGlvbnMuc2luZ2xlRmlsZVVwbG9hZHMgfHwgbGltaXRTaXplKSAmJiBsaW1pdCkge1xuICAgICAgICAgICAgICAgIGZpbGVTZXQgPSBbXTtcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWVTZXQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZmlsZXNMZW5ndGg7IGkgKz0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVNldC5wdXNoKGZpbGVzLnNsaWNlKGksIGkgKyBsaW1pdCkpO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWVTbGljZSA9IHBhcmFtTmFtZS5zbGljZShpLCBpICsgbGltaXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmFtTmFtZVNsaWNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lU2xpY2UgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lU2V0LnB1c2gocGFyYW1OYW1lU2xpY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMuc2luZ2xlRmlsZVVwbG9hZHMgJiYgbGltaXRTaXplKSB7XG4gICAgICAgICAgICAgICAgZmlsZVNldCA9IFtdO1xuICAgICAgICAgICAgICAgIHBhcmFtTmFtZVNldCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBmaWxlc0xlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhdGNoU2l6ZSArPSBmaWxlc1tpXS5zaXplICsgb3ZlcmhlYWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA9PT0gZmlsZXNMZW5ndGggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGJhdGNoU2l6ZSArIGZpbGVzW2kgKyAxXS5zaXplICsgb3ZlcmhlYWQpID4gbGltaXRTaXplKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsaW1pdCAmJiBpICsgMSAtIGogPj0gbGltaXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2V0LnB1c2goZmlsZXMuc2xpY2UoaiwgaSArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZVNsaWNlID0gcGFyYW1OYW1lLnNsaWNlKGosIGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyYW1OYW1lU2xpY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lU2xpY2UgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWVTZXQucHVzaChwYXJhbU5hbWVTbGljZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaFNpemUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWVTZXQgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLm9yaWdpbmFsRmlsZXMgPSBmaWxlcztcbiAgICAgICAgICAgICQuZWFjaChmaWxlU2V0IHx8IGZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGF0YSA9ICQuZXh0ZW5kKHt9LCBkYXRhKTtcbiAgICAgICAgICAgICAgICBuZXdEYXRhLmZpbGVzID0gZmlsZVNldCA/IGVsZW1lbnQgOiBbZWxlbWVudF07XG4gICAgICAgICAgICAgICAgbmV3RGF0YS5wYXJhbU5hbWUgPSBwYXJhbU5hbWVTZXRbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoYXQuX2luaXRSZXNwb25zZU9iamVjdChuZXdEYXRhKTtcbiAgICAgICAgICAgICAgICB0aGF0Ll9pbml0UHJvZ3Jlc3NPYmplY3QobmV3RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhhdC5fYWRkQ29udmVuaWVuY2VNZXRob2RzKGUsIG5ld0RhdGEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoYXQuX3RyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgICdhZGQnLFxuICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KCdhZGQnLCB7ZGVsZWdhdGVkRXZlbnQ6IGV9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVwbGFjZUZpbGVJbnB1dDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IGRhdGEuZmlsZUlucHV0LFxuICAgICAgICAgICAgICAgIGlucHV0Q2xvbmUgPSBpbnB1dC5jbG9uZSh0cnVlKSxcbiAgICAgICAgICAgICAgICByZXN0b3JlRm9jdXMgPSBpbnB1dC5pcyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIC8vIEFkZCBhIHJlZmVyZW5jZSBmb3IgdGhlIG5ldyBjbG9uZWQgZmlsZSBpbnB1dCB0byB0aGUgZGF0YSBhcmd1bWVudDpcbiAgICAgICAgICAgIGRhdGEuZmlsZUlucHV0Q2xvbmUgPSBpbnB1dENsb25lO1xuICAgICAgICAgICAgJCgnPGZvcm0+PC9mb3JtPicpLmFwcGVuZChpbnB1dENsb25lKVswXS5yZXNldCgpO1xuICAgICAgICAgICAgLy8gRGV0YWNoaW5nIGFsbG93cyB0byBpbnNlcnQgdGhlIGZpbGVJbnB1dCBvbiBhbm90aGVyIGZvcm1cbiAgICAgICAgICAgIC8vIHdpdGhvdXQgbG9vc2luZyB0aGUgZmlsZSBpbnB1dCB2YWx1ZTpcbiAgICAgICAgICAgIGlucHV0LmFmdGVyKGlucHV0Q2xvbmUpLmRldGFjaCgpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGZpbGVJbnB1dCBoYWQgZm9jdXMgYmVmb3JlIGl0IHdhcyBkZXRhY2hlZCxcbiAgICAgICAgICAgIC8vIHJlc3RvcmUgZm9jdXMgdG8gdGhlIGlucHV0Q2xvbmUuXG4gICAgICAgICAgICBpZiAocmVzdG9yZUZvY3VzKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRDbG9uZS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXZvaWQgbWVtb3J5IGxlYWtzIHdpdGggdGhlIGRldGFjaGVkIGZpbGUgaW5wdXQ6XG4gICAgICAgICAgICAkLmNsZWFuRGF0YShpbnB1dC51bmJpbmQoJ3JlbW92ZScpKTtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIG9yaWdpbmFsIGZpbGUgaW5wdXQgZWxlbWVudCBpbiB0aGUgZmlsZUlucHV0XG4gICAgICAgICAgICAvLyBlbGVtZW50cyBzZXQgd2l0aCB0aGUgY2xvbmUsIHdoaWNoIGhhcyBiZWVuIGNvcGllZCBpbmNsdWRpbmdcbiAgICAgICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzOlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpbGVJbnB1dCA9IHRoaXMub3B0aW9ucy5maWxlSW5wdXQubWFwKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgICAgIGlmIChlbCA9PT0gaW5wdXRbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0Q2xvbmVbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHdpZGdldCBoYXMgYmVlbiBpbml0aWFsaXplZCBvbiB0aGUgZmlsZSBpbnB1dCBpdHNlbGYsXG4gICAgICAgICAgICAvLyBvdmVycmlkZSB0aGlzLmVsZW1lbnQgd2l0aCB0aGUgZmlsZSBpbnB1dCBjbG9uZTpcbiAgICAgICAgICAgIGlmIChpbnB1dFswXSA9PT0gdGhpcy5lbGVtZW50WzBdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gaW5wdXRDbG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaGFuZGxlRmlsZVRyZWVFbnRyeTogZnVuY3Rpb24gKGVudHJ5LCBwYXRoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlICYmICFlLmVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLmVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgJC53aGVuIHJldHVybnMgaW1tZWRpYXRlbHkgaWYgb25lXG4gICAgICAgICAgICAgICAgICAgIC8vIERlZmVycmVkIGlzIHJlamVjdGVkLCB3ZSB1c2UgcmVzb2x2ZSBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFsbG93cyB2YWxpZCBmaWxlcyBhbmQgaW52YWxpZCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAvLyB0byBiZSByZXR1cm5lZCB0b2dldGhlciBpbiBvbmUgc2V0OlxuICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShbZV0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0hhbmRsZXIgPSBmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9oYW5kbGVGaWxlVHJlZUVudHJpZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCArIGVudHJ5Lm5hbWUgKyAnLydcbiAgICAgICAgICAgICAgICAgICAgKS5kb25lKGZ1bmN0aW9uIChmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmUoZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGVycm9ySGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWFkRW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyUmVhZGVyLnJlYWRFbnRyaWVzKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0hhbmRsZXIoZW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXMgPSBlbnRyaWVzLmNvbmNhdChyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkRW50cmllcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlyUmVhZGVyLCBlbnRyaWVzID0gW107XG4gICAgICAgICAgICBwYXRoID0gcGF0aCB8fCAnJztcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuX2ZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgQ2hyb21lIGJ1ZyAjMTQ5NzM1XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Ll9maWxlLnJlbGF0aXZlUGF0aCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKGVudHJ5Ll9maWxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5maWxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnJlbGF0aXZlUGF0aCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgZGlyUmVhZGVyID0gZW50cnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgcmVhZEVudHJpZXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIGFuIGVtcHkgbGlzdCBmb3IgZmlsZSBzeXN0ZW0gaXRlbXNcbiAgICAgICAgICAgICAgICAvLyBvdGhlciB0aGFuIGZpbGVzIG9yIGRpcmVjdG9yaWVzOlxuICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9oYW5kbGVGaWxlVHJlZUVudHJpZXM6IGZ1bmN0aW9uIChlbnRyaWVzLCBwYXRoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gJC53aGVuLmFwcGx5KFxuICAgICAgICAgICAgICAgICQsXG4gICAgICAgICAgICAgICAgJC5tYXAoZW50cmllcywgZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Ll9oYW5kbGVGaWxlVHJlZUVudHJ5KGVudHJ5LCBwYXRoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS5waXBlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShcbiAgICAgICAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RHJvcHBlZEZpbGVzOiBmdW5jdGlvbiAoZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICBkYXRhVHJhbnNmZXIgPSBkYXRhVHJhbnNmZXIgfHwge307XG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBkYXRhVHJhbnNmZXIuaXRlbXM7XG4gICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoICYmIChpdGVtc1swXS53ZWJraXRHZXRBc0VudHJ5IHx8XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zWzBdLmdldEFzRW50cnkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZpbGVUcmVlRW50cmllcyhcbiAgICAgICAgICAgICAgICAgICAgJC5tYXAoaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50cnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkgPSBpdGVtLndlYmtpdEdldEFzRW50cnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgQ2hyb21lIGJ1ZyAjMTQ5NzM1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5fZmlsZSA9IGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEFzRW50cnkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKFxuICAgICAgICAgICAgICAgICQubWFrZUFycmF5KGRhdGFUcmFuc2Zlci5maWxlcylcbiAgICAgICAgICAgICkucHJvbWlzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRTaW5nbGVGaWxlSW5wdXRGaWxlczogZnVuY3Rpb24gKGZpbGVJbnB1dCkge1xuICAgICAgICAgICAgZmlsZUlucHV0ID0gJChmaWxlSW5wdXQpO1xuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSBmaWxlSW5wdXQucHJvcCgnd2Via2l0RW50cmllcycpIHx8XG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnB1dC5wcm9wKCdlbnRyaWVzJyksXG4gICAgICAgICAgICAgICAgZmlsZXMsXG4gICAgICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgICAgICBpZiAoZW50cmllcyAmJiBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVGaWxlVHJlZUVudHJpZXMoZW50cmllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWxlcyA9ICQubWFrZUFycmF5KGZpbGVJbnB1dC5wcm9wKCdmaWxlcycpKTtcbiAgICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBmaWxlSW5wdXQucHJvcCgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShbXSkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZmlsZXMgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZSwgdGhlIGJyb3dzZXIgZG9lcyBub3RcbiAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IHRoZSBGaWxlIEFQSSBhbmQgd2UgYWRkIGEgcHNldWRvIEZpbGUgb2JqZWN0IHdpdGhcbiAgICAgICAgICAgICAgICAvLyB0aGUgaW5wdXQgdmFsdWUgYXMgbmFtZSB3aXRoIHBhdGggaW5mb3JtYXRpb24gcmVtb3ZlZDpcbiAgICAgICAgICAgICAgICBmaWxlcyA9IFt7bmFtZTogdmFsdWUucmVwbGFjZSgvXi4qXFxcXC8sICcnKX1dO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlc1swXS5uYW1lID09PSB1bmRlZmluZWQgJiYgZmlsZXNbMF0uZmlsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyBGaWxlIG5vcm1hbGl6YXRpb24gZm9yIFNhZmFyaSA0IGFuZCBGaXJlZm94IDM6XG4gICAgICAgICAgICAgICAgJC5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5uYW1lID0gZmlsZS5maWxlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5zaXplID0gZmlsZS5maWxlU2l6ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmaWxlcykucHJvbWlzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRGaWxlSW5wdXRGaWxlczogZnVuY3Rpb24gKGZpbGVJbnB1dCkge1xuICAgICAgICAgICAgaWYgKCEoZmlsZUlucHV0IGluc3RhbmNlb2YgJCkgfHwgZmlsZUlucHV0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTaW5nbGVGaWxlSW5wdXRGaWxlcyhmaWxlSW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQud2hlbi5hcHBseShcbiAgICAgICAgICAgICAgICAkLFxuICAgICAgICAgICAgICAgICQubWFwKGZpbGVJbnB1dCwgdGhpcy5fZ2V0U2luZ2xlRmlsZUlucHV0RmlsZXMpXG4gICAgICAgICAgICApLnBpcGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFxuICAgICAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wdXQ6ICQoZS50YXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICBmb3JtOiAkKGUudGFyZ2V0LmZvcm0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2dldEZpbGVJbnB1dEZpbGVzKGRhdGEuZmlsZUlucHV0KS5hbHdheXMoZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9IGZpbGVzO1xuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucmVwbGFjZUZpbGVJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZXBsYWNlRmlsZUlucHV0KGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhhdC5fdHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJC5FdmVudCgnY2hhbmdlJywge2RlbGVnYXRlZEV2ZW50OiBlfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgICAgICkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX29uQWRkKGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vblBhc3RlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGl0ZW1zID0gZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhICYmXG4gICAgICAgICAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhLml0ZW1zLFxuICAgICAgICAgICAgICAgIGRhdGEgPSB7ZmlsZXM6IFtdfTtcbiAgICAgICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goaXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGl0ZW0uZ2V0QXNGaWxlICYmIGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYXN0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KCdwYXN0ZScsIHtkZWxlZ2F0ZWRFdmVudDogZX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgICAgICApICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkFkZChlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uRHJvcDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyID0gZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZGF0YVRyYW5zZmVyID0gZS5kYXRhVHJhbnNmZXIsXG4gICAgICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgaWYgKGRhdGFUcmFuc2ZlciAmJiBkYXRhVHJhbnNmZXIuZmlsZXMgJiYgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXREcm9wcGVkRmlsZXMoZGF0YVRyYW5zZmVyKS5hbHdheXMoZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmlsZXMgPSBmaWxlcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX3RyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Ryb3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuRXZlbnQoJ2Ryb3AnLCB7ZGVsZWdhdGVkRXZlbnQ6IGV9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICApICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fb25BZGQoZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25EcmFnT3ZlcjogZ2V0RHJhZ0hhbmRsZXIoJ2RyYWdvdmVyJyksXG5cbiAgICAgICAgX29uRHJhZ0VudGVyOiBnZXREcmFnSGFuZGxlcignZHJhZ2VudGVyJyksXG5cbiAgICAgICAgX29uRHJhZ0xlYXZlOiBnZXREcmFnSGFuZGxlcignZHJhZ2xlYXZlJyksXG5cbiAgICAgICAgX2luaXRFdmVudEhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNYSFJVcGxvYWQodGhpcy5vcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uKHRoaXMub3B0aW9ucy5kcm9wWm9uZSwge1xuICAgICAgICAgICAgICAgICAgICBkcmFnb3ZlcjogdGhpcy5fb25EcmFnT3ZlcixcbiAgICAgICAgICAgICAgICAgICAgZHJvcDogdGhpcy5fb25Ecm9wLFxuICAgICAgICAgICAgICAgICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIG9uIGRyYWdlbnRlciBpcyByZXF1aXJlZCBmb3IgSUUxMCs6XG4gICAgICAgICAgICAgICAgICAgIGRyYWdlbnRlcjogdGhpcy5fb25EcmFnRW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYWdsZWF2ZSBpcyBub3QgcmVxdWlyZWQsIGJ1dCBhZGRlZCBmb3IgY29tcGxldGVuZXNzOlxuICAgICAgICAgICAgICAgICAgICBkcmFnbGVhdmU6IHRoaXMuX29uRHJhZ0xlYXZlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb24odGhpcy5vcHRpb25zLnBhc3RlWm9uZSwge1xuICAgICAgICAgICAgICAgICAgICBwYXN0ZTogdGhpcy5fb25QYXN0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQuc3VwcG9ydC5maWxlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbih0aGlzLm9wdGlvbnMuZmlsZUlucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogdGhpcy5fb25DaGFuZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfZGVzdHJveUV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX29mZih0aGlzLm9wdGlvbnMuZHJvcFpvbmUsICdkcmFnZW50ZXIgZHJhZ2xlYXZlIGRyYWdvdmVyIGRyb3AnKTtcbiAgICAgICAgICAgIHRoaXMuX29mZih0aGlzLm9wdGlvbnMucGFzdGVab25lLCAncGFzdGUnKTtcbiAgICAgICAgICAgIHRoaXMuX29mZih0aGlzLm9wdGlvbnMuZmlsZUlucHV0LCAnY2hhbmdlJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldE9wdGlvbjogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZWluaXQgPSAkLmluQXJyYXkoa2V5LCB0aGlzLl9zcGVjaWFsT3B0aW9ucykgIT09IC0xO1xuICAgICAgICAgICAgaWYgKHJlaW5pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdXBlcihrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChyZWluaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0U3BlY2lhbE9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0RXZlbnRIYW5kbGVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9pbml0U3BlY2lhbE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmlsZUlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZpbGVJbnB1dCA9IHRoaXMuZWxlbWVudC5pcygnaW5wdXRbdHlwZT1cImZpbGVcIl0nKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgOiB0aGlzLmVsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1cImZpbGVcIl0nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShvcHRpb25zLmZpbGVJbnB1dCBpbnN0YW5jZW9mICQpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlSW5wdXQgPSAkKG9wdGlvbnMuZmlsZUlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG9wdGlvbnMuZHJvcFpvbmUgaW5zdGFuY2VvZiAkKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZHJvcFpvbmUgPSAkKG9wdGlvbnMuZHJvcFpvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEob3B0aW9ucy5wYXN0ZVpvbmUgaW5zdGFuY2VvZiAkKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucGFzdGVab25lID0gJChvcHRpb25zLnBhc3RlWm9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFJlZ0V4cDogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCcvJyksXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzID0gcGFydHMucG9wKCk7XG4gICAgICAgICAgICBwYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAocGFydHMuam9pbignLycpLCBtb2RpZmllcnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9pc1JlZ0V4cE9wdGlvbjogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgIT09ICd1cmwnICYmICQudHlwZSh2YWx1ZSkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgL15cXC8uKlxcL1tpZ21dezAsM30kLy50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdERhdGFBdHRyaWJ1dGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5lbGVtZW50LmRhdGEoKTtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgb3B0aW9ucyBzZXQgdmlhIEhUTUw1IGRhdGEtYXR0cmlidXRlczpcbiAgICAgICAgICAgICQuZWFjaChcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRbMF0uYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoaW5kZXgsIGF0dHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgvXmRhdGEtLy50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgaHlwaGVuLWF0ZWQga2V5IHRvIGNhbWVsQ2FzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleS5zbGljZSg1KS5yZXBsYWNlKC8tW2Etel0vZywgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHIuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2lzUmVnRXhwT3B0aW9uKGtleSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGF0Ll9nZXRSZWdFeHAodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXREYXRhQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgdGhpcy5faW5pdFNwZWNpYWxPcHRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLl9zbG90cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2VxdWVuY2UgPSB0aGlzLl9nZXRYSFJQcm9taXNlKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5fc2VuZGluZyA9IHRoaXMuX2FjdGl2ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9pbml0UHJvZ3Jlc3NPYmplY3QodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9pbml0RXZlbnRIYW5kbGVycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgdG8gdGhlIHdpZGdldCBBUEkgYW5kIGFsbG93cyB0byBxdWVyeVxuICAgICAgICAvLyB0aGUgbnVtYmVyIG9mIGFjdGl2ZSB1cGxvYWRzOlxuICAgICAgICBhY3RpdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZXhwb3NlZCB0byB0aGUgd2lkZ2V0IEFQSSBhbmQgYWxsb3dzIHRvIHF1ZXJ5XG4gICAgICAgIC8vIHRoZSB3aWRnZXQgdXBsb2FkIHByb2dyZXNzLlxuICAgICAgICAvLyBJdCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGxvYWRlZCwgdG90YWwgYW5kIGJpdHJhdGUgcHJvcGVydGllc1xuICAgICAgICAvLyBmb3IgdGhlIHJ1bm5pbmcgdXBsb2FkczpcbiAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmVzcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBleHBvc2VkIHRvIHRoZSB3aWRnZXQgQVBJIGFuZCBhbGxvd3MgYWRkaW5nIGZpbGVzXG4gICAgICAgIC8vIHVzaW5nIHRoZSBmaWxldXBsb2FkIEFQSS4gVGhlIGRhdGEgcGFyYW1ldGVyIGFjY2VwdHMgYW4gb2JqZWN0IHdoaWNoXG4gICAgICAgIC8vIG11c3QgaGF2ZSBhIGZpbGVzIHByb3BlcnR5IGFuZCBjYW4gY29udGFpbiBhZGRpdGlvbmFsIG9wdGlvbnM6XG4gICAgICAgIC8vIC5maWxldXBsb2FkKCdhZGQnLCB7ZmlsZXM6IGZpbGVzTGlzdH0pO1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgdGhpcy5vcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsZUlucHV0ICYmICFkYXRhLmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0RmlsZUlucHV0RmlsZXMoZGF0YS5maWxlSW5wdXQpLmFsd2F5cyhmdW5jdGlvbiAoZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9IGZpbGVzO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vbkFkZChudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9ICQubWFrZUFycmF5KGRhdGEuZmlsZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQWRkKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgdG8gdGhlIHdpZGdldCBBUEkgYW5kIGFsbG93cyBzZW5kaW5nIGZpbGVzXG4gICAgICAgIC8vIHVzaW5nIHRoZSBmaWxldXBsb2FkIEFQSS4gVGhlIGRhdGEgcGFyYW1ldGVyIGFjY2VwdHMgYW4gb2JqZWN0IHdoaWNoXG4gICAgICAgIC8vIG11c3QgaGF2ZSBhIGZpbGVzIG9yIGZpbGVJbnB1dCBwcm9wZXJ0eSBhbmQgY2FuIGNvbnRhaW4gYWRkaXRpb25hbCBvcHRpb25zOlxuICAgICAgICAvLyAuZmlsZXVwbG9hZCgnc2VuZCcsIHtmaWxlczogZmlsZXNMaXN0fSk7XG4gICAgICAgIC8vIFRoZSBtZXRob2QgcmV0dXJucyBhIFByb21pc2Ugb2JqZWN0IGZvciB0aGUgZmlsZSB1cGxvYWQgY2FsbC5cbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmICF0aGlzLm9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5maWxlSW5wdXQgJiYgIWRhdGEuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IGRmZC5wcm9taXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBqcVhIUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqcVhIUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqcVhIUi5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlamVjdChudWxsLCAnYWJvcnQnLCAnYWJvcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRGaWxlSW5wdXRGaWxlcyhkYXRhLmZpbGVJbnB1dCkuYWx3YXlzKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9IGZpbGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpxWEhSID0gdGhhdC5fb25TZW5kKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpxWEhSLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlamVjdChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuaGFuY2VQcm9taXNlKHByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhLmZpbGVzID0gJC5tYWtlQXJyYXkoZGF0YS5maWxlcyk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vblNlbmQobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFhIUlByb21pc2UoZmFsc2UsIGRhdGEgJiYgZGF0YS5jb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKTtcbiIsIi8qXG4gKiBqUXVlcnkgRmlsZSBVcGxvYWQgUHJvY2Vzc2luZyBQbHVnaW5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL2pRdWVyeS1GaWxlLVVwbG9hZFxuICpcbiAqIENvcHlyaWdodCAyMDEyLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiBqc2hpbnQgbm9tZW46ZmFsc2UgKi9cbi8qIGdsb2JhbCBkZWZpbmUsIHJlcXVpcmUsIHdpbmRvdyAqL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgQU1EIG1vZHVsZTpcbiAgICAgICAgZGVmaW5lKFtcbiAgICAgICAgICAgICdqcXVlcnknLFxuICAgICAgICAgICAgJy4vanF1ZXJ5LmZpbGV1cGxvYWQnXG4gICAgICAgIF0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlM6XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsczpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHdpbmRvdy5qUXVlcnlcbiAgICAgICAgKTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIG9yaWdpbmFsQWRkID0gJC5ibHVlaW1wLmZpbGV1cGxvYWQucHJvdG90eXBlLm9wdGlvbnMuYWRkO1xuXG4gICAgLy8gVGhlIEZpbGUgVXBsb2FkIFByb2Nlc3NpbmcgcGx1Z2luIGV4dGVuZHMgdGhlIGZpbGV1cGxvYWQgd2lkZ2V0XG4gICAgLy8gd2l0aCBmaWxlIHByb2Nlc3NpbmcgZnVuY3Rpb25hbGl0eTpcbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywgJC5ibHVlaW1wLmZpbGV1cGxvYWQsIHtcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyBUaGUgbGlzdCBvZiBwcm9jZXNzaW5nIGFjdGlvbnM6XG4gICAgICAgICAgICBwcm9jZXNzUXVldWU6IFtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnbG9nJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RlYnVnJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGRhdGEucHJvY2VzcyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkdGhpcy5maWxldXBsb2FkKCdwcm9jZXNzJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxBZGQuY2FsbCh0aGlzLCBlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9jZXNzQWN0aW9uczoge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGxvZzogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlW29wdGlvbnMudHlwZV0oXG4gICAgICAgICAgICAgICAgICAgICdQcm9jZXNzaW5nIFwiJyArIGRhdGEuZmlsZXNbZGF0YS5pbmRleF0ubmFtZSArICdcIidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKi9cbiAgICAgICAgfSxcblxuICAgICAgICBfcHJvY2Vzc0ZpbGU6IGZ1bmN0aW9uIChkYXRhLCBvcmlnaW5hbERhdGEpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkZmQgPSAkLkRlZmVycmVkKCkucmVzb2x2ZVdpdGgodGhhdCwgW2RhdGFdKSxcbiAgICAgICAgICAgICAgICBjaGFpbiA9IGRmZC5wcm9taXNlKCk7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdwcm9jZXNzJywgbnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAkLmVhY2goZGF0YS5wcm9jZXNzUXVldWUsIGZ1bmN0aW9uIChpLCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGF0YS5lcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVqZWN0V2l0aCh0aGF0LCBbb3JpZ2luYWxEYXRhXSkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnByb2Nlc3NBY3Rpb25zW3NldHRpbmdzLmFjdGlvbl0uY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNoYWluID0gY2hhaW4ucGlwZShmdW5jLCBzZXR0aW5ncy5hbHdheXMgJiYgZnVuYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYWluXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdwcm9jZXNzZG9uZScsIG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdwcm9jZXNzYWx3YXlzJywgbnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3Byb2Nlc3NmYWlsJywgbnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3Byb2Nlc3NhbHdheXMnLCBudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXBsYWNlcyB0aGUgc2V0dGluZ3Mgb2YgZWFjaCBwcm9jZXNzUXVldWUgaXRlbSB0aGF0XG4gICAgICAgIC8vIGFyZSBzdHJpbmdzIHN0YXJ0aW5nIHdpdGggYW4gXCJAXCIsIHVzaW5nIHRoZSByZW1haW5pbmdcbiAgICAgICAgLy8gc3Vic3RyaW5nIGFzIGtleSBmb3IgdGhlIG9wdGlvbiBtYXAsXG4gICAgICAgIC8vIGUuZy4gXCJAYXV0b1VwbG9hZFwiIGlzIHJlcGxhY2VkIHdpdGggb3B0aW9ucy5hdXRvVXBsb2FkOlxuICAgICAgICBfdHJhbnNmb3JtUHJvY2Vzc1F1ZXVlOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMucHJvY2Vzc1F1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge30sXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IHRoaXMuYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXggPSB0aGlzLnByZWZpeCA9PT0gdHJ1ZSA/IGFjdGlvbiA6IHRoaXMucHJlZml4O1xuICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC50eXBlKHZhbHVlKSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGFyQXQoMCkgPT09ICdAJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Nba2V5XSA9IG9wdGlvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuc2xpY2UoMSkgfHwgKHByZWZpeCA/IHByZWZpeCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKSA6IGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NRdWV1ZS5wdXNoKHNldHRpbmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3B0aW9ucy5wcm9jZXNzUXVldWUgPSBwcm9jZXNzUXVldWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGZpbGVzIGN1cnJlbnRseSBpbiB0aGUgcHJvY2Vzc3NpbmcgcXVldWU6XG4gICAgICAgIHByb2Nlc3Npbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzaW5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFByb2Nlc3NlcyB0aGUgZmlsZXMgZ2l2ZW4gYXMgZmlsZXMgcHJvcGVydHkgb2YgdGhlIGRhdGEgcGFyYW1ldGVyLFxuICAgICAgICAvLyByZXR1cm5zIGEgUHJvbWlzZSBvYmplY3QgdGhhdCBhbGxvd3MgdG8gYmluZCBjYWxsYmFja3M6XG4gICAgICAgIHByb2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucHJvY2Vzc1F1ZXVlICYmIG9wdGlvbnMucHJvY2Vzc1F1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zZm9ybVByb2Nlc3NRdWV1ZShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvY2Vzc2luZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdwcm9jZXNzc3RhcnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEuZmlsZXMsIGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IGluZGV4ID8gJC5leHRlbmQoe30sIG9wdGlvbnMpIDogb3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWplY3RXaXRoKHRoYXQsIFtkYXRhXSkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5fcHJvY2Vzc0ZpbGUob3B0cywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3Byb2Nlc3NpbmcgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fcHJvY2Vzc2luZ1F1ZXVlID0gdGhhdC5fcHJvY2Vzc2luZ1F1ZXVlLnBpcGUoZnVuYywgZnVuYylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3Byb2Nlc3NpbmcgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5fcHJvY2Vzc2luZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdwcm9jZXNzc3RvcCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NpbmdRdWV1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2luZyA9IDA7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzaW5nUXVldWUgPSAkLkRlZmVycmVkKCkucmVzb2x2ZVdpdGgodGhpcylcbiAgICAgICAgICAgICAgICAucHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkpO1xuIiwiLypcbiAqIGpRdWVyeSBGaWxlIFVwbG9hZCBJbWFnZSBQcmV2aWV3ICYgUmVzaXplIFBsdWdpblxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvalF1ZXJ5LUZpbGUtVXBsb2FkXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbi8qIGpzaGludCBub21lbjpmYWxzZSAqL1xuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93LCBCbG9iICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBBTUQgbW9kdWxlOlxuICAgICAgICBkZWZpbmUoW1xuICAgICAgICAgICAgJ2pxdWVyeScsXG4gICAgICAgICAgICAnbG9hZC1pbWFnZScsXG4gICAgICAgICAgICAnbG9hZC1pbWFnZS1tZXRhJyxcbiAgICAgICAgICAgICdsb2FkLWltYWdlLWV4aWYnLFxuICAgICAgICAgICAgJ2NhbnZhcy10by1ibG9iJyxcbiAgICAgICAgICAgICcuL2pxdWVyeS5maWxldXBsb2FkLXByb2Nlc3MnXG4gICAgICAgIF0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlM6XG4gICAgICAgIGZhY3RvcnkoXG4gICAgICAgICAgICByZXF1aXJlKCdqcXVlcnknKSxcbiAgICAgICAgICAgIHJlcXVpcmUoJ2JsdWVpbXAtbG9hZC1pbWFnZS9qcy9sb2FkLWltYWdlJyksXG4gICAgICAgICAgICByZXF1aXJlKCdibHVlaW1wLWxvYWQtaW1hZ2UvanMvbG9hZC1pbWFnZS1tZXRhJyksXG4gICAgICAgICAgICByZXF1aXJlKCdibHVlaW1wLWxvYWQtaW1hZ2UvanMvbG9hZC1pbWFnZS1leGlmJyksXG4gICAgICAgICAgICByZXF1aXJlKCdibHVlaW1wLWNhbnZhcy10by1ibG9iJyksXG4gICAgICAgICAgICByZXF1aXJlKCcuL2pxdWVyeS5maWxldXBsb2FkLXByb2Nlc3MnKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsczpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHdpbmRvdy5qUXVlcnksXG4gICAgICAgICAgICB3aW5kb3cubG9hZEltYWdlXG4gICAgICAgICk7XG4gICAgfVxufShmdW5jdGlvbiAoJCwgbG9hZEltYWdlKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gUHJlcGVuZCB0byB0aGUgZGVmYXVsdCBwcm9jZXNzUXVldWU6XG4gICAgJC5ibHVlaW1wLmZpbGV1cGxvYWQucHJvdG90eXBlLm9wdGlvbnMucHJvY2Vzc1F1ZXVlLnVuc2hpZnQoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2xvYWRJbWFnZU1ldGFEYXRhJyxcbiAgICAgICAgICAgIGRpc2FibGVJbWFnZUhlYWQ6ICdAJyxcbiAgICAgICAgICAgIGRpc2FibGVFeGlmOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlRXhpZlRodW1ibmFpbDogJ0AnLFxuICAgICAgICAgICAgZGlzYWJsZUV4aWZTdWI6ICdAJyxcbiAgICAgICAgICAgIGRpc2FibGVFeGlmR3BzOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlSW1hZ2VNZXRhRGF0YUxvYWQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2xvYWRJbWFnZScsXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGFjdGlvbiBhcyBwcmVmaXggZm9yIHRoZSBcIkBcIiBvcHRpb25zOlxuICAgICAgICAgICAgcHJlZml4OiB0cnVlLFxuICAgICAgICAgICAgZmlsZVR5cGVzOiAnQCcsXG4gICAgICAgICAgICBtYXhGaWxlU2l6ZTogJ0AnLFxuICAgICAgICAgICAgbm9SZXZva2U6ICdAJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQGRpc2FibGVJbWFnZUxvYWQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3Jlc2l6ZUltYWdlJyxcbiAgICAgICAgICAgIC8vIFVzZSBcImltYWdlXCIgYXMgcHJlZml4IGZvciB0aGUgXCJAXCIgb3B0aW9uczpcbiAgICAgICAgICAgIHByZWZpeDogJ2ltYWdlJyxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnQCcsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6ICdAJyxcbiAgICAgICAgICAgIG1pbldpZHRoOiAnQCcsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6ICdAJyxcbiAgICAgICAgICAgIGNyb3A6ICdAJyxcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiAnQCcsXG4gICAgICAgICAgICBmb3JjZVJlc2l6ZTogJ0AnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUltYWdlUmVzaXplJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdzYXZlSW1hZ2UnLFxuICAgICAgICAgICAgcXVhbGl0eTogJ0BpbWFnZVF1YWxpdHknLFxuICAgICAgICAgICAgdHlwZTogJ0BpbWFnZVR5cGUnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUltYWdlUmVzaXplJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdzYXZlSW1hZ2VNZXRhRGF0YScsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlSW1hZ2VNZXRhRGF0YVNhdmUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3Jlc2l6ZUltYWdlJyxcbiAgICAgICAgICAgIC8vIFVzZSBcInByZXZpZXdcIiBhcyBwcmVmaXggZm9yIHRoZSBcIkBcIiBvcHRpb25zOlxuICAgICAgICAgICAgcHJlZml4OiAncHJldmlldycsXG4gICAgICAgICAgICBtYXhXaWR0aDogJ0AnLFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiAnQCcsXG4gICAgICAgICAgICBtaW5XaWR0aDogJ0AnLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiAnQCcsXG4gICAgICAgICAgICBjcm9wOiAnQCcsXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogJ0AnLFxuICAgICAgICAgICAgdGh1bWJuYWlsOiAnQCcsXG4gICAgICAgICAgICBjYW52YXM6ICdAJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQGRpc2FibGVJbWFnZVByZXZpZXcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3NldEltYWdlJyxcbiAgICAgICAgICAgIG5hbWU6ICdAaW1hZ2VQcmV2aWV3TmFtZScsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlSW1hZ2VQcmV2aWV3J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdkZWxldGVJbWFnZVJlZmVyZW5jZXMnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUltYWdlUmVmZXJlbmNlc0RlbGV0aW9uJ1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIC8vIFRoZSBGaWxlIFVwbG9hZCBSZXNpemUgcGx1Z2luIGV4dGVuZHMgdGhlIGZpbGV1cGxvYWQgd2lkZ2V0XG4gICAgLy8gd2l0aCBpbWFnZSByZXNpemUgZnVuY3Rpb25hbGl0eTpcbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywgJC5ibHVlaW1wLmZpbGV1cGxvYWQsIHtcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyBUaGUgcmVndWxhciBleHByZXNzaW9uIGZvciB0aGUgdHlwZXMgb2YgaW1hZ2VzIHRvIGxvYWQ6XG4gICAgICAgICAgICAvLyBtYXRjaGVkIGFnYWluc3QgdGhlIGZpbGUgdHlwZTpcbiAgICAgICAgICAgIGxvYWRJbWFnZUZpbGVUeXBlczogL15pbWFnZVxcLyhnaWZ8anBlZ3xwbmd8c3ZnXFwreG1sKSQvLFxuICAgICAgICAgICAgLy8gVGhlIG1heGltdW0gZmlsZSBzaXplIG9mIGltYWdlcyB0byBsb2FkOlxuICAgICAgICAgICAgbG9hZEltYWdlTWF4RmlsZVNpemU6IDEwMDAwMDAwLCAvLyAxME1CXG4gICAgICAgICAgICAvLyBUaGUgbWF4aW11bSB3aWR0aCBvZiByZXNpemVkIGltYWdlczpcbiAgICAgICAgICAgIGltYWdlTWF4V2lkdGg6IDE5MjAsXG4gICAgICAgICAgICAvLyBUaGUgbWF4aW11bSBoZWlnaHQgb2YgcmVzaXplZCBpbWFnZXM6XG4gICAgICAgICAgICBpbWFnZU1heEhlaWdodDogMTA4MCxcbiAgICAgICAgICAgIC8vIERlZmluZXMgdGhlIGltYWdlIG9yaWVudGF0aW9uICgxLTgpIG9yIHRha2VzIHRoZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgLy8gdmFsdWUgZnJvbSBFeGlmIGRhdGEgaWYgc2V0IHRvIHRydWU6XG4gICAgICAgICAgICBpbWFnZU9yaWVudGF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIERlZmluZSBpZiByZXNpemVkIGltYWdlcyBzaG91bGQgYmUgY3JvcHBlZCBvciBvbmx5IHNjYWxlZDpcbiAgICAgICAgICAgIGltYWdlQ3JvcDogZmFsc2UsXG4gICAgICAgICAgICAvLyBEaXNhYmxlIHRoZSByZXNpemUgaW1hZ2UgZnVuY3Rpb25hbGl0eSBieSBkZWZhdWx0OlxuICAgICAgICAgICAgZGlzYWJsZUltYWdlUmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgLy8gVGhlIG1heGltdW0gd2lkdGggb2YgdGhlIHByZXZpZXcgaW1hZ2VzOlxuICAgICAgICAgICAgcHJldmlld01heFdpZHRoOiA4MCxcbiAgICAgICAgICAgIC8vIFRoZSBtYXhpbXVtIGhlaWdodCBvZiB0aGUgcHJldmlldyBpbWFnZXM6XG4gICAgICAgICAgICBwcmV2aWV3TWF4SGVpZ2h0OiA4MCxcbiAgICAgICAgICAgIC8vIERlZmluZXMgdGhlIHByZXZpZXcgb3JpZW50YXRpb24gKDEtOCkgb3IgdGFrZXMgdGhlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICAvLyB2YWx1ZSBmcm9tIEV4aWYgZGF0YSBpZiBzZXQgdG8gdHJ1ZTpcbiAgICAgICAgICAgIHByZXZpZXdPcmllbnRhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgcHJldmlldyB1c2luZyB0aGUgRXhpZiBkYXRhIHRodW1ibmFpbDpcbiAgICAgICAgICAgIHByZXZpZXdUaHVtYm5haWw6IHRydWUsXG4gICAgICAgICAgICAvLyBEZWZpbmUgaWYgcHJldmlldyBpbWFnZXMgc2hvdWxkIGJlIGNyb3BwZWQgb3Igb25seSBzY2FsZWQ6XG4gICAgICAgICAgICBwcmV2aWV3Q3JvcDogZmFsc2UsXG4gICAgICAgICAgICAvLyBEZWZpbmUgaWYgcHJldmlldyBpbWFnZXMgc2hvdWxkIGJlIHJlc2l6ZWQgYXMgY2FudmFzIGVsZW1lbnRzOlxuICAgICAgICAgICAgcHJldmlld0NhbnZhczogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb2Nlc3NBY3Rpb25zOiB7XG5cbiAgICAgICAgICAgIC8vIExvYWRzIHRoZSBpbWFnZSBnaXZlbiB2aWEgZGF0YS5maWxlcyBhbmQgZGF0YS5pbmRleFxuICAgICAgICAgICAgLy8gYXMgaW1nIGVsZW1lbnQsIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBGaWxlIEFQSS5cbiAgICAgICAgICAgIC8vIEFjY2VwdHMgdGhlIG9wdGlvbnMgZmlsZVR5cGVzIChyZWd1bGFyIGV4cHJlc3Npb24pXG4gICAgICAgICAgICAvLyBhbmQgbWF4RmlsZVNpemUgKGludGVnZXIpIHRvIGxpbWl0IHRoZSBmaWxlcyB0byBsb2FkOlxuICAgICAgICAgICAgbG9hZEltYWdlOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKCgkLnR5cGUob3B0aW9ucy5tYXhGaWxlU2l6ZSkgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5zaXplID4gb3B0aW9ucy5tYXhGaWxlU2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChvcHRpb25zLmZpbGVUeXBlcyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFvcHRpb25zLmZpbGVUeXBlcy50ZXN0KGZpbGUudHlwZSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAhbG9hZEltYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nLnNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pbWcgPSBpbWc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoYXQsIFtkYXRhXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGZkLnByb21pc2UoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIFJlc2l6ZXMgdGhlIGltYWdlIGdpdmVuIGFzIGRhdGEuY2FudmFzIG9yIGRhdGEuaW1nXG4gICAgICAgICAgICAvLyBhbmQgdXBkYXRlcyBkYXRhLmNhbnZhcyBvciBkYXRhLmltZyB3aXRoIHRoZSByZXNpemVkIGltYWdlLlxuICAgICAgICAgICAgLy8gQWxzbyBzdG9yZXMgdGhlIHJlc2l6ZWQgaW1hZ2UgYXMgcHJldmlldyBwcm9wZXJ0eS5cbiAgICAgICAgICAgIC8vIEFjY2VwdHMgdGhlIG9wdGlvbnMgbWF4V2lkdGgsIG1heEhlaWdodCwgbWluV2lkdGgsXG4gICAgICAgICAgICAvLyBtaW5IZWlnaHQsIGNhbnZhcyBhbmQgY3JvcDpcbiAgICAgICAgICAgIHJlc2l6ZUltYWdlOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkIHx8ICEoZGF0YS5jYW52YXMgfHwgZGF0YS5pbWcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe2NhbnZhczogdHJ1ZX0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgICAgICBpbWcgPSAob3B0aW9ucy5jYW52YXMgJiYgZGF0YS5jYW52YXMpIHx8IGRhdGEuaW1nLFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gZnVuY3Rpb24gKG5ld0ltZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ltZyAmJiAobmV3SW1nLndpZHRoICE9PSBpbWcud2lkdGggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW1nLmhlaWdodCAhPT0gaW1nLmhlaWdodCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZvcmNlUmVzaXplKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbbmV3SW1nLmdldENvbnRleHQgPyAnY2FudmFzJyA6ICdpbWcnXSA9IG5ld0ltZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHJldmlldyA9IG5ld0ltZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGF0LCBbZGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWw7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZXhpZikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5vcmllbnRhdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vcmllbnRhdGlvbiA9IGRhdGEuZXhpZi5nZXQoJ09yaWVudGF0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudGh1bWJuYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWwgPSBkYXRhLmV4aWYuZ2V0KCdUaHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkSW1hZ2UodGh1bWJuYWlsLCByZXNvbHZlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGZkLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IG9yaWVudGluZyB0aGUgc2FtZSBpbWFnZSB0d2ljZTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLm9yaWVudGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5vcmllbnRhdGlvbiA9IG9wdGlvbnMub3JpZW50YXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGltZykge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGxvYWRJbWFnZS5zY2FsZShpbWcsIG9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gU2F2ZXMgdGhlIHByb2Nlc3NlZCBpbWFnZSBnaXZlbiBhcyBkYXRhLmNhbnZhc1xuICAgICAgICAgICAgLy8gaW5wbGFjZSBhdCBkYXRhLmluZGV4IG9mIGRhdGEuZmlsZXM6XG4gICAgICAgICAgICBzYXZlSW1hZ2U6IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmNhbnZhcyB8fCBvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY2FudmFzLnRvQmxvYikge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNhbnZhcy50b0Jsb2IoXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmxvYi5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnR5cGUgPT09IGJsb2IudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvYi5uYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvYi5uYW1lID0gZmlsZS5uYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL1xcLlxcdyskLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLicgKyBibG9iLnR5cGUuc3Vic3RyKDYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IHJlc3RvcmUgaW52YWxpZCBtZXRhIGRhdGE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudHlwZSAhPT0gYmxvYi50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhLmltYWdlSGVhZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGNyZWF0ZWQgYmxvYiBhdCB0aGUgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiB0aGUgb3JpZ2luYWwgZmlsZSBpbiB0aGUgZmlsZXMgbGlzdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdID0gYmxvYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhhdCwgW2RhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnR5cGUgfHwgZmlsZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5xdWFsaXR5XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbG9hZEltYWdlTWV0YURhdGE6IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGxvYWRJbWFnZS5wYXJzZU1ldGFEYXRhKGRhdGEuZmlsZXNbZGF0YS5pbmRleF0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQoZGF0YSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoYXQsIFtkYXRhXSk7XG4gICAgICAgICAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzYXZlSW1hZ2VNZXRhRGF0YTogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShkYXRhLmltYWdlSGVhZCAmJiBkYXRhLmNhbnZhcyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jYW52YXMudG9CbG9iICYmICFvcHRpb25zLmRpc2FibGVkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBibG9iID0gbmV3IEJsb2IoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pbWFnZUhlYWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNpemVkIGltYWdlcyBhbHdheXMgaGF2ZSBhIGhlYWQgc2l6ZSBvZiAyMCBieXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY2x1ZGluZyB0aGUgSlBFRyBtYXJrZXIgYW5kIGEgbWluaW1hbCBKRklGIGhlYWRlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2JTbGljZS5jYWxsKGZpbGUsIDIwKVxuICAgICAgICAgICAgICAgICAgICBdLCB7dHlwZTogZmlsZS50eXBlfSk7XG4gICAgICAgICAgICAgICAgYmxvYi5uYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgIGRhdGEuZmlsZXNbZGF0YS5pbmRleF0gPSBibG9iO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gU2V0cyB0aGUgcmVzaXplZCB2ZXJzaW9uIG9mIHRoZSBpbWFnZSBhcyBhIHByb3BlcnR5IG9mIHRoZVxuICAgICAgICAgICAgLy8gZmlsZSBvYmplY3QsIG11c3QgYmUgY2FsbGVkIGFmdGVyIFwic2F2ZUltYWdlXCI6XG4gICAgICAgICAgICBzZXRJbWFnZTogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wcmV2aWV3ICYmICFvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmlsZXNbZGF0YS5pbmRleF1bb3B0aW9ucy5uYW1lIHx8ICdwcmV2aWV3J10gPSBkYXRhLnByZXZpZXc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZGVsZXRlSW1hZ2VSZWZlcmVuY2VzOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGF0YS5pbWc7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhLmNhbnZhcztcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEucHJldmlldztcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEuaW1hZ2VIZWFkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkpO1xuIiwiLypcbiAqIGpRdWVyeSBGaWxlIFVwbG9hZCBBdWRpbyBQcmV2aWV3IFBsdWdpblxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvalF1ZXJ5LUZpbGUtVXBsb2FkXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbi8qIGpzaGludCBub21lbjpmYWxzZSAqL1xuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93LCBkb2N1bWVudCAqL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgQU1EIG1vZHVsZTpcbiAgICAgICAgZGVmaW5lKFtcbiAgICAgICAgICAgICdqcXVlcnknLFxuICAgICAgICAgICAgJ2xvYWQtaW1hZ2UnLFxuICAgICAgICAgICAgJy4vanF1ZXJ5LmZpbGV1cGxvYWQtcHJvY2VzcydcbiAgICAgICAgXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KUzpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHJlcXVpcmUoJ2pxdWVyeScpLFxuICAgICAgICAgICAgcmVxdWlyZSgnbG9hZC1pbWFnZScpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzOlxuICAgICAgICBmYWN0b3J5KFxuICAgICAgICAgICAgd2luZG93LmpRdWVyeSxcbiAgICAgICAgICAgIHdpbmRvdy5sb2FkSW1hZ2VcbiAgICAgICAgKTtcbiAgICB9XG59KGZ1bmN0aW9uICgkLCBsb2FkSW1hZ2UpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBQcmVwZW5kIHRvIHRoZSBkZWZhdWx0IHByb2Nlc3NRdWV1ZTpcbiAgICAkLmJsdWVpbXAuZmlsZXVwbG9hZC5wcm90b3R5cGUub3B0aW9ucy5wcm9jZXNzUXVldWUudW5zaGlmdChcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnbG9hZEF1ZGlvJyxcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgYWN0aW9uIGFzIHByZWZpeCBmb3IgdGhlIFwiQFwiIG9wdGlvbnM6XG4gICAgICAgICAgICBwcmVmaXg6IHRydWUsXG4gICAgICAgICAgICBmaWxlVHlwZXM6ICdAJyxcbiAgICAgICAgICAgIG1heEZpbGVTaXplOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlQXVkaW9QcmV2aWV3J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdzZXRBdWRpbycsXG4gICAgICAgICAgICBuYW1lOiAnQGF1ZGlvUHJldmlld05hbWUnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUF1ZGlvUHJldmlldydcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBUaGUgRmlsZSBVcGxvYWQgQXVkaW8gUHJldmlldyBwbHVnaW4gZXh0ZW5kcyB0aGUgZmlsZXVwbG9hZCB3aWRnZXRcbiAgICAvLyB3aXRoIGF1ZGlvIHByZXZpZXcgZnVuY3Rpb25hbGl0eTpcbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywgJC5ibHVlaW1wLmZpbGV1cGxvYWQsIHtcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyBUaGUgcmVndWxhciBleHByZXNzaW9uIGZvciB0aGUgdHlwZXMgb2YgYXVkaW8gZmlsZXMgdG8gbG9hZCxcbiAgICAgICAgICAgIC8vIG1hdGNoZWQgYWdhaW5zdCB0aGUgZmlsZSB0eXBlOlxuICAgICAgICAgICAgbG9hZEF1ZGlvRmlsZVR5cGVzOiAvXmF1ZGlvXFwvLiokL1xuICAgICAgICB9LFxuXG4gICAgICAgIF9hdWRpb0VsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyksXG5cbiAgICAgICAgcHJvY2Vzc0FjdGlvbnM6IHtcblxuICAgICAgICAgICAgLy8gTG9hZHMgdGhlIGF1ZGlvIGZpbGUgZ2l2ZW4gdmlhIGRhdGEuZmlsZXMgYW5kIGRhdGEuaW5kZXhcbiAgICAgICAgICAgIC8vIGFzIGF1ZGlvIGVsZW1lbnQgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcGxheWluZyBpdC5cbiAgICAgICAgICAgIC8vIEFjY2VwdHMgdGhlIG9wdGlvbnMgZmlsZVR5cGVzIChyZWd1bGFyIGV4cHJlc3Npb24pXG4gICAgICAgICAgICAvLyBhbmQgbWF4RmlsZVNpemUgKGludGVnZXIpIHRvIGxpbWl0IHRoZSBmaWxlcyB0byBsb2FkOlxuICAgICAgICAgICAgbG9hZEF1ZGlvOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGRhdGEuZmlsZXNbZGF0YS5pbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgYXVkaW87XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2F1ZGlvRWxlbWVudC5jYW5QbGF5VHlwZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXVkaW9FbGVtZW50LmNhblBsYXlUeXBlKGZpbGUudHlwZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICgkLnR5cGUob3B0aW9ucy5tYXhGaWxlU2l6ZSkgIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5zaXplIDw9IG9wdGlvbnMubWF4RmlsZVNpemUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoIW9wdGlvbnMuZmlsZVR5cGVzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlVHlwZXMudGVzdChmaWxlLnR5cGUpKSkge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSBsb2FkSW1hZ2UuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbyA9IHRoaXMuX2F1ZGlvRWxlbWVudC5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW8uc3JjID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW8uY29udHJvbHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdWRpbyA9IGF1ZGlvO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBTZXRzIHRoZSBhdWRpbyBlbGVtZW50IGFzIGEgcHJvcGVydHkgb2YgdGhlIGZpbGUgb2JqZWN0OlxuICAgICAgICAgICAgc2V0QXVkaW86IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYXVkaW8gJiYgIW9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlc1tkYXRhLmluZGV4XVtvcHRpb25zLm5hbWUgfHwgJ3ByZXZpZXcnXSA9IGRhdGEuYXVkaW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSk7XG4iLCIvKlxuICogalF1ZXJ5IEZpbGUgVXBsb2FkIFZpZGVvIFByZXZpZXcgUGx1Z2luXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9qUXVlcnktRmlsZS1VcGxvYWRcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMywgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyoganNoaW50IG5vbWVuOmZhbHNlICovXG4vKiBnbG9iYWwgZGVmaW5lLCByZXF1aXJlLCB3aW5kb3csIGRvY3VtZW50ICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBBTUQgbW9kdWxlOlxuICAgICAgICBkZWZpbmUoW1xuICAgICAgICAgICAgJ2pxdWVyeScsXG4gICAgICAgICAgICAnbG9hZC1pbWFnZScsXG4gICAgICAgICAgICAnLi9qcXVlcnkuZmlsZXVwbG9hZC1wcm9jZXNzJ1xuICAgICAgICBdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTOlxuICAgICAgICBmYWN0b3J5KFxuICAgICAgICAgICAgcmVxdWlyZSgnanF1ZXJ5JyksXG4gICAgICAgICAgICByZXF1aXJlKCdsb2FkLWltYWdlJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHM6XG4gICAgICAgIGZhY3RvcnkoXG4gICAgICAgICAgICB3aW5kb3cualF1ZXJ5LFxuICAgICAgICAgICAgd2luZG93LmxvYWRJbWFnZVxuICAgICAgICApO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQsIGxvYWRJbWFnZSkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIFByZXBlbmQgdG8gdGhlIGRlZmF1bHQgcHJvY2Vzc1F1ZXVlOlxuICAgICQuYmx1ZWltcC5maWxldXBsb2FkLnByb3RvdHlwZS5vcHRpb25zLnByb2Nlc3NRdWV1ZS51bnNoaWZ0KFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdsb2FkVmlkZW8nLFxuICAgICAgICAgICAgLy8gVXNlIHRoZSBhY3Rpb24gYXMgcHJlZml4IGZvciB0aGUgXCJAXCIgb3B0aW9uczpcbiAgICAgICAgICAgIHByZWZpeDogdHJ1ZSxcbiAgICAgICAgICAgIGZpbGVUeXBlczogJ0AnLFxuICAgICAgICAgICAgbWF4RmlsZVNpemU6ICdAJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQGRpc2FibGVWaWRlb1ByZXZpZXcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3NldFZpZGVvJyxcbiAgICAgICAgICAgIG5hbWU6ICdAdmlkZW9QcmV2aWV3TmFtZScsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlVmlkZW9QcmV2aWV3J1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIC8vIFRoZSBGaWxlIFVwbG9hZCBWaWRlbyBQcmV2aWV3IHBsdWdpbiBleHRlbmRzIHRoZSBmaWxldXBsb2FkIHdpZGdldFxuICAgIC8vIHdpdGggdmlkZW8gcHJldmlldyBmdW5jdGlvbmFsaXR5OlxuICAgICQud2lkZ2V0KCdibHVlaW1wLmZpbGV1cGxvYWQnLCAkLmJsdWVpbXAuZmlsZXVwbG9hZCwge1xuXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIC8vIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIHRoZSB0eXBlcyBvZiB2aWRlbyBmaWxlcyB0byBsb2FkLFxuICAgICAgICAgICAgLy8gbWF0Y2hlZCBhZ2FpbnN0IHRoZSBmaWxlIHR5cGU6XG4gICAgICAgICAgICBsb2FkVmlkZW9GaWxlVHlwZXM6IC9edmlkZW9cXC8uKiQvXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3ZpZGVvRWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKSxcblxuICAgICAgICBwcm9jZXNzQWN0aW9uczoge1xuXG4gICAgICAgICAgICAvLyBMb2FkcyB0aGUgdmlkZW8gZmlsZSBnaXZlbiB2aWEgZGF0YS5maWxlcyBhbmQgZGF0YS5pbmRleFxuICAgICAgICAgICAgLy8gYXMgdmlkZW8gZWxlbWVudCBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBwbGF5aW5nIGl0LlxuICAgICAgICAgICAgLy8gQWNjZXB0cyB0aGUgb3B0aW9ucyBmaWxlVHlwZXMgKHJlZ3VsYXIgZXhwcmVzc2lvbilcbiAgICAgICAgICAgIC8vIGFuZCBtYXhGaWxlU2l6ZSAoaW50ZWdlcikgdG8gbGltaXQgdGhlIGZpbGVzIHRvIGxvYWQ6XG4gICAgICAgICAgICBsb2FkVmlkZW86IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZGF0YS5maWxlc1tkYXRhLmluZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICB2aWRlbztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlkZW9FbGVtZW50LmNhblBsYXlUeXBlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWRlb0VsZW1lbnQuY2FuUGxheVR5cGUoZmlsZS50eXBlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKCQudHlwZShvcHRpb25zLm1heEZpbGVTaXplKSAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnNpemUgPD0gb3B0aW9ucy5tYXhGaWxlU2l6ZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICghb3B0aW9ucy5maWxlVHlwZXMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZpbGVUeXBlcy50ZXN0KGZpbGUudHlwZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IGxvYWRJbWFnZS5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvID0gdGhpcy5fdmlkZW9FbGVtZW50LmNsb25lTm9kZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlby5zcmMgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlby5jb250cm9scyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnZpZGVvID0gdmlkZW87XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIFNldHMgdGhlIHZpZGVvIGVsZW1lbnQgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgZmlsZSBvYmplY3Q6XG4gICAgICAgICAgICBzZXRWaWRlbzogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS52aWRlbyAmJiAhb3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdW29wdGlvbnMubmFtZSB8fCAncHJldmlldyddID0gZGF0YS52aWRlbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKTtcbiIsIi8qXG4gKiBqUXVlcnkgRmlsZSBVcGxvYWQgVmFsaWRhdGlvbiBQbHVnaW5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL2pRdWVyeS1GaWxlLVVwbG9hZFxuICpcbiAqIENvcHlyaWdodCAyMDEzLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiBnbG9iYWwgZGVmaW5lLCByZXF1aXJlLCB3aW5kb3cgKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIEFNRCBtb2R1bGU6XG4gICAgICAgIGRlZmluZShbXG4gICAgICAgICAgICAnanF1ZXJ5JyxcbiAgICAgICAgICAgICcuL2pxdWVyeS5maWxldXBsb2FkLXByb2Nlc3MnXG4gICAgICAgIF0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlM6XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsczpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHdpbmRvdy5qUXVlcnlcbiAgICAgICAgKTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gQXBwZW5kIHRvIHRoZSBkZWZhdWx0IHByb2Nlc3NRdWV1ZTpcbiAgICAkLmJsdWVpbXAuZmlsZXVwbG9hZC5wcm90b3R5cGUub3B0aW9ucy5wcm9jZXNzUXVldWUucHVzaChcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAndmFsaWRhdGUnLFxuICAgICAgICAgICAgLy8gQWx3YXlzIHRyaWdnZXIgdGhpcyBhY3Rpb24sXG4gICAgICAgICAgICAvLyBldmVuIGlmIHRoZSBwcmV2aW91cyBhY3Rpb24gd2FzIHJlamVjdGVkOlxuICAgICAgICAgICAgYWx3YXlzOiB0cnVlLFxuICAgICAgICAgICAgLy8gT3B0aW9ucyB0YWtlbiBmcm9tIHRoZSBnbG9iYWwgb3B0aW9ucyBtYXA6XG4gICAgICAgICAgICBhY2NlcHRGaWxlVHlwZXM6ICdAJyxcbiAgICAgICAgICAgIG1heEZpbGVTaXplOiAnQCcsXG4gICAgICAgICAgICBtaW5GaWxlU2l6ZTogJ0AnLFxuICAgICAgICAgICAgbWF4TnVtYmVyT2ZGaWxlczogJ0AnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZVZhbGlkYXRpb24nXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gVGhlIEZpbGUgVXBsb2FkIFZhbGlkYXRpb24gcGx1Z2luIGV4dGVuZHMgdGhlIGZpbGV1cGxvYWQgd2lkZ2V0XG4gICAgLy8gd2l0aCBmaWxlIHZhbGlkYXRpb24gZnVuY3Rpb25hbGl0eTpcbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywgJC5ibHVlaW1wLmZpbGV1cGxvYWQsIHtcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgLy8gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgYWxsb3dlZCBmaWxlIHR5cGVzLCBtYXRjaGVzXG4gICAgICAgICAgICAvLyBhZ2FpbnN0IGVpdGhlciBmaWxlIHR5cGUgb3IgZmlsZSBuYW1lOlxuICAgICAgICAgICAgYWNjZXB0RmlsZVR5cGVzOiAvKFxcLnxcXC8pKGdpZnxqcGU/Z3xwbmcpJC9pLFxuICAgICAgICAgICAgLy8gVGhlIG1heGltdW0gYWxsb3dlZCBmaWxlIHNpemUgaW4gYnl0ZXM6XG4gICAgICAgICAgICBtYXhGaWxlU2l6ZTogMTAwMDAwMDAsIC8vIDEwIE1CXG4gICAgICAgICAgICAvLyBUaGUgbWluaW11bSBhbGxvd2VkIGZpbGUgc2l6ZSBpbiBieXRlczpcbiAgICAgICAgICAgIG1pbkZpbGVTaXplOiB1bmRlZmluZWQsIC8vIE5vIG1pbmltYWwgZmlsZSBzaXplXG4gICAgICAgICAgICAvLyBUaGUgbGltaXQgb2YgZmlsZXMgdG8gYmUgdXBsb2FkZWQ6XG4gICAgICAgICAgICBtYXhOdW1iZXJPZkZpbGVzOiAxMCxcbiAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIEZ1bmN0aW9uIHJldHVybmluZyB0aGUgY3VycmVudCBudW1iZXIgb2YgZmlsZXMsXG4gICAgICAgICAgICAvLyBoYXMgdG8gYmUgb3ZlcnJpZGVuIGZvciBtYXhOdW1iZXJPZkZpbGVzIHZhbGlkYXRpb246XG4gICAgICAgICAgICBnZXROdW1iZXJPZkZpbGVzOiAkLm5vb3AsXG5cbiAgICAgICAgICAgIC8vIEVycm9yIGFuZCBpbmZvIG1lc3NhZ2VzOlxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBtYXhOdW1iZXJPZkZpbGVzOiAnTWF4aW11bSBudW1iZXIgb2YgZmlsZXMgZXhjZWVkZWQnLFxuICAgICAgICAgICAgICAgIGFjY2VwdEZpbGVUeXBlczogJ0ZpbGUgdHlwZSBub3QgYWxsb3dlZCcsXG4gICAgICAgICAgICAgICAgbWF4RmlsZVNpemU6ICdGaWxlIGlzIHRvbyBsYXJnZScsXG4gICAgICAgICAgICAgICAgbWluRmlsZVNpemU6ICdGaWxlIGlzIHRvbyBzbWFsbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9jZXNzQWN0aW9uczoge1xuXG4gICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGZpbGUgPSBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5taW5GaWxlU2l6ZSB8fCBvcHRpb25zLm1heEZpbGVTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVTaXplID0gZmlsZS5zaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJC50eXBlKG9wdGlvbnMubWF4TnVtYmVyT2ZGaWxlcykgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2V0dGluZ3MuZ2V0TnVtYmVyT2ZGaWxlcygpIHx8IDApICsgZGF0YS5maWxlcy5sZW5ndGggPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubWF4TnVtYmVyT2ZGaWxlcykge1xuICAgICAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gc2V0dGluZ3MuaTE4bignbWF4TnVtYmVyT2ZGaWxlcycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5hY2NlcHRGaWxlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICEob3B0aW9ucy5hY2NlcHRGaWxlVHlwZXMudGVzdChmaWxlLnR5cGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmFjY2VwdEZpbGVUeXBlcy50ZXN0KGZpbGUubmFtZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGUuZXJyb3IgPSBzZXR0aW5ncy5pMThuKCdhY2NlcHRGaWxlVHlwZXMnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVTaXplID4gb3B0aW9ucy5tYXhGaWxlU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gc2V0dGluZ3MuaTE4bignbWF4RmlsZVNpemUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQudHlwZShmaWxlU2l6ZSkgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZSA8IG9wdGlvbnMubWluRmlsZVNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5lcnJvciA9IHNldHRpbmdzLmkxOG4oJ21pbkZpbGVTaXplJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZpbGUuZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWxlLmVycm9yIHx8IGRhdGEuZmlsZXMuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlcy5lcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZWplY3RXaXRoKHRoaXMsIFtkYXRhXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSk7XG4iLCIvKlxuICogalF1ZXJ5IEZpbGUgVXBsb2FkIFVzZXIgSW50ZXJmYWNlIFBsdWdpblxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvalF1ZXJ5LUZpbGUtVXBsb2FkXG4gKlxuICogQ29weXJpZ2h0IDIwMTAsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbi8qIGpzaGludCBub21lbjpmYWxzZSAqL1xuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93ICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBBTUQgbW9kdWxlOlxuICAgICAgICBkZWZpbmUoW1xuICAgICAgICAgICAgJ2pxdWVyeScsXG4gICAgICAgICAgICAndG1wbCcsXG4gICAgICAgICAgICAnLi9qcXVlcnkuZmlsZXVwbG9hZC1pbWFnZScsXG4gICAgICAgICAgICAnLi9qcXVlcnkuZmlsZXVwbG9hZC1hdWRpbycsXG4gICAgICAgICAgICAnLi9qcXVlcnkuZmlsZXVwbG9hZC12aWRlbycsXG4gICAgICAgICAgICAnLi9qcXVlcnkuZmlsZXVwbG9hZC12YWxpZGF0ZSdcbiAgICAgICAgXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KUzpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHJlcXVpcmUoJ2pxdWVyeScpLFxuICAgICAgICAgICAgcmVxdWlyZSgndG1wbCcpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzOlxuICAgICAgICBmYWN0b3J5KFxuICAgICAgICAgICAgd2luZG93LmpRdWVyeSxcbiAgICAgICAgICAgIHdpbmRvdy50bXBsXG4gICAgICAgICk7XG4gICAgfVxufShmdW5jdGlvbiAoJCwgdG1wbCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgICQuYmx1ZWltcC5maWxldXBsb2FkLnByb3RvdHlwZS5fc3BlY2lhbE9wdGlvbnMucHVzaChcbiAgICAgICAgJ2ZpbGVzQ29udGFpbmVyJyxcbiAgICAgICAgJ3VwbG9hZFRlbXBsYXRlSWQnLFxuICAgICAgICAnZG93bmxvYWRUZW1wbGF0ZUlkJ1xuICAgICk7XG5cbiAgICAvLyBUaGUgVUkgdmVyc2lvbiBleHRlbmRzIHRoZSBmaWxlIHVwbG9hZCB3aWRnZXRcbiAgICAvLyBhbmQgYWRkcyBjb21wbGV0ZSB1c2VyIGludGVyZmFjZSBpbnRlcmFjdGlvbjpcbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywgJC5ibHVlaW1wLmZpbGV1cGxvYWQsIHtcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCBmaWxlcyBhZGRlZCB0byB0aGUgd2lkZ2V0IGFyZSB1cGxvYWRlZCBhcyBzb29uXG4gICAgICAgICAgICAvLyBhcyB0aGUgdXNlciBjbGlja3Mgb24gdGhlIHN0YXJ0IGJ1dHRvbnMuIFRvIGVuYWJsZSBhdXRvbWF0aWNcbiAgICAgICAgICAgIC8vIHVwbG9hZHMsIHNldCB0aGUgZm9sbG93aW5nIG9wdGlvbiB0byB0cnVlOlxuICAgICAgICAgICAgYXV0b1VwbG9hZDogZmFsc2UsXG4gICAgICAgICAgICAvLyBUaGUgSUQgb2YgdGhlIHVwbG9hZCB0ZW1wbGF0ZTpcbiAgICAgICAgICAgIHVwbG9hZFRlbXBsYXRlSWQ6ICd0ZW1wbGF0ZS11cGxvYWQnLFxuICAgICAgICAgICAgLy8gVGhlIElEIG9mIHRoZSBkb3dubG9hZCB0ZW1wbGF0ZTpcbiAgICAgICAgICAgIGRvd25sb2FkVGVtcGxhdGVJZDogJ3RlbXBsYXRlLWRvd25sb2FkJyxcbiAgICAgICAgICAgIC8vIFRoZSBjb250YWluZXIgZm9yIHRoZSBsaXN0IG9mIGZpbGVzLiBJZiB1bmRlZmluZWQsIGl0IGlzIHNldCB0b1xuICAgICAgICAgICAgLy8gYW4gZWxlbWVudCB3aXRoIGNsYXNzIFwiZmlsZXNcIiBpbnNpZGUgb2YgdGhlIHdpZGdldCBlbGVtZW50OlxuICAgICAgICAgICAgZmlsZXNDb250YWluZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIGZpbGVzIGFyZSBhcHBlbmRlZCB0byB0aGUgZmlsZXMgY29udGFpbmVyLlxuICAgICAgICAgICAgLy8gU2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIHRydWUsIHRvIHByZXBlbmQgZmlsZXMgaW5zdGVhZDpcbiAgICAgICAgICAgIHByZXBlbmRGaWxlczogZmFsc2UsXG4gICAgICAgICAgICAvLyBUaGUgZXhwZWN0ZWQgZGF0YSB0eXBlIG9mIHRoZSB1cGxvYWQgcmVzcG9uc2UsIHNldHMgdGhlIGRhdGFUeXBlXG4gICAgICAgICAgICAvLyBvcHRpb24gb2YgdGhlICQuYWpheCB1cGxvYWQgcmVxdWVzdHM6XG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuXG4gICAgICAgICAgICAvLyBFcnJvciBhbmQgaW5mbyBtZXNzYWdlczpcbiAgICAgICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgICAgICAgdW5rbm93bkVycm9yOiAnVW5rbm93biBlcnJvcidcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIEZ1bmN0aW9uIHJldHVybmluZyB0aGUgY3VycmVudCBudW1iZXIgb2YgZmlsZXMsXG4gICAgICAgICAgICAvLyB1c2VkIGJ5IHRoZSBtYXhOdW1iZXJPZkZpbGVzIHZhbGlkYXRpb246XG4gICAgICAgICAgICBnZXROdW1iZXJPZkZpbGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXNDb250YWluZXIuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm90KCcucHJvY2Vzc2luZycpLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIHRvIHJldHJpZXZlIHRoZSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIHNlcnZlciByZXNwb25zZTpcbiAgICAgICAgICAgIGdldEZpbGVzRnJvbVJlc3BvbnNlOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCAmJiAkLmlzQXJyYXkoZGF0YS5yZXN1bHQuZmlsZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnJlc3VsdC5maWxlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gVGhlIGFkZCBjYWxsYmFjayBpcyBpbnZva2VkIGFzIHNvb24gYXMgZmlsZXMgYXJlIGFkZGVkIHRvIHRoZSBmaWxldXBsb2FkXG4gICAgICAgICAgICAvLyB3aWRnZXQgKHZpYSBmaWxlIGlucHV0IHNlbGVjdGlvbiwgZHJhZyAmIGRyb3Agb3IgYWRkIEFQSSBjYWxsKS5cbiAgICAgICAgICAgIC8vIFNlZSB0aGUgYmFzaWMgZmlsZSB1cGxvYWQgd2lkZ2V0IGZvciBtb3JlIGluZm9ybWF0aW9uOlxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgdGhhdCA9ICR0aGlzLmRhdGEoJ2JsdWVpbXAtZmlsZXVwbG9hZCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5kYXRhKCdmaWxldXBsb2FkJyksXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB0aGF0Lm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0ID0gdGhhdC5fcmVuZGVyVXBsb2FkKGRhdGEuZmlsZXMpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRhJywgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdwcm9jZXNzaW5nJyk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlc0NvbnRhaW5lcltcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wcmVwZW5kRmlsZXMgPyAncHJlcGVuZCcgOiAnYXBwZW5kJ1xuICAgICAgICAgICAgICAgIF0oZGF0YS5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICB0aGF0Ll9mb3JjZVJlZmxvdyhkYXRhLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgIHRoYXQuX3RyYW5zaXRpb24oZGF0YS5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICBkYXRhLnByb2Nlc3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHRoaXMuZmlsZXVwbG9hZCgncHJvY2VzcycsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuc2l6ZScpLnRleHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fZm9ybWF0RmlsZVNpemUoZGF0YS5maWxlc1tpbmRleF0uc2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnJlbW92ZUNsYXNzKCdwcm9jZXNzaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3JlbmRlclByZXZpZXdzKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQuZmluZCgnLnN0YXJ0JykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgodGhhdC5fdHJpZ2dlcignYWRkZWQnLCBlLCBkYXRhKSAhPT0gZmFsc2UpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdGlvbnMuYXV0b1VwbG9hZCB8fCBkYXRhLmF1dG9VcGxvYWQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdXRvVXBsb2FkICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5maWxlcy5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0LmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gZGF0YS5maWxlc1tpbmRleF0uZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLmVycm9yJykudGV4dChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdGhlIHN0YXJ0IG9mIGVhY2ggZmlsZSB1cGxvYWQgcmVxdWVzdDpcbiAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZGF0YSgnYmx1ZWltcC1maWxldXBsb2FkJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnZmlsZXVwbG9hZCcpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvbnRleHQgJiYgZGF0YS5kYXRhVHlwZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kYXRhVHlwZS5zdWJzdHIoMCwgNikgPT09ICdpZnJhbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmcmFtZSBUcmFuc3BvcnQgZG9lcyBub3Qgc3VwcG9ydCBwcm9ncmVzcyBldmVudHMuXG4gICAgICAgICAgICAgICAgICAgIC8vIEluIGxhY2sgb2YgYW4gaW5kZXRlcm1pbmF0ZSBwcm9ncmVzcyBiYXIsIHdlIHNldFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcHJvZ3Jlc3MgdG8gMTAwJSwgc2hvd2luZyB0aGUgZnVsbCBhbmltYXRlZCBiYXI6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5wcm9ncmVzcycpLmFkZENsYXNzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICEkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAncHJvZ3Jlc3MtYW5pbWF0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS12YWx1ZW5vdycsIDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpLmZpcnN0KCkuY3NzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzEwMCUnXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5fdHJpZ2dlcignc2VudCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBzdWNjZXNzZnVsIHVwbG9hZHM6XG4gICAgICAgICAgICBkb25lOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLmRhdGEoJ2JsdWVpbXAtZmlsZXVwbG9hZCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2ZpbGV1cGxvYWQnKSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0RmlsZXNGcm9tUmVzcG9uc2UgPSBkYXRhLmdldEZpbGVzRnJvbVJlc3BvbnNlIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wdGlvbnMuZ2V0RmlsZXNGcm9tUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzID0gZ2V0RmlsZXNGcm9tUmVzcG9uc2UoZGF0YSksXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBmaWxlc1tpbmRleF0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Vycm9yOiAnRW1wdHkgZmlsZSB1cGxvYWQgcmVzdWx0J307XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IHRoYXQuX2FkZEZpbmlzaGVkRGVmZXJyZWRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKCQodGhpcykpLmRvbmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGhhdC5fcmVuZGVyRG93bmxvYWQoW2ZpbGVdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2ZvcmNlUmVmbG93KHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJhbnNpdGlvbih0ZW1wbGF0ZSkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2NvbXBsZXRlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZpbmlzaGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGhhdC5fcmVuZGVyRG93bmxvYWQoZmlsZXMpW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcHRpb25zLnByZXBlbmRGaWxlcyA/ICdwcmVwZW5kVG8nIDogJ2FwcGVuZFRvJ1xuICAgICAgICAgICAgICAgICAgICBdKHRoYXQub3B0aW9ucy5maWxlc0NvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX2ZvcmNlUmVmbG93KHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQgPSB0aGF0Ll9hZGRGaW5pc2hlZERlZmVycmVkcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKHRlbXBsYXRlKS5kb25lKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignY29tcGxldGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmluaXNoZWQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBmYWlsZWQgKGFib3J0IG9yIGVycm9yKSB1cGxvYWRzOlxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5kYXRhKCdibHVlaW1wLWZpbGV1cGxvYWQnKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdmaWxldXBsb2FkJyksXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JUaHJvd24gIT09ICdhYm9ydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGRhdGEuZmlsZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuZXJyb3IgPSBmaWxlLmVycm9yIHx8IGRhdGEuZXJyb3JUaHJvd24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pMThuKCd1bmtub3duRXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IHRoYXQuX2FkZEZpbmlzaGVkRGVmZXJyZWRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJhbnNpdGlvbigkKHRoaXMpKS5kb25lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRoYXQuX3JlbmRlckRvd25sb2FkKFtmaWxlXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2ZvcmNlUmVmbG93KHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyYW5zaXRpb24odGVtcGxhdGUpLmRvbmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdmYWlsZWQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmluaXNoZWQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IHRoYXQuX2FkZEZpbmlzaGVkRGVmZXJyZWRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJhbnNpdGlvbigkKHRoaXMpKS5kb25lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmFpbGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdmaW5pc2hlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmVycm9yVGhyb3duICE9PSAnYWJvcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dCA9IHRoYXQuX3JlbmRlclVwbG9hZChkYXRhLmZpbGVzKVtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3B0aW9ucy5wcmVwZW5kRmlsZXMgPyAncHJlcGVuZFRvJyA6ICdhcHBlbmRUbydcbiAgICAgICAgICAgICAgICAgICAgXSh0aGF0Lm9wdGlvbnMuZmlsZXNDb250YWluZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnZGF0YScsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9mb3JjZVJlZmxvdyhkYXRhLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IHRoYXQuX2FkZEZpbmlzaGVkRGVmZXJyZWRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyYW5zaXRpb24oZGF0YS5jb250ZXh0KS5kb25lKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmFpbGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmluaXNoZWQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmFpbGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZpbmlzaGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX2FkZEZpbmlzaGVkRGVmZXJyZWRzKCkucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdXBsb2FkIHByb2dyZXNzIGV2ZW50czpcbiAgICAgICAgICAgIHByb2dyZXNzOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gTWF0aC5mbG9vcihkYXRhLmxvYWRlZCAvIGRhdGEudG90YWwgKiAxMDApO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcucHJvZ3Jlc3MnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLXZhbHVlbm93JywgcHJvZ3Jlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCkuZmlyc3QoKS5jc3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzICsgJyUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBnbG9iYWwgdXBsb2FkIHByb2dyZXNzIGV2ZW50czpcbiAgICAgICAgICAgIHByb2dyZXNzYWxsOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKGRhdGEubG9hZGVkIC8gZGF0YS50b3RhbCAqIDEwMCksXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFByb2dyZXNzTm9kZSA9ICR0aGlzLmZpbmQoJy5maWxldXBsb2FkLXByb2dyZXNzJyksXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZGVkUHJvZ3Jlc3NOb2RlID0gZ2xvYmFsUHJvZ3Jlc3NOb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnByb2dyZXNzLWV4dGVuZGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuZGVkUHJvZ3Jlc3NOb2RlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBleHRlbmRlZFByb2dyZXNzTm9kZS5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCR0aGlzLmRhdGEoJ2JsdWVpbXAtZmlsZXVwbG9hZCcpIHx8ICR0aGlzLmRhdGEoJ2ZpbGV1cGxvYWQnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuX3JlbmRlckV4dGVuZGVkUHJvZ3Jlc3MoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2xvYmFsUHJvZ3Jlc3NOb2RlXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcucHJvZ3Jlc3MnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS12YWx1ZW5vdycsIHByb2dyZXNzKVxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKS5maXJzdCgpLmNzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyArICclJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciB1cGxvYWRzIHN0YXJ0LCBlcXVpdmFsZW50IHRvIHRoZSBnbG9iYWwgYWpheFN0YXJ0IGV2ZW50OlxuICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZGF0YSgnYmx1ZWltcC1maWxldXBsb2FkJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnZmlsZXVwbG9hZCcpO1xuICAgICAgICAgICAgICAgIHRoYXQuX3Jlc2V0RmluaXNoZWREZWZlcnJlZHMoKTtcbiAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKCQodGhpcykuZmluZCgnLmZpbGV1cGxvYWQtcHJvZ3Jlc3MnKSkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignc3RhcnRlZCcsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdXBsb2FkcyBzdG9wLCBlcXVpdmFsZW50IHRvIHRoZSBnbG9iYWwgYWpheFN0b3AgZXZlbnQ6XG4gICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLmRhdGEoJ2JsdWVpbXAtZmlsZXVwbG9hZCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2ZpbGV1cGxvYWQnKSxcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQgPSB0aGF0Ll9hZGRGaW5pc2hlZERlZmVycmVkcygpO1xuICAgICAgICAgICAgICAgICQud2hlbi5hcHBseSgkLCB0aGF0Ll9nZXRGaW5pc2hlZERlZmVycmVkcygpKVxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdzdG9wcGVkJywgZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoYXQuX3RyYW5zaXRpb24oJCh0aGlzKS5maW5kKCcuZmlsZXVwbG9hZC1wcm9ncmVzcycpKS5kb25lKFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5wcm9ncmVzcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCAnMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCkuZmlyc3QoKS5jc3MoJ3dpZHRoJywgJzAlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5wcm9ncmVzcy1leHRlbmRlZCcpLmh0bWwoJyZuYnNwOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9jZXNzc3RhcnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmaWxldXBsb2FkLXByb2Nlc3NpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9jZXNzc3RvcDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZpbGV1cGxvYWQtcHJvY2Vzc2luZycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBmaWxlIGRlbGV0aW9uOlxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5kYXRhKCdibHVlaW1wLWZpbGV1cGxvYWQnKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdmaWxldXBsb2FkJyksXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKGRhdGEuY29udGV4dCkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2Rlc3Ryb3llZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZGF0YVR5cGUgPSBkYXRhLmRhdGFUeXBlIHx8IHRoYXQub3B0aW9ucy5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KGRhdGEpLmRvbmUocmVtb3ZlTm9kZSkuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdkZXN0cm95ZmFpbGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3Jlc2V0RmluaXNoZWREZWZlcnJlZHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbmlzaGVkVXBsb2FkcyA9IFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9hZGRGaW5pc2hlZERlZmVycmVkczogZnVuY3Rpb24gKGRlZmVycmVkKSB7XG4gICAgICAgICAgICBpZiAoIWRlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9maW5pc2hlZFVwbG9hZHMucHVzaChkZWZlcnJlZCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldEZpbmlzaGVkRGVmZXJyZWRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmluaXNoZWRVcGxvYWRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIExpbmsgaGFuZGxlciwgdGhhdCBhbGxvd3MgdG8gZG93bmxvYWQgZmlsZXNcbiAgICAgICAgLy8gYnkgZHJhZyAmIGRyb3Agb2YgdGhlIGxpbmtzIHRvIHRoZSBkZXNrdG9wOlxuICAgICAgICBfZW5hYmxlRHJhZ1RvRGVza3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxpbmsgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIHVybCA9IGxpbmsucHJvcCgnaHJlZicpLFxuICAgICAgICAgICAgICAgIG5hbWUgPSBsaW5rLnByb3AoJ2Rvd25sb2FkJyksXG4gICAgICAgICAgICAgICAgdHlwZSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICAgICAgICAgICAgbGluay5iaW5kKCdkcmFnc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICdEb3dubG9hZFVSTCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdHlwZSwgbmFtZSwgdXJsXS5qb2luKCc6JylcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZm9ybWF0RmlsZVNpemU6IGZ1bmN0aW9uIChieXRlcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBieXRlcyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnl0ZXMgPj0gMTAwMDAwMDAwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoYnl0ZXMgLyAxMDAwMDAwMDAwKS50b0ZpeGVkKDIpICsgJyBHQic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnl0ZXMgPj0gMTAwMDAwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoYnl0ZXMgLyAxMDAwMDAwKS50b0ZpeGVkKDIpICsgJyBNQic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGJ5dGVzIC8gMTAwMCkudG9GaXhlZCgyKSArICcgS0InO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9mb3JtYXRCaXRyYXRlOiBmdW5jdGlvbiAoYml0cykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiaXRzICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiaXRzID49IDEwMDAwMDAwMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJpdHMgLyAxMDAwMDAwMDAwKS50b0ZpeGVkKDIpICsgJyBHYml0L3MnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJpdHMgPj0gMTAwMDAwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoYml0cyAvIDEwMDAwMDApLnRvRml4ZWQoMikgKyAnIE1iaXQvcyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYml0cyA+PSAxMDAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChiaXRzIC8gMTAwMCkudG9GaXhlZCgyKSArICcga2JpdC9zJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBiaXRzLnRvRml4ZWQoMikgKyAnIGJpdC9zJztcbiAgICAgICAgfSxcblxuICAgICAgICBfZm9ybWF0VGltZTogZnVuY3Rpb24gKHNlY29uZHMpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoc2Vjb25kcyAqIDEwMDApLFxuICAgICAgICAgICAgICAgIGRheXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA4NjQwMCk7XG4gICAgICAgICAgICBkYXlzID0gZGF5cyA/IGRheXMgKyAnZCAnIDogJyc7XG4gICAgICAgICAgICByZXR1cm4gZGF5cyArXG4gICAgICAgICAgICAgICAgKCcwJyArIGRhdGUuZ2V0VVRDSG91cnMoKSkuc2xpY2UoLTIpICsgJzonICtcbiAgICAgICAgICAgICAgICAoJzAnICsgZGF0ZS5nZXRVVENNaW51dGVzKCkpLnNsaWNlKC0yKSArICc6JyArXG4gICAgICAgICAgICAgICAgKCcwJyArIGRhdGUuZ2V0VVRDU2Vjb25kcygpKS5zbGljZSgtMik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Zvcm1hdFBlcmNlbnRhZ2U6IGZ1bmN0aW9uIChmbG9hdFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0VmFsdWUgKiAxMDApLnRvRml4ZWQoMikgKyAnICUnO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJFeHRlbmRlZFByb2dyZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdEJpdHJhdGUoZGF0YS5iaXRyYXRlKSArICcgfCAnICtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXRUaW1lKFxuICAgICAgICAgICAgICAgICAgICAoZGF0YS50b3RhbCAtIGRhdGEubG9hZGVkKSAqIDggLyBkYXRhLmJpdHJhdGVcbiAgICAgICAgICAgICAgICApICsgJyB8ICcgK1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdFBlcmNlbnRhZ2UoXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubG9hZGVkIC8gZGF0YS50b3RhbFxuICAgICAgICAgICAgICAgICkgKyAnIHwgJyArXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0RmlsZVNpemUoZGF0YS5sb2FkZWQpICsgJyAvICcgK1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdEZpbGVTaXplKGRhdGEudG90YWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJUZW1wbGF0ZTogZnVuY3Rpb24gKGZ1bmMsIGZpbGVzKSB7XG4gICAgICAgICAgICBpZiAoIWZ1bmMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMoe1xuICAgICAgICAgICAgICAgIGZpbGVzOiBmaWxlcyxcbiAgICAgICAgICAgICAgICBmb3JtYXRGaWxlU2l6ZTogdGhpcy5fZm9ybWF0RmlsZVNpemUsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiAkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkKHRoaXMub3B0aW9ucy50ZW1wbGF0ZXNDb250YWluZXIpLmh0bWwocmVzdWx0KS5jaGlsZHJlbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJQcmV2aWV3czogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEuY29udGV4dC5maW5kKCcucHJldmlldycpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbG0pIHtcbiAgICAgICAgICAgICAgICAkKGVsbSkuYXBwZW5kKGRhdGEuZmlsZXNbaW5kZXhdLnByZXZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlbmRlclVwbG9hZDogZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyVGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnVwbG9hZFRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIGZpbGVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJEb3dubG9hZDogZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyVGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRvd25sb2FkVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgZmlsZXNcbiAgICAgICAgICAgICkuZmluZCgnYVtkb3dubG9hZF0nKS5lYWNoKHRoaXMuX2VuYWJsZURyYWdUb0Rlc2t0b3ApLmVuZCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9zdGFydEhhbmRsZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gJChlLmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gYnV0dG9uLmNsb3Nlc3QoJy50ZW1wbGF0ZS11cGxvYWQnKSxcbiAgICAgICAgICAgICAgICBkYXRhID0gdGVtcGxhdGUuZGF0YSgnZGF0YScpO1xuICAgICAgICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnN1Ym1pdCkge1xuICAgICAgICAgICAgICAgIGRhdGEuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NhbmNlbEhhbmRsZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy50ZW1wbGF0ZS11cGxvYWQsLnRlbXBsYXRlLWRvd25sb2FkJyksXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRlbXBsYXRlLmRhdGEoJ2RhdGEnKSB8fCB7fTtcbiAgICAgICAgICAgIGRhdGEuY29udGV4dCA9IGRhdGEuY29udGV4dCB8fCB0ZW1wbGF0ZTtcbiAgICAgICAgICAgIGlmIChkYXRhLmFib3J0KSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hYm9ydCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhLmVycm9yVGhyb3duID0gJ2Fib3J0JztcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdmYWlsJywgZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2RlbGV0ZUhhbmRsZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcignZGVzdHJveScsIGUsICQuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBidXR0b24uY2xvc2VzdCgnLnRlbXBsYXRlLWRvd25sb2FkJyksXG4gICAgICAgICAgICAgICAgdHlwZTogJ0RFTEVURSdcbiAgICAgICAgICAgIH0sIGJ1dHRvbi5kYXRhKCkpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZm9yY2VSZWZsb3c6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgbm9kZS5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICBub2RlWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90cmFuc2l0aW9uOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgIGlmICgkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiBub2RlLmhhc0NsYXNzKCdmYWRlJykgJiYgbm9kZS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgIG5vZGUuYmluZChcbiAgICAgICAgICAgICAgICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IHJlc3BvbmQgdG8gb3RoZXIgdHJhbnNpdGlvbnMgZXZlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGUgY29udGFpbmVyIGVsZW1lbnQsIGUuZy4gZnJvbSBidXR0b24gZWxlbWVudHM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG5vZGVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnVuYmluZCgkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudG9nZ2xlQ2xhc3MoJ2luJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUudG9nZ2xlQ2xhc3MoJ2luJyk7XG4gICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRmZDtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdEJ1dHRvbkJhckV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmaWxlVXBsb2FkQnV0dG9uQmFyID0gdGhpcy5lbGVtZW50LmZpbmQoJy5maWxldXBsb2FkLWJ1dHRvbmJhcicpLFxuICAgICAgICAgICAgICAgIGZpbGVzTGlzdCA9IHRoaXMub3B0aW9ucy5maWxlc0NvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuX29uKGZpbGVVcGxvYWRCdXR0b25CYXIuZmluZCgnLnN0YXJ0JyksIHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBmaWxlc0xpc3QuZmluZCgnLnN0YXJ0JykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX29uKGZpbGVVcGxvYWRCdXR0b25CYXIuZmluZCgnLmNhbmNlbCcpLCB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNMaXN0LmZpbmQoJy5jYW5jZWwnKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fb24oZmlsZVVwbG9hZEJ1dHRvbkJhci5maW5kKCcuZGVsZXRlJyksIHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBmaWxlc0xpc3QuZmluZCgnLnRvZ2dsZTpjaGVja2VkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcudGVtcGxhdGUtZG93bmxvYWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5kZWxldGUnKS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICBmaWxlVXBsb2FkQnV0dG9uQmFyLmZpbmQoJy50b2dnbGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9vbihmaWxlVXBsb2FkQnV0dG9uQmFyLmZpbmQoJy50b2dnbGUnKSwge1xuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNMaXN0LmZpbmQoJy50b2dnbGUnKS5wcm9wKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NoZWNrZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLmlzKCc6Y2hlY2tlZCcpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Rlc3Ryb3lCdXR0b25CYXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9vZmYoXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJy5maWxldXBsb2FkLWJ1dHRvbmJhcicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc3RhcnQsIC5jYW5jZWwsIC5kZWxldGUnKSxcbiAgICAgICAgICAgICAgICAnY2xpY2snXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fb2ZmKFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcuZmlsZXVwbG9hZC1idXR0b25iYXIgLnRvZ2dsZScpLFxuICAgICAgICAgICAgICAgICdjaGFuZ2UuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdEV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9vbih0aGlzLm9wdGlvbnMuZmlsZXNDb250YWluZXIsIHtcbiAgICAgICAgICAgICAgICAnY2xpY2sgLnN0YXJ0JzogdGhpcy5fc3RhcnRIYW5kbGVyLFxuICAgICAgICAgICAgICAgICdjbGljayAuY2FuY2VsJzogdGhpcy5fY2FuY2VsSGFuZGxlcixcbiAgICAgICAgICAgICAgICAnY2xpY2sgLmRlbGV0ZSc6IHRoaXMuX2RlbGV0ZUhhbmRsZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5faW5pdEJ1dHRvbkJhckV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZGVzdHJveUV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lCdXR0b25CYXJFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICB0aGlzLl9vZmYodGhpcy5vcHRpb25zLmZpbGVzQ29udGFpbmVyLCAnY2xpY2snKTtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2VuYWJsZUZpbGVJbnB1dEJ1dHRvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJy5maWxlaW5wdXQtYnV0dG9uIGlucHV0JylcbiAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Rpc2FibGVGaWxlSW5wdXRCdXR0b246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcuZmlsZWlucHV0LWJ1dHRvbiBpbnB1dCcpXG4gICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAucGFyZW50KCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRUZW1wbGF0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZXNDb250YWluZXIgPSB0aGlzLmRvY3VtZW50WzBdLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlc0NvbnRhaW5lci5wcm9wKCdub2RlTmFtZScpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHRtcGwpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy51cGxvYWRUZW1wbGF0ZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudXBsb2FkVGVtcGxhdGUgPSB0bXBsKG9wdGlvbnMudXBsb2FkVGVtcGxhdGVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRvd25sb2FkVGVtcGxhdGVJZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmRvd25sb2FkVGVtcGxhdGUgPSB0bXBsKG9wdGlvbnMuZG93bmxvYWRUZW1wbGF0ZUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRGaWxlc0NvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5maWxlc0NvbnRhaW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlc0NvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5maW5kKCcuZmlsZXMnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShvcHRpb25zLmZpbGVzQ29udGFpbmVyIGluc3RhbmNlb2YgJCkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZpbGVzQ29udGFpbmVyID0gJChvcHRpb25zLmZpbGVzQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdFNwZWNpYWxPcHRpb25zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5faW5pdEZpbGVzQ29udGFpbmVyKCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0VGVtcGxhdGVzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0RmluaXNoZWREZWZlcnJlZHMoKTtcbiAgICAgICAgICAgIGlmICghJC5zdXBwb3J0LmZpbGVJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVGaWxlSW5wdXRCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBlbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3YXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHdhc0Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgICAgICBpZiAod2FzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCgnaW5wdXQsIGJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZUZpbGVJbnB1dEJ1dHRvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJ2lucHV0LCBidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVGaWxlSW5wdXRCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
