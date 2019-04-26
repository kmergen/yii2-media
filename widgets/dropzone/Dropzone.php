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
     * @see function [[prepareMediaFiles()]]
     */
    public $files = [];

    /**
     * @var object the model which hold the already stored files (in Media Module the media files are provided and stored by the MediaAlbumBehavior)
     * There is no need to declare an extra attribute variable because the name of the attribute is always [[mediaFiles]] and can you can get them by calling [[$this->model->mediaFiles]]
     */
    public $model;

    /**
     * @var array The HTML options for the dropzone container. The cssClass 'dropzone' will set in [[init()]].
     */
    public $htmlOptions = [];

    /**
     * @var array An array of options that are supported by Dropzone
     */
    public $pluginOptions = [];

    /**
     * @var array An array of client events that are supported by Dropzone
     */
    public $pluginEvents = [];

    /**
     * @var string A thumbStyle provided by kmergen\media\components\Image
     * If set, it create a thumbnail on serverside and return thumbnail url. Otherwise no serverside thumbnail will be created.
     * If set, the Dropzon option [[$pluginOptions['createImageThumbnails']]] is set to false.
     */
    public $thumbStyle;

    /**
     * @var string the delete url
     * If not set it create a url from [[$pluginOptions['url'] with suffix '-delete'. eg '/post/upload-delete'.
     */
    public $deleteUrl = '/media/dropzone/delete';

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
     * @var array The options for the media modal tool window to rotate images.
     */
    public $toolOptions = [];

    /**
     * @var array The options for the media modal alt translations.
     */
    public $altOptions = [];


    /**
     * @var string The name of this dropzone instance This name will extended by the widget id in [[init()]].
     */
    protected $dropzoneName = 'dropzone';

    public function init()
    {
        parent::init();

        $defaults = [
            'url' => 'media/dropzone/upload',
            'addRemoveLinks' => true,
            'previewsContainer' => '.dropzone-previews',
            'clickable' => '.dz-clickable',
            'paramName' => $this->id . 'file',
            'dictDefaultMessage' => Yii::t('media/dropzone', 'Drop files here to upload'),
            'dictFallbackMessage' => Yii::t('media/dropzone', 'Your browser does not support drag\'n\'drop file uploads.'),
            'dictFallbackText' => Yii::t('media/dropzone', 'Please use the fallback form below to upload your files like in the olden days.'),
            'dictFileTooBig' => Yii::t('media/dropzone', 'File is too big {{filesize}} MB. Max filesize: {{maxFilesize}} MB.'),
            'dictInvalidFileType' => Yii::t('media/dropzone', 'You can\'t upload files of this type.'),
            'dictResponseError' => Yii::t('media/dropzone', 'Server responded with {{statusCode}} code.'),
            'dictCancelUpload' => Yii::t('media/dropzone', 'Cancel upload'),
            'dictCancelUploadConfirmation' => Yii::t('media', 'Are you sure you want to cancel this upload?'),
            'dictRemoveFile' => '<i class="fas fa-trash" title="' . Yii::t('media/dropzone', 'Delete Image') . '"></i>',
            'dictMaxFilesExceeded' => Yii::t('media/dropzone', 'The maximum number of {n} pictures has been reached.', ['n' => $this->pluginOptions['maxFiles'] ?? 5]),
        ];

        $this->pluginOptions = ArrayHelper::merge($defaults, $this->pluginOptions);

        $this->pluginOptions['url'] = Url::toRoute($this->pluginOptions['url']);

        $this->pluginOptions['params']['deleteUrl'] = $this->deleteUrl;
        $this->pluginOptions['params']['paramName'] = $this->pluginOptions['paramName'];

        $this->dropzoneName = 'dropzone_' . $this->id;

        if ($this->thumbStyle !== null) {
            $this->pluginOptions['createImageThumbnails'] = false;
            $this->pluginOptions['params']['thumbStyle'] = $this->thumbStyle;
        }

        $toolOptionsDefaults = [
            'showLink' => true,
            'class' => 'media-load-modal',
            'data-media-widget' => 'image-tools',
            'data-modal-target' => 'pageModal',
            'data-modal-title' => Yii::t('media/dropzone', 'Image Tools'),
            'data-modal-backdrop' => 'static',
            'data-modal-close-button-class' => 'btn btn-secondary d-none',
            'data-thumbstyle' => $this->thumbStyle
        ];
        $this->toolOptions = ArrayHelper::merge($toolOptionsDefaults, $this->toolOptions);
        $this->pluginOptions['params']['showToolLink'] = $this->toolOptions['showLink'];

        $altOptionsDefaults = [
            'showLink' => true,
            'class' => 'media-load-modal',
            'data-media-widget' => 'alt-translations',
            'data-modal-target' => 'pageModal',
            'data-modal-title' => Yii::t('media/dropzone', 'Set image title'),
            'data-modal-backdrop' => 'static',
            'data-modal-close-button-class' => 'btn btn-secondary d-none',
            'data-show-languages' => 'one' // 'one' : Show only Yii::$app->language
            //  'all' show all translatable values this has only effect if there is a languages property in your UrlManager
        ];
        $this->altOptions = ArrayHelper::merge($altOptionsDefaults, $this->altOptions);
        $this->pluginOptions['params']['showAltLink'] = $this->altOptions['showLink'];

        if (empty($this->pluginOptions['previewTemplate'])) {
            $this->pluginOptions['previewTemplate'] = $this->render('preview-template');
        }


    }

    public function run()
    {
        if (Yii::$app->request->enableCsrfValidation) {
            $this->pluginOptions['params'][Yii::$app->request->csrfParam] = Yii::$app->request->getCsrfToken();
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
            : Html::beginTag('div', ['class' => 'dropzone-previews clearfix']);
        $parts['{dzMessage}'] = isset($this->uiTemplateParts['dzMessage'])
            ? $this->uiTemplateParts['dzMessage']
            : Html::tag('div', '<span>' . $this->pluginOptions['dictDefaultMessage'] . '</span>', ['class' => 'dz-default dz-message']);
        if (isset($this->uiTemplateParts['dzClickable'])) {
            $parts['{dzClickable}'] = $this->uiTemplateParts['dzClickable'];
        } else {
            $options = [];
            $options['class'] = ($this->thumbStyle !== null) ? 'dz-clickable card text-center justify-content-center ' . $this->thumbStyle : 'dz-clickable card text-center justify-content-center';
            $parts['{dzClickable}'] = Html::tag('div', '<div class="inner">+</div>', $options);
        }
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
        $js[] = $this->dropzoneName . ' = new Dropzone("#' . $this->id . '", ' . Json::encode($this->pluginOptions) . ');';

        if (!empty($this->pluginEvents)) {
            foreach ($this->pluginEvents as $event => $handler) {
                $js[] = "{$this->dropzoneName}.on('$event', $handler);";
            }
        }

        $js[] = $this->commonJs();
        $view->registerJs(implode("\n", $js), $view::POS_END);

    }

    /**
     * Add the necassary dropzone events
     */
    public function addEvents()
    {
        $events['addedfile'] = <<<JS
            function (file) {
               var el = this.previewsContainer.querySelector('.dz-clickable');
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
    // file.previewElement.querySelector('.dz-error-message span').innerHTML = 'Es ist ein Serverfehler aufgetreten.';
    var dz = this;
    var el = dz.element.querySelector('.dz-message span')
    el.innerHTML = '<span class="text-danger">' + error + '</span>';
    dz.removeFile(file);
    setTimeout(function () {
        el.innerHTML = '';
    }, 4000);
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
                var el = this.previewsContainer.querySelector('.dz-clickable');
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
        
        // Add remove Link
        if (this.options.addRemoveLinks) {
            var removeLink = file.previewElement.querySelector('.dz-remove');
            file.previewElement.querySelector('.dz-links').appendChild(removeLink);
        }
        file.previewElement.querySelector('.dz-progress').remove();
        
        if (this.options.params.showAltLink) {
          // Add Link for alt translation 
          var altLink = file.previewElement.querySelector('[data-media-widget="alt-translations"]');
          altLink.dataset.id = file.id;
        }
       
        if (this.options.params.showToolLink) {
          // Add Link for alt translation 
          var toolLink = file.previewElement.querySelector('[data-media-widget="image-tools"]');
          toolLink.dataset.id = file.id;
        }
        
    }
}
JS;
        $events['maxfilesreached'] = <<<JS
           function(files) {
               var el = this.previewsContainer.querySelector('.dz-clickable');
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
        $this->pluginEvents = ArrayHelper::merge($events, $this->pluginEvents);
    }

    /**
     * The main js code for dropzone widget
     */
    protected function commonJs()
    {
        $existingFiles = Json::encode($this->files);
        $dz = $this->dropzoneName;

        $js = <<<JS
/* 
* Extend Dropzone with own functions
*/
$dz.DzHelper = {
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
        xhr.send("id=" + file.id + "&" + yii.getCsrfParam() + "=" + yii.getCsrfToken());
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    console.log(xhr.responseText); // 'This is the returned text.'
                } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
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
    extend: function (obj, src) {
        Object.keys(src).forEach(function (key) {
            obj[key] = src[key];
        });
    },
    show: function (el) {
        el.classList.remove('d-none');
        el.classList.add('d-flex');
    },
    hide: function (el) {
        el.classList.remove('d-flex');
        el.classList.add('d-none');
    }
    
};

// Add the existing files to dropzone
$dz.DzHelper.addExistingFiles($existingFiles);
           
JS;
        return $js;
    }
}
