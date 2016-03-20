!function(e){"use strict";var t=function(e,i,a){var o,r,n=document.createElement("img");if(n.onerror=i,n.onload=function(){!r||a&&a.noRevoke||t.revokeObjectURL(r),i&&i(t.scale(n,a))},t.isInstanceOf("Blob",e)||t.isInstanceOf("File",e))o=r=t.createObjectURL(e),n._type=e.type;else{if("string"!=typeof e)return!1;o=e,a&&a.crossOrigin&&(n.crossOrigin=a.crossOrigin)}return o?(n.src=o,n):t.readFile(e,function(e){var t=e.target;t&&t.result?n.src=t.result:i&&i(e)})},i=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;t.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},t.transformCoordinates=function(){},t.getTransformedOptions=function(e,t){var i,a,o,r,n=t.aspectRatio;if(!n)return t;i={};for(a in t)t.hasOwnProperty(a)&&(i[a]=t[a]);return i.crop=!0,o=e.naturalWidth||e.width,r=e.naturalHeight||e.height,o/r>n?(i.maxWidth=r*n,i.maxHeight=r):(i.maxWidth=o,i.maxHeight=o/n),i},t.renderImageToCanvas=function(e,t,i,a,o,r,n,s,d,l){return e.getContext("2d").drawImage(t,i,a,o,r,n,s,d,l),e},t.hasCanvasOption=function(e){return e.canvas||e.crop||!!e.aspectRatio},t.scale=function(e,i){function a(){var e=Math.max((s||y)/y,(d||v)/v);e>1&&(y*=e,v*=e)}function o(){var e=Math.min((r||y)/y,(n||v)/v);1>e&&(y*=e,v*=e)}i=i||{};var r,n,s,d,l,c,u,g,f,h,m,p=document.createElement("canvas"),S=e.getContext||t.hasCanvasOption(i)&&p.getContext,b=e.naturalWidth||e.width,x=e.naturalHeight||e.height,y=b,v=x;if(S&&(i=t.getTransformedOptions(e,i),u=i.left||0,g=i.top||0,i.sourceWidth?(l=i.sourceWidth,void 0!==i.right&&void 0===i.left&&(u=b-l-i.right)):l=b-u-(i.right||0),i.sourceHeight?(c=i.sourceHeight,void 0!==i.bottom&&void 0===i.top&&(g=x-c-i.bottom)):c=x-g-(i.bottom||0),y=l,v=c),r=i.maxWidth,n=i.maxHeight,s=i.minWidth,d=i.minHeight,S&&r&&n&&i.crop?(y=r,v=n,m=l/c-r/n,0>m?(c=n*l/r,void 0===i.top&&void 0===i.bottom&&(g=(x-c)/2)):m>0&&(l=r*c/n,void 0===i.left&&void 0===i.right&&(u=(b-l)/2))):((i.contain||i.cover)&&(s=r=r||s,d=n=n||d),i.cover?(o(),a()):(a(),o())),S){if(f=i.pixelRatio,f>1&&(p.style.width=y+"px",p.style.height=v+"px",y*=f,v*=f,p.getContext("2d").scale(f,f)),h=i.downsamplingRatio,h>0&&1>h&&l>y&&c>v)for(;l*h>y;)p.width=l*h,p.height=c*h,t.renderImageToCanvas(p,e,u,g,l,c,0,0,p.width,p.height),l=p.width,c=p.height,e=document.createElement("canvas"),e.width=l,e.height=c,t.renderImageToCanvas(e,p,0,0,l,c,0,0,l,c);return p.width=y,p.height=v,t.transformCoordinates(p,i),t.renderImageToCanvas(p,e,u,g,l,c,0,0,y,v)}return e.width=y,e.height=v,e},t.createObjectURL=function(e){return i?i.createObjectURL(e):!1},t.revokeObjectURL=function(e){return i?i.revokeObjectURL(e):!1},t.readFile=function(e,t,i){if(window.FileReader){var a=new FileReader;if(a.onload=a.onerror=t,i=i||"readAsDataURL",a[i])return a[i](e),a}return!1},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:e.loadImage=t}(window),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e("object"==typeof module&&module.exports?require("./load-image"):window.loadImage)}(function(e){"use strict";if(window.navigator&&window.navigator.platform&&/iP(hone|od|ad)/.test(window.navigator.platform)){var t=e.renderImageToCanvas;e.detectSubsampling=function(e){var t,i;return e.width*e.height>1048576?(t=document.createElement("canvas"),t.width=t.height=1,i=t.getContext("2d"),i.drawImage(e,-e.width+1,0),0===i.getImageData(0,0,1,1).data[3]):!1},e.detectVerticalSquash=function(e,t){var i,a,o,r,n,s=e.naturalHeight||e.height,d=document.createElement("canvas"),l=d.getContext("2d");for(t&&(s/=2),d.width=1,d.height=s,l.drawImage(e,0,0),i=l.getImageData(0,0,1,s).data,a=0,o=s,r=s;r>a;)n=i[4*(r-1)+3],0===n?o=r:a=r,r=o+a>>1;return r/s||1},e.renderImageToCanvas=function(i,a,o,r,n,s,d,l,c,u){if("image/jpeg"===a._type){var g,f,h,m,p=i.getContext("2d"),S=document.createElement("canvas"),b=1024,x=S.getContext("2d");if(S.width=b,S.height=b,p.save(),g=e.detectSubsampling(a),g&&(o/=2,r/=2,n/=2,s/=2),f=e.detectVerticalSquash(a,g),g||1!==f){for(r*=f,c=Math.ceil(b*c/n),u=Math.ceil(b*u/s/f),l=0,m=0;s>m;){for(d=0,h=0;n>h;)x.clearRect(0,0,b,b),x.drawImage(a,o,r,n,s,-h,-m,n,s),p.drawImage(S,0,0,b,b,d,l,c,u),h+=b,d+=c;m+=b,l+=u}return p.restore(),i}}return t(i,a,o,r,n,s,d,l,c,u)}}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e("object"==typeof module&&module.exports?require("./load-image"):window.loadImage)}(function(e){"use strict";var t=e.hasCanvasOption,i=e.transformCoordinates,a=e.getTransformedOptions;e.hasCanvasOption=function(i){return!!i.orientation||t.call(e,i)},e.transformCoordinates=function(t,a){i.call(e,t,a);var o=t.getContext("2d"),r=t.width,n=t.height,s=t.style.width,d=t.style.height,l=a.orientation;if(l&&!(l>8))switch(l>4&&(t.width=n,t.height=r,t.style.width=d,t.style.height=s),l){case 2:o.translate(r,0),o.scale(-1,1);break;case 3:o.translate(r,n),o.rotate(Math.PI);break;case 4:o.translate(0,n),o.scale(1,-1);break;case 5:o.rotate(.5*Math.PI),o.scale(1,-1);break;case 6:o.rotate(.5*Math.PI),o.translate(0,-n);break;case 7:o.rotate(.5*Math.PI),o.translate(r,-n),o.scale(-1,1);break;case 8:o.rotate(-.5*Math.PI),o.translate(-r,0)}},e.getTransformedOptions=function(t,i){var o,r,n=a.call(e,t,i),s=n.orientation;if(!s||s>8||1===s)return n;o={};for(r in n)n.hasOwnProperty(r)&&(o[r]=n[r]);switch(n.orientation){case 2:o.left=n.right,o.right=n.left;break;case 3:o.left=n.right,o.top=n.bottom,o.right=n.left,o.bottom=n.top;break;case 4:o.top=n.bottom,o.bottom=n.top;break;case 5:o.left=n.top,o.top=n.left,o.right=n.bottom,o.bottom=n.right;break;case 6:o.left=n.top,o.top=n.right,o.right=n.bottom,o.bottom=n.left;break;case 7:o.left=n.bottom,o.top=n.right,o.right=n.top,o.bottom=n.left;break;case 8:o.left=n.bottom,o.top=n.left,o.right=n.top,o.bottom=n.right}return n.orientation>4&&(o.maxWidth=n.maxHeight,o.maxHeight=n.maxWidth,o.minWidth=n.minHeight,o.minHeight=n.minWidth,o.sourceWidth=n.sourceHeight,o.sourceHeight=n.sourceWidth),o}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image"],e):e("object"==typeof module&&module.exports?require("./load-image"):window.loadImage)}(function(e){"use strict";var t=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);e.blobSlice=t&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},e.metaDataParsers={jpeg:{65505:[]}},e.parseMetaData=function(t,i,a){a=a||{};var o=this,r=a.maxMetaDataSize||262144,n={},s=!(window.DataView&&t&&t.size>=12&&"image/jpeg"===t.type&&e.blobSlice);(s||!e.readFile(e.blobSlice.call(t,0,r),function(t){if(t.target.error)return console.log(t.target.error),void i(n);var r,s,d,l,c=t.target.result,u=new DataView(c),g=2,f=u.byteLength-4,h=g;if(65496===u.getUint16(0)){for(;f>g&&(r=u.getUint16(g),r>=65504&&65519>=r||65534===r);){if(s=u.getUint16(g+2)+2,g+s>u.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(d=e.metaDataParsers.jpeg[r])for(l=0;l<d.length;l+=1)d[l].call(o,u,g,s,n,a);g+=s,h=g}!a.disableImageHead&&h>6&&(c.slice?n.imageHead=c.slice(0,h):n.imageHead=new Uint8Array(c).subarray(0,h))}else console.log("Invalid JPEG file: Missing JPEG marker.");i(n)},"readAsArrayBuffer"))&&i(n)}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(e){"use strict";e.ExifMap=function(){return this},e.ExifMap.prototype.map={Orientation:274},e.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},e.getExifThumbnail=function(e,t,i){var a,o,r;if(!i||t+i>e.byteLength)return void console.log("Invalid Exif data: Invalid thumbnail data.");for(a=[],o=0;i>o;o+=1)r=e.getUint8(t+o),a.push((16>r?"0":"")+r.toString(16));return"data:image/jpeg,%"+a.join("%")},e.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},e.exifTagTypes[7]=e.exifTagTypes[1],e.getExifValue=function(t,i,a,o,r,n){var s,d,l,c,u,g,f=e.exifTagTypes[o];if(!f)return void console.log("Invalid Exif data: Invalid tag type.");if(s=f.size*r,d=s>4?i+t.getUint32(a+8,n):a+8,d+s>t.byteLength)return void console.log("Invalid Exif data: Invalid data offset.");if(1===r)return f.getValue(t,d,n);for(l=[],c=0;r>c;c+=1)l[c]=f.getValue(t,d+c*f.size,n);if(f.ascii){for(u="",c=0;c<l.length&&(g=l[c],"\x00"!==g);c+=1)u+=g;return u}return l},e.parseExifTag=function(t,i,a,o,r){var n=t.getUint16(a,o);r.exif[n]=e.getExifValue(t,i,a,t.getUint16(a+2,o),t.getUint32(a+4,o),o)},e.parseExifTags=function(e,t,i,a,o){var r,n,s;if(i+6>e.byteLength)return void console.log("Invalid Exif data: Invalid directory offset.");if(r=e.getUint16(i,a),n=i+2+12*r,n+4>e.byteLength)return void console.log("Invalid Exif data: Invalid directory size.");for(s=0;r>s;s+=1)this.parseExifTag(e,t,i+2+12*s,a,o);return e.getUint32(n,a)},e.parseExifData=function(t,i,a,o,r){if(!r.disableExif){var n,s,d,l=i+10;if(1165519206===t.getUint32(i+4)){if(l+8>t.byteLength)return void console.log("Invalid Exif data: Invalid segment size.");if(0!==t.getUint16(i+8))return void console.log("Invalid Exif data: Missing byte alignment offset.");switch(t.getUint16(l)){case 18761:n=!0;break;case 19789:n=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}if(42!==t.getUint16(l+2,n))return void console.log("Invalid Exif data: Missing TIFF marker.");s=t.getUint32(l+4,n),o.exif=new e.ExifMap,s=e.parseExifTags(t,l,l+s,n,o),s&&!r.disableExifThumbnail&&(d={exif:{}},s=e.parseExifTags(t,l,l+s,n,d),d.exif[513]&&(o.exif.Thumbnail=e.getExifThumbnail(t,l+d.exif[513],d.exif[514]))),o.exif[34665]&&!r.disableExifSub&&e.parseExifTags(t,l,l+o.exif[34665],n,o),o.exif[34853]&&!r.disableExifGps&&e.parseExifTags(t,l,l+o.exif[34853],n,o)}}},e.metaDataParsers.jpeg[65505].push(e.parseExifData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-exif"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-exif")):e(window.loadImage)}(function(e){"use strict";e.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},e.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},e.ExifMap.prototype.getText=function(e){var t=this.get(e);switch(e){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[e][t];case"ExifVersion":case"FlashpixVersion":return String.fromCharCode(t[0],t[1],t[2],t[3]);case"ComponentsConfiguration":return this.stringValues[e][t[0]]+this.stringValues[e][t[1]]+this.stringValues[e][t[2]]+this.stringValues[e][t[3]];case"GPSVersionID":return t[0]+"."+t[1]+"."+t[2]+"."+t[3]}return String(t)},function(e){var t,i=e.tags,a=e.map;for(t in i)i.hasOwnProperty(t)&&(a[i[t]]=t)}(e.ExifMap.prototype),e.ExifMap.prototype.getAll=function(){var e,t,i={};for(e in this)this.hasOwnProperty(e)&&(t=this.tags[e],t&&(i[t]=this.getText(t)));return i}});
//# sourceMappingURL=load-image.all.min.js.map
!function(t){"use strict";var e=t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype,o=t.Blob&&function(){try{return Boolean(new Blob)}catch(t){return!1}}(),n=o&&t.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(t){return!1}}(),r=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||t.MSBlobBuilder,a=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,i=(o||r)&&t.atob&&t.ArrayBuffer&&t.Uint8Array&&function(t){var e,i,l,u,b,c,d,B,f;if(e=t.match(a),!e)throw new Error("invalid data URI");for(i=e[2]?e[1]:"text/plain"+(e[3]||";charset=US-ASCII"),l=!!e[4],u=t.slice(e[0].length),b=l?atob(u):decodeURIComponent(u),c=new ArrayBuffer(b.length),d=new Uint8Array(c),B=0;B<b.length;B+=1)d[B]=b.charCodeAt(B);return o?new Blob([n?d:c],{type:i}):(f=new r,f.append(c),f.getBlob(i))};t.HTMLCanvasElement&&!e.toBlob&&(e.mozGetAsFile?e.toBlob=function(t,o,n){t(n&&e.toDataURL&&i?i(this.toDataURL(o,n)):this.mozGetAsFile("blob",o))}:e.toDataURL&&i&&(e.toBlob=function(t,e,o){t(i(this.toDataURL(e,o)))})),"function"==typeof define&&define.amd?define(function(){return i}):"object"==typeof module&&module.exports?module.exports=i:t.dataURLtoBlob=i}(window);
//# sourceMappingURL=canvas-to-blob.min.js.map
!function(e){"use strict";var n=function(e,t){var r=/[^\w\-\.:]/.test(e)?new Function(n.arg+",tmpl","var _e=tmpl.encode"+n.helper+",_s='"+e.replace(n.regexp,n.func)+"';return _s;"):n.cache[e]=n.cache[e]||n(n.load(e));return t?r(t,n):function(e){return r(e,n)}};n.cache={},n.load=function(e){return document.getElementById(e).innerHTML},n.regexp=/([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,n.func=function(e,n,t,r,c,u){return n?{"\n":"\\n","\r":"\\r","	":"\\t"," ":" "}[n]||"\\"+n:t?"="===t?"'+_e("+r+")+'":"'+("+r+"==null?'':"+r+")+'":c?"';":u?"_s+='":void 0},n.encReg=/[<>&"'\x00]/g,n.encMap={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"},n.encode=function(e){return(null==e?"":""+e).replace(n.encReg,function(e){return n.encMap[e]||""})},n.arg="o",n.helper=",print=function(s,e){_s+=e?(s==null?'':s):_e(s);},include=function(s,d){_s+=tmpl(s,d);}","function"==typeof define&&define.amd?define(function(){return n}):"object"==typeof module&&module.exports?module.exports=n:e.tmpl=n}(this);
//# sourceMappingURL=tmpl.min.js.map
/*! jQuery UI - v1.11.1+CommonJS - 2014-09-17
* http://jqueryui.com
* Includes: widget.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );

	} else if (typeof exports === "object") {
		// Node/CommonJS:
		factory(require("jquery"));

	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Widget 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
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
			} catch( e ) {}
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

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

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
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

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
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
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
 * jQuery Iframe Transport Plugin 1.8.3
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
 * jQuery File Upload Plugin 5.42.3
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
            cache: false
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
            if (limitSize && (!filesLength || files[0].size === undefined)) {
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
                inputClone = input.clone(true);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
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
 * jQuery File Upload Processing Plugin 1.3.1
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
 * jQuery File Upload Image Preview & Resize Plugin 1.7.3
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
            'load-image-ios',
            'canvas-to-blob',
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
 * jQuery File Upload Audio Preview Plugin 1.0.4
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
 * jQuery File Upload Video Preview Plugin 1.0.4
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
 * jQuery File Upload Validation Plugin 1.1.3
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
 * jQuery File Upload User Interface Plugin 9.6.1
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWQtaW1hZ2UuYWxsLm1pbi5qcyIsImNhbnZhcy10by1ibG9iLm1pbi5qcyIsInRtcGwubWluLmpzIiwianF1ZXJ5LnVpLndpZGdldC5qcyIsImpxdWVyeS5pZnJhbWUtdHJhbnNwb3J0LmpzIiwianF1ZXJ5LmZpbGV1cGxvYWQuanMiLCJqcXVlcnkuZmlsZXVwbG9hZC1wcm9jZXNzLmpzIiwianF1ZXJ5LmZpbGV1cGxvYWQtaW1hZ2UuanMiLCJqcXVlcnkuZmlsZXVwbG9hZC1hdWRpby5qcyIsImpxdWVyeS5maWxldXBsb2FkLXZpZGVvLmpzIiwianF1ZXJ5LmZpbGV1cGxvYWQtdmFsaWRhdGUuanMiLCJqcXVlcnkuZmlsZXVwbG9hZC11aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQ0RBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZmlsZXVwbG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1mdW5jdGlvbihlLGksYSl7dmFyIG8scixuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7aWYobi5vbmVycm9yPWksbi5vbmxvYWQ9ZnVuY3Rpb24oKXshcnx8YSYmYS5ub1Jldm9rZXx8dC5yZXZva2VPYmplY3RVUkwociksaSYmaSh0LnNjYWxlKG4sYSkpfSx0LmlzSW5zdGFuY2VPZihcIkJsb2JcIixlKXx8dC5pc0luc3RhbmNlT2YoXCJGaWxlXCIsZSkpbz1yPXQuY3JlYXRlT2JqZWN0VVJMKGUpLG4uX3R5cGU9ZS50eXBlO2Vsc2V7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGUpcmV0dXJuITE7bz1lLGEmJmEuY3Jvc3NPcmlnaW4mJihuLmNyb3NzT3JpZ2luPWEuY3Jvc3NPcmlnaW4pfXJldHVybiBvPyhuLnNyYz1vLG4pOnQucmVhZEZpbGUoZSxmdW5jdGlvbihlKXt2YXIgdD1lLnRhcmdldDt0JiZ0LnJlc3VsdD9uLnNyYz10LnJlc3VsdDppJiZpKGUpfSl9LGk9d2luZG93LmNyZWF0ZU9iamVjdFVSTCYmd2luZG93fHx3aW5kb3cuVVJMJiZVUkwucmV2b2tlT2JqZWN0VVJMJiZVUkx8fHdpbmRvdy53ZWJraXRVUkwmJndlYmtpdFVSTDt0LmlzSW5zdGFuY2VPZj1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCk9PT1cIltvYmplY3QgXCIrZStcIl1cIn0sdC50cmFuc2Zvcm1Db29yZGluYXRlcz1mdW5jdGlvbigpe30sdC5nZXRUcmFuc2Zvcm1lZE9wdGlvbnM9ZnVuY3Rpb24oZSx0KXt2YXIgaSxhLG8scixuPXQuYXNwZWN0UmF0aW87aWYoIW4pcmV0dXJuIHQ7aT17fTtmb3IoYSBpbiB0KXQuaGFzT3duUHJvcGVydHkoYSkmJihpW2FdPXRbYV0pO3JldHVybiBpLmNyb3A9ITAsbz1lLm5hdHVyYWxXaWR0aHx8ZS53aWR0aCxyPWUubmF0dXJhbEhlaWdodHx8ZS5oZWlnaHQsby9yPm4/KGkubWF4V2lkdGg9cipuLGkubWF4SGVpZ2h0PXIpOihpLm1heFdpZHRoPW8saS5tYXhIZWlnaHQ9by9uKSxpfSx0LnJlbmRlckltYWdlVG9DYW52YXM9ZnVuY3Rpb24oZSx0LGksYSxvLHIsbixzLGQsbCl7cmV0dXJuIGUuZ2V0Q29udGV4dChcIjJkXCIpLmRyYXdJbWFnZSh0LGksYSxvLHIsbixzLGQsbCksZX0sdC5oYXNDYW52YXNPcHRpb249ZnVuY3Rpb24oZSl7cmV0dXJuIGUuY2FudmFzfHxlLmNyb3B8fCEhZS5hc3BlY3RSYXRpb30sdC5zY2FsZT1mdW5jdGlvbihlLGkpe2Z1bmN0aW9uIGEoKXt2YXIgZT1NYXRoLm1heCgoc3x8eSkveSwoZHx8dikvdik7ZT4xJiYoeSo9ZSx2Kj1lKX1mdW5jdGlvbiBvKCl7dmFyIGU9TWF0aC5taW4oKHJ8fHkpL3ksKG58fHYpL3YpOzE+ZSYmKHkqPWUsdio9ZSl9aT1pfHx7fTt2YXIgcixuLHMsZCxsLGMsdSxnLGYsaCxtLHA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxTPWUuZ2V0Q29udGV4dHx8dC5oYXNDYW52YXNPcHRpb24oaSkmJnAuZ2V0Q29udGV4dCxiPWUubmF0dXJhbFdpZHRofHxlLndpZHRoLHg9ZS5uYXR1cmFsSGVpZ2h0fHxlLmhlaWdodCx5PWIsdj14O2lmKFMmJihpPXQuZ2V0VHJhbnNmb3JtZWRPcHRpb25zKGUsaSksdT1pLmxlZnR8fDAsZz1pLnRvcHx8MCxpLnNvdXJjZVdpZHRoPyhsPWkuc291cmNlV2lkdGgsdm9pZCAwIT09aS5yaWdodCYmdm9pZCAwPT09aS5sZWZ0JiYodT1iLWwtaS5yaWdodCkpOmw9Yi11LShpLnJpZ2h0fHwwKSxpLnNvdXJjZUhlaWdodD8oYz1pLnNvdXJjZUhlaWdodCx2b2lkIDAhPT1pLmJvdHRvbSYmdm9pZCAwPT09aS50b3AmJihnPXgtYy1pLmJvdHRvbSkpOmM9eC1nLShpLmJvdHRvbXx8MCkseT1sLHY9Yykscj1pLm1heFdpZHRoLG49aS5tYXhIZWlnaHQscz1pLm1pbldpZHRoLGQ9aS5taW5IZWlnaHQsUyYmciYmbiYmaS5jcm9wPyh5PXIsdj1uLG09bC9jLXIvbiwwPm0/KGM9bipsL3Isdm9pZCAwPT09aS50b3AmJnZvaWQgMD09PWkuYm90dG9tJiYoZz0oeC1jKS8yKSk6bT4wJiYobD1yKmMvbix2b2lkIDA9PT1pLmxlZnQmJnZvaWQgMD09PWkucmlnaHQmJih1PShiLWwpLzIpKSk6KChpLmNvbnRhaW58fGkuY292ZXIpJiYocz1yPXJ8fHMsZD1uPW58fGQpLGkuY292ZXI/KG8oKSxhKCkpOihhKCksbygpKSksUyl7aWYoZj1pLnBpeGVsUmF0aW8sZj4xJiYocC5zdHlsZS53aWR0aD15K1wicHhcIixwLnN0eWxlLmhlaWdodD12K1wicHhcIix5Kj1mLHYqPWYscC5nZXRDb250ZXh0KFwiMmRcIikuc2NhbGUoZixmKSksaD1pLmRvd25zYW1wbGluZ1JhdGlvLGg+MCYmMT5oJiZsPnkmJmM+dilmb3IoO2wqaD55OylwLndpZHRoPWwqaCxwLmhlaWdodD1jKmgsdC5yZW5kZXJJbWFnZVRvQ2FudmFzKHAsZSx1LGcsbCxjLDAsMCxwLndpZHRoLHAuaGVpZ2h0KSxsPXAud2lkdGgsYz1wLmhlaWdodCxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksZS53aWR0aD1sLGUuaGVpZ2h0PWMsdC5yZW5kZXJJbWFnZVRvQ2FudmFzKGUscCwwLDAsbCxjLDAsMCxsLGMpO3JldHVybiBwLndpZHRoPXkscC5oZWlnaHQ9dix0LnRyYW5zZm9ybUNvb3JkaW5hdGVzKHAsaSksdC5yZW5kZXJJbWFnZVRvQ2FudmFzKHAsZSx1LGcsbCxjLDAsMCx5LHYpfXJldHVybiBlLndpZHRoPXksZS5oZWlnaHQ9dixlfSx0LmNyZWF0ZU9iamVjdFVSTD1mdW5jdGlvbihlKXtyZXR1cm4gaT9pLmNyZWF0ZU9iamVjdFVSTChlKTohMX0sdC5yZXZva2VPYmplY3RVUkw9ZnVuY3Rpb24oZSl7cmV0dXJuIGk/aS5yZXZva2VPYmplY3RVUkwoZSk6ITF9LHQucmVhZEZpbGU9ZnVuY3Rpb24oZSx0LGkpe2lmKHdpbmRvdy5GaWxlUmVhZGVyKXt2YXIgYT1uZXcgRmlsZVJlYWRlcjtpZihhLm9ubG9hZD1hLm9uZXJyb3I9dCxpPWl8fFwicmVhZEFzRGF0YVVSTFwiLGFbaV0pcmV0dXJuIGFbaV0oZSksYX1yZXR1cm4hMX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiB0fSk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dDplLmxvYWRJbWFnZT10fSh3aW5kb3cpLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wibG9hZC1pbWFnZVwiXSxlKTplKFwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP3JlcXVpcmUoXCIuL2xvYWQtaW1hZ2VcIik6d2luZG93LmxvYWRJbWFnZSl9KGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2lmKHdpbmRvdy5uYXZpZ2F0b3ImJndpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0mJi9pUChob25lfG9kfGFkKS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtKSl7dmFyIHQ9ZS5yZW5kZXJJbWFnZVRvQ2FudmFzO2UuZGV0ZWN0U3Vic2FtcGxpbmc9ZnVuY3Rpb24oZSl7dmFyIHQsaTtyZXR1cm4gZS53aWR0aCplLmhlaWdodD4xMDQ4NTc2Pyh0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksdC53aWR0aD10LmhlaWdodD0xLGk9dC5nZXRDb250ZXh0KFwiMmRcIiksaS5kcmF3SW1hZ2UoZSwtZS53aWR0aCsxLDApLDA9PT1pLmdldEltYWdlRGF0YSgwLDAsMSwxKS5kYXRhWzNdKTohMX0sZS5kZXRlY3RWZXJ0aWNhbFNxdWFzaD1mdW5jdGlvbihlLHQpe3ZhciBpLGEsbyxyLG4scz1lLm5hdHVyYWxIZWlnaHR8fGUuaGVpZ2h0LGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxsPWQuZ2V0Q29udGV4dChcIjJkXCIpO2Zvcih0JiYocy89MiksZC53aWR0aD0xLGQuaGVpZ2h0PXMsbC5kcmF3SW1hZ2UoZSwwLDApLGk9bC5nZXRJbWFnZURhdGEoMCwwLDEscykuZGF0YSxhPTAsbz1zLHI9cztyPmE7KW49aVs0KihyLTEpKzNdLDA9PT1uP289cjphPXIscj1vK2E+PjE7cmV0dXJuIHIvc3x8MX0sZS5yZW5kZXJJbWFnZVRvQ2FudmFzPWZ1bmN0aW9uKGksYSxvLHIsbixzLGQsbCxjLHUpe2lmKFwiaW1hZ2UvanBlZ1wiPT09YS5fdHlwZSl7dmFyIGcsZixoLG0scD1pLmdldENvbnRleHQoXCIyZFwiKSxTPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksYj0xMDI0LHg9Uy5nZXRDb250ZXh0KFwiMmRcIik7aWYoUy53aWR0aD1iLFMuaGVpZ2h0PWIscC5zYXZlKCksZz1lLmRldGVjdFN1YnNhbXBsaW5nKGEpLGcmJihvLz0yLHIvPTIsbi89MixzLz0yKSxmPWUuZGV0ZWN0VmVydGljYWxTcXVhc2goYSxnKSxnfHwxIT09Zil7Zm9yKHIqPWYsYz1NYXRoLmNlaWwoYipjL24pLHU9TWF0aC5jZWlsKGIqdS9zL2YpLGw9MCxtPTA7cz5tOyl7Zm9yKGQ9MCxoPTA7bj5oOyl4LmNsZWFyUmVjdCgwLDAsYixiKSx4LmRyYXdJbWFnZShhLG8scixuLHMsLWgsLW0sbixzKSxwLmRyYXdJbWFnZShTLDAsMCxiLGIsZCxsLGMsdSksaCs9YixkKz1jO20rPWIsbCs9dX1yZXR1cm4gcC5yZXN0b3JlKCksaX19cmV0dXJuIHQoaSxhLG8scixuLHMsZCxsLGMsdSl9fX0pLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wibG9hZC1pbWFnZVwiXSxlKTplKFwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP3JlcXVpcmUoXCIuL2xvYWQtaW1hZ2VcIik6d2luZG93LmxvYWRJbWFnZSl9KGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO3ZhciB0PWUuaGFzQ2FudmFzT3B0aW9uLGk9ZS50cmFuc2Zvcm1Db29yZGluYXRlcyxhPWUuZ2V0VHJhbnNmb3JtZWRPcHRpb25zO2UuaGFzQ2FudmFzT3B0aW9uPWZ1bmN0aW9uKGkpe3JldHVybiEhaS5vcmllbnRhdGlvbnx8dC5jYWxsKGUsaSl9LGUudHJhbnNmb3JtQ29vcmRpbmF0ZXM9ZnVuY3Rpb24odCxhKXtpLmNhbGwoZSx0LGEpO3ZhciBvPXQuZ2V0Q29udGV4dChcIjJkXCIpLHI9dC53aWR0aCxuPXQuaGVpZ2h0LHM9dC5zdHlsZS53aWR0aCxkPXQuc3R5bGUuaGVpZ2h0LGw9YS5vcmllbnRhdGlvbjtpZihsJiYhKGw+OCkpc3dpdGNoKGw+NCYmKHQud2lkdGg9bix0LmhlaWdodD1yLHQuc3R5bGUud2lkdGg9ZCx0LnN0eWxlLmhlaWdodD1zKSxsKXtjYXNlIDI6by50cmFuc2xhdGUociwwKSxvLnNjYWxlKC0xLDEpO2JyZWFrO2Nhc2UgMzpvLnRyYW5zbGF0ZShyLG4pLG8ucm90YXRlKE1hdGguUEkpO2JyZWFrO2Nhc2UgNDpvLnRyYW5zbGF0ZSgwLG4pLG8uc2NhbGUoMSwtMSk7YnJlYWs7Y2FzZSA1Om8ucm90YXRlKC41Kk1hdGguUEkpLG8uc2NhbGUoMSwtMSk7YnJlYWs7Y2FzZSA2Om8ucm90YXRlKC41Kk1hdGguUEkpLG8udHJhbnNsYXRlKDAsLW4pO2JyZWFrO2Nhc2UgNzpvLnJvdGF0ZSguNSpNYXRoLlBJKSxvLnRyYW5zbGF0ZShyLC1uKSxvLnNjYWxlKC0xLDEpO2JyZWFrO2Nhc2UgODpvLnJvdGF0ZSgtLjUqTWF0aC5QSSksby50cmFuc2xhdGUoLXIsMCl9fSxlLmdldFRyYW5zZm9ybWVkT3B0aW9ucz1mdW5jdGlvbih0LGkpe3ZhciBvLHIsbj1hLmNhbGwoZSx0LGkpLHM9bi5vcmllbnRhdGlvbjtpZighc3x8cz44fHwxPT09cylyZXR1cm4gbjtvPXt9O2ZvcihyIGluIG4pbi5oYXNPd25Qcm9wZXJ0eShyKSYmKG9bcl09bltyXSk7c3dpdGNoKG4ub3JpZW50YXRpb24pe2Nhc2UgMjpvLmxlZnQ9bi5yaWdodCxvLnJpZ2h0PW4ubGVmdDticmVhaztjYXNlIDM6by5sZWZ0PW4ucmlnaHQsby50b3A9bi5ib3R0b20sby5yaWdodD1uLmxlZnQsby5ib3R0b209bi50b3A7YnJlYWs7Y2FzZSA0Om8udG9wPW4uYm90dG9tLG8uYm90dG9tPW4udG9wO2JyZWFrO2Nhc2UgNTpvLmxlZnQ9bi50b3Asby50b3A9bi5sZWZ0LG8ucmlnaHQ9bi5ib3R0b20sby5ib3R0b209bi5yaWdodDticmVhaztjYXNlIDY6by5sZWZ0PW4udG9wLG8udG9wPW4ucmlnaHQsby5yaWdodD1uLmJvdHRvbSxvLmJvdHRvbT1uLmxlZnQ7YnJlYWs7Y2FzZSA3Om8ubGVmdD1uLmJvdHRvbSxvLnRvcD1uLnJpZ2h0LG8ucmlnaHQ9bi50b3Asby5ib3R0b209bi5sZWZ0O2JyZWFrO2Nhc2UgODpvLmxlZnQ9bi5ib3R0b20sby50b3A9bi5sZWZ0LG8ucmlnaHQ9bi50b3Asby5ib3R0b209bi5yaWdodH1yZXR1cm4gbi5vcmllbnRhdGlvbj40JiYoby5tYXhXaWR0aD1uLm1heEhlaWdodCxvLm1heEhlaWdodD1uLm1heFdpZHRoLG8ubWluV2lkdGg9bi5taW5IZWlnaHQsby5taW5IZWlnaHQ9bi5taW5XaWR0aCxvLnNvdXJjZVdpZHRoPW4uc291cmNlSGVpZ2h0LG8uc291cmNlSGVpZ2h0PW4uc291cmNlV2lkdGgpLG99fSksZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJsb2FkLWltYWdlXCJdLGUpOmUoXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/cmVxdWlyZShcIi4vbG9hZC1pbWFnZVwiKTp3aW5kb3cubG9hZEltYWdlKX0oZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9d2luZG93LkJsb2ImJihCbG9iLnByb3RvdHlwZS5zbGljZXx8QmxvYi5wcm90b3R5cGUud2Via2l0U2xpY2V8fEJsb2IucHJvdG90eXBlLm1velNsaWNlKTtlLmJsb2JTbGljZT10JiZmdW5jdGlvbigpe3ZhciBlPXRoaXMuc2xpY2V8fHRoaXMud2Via2l0U2xpY2V8fHRoaXMubW96U2xpY2U7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSxlLm1ldGFEYXRhUGFyc2Vycz17anBlZzp7NjU1MDU6W119fSxlLnBhcnNlTWV0YURhdGE9ZnVuY3Rpb24odCxpLGEpe2E9YXx8e307dmFyIG89dGhpcyxyPWEubWF4TWV0YURhdGFTaXplfHwyNjIxNDQsbj17fSxzPSEod2luZG93LkRhdGFWaWV3JiZ0JiZ0LnNpemU+PTEyJiZcImltYWdlL2pwZWdcIj09PXQudHlwZSYmZS5ibG9iU2xpY2UpOyhzfHwhZS5yZWFkRmlsZShlLmJsb2JTbGljZS5jYWxsKHQsMCxyKSxmdW5jdGlvbih0KXtpZih0LnRhcmdldC5lcnJvcilyZXR1cm4gY29uc29sZS5sb2codC50YXJnZXQuZXJyb3IpLHZvaWQgaShuKTt2YXIgcixzLGQsbCxjPXQudGFyZ2V0LnJlc3VsdCx1PW5ldyBEYXRhVmlldyhjKSxnPTIsZj11LmJ5dGVMZW5ndGgtNCxoPWc7aWYoNjU0OTY9PT11LmdldFVpbnQxNigwKSl7Zm9yKDtmPmcmJihyPXUuZ2V0VWludDE2KGcpLHI+PTY1NTA0JiY2NTUxOT49cnx8NjU1MzQ9PT1yKTspe2lmKHM9dS5nZXRVaW50MTYoZysyKSsyLGcrcz51LmJ5dGVMZW5ndGgpe2NvbnNvbGUubG9nKFwiSW52YWxpZCBtZXRhIGRhdGE6IEludmFsaWQgc2VnbWVudCBzaXplLlwiKTticmVha31pZihkPWUubWV0YURhdGFQYXJzZXJzLmpwZWdbcl0pZm9yKGw9MDtsPGQubGVuZ3RoO2wrPTEpZFtsXS5jYWxsKG8sdSxnLHMsbixhKTtnKz1zLGg9Z30hYS5kaXNhYmxlSW1hZ2VIZWFkJiZoPjYmJihjLnNsaWNlP24uaW1hZ2VIZWFkPWMuc2xpY2UoMCxoKTpuLmltYWdlSGVhZD1uZXcgVWludDhBcnJheShjKS5zdWJhcnJheSgwLGgpKX1lbHNlIGNvbnNvbGUubG9nKFwiSW52YWxpZCBKUEVHIGZpbGU6IE1pc3NpbmcgSlBFRyBtYXJrZXIuXCIpO2kobil9LFwicmVhZEFzQXJyYXlCdWZmZXJcIikpJiZpKG4pfX0pLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wibG9hZC1pbWFnZVwiLFwibG9hZC1pbWFnZS1tZXRhXCJdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP2UocmVxdWlyZShcIi4vbG9hZC1pbWFnZVwiKSxyZXF1aXJlKFwiLi9sb2FkLWltYWdlLW1ldGFcIikpOmUod2luZG93LmxvYWRJbWFnZSl9KGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2UuRXhpZk1hcD1mdW5jdGlvbigpe3JldHVybiB0aGlzfSxlLkV4aWZNYXAucHJvdG90eXBlLm1hcD17T3JpZW50YXRpb246Mjc0fSxlLkV4aWZNYXAucHJvdG90eXBlLmdldD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpc1tlXXx8dGhpc1t0aGlzLm1hcFtlXV19LGUuZ2V0RXhpZlRodW1ibmFpbD1mdW5jdGlvbihlLHQsaSl7dmFyIGEsbyxyO2lmKCFpfHx0K2k+ZS5ieXRlTGVuZ3RoKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKFwiSW52YWxpZCBFeGlmIGRhdGE6IEludmFsaWQgdGh1bWJuYWlsIGRhdGEuXCIpO2ZvcihhPVtdLG89MDtpPm87bys9MSlyPWUuZ2V0VWludDgodCtvKSxhLnB1c2goKDE2PnI/XCIwXCI6XCJcIikrci50b1N0cmluZygxNikpO3JldHVyblwiZGF0YTppbWFnZS9qcGVnLCVcIithLmpvaW4oXCIlXCIpfSxlLmV4aWZUYWdUeXBlcz17MTp7Z2V0VmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5nZXRVaW50OCh0KX0sc2l6ZToxfSwyOntnZXRWYWx1ZTpmdW5jdGlvbihlLHQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGUuZ2V0VWludDgodCkpfSxzaXplOjEsYXNjaWk6ITB9LDM6e2dldFZhbHVlOmZ1bmN0aW9uKGUsdCxpKXtyZXR1cm4gZS5nZXRVaW50MTYodCxpKX0sc2l6ZToyfSw0OntnZXRWYWx1ZTpmdW5jdGlvbihlLHQsaSl7cmV0dXJuIGUuZ2V0VWludDMyKHQsaSl9LHNpemU6NH0sNTp7Z2V0VmFsdWU6ZnVuY3Rpb24oZSx0LGkpe3JldHVybiBlLmdldFVpbnQzMih0LGkpL2UuZ2V0VWludDMyKHQrNCxpKX0sc2l6ZTo4fSw5OntnZXRWYWx1ZTpmdW5jdGlvbihlLHQsaSl7cmV0dXJuIGUuZ2V0SW50MzIodCxpKX0sc2l6ZTo0fSwxMDp7Z2V0VmFsdWU6ZnVuY3Rpb24oZSx0LGkpe3JldHVybiBlLmdldEludDMyKHQsaSkvZS5nZXRJbnQzMih0KzQsaSl9LHNpemU6OH19LGUuZXhpZlRhZ1R5cGVzWzddPWUuZXhpZlRhZ1R5cGVzWzFdLGUuZ2V0RXhpZlZhbHVlPWZ1bmN0aW9uKHQsaSxhLG8scixuKXt2YXIgcyxkLGwsYyx1LGcsZj1lLmV4aWZUYWdUeXBlc1tvXTtpZighZilyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhcIkludmFsaWQgRXhpZiBkYXRhOiBJbnZhbGlkIHRhZyB0eXBlLlwiKTtpZihzPWYuc2l6ZSpyLGQ9cz40P2krdC5nZXRVaW50MzIoYSs4LG4pOmErOCxkK3M+dC5ieXRlTGVuZ3RoKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKFwiSW52YWxpZCBFeGlmIGRhdGE6IEludmFsaWQgZGF0YSBvZmZzZXQuXCIpO2lmKDE9PT1yKXJldHVybiBmLmdldFZhbHVlKHQsZCxuKTtmb3IobD1bXSxjPTA7cj5jO2MrPTEpbFtjXT1mLmdldFZhbHVlKHQsZCtjKmYuc2l6ZSxuKTtpZihmLmFzY2lpKXtmb3IodT1cIlwiLGM9MDtjPGwubGVuZ3RoJiYoZz1sW2NdLFwiXFx4MDBcIiE9PWcpO2MrPTEpdSs9ZztyZXR1cm4gdX1yZXR1cm4gbH0sZS5wYXJzZUV4aWZUYWc9ZnVuY3Rpb24odCxpLGEsbyxyKXt2YXIgbj10LmdldFVpbnQxNihhLG8pO3IuZXhpZltuXT1lLmdldEV4aWZWYWx1ZSh0LGksYSx0LmdldFVpbnQxNihhKzIsbyksdC5nZXRVaW50MzIoYSs0LG8pLG8pfSxlLnBhcnNlRXhpZlRhZ3M9ZnVuY3Rpb24oZSx0LGksYSxvKXt2YXIgcixuLHM7aWYoaSs2PmUuYnl0ZUxlbmd0aClyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhcIkludmFsaWQgRXhpZiBkYXRhOiBJbnZhbGlkIGRpcmVjdG9yeSBvZmZzZXQuXCIpO2lmKHI9ZS5nZXRVaW50MTYoaSxhKSxuPWkrMisxMipyLG4rND5lLmJ5dGVMZW5ndGgpcmV0dXJuIHZvaWQgY29uc29sZS5sb2coXCJJbnZhbGlkIEV4aWYgZGF0YTogSW52YWxpZCBkaXJlY3Rvcnkgc2l6ZS5cIik7Zm9yKHM9MDtyPnM7cys9MSl0aGlzLnBhcnNlRXhpZlRhZyhlLHQsaSsyKzEyKnMsYSxvKTtyZXR1cm4gZS5nZXRVaW50MzIobixhKX0sZS5wYXJzZUV4aWZEYXRhPWZ1bmN0aW9uKHQsaSxhLG8scil7aWYoIXIuZGlzYWJsZUV4aWYpe3ZhciBuLHMsZCxsPWkrMTA7aWYoMTE2NTUxOTIwNj09PXQuZ2V0VWludDMyKGkrNCkpe2lmKGwrOD50LmJ5dGVMZW5ndGgpcmV0dXJuIHZvaWQgY29uc29sZS5sb2coXCJJbnZhbGlkIEV4aWYgZGF0YTogSW52YWxpZCBzZWdtZW50IHNpemUuXCIpO2lmKDAhPT10LmdldFVpbnQxNihpKzgpKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKFwiSW52YWxpZCBFeGlmIGRhdGE6IE1pc3NpbmcgYnl0ZSBhbGlnbm1lbnQgb2Zmc2V0LlwiKTtzd2l0Y2godC5nZXRVaW50MTYobCkpe2Nhc2UgMTg3NjE6bj0hMDticmVhaztjYXNlIDE5Nzg5Om49ITE7YnJlYWs7ZGVmYXVsdDpyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhcIkludmFsaWQgRXhpZiBkYXRhOiBJbnZhbGlkIGJ5dGUgYWxpZ25tZW50IG1hcmtlci5cIil9aWYoNDIhPT10LmdldFVpbnQxNihsKzIsbikpcmV0dXJuIHZvaWQgY29uc29sZS5sb2coXCJJbnZhbGlkIEV4aWYgZGF0YTogTWlzc2luZyBUSUZGIG1hcmtlci5cIik7cz10LmdldFVpbnQzMihsKzQsbiksby5leGlmPW5ldyBlLkV4aWZNYXAscz1lLnBhcnNlRXhpZlRhZ3ModCxsLGwrcyxuLG8pLHMmJiFyLmRpc2FibGVFeGlmVGh1bWJuYWlsJiYoZD17ZXhpZjp7fX0scz1lLnBhcnNlRXhpZlRhZ3ModCxsLGwrcyxuLGQpLGQuZXhpZls1MTNdJiYoby5leGlmLlRodW1ibmFpbD1lLmdldEV4aWZUaHVtYm5haWwodCxsK2QuZXhpZls1MTNdLGQuZXhpZls1MTRdKSkpLG8uZXhpZlszNDY2NV0mJiFyLmRpc2FibGVFeGlmU3ViJiZlLnBhcnNlRXhpZlRhZ3ModCxsLGwrby5leGlmWzM0NjY1XSxuLG8pLG8uZXhpZlszNDg1M10mJiFyLmRpc2FibGVFeGlmR3BzJiZlLnBhcnNlRXhpZlRhZ3ModCxsLGwrby5leGlmWzM0ODUzXSxuLG8pfX19LGUubWV0YURhdGFQYXJzZXJzLmpwZWdbNjU1MDVdLnB1c2goZS5wYXJzZUV4aWZEYXRhKX0pLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wibG9hZC1pbWFnZVwiLFwibG9hZC1pbWFnZS1leGlmXCJdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP2UocmVxdWlyZShcIi4vbG9hZC1pbWFnZVwiKSxyZXF1aXJlKFwiLi9sb2FkLWltYWdlLWV4aWZcIikpOmUod2luZG93LmxvYWRJbWFnZSl9KGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2UuRXhpZk1hcC5wcm90b3R5cGUudGFncz17MjU2OlwiSW1hZ2VXaWR0aFwiLDI1NzpcIkltYWdlSGVpZ2h0XCIsMzQ2NjU6XCJFeGlmSUZEUG9pbnRlclwiLDM0ODUzOlwiR1BTSW5mb0lGRFBvaW50ZXJcIiw0MDk2NTpcIkludGVyb3BlcmFiaWxpdHlJRkRQb2ludGVyXCIsMjU4OlwiQml0c1BlclNhbXBsZVwiLDI1OTpcIkNvbXByZXNzaW9uXCIsMjYyOlwiUGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvblwiLDI3NDpcIk9yaWVudGF0aW9uXCIsMjc3OlwiU2FtcGxlc1BlclBpeGVsXCIsMjg0OlwiUGxhbmFyQ29uZmlndXJhdGlvblwiLDUzMDpcIllDYkNyU3ViU2FtcGxpbmdcIiw1MzE6XCJZQ2JDclBvc2l0aW9uaW5nXCIsMjgyOlwiWFJlc29sdXRpb25cIiwyODM6XCJZUmVzb2x1dGlvblwiLDI5NjpcIlJlc29sdXRpb25Vbml0XCIsMjczOlwiU3RyaXBPZmZzZXRzXCIsMjc4OlwiUm93c1BlclN0cmlwXCIsMjc5OlwiU3RyaXBCeXRlQ291bnRzXCIsNTEzOlwiSlBFR0ludGVyY2hhbmdlRm9ybWF0XCIsNTE0OlwiSlBFR0ludGVyY2hhbmdlRm9ybWF0TGVuZ3RoXCIsMzAxOlwiVHJhbnNmZXJGdW5jdGlvblwiLDMxODpcIldoaXRlUG9pbnRcIiwzMTk6XCJQcmltYXJ5Q2hyb21hdGljaXRpZXNcIiw1Mjk6XCJZQ2JDckNvZWZmaWNpZW50c1wiLDUzMjpcIlJlZmVyZW5jZUJsYWNrV2hpdGVcIiwzMDY6XCJEYXRlVGltZVwiLDI3MDpcIkltYWdlRGVzY3JpcHRpb25cIiwyNzE6XCJNYWtlXCIsMjcyOlwiTW9kZWxcIiwzMDU6XCJTb2Z0d2FyZVwiLDMxNTpcIkFydGlzdFwiLDMzNDMyOlwiQ29weXJpZ2h0XCIsMzY4NjQ6XCJFeGlmVmVyc2lvblwiLDQwOTYwOlwiRmxhc2hwaXhWZXJzaW9uXCIsNDA5NjE6XCJDb2xvclNwYWNlXCIsNDA5NjI6XCJQaXhlbFhEaW1lbnNpb25cIiw0MDk2MzpcIlBpeGVsWURpbWVuc2lvblwiLDQyMjQwOlwiR2FtbWFcIiwzNzEyMTpcIkNvbXBvbmVudHNDb25maWd1cmF0aW9uXCIsMzcxMjI6XCJDb21wcmVzc2VkQml0c1BlclBpeGVsXCIsMzc1MDA6XCJNYWtlck5vdGVcIiwzNzUxMDpcIlVzZXJDb21tZW50XCIsNDA5NjQ6XCJSZWxhdGVkU291bmRGaWxlXCIsMzY4Njc6XCJEYXRlVGltZU9yaWdpbmFsXCIsMzY4Njg6XCJEYXRlVGltZURpZ2l0aXplZFwiLDM3NTIwOlwiU3ViU2VjVGltZVwiLDM3NTIxOlwiU3ViU2VjVGltZU9yaWdpbmFsXCIsMzc1MjI6XCJTdWJTZWNUaW1lRGlnaXRpemVkXCIsMzM0MzQ6XCJFeHBvc3VyZVRpbWVcIiwzMzQzNzpcIkZOdW1iZXJcIiwzNDg1MDpcIkV4cG9zdXJlUHJvZ3JhbVwiLDM0ODUyOlwiU3BlY3RyYWxTZW5zaXRpdml0eVwiLDM0ODU1OlwiUGhvdG9ncmFwaGljU2Vuc2l0aXZpdHlcIiwzNDg1NjpcIk9FQ0ZcIiwzNDg2NDpcIlNlbnNpdGl2aXR5VHlwZVwiLDM0ODY1OlwiU3RhbmRhcmRPdXRwdXRTZW5zaXRpdml0eVwiLDM0ODY2OlwiUmVjb21tZW5kZWRFeHBvc3VyZUluZGV4XCIsMzQ4Njc6XCJJU09TcGVlZFwiLDM0ODY4OlwiSVNPU3BlZWRMYXRpdHVkZXl5eVwiLDM0ODY5OlwiSVNPU3BlZWRMYXRpdHVkZXp6elwiLDM3Mzc3OlwiU2h1dHRlclNwZWVkVmFsdWVcIiwzNzM3ODpcIkFwZXJ0dXJlVmFsdWVcIiwzNzM3OTpcIkJyaWdodG5lc3NWYWx1ZVwiLDM3MzgwOlwiRXhwb3N1cmVCaWFzXCIsMzczODE6XCJNYXhBcGVydHVyZVZhbHVlXCIsMzczODI6XCJTdWJqZWN0RGlzdGFuY2VcIiwzNzM4MzpcIk1ldGVyaW5nTW9kZVwiLDM3Mzg0OlwiTGlnaHRTb3VyY2VcIiwzNzM4NTpcIkZsYXNoXCIsMzczOTY6XCJTdWJqZWN0QXJlYVwiLDM3Mzg2OlwiRm9jYWxMZW5ndGhcIiw0MTQ4MzpcIkZsYXNoRW5lcmd5XCIsNDE0ODQ6XCJTcGF0aWFsRnJlcXVlbmN5UmVzcG9uc2VcIiw0MTQ4NjpcIkZvY2FsUGxhbmVYUmVzb2x1dGlvblwiLDQxNDg3OlwiRm9jYWxQbGFuZVlSZXNvbHV0aW9uXCIsNDE0ODg6XCJGb2NhbFBsYW5lUmVzb2x1dGlvblVuaXRcIiw0MTQ5MjpcIlN1YmplY3RMb2NhdGlvblwiLDQxNDkzOlwiRXhwb3N1cmVJbmRleFwiLDQxNDk1OlwiU2Vuc2luZ01ldGhvZFwiLDQxNzI4OlwiRmlsZVNvdXJjZVwiLDQxNzI5OlwiU2NlbmVUeXBlXCIsNDE3MzA6XCJDRkFQYXR0ZXJuXCIsNDE5ODU6XCJDdXN0b21SZW5kZXJlZFwiLDQxOTg2OlwiRXhwb3N1cmVNb2RlXCIsNDE5ODc6XCJXaGl0ZUJhbGFuY2VcIiw0MTk4ODpcIkRpZ2l0YWxab29tUmF0aW9cIiw0MTk4OTpcIkZvY2FsTGVuZ3RoSW4zNW1tRmlsbVwiLDQxOTkwOlwiU2NlbmVDYXB0dXJlVHlwZVwiLDQxOTkxOlwiR2FpbkNvbnRyb2xcIiw0MTk5MjpcIkNvbnRyYXN0XCIsNDE5OTM6XCJTYXR1cmF0aW9uXCIsNDE5OTQ6XCJTaGFycG5lc3NcIiw0MTk5NTpcIkRldmljZVNldHRpbmdEZXNjcmlwdGlvblwiLDQxOTk2OlwiU3ViamVjdERpc3RhbmNlUmFuZ2VcIiw0MjAxNjpcIkltYWdlVW5pcXVlSURcIiw0MjAzMjpcIkNhbWVyYU93bmVyTmFtZVwiLDQyMDMzOlwiQm9keVNlcmlhbE51bWJlclwiLDQyMDM0OlwiTGVuc1NwZWNpZmljYXRpb25cIiw0MjAzNTpcIkxlbnNNYWtlXCIsNDIwMzY6XCJMZW5zTW9kZWxcIiw0MjAzNzpcIkxlbnNTZXJpYWxOdW1iZXJcIiwwOlwiR1BTVmVyc2lvbklEXCIsMTpcIkdQU0xhdGl0dWRlUmVmXCIsMjpcIkdQU0xhdGl0dWRlXCIsMzpcIkdQU0xvbmdpdHVkZVJlZlwiLDQ6XCJHUFNMb25naXR1ZGVcIiw1OlwiR1BTQWx0aXR1ZGVSZWZcIiw2OlwiR1BTQWx0aXR1ZGVcIiw3OlwiR1BTVGltZVN0YW1wXCIsODpcIkdQU1NhdGVsbGl0ZXNcIiw5OlwiR1BTU3RhdHVzXCIsMTA6XCJHUFNNZWFzdXJlTW9kZVwiLDExOlwiR1BTRE9QXCIsMTI6XCJHUFNTcGVlZFJlZlwiLDEzOlwiR1BTU3BlZWRcIiwxNDpcIkdQU1RyYWNrUmVmXCIsMTU6XCJHUFNUcmFja1wiLDE2OlwiR1BTSW1nRGlyZWN0aW9uUmVmXCIsMTc6XCJHUFNJbWdEaXJlY3Rpb25cIiwxODpcIkdQU01hcERhdHVtXCIsMTk6XCJHUFNEZXN0TGF0aXR1ZGVSZWZcIiwyMDpcIkdQU0Rlc3RMYXRpdHVkZVwiLDIxOlwiR1BTRGVzdExvbmdpdHVkZVJlZlwiLDIyOlwiR1BTRGVzdExvbmdpdHVkZVwiLDIzOlwiR1BTRGVzdEJlYXJpbmdSZWZcIiwyNDpcIkdQU0Rlc3RCZWFyaW5nXCIsMjU6XCJHUFNEZXN0RGlzdGFuY2VSZWZcIiwyNjpcIkdQU0Rlc3REaXN0YW5jZVwiLDI3OlwiR1BTUHJvY2Vzc2luZ01ldGhvZFwiLDI4OlwiR1BTQXJlYUluZm9ybWF0aW9uXCIsMjk6XCJHUFNEYXRlU3RhbXBcIiwzMDpcIkdQU0RpZmZlcmVudGlhbFwiLDMxOlwiR1BTSFBvc2l0aW9uaW5nRXJyb3JcIn0sZS5FeGlmTWFwLnByb3RvdHlwZS5zdHJpbmdWYWx1ZXM9e0V4cG9zdXJlUHJvZ3JhbTp7MDpcIlVuZGVmaW5lZFwiLDE6XCJNYW51YWxcIiwyOlwiTm9ybWFsIHByb2dyYW1cIiwzOlwiQXBlcnR1cmUgcHJpb3JpdHlcIiw0OlwiU2h1dHRlciBwcmlvcml0eVwiLDU6XCJDcmVhdGl2ZSBwcm9ncmFtXCIsNjpcIkFjdGlvbiBwcm9ncmFtXCIsNzpcIlBvcnRyYWl0IG1vZGVcIiw4OlwiTGFuZHNjYXBlIG1vZGVcIn0sTWV0ZXJpbmdNb2RlOnswOlwiVW5rbm93blwiLDE6XCJBdmVyYWdlXCIsMjpcIkNlbnRlcldlaWdodGVkQXZlcmFnZVwiLDM6XCJTcG90XCIsNDpcIk11bHRpU3BvdFwiLDU6XCJQYXR0ZXJuXCIsNjpcIlBhcnRpYWxcIiwyNTU6XCJPdGhlclwifSxMaWdodFNvdXJjZTp7MDpcIlVua25vd25cIiwxOlwiRGF5bGlnaHRcIiwyOlwiRmx1b3Jlc2NlbnRcIiwzOlwiVHVuZ3N0ZW4gKGluY2FuZGVzY2VudCBsaWdodClcIiw0OlwiRmxhc2hcIiw5OlwiRmluZSB3ZWF0aGVyXCIsMTA6XCJDbG91ZHkgd2VhdGhlclwiLDExOlwiU2hhZGVcIiwxMjpcIkRheWxpZ2h0IGZsdW9yZXNjZW50IChEIDU3MDAgLSA3MTAwSylcIiwxMzpcIkRheSB3aGl0ZSBmbHVvcmVzY2VudCAoTiA0NjAwIC0gNTQwMEspXCIsMTQ6XCJDb29sIHdoaXRlIGZsdW9yZXNjZW50IChXIDM5MDAgLSA0NTAwSylcIiwxNTpcIldoaXRlIGZsdW9yZXNjZW50IChXVyAzMjAwIC0gMzcwMEspXCIsMTc6XCJTdGFuZGFyZCBsaWdodCBBXCIsMTg6XCJTdGFuZGFyZCBsaWdodCBCXCIsMTk6XCJTdGFuZGFyZCBsaWdodCBDXCIsMjA6XCJENTVcIiwyMTpcIkQ2NVwiLDIyOlwiRDc1XCIsMjM6XCJENTBcIiwyNDpcIklTTyBzdHVkaW8gdHVuZ3N0ZW5cIiwyNTU6XCJPdGhlclwifSxGbGFzaDp7MDpcIkZsYXNoIGRpZCBub3QgZmlyZVwiLDE6XCJGbGFzaCBmaXJlZFwiLDU6XCJTdHJvYmUgcmV0dXJuIGxpZ2h0IG5vdCBkZXRlY3RlZFwiLDc6XCJTdHJvYmUgcmV0dXJuIGxpZ2h0IGRldGVjdGVkXCIsOTpcIkZsYXNoIGZpcmVkLCBjb21wdWxzb3J5IGZsYXNoIG1vZGVcIiwxMzpcIkZsYXNoIGZpcmVkLCBjb21wdWxzb3J5IGZsYXNoIG1vZGUsIHJldHVybiBsaWdodCBub3QgZGV0ZWN0ZWRcIiwxNTpcIkZsYXNoIGZpcmVkLCBjb21wdWxzb3J5IGZsYXNoIG1vZGUsIHJldHVybiBsaWdodCBkZXRlY3RlZFwiLDE2OlwiRmxhc2ggZGlkIG5vdCBmaXJlLCBjb21wdWxzb3J5IGZsYXNoIG1vZGVcIiwyNDpcIkZsYXNoIGRpZCBub3QgZmlyZSwgYXV0byBtb2RlXCIsMjU6XCJGbGFzaCBmaXJlZCwgYXV0byBtb2RlXCIsMjk6XCJGbGFzaCBmaXJlZCwgYXV0byBtb2RlLCByZXR1cm4gbGlnaHQgbm90IGRldGVjdGVkXCIsMzE6XCJGbGFzaCBmaXJlZCwgYXV0byBtb2RlLCByZXR1cm4gbGlnaHQgZGV0ZWN0ZWRcIiwzMjpcIk5vIGZsYXNoIGZ1bmN0aW9uXCIsNjU6XCJGbGFzaCBmaXJlZCwgcmVkLWV5ZSByZWR1Y3Rpb24gbW9kZVwiLDY5OlwiRmxhc2ggZmlyZWQsIHJlZC1leWUgcmVkdWN0aW9uIG1vZGUsIHJldHVybiBsaWdodCBub3QgZGV0ZWN0ZWRcIiw3MTpcIkZsYXNoIGZpcmVkLCByZWQtZXllIHJlZHVjdGlvbiBtb2RlLCByZXR1cm4gbGlnaHQgZGV0ZWN0ZWRcIiw3MzpcIkZsYXNoIGZpcmVkLCBjb21wdWxzb3J5IGZsYXNoIG1vZGUsIHJlZC1leWUgcmVkdWN0aW9uIG1vZGVcIiw3NzpcIkZsYXNoIGZpcmVkLCBjb21wdWxzb3J5IGZsYXNoIG1vZGUsIHJlZC1leWUgcmVkdWN0aW9uIG1vZGUsIHJldHVybiBsaWdodCBub3QgZGV0ZWN0ZWRcIiw3OTpcIkZsYXNoIGZpcmVkLCBjb21wdWxzb3J5IGZsYXNoIG1vZGUsIHJlZC1leWUgcmVkdWN0aW9uIG1vZGUsIHJldHVybiBsaWdodCBkZXRlY3RlZFwiLDg5OlwiRmxhc2ggZmlyZWQsIGF1dG8gbW9kZSwgcmVkLWV5ZSByZWR1Y3Rpb24gbW9kZVwiLDkzOlwiRmxhc2ggZmlyZWQsIGF1dG8gbW9kZSwgcmV0dXJuIGxpZ2h0IG5vdCBkZXRlY3RlZCwgcmVkLWV5ZSByZWR1Y3Rpb24gbW9kZVwiLDk1OlwiRmxhc2ggZmlyZWQsIGF1dG8gbW9kZSwgcmV0dXJuIGxpZ2h0IGRldGVjdGVkLCByZWQtZXllIHJlZHVjdGlvbiBtb2RlXCJ9LFNlbnNpbmdNZXRob2Q6ezE6XCJVbmRlZmluZWRcIiwyOlwiT25lLWNoaXAgY29sb3IgYXJlYSBzZW5zb3JcIiwzOlwiVHdvLWNoaXAgY29sb3IgYXJlYSBzZW5zb3JcIiw0OlwiVGhyZWUtY2hpcCBjb2xvciBhcmVhIHNlbnNvclwiLDU6XCJDb2xvciBzZXF1ZW50aWFsIGFyZWEgc2Vuc29yXCIsNzpcIlRyaWxpbmVhciBzZW5zb3JcIiw4OlwiQ29sb3Igc2VxdWVudGlhbCBsaW5lYXIgc2Vuc29yXCJ9LFNjZW5lQ2FwdHVyZVR5cGU6ezA6XCJTdGFuZGFyZFwiLDE6XCJMYW5kc2NhcGVcIiwyOlwiUG9ydHJhaXRcIiwzOlwiTmlnaHQgc2NlbmVcIn0sU2NlbmVUeXBlOnsxOlwiRGlyZWN0bHkgcGhvdG9ncmFwaGVkXCJ9LEN1c3RvbVJlbmRlcmVkOnswOlwiTm9ybWFsIHByb2Nlc3NcIiwxOlwiQ3VzdG9tIHByb2Nlc3NcIn0sV2hpdGVCYWxhbmNlOnswOlwiQXV0byB3aGl0ZSBiYWxhbmNlXCIsMTpcIk1hbnVhbCB3aGl0ZSBiYWxhbmNlXCJ9LEdhaW5Db250cm9sOnswOlwiTm9uZVwiLDE6XCJMb3cgZ2FpbiB1cFwiLDI6XCJIaWdoIGdhaW4gdXBcIiwzOlwiTG93IGdhaW4gZG93blwiLDQ6XCJIaWdoIGdhaW4gZG93blwifSxDb250cmFzdDp7MDpcIk5vcm1hbFwiLDE6XCJTb2Z0XCIsMjpcIkhhcmRcIn0sU2F0dXJhdGlvbjp7MDpcIk5vcm1hbFwiLDE6XCJMb3cgc2F0dXJhdGlvblwiLDI6XCJIaWdoIHNhdHVyYXRpb25cIn0sU2hhcnBuZXNzOnswOlwiTm9ybWFsXCIsMTpcIlNvZnRcIiwyOlwiSGFyZFwifSxTdWJqZWN0RGlzdGFuY2VSYW5nZTp7MDpcIlVua25vd25cIiwxOlwiTWFjcm9cIiwyOlwiQ2xvc2Ugdmlld1wiLDM6XCJEaXN0YW50IHZpZXdcIn0sRmlsZVNvdXJjZTp7MzpcIkRTQ1wifSxDb21wb25lbnRzQ29uZmlndXJhdGlvbjp7MDpcIlwiLDE6XCJZXCIsMjpcIkNiXCIsMzpcIkNyXCIsNDpcIlJcIiw1OlwiR1wiLDY6XCJCXCJ9LE9yaWVudGF0aW9uOnsxOlwidG9wLWxlZnRcIiwyOlwidG9wLXJpZ2h0XCIsMzpcImJvdHRvbS1yaWdodFwiLDQ6XCJib3R0b20tbGVmdFwiLDU6XCJsZWZ0LXRvcFwiLDY6XCJyaWdodC10b3BcIiw3OlwicmlnaHQtYm90dG9tXCIsODpcImxlZnQtYm90dG9tXCJ9fSxlLkV4aWZNYXAucHJvdG90eXBlLmdldFRleHQ9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5nZXQoZSk7c3dpdGNoKGUpe2Nhc2VcIkxpZ2h0U291cmNlXCI6Y2FzZVwiRmxhc2hcIjpjYXNlXCJNZXRlcmluZ01vZGVcIjpjYXNlXCJFeHBvc3VyZVByb2dyYW1cIjpjYXNlXCJTZW5zaW5nTWV0aG9kXCI6Y2FzZVwiU2NlbmVDYXB0dXJlVHlwZVwiOmNhc2VcIlNjZW5lVHlwZVwiOmNhc2VcIkN1c3RvbVJlbmRlcmVkXCI6Y2FzZVwiV2hpdGVCYWxhbmNlXCI6Y2FzZVwiR2FpbkNvbnRyb2xcIjpjYXNlXCJDb250cmFzdFwiOmNhc2VcIlNhdHVyYXRpb25cIjpjYXNlXCJTaGFycG5lc3NcIjpjYXNlXCJTdWJqZWN0RGlzdGFuY2VSYW5nZVwiOmNhc2VcIkZpbGVTb3VyY2VcIjpjYXNlXCJPcmllbnRhdGlvblwiOnJldHVybiB0aGlzLnN0cmluZ1ZhbHVlc1tlXVt0XTtjYXNlXCJFeGlmVmVyc2lvblwiOmNhc2VcIkZsYXNocGl4VmVyc2lvblwiOnJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHRbMF0sdFsxXSx0WzJdLHRbM10pO2Nhc2VcIkNvbXBvbmVudHNDb25maWd1cmF0aW9uXCI6cmV0dXJuIHRoaXMuc3RyaW5nVmFsdWVzW2VdW3RbMF1dK3RoaXMuc3RyaW5nVmFsdWVzW2VdW3RbMV1dK3RoaXMuc3RyaW5nVmFsdWVzW2VdW3RbMl1dK3RoaXMuc3RyaW5nVmFsdWVzW2VdW3RbM11dO2Nhc2VcIkdQU1ZlcnNpb25JRFwiOnJldHVybiB0WzBdK1wiLlwiK3RbMV0rXCIuXCIrdFsyXStcIi5cIit0WzNdfXJldHVybiBTdHJpbmcodCl9LGZ1bmN0aW9uKGUpe3ZhciB0LGk9ZS50YWdzLGE9ZS5tYXA7Zm9yKHQgaW4gaSlpLmhhc093blByb3BlcnR5KHQpJiYoYVtpW3RdXT10KX0oZS5FeGlmTWFwLnByb3RvdHlwZSksZS5FeGlmTWFwLnByb3RvdHlwZS5nZXRBbGw9ZnVuY3Rpb24oKXt2YXIgZSx0LGk9e307Zm9yKGUgaW4gdGhpcyl0aGlzLmhhc093blByb3BlcnR5KGUpJiYodD10aGlzLnRhZ3NbZV0sdCYmKGlbdF09dGhpcy5nZXRUZXh0KHQpKSk7cmV0dXJuIGl9fSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2FkLWltYWdlLmFsbC5taW4uanMubWFwIiwiIWZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO3ZhciBlPXQuSFRNTENhbnZhc0VsZW1lbnQmJnQuSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLG89dC5CbG9iJiZmdW5jdGlvbigpe3RyeXtyZXR1cm4gQm9vbGVhbihuZXcgQmxvYil9Y2F0Y2godCl7cmV0dXJuITF9fSgpLG49byYmdC5VaW50OEFycmF5JiZmdW5jdGlvbigpe3RyeXtyZXR1cm4gMTAwPT09bmV3IEJsb2IoW25ldyBVaW50OEFycmF5KDEwMCldKS5zaXplfWNhdGNoKHQpe3JldHVybiExfX0oKSxyPXQuQmxvYkJ1aWxkZXJ8fHQuV2ViS2l0QmxvYkJ1aWxkZXJ8fHQuTW96QmxvYkJ1aWxkZXJ8fHQuTVNCbG9iQnVpbGRlcixhPS9eZGF0YTooKC4qPykoO2NoYXJzZXQ9Lio/KT8pKDtiYXNlNjQpPywvLGk9KG98fHIpJiZ0LmF0b2ImJnQuQXJyYXlCdWZmZXImJnQuVWludDhBcnJheSYmZnVuY3Rpb24odCl7dmFyIGUsaSxsLHUsYixjLGQsQixmO2lmKGU9dC5tYXRjaChhKSwhZSl0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGRhdGEgVVJJXCIpO2ZvcihpPWVbMl0/ZVsxXTpcInRleHQvcGxhaW5cIisoZVszXXx8XCI7Y2hhcnNldD1VUy1BU0NJSVwiKSxsPSEhZVs0XSx1PXQuc2xpY2UoZVswXS5sZW5ndGgpLGI9bD9hdG9iKHUpOmRlY29kZVVSSUNvbXBvbmVudCh1KSxjPW5ldyBBcnJheUJ1ZmZlcihiLmxlbmd0aCksZD1uZXcgVWludDhBcnJheShjKSxCPTA7QjxiLmxlbmd0aDtCKz0xKWRbQl09Yi5jaGFyQ29kZUF0KEIpO3JldHVybiBvP25ldyBCbG9iKFtuP2Q6Y10se3R5cGU6aX0pOihmPW5ldyByLGYuYXBwZW5kKGMpLGYuZ2V0QmxvYihpKSl9O3QuSFRNTENhbnZhc0VsZW1lbnQmJiFlLnRvQmxvYiYmKGUubW96R2V0QXNGaWxlP2UudG9CbG9iPWZ1bmN0aW9uKHQsbyxuKXt0KG4mJmUudG9EYXRhVVJMJiZpP2kodGhpcy50b0RhdGFVUkwobyxuKSk6dGhpcy5tb3pHZXRBc0ZpbGUoXCJibG9iXCIsbykpfTplLnRvRGF0YVVSTCYmaSYmKGUudG9CbG9iPWZ1bmN0aW9uKHQsZSxvKXt0KGkodGhpcy50b0RhdGFVUkwoZSxvKSkpfSkpLFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gaX0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWk6dC5kYXRhVVJMdG9CbG9iPWl9KHdpbmRvdyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYW52YXMtdG8tYmxvYi5taW4uanMubWFwIiwiIWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO3ZhciBuPWZ1bmN0aW9uKGUsdCl7dmFyIHI9L1teXFx3XFwtXFwuOl0vLnRlc3QoZSk/bmV3IEZ1bmN0aW9uKG4uYXJnK1wiLHRtcGxcIixcInZhciBfZT10bXBsLmVuY29kZVwiK24uaGVscGVyK1wiLF9zPSdcIitlLnJlcGxhY2Uobi5yZWdleHAsbi5mdW5jKStcIic7cmV0dXJuIF9zO1wiKTpuLmNhY2hlW2VdPW4uY2FjaGVbZV18fG4obi5sb2FkKGUpKTtyZXR1cm4gdD9yKHQsbik6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSxuKX19O24uY2FjaGU9e30sbi5sb2FkPWZ1bmN0aW9uKGUpe3JldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlKS5pbm5lckhUTUx9LG4ucmVnZXhwPS8oW1xccydcXFxcXSkoPyEoPzpbXntdfFxceyg/ISUpKSolXFx9KXwoPzpcXHslKD18IykoW1xcc1xcU10rPyklXFx9KXwoXFx7JSl8KCVcXH0pL2csbi5mdW5jPWZ1bmN0aW9uKGUsbix0LHIsYyx1KXtyZXR1cm4gbj97XCJcXG5cIjpcIlxcXFxuXCIsXCJcXHJcIjpcIlxcXFxyXCIsXCJcdFwiOlwiXFxcXHRcIixcIiBcIjpcIiBcIn1bbl18fFwiXFxcXFwiK246dD9cIj1cIj09PXQ/XCInK19lKFwiK3IrXCIpKydcIjpcIicrKFwiK3IrXCI9PW51bGw/Jyc6XCIrcitcIikrJ1wiOmM/XCInO1wiOnU/XCJfcys9J1wiOnZvaWQgMH0sbi5lbmNSZWc9L1s8PiZcIidcXHgwMF0vZyxuLmVuY01hcD17XCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsXCImXCI6XCImYW1wO1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjMzk7XCJ9LG4uZW5jb2RlPWZ1bmN0aW9uKGUpe3JldHVybihudWxsPT1lP1wiXCI6XCJcIitlKS5yZXBsYWNlKG4uZW5jUmVnLGZ1bmN0aW9uKGUpe3JldHVybiBuLmVuY01hcFtlXXx8XCJcIn0pfSxuLmFyZz1cIm9cIixuLmhlbHBlcj1cIixwcmludD1mdW5jdGlvbihzLGUpe19zKz1lPyhzPT1udWxsPycnOnMpOl9lKHMpO30saW5jbHVkZT1mdW5jdGlvbihzLGQpe19zKz10bXBsKHMsZCk7fVwiLFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gbn0pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPW46ZS50bXBsPW59KHRoaXMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG1wbC5taW4uanMubWFwIiwiLyohIGpRdWVyeSBVSSAtIHYxLjExLjErQ29tbW9uSlMgLSAyMDE0LTA5LTE3XG4qIGh0dHA6Ly9qcXVlcnl1aS5jb21cbiogSW5jbHVkZXM6IHdpZGdldC5qc1xuKiBDb3B5cmlnaHQgMjAxNCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzOyBMaWNlbnNlZCBNSVQgKi9cblxuKGZ1bmN0aW9uKCBmYWN0b3J5ICkge1xuXHRpZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXG5cdFx0Ly8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuXHRcdGRlZmluZShbIFwianF1ZXJ5XCIgXSwgZmFjdG9yeSApO1xuXG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBOb2RlL0NvbW1vbkpTOlxuXHRcdGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIEJyb3dzZXIgZ2xvYmFsc1xuXHRcdGZhY3RvcnkoIGpRdWVyeSApO1xuXHR9XG59KGZ1bmN0aW9uKCAkICkge1xuLyohXG4gKiBqUXVlcnkgVUkgV2lkZ2V0IDEuMTEuMVxuICogaHR0cDovL2pxdWVyeXVpLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBodHRwOi8vYXBpLmpxdWVyeXVpLmNvbS9qUXVlcnkud2lkZ2V0L1xuICovXG5cblxudmFyIHdpZGdldF91dWlkID0gMCxcblx0d2lkZ2V0X3NsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4kLmNsZWFuRGF0YSA9IChmdW5jdGlvbiggb3JpZyApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtcyApIHtcblx0XHR2YXIgZXZlbnRzLCBlbGVtLCBpO1xuXHRcdGZvciAoIGkgPSAwOyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHR0cnkge1xuXG5cdFx0XHRcdC8vIE9ubHkgdHJpZ2dlciByZW1vdmUgd2hlbiBuZWNlc3NhcnkgdG8gc2F2ZSB0aW1lXG5cdFx0XHRcdGV2ZW50cyA9ICQuX2RhdGEoIGVsZW0sIFwiZXZlbnRzXCIgKTtcblx0XHRcdFx0aWYgKCBldmVudHMgJiYgZXZlbnRzLnJlbW92ZSApIHtcblx0XHRcdFx0XHQkKCBlbGVtICkudHJpZ2dlckhhbmRsZXIoIFwicmVtb3ZlXCIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC84MjM1XG5cdFx0XHR9IGNhdGNoKCBlICkge31cblx0XHR9XG5cdFx0b3JpZyggZWxlbXMgKTtcblx0fTtcbn0pKCAkLmNsZWFuRGF0YSApO1xuXG4kLndpZGdldCA9IGZ1bmN0aW9uKCBuYW1lLCBiYXNlLCBwcm90b3R5cGUgKSB7XG5cdHZhciBmdWxsTmFtZSwgZXhpc3RpbmdDb25zdHJ1Y3RvciwgY29uc3RydWN0b3IsIGJhc2VQcm90b3R5cGUsXG5cdFx0Ly8gcHJveGllZFByb3RvdHlwZSBhbGxvd3MgdGhlIHByb3ZpZGVkIHByb3RvdHlwZSB0byByZW1haW4gdW5tb2RpZmllZFxuXHRcdC8vIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgYXMgYSBtaXhpbiBmb3IgbXVsdGlwbGUgd2lkZ2V0cyAoIzg4NzYpXG5cdFx0cHJveGllZFByb3RvdHlwZSA9IHt9LFxuXHRcdG5hbWVzcGFjZSA9IG5hbWUuc3BsaXQoIFwiLlwiIClbIDAgXTtcblxuXHRuYW1lID0gbmFtZS5zcGxpdCggXCIuXCIgKVsgMSBdO1xuXHRmdWxsTmFtZSA9IG5hbWVzcGFjZSArIFwiLVwiICsgbmFtZTtcblxuXHRpZiAoICFwcm90b3R5cGUgKSB7XG5cdFx0cHJvdG90eXBlID0gYmFzZTtcblx0XHRiYXNlID0gJC5XaWRnZXQ7XG5cdH1cblxuXHQvLyBjcmVhdGUgc2VsZWN0b3IgZm9yIHBsdWdpblxuXHQkLmV4cHJbIFwiOlwiIF1bIGZ1bGxOYW1lLnRvTG93ZXJDYXNlKCkgXSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiAhISQuZGF0YSggZWxlbSwgZnVsbE5hbWUgKTtcblx0fTtcblxuXHQkWyBuYW1lc3BhY2UgXSA9ICRbIG5hbWVzcGFjZSBdIHx8IHt9O1xuXHRleGlzdGluZ0NvbnN0cnVjdG9yID0gJFsgbmFtZXNwYWNlIF1bIG5hbWUgXTtcblx0Y29uc3RydWN0b3IgPSAkWyBuYW1lc3BhY2UgXVsgbmFtZSBdID0gZnVuY3Rpb24oIG9wdGlvbnMsIGVsZW1lbnQgKSB7XG5cdFx0Ly8gYWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IFwibmV3XCIga2V5d29yZFxuXHRcdGlmICggIXRoaXMuX2NyZWF0ZVdpZGdldCApIHtcblx0XHRcdHJldHVybiBuZXcgY29uc3RydWN0b3IoIG9wdGlvbnMsIGVsZW1lbnQgKTtcblx0XHR9XG5cblx0XHQvLyBhbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgaW5pdGlhbGl6aW5nIGZvciBzaW1wbGUgaW5oZXJpdGFuY2Vcblx0XHQvLyBtdXN0IHVzZSBcIm5ld1wiIGtleXdvcmQgKHRoZSBjb2RlIGFib3ZlIGFsd2F5cyBwYXNzZXMgYXJncylcblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHR0aGlzLl9jcmVhdGVXaWRnZXQoIG9wdGlvbnMsIGVsZW1lbnQgKTtcblx0XHR9XG5cdH07XG5cdC8vIGV4dGVuZCB3aXRoIHRoZSBleGlzdGluZyBjb25zdHJ1Y3RvciB0byBjYXJyeSBvdmVyIGFueSBzdGF0aWMgcHJvcGVydGllc1xuXHQkLmV4dGVuZCggY29uc3RydWN0b3IsIGV4aXN0aW5nQ29uc3RydWN0b3IsIHtcblx0XHR2ZXJzaW9uOiBwcm90b3R5cGUudmVyc2lvbixcblx0XHQvLyBjb3B5IHRoZSBvYmplY3QgdXNlZCB0byBjcmVhdGUgdGhlIHByb3RvdHlwZSBpbiBjYXNlIHdlIG5lZWQgdG9cblx0XHQvLyByZWRlZmluZSB0aGUgd2lkZ2V0IGxhdGVyXG5cdFx0X3Byb3RvOiAkLmV4dGVuZCgge30sIHByb3RvdHlwZSApLFxuXHRcdC8vIHRyYWNrIHdpZGdldHMgdGhhdCBpbmhlcml0IGZyb20gdGhpcyB3aWRnZXQgaW4gY2FzZSB0aGlzIHdpZGdldCBpc1xuXHRcdC8vIHJlZGVmaW5lZCBhZnRlciBhIHdpZGdldCBpbmhlcml0cyBmcm9tIGl0XG5cdFx0X2NoaWxkQ29uc3RydWN0b3JzOiBbXVxuXHR9KTtcblxuXHRiYXNlUHJvdG90eXBlID0gbmV3IGJhc2UoKTtcblx0Ly8gd2UgbmVlZCB0byBtYWtlIHRoZSBvcHRpb25zIGhhc2ggYSBwcm9wZXJ0eSBkaXJlY3RseSBvbiB0aGUgbmV3IGluc3RhbmNlXG5cdC8vIG90aGVyd2lzZSB3ZSdsbCBtb2RpZnkgdGhlIG9wdGlvbnMgaGFzaCBvbiB0aGUgcHJvdG90eXBlIHRoYXQgd2UncmVcblx0Ly8gaW5oZXJpdGluZyBmcm9tXG5cdGJhc2VQcm90b3R5cGUub3B0aW9ucyA9ICQud2lkZ2V0LmV4dGVuZCgge30sIGJhc2VQcm90b3R5cGUub3B0aW9ucyApO1xuXHQkLmVhY2goIHByb3RvdHlwZSwgZnVuY3Rpb24oIHByb3AsIHZhbHVlICkge1xuXHRcdGlmICggISQuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHByb3hpZWRQcm90b3R5cGVbIHByb3AgXSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRwcm94aWVkUHJvdG90eXBlWyBwcm9wIF0gPSAoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgX3N1cGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJhc2UucHJvdG90eXBlWyBwcm9wIF0uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRfc3VwZXJBcHBseSA9IGZ1bmN0aW9uKCBhcmdzICkge1xuXHRcdFx0XHRcdHJldHVybiBiYXNlLnByb3RvdHlwZVsgcHJvcCBdLmFwcGx5KCB0aGlzLCBhcmdzICk7XG5cdFx0XHRcdH07XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBfX3N1cGVyID0gdGhpcy5fc3VwZXIsXG5cdFx0XHRcdFx0X19zdXBlckFwcGx5ID0gdGhpcy5fc3VwZXJBcHBseSxcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZTtcblxuXHRcdFx0XHR0aGlzLl9zdXBlciA9IF9zdXBlcjtcblx0XHRcdFx0dGhpcy5fc3VwZXJBcHBseSA9IF9zdXBlckFwcGx5O1xuXG5cdFx0XHRcdHJldHVyblZhbHVlID0gdmFsdWUuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRcdHRoaXMuX3N1cGVyID0gX19zdXBlcjtcblx0XHRcdFx0dGhpcy5fc3VwZXJBcHBseSA9IF9fc3VwZXJBcHBseTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0dXJuVmFsdWU7XG5cdFx0XHR9O1xuXHRcdH0pKCk7XG5cdH0pO1xuXHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLndpZGdldC5leHRlbmQoIGJhc2VQcm90b3R5cGUsIHtcblx0XHQvLyBUT0RPOiByZW1vdmUgc3VwcG9ydCBmb3Igd2lkZ2V0RXZlbnRQcmVmaXhcblx0XHQvLyBhbHdheXMgdXNlIHRoZSBuYW1lICsgYSBjb2xvbiBhcyB0aGUgcHJlZml4LCBlLmcuLCBkcmFnZ2FibGU6c3RhcnRcblx0XHQvLyBkb24ndCBwcmVmaXggZm9yIHdpZGdldHMgdGhhdCBhcmVuJ3QgRE9NLWJhc2VkXG5cdFx0d2lkZ2V0RXZlbnRQcmVmaXg6IGV4aXN0aW5nQ29uc3RydWN0b3IgPyAoYmFzZVByb3RvdHlwZS53aWRnZXRFdmVudFByZWZpeCB8fCBuYW1lKSA6IG5hbWVcblx0fSwgcHJveGllZFByb3RvdHlwZSwge1xuXHRcdGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3Rvcixcblx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZSxcblx0XHR3aWRnZXROYW1lOiBuYW1lLFxuXHRcdHdpZGdldEZ1bGxOYW1lOiBmdWxsTmFtZVxuXHR9KTtcblxuXHQvLyBJZiB0aGlzIHdpZGdldCBpcyBiZWluZyByZWRlZmluZWQgdGhlbiB3ZSBuZWVkIHRvIGZpbmQgYWxsIHdpZGdldHMgdGhhdFxuXHQvLyBhcmUgaW5oZXJpdGluZyBmcm9tIGl0IGFuZCByZWRlZmluZSBhbGwgb2YgdGhlbSBzbyB0aGF0IHRoZXkgaW5oZXJpdCBmcm9tXG5cdC8vIHRoZSBuZXcgdmVyc2lvbiBvZiB0aGlzIHdpZGdldC4gV2UncmUgZXNzZW50aWFsbHkgdHJ5aW5nIHRvIHJlcGxhY2Ugb25lXG5cdC8vIGxldmVsIGluIHRoZSBwcm90b3R5cGUgY2hhaW4uXG5cdGlmICggZXhpc3RpbmdDb25zdHJ1Y3RvciApIHtcblx0XHQkLmVhY2goIGV4aXN0aW5nQ29uc3RydWN0b3IuX2NoaWxkQ29uc3RydWN0b3JzLCBmdW5jdGlvbiggaSwgY2hpbGQgKSB7XG5cdFx0XHR2YXIgY2hpbGRQcm90b3R5cGUgPSBjaGlsZC5wcm90b3R5cGU7XG5cblx0XHRcdC8vIHJlZGVmaW5lIHRoZSBjaGlsZCB3aWRnZXQgdXNpbmcgdGhlIHNhbWUgcHJvdG90eXBlIHRoYXQgd2FzXG5cdFx0XHQvLyBvcmlnaW5hbGx5IHVzZWQsIGJ1dCBpbmhlcml0IGZyb20gdGhlIG5ldyB2ZXJzaW9uIG9mIHRoZSBiYXNlXG5cdFx0XHQkLndpZGdldCggY2hpbGRQcm90b3R5cGUubmFtZXNwYWNlICsgXCIuXCIgKyBjaGlsZFByb3RvdHlwZS53aWRnZXROYW1lLCBjb25zdHJ1Y3RvciwgY2hpbGQuX3Byb3RvICk7XG5cdFx0fSk7XG5cdFx0Ly8gcmVtb3ZlIHRoZSBsaXN0IG9mIGV4aXN0aW5nIGNoaWxkIGNvbnN0cnVjdG9ycyBmcm9tIHRoZSBvbGQgY29uc3RydWN0b3Jcblx0XHQvLyBzbyB0aGUgb2xkIGNoaWxkIGNvbnN0cnVjdG9ycyBjYW4gYmUgZ2FyYmFnZSBjb2xsZWN0ZWRcblx0XHRkZWxldGUgZXhpc3RpbmdDb25zdHJ1Y3Rvci5fY2hpbGRDb25zdHJ1Y3RvcnM7XG5cdH0gZWxzZSB7XG5cdFx0YmFzZS5fY2hpbGRDb25zdHJ1Y3RvcnMucHVzaCggY29uc3RydWN0b3IgKTtcblx0fVxuXG5cdCQud2lkZ2V0LmJyaWRnZSggbmFtZSwgY29uc3RydWN0b3IgKTtcblxuXHRyZXR1cm4gY29uc3RydWN0b3I7XG59O1xuXG4kLndpZGdldC5leHRlbmQgPSBmdW5jdGlvbiggdGFyZ2V0ICkge1xuXHR2YXIgaW5wdXQgPSB3aWRnZXRfc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICksXG5cdFx0aW5wdXRJbmRleCA9IDAsXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdFx0a2V5LFxuXHRcdHZhbHVlO1xuXHRmb3IgKCA7IGlucHV0SW5kZXggPCBpbnB1dExlbmd0aDsgaW5wdXRJbmRleCsrICkge1xuXHRcdGZvciAoIGtleSBpbiBpbnB1dFsgaW5wdXRJbmRleCBdICkge1xuXHRcdFx0dmFsdWUgPSBpbnB1dFsgaW5wdXRJbmRleCBdWyBrZXkgXTtcblx0XHRcdGlmICggaW5wdXRbIGlucHV0SW5kZXggXS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0Ly8gQ2xvbmUgb2JqZWN0c1xuXHRcdFx0XHRpZiAoICQuaXNQbGFpbk9iamVjdCggdmFsdWUgKSApIHtcblx0XHRcdFx0XHR0YXJnZXRbIGtleSBdID0gJC5pc1BsYWluT2JqZWN0KCB0YXJnZXRbIGtleSBdICkgP1xuXHRcdFx0XHRcdFx0JC53aWRnZXQuZXh0ZW5kKCB7fSwgdGFyZ2V0WyBrZXkgXSwgdmFsdWUgKSA6XG5cdFx0XHRcdFx0XHQvLyBEb24ndCBleHRlbmQgc3RyaW5ncywgYXJyYXlzLCBldGMuIHdpdGggb2JqZWN0c1xuXHRcdFx0XHRcdFx0JC53aWRnZXQuZXh0ZW5kKCB7fSwgdmFsdWUgKTtcblx0XHRcdFx0Ly8gQ29weSBldmVyeXRoaW5nIGVsc2UgYnkgcmVmZXJlbmNlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBrZXkgXSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4kLndpZGdldC5icmlkZ2UgPSBmdW5jdGlvbiggbmFtZSwgb2JqZWN0ICkge1xuXHR2YXIgZnVsbE5hbWUgPSBvYmplY3QucHJvdG90eXBlLndpZGdldEZ1bGxOYW1lIHx8IG5hbWU7XG5cdCQuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHRcdHZhciBpc01ldGhvZENhbGwgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIixcblx0XHRcdGFyZ3MgPSB3aWRnZXRfc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICksXG5cdFx0XHRyZXR1cm5WYWx1ZSA9IHRoaXM7XG5cblx0XHQvLyBhbGxvdyBtdWx0aXBsZSBoYXNoZXMgdG8gYmUgcGFzc2VkIG9uIGluaXRcblx0XHRvcHRpb25zID0gIWlzTWV0aG9kQ2FsbCAmJiBhcmdzLmxlbmd0aCA/XG5cdFx0XHQkLndpZGdldC5leHRlbmQuYXBwbHkoIG51bGwsIFsgb3B0aW9ucyBdLmNvbmNhdChhcmdzKSApIDpcblx0XHRcdG9wdGlvbnM7XG5cblx0XHRpZiAoIGlzTWV0aG9kQ2FsbCApIHtcblx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIG1ldGhvZFZhbHVlLFxuXHRcdFx0XHRcdGluc3RhbmNlID0gJC5kYXRhKCB0aGlzLCBmdWxsTmFtZSApO1xuXHRcdFx0XHRpZiAoIG9wdGlvbnMgPT09IFwiaW5zdGFuY2VcIiApIHtcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZSA9IGluc3RhbmNlO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoICFpbnN0YW5jZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gJC5lcnJvciggXCJjYW5ub3QgY2FsbCBtZXRob2RzIG9uIFwiICsgbmFtZSArIFwiIHByaW9yIHRvIGluaXRpYWxpemF0aW9uOyBcIiArXG5cdFx0XHRcdFx0XHRcImF0dGVtcHRlZCB0byBjYWxsIG1ldGhvZCAnXCIgKyBvcHRpb25zICsgXCInXCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoICEkLmlzRnVuY3Rpb24oIGluc3RhbmNlW29wdGlvbnNdICkgfHwgb3B0aW9ucy5jaGFyQXQoIDAgKSA9PT0gXCJfXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuICQuZXJyb3IoIFwibm8gc3VjaCBtZXRob2QgJ1wiICsgb3B0aW9ucyArIFwiJyBmb3IgXCIgKyBuYW1lICsgXCIgd2lkZ2V0IGluc3RhbmNlXCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRtZXRob2RWYWx1ZSA9IGluc3RhbmNlWyBvcHRpb25zIF0uYXBwbHkoIGluc3RhbmNlLCBhcmdzICk7XG5cdFx0XHRcdGlmICggbWV0aG9kVmFsdWUgIT09IGluc3RhbmNlICYmIG1ldGhvZFZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuVmFsdWUgPSBtZXRob2RWYWx1ZSAmJiBtZXRob2RWYWx1ZS5qcXVlcnkgP1xuXHRcdFx0XHRcdFx0cmV0dXJuVmFsdWUucHVzaFN0YWNrKCBtZXRob2RWYWx1ZS5nZXQoKSApIDpcblx0XHRcdFx0XHRcdG1ldGhvZFZhbHVlO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGluc3RhbmNlID0gJC5kYXRhKCB0aGlzLCBmdWxsTmFtZSApO1xuXHRcdFx0XHRpZiAoIGluc3RhbmNlICkge1xuXHRcdFx0XHRcdGluc3RhbmNlLm9wdGlvbiggb3B0aW9ucyB8fCB7fSApO1xuXHRcdFx0XHRcdGlmICggaW5zdGFuY2UuX2luaXQgKSB7XG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5faW5pdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkLmRhdGEoIHRoaXMsIGZ1bGxOYW1lLCBuZXcgb2JqZWN0KCBvcHRpb25zLCB0aGlzICkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldHVyblZhbHVlO1xuXHR9O1xufTtcblxuJC5XaWRnZXQgPSBmdW5jdGlvbiggLyogb3B0aW9ucywgZWxlbWVudCAqLyApIHt9O1xuJC5XaWRnZXQuX2NoaWxkQ29uc3RydWN0b3JzID0gW107XG5cbiQuV2lkZ2V0LnByb3RvdHlwZSA9IHtcblx0d2lkZ2V0TmFtZTogXCJ3aWRnZXRcIixcblx0d2lkZ2V0RXZlbnRQcmVmaXg6IFwiXCIsXG5cdGRlZmF1bHRFbGVtZW50OiBcIjxkaXY+XCIsXG5cdG9wdGlvbnM6IHtcblx0XHRkaXNhYmxlZDogZmFsc2UsXG5cblx0XHQvLyBjYWxsYmFja3Ncblx0XHRjcmVhdGU6IG51bGxcblx0fSxcblx0X2NyZWF0ZVdpZGdldDogZnVuY3Rpb24oIG9wdGlvbnMsIGVsZW1lbnQgKSB7XG5cdFx0ZWxlbWVudCA9ICQoIGVsZW1lbnQgfHwgdGhpcy5kZWZhdWx0RWxlbWVudCB8fCB0aGlzIClbIDAgXTtcblx0XHR0aGlzLmVsZW1lbnQgPSAkKCBlbGVtZW50ICk7XG5cdFx0dGhpcy51dWlkID0gd2lkZ2V0X3V1aWQrKztcblx0XHR0aGlzLmV2ZW50TmFtZXNwYWNlID0gXCIuXCIgKyB0aGlzLndpZGdldE5hbWUgKyB0aGlzLnV1aWQ7XG5cdFx0dGhpcy5vcHRpb25zID0gJC53aWRnZXQuZXh0ZW5kKCB7fSxcblx0XHRcdHRoaXMub3B0aW9ucyxcblx0XHRcdHRoaXMuX2dldENyZWF0ZU9wdGlvbnMoKSxcblx0XHRcdG9wdGlvbnMgKTtcblxuXHRcdHRoaXMuYmluZGluZ3MgPSAkKCk7XG5cdFx0dGhpcy5ob3ZlcmFibGUgPSAkKCk7XG5cdFx0dGhpcy5mb2N1c2FibGUgPSAkKCk7XG5cblx0XHRpZiAoIGVsZW1lbnQgIT09IHRoaXMgKSB7XG5cdFx0XHQkLmRhdGEoIGVsZW1lbnQsIHRoaXMud2lkZ2V0RnVsbE5hbWUsIHRoaXMgKTtcblx0XHRcdHRoaXMuX29uKCB0cnVlLCB0aGlzLmVsZW1lbnQsIHtcblx0XHRcdFx0cmVtb3ZlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdFx0aWYgKCBldmVudC50YXJnZXQgPT09IGVsZW1lbnQgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5kb2N1bWVudCA9ICQoIGVsZW1lbnQuc3R5bGUgP1xuXHRcdFx0XHQvLyBlbGVtZW50IHdpdGhpbiB0aGUgZG9jdW1lbnRcblx0XHRcdFx0ZWxlbWVudC5vd25lckRvY3VtZW50IDpcblx0XHRcdFx0Ly8gZWxlbWVudCBpcyB3aW5kb3cgb3IgZG9jdW1lbnRcblx0XHRcdFx0ZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50ICk7XG5cdFx0XHR0aGlzLndpbmRvdyA9ICQoIHRoaXMuZG9jdW1lbnRbMF0uZGVmYXVsdFZpZXcgfHwgdGhpcy5kb2N1bWVudFswXS5wYXJlbnRXaW5kb3cgKTtcblx0XHR9XG5cblx0XHR0aGlzLl9jcmVhdGUoKTtcblx0XHR0aGlzLl90cmlnZ2VyKCBcImNyZWF0ZVwiLCBudWxsLCB0aGlzLl9nZXRDcmVhdGVFdmVudERhdGEoKSApO1xuXHRcdHRoaXMuX2luaXQoKTtcblx0fSxcblx0X2dldENyZWF0ZU9wdGlvbnM6ICQubm9vcCxcblx0X2dldENyZWF0ZUV2ZW50RGF0YTogJC5ub29wLFxuXHRfY3JlYXRlOiAkLm5vb3AsXG5cdF9pbml0OiAkLm5vb3AsXG5cblx0ZGVzdHJveTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5fZGVzdHJveSgpO1xuXHRcdC8vIHdlIGNhbiBwcm9iYWJseSByZW1vdmUgdGhlIHVuYmluZCBjYWxscyBpbiAyLjBcblx0XHQvLyBhbGwgZXZlbnQgYmluZGluZ3Mgc2hvdWxkIGdvIHRocm91Z2ggdGhpcy5fb24oKVxuXHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0LnVuYmluZCggdGhpcy5ldmVudE5hbWVzcGFjZSApXG5cdFx0XHQucmVtb3ZlRGF0YSggdGhpcy53aWRnZXRGdWxsTmFtZSApXG5cdFx0XHQvLyBzdXBwb3J0OiBqcXVlcnkgPDEuNi4zXG5cdFx0XHQvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC85NDEzXG5cdFx0XHQucmVtb3ZlRGF0YSggJC5jYW1lbENhc2UoIHRoaXMud2lkZ2V0RnVsbE5hbWUgKSApO1xuXHRcdHRoaXMud2lkZ2V0KClcblx0XHRcdC51bmJpbmQoIHRoaXMuZXZlbnROYW1lc3BhY2UgKVxuXHRcdFx0LnJlbW92ZUF0dHIoIFwiYXJpYS1kaXNhYmxlZFwiIClcblx0XHRcdC5yZW1vdmVDbGFzcyhcblx0XHRcdFx0dGhpcy53aWRnZXRGdWxsTmFtZSArIFwiLWRpc2FibGVkIFwiICtcblx0XHRcdFx0XCJ1aS1zdGF0ZS1kaXNhYmxlZFwiICk7XG5cblx0XHQvLyBjbGVhbiB1cCBldmVudHMgYW5kIHN0YXRlc1xuXHRcdHRoaXMuYmluZGluZ3MudW5iaW5kKCB0aGlzLmV2ZW50TmFtZXNwYWNlICk7XG5cdFx0dGhpcy5ob3ZlcmFibGUucmVtb3ZlQ2xhc3MoIFwidWktc3RhdGUtaG92ZXJcIiApO1xuXHRcdHRoaXMuZm9jdXNhYmxlLnJlbW92ZUNsYXNzKCBcInVpLXN0YXRlLWZvY3VzXCIgKTtcblx0fSxcblx0X2Rlc3Ryb3k6ICQubm9vcCxcblxuXHR3aWRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XG5cdH0sXG5cblx0b3B0aW9uOiBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHR2YXIgb3B0aW9ucyA9IGtleSxcblx0XHRcdHBhcnRzLFxuXHRcdFx0Y3VyT3B0aW9uLFxuXHRcdFx0aTtcblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdC8vIGRvbid0IHJldHVybiBhIHJlZmVyZW5jZSB0byB0aGUgaW50ZXJuYWwgaGFzaFxuXHRcdFx0cmV0dXJuICQud2lkZ2V0LmV4dGVuZCgge30sIHRoaXMub3B0aW9ucyApO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdC8vIGhhbmRsZSBuZXN0ZWQga2V5cywgZS5nLiwgXCJmb28uYmFyXCIgPT4geyBmb286IHsgYmFyOiBfX18gfSB9XG5cdFx0XHRvcHRpb25zID0ge307XG5cdFx0XHRwYXJ0cyA9IGtleS5zcGxpdCggXCIuXCIgKTtcblx0XHRcdGtleSA9IHBhcnRzLnNoaWZ0KCk7XG5cdFx0XHRpZiAoIHBhcnRzLmxlbmd0aCApIHtcblx0XHRcdFx0Y3VyT3B0aW9uID0gb3B0aW9uc1sga2V5IF0gPSAkLndpZGdldC5leHRlbmQoIHt9LCB0aGlzLm9wdGlvbnNbIGtleSBdICk7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoIC0gMTsgaSsrICkge1xuXHRcdFx0XHRcdGN1ck9wdGlvblsgcGFydHNbIGkgXSBdID0gY3VyT3B0aW9uWyBwYXJ0c1sgaSBdIF0gfHwge307XG5cdFx0XHRcdFx0Y3VyT3B0aW9uID0gY3VyT3B0aW9uWyBwYXJ0c1sgaSBdIF07XG5cdFx0XHRcdH1cblx0XHRcdFx0a2V5ID0gcGFydHMucG9wKCk7XG5cdFx0XHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdFx0XHRyZXR1cm4gY3VyT3B0aW9uWyBrZXkgXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGN1ck9wdGlvblsga2V5IF07XG5cdFx0XHRcdH1cblx0XHRcdFx0Y3VyT3B0aW9uWyBrZXkgXSA9IHZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnNbIGtleSBdID09PSB1bmRlZmluZWQgPyBudWxsIDogdGhpcy5vcHRpb25zWyBrZXkgXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvcHRpb25zWyBrZXkgXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX3NldE9wdGlvbnMoIG9wdGlvbnMgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXHRfc2V0T3B0aW9uczogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdFx0dmFyIGtleTtcblxuXHRcdGZvciAoIGtleSBpbiBvcHRpb25zICkge1xuXHRcdFx0dGhpcy5fc2V0T3B0aW9uKCBrZXksIG9wdGlvbnNbIGtleSBdICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdF9zZXRPcHRpb246IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHRoaXMub3B0aW9uc1sga2V5IF0gPSB2YWx1ZTtcblxuXHRcdGlmICgga2V5ID09PSBcImRpc2FibGVkXCIgKSB7XG5cdFx0XHR0aGlzLndpZGdldCgpXG5cdFx0XHRcdC50b2dnbGVDbGFzcyggdGhpcy53aWRnZXRGdWxsTmFtZSArIFwiLWRpc2FibGVkXCIsICEhdmFsdWUgKTtcblxuXHRcdFx0Ly8gSWYgdGhlIHdpZGdldCBpcyBiZWNvbWluZyBkaXNhYmxlZCwgdGhlbiBub3RoaW5nIGlzIGludGVyYWN0aXZlXG5cdFx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0XHR0aGlzLmhvdmVyYWJsZS5yZW1vdmVDbGFzcyggXCJ1aS1zdGF0ZS1ob3ZlclwiICk7XG5cdFx0XHRcdHRoaXMuZm9jdXNhYmxlLnJlbW92ZUNsYXNzKCBcInVpLXN0YXRlLWZvY3VzXCIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRlbmFibGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9zZXRPcHRpb25zKHsgZGlzYWJsZWQ6IGZhbHNlIH0pO1xuXHR9LFxuXHRkaXNhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fc2V0T3B0aW9ucyh7IGRpc2FibGVkOiB0cnVlIH0pO1xuXHR9LFxuXG5cdF9vbjogZnVuY3Rpb24oIHN1cHByZXNzRGlzYWJsZWRDaGVjaywgZWxlbWVudCwgaGFuZGxlcnMgKSB7XG5cdFx0dmFyIGRlbGVnYXRlRWxlbWVudCxcblx0XHRcdGluc3RhbmNlID0gdGhpcztcblxuXHRcdC8vIG5vIHN1cHByZXNzRGlzYWJsZWRDaGVjayBmbGFnLCBzaHVmZmxlIGFyZ3VtZW50c1xuXHRcdGlmICggdHlwZW9mIHN1cHByZXNzRGlzYWJsZWRDaGVjayAhPT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRoYW5kbGVycyA9IGVsZW1lbnQ7XG5cdFx0XHRlbGVtZW50ID0gc3VwcHJlc3NEaXNhYmxlZENoZWNrO1xuXHRcdFx0c3VwcHJlc3NEaXNhYmxlZENoZWNrID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gbm8gZWxlbWVudCBhcmd1bWVudCwgc2h1ZmZsZSBhbmQgdXNlIHRoaXMuZWxlbWVudFxuXHRcdGlmICggIWhhbmRsZXJzICkge1xuXHRcdFx0aGFuZGxlcnMgPSBlbGVtZW50O1xuXHRcdFx0ZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcblx0XHRcdGRlbGVnYXRlRWxlbWVudCA9IHRoaXMud2lkZ2V0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW1lbnQgPSBkZWxlZ2F0ZUVsZW1lbnQgPSAkKCBlbGVtZW50ICk7XG5cdFx0XHR0aGlzLmJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5hZGQoIGVsZW1lbnQgKTtcblx0XHR9XG5cblx0XHQkLmVhY2goIGhhbmRsZXJzLCBmdW5jdGlvbiggZXZlbnQsIGhhbmRsZXIgKSB7XG5cdFx0XHRmdW5jdGlvbiBoYW5kbGVyUHJveHkoKSB7XG5cdFx0XHRcdC8vIGFsbG93IHdpZGdldHMgdG8gY3VzdG9taXplIHRoZSBkaXNhYmxlZCBoYW5kbGluZ1xuXHRcdFx0XHQvLyAtIGRpc2FibGVkIGFzIGFuIGFycmF5IGluc3RlYWQgb2YgYm9vbGVhblxuXHRcdFx0XHQvLyAtIGRpc2FibGVkIGNsYXNzIGFzIG1ldGhvZCBmb3IgZGlzYWJsaW5nIGluZGl2aWR1YWwgcGFydHNcblx0XHRcdFx0aWYgKCAhc3VwcHJlc3NEaXNhYmxlZENoZWNrICYmXG5cdFx0XHRcdFx0XHQoIGluc3RhbmNlLm9wdGlvbnMuZGlzYWJsZWQgPT09IHRydWUgfHxcblx0XHRcdFx0XHRcdFx0JCggdGhpcyApLmhhc0NsYXNzKCBcInVpLXN0YXRlLWRpc2FibGVkXCIgKSApICkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gKCB0eXBlb2YgaGFuZGxlciA9PT0gXCJzdHJpbmdcIiA/IGluc3RhbmNlWyBoYW5kbGVyIF0gOiBoYW5kbGVyIClcblx0XHRcdFx0XHQuYXBwbHkoIGluc3RhbmNlLCBhcmd1bWVudHMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY29weSB0aGUgZ3VpZCBzbyBkaXJlY3QgdW5iaW5kaW5nIHdvcmtzXG5cdFx0XHRpZiAoIHR5cGVvZiBoYW5kbGVyICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRoYW5kbGVyUHJveHkuZ3VpZCA9IGhhbmRsZXIuZ3VpZCA9XG5cdFx0XHRcdFx0aGFuZGxlci5ndWlkIHx8IGhhbmRsZXJQcm94eS5ndWlkIHx8ICQuZ3VpZCsrO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbWF0Y2ggPSBldmVudC5tYXRjaCggL14oW1xcdzotXSopXFxzKiguKikkLyApLFxuXHRcdFx0XHRldmVudE5hbWUgPSBtYXRjaFsxXSArIGluc3RhbmNlLmV2ZW50TmFtZXNwYWNlLFxuXHRcdFx0XHRzZWxlY3RvciA9IG1hdGNoWzJdO1xuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0ZGVsZWdhdGVFbGVtZW50LmRlbGVnYXRlKCBzZWxlY3RvciwgZXZlbnROYW1lLCBoYW5kbGVyUHJveHkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuYmluZCggZXZlbnROYW1lLCBoYW5kbGVyUHJveHkgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRfb2ZmOiBmdW5jdGlvbiggZWxlbWVudCwgZXZlbnROYW1lICkge1xuXHRcdGV2ZW50TmFtZSA9IChldmVudE5hbWUgfHwgXCJcIikuc3BsaXQoIFwiIFwiICkuam9pbiggdGhpcy5ldmVudE5hbWVzcGFjZSArIFwiIFwiICkgKyB0aGlzLmV2ZW50TmFtZXNwYWNlO1xuXHRcdGVsZW1lbnQudW5iaW5kKCBldmVudE5hbWUgKS51bmRlbGVnYXRlKCBldmVudE5hbWUgKTtcblx0fSxcblxuXHRfZGVsYXk6IGZ1bmN0aW9uKCBoYW5kbGVyLCBkZWxheSApIHtcblx0XHRmdW5jdGlvbiBoYW5kbGVyUHJveHkoKSB7XG5cdFx0XHRyZXR1cm4gKCB0eXBlb2YgaGFuZGxlciA9PT0gXCJzdHJpbmdcIiA/IGluc3RhbmNlWyBoYW5kbGVyIF0gOiBoYW5kbGVyIClcblx0XHRcdFx0LmFwcGx5KCBpbnN0YW5jZSwgYXJndW1lbnRzICk7XG5cdFx0fVxuXHRcdHZhciBpbnN0YW5jZSA9IHRoaXM7XG5cdFx0cmV0dXJuIHNldFRpbWVvdXQoIGhhbmRsZXJQcm94eSwgZGVsYXkgfHwgMCApO1xuXHR9LFxuXG5cdF9ob3ZlcmFibGU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHRoaXMuaG92ZXJhYmxlID0gdGhpcy5ob3ZlcmFibGUuYWRkKCBlbGVtZW50ICk7XG5cdFx0dGhpcy5fb24oIGVsZW1lbnQsIHtcblx0XHRcdG1vdXNlZW50ZXI6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0JCggZXZlbnQuY3VycmVudFRhcmdldCApLmFkZENsYXNzKCBcInVpLXN0YXRlLWhvdmVyXCIgKTtcblx0XHRcdH0sXG5cdFx0XHRtb3VzZWxlYXZlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdCQoIGV2ZW50LmN1cnJlbnRUYXJnZXQgKS5yZW1vdmVDbGFzcyggXCJ1aS1zdGF0ZS1ob3ZlclwiICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0X2ZvY3VzYWJsZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dGhpcy5mb2N1c2FibGUgPSB0aGlzLmZvY3VzYWJsZS5hZGQoIGVsZW1lbnQgKTtcblx0XHR0aGlzLl9vbiggZWxlbWVudCwge1xuXHRcdFx0Zm9jdXNpbjogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHQkKCBldmVudC5jdXJyZW50VGFyZ2V0ICkuYWRkQ2xhc3MoIFwidWktc3RhdGUtZm9jdXNcIiApO1xuXHRcdFx0fSxcblx0XHRcdGZvY3Vzb3V0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdCQoIGV2ZW50LmN1cnJlbnRUYXJnZXQgKS5yZW1vdmVDbGFzcyggXCJ1aS1zdGF0ZS1mb2N1c1wiICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0X3RyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBldmVudCwgZGF0YSApIHtcblx0XHR2YXIgcHJvcCwgb3JpZyxcblx0XHRcdGNhbGxiYWNrID0gdGhpcy5vcHRpb25zWyB0eXBlIF07XG5cblx0XHRkYXRhID0gZGF0YSB8fCB7fTtcblx0XHRldmVudCA9ICQuRXZlbnQoIGV2ZW50ICk7XG5cdFx0ZXZlbnQudHlwZSA9ICggdHlwZSA9PT0gdGhpcy53aWRnZXRFdmVudFByZWZpeCA/XG5cdFx0XHR0eXBlIDpcblx0XHRcdHRoaXMud2lkZ2V0RXZlbnRQcmVmaXggKyB0eXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHQvLyB0aGUgb3JpZ2luYWwgZXZlbnQgbWF5IGNvbWUgZnJvbSBhbnkgZWxlbWVudFxuXHRcdC8vIHNvIHdlIG5lZWQgdG8gcmVzZXQgdGhlIHRhcmdldCBvbiB0aGUgbmV3IGV2ZW50XG5cdFx0ZXZlbnQudGFyZ2V0ID0gdGhpcy5lbGVtZW50WyAwIF07XG5cblx0XHQvLyBjb3B5IG9yaWdpbmFsIGV2ZW50IHByb3BlcnRpZXMgb3ZlciB0byB0aGUgbmV3IGV2ZW50XG5cdFx0b3JpZyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG5cdFx0aWYgKCBvcmlnICkge1xuXHRcdFx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXHRcdFx0XHRpZiAoICEoIHByb3AgaW4gZXZlbnQgKSApIHtcblx0XHRcdFx0XHRldmVudFsgcHJvcCBdID0gb3JpZ1sgcHJvcCBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5lbGVtZW50LnRyaWdnZXIoIGV2ZW50LCBkYXRhICk7XG5cdFx0cmV0dXJuICEoICQuaXNGdW5jdGlvbiggY2FsbGJhY2sgKSAmJlxuXHRcdFx0Y2FsbGJhY2suYXBwbHkoIHRoaXMuZWxlbWVudFswXSwgWyBldmVudCBdLmNvbmNhdCggZGF0YSApICkgPT09IGZhbHNlIHx8XG5cdFx0XHRldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApO1xuXHR9XG59O1xuXG4kLmVhY2goIHsgc2hvdzogXCJmYWRlSW5cIiwgaGlkZTogXCJmYWRlT3V0XCIgfSwgZnVuY3Rpb24oIG1ldGhvZCwgZGVmYXVsdEVmZmVjdCApIHtcblx0JC5XaWRnZXQucHJvdG90eXBlWyBcIl9cIiArIG1ldGhvZCBdID0gZnVuY3Rpb24oIGVsZW1lbnQsIG9wdGlvbnMsIGNhbGxiYWNrICkge1xuXHRcdGlmICggdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvcHRpb25zID0geyBlZmZlY3Q6IG9wdGlvbnMgfTtcblx0XHR9XG5cdFx0dmFyIGhhc09wdGlvbnMsXG5cdFx0XHRlZmZlY3ROYW1lID0gIW9wdGlvbnMgP1xuXHRcdFx0XHRtZXRob2QgOlxuXHRcdFx0XHRvcHRpb25zID09PSB0cnVlIHx8IHR5cGVvZiBvcHRpb25zID09PSBcIm51bWJlclwiID9cblx0XHRcdFx0XHRkZWZhdWx0RWZmZWN0IDpcblx0XHRcdFx0XHRvcHRpb25zLmVmZmVjdCB8fCBkZWZhdWx0RWZmZWN0O1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdGlmICggdHlwZW9mIG9wdGlvbnMgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRvcHRpb25zID0geyBkdXJhdGlvbjogb3B0aW9ucyB9O1xuXHRcdH1cblx0XHRoYXNPcHRpb25zID0gISQuaXNFbXB0eU9iamVjdCggb3B0aW9ucyApO1xuXHRcdG9wdGlvbnMuY29tcGxldGUgPSBjYWxsYmFjaztcblx0XHRpZiAoIG9wdGlvbnMuZGVsYXkgKSB7XG5cdFx0XHRlbGVtZW50LmRlbGF5KCBvcHRpb25zLmRlbGF5ICk7XG5cdFx0fVxuXHRcdGlmICggaGFzT3B0aW9ucyAmJiAkLmVmZmVjdHMgJiYgJC5lZmZlY3RzLmVmZmVjdFsgZWZmZWN0TmFtZSBdICkge1xuXHRcdFx0ZWxlbWVudFsgbWV0aG9kIF0oIG9wdGlvbnMgKTtcblx0XHR9IGVsc2UgaWYgKCBlZmZlY3ROYW1lICE9PSBtZXRob2QgJiYgZWxlbWVudFsgZWZmZWN0TmFtZSBdICkge1xuXHRcdFx0ZWxlbWVudFsgZWZmZWN0TmFtZSBdKCBvcHRpb25zLmR1cmF0aW9uLCBvcHRpb25zLmVhc2luZywgY2FsbGJhY2sgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbWVudC5xdWV1ZShmdW5jdGlvbiggbmV4dCApIHtcblx0XHRcdFx0JCggdGhpcyApWyBtZXRob2QgXSgpO1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwoIGVsZW1lbnRbIDAgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG5leHQoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn0pO1xuXG52YXIgd2lkZ2V0ID0gJC53aWRnZXQ7XG5cblxuXG59KSk7XG4iLCIvKlxuICogalF1ZXJ5IElmcmFtZSBUcmFuc3BvcnQgUGx1Z2luIDEuOC4zXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9qUXVlcnktRmlsZS1VcGxvYWRcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93LCBkb2N1bWVudCAqL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgQU1EIG1vZHVsZTpcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlM6XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsczpcbiAgICAgICAgZmFjdG9yeSh3aW5kb3cualF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gSGVscGVyIHZhcmlhYmxlIHRvIGNyZWF0ZSB1bmlxdWUgbmFtZXMgZm9yIHRoZSB0cmFuc3BvcnQgaWZyYW1lczpcbiAgICB2YXIgY291bnRlciA9IDA7XG5cbiAgICAvLyBUaGUgaWZyYW1lIHRyYW5zcG9ydCBhY2NlcHRzIGZvdXIgYWRkaXRpb25hbCBvcHRpb25zOlxuICAgIC8vIG9wdGlvbnMuZmlsZUlucHV0OiBhIGpRdWVyeSBjb2xsZWN0aW9uIG9mIGZpbGUgaW5wdXQgZmllbGRzXG4gICAgLy8gb3B0aW9ucy5wYXJhbU5hbWU6IHRoZSBwYXJhbWV0ZXIgbmFtZSBmb3IgdGhlIGZpbGUgZm9ybSBkYXRhLFxuICAgIC8vICBvdmVycmlkZXMgdGhlIG5hbWUgcHJvcGVydHkgb2YgdGhlIGZpbGUgaW5wdXQgZmllbGQocyksXG4gICAgLy8gIGNhbiBiZSBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzLlxuICAgIC8vIG9wdGlvbnMuZm9ybURhdGE6IGFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBuYW1lIGFuZCB2YWx1ZSBwcm9wZXJ0aWVzLFxuICAgIC8vICBlcXVpdmFsZW50IHRvIHRoZSByZXR1cm4gZGF0YSBvZiAuc2VyaWFsaXplQXJyYXkoKSwgZS5nLjpcbiAgICAvLyAgW3tuYW1lOiAnYScsIHZhbHVlOiAxfSwge25hbWU6ICdiJywgdmFsdWU6IDJ9XVxuICAgIC8vIG9wdGlvbnMuaW5pdGlhbElmcmFtZVNyYzogdGhlIFVSTCBvZiB0aGUgaW5pdGlhbCBpZnJhbWUgc3JjLFxuICAgIC8vICBieSBkZWZhdWx0IHNldCB0byBcImphdmFzY3JpcHQ6ZmFsc2U7XCJcbiAgICAkLmFqYXhUcmFuc3BvcnQoJ2lmcmFtZScsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFzeW5jKSB7XG4gICAgICAgICAgICAvLyBqYXZhc2NyaXB0OmZhbHNlIGFzIGluaXRpYWwgaWZyYW1lIHNyY1xuICAgICAgICAgICAgLy8gcHJldmVudHMgd2FybmluZyBwb3B1cHMgb24gSFRUUFMgaW4gSUU2OlxuICAgICAgICAgICAgLypqc2hpbnQgc2NyaXB0dXJsOiB0cnVlICovXG4gICAgICAgICAgICB2YXIgaW5pdGlhbElmcmFtZVNyYyA9IG9wdGlvbnMuaW5pdGlhbElmcmFtZVNyYyB8fCAnamF2YXNjcmlwdDpmYWxzZTsnLFxuICAgICAgICAgICAgLypqc2hpbnQgc2NyaXB0dXJsOiBmYWxzZSAqL1xuICAgICAgICAgICAgICAgIGZvcm0sXG4gICAgICAgICAgICAgICAgaWZyYW1lLFxuICAgICAgICAgICAgICAgIGFkZFBhcmFtQ2hhcjtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2VuZDogZnVuY3Rpb24gKF8sIGNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybSA9ICQoJzxmb3JtIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjwvZm9ybT4nKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hdHRyKCdhY2NlcHQtY2hhcnNldCcsIG9wdGlvbnMuZm9ybUFjY2VwdENoYXJzZXQpO1xuICAgICAgICAgICAgICAgICAgICBhZGRQYXJhbUNoYXIgPSAvXFw/Ly50ZXN0KG9wdGlvbnMudXJsKSA/ICcmJyA6ICc/JztcbiAgICAgICAgICAgICAgICAgICAgLy8gWERvbWFpblJlcXVlc3Qgb25seSBzdXBwb3J0cyBHRVQgYW5kIFBPU1Q6XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cGUgPT09ICdERUxFVEUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsICsgYWRkUGFyYW1DaGFyICsgJ19tZXRob2Q9REVMRVRFJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudHlwZSA9ICdQT1NUJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnR5cGUgPT09ICdQVVQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsICsgYWRkUGFyYW1DaGFyICsgJ19tZXRob2Q9UFVUJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudHlwZSA9ICdQT1NUJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnR5cGUgPT09ICdQQVRDSCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy51cmwgKyBhZGRQYXJhbUNoYXIgKyAnX21ldGhvZD1QQVRDSCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnR5cGUgPSAnUE9TVCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gSUUgdmVyc2lvbnMgYmVsb3cgSUU4IGNhbm5vdCBzZXQgdGhlIG5hbWUgcHJvcGVydHkgb2ZcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudHMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBhZGRlZCB0byB0aGUgRE9NLFxuICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBzZXQgdGhlIG5hbWUgYWxvbmcgd2l0aCB0aGUgaWZyYW1lIEhUTUwgbWFya3VwOlxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZSA9ICQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGlmcmFtZSBzcmM9XCInICsgaW5pdGlhbElmcmFtZVNyYyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIG5hbWU9XCJpZnJhbWUtdHJhbnNwb3J0LScgKyBjb3VudGVyICsgJ1wiPjwvaWZyYW1lPidcbiAgICAgICAgICAgICAgICAgICAgKS5iaW5kKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVJbnB1dENsb25lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWVzID0gJC5pc0FycmF5KG9wdGlvbnMucGFyYW1OYW1lKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBhcmFtTmFtZSA6IFtvcHRpb25zLnBhcmFtTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudW5iaW5kKCdsb2FkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmluZCgnbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXcmFwIGluIGEgdHJ5L2NhdGNoIGJsb2NrIHRvIGNhdGNoIGV4Y2VwdGlvbnMgdGhyb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyBjcm9zcy1kb21haW4gaWZyYW1lIGNvbnRlbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBpZnJhbWUuY29udGVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdvb2dsZSBDaHJvbWUgYW5kIEZpcmVmb3ggZG8gbm90IHRocm93IGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gd2hlbiBjYWxsaW5nIGlmcmFtZS5jb250ZW50cygpIG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNvIHdlIHVuaWZ5IHRoZSByZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UubGVuZ3RoIHx8ICFyZXNwb25zZVswXS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjb21wbGV0ZSBjYWxsYmFjayByZXR1cm5zIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZnJhbWUgY29udGVudCBkb2N1bWVudCBhcyByZXNwb25zZSBvYmplY3Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7J2lmcmFtZSc6IHJlc3BvbnNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXggZm9yIElFIGVuZGxlc3MgcHJvZ3Jlc3MgYmFyIGFjdGl2aXR5IGJ1Z1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAoaGFwcGVucyBvbiBmb3JtIHN1Ym1pdHMgdG8gaWZyYW1lIHRhcmdldHMpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCc8aWZyYW1lIHNyYz1cIicgKyBpbml0aWFsSWZyYW1lU3JjICsgJ1wiPjwvaWZyYW1lPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92aW5nIHRoZSBmb3JtIGluIGEgc2V0VGltZW91dCBjYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGxvd3MgQ2hyb21lJ3MgZGV2ZWxvcGVyIHRvb2xzIHRvIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSByZXNwb25zZSByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCd0YXJnZXQnLCBpZnJhbWUucHJvcCgnbmFtZScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdhY3Rpb24nLCBvcHRpb25zLnVybClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnbWV0aG9kJywgb3B0aW9ucy50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmZvcm1EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuZm9ybURhdGEsIGZ1bmN0aW9uIChpbmRleCwgZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIi8+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCduYW1lJywgZmllbGQubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwoZmllbGQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5maWxlSW5wdXQgJiYgb3B0aW9ucy5maWxlSW5wdXQubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudHlwZSA9PT0gJ1BPU1QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucHV0Q2xvbmVzID0gb3B0aW9ucy5maWxlSW5wdXQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnNlcnQgYSBjbG9uZSBmb3IgZWFjaCBmaWxlIGlucHV0IGZpZWxkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZUlucHV0LmFmdGVyKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZUlucHV0Q2xvbmVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5wYXJhbU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlSW5wdXQuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucHJvcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lc1tpbmRleF0gfHwgb3B0aW9ucy5wYXJhbU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmRpbmcgdGhlIGZpbGUgaW5wdXQgZmllbGRzIHRvIHRoZSBoaWRkZW4gZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZXMgdGhlbSBmcm9tIHRoZWlyIG9yaWdpbmFsIGxvY2F0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChvcHRpb25zLmZpbGVJbnB1dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2VuY3R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuY3R5cGUgbXVzdCBiZSBzZXQgYXMgZW5jb2RpbmcgZm9yIElFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZW5jb2RpbmcnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgSFRNTDUgZm9ybSBhdHRyaWJ1dGUgZnJvbSB0aGUgaW5wdXQocyk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlSW5wdXQucmVtb3ZlQXR0cignZm9ybScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluc2VydCB0aGUgZmlsZSBpbnB1dCBmaWVsZHMgYXQgdGhlaXIgb3JpZ2luYWwgbG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ5IHJlcGxhY2luZyB0aGUgY2xvbmVzIHdpdGggdGhlIG9yaWdpbmFsczpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlSW5wdXRDbG9uZXMgJiYgZmlsZUlucHV0Q2xvbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZUlucHV0LmVhY2goZnVuY3Rpb24gKGluZGV4LCBpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSAkKGZpbGVJbnB1dENsb25lc1tpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBuYW1lIGFuZCBmb3JtIHByb3BlcnRpZXM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoaW5wdXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnbmFtZScsIGNsb25lLnByb3AoJ25hbWUnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdmb3JtJywgY2xvbmUuYXR0cignZm9ybScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUucmVwbGFjZVdpdGgoaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoaWZyYW1lKS5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGphdmFzY3JpcHQ6ZmFsc2UgYXMgaWZyYW1lIHNyYyBhYm9ydHMgdGhlIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBwcmV2ZW50cyB3YXJuaW5nIHBvcHVwcyBvbiBIVFRQUyBpbiBJRTYuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25jYXQgaXMgdXNlZCB0byBhdm9pZCB0aGUgXCJTY3JpcHQgVVJMXCIgSlNMaW50IGVycm9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVuYmluZCgnbG9hZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsIGluaXRpYWxJZnJhbWVTcmMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVGhlIGlmcmFtZSB0cmFuc3BvcnQgcmV0dXJucyB0aGUgaWZyYW1lIGNvbnRlbnQgZG9jdW1lbnQgYXMgcmVzcG9uc2UuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBhZGRzIGNvbnZlcnRlcnMgZnJvbSBpZnJhbWUgdG8gdGV4dCwganNvbiwgaHRtbCwgeG1sXG4gICAgLy8gYW5kIHNjcmlwdC5cbiAgICAvLyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBDb250ZW50LVR5cGUgZm9yIEpTT04gcmVzcG9uc2VzIGhhcyB0byBiZSB0ZXh0L3BsYWluXG4gICAgLy8gb3IgdGV4dC9odG1sLCBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IGluY2x1ZGUgYXBwbGljYXRpb24vanNvbiBpbiB0aGVcbiAgICAvLyBBY2NlcHQgaGVhZGVyLCBlbHNlIElFIHdpbGwgc2hvdyBhIGRvd25sb2FkIGRpYWxvZy5cbiAgICAvLyBUaGUgQ29udGVudC1UeXBlIGZvciBYTUwgcmVzcG9uc2VzIG9uIHRoZSBvdGhlciBoYW5kIGhhcyB0byBiZSBhbHdheXNcbiAgICAvLyBhcHBsaWNhdGlvbi94bWwgb3IgdGV4dC94bWwsIHNvIElFIHByb3Blcmx5IHBhcnNlcyB0aGUgWE1MIHJlc3BvbnNlLlxuICAgIC8vIFNlZSBhbHNvXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvalF1ZXJ5LUZpbGUtVXBsb2FkL3dpa2kvU2V0dXAjY29udGVudC10eXBlLW5lZ290aWF0aW9uXG4gICAgJC5hamF4U2V0dXAoe1xuICAgICAgICBjb252ZXJ0ZXJzOiB7XG4gICAgICAgICAgICAnaWZyYW1lIHRleHQnOiBmdW5jdGlvbiAoaWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlmcmFtZSAmJiAkKGlmcmFtZVswXS5ib2R5KS50ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2lmcmFtZSBqc29uJzogZnVuY3Rpb24gKGlmcmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZnJhbWUgJiYgJC5wYXJzZUpTT04oJChpZnJhbWVbMF0uYm9keSkudGV4dCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnaWZyYW1lIGh0bWwnOiBmdW5jdGlvbiAoaWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlmcmFtZSAmJiAkKGlmcmFtZVswXS5ib2R5KS5odG1sKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2lmcmFtZSB4bWwnOiBmdW5jdGlvbiAoaWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHhtbERvYyA9IGlmcmFtZSAmJiBpZnJhbWVbMF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHhtbERvYyAmJiAkLmlzWE1MRG9jKHhtbERvYykgPyB4bWxEb2MgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJC5wYXJzZVhNTCgoeG1sRG9jLlhNTERvY3VtZW50ICYmIHhtbERvYy5YTUxEb2N1bWVudC54bWwpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh4bWxEb2MuYm9keSkuaHRtbCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnaWZyYW1lIHNjcmlwdCc6IGZ1bmN0aW9uIChpZnJhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWZyYW1lICYmICQuZ2xvYmFsRXZhbCgkKGlmcmFtZVswXS5ib2R5KS50ZXh0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKTtcbiIsIi8qXG4gKiBqUXVlcnkgRmlsZSBVcGxvYWQgUGx1Z2luIDUuNDIuM1xuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvalF1ZXJ5LUZpbGUtVXBsb2FkXG4gKlxuICogQ29weXJpZ2h0IDIwMTAsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbi8qIGpzaGludCBub21lbjpmYWxzZSAqL1xuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93LCBkb2N1bWVudCwgbG9jYXRpb24sIEJsb2IsIEZvcm1EYXRhICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBBTUQgbW9kdWxlOlxuICAgICAgICBkZWZpbmUoW1xuICAgICAgICAgICAgJ2pxdWVyeScsXG4gICAgICAgICAgICAnanF1ZXJ5LnVpLndpZGdldCdcbiAgICAgICAgXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KUzpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHJlcXVpcmUoJ2pxdWVyeScpLFxuICAgICAgICAgICAgcmVxdWlyZSgnLi92ZW5kb3IvanF1ZXJ5LnVpLndpZGdldCcpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzOlxuICAgICAgICBmYWN0b3J5KHdpbmRvdy5qUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBEZXRlY3QgZmlsZSBpbnB1dCBzdXBwb3J0LCBiYXNlZCBvblxuICAgIC8vIGh0dHA6Ly92aWxqYW1pcy5jb20vYmxvZy8yMDEyL2ZpbGUtdXBsb2FkLXN1cHBvcnQtb24tbW9iaWxlL1xuICAgICQuc3VwcG9ydC5maWxlSW5wdXQgPSAhKG5ldyBSZWdFeHAoXG4gICAgICAgIC8vIEhhbmRsZSBkZXZpY2VzIHdoaWNoIGdpdmUgZmFsc2UgcG9zaXRpdmVzIGZvciB0aGUgZmVhdHVyZSBkZXRlY3Rpb246XG4gICAgICAgICcoQW5kcm9pZCAoMVxcXFwuWzAxNTZdfDJcXFxcLlswMV0pKScgK1xuICAgICAgICAgICAgJ3woV2luZG93cyBQaG9uZSAoT1MgN3w4XFxcXC4wKSl8KFhCTFdQKXwoWnVuZVdQKXwoV1BEZXNrdG9wKScgK1xuICAgICAgICAgICAgJ3wodyhlYik/T1NCcm93c2VyKXwod2ViT1MpJyArXG4gICAgICAgICAgICAnfChLaW5kbGUvKDFcXFxcLjB8MlxcXFwuWzA1XXwzXFxcXC4wKSknXG4gICAgKS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSB8fFxuICAgICAgICAvLyBGZWF0dXJlIGRldGVjdGlvbiBmb3IgYWxsIG90aGVyIGRldmljZXM6XG4gICAgICAgICQoJzxpbnB1dCB0eXBlPVwiZmlsZVwiPicpLnByb3AoJ2Rpc2FibGVkJykpO1xuXG4gICAgLy8gVGhlIEZpbGVSZWFkZXIgQVBJIGlzIG5vdCBhY3R1YWxseSB1c2VkLCBidXQgd29ya3MgYXMgZmVhdHVyZSBkZXRlY3Rpb24sXG4gICAgLy8gYXMgc29tZSBTYWZhcmkgdmVyc2lvbnMgKDU/KSBzdXBwb3J0IFhIUiBmaWxlIHVwbG9hZHMgdmlhIHRoZSBGb3JtRGF0YSBBUEksXG4gICAgLy8gYnV0IG5vdCBub24tbXVsdGlwYXJ0IFhIUiBmaWxlIHVwbG9hZHMuXG4gICAgLy8gd2luZG93LlhNTEh0dHBSZXF1ZXN0VXBsb2FkIGlzIG5vdCBhdmFpbGFibGUgb24gSUUxMCwgc28gd2UgY2hlY2sgZm9yXG4gICAgLy8gd2luZG93LlByb2dyZXNzRXZlbnQgaW5zdGVhZCB0byBkZXRlY3QgWEhSMiBmaWxlIHVwbG9hZCBjYXBhYmlsaXR5OlxuICAgICQuc3VwcG9ydC54aHJGaWxlVXBsb2FkID0gISEod2luZG93LlByb2dyZXNzRXZlbnQgJiYgd2luZG93LkZpbGVSZWFkZXIpO1xuICAgICQuc3VwcG9ydC54aHJGb3JtRGF0YUZpbGVVcGxvYWQgPSAhIXdpbmRvdy5Gb3JtRGF0YTtcblxuICAgIC8vIERldGVjdCBzdXBwb3J0IGZvciBCbG9iIHNsaWNpbmcgKHJlcXVpcmVkIGZvciBjaHVua2VkIHVwbG9hZHMpOlxuICAgICQuc3VwcG9ydC5ibG9iU2xpY2UgPSB3aW5kb3cuQmxvYiAmJiAoQmxvYi5wcm90b3R5cGUuc2xpY2UgfHxcbiAgICAgICAgQmxvYi5wcm90b3R5cGUud2Via2l0U2xpY2UgfHwgQmxvYi5wcm90b3R5cGUubW96U2xpY2UpO1xuXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNyZWF0ZSBkcmFnIGhhbmRsZXJzIGZvciBkcmFnb3Zlci9kcmFnZW50ZXIvZHJhZ2xlYXZlOlxuICAgIGZ1bmN0aW9uIGdldERyYWdIYW5kbGVyKHR5cGUpIHtcbiAgICAgICAgdmFyIGlzRHJhZ092ZXIgPSB0eXBlID09PSAnZHJhZ292ZXInO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyID0gZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICAgICAgICB2YXIgZGF0YVRyYW5zZmVyID0gZS5kYXRhVHJhbnNmZXI7XG4gICAgICAgICAgICBpZiAoZGF0YVRyYW5zZmVyICYmICQuaW5BcnJheSgnRmlsZXMnLCBkYXRhVHJhbnNmZXIudHlwZXMpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICQuRXZlbnQodHlwZSwge2RlbGVnYXRlZEV2ZW50OiBlfSlcbiAgICAgICAgICAgICAgICAgICAgKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRHJhZ092ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIFRoZSBmaWxldXBsb2FkIHdpZGdldCBsaXN0ZW5zIGZvciBjaGFuZ2UgZXZlbnRzIG9uIGZpbGUgaW5wdXQgZmllbGRzIGRlZmluZWRcbiAgICAvLyB2aWEgZmlsZUlucHV0IHNldHRpbmcgYW5kIHBhc3RlIG9yIGRyb3AgZXZlbnRzIG9mIHRoZSBnaXZlbiBkcm9wWm9uZS5cbiAgICAvLyBJbiBhZGRpdGlvbiB0byB0aGUgZGVmYXVsdCBqUXVlcnkgV2lkZ2V0IG1ldGhvZHMsIHRoZSBmaWxldXBsb2FkIHdpZGdldFxuICAgIC8vIGV4cG9zZXMgdGhlIFwiYWRkXCIgYW5kIFwic2VuZFwiIG1ldGhvZHMsIHRvIGFkZCBvciBkaXJlY3RseSBzZW5kIGZpbGVzIHVzaW5nXG4gICAgLy8gdGhlIGZpbGV1cGxvYWQgQVBJLlxuICAgIC8vIEJ5IGRlZmF1bHQsIGZpbGVzIGFkZGVkIHZpYSBmaWxlIGlucHV0IHNlbGVjdGlvbiwgcGFzdGUsIGRyYWcgJiBkcm9wIG9yXG4gICAgLy8gXCJhZGRcIiBtZXRob2QgYXJlIHVwbG9hZGVkIGltbWVkaWF0ZWx5LCBidXQgaXQgaXMgcG9zc2libGUgdG8gb3ZlcnJpZGVcbiAgICAvLyB0aGUgXCJhZGRcIiBjYWxsYmFjayBvcHRpb24gdG8gcXVldWUgZmlsZSB1cGxvYWRzLlxuICAgICQud2lkZ2V0KCdibHVlaW1wLmZpbGV1cGxvYWQnLCB7XG5cbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgLy8gVGhlIGRyb3AgdGFyZ2V0IGVsZW1lbnQocyksIGJ5IHRoZSBkZWZhdWx0IHRoZSBjb21wbGV0ZSBkb2N1bWVudC5cbiAgICAgICAgICAgIC8vIFNldCB0byBudWxsIHRvIGRpc2FibGUgZHJhZyAmIGRyb3Agc3VwcG9ydDpcbiAgICAgICAgICAgIGRyb3Bab25lOiAkKGRvY3VtZW50KSxcbiAgICAgICAgICAgIC8vIFRoZSBwYXN0ZSB0YXJnZXQgZWxlbWVudChzKSwgYnkgdGhlIGRlZmF1bHQgdW5kZWZpbmVkLlxuICAgICAgICAgICAgLy8gU2V0IHRvIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IG9iamVjdCB0byBlbmFibGUgZmlsZSBwYXN0aW5nOlxuICAgICAgICAgICAgcGFzdGVab25lOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBUaGUgZmlsZSBpbnB1dCBmaWVsZChzKSwgdGhhdCBhcmUgbGlzdGVuZWQgdG8gZm9yIGNoYW5nZSBldmVudHMuXG4gICAgICAgICAgICAvLyBJZiB1bmRlZmluZWQsIGl0IGlzIHNldCB0byB0aGUgZmlsZSBpbnB1dCBmaWVsZHMgaW5zaWRlXG4gICAgICAgICAgICAvLyBvZiB0aGUgd2lkZ2V0IGVsZW1lbnQgb24gcGx1Z2luIGluaXRpYWxpemF0aW9uLlxuICAgICAgICAgICAgLy8gU2V0IHRvIG51bGwgdG8gZGlzYWJsZSB0aGUgY2hhbmdlIGxpc3RlbmVyLlxuICAgICAgICAgICAgZmlsZUlucHV0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCB0aGUgZmlsZSBpbnB1dCBmaWVsZCBpcyByZXBsYWNlZCB3aXRoIGEgY2xvbmUgYWZ0ZXJcbiAgICAgICAgICAgIC8vIGVhY2ggaW5wdXQgZmllbGQgY2hhbmdlIGV2ZW50LiBUaGlzIGlzIHJlcXVpcmVkIGZvciBpZnJhbWUgdHJhbnNwb3J0XG4gICAgICAgICAgICAvLyBxdWV1ZXMgYW5kIGFsbG93cyBjaGFuZ2UgZXZlbnRzIHRvIGJlIGZpcmVkIGZvciB0aGUgc2FtZSBmaWxlXG4gICAgICAgICAgICAvLyBzZWxlY3Rpb24sIGJ1dCBjYW4gYmUgZGlzYWJsZWQgYnkgc2V0dGluZyB0aGUgZm9sbG93aW5nIG9wdGlvbiB0byBmYWxzZTpcbiAgICAgICAgICAgIHJlcGxhY2VGaWxlSW5wdXQ6IHRydWUsXG4gICAgICAgICAgICAvLyBUaGUgcGFyYW1ldGVyIG5hbWUgZm9yIHRoZSBmaWxlIGZvcm0gZGF0YSAodGhlIHJlcXVlc3QgYXJndW1lbnQgbmFtZSkuXG4gICAgICAgICAgICAvLyBJZiB1bmRlZmluZWQgb3IgZW1wdHksIHRoZSBuYW1lIHByb3BlcnR5IG9mIHRoZSBmaWxlIGlucHV0IGZpZWxkIGlzXG4gICAgICAgICAgICAvLyB1c2VkLCBvciBcImZpbGVzW11cIiBpZiB0aGUgZmlsZSBpbnB1dCBuYW1lIHByb3BlcnR5IGlzIGFsc28gZW1wdHksXG4gICAgICAgICAgICAvLyBjYW4gYmUgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nczpcbiAgICAgICAgICAgIHBhcmFtTmFtZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgZWFjaCBmaWxlIG9mIGEgc2VsZWN0aW9uIGlzIHVwbG9hZGVkIHVzaW5nIGFuIGluZGl2aWR1YWxcbiAgICAgICAgICAgIC8vIHJlcXVlc3QgZm9yIFhIUiB0eXBlIHVwbG9hZHMuIFNldCB0byBmYWxzZSB0byB1cGxvYWQgZmlsZVxuICAgICAgICAgICAgLy8gc2VsZWN0aW9ucyBpbiBvbmUgcmVxdWVzdCBlYWNoOlxuICAgICAgICAgICAgc2luZ2xlRmlsZVVwbG9hZHM6IHRydWUsXG4gICAgICAgICAgICAvLyBUbyBsaW1pdCB0aGUgbnVtYmVyIG9mIGZpbGVzIHVwbG9hZGVkIHdpdGggb25lIFhIUiByZXF1ZXN0LFxuICAgICAgICAgICAgLy8gc2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIDA6XG4gICAgICAgICAgICBsaW1pdE11bHRpRmlsZVVwbG9hZHM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgb3B0aW9uIGxpbWl0cyB0aGUgbnVtYmVyIG9mIGZpbGVzIHVwbG9hZGVkIHdpdGggb25lXG4gICAgICAgICAgICAvLyBYSFIgcmVxdWVzdCB0byBrZWVwIHRoZSByZXF1ZXN0IHNpemUgdW5kZXIgb3IgZXF1YWwgdG8gdGhlIGRlZmluZWRcbiAgICAgICAgICAgIC8vIGxpbWl0IGluIGJ5dGVzOlxuICAgICAgICAgICAgbGltaXRNdWx0aUZpbGVVcGxvYWRTaXplOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBNdWx0aXBhcnQgZmlsZSB1cGxvYWRzIGFkZCBhIG51bWJlciBvZiBieXRlcyB0byBlYWNoIHVwbG9hZGVkIGZpbGUsXG4gICAgICAgICAgICAvLyB0aGVyZWZvcmUgdGhlIGZvbGxvd2luZyBvcHRpb24gYWRkcyBhbiBvdmVyaGVhZCBmb3IgZWFjaCBmaWxlIHVzZWRcbiAgICAgICAgICAgIC8vIGluIHRoZSBsaW1pdE11bHRpRmlsZVVwbG9hZFNpemUgY29uZmlndXJhdGlvbjpcbiAgICAgICAgICAgIGxpbWl0TXVsdGlGaWxlVXBsb2FkU2l6ZU92ZXJoZWFkOiA1MTIsXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZvbGxvd2luZyBvcHRpb24gdG8gdHJ1ZSB0byBpc3N1ZSBhbGwgZmlsZSB1cGxvYWQgcmVxdWVzdHNcbiAgICAgICAgICAgIC8vIGluIGEgc2VxdWVudGlhbCBvcmRlcjpcbiAgICAgICAgICAgIHNlcXVlbnRpYWxVcGxvYWRzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFRvIGxpbWl0IHRoZSBudW1iZXIgb2YgY29uY3VycmVudCB1cGxvYWRzLFxuICAgICAgICAgICAgLy8gc2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIDA6XG4gICAgICAgICAgICBsaW1pdENvbmN1cnJlbnRVcGxvYWRzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZvbGxvd2luZyBvcHRpb24gdG8gdHJ1ZSB0byBmb3JjZSBpZnJhbWUgdHJhbnNwb3J0IHVwbG9hZHM6XG4gICAgICAgICAgICBmb3JjZUlmcmFtZVRyYW5zcG9ydDogZmFsc2UsXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZvbGxvd2luZyBvcHRpb24gdG8gdGhlIGxvY2F0aW9uIG9mIGEgcmVkaXJlY3QgdXJsIG9uIHRoZVxuICAgICAgICAgICAgLy8gb3JpZ2luIHNlcnZlciwgZm9yIGNyb3NzLWRvbWFpbiBpZnJhbWUgdHJhbnNwb3J0IHVwbG9hZHM6XG4gICAgICAgICAgICByZWRpcmVjdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gVGhlIHBhcmFtZXRlciBuYW1lIGZvciB0aGUgcmVkaXJlY3QgdXJsLCBzZW50IGFzIHBhcnQgb2YgdGhlIGZvcm1cbiAgICAgICAgICAgIC8vIGRhdGEgYW5kIHNldCB0byAncmVkaXJlY3QnIGlmIHRoaXMgb3B0aW9uIGlzIGVtcHR5OlxuICAgICAgICAgICAgcmVkaXJlY3RQYXJhbU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIFNldCB0aGUgZm9sbG93aW5nIG9wdGlvbiB0byB0aGUgbG9jYXRpb24gb2YgYSBwb3N0TWVzc2FnZSB3aW5kb3csXG4gICAgICAgICAgICAvLyB0byBlbmFibGUgcG9zdE1lc3NhZ2UgdHJhbnNwb3J0IHVwbG9hZHM6XG4gICAgICAgICAgICBwb3N0TWVzc2FnZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgWEhSIGZpbGUgdXBsb2FkcyBhcmUgc2VudCBhcyBtdWx0aXBhcnQvZm9ybS1kYXRhLlxuICAgICAgICAgICAgLy8gVGhlIGlmcmFtZSB0cmFuc3BvcnQgaXMgYWx3YXlzIHVzaW5nIG11bHRpcGFydC9mb3JtLWRhdGEuXG4gICAgICAgICAgICAvLyBTZXQgdG8gZmFsc2UgdG8gZW5hYmxlIG5vbi1tdWx0aXBhcnQgWEhSIHVwbG9hZHM6XG4gICAgICAgICAgICBtdWx0aXBhcnQ6IHRydWUsXG4gICAgICAgICAgICAvLyBUbyB1cGxvYWQgbGFyZ2UgZmlsZXMgaW4gc21hbGxlciBjaHVua3MsIHNldCB0aGUgZm9sbG93aW5nIG9wdGlvblxuICAgICAgICAgICAgLy8gdG8gYSBwcmVmZXJyZWQgbWF4aW11bSBjaHVuayBzaXplLiBJZiBzZXQgdG8gMCwgbnVsbCBvciB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBvciB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSByZXF1aXJlZCBCbG9iIEFQSSwgZmlsZXMgd2lsbFxuICAgICAgICAgICAgLy8gYmUgdXBsb2FkZWQgYXMgYSB3aG9sZS5cbiAgICAgICAgICAgIG1heENodW5rU2l6ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gV2hlbiBhIG5vbi1tdWx0aXBhcnQgdXBsb2FkIG9yIGEgY2h1bmtlZCBtdWx0aXBhcnQgdXBsb2FkIGhhcyBiZWVuXG4gICAgICAgICAgICAvLyBhYm9ydGVkLCB0aGlzIG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZXN1bWUgdGhlIHVwbG9hZCBieSBzZXR0aW5nXG4gICAgICAgICAgICAvLyBpdCB0byB0aGUgc2l6ZSBvZiB0aGUgYWxyZWFkeSB1cGxvYWRlZCBieXRlcy4gVGhpcyBvcHRpb24gaXMgbW9zdFxuICAgICAgICAgICAgLy8gdXNlZnVsIHdoZW4gbW9kaWZ5aW5nIHRoZSBvcHRpb25zIG9iamVjdCBpbnNpZGUgb2YgdGhlIFwiYWRkXCIgb3JcbiAgICAgICAgICAgIC8vIFwic2VuZFwiIGNhbGxiYWNrcywgYXMgdGhlIG9wdGlvbnMgYXJlIGNsb25lZCBmb3IgZWFjaCBmaWxlIHVwbG9hZC5cbiAgICAgICAgICAgIHVwbG9hZGVkQnl0ZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIGZhaWxlZCAoYWJvcnQgb3IgZXJyb3IpIGZpbGUgdXBsb2FkcyBhcmUgcmVtb3ZlZCBmcm9tIHRoZVxuICAgICAgICAgICAgLy8gZ2xvYmFsIHByb2dyZXNzIGNhbGN1bGF0aW9uLiBTZXQgdGhlIGZvbGxvd2luZyBvcHRpb24gdG8gZmFsc2UgdG9cbiAgICAgICAgICAgIC8vIHByZXZlbnQgcmVjYWxjdWxhdGluZyB0aGUgZ2xvYmFsIHByb2dyZXNzIGRhdGE6XG4gICAgICAgICAgICByZWNhbGN1bGF0ZVByb2dyZXNzOiB0cnVlLFxuICAgICAgICAgICAgLy8gSW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzIHRvIGNhbGN1bGF0ZSBhbmQgdHJpZ2dlciBwcm9ncmVzcyBldmVudHM6XG4gICAgICAgICAgICBwcm9ncmVzc0ludGVydmFsOiAxMDAsXG4gICAgICAgICAgICAvLyBJbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMgdG8gY2FsY3VsYXRlIHByb2dyZXNzIGJpdHJhdGU6XG4gICAgICAgICAgICBiaXRyYXRlSW50ZXJ2YWw6IDUwMCxcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIHVwbG9hZHMgYXJlIHN0YXJ0ZWQgYXV0b21hdGljYWxseSB3aGVuIGFkZGluZyBmaWxlczpcbiAgICAgICAgICAgIGF1dG9VcGxvYWQ6IHRydWUsXG5cbiAgICAgICAgICAgIC8vIEVycm9yIGFuZCBpbmZvIG1lc3NhZ2VzOlxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICB1cGxvYWRlZEJ5dGVzOiAnVXBsb2FkZWQgYnl0ZXMgZXhjZWVkIGZpbGUgc2l6ZSdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIFRyYW5zbGF0aW9uIGZ1bmN0aW9uLCBnZXRzIHRoZSBtZXNzYWdlIGtleSB0byBiZSB0cmFuc2xhdGVkXG4gICAgICAgICAgICAvLyBhbmQgYW4gb2JqZWN0IHdpdGggY29udGV4dCBzcGVjaWZpYyBkYXRhIGFzIGFyZ3VtZW50czpcbiAgICAgICAgICAgIGkxOG46IGZ1bmN0aW9uIChtZXNzYWdlLCBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMubWVzc2FnZXNbbWVzc2FnZV0gfHwgbWVzc2FnZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChjb250ZXh0LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSgneycgKyBrZXkgKyAnfScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gQWRkaXRpb25hbCBmb3JtIGRhdGEgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBmaWxlIHVwbG9hZHMgY2FuIGJlIHNldFxuICAgICAgICAgICAgLy8gdXNpbmcgdGhpcyBvcHRpb24sIHdoaWNoIGFjY2VwdHMgYW4gYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIG5hbWUgYW5kXG4gICAgICAgICAgICAvLyB2YWx1ZSBwcm9wZXJ0aWVzLCBhIGZ1bmN0aW9uIHJldHVybmluZyBzdWNoIGFuIGFycmF5LCBhIEZvcm1EYXRhXG4gICAgICAgICAgICAvLyBvYmplY3QgKGZvciBYSFIgZmlsZSB1cGxvYWRzKSwgb3IgYSBzaW1wbGUgb2JqZWN0LlxuICAgICAgICAgICAgLy8gVGhlIGZvcm0gb2YgdGhlIGZpcnN0IGZpbGVJbnB1dCBpcyBnaXZlbiBhcyBwYXJhbWV0ZXIgdG8gdGhlIGZ1bmN0aW9uOlxuICAgICAgICAgICAgZm9ybURhdGE6IGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uc2VyaWFsaXplQXJyYXkoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIFRoZSBhZGQgY2FsbGJhY2sgaXMgaW52b2tlZCBhcyBzb29uIGFzIGZpbGVzIGFyZSBhZGRlZCB0byB0aGUgZmlsZXVwbG9hZFxuICAgICAgICAgICAgLy8gd2lkZ2V0ICh2aWEgZmlsZSBpbnB1dCBzZWxlY3Rpb24sIGRyYWcgJiBkcm9wLCBwYXN0ZSBvciBhZGQgQVBJIGNhbGwpLlxuICAgICAgICAgICAgLy8gSWYgdGhlIHNpbmdsZUZpbGVVcGxvYWRzIG9wdGlvbiBpcyBlbmFibGVkLCB0aGlzIGNhbGxiYWNrIHdpbGwgYmVcbiAgICAgICAgICAgIC8vIGNhbGxlZCBvbmNlIGZvciBlYWNoIGZpbGUgaW4gdGhlIHNlbGVjdGlvbiBmb3IgWEhSIGZpbGUgdXBsb2FkcywgZWxzZVxuICAgICAgICAgICAgLy8gb25jZSBmb3IgZWFjaCBmaWxlIHNlbGVjdGlvbi5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBUaGUgdXBsb2FkIHN0YXJ0cyB3aGVuIHRoZSBzdWJtaXQgbWV0aG9kIGlzIGludm9rZWQgb24gdGhlIGRhdGEgcGFyYW1ldGVyLlxuICAgICAgICAgICAgLy8gVGhlIGRhdGEgb2JqZWN0IGNvbnRhaW5zIGEgZmlsZXMgcHJvcGVydHkgaG9sZGluZyB0aGUgYWRkZWQgZmlsZXNcbiAgICAgICAgICAgIC8vIGFuZCBhbGxvd3MgeW91IHRvIG92ZXJyaWRlIHBsdWdpbiBvcHRpb25zIGFzIHdlbGwgYXMgZGVmaW5lIGFqYXggc2V0dGluZ3MuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gTGlzdGVuZXJzIGZvciB0aGlzIGNhbGxiYWNrIGNhbiBhbHNvIGJlIGJvdW5kIHRoZSBmb2xsb3dpbmcgd2F5OlxuICAgICAgICAgICAgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRhZGQnLCBmdW5jKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBkYXRhLnN1Ym1pdCgpIHJldHVybnMgYSBQcm9taXNlIG9iamVjdCBhbmQgYWxsb3dzIHRvIGF0dGFjaCBhZGRpdGlvbmFsXG4gICAgICAgICAgICAvLyBoYW5kbGVycyB1c2luZyBqUXVlcnkncyBEZWZlcnJlZCBjYWxsYmFja3M6XG4gICAgICAgICAgICAvLyBkYXRhLnN1Ym1pdCgpLmRvbmUoZnVuYykuZmFpbChmdW5jKS5hbHdheXMoZnVuYyk7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5hdXRvVXBsb2FkIHx8IChkYXRhLmF1dG9VcGxvYWQgIT09IGZhbHNlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbGV1cGxvYWQoJ29wdGlvbicsICdhdXRvVXBsb2FkJykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHJvY2VzcygpLmRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gT3RoZXIgY2FsbGJhY2tzOlxuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdGhlIHN1Ym1pdCBldmVudCBvZiBlYWNoIGZpbGUgdXBsb2FkOlxuICAgICAgICAgICAgLy8gc3VibWl0OiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2Fkc3VibWl0JywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciB0aGUgc3RhcnQgb2YgZWFjaCBmaWxlIHVwbG9hZCByZXF1ZXN0OlxuICAgICAgICAgICAgLy8gc2VuZDogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZHNlbmQnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHN1Y2Nlc3NmdWwgdXBsb2FkczpcbiAgICAgICAgICAgIC8vIGRvbmU6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRkb25lJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBmYWlsZWQgKGFib3J0IG9yIGVycm9yKSB1cGxvYWRzOlxuICAgICAgICAgICAgLy8gZmFpbDogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZGZhaWwnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIGNvbXBsZXRlZCAoc3VjY2VzcywgYWJvcnQgb3IgZXJyb3IpIHJlcXVlc3RzOlxuICAgICAgICAgICAgLy8gYWx3YXlzOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkYWx3YXlzJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciB1cGxvYWQgcHJvZ3Jlc3MgZXZlbnRzOlxuICAgICAgICAgICAgLy8gcHJvZ3Jlc3M6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRwcm9ncmVzcycsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgZ2xvYmFsIHVwbG9hZCBwcm9ncmVzcyBldmVudHM6XG4gICAgICAgICAgICAvLyBwcm9ncmVzc2FsbDogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZHByb2dyZXNzYWxsJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciB1cGxvYWRzIHN0YXJ0LCBlcXVpdmFsZW50IHRvIHRoZSBnbG9iYWwgYWpheFN0YXJ0IGV2ZW50OlxuICAgICAgICAgICAgLy8gc3RhcnQ6IGZ1bmN0aW9uIChlKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRzdGFydCcsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdXBsb2FkcyBzdG9wLCBlcXVpdmFsZW50IHRvIHRoZSBnbG9iYWwgYWpheFN0b3AgZXZlbnQ6XG4gICAgICAgICAgICAvLyBzdG9wOiBmdW5jdGlvbiAoZSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2Fkc3RvcCcsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgY2hhbmdlIGV2ZW50cyBvZiB0aGUgZmlsZUlucHV0KHMpOlxuICAgICAgICAgICAgLy8gY2hhbmdlOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkY2hhbmdlJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBwYXN0ZSBldmVudHMgdG8gdGhlIHBhc3RlWm9uZShzKTpcbiAgICAgICAgICAgIC8vIHBhc3RlOiBmdW5jdGlvbiAoZSwgZGF0YSkge30sIC8vIC5iaW5kKCdmaWxldXBsb2FkcGFzdGUnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIGRyb3AgZXZlbnRzIG9mIHRoZSBkcm9wWm9uZShzKTpcbiAgICAgICAgICAgIC8vIGRyb3A6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRkcm9wJywgZnVuYyk7XG5cbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGZvciBkcmFnb3ZlciBldmVudHMgb2YgdGhlIGRyb3Bab25lKHMpOlxuICAgICAgICAgICAgLy8gZHJhZ292ZXI6IGZ1bmN0aW9uIChlKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRkcmFnb3ZlcicsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdGhlIHN0YXJ0IG9mIGVhY2ggY2h1bmsgdXBsb2FkIHJlcXVlc3Q6XG4gICAgICAgICAgICAvLyBjaHVua3NlbmQ6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRjaHVua3NlbmQnLCBmdW5jKTtcblxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHN1Y2Nlc3NmdWwgY2h1bmsgdXBsb2FkczpcbiAgICAgICAgICAgIC8vIGNodW5rZG9uZTogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZGNodW5rZG9uZScsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgZmFpbGVkIChhYm9ydCBvciBlcnJvcikgY2h1bmsgdXBsb2FkczpcbiAgICAgICAgICAgIC8vIGNodW5rZmFpbDogZnVuY3Rpb24gKGUsIGRhdGEpIHt9LCAvLyAuYmluZCgnZmlsZXVwbG9hZGNodW5rZmFpbCcsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgY29tcGxldGVkIChzdWNjZXNzLCBhYm9ydCBvciBlcnJvcikgY2h1bmsgdXBsb2FkIHJlcXVlc3RzOlxuICAgICAgICAgICAgLy8gY2h1bmthbHdheXM6IGZ1bmN0aW9uIChlLCBkYXRhKSB7fSwgLy8gLmJpbmQoJ2ZpbGV1cGxvYWRjaHVua2Fsd2F5cycsIGZ1bmMpO1xuXG4gICAgICAgICAgICAvLyBUaGUgcGx1Z2luIG9wdGlvbnMgYXJlIHVzZWQgYXMgc2V0dGluZ3Mgb2JqZWN0IGZvciB0aGUgYWpheCBjYWxscy5cbiAgICAgICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlIGpRdWVyeSBhamF4IHNldHRpbmdzIHJlcXVpcmVkIGZvciB0aGUgZmlsZSB1cGxvYWRzOlxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQSBsaXN0IG9mIG9wdGlvbnMgdGhhdCByZXF1aXJlIHJlaW5pdGlhbGl6aW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3JcbiAgICAgICAgLy8gc3BlY2lhbCBpbml0aWFsaXphdGlvbiBjb2RlOlxuICAgICAgICBfc3BlY2lhbE9wdGlvbnM6IFtcbiAgICAgICAgICAgICdmaWxlSW5wdXQnLFxuICAgICAgICAgICAgJ2Ryb3Bab25lJyxcbiAgICAgICAgICAgICdwYXN0ZVpvbmUnLFxuICAgICAgICAgICAgJ211bHRpcGFydCcsXG4gICAgICAgICAgICAnZm9yY2VJZnJhbWVUcmFuc3BvcnQnXG4gICAgICAgIF0sXG5cbiAgICAgICAgX2Jsb2JTbGljZTogJC5zdXBwb3J0LmJsb2JTbGljZSAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2xpY2UgPSB0aGlzLnNsaWNlIHx8IHRoaXMud2Via2l0U2xpY2UgfHwgdGhpcy5tb3pTbGljZTtcbiAgICAgICAgICAgIHJldHVybiBzbGljZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9CaXRyYXRlVGltZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXN0YW1wID0gKChEYXRlLm5vdykgPyBEYXRlLm5vdygpIDogKG5ldyBEYXRlKCkpLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IDA7XG4gICAgICAgICAgICB0aGlzLmJpdHJhdGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5nZXRCaXRyYXRlID0gZnVuY3Rpb24gKG5vdywgbG9hZGVkLCBpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lRGlmZiA9IG5vdyAtIHRoaXMudGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5iaXRyYXRlIHx8ICFpbnRlcnZhbCB8fCB0aW1lRGlmZiA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYml0cmF0ZSA9IChsb2FkZWQgLSB0aGlzLmxvYWRlZCkgKiAoMTAwMCAvIHRpbWVEaWZmKSAqIDg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gbG9hZGVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IG5vdztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYml0cmF0ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2lzWEhSVXBsb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICFvcHRpb25zLmZvcmNlSWZyYW1lVHJhbnNwb3J0ICYmXG4gICAgICAgICAgICAgICAgKCghb3B0aW9ucy5tdWx0aXBhcnQgJiYgJC5zdXBwb3J0LnhockZpbGVVcGxvYWQpIHx8XG4gICAgICAgICAgICAgICAgJC5zdXBwb3J0LnhockZvcm1EYXRhRmlsZVVwbG9hZCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldEZvcm1EYXRhOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGZvcm1EYXRhO1xuICAgICAgICAgICAgaWYgKCQudHlwZShvcHRpb25zLmZvcm1EYXRhKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmZvcm1EYXRhKG9wdGlvbnMuZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJC5pc0FycmF5KG9wdGlvbnMuZm9ybURhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZm9ybURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJC50eXBlKG9wdGlvbnMuZm9ybURhdGEpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhID0gW107XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMuZm9ybURhdGEsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5wdXNoKHtuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFRvdGFsOiBmdW5jdGlvbiAoZmlsZXMpIHtcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XG4gICAgICAgICAgICAkLmVhY2goZmlsZXMsIGZ1bmN0aW9uIChpbmRleCwgZmlsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsICs9IGZpbGUuc2l6ZSB8fCAxO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRQcm9ncmVzc09iamVjdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgdmFyIHByb2dyZXNzID0ge1xuICAgICAgICAgICAgICAgIGxvYWRlZDogMCxcbiAgICAgICAgICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgICAgICAgICBiaXRyYXRlOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKG9iai5fcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAkLmV4dGVuZChvYmouX3Byb2dyZXNzLCBwcm9ncmVzcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iai5fcHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdFJlc3BvbnNlT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgICAgIGlmIChvYmouX3Jlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChwcm9wIGluIG9iai5fcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5fcmVzcG9uc2UuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmouX3Jlc3BvbnNlW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmouX3Jlc3BvbnNlID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uUHJvZ3Jlc3M6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZS5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9ICgoRGF0ZS5ub3cpID8gRGF0ZS5ub3coKSA6IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkpLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZWQ7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuX3RpbWUgJiYgZGF0YS5wcm9ncmVzc0ludGVydmFsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAobm93IC0gZGF0YS5fdGltZSA8IGRhdGEucHJvZ3Jlc3NJbnRlcnZhbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGUubG9hZGVkICE9PSBlLnRvdGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0YS5fdGltZSA9IG5vdztcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICBlLmxvYWRlZCAvIGUudG90YWwgKiAoZGF0YS5jaHVua1NpemUgfHwgZGF0YS5fcHJvZ3Jlc3MudG90YWwpXG4gICAgICAgICAgICAgICAgKSArIChkYXRhLnVwbG9hZGVkQnl0ZXMgfHwgMCk7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBkaWZmZXJlbmNlIGZyb20gdGhlIHByZXZpb3VzbHkgbG9hZGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgLy8gdG8gdGhlIGdsb2JhbCBsb2FkZWQgY291bnRlcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmVzcy5sb2FkZWQgKz0gKGxvYWRlZCAtIGRhdGEuX3Byb2dyZXNzLmxvYWRlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MuYml0cmF0ZSA9IHRoaXMuX2JpdHJhdGVUaW1lci5nZXRCaXRyYXRlKFxuICAgICAgICAgICAgICAgICAgICBub3csXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2dyZXNzLmxvYWRlZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5iaXRyYXRlSW50ZXJ2YWxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGRhdGEuX3Byb2dyZXNzLmxvYWRlZCA9IGRhdGEubG9hZGVkID0gbG9hZGVkO1xuICAgICAgICAgICAgICAgIGRhdGEuX3Byb2dyZXNzLmJpdHJhdGUgPSBkYXRhLmJpdHJhdGUgPSBkYXRhLl9iaXRyYXRlVGltZXIuZ2V0Qml0cmF0ZShcbiAgICAgICAgICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgICAgICAgICBsb2FkZWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYml0cmF0ZUludGVydmFsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGEgY3VzdG9tIHByb2dyZXNzIGV2ZW50IHdpdGggYSB0b3RhbCBkYXRhIHByb3BlcnR5IHNldFxuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBmaWxlIHNpemUocykgb2YgdGhlIGN1cnJlbnQgdXBsb2FkIGFuZCBhIGxvYWRlZCBkYXRhXG4gICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgY2FsY3VsYXRlZCBhY2NvcmRpbmdseTpcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKFxuICAgICAgICAgICAgICAgICAgICAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KCdwcm9ncmVzcycsIHtkZWxlZ2F0ZWRFdmVudDogZX0pLFxuICAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGEgZ2xvYmFsIHByb2dyZXNzIGV2ZW50IGZvciBhbGwgY3VycmVudCBmaWxlIHVwbG9hZHMsXG4gICAgICAgICAgICAgICAgLy8gaW5jbHVkaW5nIGFqYXggY2FsbHMgcXVldWVkIGZvciBzZXF1ZW50aWFsIGZpbGUgdXBsb2FkczpcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKFxuICAgICAgICAgICAgICAgICAgICAncHJvZ3Jlc3NhbGwnLFxuICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KCdwcm9ncmVzc2FsbCcsIHtkZWxlZ2F0ZWRFdmVudDogZX0pLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmVzc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRQcm9ncmVzc0xpc3RlbmVyOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHhociA9IG9wdGlvbnMueGhyID8gb3B0aW9ucy54aHIoKSA6ICQuYWpheFNldHRpbmdzLnhocigpO1xuICAgICAgICAgICAgLy8gQWNjZXNzcyB0byB0aGUgbmF0aXZlIFhIUiBvYmplY3QgaXMgcmVxdWlyZWQgdG8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gZm9yIHRoZSB1cGxvYWQgcHJvZ3Jlc3MgZXZlbnQ6XG4gICAgICAgICAgICBpZiAoeGhyLnVwbG9hZCkge1xuICAgICAgICAgICAgICAgICQoeGhyLnVwbG9hZCkuYmluZCgncHJvZ3Jlc3MnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2UgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgcHJvZ3Jlc3MgZXZlbnQgcHJvcGVydGllcyBnZXQgY29waWVkIG92ZXI6XG4gICAgICAgICAgICAgICAgICAgIGUubGVuZ3RoQ29tcHV0YWJsZSA9IG9lLmxlbmd0aENvbXB1dGFibGU7XG4gICAgICAgICAgICAgICAgICAgIGUubG9hZGVkID0gb2UubG9hZGVkO1xuICAgICAgICAgICAgICAgICAgICBlLnRvdGFsID0gb2UudG90YWw7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX29uUHJvZ3Jlc3MoZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy54aHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaXNJbnN0YW5jZU9mOiBmdW5jdGlvbiAodHlwZSwgb2JqKSB7XG4gICAgICAgICAgICAvLyBDcm9zcy1mcmFtZSBpbnN0YW5jZW9mIGNoZWNrXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0ICcgKyB0eXBlICsgJ10nO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9pbml0WEhSRGF0YTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBmb3JtRGF0YSxcbiAgICAgICAgICAgICAgICBmaWxlID0gb3B0aW9ucy5maWxlc1swXSxcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgbm9uLW11bHRpcGFydCBzZXR0aW5nIGlmIG5vdCBzdXBwb3J0ZWQ6XG4gICAgICAgICAgICAgICAgbXVsdGlwYXJ0ID0gb3B0aW9ucy5tdWx0aXBhcnQgfHwgISQuc3VwcG9ydC54aHJGaWxlVXBsb2FkLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZSA9ICQudHlwZShvcHRpb25zLnBhcmFtTmFtZSkgPT09ICdhcnJheScgP1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBhcmFtTmFtZVswXSA6IG9wdGlvbnMucGFyYW1OYW1lO1xuICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0gJC5leHRlbmQoe30sIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jb250ZW50UmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtUmFuZ2UnXSA9IG9wdGlvbnMuY29udGVudFJhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtdWx0aXBhcnQgfHwgb3B0aW9ucy5ibG9iIHx8ICF0aGlzLl9pc0luc3RhbmNlT2YoJ0ZpbGUnLCBmaWxlKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQ29udGVudC1EaXNwb3NpdGlvbiddID0gJ2F0dGFjaG1lbnQ7IGZpbGVuYW1lPVwiJyArXG4gICAgICAgICAgICAgICAgICAgIGVuY29kZVVSSShmaWxlLm5hbWUpICsgJ1wiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbXVsdGlwYXJ0KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50VHlwZSA9IGZpbGUudHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgPSBvcHRpb25zLmJsb2IgfHwgZmlsZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJC5zdXBwb3J0LnhockZvcm1EYXRhRmlsZVVwbG9hZCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBvc3RNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5wb3N0TWVzc2FnZSBkb2VzIG5vdCBhbGxvdyBzZW5kaW5nIEZvcm1EYXRhXG4gICAgICAgICAgICAgICAgICAgIC8vIG9iamVjdHMsIHNvIHdlIGp1c3QgYWRkIHRoZSBGaWxlL0Jsb2Igb2JqZWN0cyB0b1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZm9ybURhdGEgYXJyYXkgYW5kIGxldCB0aGUgcG9zdE1lc3NhZ2Ugd2luZG93XG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgRm9ybURhdGEgb2JqZWN0IG91dCBvZiB0aGlzIGFycmF5OlxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YSA9IHRoaXMuX2dldEZvcm1EYXRhKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ibG9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwYXJhbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbnMuYmxvYlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5maWxlcywgZnVuY3Rpb24gKGluZGV4LCBmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICgkLnR5cGUob3B0aW9ucy5wYXJhbU5hbWUpID09PSAnYXJyYXknICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBhcmFtTmFtZVtpbmRleF0pIHx8IHBhcmFtTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2lzSW5zdGFuY2VPZignRm9ybURhdGEnLCBvcHRpb25zLmZvcm1EYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEgPSBvcHRpb25zLmZvcm1EYXRhO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLl9nZXRGb3JtRGF0YShvcHRpb25zKSwgZnVuY3Rpb24gKGluZGV4LCBmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChmaWVsZC5uYW1lLCBmaWVsZC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ibG9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQocGFyYW1OYW1lLCBvcHRpb25zLmJsb2IsIGZpbGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5maWxlcywgZnVuY3Rpb24gKGluZGV4LCBmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBjaGVjayBhbGxvd3MgdGhlIHRlc3RzIHRvIHJ1biB3aXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZHVtbXkgb2JqZWN0czpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5faXNJbnN0YW5jZU9mKCdGaWxlJywgZmlsZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2lzSW5zdGFuY2VPZignQmxvYicsIGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgkLnR5cGUob3B0aW9ucy5wYXJhbU5hbWUpID09PSAnYXJyYXknICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wYXJhbU5hbWVbaW5kZXhdKSB8fCBwYXJhbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS51cGxvYWROYW1lIHx8IGZpbGUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IGZvcm1EYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQmxvYiByZWZlcmVuY2UgaXMgbm90IG5lZWRlZCBhbnltb3JlLCBmcmVlIG1lbW9yeTpcbiAgICAgICAgICAgIG9wdGlvbnMuYmxvYiA9IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRJZnJhbWVTZXR0aW5nczogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRIb3N0ID0gJCgnPGE+PC9hPicpLnByb3AoJ2hyZWYnLCBvcHRpb25zLnVybCkucHJvcCgnaG9zdCcpO1xuICAgICAgICAgICAgLy8gU2V0dGluZyB0aGUgZGF0YVR5cGUgdG8gaWZyYW1lIGVuYWJsZXMgdGhlIGlmcmFtZSB0cmFuc3BvcnQ6XG4gICAgICAgICAgICBvcHRpb25zLmRhdGFUeXBlID0gJ2lmcmFtZSAnICsgKG9wdGlvbnMuZGF0YVR5cGUgfHwgJycpO1xuICAgICAgICAgICAgLy8gVGhlIGlmcmFtZSB0cmFuc3BvcnQgYWNjZXB0cyBhIHNlcmlhbGl6ZWQgYXJyYXkgYXMgZm9ybSBkYXRhOlxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtRGF0YSA9IHRoaXMuX2dldEZvcm1EYXRhKG9wdGlvbnMpO1xuICAgICAgICAgICAgLy8gQWRkIHJlZGlyZWN0IHVybCB0byBmb3JtIGRhdGEgb24gY3Jvc3MtZG9tYWluIHVwbG9hZHM6XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5yZWRpcmVjdCAmJiB0YXJnZXRIb3N0ICYmIHRhcmdldEhvc3QgIT09IGxvY2F0aW9uLmhvc3QpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvcm1EYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBvcHRpb25zLnJlZGlyZWN0UGFyYW1OYW1lIHx8ICdyZWRpcmVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb25zLnJlZGlyZWN0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXREYXRhU2V0dGluZ3M6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNYSFJVcGxvYWQob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NodW5rZWRVcGxvYWQob3B0aW9ucywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRYSFJEYXRhKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRQcm9ncmVzc0xpc3RlbmVyKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5wb3N0TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXR0aW5nIHRoZSBkYXRhVHlwZSB0byBwb3N0bWVzc2FnZSBlbmFibGVzIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBwb3N0TWVzc2FnZSB0cmFuc3BvcnQ6XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGUgPSAncG9zdG1lc3NhZ2UgJyArIChvcHRpb25zLmRhdGFUeXBlIHx8ICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRJZnJhbWVTZXR0aW5ncyhvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0UGFyYW1OYW1lOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGZpbGVJbnB1dCA9ICQob3B0aW9ucy5maWxlSW5wdXQpLFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZSA9IG9wdGlvbnMucGFyYW1OYW1lO1xuICAgICAgICAgICAgaWYgKCFwYXJhbU5hbWUpIHtcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWUgPSBbXTtcbiAgICAgICAgICAgICAgICBmaWxlSW5wdXQuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gaW5wdXQucHJvcCgnbmFtZScpIHx8ICdmaWxlc1tdJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAoaW5wdXQucHJvcCgnZmlsZXMnKSB8fCBbMV0pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZS5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJhbU5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZSA9IFtmaWxlSW5wdXQucHJvcCgnbmFtZScpIHx8ICdmaWxlc1tdJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICghJC5pc0FycmF5KHBhcmFtTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWUgPSBbcGFyYW1OYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJhbU5hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRGb3JtU2V0dGluZ3M6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBSZXRyaWV2ZSBtaXNzaW5nIG9wdGlvbnMgZnJvbSB0aGUgaW5wdXQgZmllbGQgYW5kIHRoZVxuICAgICAgICAgICAgLy8gYXNzb2NpYXRlZCBmb3JtLCBpZiBhdmFpbGFibGU6XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuZm9ybSB8fCAhb3B0aW9ucy5mb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9ybSA9ICQob3B0aW9ucy5maWxlSW5wdXQucHJvcCgnZm9ybScpKTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZ2l2ZW4gZmlsZSBpbnB1dCBkb2Vzbid0IGhhdmUgYW4gYXNzb2NpYXRlZCBmb3JtLFxuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgZGVmYXVsdCB3aWRnZXQgZmlsZSBpbnB1dCdzIGZvcm06XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9ybSA9ICQodGhpcy5vcHRpb25zLmZpbGVJbnB1dC5wcm9wKCdmb3JtJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdGlvbnMucGFyYW1OYW1lID0gdGhpcy5fZ2V0UGFyYW1OYW1lKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnVybCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudXJsID0gb3B0aW9ucy5mb3JtLnByb3AoJ2FjdGlvbicpIHx8IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgSFRUUCByZXF1ZXN0IG1ldGhvZCBtdXN0IGJlIFwiUE9TVFwiIG9yIFwiUFVUXCI6XG4gICAgICAgICAgICBvcHRpb25zLnR5cGUgPSAob3B0aW9ucy50eXBlIHx8XG4gICAgICAgICAgICAgICAgKCQudHlwZShvcHRpb25zLmZvcm0ucHJvcCgnbWV0aG9kJykpID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZvcm0ucHJvcCgnbWV0aG9kJykpIHx8ICcnXG4gICAgICAgICAgICAgICAgKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudHlwZSAhPT0gJ1BPU1QnICYmIG9wdGlvbnMudHlwZSAhPT0gJ1BVVCcgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlICE9PSAnUEFUQ0gnKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlID0gJ1BPU1QnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmZvcm1BY2NlcHRDaGFyc2V0KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JtQWNjZXB0Q2hhcnNldCA9IG9wdGlvbnMuZm9ybS5hdHRyKCdhY2NlcHQtY2hhcnNldCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRBSkFYU2V0dGluZ3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5faW5pdEZvcm1TZXR0aW5ncyhvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX2luaXREYXRhU2V0dGluZ3Mob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBqUXVlcnkgMS42IGRvZXNuJ3QgcHJvdmlkZSAuc3RhdGUoKSxcbiAgICAgICAgLy8gd2hpbGUgalF1ZXJ5IDEuOCsgcmVtb3ZlZCAuaXNSZWplY3RlZCgpIGFuZCAuaXNSZXNvbHZlZCgpOlxuICAgICAgICBfZ2V0RGVmZXJyZWRTdGF0ZTogZnVuY3Rpb24gKGRlZmVycmVkKSB7XG4gICAgICAgICAgICBpZiAoZGVmZXJyZWQuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQuc3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWZlcnJlZC5pc1Jlc29sdmVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Jlc29sdmVkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWZlcnJlZC5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JlamVjdGVkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAncGVuZGluZyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWFwcyBqcVhIUiBjYWxsYmFja3MgdG8gdGhlIGVxdWl2YWxlbnRcbiAgICAgICAgLy8gbWV0aG9kcyBvZiB0aGUgZ2l2ZW4gUHJvbWlzZSBvYmplY3Q6XG4gICAgICAgIF9lbmhhbmNlUHJvbWlzZTogZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgICAgIHByb21pc2Uuc3VjY2VzcyA9IHByb21pc2UuZG9uZTtcbiAgICAgICAgICAgIHByb21pc2UuZXJyb3IgPSBwcm9taXNlLmZhaWw7XG4gICAgICAgICAgICBwcm9taXNlLmNvbXBsZXRlID0gcHJvbWlzZS5hbHdheXM7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDcmVhdGVzIGFuZCByZXR1cm5zIGEgUHJvbWlzZSBvYmplY3QgZW5oYW5jZWQgd2l0aFxuICAgICAgICAvLyB0aGUganFYSFIgbWV0aG9kcyBhYm9ydCwgc3VjY2VzcywgZXJyb3IgYW5kIGNvbXBsZXRlOlxuICAgICAgICBfZ2V0WEhSUHJvbWlzZTogZnVuY3Rpb24gKHJlc29sdmVPclJlamVjdCwgY29udGV4dCwgYXJncykge1xuICAgICAgICAgICAgdmFyIGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gZGZkLnByb21pc2UoKTtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHRoaXMub3B0aW9ucy5jb250ZXh0IHx8IHByb21pc2U7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZU9yUmVqZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNvbHZlT3JSZWplY3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgZGZkLnJlamVjdFdpdGgoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9taXNlLmFib3J0ID0gZGZkLnByb21pc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5oYW5jZVByb21pc2UocHJvbWlzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQWRkcyBjb252ZW5pZW5jZSBtZXRob2RzIHRvIHRoZSBkYXRhIGNhbGxiYWNrIGFyZ3VtZW50OlxuICAgICAgICBfYWRkQ29udmVuaWVuY2VNZXRob2RzOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGdldFByb21pc2UgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmVXaXRoKHRoYXQsIGFyZ3MpLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGF0YS5wcm9jZXNzID0gZnVuY3Rpb24gKHJlc29sdmVGdW5jLCByZWplY3RGdW5jKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVGdW5jIHx8IHJlamVjdEZ1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5fcHJvY2Vzc1F1ZXVlID0gdGhpcy5fcHJvY2Vzc1F1ZXVlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9wcm9jZXNzUXVldWUgfHwgZ2V0UHJvbWlzZShbdGhpc10pKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVqZWN0V2l0aCh0aGF0LCBbZGF0YV0pLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0UHJvbWlzZShhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICkucGlwZShyZXNvbHZlRnVuYywgcmVqZWN0RnVuYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzUXVldWUgfHwgZ2V0UHJvbWlzZShbdGhpc10pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRhdGEuc3VibWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlKCkgIT09ICdwZW5kaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmpxWEhSID0gdGhpcy5qcVhIUiA9XG4gICAgICAgICAgICAgICAgICAgICAgICAodGhhdC5fdHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3VibWl0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KCdzdWJtaXQnLCB7ZGVsZWdhdGVkRXZlbnQ6IGV9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICApICE9PSBmYWxzZSkgJiYgdGhhdC5fb25TZW5kKGUsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qcVhIUiB8fCB0aGF0Ll9nZXRYSFJQcm9taXNlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGF0YS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5qcVhIUikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5qcVhIUi5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yVGhyb3duID0gJ2Fib3J0JztcbiAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdmYWlsJywgbnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuX2dldFhIUlByb21pc2UoZmFsc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRhdGEuc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanFYSFIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuX2dldERlZmVycmVkU3RhdGUodGhpcy5qcVhIUik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcm9jZXNzUXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuX2dldERlZmVycmVkU3RhdGUodGhpcy5fcHJvY2Vzc1F1ZXVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGF0YS5wcm9jZXNzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5qcVhIUiAmJiB0aGlzLl9wcm9jZXNzUXVldWUgJiYgdGhhdFxuICAgICAgICAgICAgICAgICAgICAuX2dldERlZmVycmVkU3RhdGUodGhpcy5fcHJvY2Vzc1F1ZXVlKSA9PT0gJ3BlbmRpbmcnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRhdGEucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRhdGEucmVzcG9uc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBQYXJzZXMgdGhlIFJhbmdlIGhlYWRlciBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2VcbiAgICAgICAgLy8gYW5kIHJldHVybnMgdGhlIHVwbG9hZGVkIGJ5dGVzOlxuICAgICAgICBfZ2V0VXBsb2FkZWRCeXRlczogZnVuY3Rpb24gKGpxWEhSKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcignUmFuZ2UnKSxcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IHJhbmdlICYmIHJhbmdlLnNwbGl0KCctJyksXG4gICAgICAgICAgICAgICAgdXBwZXJCeXRlc1BvcyA9IHBhcnRzICYmIHBhcnRzLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQocGFydHNbMV0sIDEwKTtcbiAgICAgICAgICAgIHJldHVybiB1cHBlckJ5dGVzUG9zICYmIHVwcGVyQnl0ZXNQb3MgKyAxO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFVwbG9hZHMgYSBmaWxlIGluIG11bHRpcGxlLCBzZXF1ZW50aWFsIHJlcXVlc3RzXG4gICAgICAgIC8vIGJ5IHNwbGl0dGluZyB0aGUgZmlsZSB1cCBpbiBtdWx0aXBsZSBibG9iIGNodW5rcy5cbiAgICAgICAgLy8gSWYgdGhlIHNlY29uZCBwYXJhbWV0ZXIgaXMgdHJ1ZSwgb25seSB0ZXN0cyBpZiB0aGUgZmlsZVxuICAgICAgICAvLyBzaG91bGQgYmUgdXBsb2FkZWQgaW4gY2h1bmtzLCBidXQgZG9lcyBub3QgaW52b2tlIGFueVxuICAgICAgICAvLyB1cGxvYWQgcmVxdWVzdHM6XG4gICAgICAgIF9jaHVua2VkVXBsb2FkOiBmdW5jdGlvbiAob3B0aW9ucywgdGVzdE9ubHkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudXBsb2FkZWRCeXRlcyA9IG9wdGlvbnMudXBsb2FkZWRCeXRlcyB8fCAwO1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGZpbGUgPSBvcHRpb25zLmZpbGVzWzBdLFxuICAgICAgICAgICAgICAgIGZzID0gZmlsZS5zaXplLFxuICAgICAgICAgICAgICAgIHViID0gb3B0aW9ucy51cGxvYWRlZEJ5dGVzLFxuICAgICAgICAgICAgICAgIG1jcyA9IG9wdGlvbnMubWF4Q2h1bmtTaXplIHx8IGZzLFxuICAgICAgICAgICAgICAgIHNsaWNlID0gdGhpcy5fYmxvYlNsaWNlLFxuICAgICAgICAgICAgICAgIGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gZGZkLnByb21pc2UoKSxcbiAgICAgICAgICAgICAgICBqcVhIUixcbiAgICAgICAgICAgICAgICB1cGxvYWQ7XG4gICAgICAgICAgICBpZiAoISh0aGlzLl9pc1hIUlVwbG9hZChvcHRpb25zKSAmJiBzbGljZSAmJiAodWIgfHwgbWNzIDwgZnMpKSB8fFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVzdE9ubHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1YiA+PSBmcykge1xuICAgICAgICAgICAgICAgIGZpbGUuZXJyb3IgPSBvcHRpb25zLmkxOG4oJ3VwbG9hZGVkQnl0ZXMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0WEhSUHJvbWlzZShcbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgW251bGwsICdlcnJvcicsIGZpbGUuZXJyb3JdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZSBjaHVuayB1cGxvYWQgbWV0aG9kOlxuICAgICAgICAgICAgdXBsb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIENsb25lIHRoZSBvcHRpb25zIG9iamVjdCBmb3IgZWFjaCBjaHVuayB1cGxvYWQ6XG4gICAgICAgICAgICAgICAgdmFyIG8gPSAkLmV4dGVuZCh7fSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMb2FkZWQgPSBvLl9wcm9ncmVzcy5sb2FkZWQ7XG4gICAgICAgICAgICAgICAgby5ibG9iID0gc2xpY2UuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgdWIsXG4gICAgICAgICAgICAgICAgICAgIHViICsgbWNzLFxuICAgICAgICAgICAgICAgICAgICBmaWxlLnR5cGVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IGNodW5rIHNpemUsIGFzIHRoZSBibG9iIGl0c2VsZlxuICAgICAgICAgICAgICAgIC8vIHdpbGwgYmUgZGVyZWZlcmVuY2VkIGFmdGVyIGRhdGEgcHJvY2Vzc2luZzpcbiAgICAgICAgICAgICAgICBvLmNodW5rU2l6ZSA9IG8uYmxvYi5zaXplO1xuICAgICAgICAgICAgICAgIC8vIEV4cG9zZSB0aGUgY2h1bmsgYnl0ZXMgcG9zaXRpb24gcmFuZ2U6XG4gICAgICAgICAgICAgICAgby5jb250ZW50UmFuZ2UgPSAnYnl0ZXMgJyArIHViICsgJy0nICtcbiAgICAgICAgICAgICAgICAgICAgKHViICsgby5jaHVua1NpemUgLSAxKSArICcvJyArIGZzO1xuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHVwbG9hZCBkYXRhICh0aGUgYmxvYiBhbmQgcG90ZW50aWFsIGZvcm0gZGF0YSk6XG4gICAgICAgICAgICAgICAgdGhhdC5faW5pdFhIUkRhdGEobyk7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHByb2dyZXNzIGxpc3RlbmVycyBmb3IgdGhpcyBjaHVuayB1cGxvYWQ6XG4gICAgICAgICAgICAgICAgdGhhdC5faW5pdFByb2dyZXNzTGlzdGVuZXIobyk7XG4gICAgICAgICAgICAgICAganFYSFIgPSAoKHRoYXQuX3RyaWdnZXIoJ2NodW5rc2VuZCcsIG51bGwsIG8pICE9PSBmYWxzZSAmJiAkLmFqYXgobykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9nZXRYSFJQcm9taXNlKGZhbHNlLCBvLmNvbnRleHQpKVxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0LCB0ZXh0U3RhdHVzLCBqcVhIUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWIgPSB0aGF0Ll9nZXRVcGxvYWRlZEJ5dGVzKGpxWEhSKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh1YiArIG8uY2h1bmtTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHByb2dyZXNzIGV2ZW50IGlmIG5vIGZpbmFsIHByb2dyZXNzIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aXRoIGxvYWRlZCBlcXVhbGluZyB0b3RhbCBoYXMgYmVlbiB0cmlnZ2VyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciB0aGlzIGNodW5rOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRMb2FkZWQgKyBvLmNodW5rU2l6ZSAtIG8uX3Byb2dyZXNzLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX29uUHJvZ3Jlc3MoJC5FdmVudCgncHJvZ3Jlc3MnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZDogdWIgLSBvLnVwbG9hZGVkQnl0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiB1YiAtIG8udXBsb2FkZWRCeXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCBvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudXBsb2FkZWRCeXRlcyA9IG8udXBsb2FkZWRCeXRlcyA9IHViO1xuICAgICAgICAgICAgICAgICAgICAgICAgby5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgby5qcVhIUiA9IGpxWEhSO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignY2h1bmtkb25lJywgbnVsbCwgbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdjaHVua2Fsd2F5cycsIG51bGwsIG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHViIDwgZnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGaWxlIHVwbG9hZCBub3QgeWV0IGNvbXBsZXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlIHdpdGggdGhlIG5leHQgY2h1bms6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5jb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVzdWx0LCB0ZXh0U3RhdHVzLCBqcVhIUl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLmpxWEhSID0ganFYSFI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgby5lcnJvclRocm93biA9IGVycm9yVGhyb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignY2h1bmtmYWlsJywgbnVsbCwgbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdjaHVua2Fsd2F5cycsIG51bGwsIG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlamVjdFdpdGgoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby5jb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd25dXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9lbmhhbmNlUHJvbWlzZShwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpxWEhSLmFib3J0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXBsb2FkKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYmVmb3JlU2VuZDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgc3RhcnQgY2FsbGJhY2sgaXMgdHJpZ2dlcmVkIHdoZW4gYW4gdXBsb2FkIHN0YXJ0c1xuICAgICAgICAgICAgICAgIC8vIGFuZCBubyBvdGhlciB1cGxvYWRzIGFyZSBjdXJyZW50bHkgcnVubmluZyxcbiAgICAgICAgICAgICAgICAvLyBlcXVpdmFsZW50IHRvIHRoZSBnbG9iYWwgYWpheFN0YXJ0IGV2ZW50OlxuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgLy8gU2V0IHRpbWVyIGZvciBnbG9iYWwgYml0cmF0ZSBwcm9ncmVzcyBjYWxjdWxhdGlvbjpcbiAgICAgICAgICAgICAgICB0aGlzLl9iaXRyYXRlVGltZXIgPSBuZXcgdGhpcy5fQml0cmF0ZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGdsb2JhbCBwcm9ncmVzcyB2YWx1ZXM6XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MubG9hZGVkID0gdGhpcy5fcHJvZ3Jlc3MudG90YWwgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2dyZXNzLmJpdHJhdGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBjb250YWluZXIgb2JqZWN0cyBmb3IgdGhlIC5yZXNwb25zZSgpIGFuZFxuICAgICAgICAgICAgLy8gLnByb2dyZXNzKCkgbWV0aG9kcyBvbiB0aGUgZGF0YSBvYmplY3QgYXJlIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gYW5kIHJlc2V0IHRvIHRoZWlyIGluaXRpYWwgc3RhdGU6XG4gICAgICAgICAgICB0aGlzLl9pbml0UmVzcG9uc2VPYmplY3QoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0UHJvZ3Jlc3NPYmplY3QoZGF0YSk7XG4gICAgICAgICAgICBkYXRhLl9wcm9ncmVzcy5sb2FkZWQgPSBkYXRhLmxvYWRlZCA9IGRhdGEudXBsb2FkZWRCeXRlcyB8fCAwO1xuICAgICAgICAgICAgZGF0YS5fcHJvZ3Jlc3MudG90YWwgPSBkYXRhLnRvdGFsID0gdGhpcy5fZ2V0VG90YWwoZGF0YS5maWxlcykgfHwgMTtcbiAgICAgICAgICAgIGRhdGEuX3Byb2dyZXNzLmJpdHJhdGUgPSBkYXRhLmJpdHJhdGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlICs9IDE7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBnbG9iYWwgcHJvZ3Jlc3MgdmFsdWVzOlxuICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MubG9hZGVkICs9IGRhdGEubG9hZGVkO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MudG90YWwgKz0gZGF0YS50b3RhbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25Eb25lOiBmdW5jdGlvbiAocmVzdWx0LCB0ZXh0U3RhdHVzLCBqcVhIUiwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHRvdGFsID0gb3B0aW9ucy5fcHJvZ3Jlc3MudG90YWwsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBvcHRpb25zLl9yZXNwb25zZTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLl9wcm9ncmVzcy5sb2FkZWQgPCB0b3RhbCkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHByb2dyZXNzIGV2ZW50IGlmIG5vIGZpbmFsIHByb2dyZXNzIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gd2l0aCBsb2FkZWQgZXF1YWxpbmcgdG90YWwgaGFzIGJlZW4gdHJpZ2dlcmVkOlxuICAgICAgICAgICAgICAgIHRoaXMuX29uUHJvZ3Jlc3MoJC5FdmVudCgncHJvZ3Jlc3MnLCB7XG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlZDogdG90YWwsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbFxuICAgICAgICAgICAgICAgIH0pLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3BvbnNlLnJlc3VsdCA9IG9wdGlvbnMucmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzcG9uc2UudGV4dFN0YXR1cyA9IG9wdGlvbnMudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XG4gICAgICAgICAgICByZXNwb25zZS5qcVhIUiA9IG9wdGlvbnMuanFYSFIgPSBqcVhIUjtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ2RvbmUnLCBudWxsLCBvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25GYWlsOiBmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBvcHRpb25zLl9yZXNwb25zZTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJlY2FsY3VsYXRlUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZhaWxlZCAoZXJyb3Igb3IgYWJvcnQpIGZpbGUgdXBsb2FkIGZyb21cbiAgICAgICAgICAgICAgICAvLyB0aGUgZ2xvYmFsIHByb2dyZXNzIGNhbGN1bGF0aW9uOlxuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2dyZXNzLmxvYWRlZCAtPSBvcHRpb25zLl9wcm9ncmVzcy5sb2FkZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3MudG90YWwgLT0gb3B0aW9ucy5fcHJvZ3Jlc3MudG90YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZS5qcVhIUiA9IG9wdGlvbnMuanFYSFIgPSBqcVhIUjtcbiAgICAgICAgICAgIHJlc3BvbnNlLnRleHRTdGF0dXMgPSBvcHRpb25zLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xuICAgICAgICAgICAgcmVzcG9uc2UuZXJyb3JUaHJvd24gPSBvcHRpb25zLmVycm9yVGhyb3duID0gZXJyb3JUaHJvd247XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdmYWlsJywgbnVsbCwgb3B0aW9ucyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uQWx3YXlzOiBmdW5jdGlvbiAoanFYSFJvclJlc3VsdCwgdGV4dFN0YXR1cywganFYSFJvckVycm9yLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBqcVhIUm9yUmVzdWx0LCB0ZXh0U3RhdHVzIGFuZCBqcVhIUm9yRXJyb3IgYXJlIGFkZGVkIHRvIHRoZVxuICAgICAgICAgICAgLy8gb3B0aW9ucyBvYmplY3QgdmlhIGRvbmUgYW5kIGZhaWwgY2FsbGJhY2tzXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdhbHdheXMnLCBudWxsLCBvcHRpb25zKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfb25TZW5kOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKCFkYXRhLnN1Ym1pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZENvbnZlbmllbmNlTWV0aG9kcyhlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBqcVhIUixcbiAgICAgICAgICAgICAgICBhYm9ydGVkLFxuICAgICAgICAgICAgICAgIHNsb3QsXG4gICAgICAgICAgICAgICAgcGlwZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdGhhdC5fZ2V0QUpBWFNldHRpbmdzKGRhdGEpLFxuICAgICAgICAgICAgICAgIHNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3NlbmRpbmcgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRpbWVyIGZvciBiaXRyYXRlIHByb2dyZXNzIGNhbGN1bGF0aW9uOlxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9iaXRyYXRlVGltZXIgPSBuZXcgdGhhdC5fQml0cmF0ZVRpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGpxWEhSID0ganFYSFIgfHwgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKChhYm9ydGVkIHx8IHRoYXQuX3RyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuRXZlbnQoJ3NlbmQnLCB7ZGVsZWdhdGVkRXZlbnQ6IGV9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICApID09PSBmYWxzZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2dldFhIUlByb21pc2UoZmFsc2UsIG9wdGlvbnMuY29udGV4dCwgYWJvcnRlZCkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9jaHVua2VkVXBsb2FkKG9wdGlvbnMpIHx8ICQuYWpheChvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICApLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCwgdGV4dFN0YXR1cywganFYSFIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX29uRG9uZShyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vbkZhaWwoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uIChqcVhIUm9yUmVzdWx0LCB0ZXh0U3RhdHVzLCBqcVhIUm9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX29uQWx3YXlzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpxWEhSb3JSZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqcVhIUm9yRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3NlbmRpbmcgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2FjdGl2ZSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubGltaXRDb25jdXJyZW50VXBsb2FkcyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxpbWl0Q29uY3VycmVudFVwbG9hZHMgPiB0aGF0Ll9zZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RhcnQgdGhlIG5leHQgcXVldWVkIHVwbG9hZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGF0IGhhcyBub3QgYmVlbiBhYm9ydGVkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0U2xvdCA9IHRoYXQuX3Nsb3RzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5leHRTbG90KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Ll9nZXREZWZlcnJlZFN0YXRlKG5leHRTbG90KSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xvdC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xvdCA9IHRoYXQuX3Nsb3RzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2FjdGl2ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBzdG9wIGNhbGxiYWNrIGlzIHRyaWdnZXJlZCB3aGVuIGFsbCB1cGxvYWRzIGhhdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiZWVuIGNvbXBsZXRlZCwgZXF1aXZhbGVudCB0byB0aGUgZ2xvYmFsIGFqYXhTdG9wIGV2ZW50OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3N0b3AnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBqcVhIUjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fYmVmb3JlU2VuZChlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2VxdWVudGlhbFVwbG9hZHMgfHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMub3B0aW9ucy5saW1pdENvbmN1cnJlbnRVcGxvYWRzICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saW1pdENvbmN1cnJlbnRVcGxvYWRzIDw9IHRoaXMuX3NlbmRpbmcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saW1pdENvbmN1cnJlbnRVcGxvYWRzID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBzbG90ID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zbG90cy5wdXNoKHNsb3QpO1xuICAgICAgICAgICAgICAgICAgICBwaXBlID0gc2xvdC5waXBlKHNlbmQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcXVlbmNlID0gdGhpcy5fc2VxdWVuY2UucGlwZShzZW5kLCBzZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgcGlwZSA9IHRoaXMuX3NlcXVlbmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHBpcGVkIFByb21pc2Ugb2JqZWN0LCBlbmhhbmNlZCB3aXRoIGFuIGFib3J0IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAvLyB3aGljaCBpcyBkZWxlZ2F0ZWQgdG8gdGhlIGpxWEhSIG9iamVjdCBvZiB0aGUgY3VycmVudCB1cGxvYWQsXG4gICAgICAgICAgICAgICAgLy8gYW5kIGpxWEhSIGNhbGxiYWNrcyBtYXBwZWQgdG8gdGhlIGVxdWl2YWxlbnQgUHJvbWlzZSBtZXRob2RzOlxuICAgICAgICAgICAgICAgIHBpcGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFib3J0ZWQgPSBbdW5kZWZpbmVkLCAnYWJvcnQnLCAnYWJvcnQnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFqcVhIUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90LnJlamVjdFdpdGgob3B0aW9ucy5jb250ZXh0LCBhYm9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpxWEhSLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5oYW5jZVByb21pc2UocGlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VuZCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkFkZDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5vcHRpb25zLCBkYXRhKSxcbiAgICAgICAgICAgICAgICBmaWxlcyA9IGRhdGEuZmlsZXMsXG4gICAgICAgICAgICAgICAgZmlsZXNMZW5ndGggPSBmaWxlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgbGltaXQgPSBvcHRpb25zLmxpbWl0TXVsdGlGaWxlVXBsb2FkcyxcbiAgICAgICAgICAgICAgICBsaW1pdFNpemUgPSBvcHRpb25zLmxpbWl0TXVsdGlGaWxlVXBsb2FkU2l6ZSxcbiAgICAgICAgICAgICAgICBvdmVyaGVhZCA9IG9wdGlvbnMubGltaXRNdWx0aUZpbGVVcGxvYWRTaXplT3ZlcmhlYWQsXG4gICAgICAgICAgICAgICAgYmF0Y2hTaXplID0gMCxcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWUgPSB0aGlzLl9nZXRQYXJhbU5hbWUob3B0aW9ucyksXG4gICAgICAgICAgICAgICAgcGFyYW1OYW1lU2V0LFxuICAgICAgICAgICAgICAgIHBhcmFtTmFtZVNsaWNlLFxuICAgICAgICAgICAgICAgIGZpbGVTZXQsXG4gICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICBqID0gMDtcbiAgICAgICAgICAgIGlmIChsaW1pdFNpemUgJiYgKCFmaWxlc0xlbmd0aCB8fCBmaWxlc1swXS5zaXplID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAgICAgbGltaXRTaXplID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEob3B0aW9ucy5zaW5nbGVGaWxlVXBsb2FkcyB8fCBsaW1pdCB8fCBsaW1pdFNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgICF0aGlzLl9pc1hIUlVwbG9hZChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIGZpbGVTZXQgPSBbZmlsZXNdO1xuICAgICAgICAgICAgICAgIHBhcmFtTmFtZVNldCA9IFtwYXJhbU5hbWVdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKG9wdGlvbnMuc2luZ2xlRmlsZVVwbG9hZHMgfHwgbGltaXRTaXplKSAmJiBsaW1pdCkge1xuICAgICAgICAgICAgICAgIGZpbGVTZXQgPSBbXTtcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWVTZXQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZmlsZXNMZW5ndGg7IGkgKz0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVNldC5wdXNoKGZpbGVzLnNsaWNlKGksIGkgKyBsaW1pdCkpO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWVTbGljZSA9IHBhcmFtTmFtZS5zbGljZShpLCBpICsgbGltaXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmFtTmFtZVNsaWNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lU2xpY2UgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lU2V0LnB1c2gocGFyYW1OYW1lU2xpY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMuc2luZ2xlRmlsZVVwbG9hZHMgJiYgbGltaXRTaXplKSB7XG4gICAgICAgICAgICAgICAgZmlsZVNldCA9IFtdO1xuICAgICAgICAgICAgICAgIHBhcmFtTmFtZVNldCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBmaWxlc0xlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhdGNoU2l6ZSArPSBmaWxlc1tpXS5zaXplICsgb3ZlcmhlYWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA9PT0gZmlsZXNMZW5ndGggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGJhdGNoU2l6ZSArIGZpbGVzW2kgKyAxXS5zaXplICsgb3ZlcmhlYWQpID4gbGltaXRTaXplKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsaW1pdCAmJiBpICsgMSAtIGogPj0gbGltaXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2V0LnB1c2goZmlsZXMuc2xpY2UoaiwgaSArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtTmFtZVNsaWNlID0gcGFyYW1OYW1lLnNsaWNlKGosIGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyYW1OYW1lU2xpY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1OYW1lU2xpY2UgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbU5hbWVTZXQucHVzaChwYXJhbU5hbWVTbGljZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXRjaFNpemUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbU5hbWVTZXQgPSBwYXJhbU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLm9yaWdpbmFsRmlsZXMgPSBmaWxlcztcbiAgICAgICAgICAgICQuZWFjaChmaWxlU2V0IHx8IGZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGF0YSA9ICQuZXh0ZW5kKHt9LCBkYXRhKTtcbiAgICAgICAgICAgICAgICBuZXdEYXRhLmZpbGVzID0gZmlsZVNldCA/IGVsZW1lbnQgOiBbZWxlbWVudF07XG4gICAgICAgICAgICAgICAgbmV3RGF0YS5wYXJhbU5hbWUgPSBwYXJhbU5hbWVTZXRbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoYXQuX2luaXRSZXNwb25zZU9iamVjdChuZXdEYXRhKTtcbiAgICAgICAgICAgICAgICB0aGF0Ll9pbml0UHJvZ3Jlc3NPYmplY3QobmV3RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhhdC5fYWRkQ29udmVuaWVuY2VNZXRob2RzKGUsIG5ld0RhdGEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoYXQuX3RyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgICdhZGQnLFxuICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KCdhZGQnLCB7ZGVsZWdhdGVkRXZlbnQ6IGV9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVwbGFjZUZpbGVJbnB1dDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IGRhdGEuZmlsZUlucHV0LFxuICAgICAgICAgICAgICAgIGlucHV0Q2xvbmUgPSBpbnB1dC5jbG9uZSh0cnVlKTtcbiAgICAgICAgICAgIC8vIEFkZCBhIHJlZmVyZW5jZSBmb3IgdGhlIG5ldyBjbG9uZWQgZmlsZSBpbnB1dCB0byB0aGUgZGF0YSBhcmd1bWVudDpcbiAgICAgICAgICAgIGRhdGEuZmlsZUlucHV0Q2xvbmUgPSBpbnB1dENsb25lO1xuICAgICAgICAgICAgJCgnPGZvcm0+PC9mb3JtPicpLmFwcGVuZChpbnB1dENsb25lKVswXS5yZXNldCgpO1xuICAgICAgICAgICAgLy8gRGV0YWNoaW5nIGFsbG93cyB0byBpbnNlcnQgdGhlIGZpbGVJbnB1dCBvbiBhbm90aGVyIGZvcm1cbiAgICAgICAgICAgIC8vIHdpdGhvdXQgbG9vc2luZyB0aGUgZmlsZSBpbnB1dCB2YWx1ZTpcbiAgICAgICAgICAgIGlucHV0LmFmdGVyKGlucHV0Q2xvbmUpLmRldGFjaCgpO1xuICAgICAgICAgICAgLy8gQXZvaWQgbWVtb3J5IGxlYWtzIHdpdGggdGhlIGRldGFjaGVkIGZpbGUgaW5wdXQ6XG4gICAgICAgICAgICAkLmNsZWFuRGF0YShpbnB1dC51bmJpbmQoJ3JlbW92ZScpKTtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIG9yaWdpbmFsIGZpbGUgaW5wdXQgZWxlbWVudCBpbiB0aGUgZmlsZUlucHV0XG4gICAgICAgICAgICAvLyBlbGVtZW50cyBzZXQgd2l0aCB0aGUgY2xvbmUsIHdoaWNoIGhhcyBiZWVuIGNvcGllZCBpbmNsdWRpbmdcbiAgICAgICAgICAgIC8vIGV2ZW50IGhhbmRsZXJzOlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpbGVJbnB1dCA9IHRoaXMub3B0aW9ucy5maWxlSW5wdXQubWFwKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICAgICAgICAgIGlmIChlbCA9PT0gaW5wdXRbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0Q2xvbmVbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHdpZGdldCBoYXMgYmVlbiBpbml0aWFsaXplZCBvbiB0aGUgZmlsZSBpbnB1dCBpdHNlbGYsXG4gICAgICAgICAgICAvLyBvdmVycmlkZSB0aGlzLmVsZW1lbnQgd2l0aCB0aGUgZmlsZSBpbnB1dCBjbG9uZTpcbiAgICAgICAgICAgIGlmIChpbnB1dFswXSA9PT0gdGhpcy5lbGVtZW50WzBdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gaW5wdXRDbG9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfaGFuZGxlRmlsZVRyZWVFbnRyeTogZnVuY3Rpb24gKGVudHJ5LCBwYXRoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlICYmICFlLmVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLmVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgJC53aGVuIHJldHVybnMgaW1tZWRpYXRlbHkgaWYgb25lXG4gICAgICAgICAgICAgICAgICAgIC8vIERlZmVycmVkIGlzIHJlamVjdGVkLCB3ZSB1c2UgcmVzb2x2ZSBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFsbG93cyB2YWxpZCBmaWxlcyBhbmQgaW52YWxpZCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAvLyB0byBiZSByZXR1cm5lZCB0b2dldGhlciBpbiBvbmUgc2V0OlxuICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShbZV0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2Vzc0hhbmRsZXIgPSBmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9oYW5kbGVGaWxlVHJlZUVudHJpZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCArIGVudHJ5Lm5hbWUgKyAnLydcbiAgICAgICAgICAgICAgICAgICAgKS5kb25lKGZ1bmN0aW9uIChmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmUoZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGVycm9ySGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWFkRW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyUmVhZGVyLnJlYWRFbnRyaWVzKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0hhbmRsZXIoZW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXMgPSBlbnRyaWVzLmNvbmNhdChyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkRW50cmllcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBlcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGlyUmVhZGVyLCBlbnRyaWVzID0gW107XG4gICAgICAgICAgICBwYXRoID0gcGF0aCB8fCAnJztcbiAgICAgICAgICAgIGlmIChlbnRyeS5pc0ZpbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuX2ZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgQ2hyb21lIGJ1ZyAjMTQ5NzM1XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5Ll9maWxlLnJlbGF0aXZlUGF0aCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKGVudHJ5Ll9maWxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5maWxlKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlLnJlbGF0aXZlUGF0aCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgZGlyUmVhZGVyID0gZW50cnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgcmVhZEVudHJpZXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIGFuIGVtcHkgbGlzdCBmb3IgZmlsZSBzeXN0ZW0gaXRlbXNcbiAgICAgICAgICAgICAgICAvLyBvdGhlciB0aGFuIGZpbGVzIG9yIGRpcmVjdG9yaWVzOlxuICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9oYW5kbGVGaWxlVHJlZUVudHJpZXM6IGZ1bmN0aW9uIChlbnRyaWVzLCBwYXRoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gJC53aGVuLmFwcGx5KFxuICAgICAgICAgICAgICAgICQsXG4gICAgICAgICAgICAgICAgJC5tYXAoZW50cmllcywgZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Ll9oYW5kbGVGaWxlVHJlZUVudHJ5KGVudHJ5LCBwYXRoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS5waXBlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShcbiAgICAgICAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0RHJvcHBlZEZpbGVzOiBmdW5jdGlvbiAoZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgICAgICBkYXRhVHJhbnNmZXIgPSBkYXRhVHJhbnNmZXIgfHwge307XG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBkYXRhVHJhbnNmZXIuaXRlbXM7XG4gICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoICYmIChpdGVtc1swXS53ZWJraXRHZXRBc0VudHJ5IHx8XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zWzBdLmdldEFzRW50cnkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZUZpbGVUcmVlRW50cmllcyhcbiAgICAgICAgICAgICAgICAgICAgJC5tYXAoaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50cnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkgPSBpdGVtLndlYmtpdEdldEFzRW50cnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgQ2hyb21lIGJ1ZyAjMTQ5NzM1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5fZmlsZSA9IGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldEFzRW50cnkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKFxuICAgICAgICAgICAgICAgICQubWFrZUFycmF5KGRhdGFUcmFuc2Zlci5maWxlcylcbiAgICAgICAgICAgICkucHJvbWlzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRTaW5nbGVGaWxlSW5wdXRGaWxlczogZnVuY3Rpb24gKGZpbGVJbnB1dCkge1xuICAgICAgICAgICAgZmlsZUlucHV0ID0gJChmaWxlSW5wdXQpO1xuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSBmaWxlSW5wdXQucHJvcCgnd2Via2l0RW50cmllcycpIHx8XG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnB1dC5wcm9wKCdlbnRyaWVzJyksXG4gICAgICAgICAgICAgICAgZmlsZXMsXG4gICAgICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgICAgICBpZiAoZW50cmllcyAmJiBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVGaWxlVHJlZUVudHJpZXMoZW50cmllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWxlcyA9ICQubWFrZUFycmF5KGZpbGVJbnB1dC5wcm9wKCdmaWxlcycpKTtcbiAgICAgICAgICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBmaWxlSW5wdXQucHJvcCgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShbXSkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZmlsZXMgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZSwgdGhlIGJyb3dzZXIgZG9lcyBub3RcbiAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IHRoZSBGaWxlIEFQSSBhbmQgd2UgYWRkIGEgcHNldWRvIEZpbGUgb2JqZWN0IHdpdGhcbiAgICAgICAgICAgICAgICAvLyB0aGUgaW5wdXQgdmFsdWUgYXMgbmFtZSB3aXRoIHBhdGggaW5mb3JtYXRpb24gcmVtb3ZlZDpcbiAgICAgICAgICAgICAgICBmaWxlcyA9IFt7bmFtZTogdmFsdWUucmVwbGFjZSgvXi4qXFxcXC8sICcnKX1dO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlc1swXS5uYW1lID09PSB1bmRlZmluZWQgJiYgZmlsZXNbMF0uZmlsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyBGaWxlIG5vcm1hbGl6YXRpb24gZm9yIFNhZmFyaSA0IGFuZCBGaXJlZm94IDM6XG4gICAgICAgICAgICAgICAgJC5lYWNoKGZpbGVzLCBmdW5jdGlvbiAoaW5kZXgsIGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5uYW1lID0gZmlsZS5maWxlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5zaXplID0gZmlsZS5maWxlU2l6ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmaWxlcykucHJvbWlzZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRGaWxlSW5wdXRGaWxlczogZnVuY3Rpb24gKGZpbGVJbnB1dCkge1xuICAgICAgICAgICAgaWYgKCEoZmlsZUlucHV0IGluc3RhbmNlb2YgJCkgfHwgZmlsZUlucHV0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTaW5nbGVGaWxlSW5wdXRGaWxlcyhmaWxlSW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQud2hlbi5hcHBseShcbiAgICAgICAgICAgICAgICAkLFxuICAgICAgICAgICAgICAgICQubWFwKGZpbGVJbnB1dCwgdGhpcy5fZ2V0U2luZ2xlRmlsZUlucHV0RmlsZXMpXG4gICAgICAgICAgICApLnBpcGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFxuICAgICAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wdXQ6ICQoZS50YXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICBmb3JtOiAkKGUudGFyZ2V0LmZvcm0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2dldEZpbGVJbnB1dEZpbGVzKGRhdGEuZmlsZUlucHV0KS5hbHdheXMoZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9IGZpbGVzO1xuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMucmVwbGFjZUZpbGVJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZXBsYWNlRmlsZUlucHV0KGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhhdC5fdHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICdjaGFuZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJC5FdmVudCgnY2hhbmdlJywge2RlbGVnYXRlZEV2ZW50OiBlfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgICAgICkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX29uQWRkKGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9vblBhc3RlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGl0ZW1zID0gZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhICYmXG4gICAgICAgICAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhLml0ZW1zLFxuICAgICAgICAgICAgICAgIGRhdGEgPSB7ZmlsZXM6IFtdfTtcbiAgICAgICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goaXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGl0ZW0uZ2V0QXNGaWxlICYmIGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYXN0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAkLkV2ZW50KCdwYXN0ZScsIHtkZWxlZ2F0ZWRFdmVudDogZX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgICAgICApICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkFkZChlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX29uRHJvcDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyID0gZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZGF0YVRyYW5zZmVyID0gZS5kYXRhVHJhbnNmZXIsXG4gICAgICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgaWYgKGRhdGFUcmFuc2ZlciAmJiBkYXRhVHJhbnNmZXIuZmlsZXMgJiYgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXREcm9wcGVkRmlsZXMoZGF0YVRyYW5zZmVyKS5hbHdheXMoZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmlsZXMgPSBmaWxlcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX3RyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Ryb3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuRXZlbnQoJ2Ryb3AnLCB7ZGVsZWdhdGVkRXZlbnQ6IGV9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICApICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fb25BZGQoZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfb25EcmFnT3ZlcjogZ2V0RHJhZ0hhbmRsZXIoJ2RyYWdvdmVyJyksXG5cbiAgICAgICAgX29uRHJhZ0VudGVyOiBnZXREcmFnSGFuZGxlcignZHJhZ2VudGVyJyksXG5cbiAgICAgICAgX29uRHJhZ0xlYXZlOiBnZXREcmFnSGFuZGxlcignZHJhZ2xlYXZlJyksXG5cbiAgICAgICAgX2luaXRFdmVudEhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNYSFJVcGxvYWQodGhpcy5vcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uKHRoaXMub3B0aW9ucy5kcm9wWm9uZSwge1xuICAgICAgICAgICAgICAgICAgICBkcmFnb3ZlcjogdGhpcy5fb25EcmFnT3ZlcixcbiAgICAgICAgICAgICAgICAgICAgZHJvcDogdGhpcy5fb25Ecm9wLFxuICAgICAgICAgICAgICAgICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIG9uIGRyYWdlbnRlciBpcyByZXF1aXJlZCBmb3IgSUUxMCs6XG4gICAgICAgICAgICAgICAgICAgIGRyYWdlbnRlcjogdGhpcy5fb25EcmFnRW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYWdsZWF2ZSBpcyBub3QgcmVxdWlyZWQsIGJ1dCBhZGRlZCBmb3IgY29tcGxldGVuZXNzOlxuICAgICAgICAgICAgICAgICAgICBkcmFnbGVhdmU6IHRoaXMuX29uRHJhZ0xlYXZlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb24odGhpcy5vcHRpb25zLnBhc3RlWm9uZSwge1xuICAgICAgICAgICAgICAgICAgICBwYXN0ZTogdGhpcy5fb25QYXN0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQuc3VwcG9ydC5maWxlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbih0aGlzLm9wdGlvbnMuZmlsZUlucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogdGhpcy5fb25DaGFuZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfZGVzdHJveUV2ZW50SGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX29mZih0aGlzLm9wdGlvbnMuZHJvcFpvbmUsICdkcmFnZW50ZXIgZHJhZ2xlYXZlIGRyYWdvdmVyIGRyb3AnKTtcbiAgICAgICAgICAgIHRoaXMuX29mZih0aGlzLm9wdGlvbnMucGFzdGVab25lLCAncGFzdGUnKTtcbiAgICAgICAgICAgIHRoaXMuX29mZih0aGlzLm9wdGlvbnMuZmlsZUlucHV0LCAnY2hhbmdlJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NldE9wdGlvbjogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZWluaXQgPSAkLmluQXJyYXkoa2V5LCB0aGlzLl9zcGVjaWFsT3B0aW9ucykgIT09IC0xO1xuICAgICAgICAgICAgaWYgKHJlaW5pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdXBlcihrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChyZWluaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0U3BlY2lhbE9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0RXZlbnRIYW5kbGVycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9pbml0U3BlY2lhbE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmlsZUlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZpbGVJbnB1dCA9IHRoaXMuZWxlbWVudC5pcygnaW5wdXRbdHlwZT1cImZpbGVcIl0nKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgOiB0aGlzLmVsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1cImZpbGVcIl0nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShvcHRpb25zLmZpbGVJbnB1dCBpbnN0YW5jZW9mICQpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlSW5wdXQgPSAkKG9wdGlvbnMuZmlsZUlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG9wdGlvbnMuZHJvcFpvbmUgaW5zdGFuY2VvZiAkKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZHJvcFpvbmUgPSAkKG9wdGlvbnMuZHJvcFpvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEob3B0aW9ucy5wYXN0ZVpvbmUgaW5zdGFuY2VvZiAkKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucGFzdGVab25lID0gJChvcHRpb25zLnBhc3RlWm9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2dldFJlZ0V4cDogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCcvJyksXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzID0gcGFydHMucG9wKCk7XG4gICAgICAgICAgICBwYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAocGFydHMuam9pbignLycpLCBtb2RpZmllcnMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9pc1JlZ0V4cE9wdGlvbjogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgIT09ICd1cmwnICYmICQudHlwZSh2YWx1ZSkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgL15cXC8uKlxcL1tpZ21dezAsM30kLy50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW5pdERhdGFBdHRyaWJ1dGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5lbGVtZW50LmRhdGEoKTtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgb3B0aW9ucyBzZXQgdmlhIEhUTUw1IGRhdGEtYXR0cmlidXRlczpcbiAgICAgICAgICAgICQuZWFjaChcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRbMF0uYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoaW5kZXgsIGF0dHIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgvXmRhdGEtLy50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgaHlwaGVuLWF0ZWQga2V5IHRvIGNhbWVsQ2FzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGtleS5zbGljZSg1KS5yZXBsYWNlKC8tW2Etel0vZywgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHIuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2lzUmVnRXhwT3B0aW9uKGtleSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGF0Ll9nZXRSZWdFeHAodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXREYXRhQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgdGhpcy5faW5pdFNwZWNpYWxPcHRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLl9zbG90cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2VxdWVuY2UgPSB0aGlzLl9nZXRYSFJQcm9taXNlKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5fc2VuZGluZyA9IHRoaXMuX2FjdGl2ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9pbml0UHJvZ3Jlc3NPYmplY3QodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9pbml0RXZlbnRIYW5kbGVycygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgdG8gdGhlIHdpZGdldCBBUEkgYW5kIGFsbG93cyB0byBxdWVyeVxuICAgICAgICAvLyB0aGUgbnVtYmVyIG9mIGFjdGl2ZSB1cGxvYWRzOlxuICAgICAgICBhY3RpdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZXhwb3NlZCB0byB0aGUgd2lkZ2V0IEFQSSBhbmQgYWxsb3dzIHRvIHF1ZXJ5XG4gICAgICAgIC8vIHRoZSB3aWRnZXQgdXBsb2FkIHByb2dyZXNzLlxuICAgICAgICAvLyBJdCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGxvYWRlZCwgdG90YWwgYW5kIGJpdHJhdGUgcHJvcGVydGllc1xuICAgICAgICAvLyBmb3IgdGhlIHJ1bm5pbmcgdXBsb2FkczpcbiAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmVzcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBleHBvc2VkIHRvIHRoZSB3aWRnZXQgQVBJIGFuZCBhbGxvd3MgYWRkaW5nIGZpbGVzXG4gICAgICAgIC8vIHVzaW5nIHRoZSBmaWxldXBsb2FkIEFQSS4gVGhlIGRhdGEgcGFyYW1ldGVyIGFjY2VwdHMgYW4gb2JqZWN0IHdoaWNoXG4gICAgICAgIC8vIG11c3QgaGF2ZSBhIGZpbGVzIHByb3BlcnR5IGFuZCBjYW4gY29udGFpbiBhZGRpdGlvbmFsIG9wdGlvbnM6XG4gICAgICAgIC8vIC5maWxldXBsb2FkKCdhZGQnLCB7ZmlsZXM6IGZpbGVzTGlzdH0pO1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgdGhpcy5vcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuZmlsZUlucHV0ICYmICFkYXRhLmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0RmlsZUlucHV0RmlsZXMoZGF0YS5maWxlSW5wdXQpLmFsd2F5cyhmdW5jdGlvbiAoZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9IGZpbGVzO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vbkFkZChudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9ICQubWFrZUFycmF5KGRhdGEuZmlsZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQWRkKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGV4cG9zZWQgdG8gdGhlIHdpZGdldCBBUEkgYW5kIGFsbG93cyBzZW5kaW5nIGZpbGVzXG4gICAgICAgIC8vIHVzaW5nIHRoZSBmaWxldXBsb2FkIEFQSS4gVGhlIGRhdGEgcGFyYW1ldGVyIGFjY2VwdHMgYW4gb2JqZWN0IHdoaWNoXG4gICAgICAgIC8vIG11c3QgaGF2ZSBhIGZpbGVzIG9yIGZpbGVJbnB1dCBwcm9wZXJ0eSBhbmQgY2FuIGNvbnRhaW4gYWRkaXRpb25hbCBvcHRpb25zOlxuICAgICAgICAvLyAuZmlsZXVwbG9hZCgnc2VuZCcsIHtmaWxlczogZmlsZXNMaXN0fSk7XG4gICAgICAgIC8vIFRoZSBtZXRob2QgcmV0dXJucyBhIFByb21pc2Ugb2JqZWN0IGZvciB0aGUgZmlsZSB1cGxvYWQgY2FsbC5cbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmICF0aGlzLm9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5maWxlSW5wdXQgJiYgIWRhdGEuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IGRmZC5wcm9taXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBqcVhIUixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqcVhIUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqcVhIUi5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlamVjdChudWxsLCAnYWJvcnQnLCAnYWJvcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRGaWxlSW5wdXRGaWxlcyhkYXRhLmZpbGVJbnB1dCkuYWx3YXlzKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlcyA9IGZpbGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpxWEhSID0gdGhhdC5fb25TZW5kKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpxWEhSLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZShyZXN1bHQsIHRleHRTdGF0dXMsIGpxWEhSKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlamVjdChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuaGFuY2VQcm9taXNlKHByb21pc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRhLmZpbGVzID0gJC5tYWtlQXJyYXkoZGF0YS5maWxlcyk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vblNlbmQobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFhIUlByb21pc2UoZmFsc2UsIGRhdGEgJiYgZGF0YS5jb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKTtcbiIsIi8qXG4gKiBqUXVlcnkgRmlsZSBVcGxvYWQgUHJvY2Vzc2luZyBQbHVnaW4gMS4zLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL2pRdWVyeS1GaWxlLVVwbG9hZFxuICpcbiAqIENvcHlyaWdodCAyMDEyLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiBqc2hpbnQgbm9tZW46ZmFsc2UgKi9cbi8qIGdsb2JhbCBkZWZpbmUsIHJlcXVpcmUsIHdpbmRvdyAqL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgQU1EIG1vZHVsZTpcbiAgICAgICAgZGVmaW5lKFtcbiAgICAgICAgICAgICdqcXVlcnknLFxuICAgICAgICAgICAgJy4vanF1ZXJ5LmZpbGV1cGxvYWQnXG4gICAgICAgIF0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlM6XG4gICAgICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsczpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHdpbmRvdy5qUXVlcnlcbiAgICAgICAgKTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIG9yaWdpbmFsQWRkID0gJC5ibHVlaW1wLmZpbGV1cGxvYWQucHJvdG90eXBlLm9wdGlvbnMuYWRkO1xuXG4gICAgLy8gVGhlIEZpbGUgVXBsb2FkIFByb2Nlc3NpbmcgcGx1Z2luIGV4dGVuZHMgdGhlIGZpbGV1cGxvYWQgd2lkZ2V0XG4gICAgLy8gd2l0aCBmaWxlIHByb2Nlc3NpbmcgZnVuY3Rpb25hbGl0eTpcbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywgJC5ibHVlaW1wLmZpbGV1cGxvYWQsIHtcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyBUaGUgbGlzdCBvZiBwcm9jZXNzaW5nIGFjdGlvbnM6XG4gICAgICAgICAgICBwcm9jZXNzUXVldWU6IFtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnbG9nJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RlYnVnJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGRhdGEucHJvY2VzcyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkdGhpcy5maWxldXBsb2FkKCdwcm9jZXNzJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxBZGQuY2FsbCh0aGlzLCBlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcm9jZXNzQWN0aW9uczoge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGxvZzogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlW29wdGlvbnMudHlwZV0oXG4gICAgICAgICAgICAgICAgICAgICdQcm9jZXNzaW5nIFwiJyArIGRhdGEuZmlsZXNbZGF0YS5pbmRleF0ubmFtZSArICdcIidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKi9cbiAgICAgICAgfSxcblxuICAgICAgICBfcHJvY2Vzc0ZpbGU6IGZ1bmN0aW9uIChkYXRhLCBvcmlnaW5hbERhdGEpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkZmQgPSAkLkRlZmVycmVkKCkucmVzb2x2ZVdpdGgodGhhdCwgW2RhdGFdKSxcbiAgICAgICAgICAgICAgICBjaGFpbiA9IGRmZC5wcm9taXNlKCk7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdwcm9jZXNzJywgbnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAkLmVhY2goZGF0YS5wcm9jZXNzUXVldWUsIGZ1bmN0aW9uIChpLCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGF0YS5lcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVqZWN0V2l0aCh0aGF0LCBbb3JpZ2luYWxEYXRhXSkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnByb2Nlc3NBY3Rpb25zW3NldHRpbmdzLmFjdGlvbl0uY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNoYWluID0gY2hhaW4ucGlwZShmdW5jLCBzZXR0aW5ncy5hbHdheXMgJiYgZnVuYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYWluXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdwcm9jZXNzZG9uZScsIG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdwcm9jZXNzYWx3YXlzJywgbnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3Byb2Nlc3NmYWlsJywgbnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3Byb2Nlc3NhbHdheXMnLCBudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXBsYWNlcyB0aGUgc2V0dGluZ3Mgb2YgZWFjaCBwcm9jZXNzUXVldWUgaXRlbSB0aGF0XG4gICAgICAgIC8vIGFyZSBzdHJpbmdzIHN0YXJ0aW5nIHdpdGggYW4gXCJAXCIsIHVzaW5nIHRoZSByZW1haW5pbmdcbiAgICAgICAgLy8gc3Vic3RyaW5nIGFzIGtleSBmb3IgdGhlIG9wdGlvbiBtYXAsXG4gICAgICAgIC8vIGUuZy4gXCJAYXV0b1VwbG9hZFwiIGlzIHJlcGxhY2VkIHdpdGggb3B0aW9ucy5hdXRvVXBsb2FkOlxuICAgICAgICBfdHJhbnNmb3JtUHJvY2Vzc1F1ZXVlOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgJC5lYWNoKG9wdGlvbnMucHJvY2Vzc1F1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge30sXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9IHRoaXMuYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXggPSB0aGlzLnByZWZpeCA9PT0gdHJ1ZSA/IGFjdGlvbiA6IHRoaXMucHJlZml4O1xuICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC50eXBlKHZhbHVlKSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGFyQXQoMCkgPT09ICdAJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Nba2V5XSA9IG9wdGlvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuc2xpY2UoMSkgfHwgKHByZWZpeCA/IHByZWZpeCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKSA6IGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NRdWV1ZS5wdXNoKHNldHRpbmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3B0aW9ucy5wcm9jZXNzUXVldWUgPSBwcm9jZXNzUXVldWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGZpbGVzIGN1cnJlbnRseSBpbiB0aGUgcHJvY2Vzc3NpbmcgcXVldWU6XG4gICAgICAgIHByb2Nlc3Npbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzaW5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFByb2Nlc3NlcyB0aGUgZmlsZXMgZ2l2ZW4gYXMgZmlsZXMgcHJvcGVydHkgb2YgdGhlIGRhdGEgcGFyYW1ldGVyLFxuICAgICAgICAvLyByZXR1cm5zIGEgUHJvbWlzZSBvYmplY3QgdGhhdCBhbGxvd3MgdG8gYmluZCBjYWxsYmFja3M6XG4gICAgICAgIHByb2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucHJvY2Vzc1F1ZXVlICYmIG9wdGlvbnMucHJvY2Vzc1F1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zZm9ybVByb2Nlc3NRdWV1ZShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvY2Vzc2luZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKCdwcm9jZXNzc3RhcnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEuZmlsZXMsIGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IGluZGV4ID8gJC5leHRlbmQoe30sIG9wdGlvbnMpIDogb3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWplY3RXaXRoKHRoYXQsIFtkYXRhXSkucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5fcHJvY2Vzc0ZpbGUob3B0cywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3Byb2Nlc3NpbmcgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fcHJvY2Vzc2luZ1F1ZXVlID0gdGhhdC5fcHJvY2Vzc2luZ1F1ZXVlLnBpcGUoZnVuYywgZnVuYylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3Byb2Nlc3NpbmcgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5fcHJvY2Vzc2luZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdwcm9jZXNzc3RvcCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NpbmdRdWV1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2luZyA9IDA7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzaW5nUXVldWUgPSAkLkRlZmVycmVkKCkucmVzb2x2ZVdpdGgodGhpcylcbiAgICAgICAgICAgICAgICAucHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkpO1xuIiwiLypcbiAqIGpRdWVyeSBGaWxlIFVwbG9hZCBJbWFnZSBQcmV2aWV3ICYgUmVzaXplIFBsdWdpbiAxLjcuM1xuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvalF1ZXJ5LUZpbGUtVXBsb2FkXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbi8qIGpzaGludCBub21lbjpmYWxzZSAqL1xuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93LCBCbG9iICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBBTUQgbW9kdWxlOlxuICAgICAgICBkZWZpbmUoW1xuICAgICAgICAgICAgJ2pxdWVyeScsXG4gICAgICAgICAgICAnbG9hZC1pbWFnZScsXG4gICAgICAgICAgICAnbG9hZC1pbWFnZS1tZXRhJyxcbiAgICAgICAgICAgICdsb2FkLWltYWdlLWV4aWYnLFxuICAgICAgICAgICAgJ2xvYWQtaW1hZ2UtaW9zJyxcbiAgICAgICAgICAgICdjYW52YXMtdG8tYmxvYicsXG4gICAgICAgICAgICAnLi9qcXVlcnkuZmlsZXVwbG9hZC1wcm9jZXNzJ1xuICAgICAgICBdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTOlxuICAgICAgICBmYWN0b3J5KFxuICAgICAgICAgICAgcmVxdWlyZSgnanF1ZXJ5JyksXG4gICAgICAgICAgICByZXF1aXJlKCdsb2FkLWltYWdlJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHM6XG4gICAgICAgIGZhY3RvcnkoXG4gICAgICAgICAgICB3aW5kb3cualF1ZXJ5LFxuICAgICAgICAgICAgd2luZG93LmxvYWRJbWFnZVxuICAgICAgICApO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQsIGxvYWRJbWFnZSkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIFByZXBlbmQgdG8gdGhlIGRlZmF1bHQgcHJvY2Vzc1F1ZXVlOlxuICAgICQuYmx1ZWltcC5maWxldXBsb2FkLnByb3RvdHlwZS5vcHRpb25zLnByb2Nlc3NRdWV1ZS51bnNoaWZ0KFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdsb2FkSW1hZ2VNZXRhRGF0YScsXG4gICAgICAgICAgICBkaXNhYmxlSW1hZ2VIZWFkOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlRXhpZjogJ0AnLFxuICAgICAgICAgICAgZGlzYWJsZUV4aWZUaHVtYm5haWw6ICdAJyxcbiAgICAgICAgICAgIGRpc2FibGVFeGlmU3ViOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlRXhpZkdwczogJ0AnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUltYWdlTWV0YURhdGFMb2FkJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdsb2FkSW1hZ2UnLFxuICAgICAgICAgICAgLy8gVXNlIHRoZSBhY3Rpb24gYXMgcHJlZml4IGZvciB0aGUgXCJAXCIgb3B0aW9uczpcbiAgICAgICAgICAgIHByZWZpeDogdHJ1ZSxcbiAgICAgICAgICAgIGZpbGVUeXBlczogJ0AnLFxuICAgICAgICAgICAgbWF4RmlsZVNpemU6ICdAJyxcbiAgICAgICAgICAgIG5vUmV2b2tlOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlSW1hZ2VMb2FkJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdyZXNpemVJbWFnZScsXG4gICAgICAgICAgICAvLyBVc2UgXCJpbWFnZVwiIGFzIHByZWZpeCBmb3IgdGhlIFwiQFwiIG9wdGlvbnM6XG4gICAgICAgICAgICBwcmVmaXg6ICdpbWFnZScsXG4gICAgICAgICAgICBtYXhXaWR0aDogJ0AnLFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiAnQCcsXG4gICAgICAgICAgICBtaW5XaWR0aDogJ0AnLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiAnQCcsXG4gICAgICAgICAgICBjcm9wOiAnQCcsXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogJ0AnLFxuICAgICAgICAgICAgZm9yY2VSZXNpemU6ICdAJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQGRpc2FibGVJbWFnZVJlc2l6ZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnc2F2ZUltYWdlJyxcbiAgICAgICAgICAgIHF1YWxpdHk6ICdAaW1hZ2VRdWFsaXR5JyxcbiAgICAgICAgICAgIHR5cGU6ICdAaW1hZ2VUeXBlJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQGRpc2FibGVJbWFnZVJlc2l6ZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnc2F2ZUltYWdlTWV0YURhdGEnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUltYWdlTWV0YURhdGFTYXZlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdyZXNpemVJbWFnZScsXG4gICAgICAgICAgICAvLyBVc2UgXCJwcmV2aWV3XCIgYXMgcHJlZml4IGZvciB0aGUgXCJAXCIgb3B0aW9uczpcbiAgICAgICAgICAgIHByZWZpeDogJ3ByZXZpZXcnLFxuICAgICAgICAgICAgbWF4V2lkdGg6ICdAJyxcbiAgICAgICAgICAgIG1heEhlaWdodDogJ0AnLFxuICAgICAgICAgICAgbWluV2lkdGg6ICdAJyxcbiAgICAgICAgICAgIG1pbkhlaWdodDogJ0AnLFxuICAgICAgICAgICAgY3JvcDogJ0AnLFxuICAgICAgICAgICAgb3JpZW50YXRpb246ICdAJyxcbiAgICAgICAgICAgIHRodW1ibmFpbDogJ0AnLFxuICAgICAgICAgICAgY2FudmFzOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlSW1hZ2VQcmV2aWV3J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdzZXRJbWFnZScsXG4gICAgICAgICAgICBuYW1lOiAnQGltYWdlUHJldmlld05hbWUnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUltYWdlUHJldmlldydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnZGVsZXRlSW1hZ2VSZWZlcmVuY2VzJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQGRpc2FibGVJbWFnZVJlZmVyZW5jZXNEZWxldGlvbidcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBUaGUgRmlsZSBVcGxvYWQgUmVzaXplIHBsdWdpbiBleHRlbmRzIHRoZSBmaWxldXBsb2FkIHdpZGdldFxuICAgIC8vIHdpdGggaW1hZ2UgcmVzaXplIGZ1bmN0aW9uYWxpdHk6XG4gICAgJC53aWRnZXQoJ2JsdWVpbXAuZmlsZXVwbG9hZCcsICQuYmx1ZWltcC5maWxldXBsb2FkLCB7XG5cbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgLy8gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgdGhlIHR5cGVzIG9mIGltYWdlcyB0byBsb2FkOlxuICAgICAgICAgICAgLy8gbWF0Y2hlZCBhZ2FpbnN0IHRoZSBmaWxlIHR5cGU6XG4gICAgICAgICAgICBsb2FkSW1hZ2VGaWxlVHlwZXM6IC9eaW1hZ2VcXC8oZ2lmfGpwZWd8cG5nfHN2Z1xcK3htbCkkLyxcbiAgICAgICAgICAgIC8vIFRoZSBtYXhpbXVtIGZpbGUgc2l6ZSBvZiBpbWFnZXMgdG8gbG9hZDpcbiAgICAgICAgICAgIGxvYWRJbWFnZU1heEZpbGVTaXplOiAxMDAwMDAwMCwgLy8gMTBNQlxuICAgICAgICAgICAgLy8gVGhlIG1heGltdW0gd2lkdGggb2YgcmVzaXplZCBpbWFnZXM6XG4gICAgICAgICAgICBpbWFnZU1heFdpZHRoOiAxOTIwLFxuICAgICAgICAgICAgLy8gVGhlIG1heGltdW0gaGVpZ2h0IG9mIHJlc2l6ZWQgaW1hZ2VzOlxuICAgICAgICAgICAgaW1hZ2VNYXhIZWlnaHQ6IDEwODAsXG4gICAgICAgICAgICAvLyBEZWZpbmVzIHRoZSBpbWFnZSBvcmllbnRhdGlvbiAoMS04KSBvciB0YWtlcyB0aGUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIC8vIHZhbHVlIGZyb20gRXhpZiBkYXRhIGlmIHNldCB0byB0cnVlOlxuICAgICAgICAgICAgaW1hZ2VPcmllbnRhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAvLyBEZWZpbmUgaWYgcmVzaXplZCBpbWFnZXMgc2hvdWxkIGJlIGNyb3BwZWQgb3Igb25seSBzY2FsZWQ6XG4gICAgICAgICAgICBpbWFnZUNyb3A6IGZhbHNlLFxuICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgcmVzaXplIGltYWdlIGZ1bmN0aW9uYWxpdHkgYnkgZGVmYXVsdDpcbiAgICAgICAgICAgIGRpc2FibGVJbWFnZVJlc2l6ZTogdHJ1ZSxcbiAgICAgICAgICAgIC8vIFRoZSBtYXhpbXVtIHdpZHRoIG9mIHRoZSBwcmV2aWV3IGltYWdlczpcbiAgICAgICAgICAgIHByZXZpZXdNYXhXaWR0aDogODAsXG4gICAgICAgICAgICAvLyBUaGUgbWF4aW11bSBoZWlnaHQgb2YgdGhlIHByZXZpZXcgaW1hZ2VzOlxuICAgICAgICAgICAgcHJldmlld01heEhlaWdodDogODAsXG4gICAgICAgICAgICAvLyBEZWZpbmVzIHRoZSBwcmV2aWV3IG9yaWVudGF0aW9uICgxLTgpIG9yIHRha2VzIHRoZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgLy8gdmFsdWUgZnJvbSBFeGlmIGRhdGEgaWYgc2V0IHRvIHRydWU6XG4gICAgICAgICAgICBwcmV2aWV3T3JpZW50YXRpb246IHRydWUsXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHByZXZpZXcgdXNpbmcgdGhlIEV4aWYgZGF0YSB0aHVtYm5haWw6XG4gICAgICAgICAgICBwcmV2aWV3VGh1bWJuYWlsOiB0cnVlLFxuICAgICAgICAgICAgLy8gRGVmaW5lIGlmIHByZXZpZXcgaW1hZ2VzIHNob3VsZCBiZSBjcm9wcGVkIG9yIG9ubHkgc2NhbGVkOlxuICAgICAgICAgICAgcHJldmlld0Nyb3A6IGZhbHNlLFxuICAgICAgICAgICAgLy8gRGVmaW5lIGlmIHByZXZpZXcgaW1hZ2VzIHNob3VsZCBiZSByZXNpemVkIGFzIGNhbnZhcyBlbGVtZW50czpcbiAgICAgICAgICAgIHByZXZpZXdDYW52YXM6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBwcm9jZXNzQWN0aW9uczoge1xuXG4gICAgICAgICAgICAvLyBMb2FkcyB0aGUgaW1hZ2UgZ2l2ZW4gdmlhIGRhdGEuZmlsZXMgYW5kIGRhdGEuaW5kZXhcbiAgICAgICAgICAgIC8vIGFzIGltZyBlbGVtZW50LCBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgRmlsZSBBUEkuXG4gICAgICAgICAgICAvLyBBY2NlcHRzIHRoZSBvcHRpb25zIGZpbGVUeXBlcyAocmVndWxhciBleHByZXNzaW9uKVxuICAgICAgICAgICAgLy8gYW5kIG1heEZpbGVTaXplIChpbnRlZ2VyKSB0byBsaW1pdCB0aGUgZmlsZXMgdG8gbG9hZDpcbiAgICAgICAgICAgIGxvYWRJbWFnZTogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlc1tkYXRhLmluZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGlmICgoJC50eXBlKG9wdGlvbnMubWF4RmlsZVNpemUpID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuc2l6ZSA+IG9wdGlvbnMubWF4RmlsZVNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAob3B0aW9ucy5maWxlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhb3B0aW9ucy5maWxlVHlwZXMudGVzdChmaWxlLnR5cGUpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgIWxvYWRJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltZy5zcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaW1nID0gaW1nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGF0LCBbZGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBSZXNpemVzIHRoZSBpbWFnZSBnaXZlbiBhcyBkYXRhLmNhbnZhcyBvciBkYXRhLmltZ1xuICAgICAgICAgICAgLy8gYW5kIHVwZGF0ZXMgZGF0YS5jYW52YXMgb3IgZGF0YS5pbWcgd2l0aCB0aGUgcmVzaXplZCBpbWFnZS5cbiAgICAgICAgICAgIC8vIEFsc28gc3RvcmVzIHRoZSByZXNpemVkIGltYWdlIGFzIHByZXZpZXcgcHJvcGVydHkuXG4gICAgICAgICAgICAvLyBBY2NlcHRzIHRoZSBvcHRpb25zIG1heFdpZHRoLCBtYXhIZWlnaHQsIG1pbldpZHRoLFxuICAgICAgICAgICAgLy8gbWluSGVpZ2h0LCBjYW52YXMgYW5kIGNyb3A6XG4gICAgICAgICAgICByZXNpemVJbWFnZTogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kaXNhYmxlZCB8fCAhKGRhdGEuY2FudmFzIHx8IGRhdGEuaW1nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtjYW52YXM6IHRydWV9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgaW1nID0gKG9wdGlvbnMuY2FudmFzICYmIGRhdGEuY2FudmFzKSB8fCBkYXRhLmltZyxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IGZ1bmN0aW9uIChuZXdJbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbWcgJiYgKG5ld0ltZy53aWR0aCAhPT0gaW1nLndpZHRoIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ltZy5oZWlnaHQgIT09IGltZy5oZWlnaHQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JjZVJlc2l6ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW25ld0ltZy5nZXRDb250ZXh0ID8gJ2NhbnZhcycgOiAnaW1nJ10gPSBuZXdJbWc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnByZXZpZXcgPSBuZXdJbWc7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhhdCwgW2RhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmV4aWYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMub3JpZW50YXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub3JpZW50YXRpb24gPSBkYXRhLmV4aWYuZ2V0KCdPcmllbnRhdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsID0gZGF0YS5leGlmLmdldCgnVGh1bWJuYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGh1bWJuYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZEltYWdlKHRodW1ibmFpbCwgcmVzb2x2ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBvcmllbnRpbmcgdGhlIHNhbWUgaW1hZ2UgdHdpY2U6XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEub3JpZW50YXRpb24gPSBvcHRpb25zLm9yaWVudGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShsb2FkSW1hZ2Uuc2NhbGUoaW1nLCBvcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIFNhdmVzIHRoZSBwcm9jZXNzZWQgaW1hZ2UgZ2l2ZW4gYXMgZGF0YS5jYW52YXNcbiAgICAgICAgICAgIC8vIGlucGxhY2UgYXQgZGF0YS5pbmRleCBvZiBkYXRhLmZpbGVzOlxuICAgICAgICAgICAgc2F2ZUltYWdlOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICghZGF0YS5jYW52YXMgfHwgb3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBmaWxlID0gZGF0YS5maWxlc1tkYXRhLmluZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgZGZkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNhbnZhcy50b0Jsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jYW52YXMudG9CbG9iKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJsb2IubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS50eXBlID09PSBibG9iLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2IubmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2IubmFtZSA9IGZpbGUubmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9cXC5cXHcrJC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy4nICsgYmxvYi50eXBlLnN1YnN0cig2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCByZXN0b3JlIGludmFsaWQgbWV0YSBkYXRhOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnR5cGUgIT09IGJsb2IudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGF0YS5pbWFnZUhlYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBjcmVhdGVkIGJsb2IgYXQgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgdGhlIG9yaWdpbmFsIGZpbGUgaW4gdGhlIGZpbGVzIGxpc3Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlc1tkYXRhLmluZGV4XSA9IGJsb2I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoYXQsIFtkYXRhXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlIHx8IGZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucXVhbGl0eVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGZkLnByb21pc2UoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGxvYWRJbWFnZU1ldGFEYXRhOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGRmZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICBsb2FkSW1hZ2UucGFyc2VNZXRhRGF0YShkYXRhLmZpbGVzW2RhdGEuaW5kZXhdLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKGRhdGEsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGF0LCBbZGF0YV0pO1xuICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2F2ZUltYWdlTWV0YURhdGE6IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoZGF0YS5pbWFnZUhlYWQgJiYgZGF0YS5jYW52YXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY2FudmFzLnRvQmxvYiAmJiAhb3B0aW9ucy5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZGF0YS5maWxlc1tkYXRhLmluZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgYmxvYiA9IG5ldyBCbG9iKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaW1hZ2VIZWFkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzaXplZCBpbWFnZXMgYWx3YXlzIGhhdmUgYSBoZWFkIHNpemUgb2YgMjAgYnl0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbmNsdWRpbmcgdGhlIEpQRUcgbWFya2VyIGFuZCBhIG1pbmltYWwgSkZJRiBoZWFkZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9iU2xpY2UuY2FsbChmaWxlLCAyMClcbiAgICAgICAgICAgICAgICAgICAgXSwge3R5cGU6IGZpbGUudHlwZX0pO1xuICAgICAgICAgICAgICAgIGJsb2IubmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgICAgICAgICBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdID0gYmxvYjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIFNldHMgdGhlIHJlc2l6ZWQgdmVyc2lvbiBvZiB0aGUgaW1hZ2UgYXMgYSBwcm9wZXJ0eSBvZiB0aGVcbiAgICAgICAgICAgIC8vIGZpbGUgb2JqZWN0LCBtdXN0IGJlIGNhbGxlZCBhZnRlciBcInNhdmVJbWFnZVwiOlxuICAgICAgICAgICAgc2V0SW1hZ2U6IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHJldmlldyAmJiAhb3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdW29wdGlvbnMubmFtZSB8fCAncHJldmlldyddID0gZGF0YS5wcmV2aWV3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRlbGV0ZUltYWdlUmVmZXJlbmNlczogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEuaW1nO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGF0YS5jYW52YXM7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhLnByZXZpZXc7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhLmltYWdlSGVhZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKTtcbiIsIi8qXG4gKiBqUXVlcnkgRmlsZSBVcGxvYWQgQXVkaW8gUHJldmlldyBQbHVnaW4gMS4wLjRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL2pRdWVyeS1GaWxlLVVwbG9hZFxuICpcbiAqIENvcHlyaWdodCAyMDEzLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiBqc2hpbnQgbm9tZW46ZmFsc2UgKi9cbi8qIGdsb2JhbCBkZWZpbmUsIHJlcXVpcmUsIHdpbmRvdywgZG9jdW1lbnQgKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIEFNRCBtb2R1bGU6XG4gICAgICAgIGRlZmluZShbXG4gICAgICAgICAgICAnanF1ZXJ5JyxcbiAgICAgICAgICAgICdsb2FkLWltYWdlJyxcbiAgICAgICAgICAgICcuL2pxdWVyeS5maWxldXBsb2FkLXByb2Nlc3MnXG4gICAgICAgIF0sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlM6XG4gICAgICAgIGZhY3RvcnkoXG4gICAgICAgICAgICByZXF1aXJlKCdqcXVlcnknKSxcbiAgICAgICAgICAgIHJlcXVpcmUoJ2xvYWQtaW1hZ2UnKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsczpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHdpbmRvdy5qUXVlcnksXG4gICAgICAgICAgICB3aW5kb3cubG9hZEltYWdlXG4gICAgICAgICk7XG4gICAgfVxufShmdW5jdGlvbiAoJCwgbG9hZEltYWdlKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gUHJlcGVuZCB0byB0aGUgZGVmYXVsdCBwcm9jZXNzUXVldWU6XG4gICAgJC5ibHVlaW1wLmZpbGV1cGxvYWQucHJvdG90eXBlLm9wdGlvbnMucHJvY2Vzc1F1ZXVlLnVuc2hpZnQoXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2xvYWRBdWRpbycsXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGFjdGlvbiBhcyBwcmVmaXggZm9yIHRoZSBcIkBcIiBvcHRpb25zOlxuICAgICAgICAgICAgcHJlZml4OiB0cnVlLFxuICAgICAgICAgICAgZmlsZVR5cGVzOiAnQCcsXG4gICAgICAgICAgICBtYXhGaWxlU2l6ZTogJ0AnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZUF1ZGlvUHJldmlldydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnc2V0QXVkaW8nLFxuICAgICAgICAgICAgbmFtZTogJ0BhdWRpb1ByZXZpZXdOYW1lJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQGRpc2FibGVBdWRpb1ByZXZpZXcnXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gVGhlIEZpbGUgVXBsb2FkIEF1ZGlvIFByZXZpZXcgcGx1Z2luIGV4dGVuZHMgdGhlIGZpbGV1cGxvYWQgd2lkZ2V0XG4gICAgLy8gd2l0aCBhdWRpbyBwcmV2aWV3IGZ1bmN0aW9uYWxpdHk6XG4gICAgJC53aWRnZXQoJ2JsdWVpbXAuZmlsZXVwbG9hZCcsICQuYmx1ZWltcC5maWxldXBsb2FkLCB7XG5cbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgLy8gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgdGhlIHR5cGVzIG9mIGF1ZGlvIGZpbGVzIHRvIGxvYWQsXG4gICAgICAgICAgICAvLyBtYXRjaGVkIGFnYWluc3QgdGhlIGZpbGUgdHlwZTpcbiAgICAgICAgICAgIGxvYWRBdWRpb0ZpbGVUeXBlczogL15hdWRpb1xcLy4qJC9cbiAgICAgICAgfSxcblxuICAgICAgICBfYXVkaW9FbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpLFxuXG4gICAgICAgIHByb2Nlc3NBY3Rpb25zOiB7XG5cbiAgICAgICAgICAgIC8vIExvYWRzIHRoZSBhdWRpbyBmaWxlIGdpdmVuIHZpYSBkYXRhLmZpbGVzIGFuZCBkYXRhLmluZGV4XG4gICAgICAgICAgICAvLyBhcyBhdWRpbyBlbGVtZW50IGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHBsYXlpbmcgaXQuXG4gICAgICAgICAgICAvLyBBY2NlcHRzIHRoZSBvcHRpb25zIGZpbGVUeXBlcyAocmVndWxhciBleHByZXNzaW9uKVxuICAgICAgICAgICAgLy8gYW5kIG1heEZpbGVTaXplIChpbnRlZ2VyKSB0byBsaW1pdCB0aGUgZmlsZXMgdG8gbG9hZDpcbiAgICAgICAgICAgIGxvYWRBdWRpbzogZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBkYXRhLmZpbGVzW2RhdGEuaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hdWRpb0VsZW1lbnQuY2FuUGxheVR5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1ZGlvRWxlbWVudC5jYW5QbGF5VHlwZShmaWxlLnR5cGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoJC50eXBlKG9wdGlvbnMubWF4RmlsZVNpemUpICE9PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuc2l6ZSA8PSBvcHRpb25zLm1heEZpbGVTaXplKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKCFvcHRpb25zLmZpbGVUeXBlcyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZVR5cGVzLnRlc3QoZmlsZS50eXBlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gbG9hZEltYWdlLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW8gPSB0aGlzLl9hdWRpb0VsZW1lbnQuY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvLnNyYyA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvLmNvbnRyb2xzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXVkaW8gPSBhdWRpbztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gU2V0cyB0aGUgYXVkaW8gZWxlbWVudCBhcyBhIHByb3BlcnR5IG9mIHRoZSBmaWxlIG9iamVjdDpcbiAgICAgICAgICAgIHNldEF1ZGlvOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmF1ZGlvICYmICFvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmlsZXNbZGF0YS5pbmRleF1bb3B0aW9ucy5uYW1lIHx8ICdwcmV2aWV3J10gPSBkYXRhLmF1ZGlvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkpO1xuIiwiLypcbiAqIGpRdWVyeSBGaWxlIFVwbG9hZCBWaWRlbyBQcmV2aWV3IFBsdWdpbiAxLjAuNFxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvalF1ZXJ5LUZpbGUtVXBsb2FkXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIFNlYmFzdGlhbiBUc2NoYW5cbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbi8qIGpzaGludCBub21lbjpmYWxzZSAqL1xuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93LCBkb2N1bWVudCAqL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgQU1EIG1vZHVsZTpcbiAgICAgICAgZGVmaW5lKFtcbiAgICAgICAgICAgICdqcXVlcnknLFxuICAgICAgICAgICAgJ2xvYWQtaW1hZ2UnLFxuICAgICAgICAgICAgJy4vanF1ZXJ5LmZpbGV1cGxvYWQtcHJvY2VzcydcbiAgICAgICAgXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KUzpcbiAgICAgICAgZmFjdG9yeShcbiAgICAgICAgICAgIHJlcXVpcmUoJ2pxdWVyeScpLFxuICAgICAgICAgICAgcmVxdWlyZSgnbG9hZC1pbWFnZScpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzOlxuICAgICAgICBmYWN0b3J5KFxuICAgICAgICAgICAgd2luZG93LmpRdWVyeSxcbiAgICAgICAgICAgIHdpbmRvdy5sb2FkSW1hZ2VcbiAgICAgICAgKTtcbiAgICB9XG59KGZ1bmN0aW9uICgkLCBsb2FkSW1hZ2UpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBQcmVwZW5kIHRvIHRoZSBkZWZhdWx0IHByb2Nlc3NRdWV1ZTpcbiAgICAkLmJsdWVpbXAuZmlsZXVwbG9hZC5wcm90b3R5cGUub3B0aW9ucy5wcm9jZXNzUXVldWUudW5zaGlmdChcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnbG9hZFZpZGVvJyxcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgYWN0aW9uIGFzIHByZWZpeCBmb3IgdGhlIFwiQFwiIG9wdGlvbnM6XG4gICAgICAgICAgICBwcmVmaXg6IHRydWUsXG4gICAgICAgICAgICBmaWxlVHlwZXM6ICdAJyxcbiAgICAgICAgICAgIG1heEZpbGVTaXplOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlVmlkZW9QcmV2aWV3J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb246ICdzZXRWaWRlbycsXG4gICAgICAgICAgICBuYW1lOiAnQHZpZGVvUHJldmlld05hbWUnLFxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdAZGlzYWJsZVZpZGVvUHJldmlldydcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBUaGUgRmlsZSBVcGxvYWQgVmlkZW8gUHJldmlldyBwbHVnaW4gZXh0ZW5kcyB0aGUgZmlsZXVwbG9hZCB3aWRnZXRcbiAgICAvLyB3aXRoIHZpZGVvIHByZXZpZXcgZnVuY3Rpb25hbGl0eTpcbiAgICAkLndpZGdldCgnYmx1ZWltcC5maWxldXBsb2FkJywgJC5ibHVlaW1wLmZpbGV1cGxvYWQsIHtcblxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAvLyBUaGUgcmVndWxhciBleHByZXNzaW9uIGZvciB0aGUgdHlwZXMgb2YgdmlkZW8gZmlsZXMgdG8gbG9hZCxcbiAgICAgICAgICAgIC8vIG1hdGNoZWQgYWdhaW5zdCB0aGUgZmlsZSB0eXBlOlxuICAgICAgICAgICAgbG9hZFZpZGVvRmlsZVR5cGVzOiAvXnZpZGVvXFwvLiokL1xuICAgICAgICB9LFxuXG4gICAgICAgIF92aWRlb0VsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyksXG5cbiAgICAgICAgcHJvY2Vzc0FjdGlvbnM6IHtcblxuICAgICAgICAgICAgLy8gTG9hZHMgdGhlIHZpZGVvIGZpbGUgZ2l2ZW4gdmlhIGRhdGEuZmlsZXMgYW5kIGRhdGEuaW5kZXhcbiAgICAgICAgICAgIC8vIGFzIHZpZGVvIGVsZW1lbnQgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgcGxheWluZyBpdC5cbiAgICAgICAgICAgIC8vIEFjY2VwdHMgdGhlIG9wdGlvbnMgZmlsZVR5cGVzIChyZWd1bGFyIGV4cHJlc3Npb24pXG4gICAgICAgICAgICAvLyBhbmQgbWF4RmlsZVNpemUgKGludGVnZXIpIHRvIGxpbWl0IHRoZSBmaWxlcyB0byBsb2FkOlxuICAgICAgICAgICAgbG9hZFZpZGVvOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGRhdGEuZmlsZXNbZGF0YS5pbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgdmlkZW87XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvRWxlbWVudC5jYW5QbGF5VHlwZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9FbGVtZW50LmNhblBsYXlUeXBlKGZpbGUudHlwZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICgkLnR5cGUob3B0aW9ucy5tYXhGaWxlU2l6ZSkgIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5zaXplIDw9IG9wdGlvbnMubWF4RmlsZVNpemUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoIW9wdGlvbnMuZmlsZVR5cGVzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlVHlwZXMudGVzdChmaWxlLnR5cGUpKSkge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSBsb2FkSW1hZ2UuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlbyA9IHRoaXMuX3ZpZGVvRWxlbWVudC5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW8uc3JjID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW8uY29udHJvbHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS52aWRlbyA9IHZpZGVvO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBTZXRzIHRoZSB2aWRlbyBlbGVtZW50IGFzIGEgcHJvcGVydHkgb2YgdGhlIGZpbGUgb2JqZWN0OlxuICAgICAgICAgICAgc2V0VmlkZW86IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudmlkZW8gJiYgIW9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlc1tkYXRhLmluZGV4XVtvcHRpb25zLm5hbWUgfHwgJ3ByZXZpZXcnXSA9IGRhdGEudmlkZW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KSk7XG4iLCIvKlxuICogalF1ZXJ5IEZpbGUgVXBsb2FkIFZhbGlkYXRpb24gUGx1Z2luIDEuMS4zXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9qUXVlcnktRmlsZS1VcGxvYWRcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMywgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgd2luZG93ICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBBTUQgbW9kdWxlOlxuICAgICAgICBkZWZpbmUoW1xuICAgICAgICAgICAgJ2pxdWVyeScsXG4gICAgICAgICAgICAnLi9qcXVlcnkuZmlsZXVwbG9hZC1wcm9jZXNzJ1xuICAgICAgICBdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTOlxuICAgICAgICBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHM6XG4gICAgICAgIGZhY3RvcnkoXG4gICAgICAgICAgICB3aW5kb3cualF1ZXJ5XG4gICAgICAgICk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIEFwcGVuZCB0byB0aGUgZGVmYXVsdCBwcm9jZXNzUXVldWU6XG4gICAgJC5ibHVlaW1wLmZpbGV1cGxvYWQucHJvdG90eXBlLm9wdGlvbnMucHJvY2Vzc1F1ZXVlLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3ZhbGlkYXRlJyxcbiAgICAgICAgICAgIC8vIEFsd2F5cyB0cmlnZ2VyIHRoaXMgYWN0aW9uLFxuICAgICAgICAgICAgLy8gZXZlbiBpZiB0aGUgcHJldmlvdXMgYWN0aW9uIHdhcyByZWplY3RlZDogXG4gICAgICAgICAgICBhbHdheXM6IHRydWUsXG4gICAgICAgICAgICAvLyBPcHRpb25zIHRha2VuIGZyb20gdGhlIGdsb2JhbCBvcHRpb25zIG1hcDpcbiAgICAgICAgICAgIGFjY2VwdEZpbGVUeXBlczogJ0AnLFxuICAgICAgICAgICAgbWF4RmlsZVNpemU6ICdAJyxcbiAgICAgICAgICAgIG1pbkZpbGVTaXplOiAnQCcsXG4gICAgICAgICAgICBtYXhOdW1iZXJPZkZpbGVzOiAnQCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogJ0BkaXNhYmxlVmFsaWRhdGlvbidcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBUaGUgRmlsZSBVcGxvYWQgVmFsaWRhdGlvbiBwbHVnaW4gZXh0ZW5kcyB0aGUgZmlsZXVwbG9hZCB3aWRnZXRcbiAgICAvLyB3aXRoIGZpbGUgdmFsaWRhdGlvbiBmdW5jdGlvbmFsaXR5OlxuICAgICQud2lkZ2V0KCdibHVlaW1wLmZpbGV1cGxvYWQnLCAkLmJsdWVpbXAuZmlsZXVwbG9hZCwge1xuXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAvLyBUaGUgcmVndWxhciBleHByZXNzaW9uIGZvciBhbGxvd2VkIGZpbGUgdHlwZXMsIG1hdGNoZXNcbiAgICAgICAgICAgIC8vIGFnYWluc3QgZWl0aGVyIGZpbGUgdHlwZSBvciBmaWxlIG5hbWU6XG4gICAgICAgICAgICBhY2NlcHRGaWxlVHlwZXM6IC8oXFwufFxcLykoZ2lmfGpwZT9nfHBuZykkL2ksXG4gICAgICAgICAgICAvLyBUaGUgbWF4aW11bSBhbGxvd2VkIGZpbGUgc2l6ZSBpbiBieXRlczpcbiAgICAgICAgICAgIG1heEZpbGVTaXplOiAxMDAwMDAwMCwgLy8gMTAgTUJcbiAgICAgICAgICAgIC8vIFRoZSBtaW5pbXVtIGFsbG93ZWQgZmlsZSBzaXplIGluIGJ5dGVzOlxuICAgICAgICAgICAgbWluRmlsZVNpemU6IHVuZGVmaW5lZCwgLy8gTm8gbWluaW1hbCBmaWxlIHNpemVcbiAgICAgICAgICAgIC8vIFRoZSBsaW1pdCBvZiBmaWxlcyB0byBiZSB1cGxvYWRlZDpcbiAgICAgICAgICAgIG1heE51bWJlck9mRmlsZXM6IDEwLFxuICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gRnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBjdXJyZW50IG51bWJlciBvZiBmaWxlcyxcbiAgICAgICAgICAgIC8vIGhhcyB0byBiZSBvdmVycmlkZW4gZm9yIG1heE51bWJlck9mRmlsZXMgdmFsaWRhdGlvbjpcbiAgICAgICAgICAgIGdldE51bWJlck9mRmlsZXM6ICQubm9vcCxcblxuICAgICAgICAgICAgLy8gRXJyb3IgYW5kIGluZm8gbWVzc2FnZXM6XG4gICAgICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG1heE51bWJlck9mRmlsZXM6ICdNYXhpbXVtIG51bWJlciBvZiBmaWxlcyBleGNlZWRlZCcsXG4gICAgICAgICAgICAgICAgYWNjZXB0RmlsZVR5cGVzOiAnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJyxcbiAgICAgICAgICAgICAgICBtYXhGaWxlU2l6ZTogJ0ZpbGUgaXMgdG9vIGxhcmdlJyxcbiAgICAgICAgICAgICAgICBtaW5GaWxlU2l6ZTogJ0ZpbGUgaXMgdG9vIHNtYWxsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHByb2Nlc3NBY3Rpb25zOiB7XG5cbiAgICAgICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZSA9IGRhdGEuZmlsZXNbZGF0YS5pbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIGZpbGVTaXplO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1pbkZpbGVTaXplIHx8IG9wdGlvbnMubWF4RmlsZVNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVNpemUgPSBmaWxlLnNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgkLnR5cGUob3B0aW9ucy5tYXhOdW1iZXJPZkZpbGVzKSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChzZXR0aW5ncy5nZXROdW1iZXJPZkZpbGVzKCkgfHwgMCkgKyBkYXRhLmZpbGVzLmxlbmd0aCA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5tYXhOdW1iZXJPZkZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGUuZXJyb3IgPSBzZXR0aW5ncy5pMThuKCdtYXhOdW1iZXJPZkZpbGVzJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmFjY2VwdEZpbGVUeXBlcyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIShvcHRpb25zLmFjY2VwdEZpbGVUeXBlcy50ZXN0KGZpbGUudHlwZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYWNjZXB0RmlsZVR5cGVzLnRlc3QoZmlsZS5uYW1lKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5lcnJvciA9IHNldHRpbmdzLmkxOG4oJ2FjY2VwdEZpbGVUeXBlcycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZVNpemUgPiBvcHRpb25zLm1heEZpbGVTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGUuZXJyb3IgPSBzZXR0aW5ncy5pMThuKCdtYXhGaWxlU2l6ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJC50eXBlKGZpbGVTaXplKSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTaXplIDwgb3B0aW9ucy5taW5GaWxlU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gc2V0dGluZ3MuaTE4bignbWluRmlsZVNpemUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZmlsZS5lcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuZXJyb3IgfHwgZGF0YS5maWxlcy5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmZpbGVzLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZGZkLnJlamVjdFdpdGgodGhpcywgW2RhdGFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pKTtcbiIsIi8qXG4gKiBqUXVlcnkgRmlsZSBVcGxvYWQgVXNlciBJbnRlcmZhY2UgUGx1Z2luIDkuNi4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9qUXVlcnktRmlsZS1VcGxvYWRcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMCwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyoganNoaW50IG5vbWVuOmZhbHNlICovXG4vKiBnbG9iYWwgZGVmaW5lLCByZXF1aXJlLCB3aW5kb3cgKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIEFNRCBtb2R1bGU6XG4gICAgICAgIGRlZmluZShbXG4gICAgICAgICAgICAnanF1ZXJ5JyxcbiAgICAgICAgICAgICd0bXBsJyxcbiAgICAgICAgICAgICcuL2pxdWVyeS5maWxldXBsb2FkLWltYWdlJyxcbiAgICAgICAgICAgICcuL2pxdWVyeS5maWxldXBsb2FkLWF1ZGlvJyxcbiAgICAgICAgICAgICcuL2pxdWVyeS5maWxldXBsb2FkLXZpZGVvJyxcbiAgICAgICAgICAgICcuL2pxdWVyeS5maWxldXBsb2FkLXZhbGlkYXRlJ1xuICAgICAgICBdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTOlxuICAgICAgICBmYWN0b3J5KFxuICAgICAgICAgICAgcmVxdWlyZSgnanF1ZXJ5JyksXG4gICAgICAgICAgICByZXF1aXJlKCd0bXBsJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHM6XG4gICAgICAgIGZhY3RvcnkoXG4gICAgICAgICAgICB3aW5kb3cualF1ZXJ5LFxuICAgICAgICAgICAgd2luZG93LnRtcGxcbiAgICAgICAgKTtcbiAgICB9XG59KGZ1bmN0aW9uICgkLCB0bXBsKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgJC5ibHVlaW1wLmZpbGV1cGxvYWQucHJvdG90eXBlLl9zcGVjaWFsT3B0aW9ucy5wdXNoKFxuICAgICAgICAnZmlsZXNDb250YWluZXInLFxuICAgICAgICAndXBsb2FkVGVtcGxhdGVJZCcsXG4gICAgICAgICdkb3dubG9hZFRlbXBsYXRlSWQnXG4gICAgKTtcblxuICAgIC8vIFRoZSBVSSB2ZXJzaW9uIGV4dGVuZHMgdGhlIGZpbGUgdXBsb2FkIHdpZGdldFxuICAgIC8vIGFuZCBhZGRzIGNvbXBsZXRlIHVzZXIgaW50ZXJmYWNlIGludGVyYWN0aW9uOlxuICAgICQud2lkZ2V0KCdibHVlaW1wLmZpbGV1cGxvYWQnLCAkLmJsdWVpbXAuZmlsZXVwbG9hZCwge1xuXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIGZpbGVzIGFkZGVkIHRvIHRoZSB3aWRnZXQgYXJlIHVwbG9hZGVkIGFzIHNvb25cbiAgICAgICAgICAgIC8vIGFzIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgc3RhcnQgYnV0dG9ucy4gVG8gZW5hYmxlIGF1dG9tYXRpY1xuICAgICAgICAgICAgLy8gdXBsb2Fkcywgc2V0IHRoZSBmb2xsb3dpbmcgb3B0aW9uIHRvIHRydWU6XG4gICAgICAgICAgICBhdXRvVXBsb2FkOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFRoZSBJRCBvZiB0aGUgdXBsb2FkIHRlbXBsYXRlOlxuICAgICAgICAgICAgdXBsb2FkVGVtcGxhdGVJZDogJ3RlbXBsYXRlLXVwbG9hZCcsXG4gICAgICAgICAgICAvLyBUaGUgSUQgb2YgdGhlIGRvd25sb2FkIHRlbXBsYXRlOlxuICAgICAgICAgICAgZG93bmxvYWRUZW1wbGF0ZUlkOiAndGVtcGxhdGUtZG93bmxvYWQnLFxuICAgICAgICAgICAgLy8gVGhlIGNvbnRhaW5lciBmb3IgdGhlIGxpc3Qgb2YgZmlsZXMuIElmIHVuZGVmaW5lZCwgaXQgaXMgc2V0IHRvXG4gICAgICAgICAgICAvLyBhbiBlbGVtZW50IHdpdGggY2xhc3MgXCJmaWxlc1wiIGluc2lkZSBvZiB0aGUgd2lkZ2V0IGVsZW1lbnQ6XG4gICAgICAgICAgICBmaWxlc0NvbnRhaW5lcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgZmlsZXMgYXJlIGFwcGVuZGVkIHRvIHRoZSBmaWxlcyBjb250YWluZXIuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZvbGxvd2luZyBvcHRpb24gdG8gdHJ1ZSwgdG8gcHJlcGVuZCBmaWxlcyBpbnN0ZWFkOlxuICAgICAgICAgICAgcHJlcGVuZEZpbGVzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFRoZSBleHBlY3RlZCBkYXRhIHR5cGUgb2YgdGhlIHVwbG9hZCByZXNwb25zZSwgc2V0cyB0aGUgZGF0YVR5cGVcbiAgICAgICAgICAgIC8vIG9wdGlvbiBvZiB0aGUgJC5hamF4IHVwbG9hZCByZXF1ZXN0czpcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEVycm9yIGFuZCBpbmZvIG1lc3NhZ2VzOlxuICAgICAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICB1bmtub3duRXJyb3I6ICdVbmtub3duIGVycm9yJyAgXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBGdW5jdGlvbiByZXR1cm5pbmcgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGZpbGVzLFxuICAgICAgICAgICAgLy8gdXNlZCBieSB0aGUgbWF4TnVtYmVyT2ZGaWxlcyB2YWxpZGF0aW9uOlxuICAgICAgICAgICAgZ2V0TnVtYmVyT2ZGaWxlczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVzQ29udGFpbmVyLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vdCgnLnByb2Nlc3NpbmcnKS5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvLyBDYWxsYmFjayB0byByZXRyaWV2ZSB0aGUgbGlzdCBvZiBmaWxlcyBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2U6XG4gICAgICAgICAgICBnZXRGaWxlc0Zyb21SZXNwb25zZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQgJiYgJC5pc0FycmF5KGRhdGEucmVzdWx0LmZpbGVzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5yZXN1bHQuZmlsZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8vIFRoZSBhZGQgY2FsbGJhY2sgaXMgaW52b2tlZCBhcyBzb29uIGFzIGZpbGVzIGFyZSBhZGRlZCB0byB0aGUgZmlsZXVwbG9hZFxuICAgICAgICAgICAgLy8gd2lkZ2V0ICh2aWEgZmlsZSBpbnB1dCBzZWxlY3Rpb24sIGRyYWcgJiBkcm9wIG9yIGFkZCBBUEkgY2FsbCkuXG4gICAgICAgICAgICAvLyBTZWUgdGhlIGJhc2ljIGZpbGUgdXBsb2FkIHdpZGdldCBmb3IgbW9yZSBpbmZvcm1hdGlvbjpcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRoYXQgPSAkdGhpcy5kYXRhKCdibHVlaW1wLWZpbGV1cGxvYWQnKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuZGF0YSgnZmlsZXVwbG9hZCcpLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gdGhhdC5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dCA9IHRoYXQuX3JlbmRlclVwbG9hZChkYXRhLmZpbGVzKVxuICAgICAgICAgICAgICAgICAgICAuZGF0YSgnZGF0YScsIGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygncHJvY2Vzc2luZycpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZXNDb250YWluZXJbXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHJlcGVuZEZpbGVzID8gJ3ByZXBlbmQnIDogJ2FwcGVuZCdcbiAgICAgICAgICAgICAgICBdKGRhdGEuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgdGhhdC5fZm9yY2VSZWZsb3coZGF0YS5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKGRhdGEuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgZGF0YS5wcm9jZXNzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICR0aGlzLmZpbGV1cGxvYWQoJ3Byb2Nlc3MnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLnNpemUnKS50ZXh0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2Zvcm1hdEZpbGVTaXplKGRhdGEuZmlsZXNbaW5kZXhdLnNpemUpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KS5yZW1vdmVDbGFzcygncHJvY2Vzc2luZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9yZW5kZXJQcmV2aWV3cyhkYXRhKTtcbiAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0LmZpbmQoJy5zdGFydCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHRoYXQuX3RyaWdnZXIoJ2FkZGVkJywgZSwgZGF0YSkgIT09IGZhbHNlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRpb25zLmF1dG9VcGxvYWQgfHwgZGF0YS5hdXRvVXBsb2FkKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXV0b1VwbG9hZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuc3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZmlsZXMuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IGRhdGEuZmlsZXNbaW5kZXhdLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5lcnJvcicpLnRleHQoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHRoZSBzdGFydCBvZiBlYWNoIGZpbGUgdXBsb2FkIHJlcXVlc3Q6XG4gICAgICAgICAgICBzZW5kOiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLmRhdGEoJ2JsdWVpbXAtZmlsZXVwbG9hZCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2ZpbGV1cGxvYWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb250ZXh0ICYmIGRhdGEuZGF0YVR5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZGF0YVR5cGUuc3Vic3RyKDAsIDYpID09PSAnaWZyYW1lJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZnJhbWUgVHJhbnNwb3J0IGRvZXMgbm90IHN1cHBvcnQgcHJvZ3Jlc3MgZXZlbnRzLlxuICAgICAgICAgICAgICAgICAgICAvLyBJbiBsYWNrIG9mIGFuIGluZGV0ZXJtaW5hdGUgcHJvZ3Jlc3MgYmFyLCB3ZSBzZXRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHByb2dyZXNzIHRvIDEwMCUsIHNob3dpbmcgdGhlIGZ1bGwgYW5pbWF0ZWQgYmFyOlxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcucHJvZ3Jlc3MnKS5hZGRDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgJ3Byb2dyZXNzLWFuaW1hdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCAxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKS5maXJzdCgpLmNzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcxMDAlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuX3RyaWdnZXIoJ3NlbnQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3Igc3VjY2Vzc2Z1bCB1cGxvYWRzOlxuICAgICAgICAgICAgZG9uZTogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5kYXRhKCdibHVlaW1wLWZpbGV1cGxvYWQnKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdmaWxldXBsb2FkJyksXG4gICAgICAgICAgICAgICAgICAgIGdldEZpbGVzRnJvbVJlc3BvbnNlID0gZGF0YS5nZXRGaWxlc0Zyb21SZXNwb25zZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcHRpb25zLmdldEZpbGVzRnJvbVJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICBmaWxlcyA9IGdldEZpbGVzRnJvbVJlc3BvbnNlKGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZmlsZXNbaW5kZXhdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlcnJvcjogJ0VtcHR5IGZpbGUgdXBsb2FkIHJlc3VsdCd9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQgPSB0aGF0Ll9hZGRGaW5pc2hlZERlZmVycmVkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJhbnNpdGlvbigkKHRoaXMpKS5kb25lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRoYXQuX3JlbmRlckRvd25sb2FkKFtmaWxlXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9mb3JjZVJlZmxvdyh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyYW5zaXRpb24odGVtcGxhdGUpLmRvbmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdjb21wbGV0ZWQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdmaW5pc2hlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRoYXQuX3JlbmRlckRvd25sb2FkKGZpbGVzKVtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3B0aW9ucy5wcmVwZW5kRmlsZXMgPyAncHJlcGVuZFRvJyA6ICdhcHBlbmRUbydcbiAgICAgICAgICAgICAgICAgICAgXSh0aGF0Lm9wdGlvbnMuZmlsZXNDb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9mb3JjZVJlZmxvdyh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkID0gdGhhdC5fYWRkRmluaXNoZWREZWZlcnJlZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJhbnNpdGlvbih0ZW1wbGF0ZSkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2NvbXBsZXRlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZpbmlzaGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgZmFpbGVkIChhYm9ydCBvciBlcnJvcikgdXBsb2FkczpcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZGF0YSgnYmx1ZWltcC1maWxldXBsb2FkJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnZmlsZXVwbG9hZCcpLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yVGhyb3duICE9PSAnYWJvcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBkYXRhLmZpbGVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmVycm9yID0gZmlsZS5lcnJvciB8fCBkYXRhLmVycm9yVGhyb3duIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaTE4bigndW5rbm93bkVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQgPSB0aGF0Ll9hZGRGaW5pc2hlZERlZmVycmVkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyYW5zaXRpb24oJCh0aGlzKSkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0aGF0Ll9yZW5kZXJEb3dubG9hZChbZmlsZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9mb3JjZVJlZmxvdyh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKHRlbXBsYXRlKS5kb25lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmFpbGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZpbmlzaGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQgPSB0aGF0Ll9hZGRGaW5pc2hlZERlZmVycmVkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyYW5zaXRpb24oJCh0aGlzKSkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZhaWxlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZmluaXNoZWQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5lcnJvclRocm93biAhPT0gJ2Fib3J0Jykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQgPSB0aGF0Ll9yZW5kZXJVcGxvYWQoZGF0YS5maWxlcylbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wdGlvbnMucHJlcGVuZEZpbGVzID8gJ3ByZXBlbmRUbycgOiAnYXBwZW5kVG8nXG4gICAgICAgICAgICAgICAgICAgIF0odGhhdC5vcHRpb25zLmZpbGVzQ29udGFpbmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGEnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fZm9yY2VSZWZsb3coZGF0YS5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQgPSB0aGF0Ll9hZGRGaW5pc2hlZERlZmVycmVkcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKGRhdGEuY29udGV4dCkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZhaWxlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZpbmlzaGVkJywgZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ2ZhaWxlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdmaW5pc2hlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9hZGRGaW5pc2hlZERlZmVycmVkcygpLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHVwbG9hZCBwcm9ncmVzcyBldmVudHM6XG4gICAgICAgICAgICBwcm9ncmVzczogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IE1hdGguZmxvb3IoZGF0YS5sb2FkZWQgLyBkYXRhLnRvdGFsICogMTAwKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnLnByb2dyZXNzJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS12YWx1ZW5vdycsIHByb2dyZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpLmZpcnN0KCkuY3NzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyArICclJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgZ2xvYmFsIHVwbG9hZCBwcm9ncmVzcyBldmVudHM6XG4gICAgICAgICAgICBwcm9ncmVzc2FsbDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzID0gTWF0aC5mbG9vcihkYXRhLmxvYWRlZCAvIGRhdGEudG90YWwgKiAxMDApLFxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxQcm9ncmVzc05vZGUgPSAkdGhpcy5maW5kKCcuZmlsZXVwbG9hZC1wcm9ncmVzcycpLFxuICAgICAgICAgICAgICAgICAgICBleHRlbmRlZFByb2dyZXNzTm9kZSA9IGdsb2JhbFByb2dyZXNzTm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5wcm9ncmVzcy1leHRlbmRlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChleHRlbmRlZFByb2dyZXNzTm9kZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kZWRQcm9ncmVzc05vZGUuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICgkdGhpcy5kYXRhKCdibHVlaW1wLWZpbGV1cGxvYWQnKSB8fCAkdGhpcy5kYXRhKCdmaWxldXBsb2FkJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLl9yZW5kZXJFeHRlbmRlZFByb2dyZXNzKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdsb2JhbFByb2dyZXNzTm9kZVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnByb2dyZXNzJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCBwcm9ncmVzcylcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCkuZmlyc3QoKS5jc3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MgKyAnJSdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgdXBsb2FkcyBzdGFydCwgZXF1aXZhbGVudCB0byB0aGUgZ2xvYmFsIGFqYXhTdGFydCBldmVudDpcbiAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpLmRhdGEoJ2JsdWVpbXAtZmlsZXVwbG9hZCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2ZpbGV1cGxvYWQnKTtcbiAgICAgICAgICAgICAgICB0aGF0Ll9yZXNldEZpbmlzaGVkRGVmZXJyZWRzKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5fdHJhbnNpdGlvbigkKHRoaXMpLmZpbmQoJy5maWxldXBsb2FkLXByb2dyZXNzJykpLmRvbmUoXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3RyaWdnZXIoJ3N0YXJ0ZWQnLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHVwbG9hZHMgc3RvcCwgZXF1aXZhbGVudCB0byB0aGUgZ2xvYmFsIGFqYXhTdG9wIGV2ZW50OlxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKS5kYXRhKCdibHVlaW1wLWZpbGV1cGxvYWQnKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKCdmaWxldXBsb2FkJyksXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkID0gdGhhdC5fYWRkRmluaXNoZWREZWZlcnJlZHMoKTtcbiAgICAgICAgICAgICAgICAkLndoZW4uYXBwbHkoJCwgdGhhdC5fZ2V0RmluaXNoZWREZWZlcnJlZHMoKSlcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignc3RvcHBlZCcsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGF0Ll90cmFuc2l0aW9uKCQodGhpcykuZmluZCgnLmZpbGV1cGxvYWQtcHJvZ3Jlc3MnKSkuZG9uZShcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcucHJvZ3Jlc3MnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLXZhbHVlbm93JywgJzAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpLmZpcnN0KCkuY3NzKCd3aWR0aCcsICcwJScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcucHJvZ3Jlc3MtZXh0ZW5kZWQnKS5odG1sKCcmbmJzcDsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2Vzc3N0YXJ0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZmlsZXVwbG9hZC1wcm9jZXNzaW5nJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvY2Vzc3N0b3A6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdmaWxldXBsb2FkLXByb2Nlc3NpbmcnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3IgZmlsZSBkZWxldGlvbjpcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcykuZGF0YSgnYmx1ZWltcC1maWxldXBsb2FkJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnZmlsZXVwbG9hZCcpLFxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJhbnNpdGlvbihkYXRhLmNvbnRleHQpLmRvbmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll90cmlnZ2VyKCdkZXN0cm95ZWQnLCBlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnVybCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmRhdGFUeXBlID0gZGF0YS5kYXRhVHlwZSB8fCB0aGF0Lm9wdGlvbnMuZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheChkYXRhKS5kb25lKHJlbW92ZU5vZGUpLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdHJpZ2dlcignZGVzdHJveWZhaWxlZCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9yZXNldEZpbmlzaGVkRGVmZXJyZWRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9maW5pc2hlZFVwbG9hZHMgPSBbXTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYWRkRmluaXNoZWREZWZlcnJlZHM6IGZ1bmN0aW9uIChkZWZlcnJlZCkge1xuICAgICAgICAgICAgaWYgKCFkZWZlcnJlZCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZmluaXNoZWRVcGxvYWRzLnB1c2goZGVmZXJyZWQpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRGaW5pc2hlZERlZmVycmVkczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbmlzaGVkVXBsb2FkcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBMaW5rIGhhbmRsZXIsIHRoYXQgYWxsb3dzIHRvIGRvd25sb2FkIGZpbGVzXG4gICAgICAgIC8vIGJ5IGRyYWcgJiBkcm9wIG9mIHRoZSBsaW5rcyB0byB0aGUgZGVza3RvcDpcbiAgICAgICAgX2VuYWJsZURyYWdUb0Rlc2t0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsaW5rID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICB1cmwgPSBsaW5rLnByb3AoJ2hyZWYnKSxcbiAgICAgICAgICAgICAgICBuYW1lID0gbGluay5wcm9wKCdkb3dubG9hZCcpLFxuICAgICAgICAgICAgICAgIHR5cGUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgICAgICAgICAgIGxpbmsuYmluZCgnZHJhZ3N0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAnRG93bmxvYWRVUkwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3R5cGUsIG5hbWUsIHVybF0uam9pbignOicpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Zvcm1hdEZpbGVTaXplOiBmdW5jdGlvbiAoYnl0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYnl0ZXMgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ5dGVzID49IDEwMDAwMDAwMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJ5dGVzIC8gMTAwMDAwMDAwMCkudG9GaXhlZCgyKSArICcgR0InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ5dGVzID49IDEwMDAwMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJ5dGVzIC8gMTAwMDAwMCkudG9GaXhlZCgyKSArICcgTUInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChieXRlcyAvIDEwMDApLnRvRml4ZWQoMikgKyAnIEtCJztcbiAgICAgICAgfSxcblxuICAgICAgICBfZm9ybWF0Qml0cmF0ZTogZnVuY3Rpb24gKGJpdHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYml0cyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYml0cyA+PSAxMDAwMDAwMDAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChiaXRzIC8gMTAwMDAwMDAwMCkudG9GaXhlZCgyKSArICcgR2JpdC9zJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiaXRzID49IDEwMDAwMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJpdHMgLyAxMDAwMDAwKS50b0ZpeGVkKDIpICsgJyBNYml0L3MnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJpdHMgPj0gMTAwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoYml0cyAvIDEwMDApLnRvRml4ZWQoMikgKyAnIGtiaXQvcyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYml0cy50b0ZpeGVkKDIpICsgJyBiaXQvcyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Zvcm1hdFRpbWU6IGZ1bmN0aW9uIChzZWNvbmRzKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHNlY29uZHMgKiAxMDAwKSxcbiAgICAgICAgICAgICAgICBkYXlzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gODY0MDApO1xuICAgICAgICAgICAgZGF5cyA9IGRheXMgPyBkYXlzICsgJ2QgJyA6ICcnO1xuICAgICAgICAgICAgcmV0dXJuIGRheXMgK1xuICAgICAgICAgICAgICAgICgnMCcgKyBkYXRlLmdldFVUQ0hvdXJzKCkpLnNsaWNlKC0yKSArICc6JyArXG4gICAgICAgICAgICAgICAgKCcwJyArIGRhdGUuZ2V0VVRDTWludXRlcygpKS5zbGljZSgtMikgKyAnOicgK1xuICAgICAgICAgICAgICAgICgnMCcgKyBkYXRlLmdldFVUQ1NlY29uZHMoKSkuc2xpY2UoLTIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9mb3JtYXRQZXJjZW50YWdlOiBmdW5jdGlvbiAoZmxvYXRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIChmbG9hdFZhbHVlICogMTAwKS50b0ZpeGVkKDIpICsgJyAlJztcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyRXh0ZW5kZWRQcm9ncmVzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXRCaXRyYXRlKGRhdGEuYml0cmF0ZSkgKyAnIHwgJyArXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0VGltZShcbiAgICAgICAgICAgICAgICAgICAgKGRhdGEudG90YWwgLSBkYXRhLmxvYWRlZCkgKiA4IC8gZGF0YS5iaXRyYXRlXG4gICAgICAgICAgICAgICAgKSArICcgfCAnICtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXRQZXJjZW50YWdlKFxuICAgICAgICAgICAgICAgICAgICBkYXRhLmxvYWRlZCAvIGRhdGEudG90YWxcbiAgICAgICAgICAgICAgICApICsgJyB8ICcgK1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdEZpbGVTaXplKGRhdGEubG9hZGVkKSArICcgLyAnICtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXRGaWxlU2l6ZShkYXRhLnRvdGFsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyVGVtcGxhdGU6IGZ1bmN0aW9uIChmdW5jLCBmaWxlcykge1xuICAgICAgICAgICAgaWYgKCFmdW5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmdW5jKHtcbiAgICAgICAgICAgICAgICBmaWxlczogZmlsZXMsXG4gICAgICAgICAgICAgICAgZm9ybWF0RmlsZVNpemU6IHRoaXMuX2Zvcm1hdEZpbGVTaXplLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9uc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgJCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJCh0aGlzLm9wdGlvbnMudGVtcGxhdGVzQ29udGFpbmVyKS5odG1sKHJlc3VsdCkuY2hpbGRyZW4oKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyUHJldmlld3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLmNvbnRleHQuZmluZCgnLnByZXZpZXcnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxtKSB7XG4gICAgICAgICAgICAgICAgJChlbG0pLmFwcGVuZChkYXRhLmZpbGVzW2luZGV4XS5wcmV2aWV3KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9yZW5kZXJVcGxvYWQ6IGZ1bmN0aW9uIChmaWxlcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclRlbXBsYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy51cGxvYWRUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBmaWxlc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVuZGVyRG93bmxvYWQ6IGZ1bmN0aW9uIChmaWxlcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclRlbXBsYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kb3dubG9hZFRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIGZpbGVzXG4gICAgICAgICAgICApLmZpbmQoJ2FbZG93bmxvYWRdJykuZWFjaCh0aGlzLl9lbmFibGVEcmFnVG9EZXNrdG9wKS5lbmQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfc3RhcnRIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9ICQoZS5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IGJ1dHRvbi5jbG9zZXN0KCcudGVtcGxhdGUtdXBsb2FkJyksXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRlbXBsYXRlLmRhdGEoJ2RhdGEnKTtcbiAgICAgICAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5zdWJtaXQpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9jYW5jZWxIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcudGVtcGxhdGUtdXBsb2FkLC50ZW1wbGF0ZS1kb3dubG9hZCcpLFxuICAgICAgICAgICAgICAgIGRhdGEgPSB0ZW1wbGF0ZS5kYXRhKCdkYXRhJykgfHwge307XG4gICAgICAgICAgICBkYXRhLmNvbnRleHQgPSBkYXRhLmNvbnRleHQgfHwgdGVtcGxhdGU7XG4gICAgICAgICAgICBpZiAoZGF0YS5hYm9ydCkge1xuICAgICAgICAgICAgICAgIGRhdGEuYWJvcnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS5lcnJvclRocm93biA9ICdhYm9ydCc7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcignZmFpbCcsIGUsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9kZWxldGVIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoJ2Rlc3Ryb3knLCBlLCAkLmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgY29udGV4dDogYnV0dG9uLmNsb3Nlc3QoJy50ZW1wbGF0ZS1kb3dubG9hZCcpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdERUxFVEUnXG4gICAgICAgICAgICB9LCBidXR0b24uZGF0YSgpKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2ZvcmNlUmVmbG93OiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIG5vZGUubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgbm9kZVswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfSxcblxuICAgICAgICBfdHJhbnNpdGlvbjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICBpZiAoJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgbm9kZS5oYXNDbGFzcygnZmFkZScpICYmIG5vZGUuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICBub2RlLmJpbmQoXG4gICAgICAgICAgICAgICAgICAgICQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkb24ndCByZXNwb25kIHRvIG90aGVyIHRyYW5zaXRpb25zIGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhlIGNvbnRhaW5lciBlbGVtZW50LCBlLmcuIGZyb20gYnV0dG9uIGVsZW1lbnRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBub2RlWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS51bmJpbmQoJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRvZ2dsZUNsYXNzKCdpbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnRvZ2dsZUNsYXNzKCdpbicpO1xuICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZmQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRCdXR0b25CYXJFdmVudEhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZmlsZVVwbG9hZEJ1dHRvbkJhciA9IHRoaXMuZWxlbWVudC5maW5kKCcuZmlsZXVwbG9hZC1idXR0b25iYXInKSxcbiAgICAgICAgICAgICAgICBmaWxlc0xpc3QgPSB0aGlzLm9wdGlvbnMuZmlsZXNDb250YWluZXI7XG4gICAgICAgICAgICB0aGlzLl9vbihmaWxlVXBsb2FkQnV0dG9uQmFyLmZpbmQoJy5zdGFydCcpLCB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNMaXN0LmZpbmQoJy5zdGFydCcpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9vbihmaWxlVXBsb2FkQnV0dG9uQmFyLmZpbmQoJy5jYW5jZWwnKSwge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVzTGlzdC5maW5kKCcuY2FuY2VsJykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX29uKGZpbGVVcGxvYWRCdXR0b25CYXIuZmluZCgnLmRlbGV0ZScpLCB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNMaXN0LmZpbmQoJy50b2dnbGU6Y2hlY2tlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLnRlbXBsYXRlLWRvd25sb2FkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZGVsZXRlJykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZVVwbG9hZEJ1dHRvbkJhci5maW5kKCcudG9nZ2xlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fb24oZmlsZVVwbG9hZEJ1dHRvbkJhci5maW5kKCcudG9nZ2xlJyksIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVzTGlzdC5maW5kKCcudG9nZ2xlJykucHJvcChcbiAgICAgICAgICAgICAgICAgICAgICAgICdjaGVja2VkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5pcygnOmNoZWNrZWQnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9kZXN0cm95QnV0dG9uQmFyRXZlbnRIYW5kbGVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fb2ZmKFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcuZmlsZXVwbG9hZC1idXR0b25iYXInKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnN0YXJ0LCAuY2FuY2VsLCAuZGVsZXRlJyksXG4gICAgICAgICAgICAgICAgJ2NsaWNrJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX29mZihcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCgnLmZpbGV1cGxvYWQtYnV0dG9uYmFyIC50b2dnbGUnKSxcbiAgICAgICAgICAgICAgICAnY2hhbmdlLidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRFdmVudEhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5fb24odGhpcy5vcHRpb25zLmZpbGVzQ29udGFpbmVyLCB7XG4gICAgICAgICAgICAgICAgJ2NsaWNrIC5zdGFydCc6IHRoaXMuX3N0YXJ0SGFuZGxlcixcbiAgICAgICAgICAgICAgICAnY2xpY2sgLmNhbmNlbCc6IHRoaXMuX2NhbmNlbEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgJ2NsaWNrIC5kZWxldGUnOiB0aGlzLl9kZWxldGVIYW5kbGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRCdXR0b25CYXJFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2Rlc3Ryb3lFdmVudEhhbmRsZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9kZXN0cm95QnV0dG9uQmFyRXZlbnRIYW5kbGVycygpO1xuICAgICAgICAgICAgdGhpcy5fb2ZmKHRoaXMub3B0aW9ucy5maWxlc0NvbnRhaW5lciwgJ2NsaWNrJyk7XG4gICAgICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9lbmFibGVGaWxlSW5wdXRCdXR0b246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcuZmlsZWlucHV0LWJ1dHRvbiBpbnB1dCcpXG4gICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9kaXNhYmxlRmlsZUlucHV0QnV0dG9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCgnLmZpbGVpbnB1dC1idXR0b24gaW5wdXQnKVxuICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9pbml0VGVtcGxhdGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGVzQ29udGFpbmVyID0gdGhpcy5kb2N1bWVudFswXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZXNDb250YWluZXIucHJvcCgnbm9kZU5hbWUnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0bXBsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudXBsb2FkVGVtcGxhdGVJZCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnVwbG9hZFRlbXBsYXRlID0gdG1wbChvcHRpb25zLnVwbG9hZFRlbXBsYXRlSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kb3dubG9hZFRlbXBsYXRlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kb3dubG9hZFRlbXBsYXRlID0gdG1wbChvcHRpb25zLmRvd25sb2FkVGVtcGxhdGVJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9pbml0RmlsZXNDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmlsZXNDb250YWluZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZXNDb250YWluZXIgPSB0aGlzLmVsZW1lbnQuZmluZCgnLmZpbGVzJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEob3B0aW9ucy5maWxlc0NvbnRhaW5lciBpbnN0YW5jZW9mICQpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5maWxlc0NvbnRhaW5lciA9ICQob3B0aW9ucy5maWxlc0NvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2luaXRTcGVjaWFsT3B0aW9uczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRGaWxlc0NvbnRhaW5lcigpO1xuICAgICAgICAgICAgdGhpcy5faW5pdFRlbXBsYXRlcygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9yZXNldEZpbmlzaGVkRGVmZXJyZWRzKCk7XG4gICAgICAgICAgICBpZiAoISQuc3VwcG9ydC5maWxlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlRmlsZUlucHV0QnV0dG9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd2FzRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB3YXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICAgICAgaWYgKHdhc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJ2lucHV0LCBidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGVGaWxlSW5wdXRCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCdpbnB1dCwgYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNhYmxlRmlsZUlucHV0QnV0dG9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxufSkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
