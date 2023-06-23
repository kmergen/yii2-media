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

let variants = [
  // Composite the image in a blurred background of the same image
  // The values are : 1. width of the background, 2. height of the background,
  // 3. The sigma to blur (0-100).
  'thumbCompositeBlur,80,60,6',
  'thumbCompositeBlur,100,75,6',
  'thumbCompositeBlur,320,240,6',
  'thumbCompositeBlur,560,420,6',
  'thumbCompositeBlur,760,570,6',
];

let settings = {
  images: null,
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
  maxFileSize: 5, // in Megabyte MB
  maxFiles: 10,
  uploadUrl: 'http://media-api.localhost/v1/media',
};

let error = false;

function init(config = null) {
  mainElement = document.getElementById('kmDropzone');
  previewsElement = mainElement.querySelector('.dz-previews');
  clickableElement = mainElement.querySelector('.dz-clickable');
  messageElement = document.querySelector('.dz-message');
  const test = JSON.stringify(settings.allowedFileTypes);

  if (config !== null) {
    // console.log("Config: ", config);
    settings = { ...settings, ...config };
  }
  initEvents();
}

function initEvents() {
  document
    .getElementById('kmDropzone')
    .addEventListener('change', handleOnChange);
}

async function handleOnChange(e) {
  if (e.target.files[0]) {
    const fileToUpload = e.target.files[0];
    // console.log(fileToUpload);

    if (fileToUpload.size / 1024000 > settings.maxFileSize) {
      error = `Die maximale Dateigröße beträgt ${settings.maxFileSize} MB.`;
    } else if (settings.allowedFileTypes.indexOf(fileToUpload.type) === -1) {
      error = `Es können nur Bilder vom Typ ${settings.allowedFileTypes.toString()} hochgeladen werden.`;
    }

    if (error) {
      console.log(error);
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
  if (data.error) {
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
  formData.append('targetUrl', 'images/ad');
  formData.append('imageQuality', '52');
  formData.append('fixOrientation', JSON.stringify(false));
  formData.append('maxWidth', '800');
  formData.append(
    'allowedFileTypes',
    JSON.stringify(settings.allowedFileTypes)
  );
  formData.append('variants', JSON.stringify(variants));

  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener('progress', UploadProgressHandler, false);
  xhr.addEventListener('load', UploadSuccessHandler, false);
  xhr.addEventListener('error', UploadErrorHandler, false);
  xhr.open('POST', settings.uploadUrl);
  xhr.send(formData);
}

function setMessage(msg, type = 'error') {
  removeMessage();
  messageElement.insertAdjacentHTML(
    'afterBegin',
    `<span class="${type}">${msg}<span>`
  );
}

function removeMessage() {
  messageElement.innerHTML = '';
}

function renderPreview(data) {
  const template = `<div class="dz-preview float-start me-3 mb-3 card" id="mediafile-${data.id}">
  <img
    class="card-img-top"
    data-dz-thumbnail=""
    alt="${data.variants.thumbCompositeBlur_100_75_6}"
    src="${data.variants.thumbCompositeBlur_100_75_6}"
  >
  <div class="card-body text-center">
    <div class="dz-links">
      <a class="dz-remove" href="" data-dz-remove=""
        ><svg
          class="dz-icon dz-icon-trash"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>Bild löschen</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect opacity="0" x="0" y="0" width="24" height="24"></rect>
            <path
              class="path-1"
              d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
              fill="#000000"
              fill-rule="nonzero"
            ></path>
            <path
              class="path-2"
              d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
              fill="#000000"
              opacity="0.3"
            ></path>
          </g>
        </svg>
      </a>
    </div>
    <!--        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>-->
  </div>
  <input type="hidden" name="MediaImages[${data.id}][id]" value="${JSON.stringify([data])}">
</div>`;

  previewsElement.insertAdjacentHTML('beforeend', template);
  const lastPreview = mainElement.querySelector('.dz-previews').lastChild;
  lastPreview
    .querySelector('.dz-remove')
    .addEventListener('click', function (e) {
      e.preventDefault();
      lastPreview.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9yL2ttZXJnZW4veWlpMi1tZWRpYS93aWRnZXRzL2Ryb3B6b25lL2Fzc2V0cy9kcm9wem9uZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQmM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsc0JBQXNCO0FBQ3ZFLE1BQU07QUFDTiw4Q0FBOEMsc0NBQXNDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLEtBQUssSUFBSSxJQUFJO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RkFBdUYsUUFBUTtBQUMvRjtBQUNBO0FBQ0E7QUFDQSxXQUFXLDBDQUEwQztBQUNyRCxXQUFXLDBDQUEwQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxRQUFRLGdCQUFnQix1QkFBdUI7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDbkxBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7QUFDekMsd0JBQXdCLGtEQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veWlpMmRldmVsb3Atd2VicGFjay8uL2Fzc2V0cy9qcy9oZWxwZXJzLmpzIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svLi9hc3NldHMvanMva21lcmdlbi95aWkyLW1lZGlhL2Ryb3B6b25lLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly95aWkyZGV2ZWxvcC13ZWJwYWNrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly95aWkyZGV2ZWxvcC13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8veWlpMmRldmVsb3Atd2VicGFjay8uL2Fzc2V0cy9qcy9rbWVyZ2VuL3lpaTItbWVkaWEvZHJvcHpvbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgS01oZWxwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgLy8gQ3JlYXRlIHRoZSBoZWxwZXIgbWV0aG9kcyBvYmplY3RcclxuICAgIGNvbnN0IF8gPSB7fVxyXG5cclxuICAgIF8uZ2V0Q3NyZlRva2VuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBnZXRDc3JmVG9rZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBfLmdldERlZmF1bHRQb3N0SGVhZGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICdYLUNTUkYtVG9rZW4nOiBnZXRDc3JmVG9rZW4oKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBQcml2YXRlIGdvZXMgaGVyZVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENzcmZUb2tlbigpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXhwb3NlIHRoZSBwdWJsaWMgaGVscGVyIG1ldGhvZHNcclxuICAgIHJldHVybiBfO1xyXG5cclxufSkoKVxyXG5leHBvcnQgZGVmYXVsdCBLTWhlbHBlclxyXG4iLCJpbXBvcnQgS01oZWxwZXIgZnJvbSAnLi4vLi4vaGVscGVycyc7XHJcbi8vIEltYWdlIFVwbG9hZGVyIGZvciB1cGxvYWRpbmcgaW1hZ2VzIHRvIGFkc1xyXG5cclxubGV0IG1haW5FbGVtZW50ID0gbnVsbDtcclxubGV0IHByZXZpZXdzRWxlbWVudCA9IG51bGw7XHJcbmxldCBjbGlja2FibGVFbGVtZW50ID0gbnVsbDtcclxubGV0IG1lc3NhZ2VFbGVtZW50ID0gbnVsbDtcclxuXHJcbmxldCB2YXJpYW50cyA9IFtcclxuICAvLyBDb21wb3NpdGUgdGhlIGltYWdlIGluIGEgYmx1cnJlZCBiYWNrZ3JvdW5kIG9mIHRoZSBzYW1lIGltYWdlXHJcbiAgLy8gVGhlIHZhbHVlcyBhcmUgOiAxLiB3aWR0aCBvZiB0aGUgYmFja2dyb3VuZCwgMi4gaGVpZ2h0IG9mIHRoZSBiYWNrZ3JvdW5kLFxyXG4gIC8vIDMuIFRoZSBzaWdtYSB0byBibHVyICgwLTEwMCkuXHJcbiAgJ3RodW1iQ29tcG9zaXRlQmx1ciw4MCw2MCw2JyxcclxuICAndGh1bWJDb21wb3NpdGVCbHVyLDEwMCw3NSw2JyxcclxuICAndGh1bWJDb21wb3NpdGVCbHVyLDMyMCwyNDAsNicsXHJcbiAgJ3RodW1iQ29tcG9zaXRlQmx1ciw1NjAsNDIwLDYnLFxyXG4gICd0aHVtYkNvbXBvc2l0ZUJsdXIsNzYwLDU3MCw2JyxcclxuXTtcclxuXHJcbmxldCBzZXR0aW5ncyA9IHtcclxuICBpbWFnZXM6IG51bGwsXHJcbiAgYWxsb3dlZEZpbGVUeXBlczogWydpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9naWYnXSxcclxuICBtYXhGaWxlU2l6ZTogNSwgLy8gaW4gTWVnYWJ5dGUgTUJcclxuICBtYXhGaWxlczogMTAsXHJcbiAgdXBsb2FkVXJsOiAnaHR0cDovL21lZGlhLWFwaS5sb2NhbGhvc3QvdjEvbWVkaWEnLFxyXG59O1xyXG5cclxubGV0IGVycm9yID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdChjb25maWcgPSBudWxsKSB7XHJcbiAgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna21Ecm9wem9uZScpO1xyXG4gIHByZXZpZXdzRWxlbWVudCA9IG1haW5FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kei1wcmV2aWV3cycpO1xyXG4gIGNsaWNrYWJsZUVsZW1lbnQgPSBtYWluRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHotY2xpY2thYmxlJyk7XHJcbiAgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHotbWVzc2FnZScpO1xyXG4gIGNvbnN0IHRlc3QgPSBKU09OLnN0cmluZ2lmeShzZXR0aW5ncy5hbGxvd2VkRmlsZVR5cGVzKTtcclxuXHJcbiAgaWYgKGNvbmZpZyAhPT0gbnVsbCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJDb25maWc6IFwiLCBjb25maWcpO1xyXG4gICAgc2V0dGluZ3MgPSB7IC4uLnNldHRpbmdzLCAuLi5jb25maWcgfTtcclxuICB9XHJcbiAgaW5pdEV2ZW50cygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0RXZlbnRzKCkge1xyXG4gIGRvY3VtZW50XHJcbiAgICAuZ2V0RWxlbWVudEJ5SWQoJ2ttRHJvcHpvbmUnKVxyXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZU9uQ2hhbmdlKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlT25DaGFuZ2UoZSkge1xyXG4gIGlmIChlLnRhcmdldC5maWxlc1swXSkge1xyXG4gICAgY29uc3QgZmlsZVRvVXBsb2FkID0gZS50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAvLyBjb25zb2xlLmxvZyhmaWxlVG9VcGxvYWQpO1xyXG5cclxuICAgIGlmIChmaWxlVG9VcGxvYWQuc2l6ZSAvIDEwMjQwMDAgPiBzZXR0aW5ncy5tYXhGaWxlU2l6ZSkge1xyXG4gICAgICBlcnJvciA9IGBEaWUgbWF4aW1hbGUgRGF0ZWlncsO2w59lIGJldHLDpGd0ICR7c2V0dGluZ3MubWF4RmlsZVNpemV9IE1CLmA7XHJcbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmFsbG93ZWRGaWxlVHlwZXMuaW5kZXhPZihmaWxlVG9VcGxvYWQudHlwZSkgPT09IC0xKSB7XHJcbiAgICAgIGVycm9yID0gYEVzIGvDtm5uZW4gbnVyIEJpbGRlciB2b20gVHlwICR7c2V0dGluZ3MuYWxsb3dlZEZpbGVUeXBlcy50b1N0cmluZygpfSBob2NoZ2VsYWRlbiB3ZXJkZW4uYDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gc2V0TWVzc2FnZShlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgdXBsb2FkSW1hZ2UoZmlsZVRvVXBsb2FkKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICBzZXRNZXNzYWdlKCdVcGxvYWQgZmVobGdlc2NobGFnZW4hJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBVcGxvYWRFcnJvckhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHsgZXJyb3I6ICdVcGxvYWQgZmVobGdlc2NobGFnZW4nIH07XHJcbn07XHJcblxyXG5jb25zdCBVcGxvYWRQcm9ncmVzc0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuO1xyXG59O1xyXG5cclxuY29uc3QgVXBsb2FkU3VjY2Vzc0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGUudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgaWYgKGRhdGEuZXJyb3IpIHtcclxuICAgIGlmIChkYXRhLmVycm9yICE9PSAnSW50ZXJuYWwgRXJyb3InKSB7XHJcbiAgICAgIHJldHVybiBzZXRNZXNzYWdlKGRhdGEuZXJyb3IpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZW5kZXJQcmV2aWV3KGRhdGEpO1xyXG4gICAgLy8gc2V0U2hvd1Byb2dyZXNzTW9kYWwoZmFsc2UpO1xyXG4gIH1cclxufTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEltYWdlKGZpbGVUb1VwbG9hZCkge1xyXG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKCd1cGZpbGUnLCBmaWxlVG9VcGxvYWQpO1xyXG4gIGZvcm1EYXRhLmFwcGVuZCgndGFyZ2V0VXJsJywgJ2ltYWdlcy9hZCcpO1xyXG4gIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2VRdWFsaXR5JywgJzUyJyk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKCdmaXhPcmllbnRhdGlvbicsIEpTT04uc3RyaW5naWZ5KGZhbHNlKSk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKCdtYXhXaWR0aCcsICc4MDAnKTtcclxuICBmb3JtRGF0YS5hcHBlbmQoXHJcbiAgICAnYWxsb3dlZEZpbGVUeXBlcycsXHJcbiAgICBKU09OLnN0cmluZ2lmeShzZXR0aW5ncy5hbGxvd2VkRmlsZVR5cGVzKVxyXG4gICk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKCd2YXJpYW50cycsIEpTT04uc3RyaW5naWZ5KHZhcmlhbnRzKSk7XHJcblxyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBVcGxvYWRQcm9ncmVzc0hhbmRsZXIsIGZhbHNlKTtcclxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIFVwbG9hZFN1Y2Nlc3NIYW5kbGVyLCBmYWxzZSk7XHJcbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgVXBsb2FkRXJyb3JIYW5kbGVyLCBmYWxzZSk7XHJcbiAgeGhyLm9wZW4oJ1BPU1QnLCBzZXR0aW5ncy51cGxvYWRVcmwpO1xyXG4gIHhoci5zZW5kKGZvcm1EYXRhKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TWVzc2FnZShtc2csIHR5cGUgPSAnZXJyb3InKSB7XHJcbiAgcmVtb3ZlTWVzc2FnZSgpO1xyXG4gIG1lc3NhZ2VFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcclxuICAgICdhZnRlckJlZ2luJyxcclxuICAgIGA8c3BhbiBjbGFzcz1cIiR7dHlwZX1cIj4ke21zZ308c3Bhbj5gXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlTWVzc2FnZSgpIHtcclxuICBtZXNzYWdlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyUHJldmlldyhkYXRhKSB7XHJcbiAgY29uc3QgdGVtcGxhdGUgPSBgPGRpdiBjbGFzcz1cImR6LXByZXZpZXcgZmxvYXQtc3RhcnQgbWUtMyBtYi0zIGNhcmRcIiBpZD1cIm1lZGlhZmlsZS0ke2RhdGEuaWR9XCI+XHJcbiAgPGltZ1xyXG4gICAgY2xhc3M9XCJjYXJkLWltZy10b3BcIlxyXG4gICAgZGF0YS1kei10aHVtYm5haWw9XCJcIlxyXG4gICAgYWx0PVwiJHtkYXRhLnZhcmlhbnRzLnRodW1iQ29tcG9zaXRlQmx1cl8xMDBfNzVfNn1cIlxyXG4gICAgc3JjPVwiJHtkYXRhLnZhcmlhbnRzLnRodW1iQ29tcG9zaXRlQmx1cl8xMDBfNzVfNn1cIlxyXG4gID5cclxuICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5IHRleHQtY2VudGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZHotbGlua3NcIj5cclxuICAgICAgPGEgY2xhc3M9XCJkei1yZW1vdmVcIiBocmVmPVwiXCIgZGF0YS1kei1yZW1vdmU9XCJcIlxyXG4gICAgICAgID48c3ZnXHJcbiAgICAgICAgICBjbGFzcz1cImR6LWljb24gZHotaWNvbi10cmFzaFwiXHJcbiAgICAgICAgICB3aWR0aD1cIjI0cHhcIlxyXG4gICAgICAgICAgaGVpZ2h0PVwiMjRweFwiXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgIHZlcnNpb249XCIxLjFcIlxyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDx0aXRsZT5CaWxkIGzDtnNjaGVuPC90aXRsZT5cclxuICAgICAgICAgIDxnIHN0cm9rZT1cIm5vbmVcIiBzdHJva2Utd2lkdGg9XCIxXCIgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCI+XHJcbiAgICAgICAgICAgIDxyZWN0IG9wYWNpdHk9XCIwXCIgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPjwvcmVjdD5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBjbGFzcz1cInBhdGgtMVwiXHJcbiAgICAgICAgICAgICAgZD1cIk02LDggTDYsMjAuNSBDNiwyMS4zMjg0MjcxIDYuNjcxNTcyODgsMjIgNy41LDIyIEwxNi41LDIyIEMxNy4zMjg0MjcxLDIyIDE4LDIxLjMyODQyNzEgMTgsMjAuNSBMMTgsOCBMNiw4IFpcIlxyXG4gICAgICAgICAgICAgIGZpbGw9XCIjMDAwMDAwXCJcclxuICAgICAgICAgICAgICBmaWxsLXJ1bGU9XCJub256ZXJvXCJcclxuICAgICAgICAgICAgPjwvcGF0aD5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBjbGFzcz1cInBhdGgtMlwiXHJcbiAgICAgICAgICAgICAgZD1cIk0xNCw0LjUgTDE0LDQgQzE0LDMuNDQ3NzE1MjUgMTMuNTUyMjg0NywzIDEzLDMgTDExLDMgQzEwLjQ0NzcxNTMsMyAxMCwzLjQ0NzcxNTI1IDEwLDQgTDEwLDQuNSBMNS41LDQuNSBDNS4yMjM4NTc2Myw0LjUgNSw0LjcyMzg1NzYzIDUsNSBMNSw1LjUgQzUsNS43NzYxNDIzNyA1LjIyMzg1NzYzLDYgNS41LDYgTDE4LjUsNiBDMTguNzc2MTQyNCw2IDE5LDUuNzc2MTQyMzcgMTksNS41IEwxOSw1IEMxOSw0LjcyMzg1NzYzIDE4Ljc3NjE0MjQsNC41IDE4LjUsNC41IEwxNCw0LjUgWlwiXHJcbiAgICAgICAgICAgICAgZmlsbD1cIiMwMDAwMDBcIlxyXG4gICAgICAgICAgICAgIG9wYWNpdHk9XCIwLjNcIlxyXG4gICAgICAgICAgICA+PC9wYXRoPlxyXG4gICAgICAgICAgPC9nPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2E+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS0gICAgICAgIDxkaXYgY2xhc3M9XCJkei1wcm9ncmVzc1wiPjxzcGFuIGNsYXNzPVwiZHotdXBsb2FkXCIgZGF0YS1kei11cGxvYWRwcm9ncmVzcz48L3NwYW4+PC9kaXY+LS0+XHJcbiAgPC9kaXY+XHJcbiAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiTWVkaWFJbWFnZXNbJHtkYXRhLmlkfV1baWRdXCIgdmFsdWU9XCIke0pTT04uc3RyaW5naWZ5KFtkYXRhXSl9XCI+XHJcbjwvZGl2PmA7XHJcblxyXG4gIHByZXZpZXdzRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlKTtcclxuICBjb25zdCBsYXN0UHJldmlldyA9IG1haW5FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kei1wcmV2aWV3cycpLmxhc3RDaGlsZDtcclxuICBsYXN0UHJldmlld1xyXG4gICAgLnF1ZXJ5U2VsZWN0b3IoJy5kei1yZW1vdmUnKVxyXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsYXN0UHJldmlldy5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaW5pdCB9IGZyb20gJy4vZHJvcHpvbmUubW9kdWxlJztcclxud2luZG93LkttRHJvcHpvbmVJbml0ID0gaW5pdDtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9