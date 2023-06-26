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

  // Ensure that the previewVariant will created
  if (
    settings.previewVariant !== null &&
    settings.variants.indexOf(settings.previewVariant) < 0
  ) {
    settings.variants.push(settings.previewVariant);
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
    const preparedPreviewVariant = settings.previewVariant.replaceAll(',', '_');
    data.previewUrl = data.variants[preparedPreviewVariant];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9yL2ttZXJnZW4veWlpMi1tZWRpYS93aWRnZXRzL2Ryb3B6b25lL2Fzc2V0cy9kcm9wem9uZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQmM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxzQkFBc0I7QUFDdkUsTUFBTTtBQUNOLDhDQUE4QyxzQ0FBc0M7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSyxJQUFJLElBQUk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDbktBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7QUFDekMsd0JBQXdCLGtEQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veWlpMmRldmVsb3Atd2VicGFjay8uL2Fzc2V0cy9qcy9oZWxwZXJzLmpzIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svLi9hc3NldHMvanMva21lcmdlbi95aWkyLW1lZGlhL2Ryb3B6b25lLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly95aWkyZGV2ZWxvcC13ZWJwYWNrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3lpaTJkZXZlbG9wLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly95aWkyZGV2ZWxvcC13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8veWlpMmRldmVsb3Atd2VicGFjay8uL2Fzc2V0cy9qcy9rbWVyZ2VuL3lpaTItbWVkaWEvZHJvcHpvbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgS01oZWxwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgLy8gQ3JlYXRlIHRoZSBoZWxwZXIgbWV0aG9kcyBvYmplY3RcclxuICAgIGNvbnN0IF8gPSB7fVxyXG5cclxuICAgIF8uZ2V0Q3NyZlRva2VuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBnZXRDc3JmVG9rZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBfLmdldERlZmF1bHRQb3N0SGVhZGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICdYLUNTUkYtVG9rZW4nOiBnZXRDc3JmVG9rZW4oKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBQcml2YXRlIGdvZXMgaGVyZVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENzcmZUb2tlbigpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXhwb3NlIHRoZSBwdWJsaWMgaGVscGVyIG1ldGhvZHNcclxuICAgIHJldHVybiBfO1xyXG5cclxufSkoKVxyXG5leHBvcnQgZGVmYXVsdCBLTWhlbHBlclxyXG4iLCJpbXBvcnQgS01oZWxwZXIgZnJvbSAnLi4vLi4vaGVscGVycyc7XHJcbi8vIEltYWdlIFVwbG9hZGVyIGZvciB1cGxvYWRpbmcgaW1hZ2VzIHRvIGFkc1xyXG5cclxubGV0IG1haW5FbGVtZW50ID0gbnVsbDtcclxubGV0IHByZXZpZXdzRWxlbWVudCA9IG51bGw7XHJcbmxldCBjbGlja2FibGVFbGVtZW50ID0gbnVsbDtcclxubGV0IG1lc3NhZ2VFbGVtZW50ID0gbnVsbDtcclxuXHJcbi8vIEFsbG93ZWQgcGx1Z2luT3B0aW9ucyB3aGljaCBjYW4gYmUgc2V0IGluIERyb3B6b25lIHdpZGdldFxyXG5sZXQgc2V0dGluZ3MgPSB7XHJcbiAgYWxsb3dlZEZpbGVUeXBlczogWydpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9naWYnXSxcclxuICBmaWxlczogW10sXHJcbiAgdmFyaWFudHM6IFtdLFxyXG4gIG1heEZpbGVTaXplOiA1LCAvLyBpbiBNZWdhYnl0ZSBNQlxyXG4gIG1heEZpbGVzOiAxMCxcclxuICB1cGxvYWRVcmw6ICcvbWVkaWEvdXBsb2FkJyxcclxuICBwcmV2aWV3VmFyaWFudDogbnVsbCwgLy8gSWYgaXQgaXMgbm90IHNldCwgbm8gcHJldmlldyB0aHVtYm5haWwgd2lsbCBjcmVhdGVkIG9uIHNlcnZlciBzaWRlXHJcbiAgcHJldmlld1RlbXBsYXRlOiAnJyxcclxufTtcclxuXHJcbmxldCBlcnJvciA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoY29uZmlnID0gbnVsbCkge1xyXG4gIG1haW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ttRHJvcHpvbmUnKTtcclxuICBwcmV2aWV3c0VsZW1lbnQgPSBtYWluRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHotcHJldmlld3MnKTtcclxuICBjbGlja2FibGVFbGVtZW50ID0gbWFpbkVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR6LWNsaWNrYWJsZScpO1xyXG4gIG1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmR6LW1lc3NhZ2UnKTtcclxuXHJcbiAgaWYgKGNvbmZpZyAhPT0gbnVsbCkge1xyXG4gICAgc2V0dGluZ3MgPSB7IC4uLnNldHRpbmdzLCAuLi5jb25maWcgfTtcclxuICB9XHJcblxyXG4gIC8vIEVuc3VyZSB0aGF0IHRoZSBwcmV2aWV3VmFyaWFudCB3aWxsIGNyZWF0ZWRcclxuICBpZiAoXHJcbiAgICBzZXR0aW5ncy5wcmV2aWV3VmFyaWFudCAhPT0gbnVsbCAmJlxyXG4gICAgc2V0dGluZ3MudmFyaWFudHMuaW5kZXhPZihzZXR0aW5ncy5wcmV2aWV3VmFyaWFudCkgPCAwXHJcbiAgKSB7XHJcbiAgICBzZXR0aW5ncy52YXJpYW50cy5wdXNoKHNldHRpbmdzLnByZXZpZXdWYXJpYW50KTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50XHJcbiAgICAuZ2V0RWxlbWVudEJ5SWQoJ2ttRHJvcHpvbmUnKVxyXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZU9uQ2hhbmdlKTtcclxuXHJcbiAgcmVuZGVyRXhpc3RpbmdGaWxlcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJFeGlzdGluZ0ZpbGVzKCkge1xyXG4gIHNldHRpbmdzLmZpbGVzLm1hcCgoaW1hZ2UpID0+IHtcclxuICAgIHJlbmRlclByZXZpZXcoaW1hZ2UpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKiBJbWFnZSBVcGxvYWQgKi9cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlT25DaGFuZ2UoZSkge1xyXG4gIHJlbW92ZU1lc3NhZ2UoKTtcclxuICBpZiAoZS50YXJnZXQuZmlsZXNbMF0pIHtcclxuICAgIGNvbnN0IGZpbGVUb1VwbG9hZCA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgLy8gY29uc29sZS5sb2coZmlsZVRvVXBsb2FkKTtcclxuXHJcbiAgICBpZiAoZmlsZVRvVXBsb2FkLnNpemUgLyAxMDI0MDAwID4gc2V0dGluZ3MubWF4RmlsZVNpemUpIHtcclxuICAgICAgZXJyb3IgPSBgRGllIG1heGltYWxlIERhdGVpZ3LDtsOfZSBiZXRyw6RndCAke3NldHRpbmdzLm1heEZpbGVTaXplfSBNQi5gO1xyXG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5hbGxvd2VkRmlsZVR5cGVzLmluZGV4T2YoZmlsZVRvVXBsb2FkLnR5cGUpID09PSAtMSkge1xyXG4gICAgICBlcnJvciA9IGBFcyBrw7ZubmVuIG51ciBCaWxkZXIgdm9tIFR5cCAke3NldHRpbmdzLmFsbG93ZWRGaWxlVHlwZXMudG9TdHJpbmcoKX0gaG9jaGdlbGFkZW4gd2VyZGVuLmA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBzZXRNZXNzYWdlKGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB1cGxvYWRJbWFnZShmaWxlVG9VcGxvYWQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHNldE1lc3NhZ2UoJ1VwbG9hZCBmZWhsZ2VzY2hsYWdlbiEnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IFVwbG9hZEVycm9ySGFuZGxlciA9ICgpID0+IHtcclxuICByZXR1cm4geyBlcnJvcjogJ1VwbG9hZCBmZWhsZ2VzY2hsYWdlbicgfTtcclxufTtcclxuXHJcbmNvbnN0IFVwbG9hZFByb2dyZXNzSGFuZGxlciA9ICgpID0+IHtcclxuICByZXR1cm47XHJcbn07XHJcblxyXG5jb25zdCBVcGxvYWRTdWNjZXNzSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZS50YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSkge1xyXG4gICAgaWYgKGRhdGEuZXJyb3IgIT09ICdJbnRlcm5hbCBFcnJvcicpIHtcclxuICAgICAgcmV0dXJuIHNldE1lc3NhZ2UoZGF0YS5lcnJvcik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHByZXBhcmVkUHJldmlld1ZhcmlhbnQgPSBzZXR0aW5ncy5wcmV2aWV3VmFyaWFudC5yZXBsYWNlQWxsKCcsJywgJ18nKTtcclxuICAgIGRhdGEucHJldmlld1VybCA9IGRhdGEudmFyaWFudHNbcHJlcGFyZWRQcmV2aWV3VmFyaWFudF07XHJcbiAgICByZW5kZXJQcmV2aWV3KGRhdGEpO1xyXG4gICAgLy8gc2V0U2hvd1Byb2dyZXNzTW9kYWwoZmFsc2UpO1xyXG4gIH1cclxufTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEltYWdlKGZpbGVUb1VwbG9hZCkge1xyXG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9ybURhdGEuYXBwZW5kKCd1cGZpbGUnLCBmaWxlVG9VcGxvYWQpO1xyXG4gIHNldHRpbmdzLmhhc093blByb3BlcnR5KCd0YXJnZXRVcmwnKSAmJlxyXG4gICAgZm9ybURhdGEuYXBwZW5kKCd0YXJnZXRVcmwnLCBzZXR0aW5ncy50YXJnZXRVcmwpO1xyXG4gIHNldHRpbmdzLmhhc093blByb3BlcnR5KCdpbWFnZVF1YWxpdHknKSAmJlxyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZVF1YWxpdHknLCBzZXR0aW5ncy5pbWFnZVF1YWxpdHkpO1xyXG4gIHNldHRpbmdzLmhhc093blByb3BlcnR5KCdmaXhPcmllbnRhdGlvbicpICYmXHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpeE9yaWVudGF0aW9uJywgSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MuZml4T3JpZW50YXRpb24pKTtcclxuICBzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnbWF4V2lkdGgnKSAmJlxyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdtYXhXaWR0aCcsIHNldHRpbmdzLm1heFdpZGgpO1xyXG4gIGZvcm1EYXRhLmFwcGVuZChcclxuICAgICdhbGxvd2VkRmlsZVR5cGVzJyxcclxuICAgIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzLmFsbG93ZWRGaWxlVHlwZXMpXHJcbiAgKTtcclxuICBmb3JtRGF0YS5hcHBlbmQoJ3ZhcmlhbnRzJywgSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MudmFyaWFudHMpKTtcclxuXHJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIFVwbG9hZFByb2dyZXNzSGFuZGxlciwgZmFsc2UpO1xyXG4gIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgVXBsb2FkU3VjY2Vzc0hhbmRsZXIsIGZhbHNlKTtcclxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBVcGxvYWRFcnJvckhhbmRsZXIsIGZhbHNlKTtcclxuICB4aHIub3BlbignUE9TVCcsIHNldHRpbmdzLnVwbG9hZFVybCk7XHJcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcclxuICB4aHIuc2VuZChmb3JtRGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE1lc3NhZ2UobXNnLCB0eXBlID0gJ2Vycm9yJykge1xyXG4gIHJlbW92ZU1lc3NhZ2UoKTtcclxuICBtZXNzYWdlRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXHJcbiAgICAnYWZ0ZXJCZWdpbicsXHJcbiAgICBgPHNwYW4gY2xhc3M9XCIke3R5cGV9XCI+JHttc2d9PHNwYW4+YFxyXG4gICk7XHJcbiAgc2V0VGltZW91dChyZW1vdmVNZXNzYWdlLCA2MDAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlTWVzc2FnZSgpIHtcclxuICBtZXNzYWdlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyUHJldmlldyhkYXRhKSB7XHJcbiAgY29uc3QgdGVtcGxhdGUgPSBzZXR0aW5ncy5wcmV2aWV3VGVtcGxhdGU7XHJcblxyXG4gIHByZXZpZXdzRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlKTtcclxuICBjb25zdCBwcmV2aWV3RWxlbWVudCA9IG1haW5FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kei1wcmV2aWV3cycpLmxhc3RDaGlsZDtcclxuXHJcbiAgY29uc3QgdGh1bWJFbGVtZW50ID0gcHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZHotdGh1bWJuYWlsXScpO1xyXG4gIHRodW1iRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGRhdGEucHJldmlld1VybCk7XHJcbiAgdGh1bWJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYWx0JywgZGF0YS5wcmV2aWV3VXJsKTtcclxuXHJcbiAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgdGhlIGhpZGRlbiBpbnB1dFxyXG4gIGNvbnN0IGhpZGRlbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGhpZGRlbkVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG4gIGhpZGRlbkVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgJ01lZGlhRmlsZXNbJyArIGRhdGEuaWQgKyAnXVtpZF0nKTtcclxuICBoaWRkZW5FbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBkYXRhLmlkKTtcclxuICBwcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChoaWRkZW5FbGVtZW50KTtcclxuXHJcbiAgcHJldmlld0VsZW1lbnRcclxuICAgIC5xdWVyeVNlbGVjdG9yKCcuZHotcmVtb3ZlJylcclxuICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcHJldmlld0VsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXQgfSBmcm9tICcuL2Ryb3B6b25lLm1vZHVsZSc7XHJcbndpbmRvdy5LbURyb3B6b25lSW5pdCA9IGluaXQ7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==