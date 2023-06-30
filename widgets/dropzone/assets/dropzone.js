/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/helpers.js":
/*!******************************!*\
  !*** ./assets/js/helpers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const KMhelper = (function () {
    'use strict';
    // Create the helper methods object
    const _ = {}

    _.getCsrfToken = function () {
        return getCsrfToken();
    }

    _.getDefaultPostHeaders = function () {
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': getCsrfToken()
        }
    }

    // Private goes here

    function getCsrfToken() {
        return document.querySelector('meta[name=csrf-token]').getAttribute('content');
    }

    // Expose the public helper methods
    return _;

})()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KMhelper);


/***/ }),

/***/ "./assets/js/kmergen/yii2-media/dropzone.module.js":
/*!*********************************************************!*\
  !*** ./assets/js/kmergen/yii2-media/dropzone.module.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers */ "./assets/js/helpers.js");

// Image Uploader for uploading images to ads

let mainElement = null;
let previewsElement = null;
let clickableElement = null;
let messageElement = null;

// Allowed pluginOptions which can be set in Dropzone widget
let settings = {
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
  files: [],
  variants: [],
  maxFileSize: 5, // in Megabyte MB
  maxFiles: 10,
  uploadUrl: '/media/upload',
  previewVariant: null, // If it is not set, no preview thumbnail will created on server side
  previewTemplate: '',
};

let error = false;

function init(config = null) {
  mainElement = document.getElementById('kmDropzone');
  previewsElement = mainElement.querySelector('.dz-previews');
  clickableElement = mainElement.querySelector('.dz-clickable');
  messageElement = document.querySelector('.dz-message');

  if (config !== null) {
    settings = { ...settings, ...config };
  }
 
  document
    .getElementById('kmDropzone')
    .addEventListener('change', handleOnChange);

  renderExistingFiles();
}

function renderExistingFiles() {
  settings.files.map((image) => {
    renderPreview(image);
  });
}

/* Image Upload */
async function handleOnChange(e) {
  removeMessage();
  if (e.target.files[0]) {
    const fileToUpload = e.target.files[0];
    // console.log(fileToUpload);

    if (fileToUpload.size / 1024000 > settings.maxFileSize) {
      error = `Die maximale Dateigröße beträgt ${settings.maxFileSize} MB.`;
    } else if (settings.allowedFileTypes.indexOf(fileToUpload.type) === -1) {
      error = `Es können nur Bilder vom Typ ${settings.allowedFileTypes.toString()} hochgeladen werden.`;
    }

    if (error) {
      return setMessage(error);
    }

    try {
      await uploadImage(fileToUpload);
    } catch (error) {
      console.error(error);
      setMessage('Upload fehlgeschlagen!');
    }
  }
}

const UploadErrorHandler = () => {
  return { error: 'Upload fehlgeschlagen' };
};

const UploadProgressHandler = () => {
  return;
};

const UploadSuccessHandler = (e) => {
  const data = JSON.parse(e.target.responseText);
  if (data.hasOwnProperty('error')) {
    if (data.error !== 'Internal Error') {
      return setMessage(data.error);
    }
  } else {
    renderPreview(data);
    // setShowProgressModal(false);
  }
};

async function uploadImage(fileToUpload) {
  const formData = new FormData();
  formData.append('upfile', fileToUpload);
  settings.hasOwnProperty('targetUrl') &&
    formData.append('targetUrl', settings.targetUrl);
  settings.hasOwnProperty('imageQuality') &&
    formData.append('imageQuality', settings.imageQuality);
  settings.hasOwnProperty('fixOrientation') &&
    formData.append('fixOrientation', JSON.stringify(settings.fixOrientation));
  settings.hasOwnProperty('maxWidth') &&
    formData.append('maxWidth', settings.maxWidh);
    settings.hasOwnProperty('previewVariant') &&
    formData.append('previewVariant', settings.previewVariant);
  formData.append(
    'allowedFileTypes',
    JSON.stringify(settings.allowedFileTypes)
  );
  formData.append('variants', JSON.stringify(settings.variants));

  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener('progress', UploadProgressHandler, false);
  xhr.addEventListener('load', UploadSuccessHandler, false);
  xhr.addEventListener('error', UploadErrorHandler, false);
  xhr.open('POST', settings.uploadUrl);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(formData);
}

function setMessage(msg, type = 'error') {
  removeMessage();
  messageElement.insertAdjacentHTML(
    'afterBegin',
    `<span class="${type}">${msg}<span>`
  );
  setTimeout(removeMessage, 6000);
}

function removeMessage() {
  messageElement.innerHTML = '';
}

function renderPreview(data) {
  const template = settings.previewTemplate;

  previewsElement.insertAdjacentHTML('beforeend', template);
  const previewElement = mainElement.querySelector('.dz-previews').lastChild;

  const thumbElement = previewElement.querySelector('[data-dz-thumbnail]');
  thumbElement.setAttribute('src', data.previewUrl);
  thumbElement.setAttribute('alt', data.previewUrl);

  // Create and append the hidden input
  const hiddenElement = document.createElement('input');
  hiddenElement.setAttribute('type', 'hidden');
  hiddenElement.setAttribute('name', 'MediaFiles[' + data.id + '][id]');
  hiddenElement.setAttribute('value', data.id);
  previewElement.appendChild(hiddenElement);

  previewElement
    .querySelector('.dz-remove')
    .addEventListener('click', function (e) {
      e.preventDefault();
      previewElement.remove();
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./assets/js/kmergen/yii2-media/dropzone.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dropzone_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dropzone.module */ "./assets/js/kmergen/yii2-media/dropzone.module.js");

window.KmDropzoneInit = _dropzone_module__WEBPACK_IMPORTED_MODULE_0__.init;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9yL2ttZXJnZW4veWlpMi1tZWRpYS93aWRnZXRzL2Ryb3B6b25lL2Fzc2V0cy9kcm9wem9uZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQmM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELHNCQUFzQjtBQUN2RSxNQUFNO0FBQ04sOENBQThDLHNDQUFzQztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixLQUFLLElBQUksSUFBSTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUMzSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055QztBQUN6Qyx3QkFBd0Isa0RBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly95aWkyZGV2ZWxvcC13ZWJwYWNrLy4vYXNzZXRzL2pzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8veWlpMmRldmVsb3Atd2VicGFjay8uL2Fzc2V0cy9qcy9rbWVyZ2VuL3lpaTItbWVkaWEvZHJvcHpvbmUubW9kdWxlLmpzIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8veWlpMmRldmVsb3Atd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8veWlpMmRldmVsb3Atd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly95aWkyZGV2ZWxvcC13ZWJwYWNrLy4vYXNzZXRzL2pzL2ttZXJnZW4veWlpMi1tZWRpYS9kcm9wem9uZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBLTWhlbHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICAvLyBDcmVhdGUgdGhlIGhlbHBlciBtZXRob2RzIG9iamVjdFxyXG4gICAgY29uc3QgXyA9IHt9XHJcblxyXG4gICAgXy5nZXRDc3JmVG9rZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldENzcmZUb2tlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIF8uZ2V0RGVmYXVsdFBvc3RIZWFkZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgJ1gtQ1NSRi1Ub2tlbic6IGdldENzcmZUb2tlbigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFByaXZhdGUgZ29lcyBoZXJlXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q3NyZlRva2VuKCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi10b2tlbl0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFeHBvc2UgdGhlIHB1YmxpYyBoZWxwZXIgbWV0aG9kc1xyXG4gICAgcmV0dXJuIF87XHJcblxyXG59KSgpXHJcbmV4cG9ydCBkZWZhdWx0IEtNaGVscGVyXHJcbiIsImltcG9ydCBLTWhlbHBlciBmcm9tICcuLi8uLi9oZWxwZXJzJztcclxuLy8gSW1hZ2UgVXBsb2FkZXIgZm9yIHVwbG9hZGluZyBpbWFnZXMgdG8gYWRzXHJcblxyXG5sZXQgbWFpbkVsZW1lbnQgPSBudWxsO1xyXG5sZXQgcHJldmlld3NFbGVtZW50ID0gbnVsbDtcclxubGV0IGNsaWNrYWJsZUVsZW1lbnQgPSBudWxsO1xyXG5sZXQgbWVzc2FnZUVsZW1lbnQgPSBudWxsO1xyXG5cclxuLy8gQWxsb3dlZCBwbHVnaW5PcHRpb25zIHdoaWNoIGNhbiBiZSBzZXQgaW4gRHJvcHpvbmUgd2lkZ2V0XHJcbmxldCBzZXR0aW5ncyA9IHtcclxuICBhbGxvd2VkRmlsZVR5cGVzOiBbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZiddLFxyXG4gIGZpbGVzOiBbXSxcclxuICB2YXJpYW50czogW10sXHJcbiAgbWF4RmlsZVNpemU6IDUsIC8vIGluIE1lZ2FieXRlIE1CXHJcbiAgbWF4RmlsZXM6IDEwLFxyXG4gIHVwbG9hZFVybDogJy9tZWRpYS91cGxvYWQnLFxyXG4gIHByZXZpZXdWYXJpYW50OiBudWxsLCAvLyBJZiBpdCBpcyBub3Qgc2V0LCBubyBwcmV2aWV3IHRodW1ibmFpbCB3aWxsIGNyZWF0ZWQgb24gc2VydmVyIHNpZGVcclxuICBwcmV2aWV3VGVtcGxhdGU6ICcnLFxyXG59O1xyXG5cclxubGV0IGVycm9yID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdChjb25maWcgPSBudWxsKSB7XHJcbiAgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna21Ecm9wem9uZScpO1xyXG4gIHByZXZpZXdzRWxlbWVudCA9IG1haW5FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kei1wcmV2aWV3cycpO1xyXG4gIGNsaWNrYWJsZUVsZW1lbnQgPSBtYWluRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHotY2xpY2thYmxlJyk7XHJcbiAgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHotbWVzc2FnZScpO1xyXG5cclxuICBpZiAoY29uZmlnICE9PSBudWxsKSB7XHJcbiAgICBzZXR0aW5ncyA9IHsgLi4uc2V0dGluZ3MsIC4uLmNvbmZpZyB9O1xyXG4gIH1cclxuIFxyXG4gIGRvY3VtZW50XHJcbiAgICAuZ2V0RWxlbWVudEJ5SWQoJ2ttRHJvcHpvbmUnKVxyXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZU9uQ2hhbmdlKTtcclxuXHJcbiAgcmVuZGVyRXhpc3RpbmdGaWxlcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJFeGlzdGluZ0ZpbGVzKCkge1xyXG4gIHNldHRpbmdzLmZpbGVzLm1hcCgoaW1hZ2UpID0+IHtcclxuICAgIHJlbmRlclByZXZpZXcoaW1hZ2UpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKiBJbWFnZSBVcGxvYWQgKi9cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlT25DaGFuZ2UoZSkge1xyXG4gIHJlbW92ZU1lc3NhZ2UoKTtcclxuICBpZiAoZS50YXJnZXQuZmlsZXNbMF0pIHtcclxuICAgIGNvbnN0IGZpbGVUb1VwbG9hZCA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgLy8gY29uc29sZS5sb2coZmlsZVRvVXBsb2FkKTtcclxuXHJcbiAgICBpZiAoZmlsZVRvVXBsb2FkLnNpemUgLyAxMDI0MDAwID4gc2V0dGluZ3MubWF4RmlsZVNpemUpIHtcclxuICAgICAgZXJyb3IgPSBgRGllIG1heGltYWxlIERhdGVpZ3LDtsOfZSBiZXRyw6RndCAke3NldHRpbmdzLm1heEZpbGVTaXplfSBNQi5gO1xyXG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5hbGxvd2VkRmlsZVR5cGVzLmluZGV4T2YoZmlsZVRvVXBsb2FkLnR5cGUpID09PSAtMSkge1xyXG4gICAgICBlcnJvciA9IGBFcyBrw7ZubmVuIG51ciBCaWxkZXIgdm9tIFR5cCAke3NldHRpbmdzLmFsbG93ZWRGaWxlVHlwZXMudG9TdHJpbmcoKX0gaG9jaGdlbGFkZW4gd2VyZGVuLmA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBzZXRNZXNzYWdlKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB1cGxvYWRJbWFnZShmaWxlVG9VcGxvYWQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHNldE1lc3NhZ2UoJ1VwbG9hZCBmZWhsZ2VzY2hsYWdlbiEnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IFVwbG9hZEVycm9ySGFuZGxlciA9ICgpID0+IHtcclxuICByZXR1cm4geyBlcnJvcjogJ1VwbG9hZCBmZWhsZ2VzY2hsYWdlbicgfTtcclxufTtcclxuXHJcbmNvbnN0IFVwbG9hZFByb2dyZXNzSGFuZGxlciA9ICgpID0+IHtcclxuICByZXR1cm47XHJcbn07XHJcblxyXG5jb25zdCBVcGxvYWRTdWNjZXNzSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZS50YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSkge1xyXG4gICAgaWYgKGRhdGEuZXJyb3IgIT09ICdJbnRlcm5hbCBFcnJvcicpIHtcclxuICAgICAgcmV0dXJuIHNldE1lc3NhZ2UoZGF0YS5lcnJvcik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlbmRlclByZXZpZXcoZGF0YSk7XHJcbiAgICAvLyBzZXRTaG93UHJvZ3Jlc3NNb2RhbChmYWxzZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkSW1hZ2UoZmlsZVRvVXBsb2FkKSB7XHJcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICBmb3JtRGF0YS5hcHBlbmQoJ3VwZmlsZScsIGZpbGVUb1VwbG9hZCk7XHJcbiAgc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ3RhcmdldFVybCcpICYmXHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3RhcmdldFVybCcsIHNldHRpbmdzLnRhcmdldFVybCk7XHJcbiAgc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2ltYWdlUXVhbGl0eScpICYmXHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ltYWdlUXVhbGl0eScsIHNldHRpbmdzLmltYWdlUXVhbGl0eSk7XHJcbiAgc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2ZpeE9yaWVudGF0aW9uJykgJiZcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZml4T3JpZW50YXRpb24nLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncy5maXhPcmllbnRhdGlvbikpO1xyXG4gIHNldHRpbmdzLmhhc093blByb3BlcnR5KCdtYXhXaWR0aCcpICYmXHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ21heFdpZHRoJywgc2V0dGluZ3MubWF4V2lkaCk7XHJcbiAgICBzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgncHJldmlld1ZhcmlhbnQnKSAmJlxyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwcmV2aWV3VmFyaWFudCcsIHNldHRpbmdzLnByZXZpZXdWYXJpYW50KTtcclxuICBmb3JtRGF0YS5hcHBlbmQoXHJcbiAgICAnYWxsb3dlZEZpbGVUeXBlcycsXHJcbiAgICBKU09OLnN0cmluZ2lmeShzZXR0aW5ncy5hbGxvd2VkRmlsZVR5cGVzKVxyXG4gICk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKCd2YXJpYW50cycsIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLnZhcmlhbnRzKSk7XHJcblxyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBVcGxvYWRQcm9ncmVzc0hhbmRsZXIsIGZhbHNlKTtcclxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIFVwbG9hZFN1Y2Nlc3NIYW5kbGVyLCBmYWxzZSk7XHJcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgVXBsb2FkRXJyb3JIYW5kbGVyLCBmYWxzZSk7XHJcbiAgeGhyLm9wZW4oJ1BPU1QnLCBzZXR0aW5ncy51cGxvYWRVcmwpO1xyXG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0Jyk7XHJcbiAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRNZXNzYWdlKG1zZywgdHlwZSA9ICdlcnJvcicpIHtcclxuICByZW1vdmVNZXNzYWdlKCk7XHJcbiAgbWVzc2FnZUVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxyXG4gICAgJ2FmdGVyQmVnaW4nLFxyXG4gICAgYDxzcGFuIGNsYXNzPVwiJHt0eXBlfVwiPiR7bXNnfTxzcGFuPmBcclxuICApO1xyXG4gIHNldFRpbWVvdXQocmVtb3ZlTWVzc2FnZSwgNjAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZU1lc3NhZ2UoKSB7XHJcbiAgbWVzc2FnZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclByZXZpZXcoZGF0YSkge1xyXG4gIGNvbnN0IHRlbXBsYXRlID0gc2V0dGluZ3MucHJldmlld1RlbXBsYXRlO1xyXG5cclxuICBwcmV2aWV3c0VsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZW1wbGF0ZSk7XHJcbiAgY29uc3QgcHJldmlld0VsZW1lbnQgPSBtYWluRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHotcHJldmlld3MnKS5sYXN0Q2hpbGQ7XHJcblxyXG4gIGNvbnN0IHRodW1iRWxlbWVudCA9IHByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWR6LXRodW1ibmFpbF0nKTtcclxuICB0aHVtYkVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCBkYXRhLnByZXZpZXdVcmwpO1xyXG4gIHRodW1iRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGRhdGEucHJldmlld1VybCk7XHJcblxyXG4gIC8vIENyZWF0ZSBhbmQgYXBwZW5kIHRoZSBoaWRkZW4gaW5wdXRcclxuICBjb25zdCBoaWRkZW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBoaWRkZW5FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuICBoaWRkZW5FbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsICdNZWRpYUZpbGVzWycgKyBkYXRhLmlkICsgJ11baWRdJyk7XHJcbiAgaGlkZGVuRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZGF0YS5pZCk7XHJcbiAgcHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoaGlkZGVuRWxlbWVudCk7XHJcblxyXG4gIHByZXZpZXdFbGVtZW50XHJcbiAgICAucXVlcnlTZWxlY3RvcignLmR6LXJlbW92ZScpXHJcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHByZXZpZXdFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0IH0gZnJvbSAnLi9kcm9wem9uZS5tb2R1bGUnO1xyXG53aW5kb3cuS21Ecm9wem9uZUluaXQgPSBpbml0O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=