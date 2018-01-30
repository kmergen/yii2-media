<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\widgets\dropzone;

use Yii;
use yii\base\Widget;
use yii\base\InvalidConfigException;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\helpers\Json;
use yii\helpers\ArrayHelper;

/**
 * Dropzone Upload widget
 *
 * File Upload widget using the dropzone.js
 * @see http://http://www.dropzonejs.com/
 * @see https://github.com/enyo/dropzone/
 *
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class Dropzone extends Widget
{

    /**
     * @var array the existing files to add to the dropzone.
     * The array should be in the Media model format
     * If [[model]] is set, then the files array will filled with the prepared mediaFiles from the model.
     */
    public $files = [];

    /**
     * @var object the model which hold the already stored files (in Media Module the media files are provided and stored by the MediaAlbumBehavior)
     * There is no need to declare an extra attribute variable because the name of the attribute is always [[mediaFiles]] and can you can get them by calling [[$this->model->mediaFiles]]
     */
    public $model;

    /**
     * @var array An array with languages in which the alt attribute should be translated.
     * If empty, no alt input element is created. That means the translation feature is off.
     * If not empty, for each language an alt attribute input element is created. (Typically values are Yii::$app->language or Yii::$app->urlManager->languages)
     */
    public $languages = [];

    /**
     * @var array The HTML options for the dropzone container. The cssClass 'dropzone' will set in [[init()]].
     */
    public $htmlOptions = [];

    /**
     * @var array An array of options that are supported by Dropzone
     */
    public $options = [];

    /**
     * @var array An array of client events that are supported by Dropzone
     */
    public $clientEvents = [];

    /**
     * @var string A thumbStyle provided by kmergen\media\components\Image
     * If set, it create a thumbnail on serverside and return thumbnail url. Otherwise no serverside thumbnail will be created.
     * If set, the Dropzon option [[$options['createImageThumbnails']]] is set to false.
     */
    public $thumbStyle;

    /**
     * @var string the delete url
     * If not set it create a url from [[$options['url'] with suffix '-delete'. eg '/post/upload-delete'.
     */
    public $deleteUrl;

    /**
     * @var string The template of the dropzone UI.
     */
    public $uiTemplate = '{beginDz}{beginDzPreviews}{dzClickable}{endDzPreviews}{dzMessage}{endDz}';

    /**
     * @var array The template parts.
     * @see renderUITemplate()
     */
    public $uiTemplateParts = [];

    /**
     * @var string The name of this dropzone instance This name will extended by the widget id in [[init()]].
     */
    protected $dropzoneName = 'dropzone';

    public function init()
    {
        parent::init();

        if (!isset($this->options['url'])) {
            throw new InvalidConfigException('Url is required.');
        }

        if (!isset($this->deleteUrl)) {
            $this->deleteUrl = Url::toRoute($this->options['url'] . '-delete');
        }

        $this->options['url'] = Url::toRoute($this->options['url']);

        if (!isset($this->options['previewTemplate'])) {
            $this->options['previewTemplate'] = $this->render('preview-template');
        }

        if (!isset($this->options['addRemoveLinks'])) {
            $this->options['addRemoveLinks'] = true;
            $this->options['dictRemoveFile'] = Yii::t('media', 'Delete');
        }

        if (!isset($this->options['paramName'])) {
            $this->options['paramName'] = $this->id . 'file';
        }
        $this->options['params']['paramName'] = $this->options['paramName'];

        $this->dropzoneName = 'dropzone_' . $this->id;

        if ($this->thumbStyle !== null) {
            $this->options['createImageThumbnails'] = false;
            $this->options['params']['thumbStyle'] = $this->thumbStyle;
        }
        $this->options['params']['deleteUrl'] = $this->deleteUrl;

        //Set default messages
        if (!isset($this->options['dictDefaultMessage'])) {
            $this->options['dictDefaultMessage'] = Yii::t('media', 'Drop files here to upload');
        }
        if (!isset($this->options['dictFallbackMessage'])) {
            $this->options['dictFallbackMessage'] = Yii::t('media', 'Your browser does not support drag\'n\'drop file uploads.');
        }
        if (!isset($this->options['dictFallbackText'])) {
            $this->options['dictFallbackText'] = Yii::t('media', 'Please use the fallback form below to upload your files like in the olden days.');
        }
        if (!isset($this->options['dictFileTooBig'])) {
            $this->options['dictFileTooBig'] = Yii::t('media', 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.');
        }
        if (!isset($this->options['dictInvalidFileType'])) {
            $this->options['dictInvalidFileType'] = Yii::t('media', 'You can\'t upload files of this type.');
        }
        if (!isset($this->options['dictResponseError'])) {
            $this->options['dictResponseError'] = Yii::t('media', 'Server responded with {{statusCode}} code.');
        }
        if (!isset($this->options['dictCancelUpload'])) {
            $this->options['dictCancelUpload'] = Yii::t('media', 'Cancel upload');
        }
        if (!isset($this->options['dictCancelUploadConfirmation'])) {
            $this->options['dictCancelUploadConfirmation'] = Yii::t('media', 'Are you sure you want to cancel this upload?');
        }
        if (!isset($this->options['dictRemoveFile'])) {
            $this->options['dictRemoveFile'] = Yii::t('media', 'Delete');
        }
        if (!isset($this->options['dictMaxFilesExceeded'])) {
            $this->options['dictMaxFilesExceeded'] = Yii::t('media', 'Maximum number of uploaded files reached.');
        }
    }

    public function run()
    {
        if (Yii::$app->request->enableCsrfValidation) {
            $this->options['params'][Yii::$app->request->csrfParam] = Yii::$app->request->getCsrfToken();
        }

        $this->htmlOptions['id'] = $this->id;
        Html::addCssClass($this->htmlOptions, 'dropzone');
        echo $this->renderUITemplate();

        if ($this->model !== null && !empty($this->model->mediaFiles)) {
            $this->prepareMediaFiles();
        }

        $this->addEvents();
        $this->registerClientScript();
    }

    /**
     * Render the UI for the dropzone
     */
    protected function renderUITemplate()
    {
        $parts['{beginDz}'] = isset($this->uiTemplateParts['beginDz'])
            ? $this->uiTemplateParts['beginDz']
            : Html::beginTag('div', $this->htmlOptions);
        $parts['{beginDzPreviews}'] = isset($this->uiTemplateParts['beginDzPreviews'])
            ? $this->uiTemplateParts['beginDzPreviews']
            : Html::beginTag('div', ['class' => 'dropzone-previews form-row']);
        $parts['{dzMessage}'] = isset($this->uiTemplateParts['dzMessage'])
            ? $this->uiTemplateParts['dzMessage']
            : Html::tag('div', '<span>' . $this->options['dictDefaultMessage'] . '</span>', ['class' => 'dz-default dz-message']);
        $parts['{dzClickable}'] = isset($this->uiTemplateParts['dzClickable'])
            ? $this->uiTemplateParts['dzClickable']
            : '<div class="dz-add-file col-md-2"><div class="inner text-center">+</div></div>';
        $parts['{endDzPreviews}'] = isset($this->uiTemplateParts['endDzPreviews'])
            ? $this->uiTemplateParts['endDzPreviews']
            : Html::endTag('div');
        $parts['{endDz}'] = isset($this->uiTemplateParts['endDz'])
            ? $this->uiTemplateParts['endDz']
            : Html::endTag('div');

        return strtr($this->uiTemplate, $parts);
    }

    /**
     * Prepare the existing files from media model to add them to the dropzone
     */
    protected function prepareMediaFiles()
    {
        foreach ($this->model->mediaFiles as $file) {
            $i = $file['id'];
            $this->files[$i]['id'] = $file['id'];
            $this->files[$i]['name'] = $file['name'];
            $this->files[$i]['size'] = (int)$file['size'];
            $this->files[$i]['url'] = $file['url'];
            $this->files[$i]['isTemp'] = $file['status'] == \kmergen\media\models\Media::STATUS_TEMP ? true : false;
            $this->files[$i]['type'] = $file['type'];
            if (strpos($file['type'], 'image/') !== false) {
                $this->files[$i]['thumbnailUrl'] = Yii::$app->image->thumb($file['url'], $this->thumbStyle);
            }
            $this->files[$i]['deleteUrl'] = Url::toRoute([$this->deleteUrl]);
            $this->files[$i]['translations'] = ArrayHelper::index($file['translations'], 'language');
        }
    }

    /**
     * Registers required javascript for the plugin
     */
    public function registerClientScript()
    {
        $view = $this->getView();
        DropzoneAsset::register($view);

        //Important to set autoDiscover to POS_END, not working on POS_READY
        $view->registerJs('Dropzone.autoDiscover = false;', $view::POS_END);
        $js[] = $this->dropzoneName . ' = new Dropzone("#' . $this->id . '", ' . Json::encode($this->options) . ');';

        if (!empty($this->clientEvents)) {
            foreach ($this->clientEvents as $event => $handler) {
                $js[] = "{$this->dropzoneName}.on('$event', $handler);";
            }
        }

        $js[] = $this->commonJs();
        $view->registerJs(implode("\n", $js));

    }

    /**
     * Add the necassary dropzone events
     */
    public function addEvents()
    {
        $events['addedfile'] = <<<JS
            function (file) {
               var el = this.previewsContainer.querySelector('.dz-add-file');
               this.previewsContainer.appendChild(el);
            }
JS;
        $events['success'] = <<<JS
            function (file, data) {
                var dz = this;
                if (data.hasOwnProperty('error')) {
                    file.status = 'error';
                    this.emit('error', file, {message: data.error});
                } else {
                    this.DzHelper.extend(file, data);
                    if (file.type.match(/image.*/) && file.hasOwnProperty('thumbnailUrl')) {
                        dz.emit('thumbnail', file, file.thumbnailUrl);
                    }
                }
            }
JS;
        $events['error'] = <<<JS
function (file, error) {
    file.previewElement.querySelector('.dz-error-message span').innerHTML = 'Es ist ein Serverfehler aufgetreten.';
    var dz = this;
    var pe = file.previewElement.querySelector('.dz-preview-file')
    pe.innerHTML = '<span class="text-danger">' + error.message + '</span>';
    setTimeout(function () {
        dz.removeFile(file);
    }, 3000);
    if (this.options.addRemoveLinks) {
        var removeLink = file.previewElement.querySelector('.dz-remove');
        removeLink.remove();
    }
}
            
JS;
        $events['removedfile'] = <<<JS
            function(file) {
                if (file.accepted === true) {
                    this.element.querySelector('.dz-message span').innerHTML = this.options.dictDefaultMessage;
                }
                if(file.hasOwnProperty('processing') && file.status !== 'error') {
                    //We delete only the files which are uploaded
                    // TODO Do this by modeluploads. For other uploads we must look for annohter solution.  
                    this.DzHelper.deleteUploadedFile(file);
                }
                var el = this.previewsContainer.querySelector('.dz-add-file');
                if (this.files.length < this.options.maxFiles) {
                   this.DzHelper.show(el);
               }
            }
JS;
        $events['complete'] = <<<JS
function (file) {
    if (file.status === 'success') {
        var helper = this.DzHelper;
        helper.setAttributes(file);
        helper.fileIdInputElement(file);
        //Add the alt input elements to preview element
        if (helper.languages.length > 0) {
            helper.altInputElements(file);
            //Add the alt translations event
            var el = file.previewElement.querySelector('.dz-alt-trigger');
            el.addEventListener('click', function (e) {
                e.preventDefault();
                var elAltInputs = file.previewElement.querySelector('.dz-alt-inputs');

                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    helper.hide(elAltInputs);
                } else {
                    this.classList.add('active');
                    helper.show(elAltInputs);
                }
            });
        }

        if (this.options.addRemoveLinks) {
            var removeLink = file.previewElement.querySelector('.dz-remove');
            file.previewElement.querySelector('.dz-preview-file').appendChild(removeLink);
        }

        file.previewElement.querySelector('.dz-progress').remove();
    }
}
JS;
        $events['maxfilesreached'] = <<<JS
           function(files) {
               var el = this.previewsContainer.querySelector('.dz-add-file');
               if (this.files.length >= this.options.maxFiles) {
                   this.DzHelper.hide(el);
               }
              this.element.querySelector('.dz-message span').innerHTML = this.options.dictMaxFilesExceeded;
           }
JS;
        $events['maxfilesexceeded'] = <<<JS
           function(file) {
               this.removeFile(file);
           }
JS;
        $events['uploadprogress'] = <<<JS
           function(file, progress, bytesSent) {
               var progressElement = file.previewElement.querySelector(".dz-upload");
               progressElement.style.width = progress + "%";
               progressElement.innerHTML = progress + "%";
           }
JS;
        $this->clientEvents = ArrayHelper::merge($events, $this->clientEvents);
    }


    /**
     * The main js code for dropzone widget
     */
    protected function commonJs()
    {
        $existingFiles = Json::encode($this->files);
        $languages = Json::encode($this->languages);
        $dz = $this->dropzoneName;

        $js = <<<JS
/* 
* Extend Dropzone with own functions
*/

$dz.DzHelper = {
    languages: $languages,
    addExistingFiles: function (files) {
        if (Object.keys(files).length !== 0) {
            i = 0;
            for (key in files) {
                $dz.emit('addedfile', files[key]);
                if (files[key].hasOwnProperty('thumbnailUrl')) {
                    $dz.emit('thumbnail', files[key], files[key].thumbnailUrl);
                }
                files[key].status = 'success';
                $dz.emit('complete', files[key]);
                files[key].accepted = true;
                $dz.files.push(files[key]);
                i++;
                $dz._updateMaxFilesReachedClass();
            }
        }
    },
    deleteUploadedFile: function (file) { //Delete the file from the server
        var pe = file.previewElement;
        // We delete the file from the server
        var xhr = new XMLHttpRequest();
        xhr.open('POST', file.deleteUrl, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("id=" + file.id + "&_csrf=" + yii.getCsrfToken());
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    //console.log(xhr.responseText); // 'This is the returned text.'
                } else {
                    //console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
        }
    },
    setAttributes: function (file) { //Add attributes to added files
        var el = file.previewElement;
        el.setAttribute('id', 'mediafile-' + file.id);
    },
    fileIdInputElement: function (file) { //Create the html hidden input element with the file id of the given file.
        var el = document.createElement('input');
        el.setAttribute('type', 'hidden');
        el.setAttribute('name', 'MediaFiles[' + file.id + '][id]');
        el.setAttribute('value', file.id);
        file.previewElement.appendChild(el);
    },
    altInputElements: function (file) { //Create the html for the alt attribute input elements of the given file
        var lang = this.languages;
        for (var i = 0; i < lang.length; i++) {
            var inputGroup = document.createElement('div');
            inputGroup.className = 'input-group input-group-sm';
            inputGroup.innerHTML = '<span class="input-group-addon">' + lang[i].toUpperCase() + '</span>';

            var el = document.createElement('input');
            el.setAttribute('type', 'text');
            el.setAttribute('name', 'MediaFiles[' + file.id + '][translations][' + lang[i] + '][alt]');
            el.className = 'form-control';
            if (file.translations && file.translations.hasOwnProperty(lang[i])) {
                el.setAttribute('value', file.translations[lang[i]]['alt']);
            }
            inputGroup.appendChild(el);
            var container = file.previewElement.querySelector('.dz-alt-inputs');
            this.hide(container);
            container.appendChild(inputGroup);
        }
    },
    extend: function (obj, src) {
        Object.keys(src).forEach(function (key) {
            obj[key] = src[key];
        });
    },
    show: function (el) {
        el.classList.remove('d-none');
        el.classList.add('d-block');
    },
    hide: function (el) {
        el.classList.remove('d-block');
        el.classList.add('d-none');
    }
};

//Add the existing files to dropzone
$dz.DzHelper.addExistingFiles($existingFiles);
           
JS;
        return $js;
    }
}