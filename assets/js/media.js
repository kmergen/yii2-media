/*Load content from media image tools and media alt translation in Modal window
Set a link like the following in your code to load the form in a modal window e.g for the alt translation form:
<a href="/media/media/ajax-alt"
 */

$('body').on('click', '[data-media-widget]', function (event) {
  event.preventDefault();
  var el = $(this);
  var widget = el.data('mediaWidget');
  var modal = $('#' + el.data('modalTarget'));
  modal.find('.modal-title').text(el.data('modalTitle'));
  var modalBody = modal.find('.modal-body').empty();
  var postParams = {}
  var url = '';
  if (widget === 'alt-translations') {
    url = '/media/media/ajax-alt-update' + '?id=' + el.data('id');
    postParams.showLanguages = el.data('showLanguages');
  } else if (widget === 'image-tools') {
    url = '/media/media/ajax-image-tools' + '?id=' + el.data('id');
    postParams.thumbstyle = el.data('thumbstyle');
  }

  modalBody.load(url, postParams);
  modal.modal({backdrop: el.data('modalBackdrop')});

});

//Submit forms via ajax
$('body').on('submit', '.media-modal-form', function (event) {
  event.preventDefault();
  var form = $(this);
  var modal = form.parents('.modal');
  var modalBody = form.parents('.modal-body');
  $.post($(form).attr('action'), $(form).serialize())
    .done(function (data, textStatus, jqXHR) {
      if (data.hasOwnProperty('success') || data.hasOwnProperty('error')) {
        var html = data.hasOwnProperty('success') ? '<div class="text-success">' + data.success + '</div>' : '<div class="text-danger">' + data.error + '</div>';
        modalBody.html(html)
        setTimeout(function () {
          modalBody.empty()
          modal.modal('hide')
        }, 2500);
        if (data.hasOwnProperty('refreshThumbnail')) {
          var el = document.getElementById('mediafile-161');
          var image = el.querySelector('img');
         image.setAttribute('src', '/images/ad/thumbs/medium/American Water Spaniel_1_7035b96697016877.jpg?' + new Date().getTime());
        }
      } else {
        modalBody.html(data)
      }
    });
})

// Rotate image, Media Image tools
$('body').on('click', '#rotate-image', function (event) {
  event.preventDefault();
  var imgContainer = document.getElementById('imgContainer');
  inputDeg = document.querySelector('input[name="image-rotate-deg"]');
  var oldDeg = parseInt(inputDeg.value);
  newDeg = oldDeg + 90;

  if (newDeg === 360) {
    inputDeg.value = 0;
    imgContainer.classList.remove('rotate270');
  } else {
    imgContainer.classList.remove('rotate' + oldDeg);
    imgContainer.classList.add('rotate' + newDeg);
    inputDeg.value = newDeg;
  }
})
