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
     * If empty, the alt attribute input element for [[Yii::$app->language]] is created.
     * If not empty, for each language a alt attribute input element is created.
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
     * @var integer|string The version of the Css Framework Bootstrap. Possible values are 'bs3' and 'bs4'.
     */
    public $bootstrapVersion = 'bs4';

    /**
     * @var string The theme you want to use. These are different previewTemplates.
     */
    public $theme = 'default';

    /**
     * @var array A set of predefined themes.
     */
    protected $themes = [
        'default' => ['previewTemplate' => 'default-preview-template']
    ];

    /**
     * @var string The name of this dropzone instance This name will extended by the widget id in [[init()]].
     */
    protected $dropzoneName = 'dropzone';
    public $sortable = false;
    public $sortableOptions = [];

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

        if (empty($this->languages)) {
            $languages[] = Yii::$app->language;
        }

        if ($this->bootstrapVersion !== 'bs4' && $this->bootstrapVersion !== 'bs3') {
            throw new InvalidConfigException('"bootstrapVersion" can only be set to "bs4" or "bs3"');
        }

        if (!isset($this->options['previewTemplate'])) {
            $theme = $this->themes[$this->theme]['previewTemplate'];
            $this->options['previewTemplate'] = $this->render("{$this->bootstrapVersion}/{$theme}");
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
    }

    public function run()
    {
        if (Yii::$app->request->enableCsrfValidation) {
            $this->options['params'][Yii::$app->request->csrfParam] = Yii::$app->request->getCsrfToken();
        }

        $this->htmlOptions['id'] = $this->id;
        Html::addCssClass($this->htmlOptions, 'dropzone');
        echo Html::tag('div', '', $this->htmlOptions);

        if ($this->model !== null && !empty($this->model->mediaFiles)) {
            $this->prepareMediaFiles();
        }


        //zum testen
        $this->files[] = ['id' => 100, 'name' => 'peter.jpg', 'size' => 22255];
        $this->files[] = ['id' => 200, 'name' => 'peter.jpg', 'size' => 22255];
        $this->files[] = ['id' => 300, 'name' => 'peter.jpg', 'size' => 22255];
        $this->files[] = ['id' => 300, 'name' => 'peter.jpg', 'size' => 22255];
        $this->files[] = ['id' => 300, 'name' => 'peter.jpg', 'size' => 22255];
        $this->files[] = ['id' => 300, 'name' => 'peter.jpg', 'size' => 22255];
        $this->files[] = ['id' => 300, 'name' => 'peter.jpg', 'size' => 22255];

        $a = "<div class='col-lg-1'>
    <p class='Hallo'  ";


        $this->addEvents();
        $this->registerClientScript();


        $this->decrementMaxFiles(count($this->model->mediaFiles));
        if ($this->sortable) {
            $options = Json::encode($this->sortableOptions);
            $this->getView()->registerJs("jQuery('#{$this->id}').sortable(" . $options . ");");
        }
    }

    /**
     * Registers required javascript for the plugin
     */
    public function registerClientScript()
    {
        $view = $this->getView();

        if ($this->bootstrapVersion === 'bs4') {
            DropzoneAssetBs4::register($view);
        } else {
            DropzoneAssetBs3::register($view);
        }

        $js[] = 'Dropzone.autoDiscover = false;';
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
            function(file) {
                DropzoneWidgetHandler.file = file;
                if (file.hasOwnProperty('id')) { //if existing files are added
                    
                }
            }
JS;

        $events['success'] = <<<JS
            function(file, data) {
                DropzoneWidgetHandler.file = file;
                DropzoneWidgetHandler.responseData = data;
                var dz = this;
                var pe = file.previewElement;
                if (data.hasOwnProperty('error')) {
                  pe.innerHTML = '<span class="text-danger">' + data.error + '</span>';
                  setTimeout(function() {
                      dz.removeFile(file);
                      }, 3000);
                } else {
                   DropzoneWidgetHandler.addUploadedFile();
                    var le = document.getElementsByClassName("dz-preview").length - 1;
                }
            }
JS;
        $events['error'] = <<<JS
            function(file, message) {
                file.previewElement.querySelector('.dz-error-message span').innerHTML = 'Es ist ein Serverfehler aufgetreten.';
            }
JS;
        $events['removedfile'] = <<<JS
            function(file) {
                if(file.status === "success") {
                   deleteUploadedFile(file); 
                }
            }
JS;
        $this->clientEvents = ArrayHelper::merge($events, $this->clientEvents);
    }

    /**
     * Prepare the existing files from media model to add them to the dropzone
     */
    protected function prepareMediaFiles()
    {
        foreach ($this->model->mediaFiles as $file) {
            $this->files[]['id'] = $id;
            $this->files[]['name'] = $file['name'];
            $this->files[]['size'] = (int)$file['size'];
            $this->files[]['url'] = $file['url'];
            $this->files[]['status'] = $file['status'];
            $this->files[]['type'] = $file['type'];
            if (strpos($file['type'], 'image/') !== false) {
                $this->files[]['thumbnailUrl'] = Yii::$app->image->thumb($file['url'], $this->thumbStyle);

                //We need the translation array indexed by language
                if (isset($file['translations'])) {
                    $translations = (array)$file['translations'];
                    if (isset($translations[0])) {
                        $this->files[]['translations'] = ArrayHelper::index($translations, 'language');
                    } else {
                        $this->files[]['translations'] = $file['translations'];
                    }
                }
            }
            $this->files[]['deleteUrl'] = Url::to(['/media/upload-delete', 'id' => $id]);
        }
    }

    protected function commonJs()
    {
        $existingFiles = Json::encode($this->files);
        $languages = Json::encode($this->languages);
        $dropzoneName = $this->dropzoneName;

        $js = <<<JS
 
 


           
JS;
        return $js;
    }

    protected function decrementMaxFiles($num)
    {
        if ($num > 0) {
            $this->getView()->registerJs(
                'if (' . $this->dropzoneName . '.options.maxFiles > 0) { '
                . $this->dropzoneName . '.options.maxFiles = '
                . $this->dropzoneName . '.options.maxFiles - ' . $num . ';'
                . ' }'
            );
        }
    }

}
