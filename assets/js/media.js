/*Load content from media image tools and media alt translation in Modal window
Set a link like the following in your code to load the form in a modal window e.g for the alt translation form:
<a href="/media/media/ajax-alt">Title</a>
 */
const KMMedia = (function () {

    // Public goes here
    const pub = {
        initDropzoneMediaWidgetEvent: function (el) {
            // This function is also called from dropzone widget when we added a new file.
            el.addEventListener('click', function (event) {
                event.preventDefault();
                const el = this;
                const widget = el.dataset.mediaWidget;
                const modal = document.getElementById(el.dataset.modalTarget);
                modal.querySelector('.modal-title').innerHTML = el.dataset.modalTitle;
                const modalBody = modal.querySelector('.modal-body');
                let postParams = {};
                let url = '';
                if (widget === 'alt-translations') {
                    url = '/media/media/ajax-alt-update' + '?id=' + el.dataset.id;
                    postParams.showLanguages = el.dataset.showLanguages;
                } else if (widget === 'image-tools') {
                    url = '/media/media/ajax-image-tools' + '?id=' + el.dataset.id;
                    postParams.thumbstyle = el.dataset.thumbstyle;
                }
                postData(url, postParams)
                    .then(function (data) {
                        const instModal = new KMapp.Modal(modal, {
                            backdrop: el.dataset.modalBackdrop,
                            keyboard: false
                        })
                        modalBody.innerHTML = data.content;
                        // Add submit event handler to modal-form
                        modal.querySelector('.media-modal-form').addEventListener('submit', function (event) {
                            event.preventDefault();
                            handleModalFormSubmit(event.currentTarget, modalBody, instModal)
                        });
                        if (widget === 'image-tools') {
                            modalBody.querySelector('.image-to-rotate').addEventListener('load', function (event) {
                                const img = event.currentTarget;
                                let imgWidth = img.width;
                                let imgHeight = img.height;
                                const landscape = imgWidth > imgHeight;
                                const ratio = landscape ? imgWidth / imgHeight : imgHeight / imgWidth;
                                if (landscape) {
                                    document.getElementById('imgContainer').setAttribute('style', `min-height:${imgWidth}px`)
                                } else { // Portrait
                                    img.setAttribute('style', `max-width:${imgWidth / ratio}px`)
                                }
                                document.getElementById('btn-rotate-image').addEventListener('click', rotateImage);
                            });
                        }
                        // Show the modal
                        instModal.show();
                    })
            })

        }
    }

    // Private goes here

    // Rotate image, Media Image tools
    function rotateImage(event) {
        event.preventDefault();
        const imgContainer = document.getElementById('imgContainer');
        const inputDeg = document.querySelector('.media-modal-form').querySelector('input[name="image-rotate-deg"]');
        const oldDeg = parseInt(inputDeg.value);
        const newDeg = oldDeg + 90;

        if (newDeg === 360) {
            inputDeg.value = 0;
            imgContainer.classList.remove('rotate270');
        } else {
            imgContainer.classList.remove('rotate' + oldDeg);
            imgContainer.classList.add('rotate' + newDeg);
            inputDeg.value = newDeg;
        }
    }

    function handleModalFormSubmit(form, modalBody, instModal) {
        const url = form.getAttribute('action');
        let formData = new FormData(form);
        postData(url, formData, '')
            // .then(response => response.json())
            .then(function (data) {
                // console.log(data);
                if (data.hasOwnProperty('success') || data.hasOwnProperty('error')) {
                    modalBody.innerHTML = data.hasOwnProperty('success') ? '<div class="text-success">' + data.success + '</div>' : '<div class="text-danger">' + data.error + '</div>';
                    setTimeout(function () {
                        modalBody.innerHTML = '';
                        instModal.hide();
                        instModal.dispose();
                    }, 1500);
                    if (data.hasOwnProperty('refreshThumbnail')) {
                        const el = document.getElementById('mediafile-' + data.id);
                        const image = el.querySelector('img');
                        image.setAttribute('src', image.getAttribute('src') + '?' + new Date().getTime());
                    }
                }
            });
    }

    /** Send ajax post request
     If you will send a FormData object set param contentType to empty string (contentType = '')
     @see https://developer.mozilla.org/de/docs/Web/API/FormData
     */
    async function postData(url, data = {}, contentType = 'application/json') {
        const headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content')
        }
        if (contentType !== '') {
            headers['Content-Type'] = contentType;
            data = JSON.stringify(data);
        }
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: data
        })
        return response.json()
    }

    return pub
})()
