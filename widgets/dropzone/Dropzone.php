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
     * @var object the model which hold the already stored files (in Media Module the media files are provided and stored by the MediaCollection behavior)
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
    public $options = [];

    /**
     * @var array An array of client events that are supported by Dropzone
     */
    public $clientEvents = [];

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
            $this->options['url'] = Url::toRoute(['/media/dropzone/upload']);
        } else {
            $this->options['url'] = Url::toRoute($this->options['url']);
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
        
        
    }

    public function run()
    {
        if (Yii::$app->request->enableCsrfValidation) {
            $this->options['params'][Yii::$app->request->csrfParam] = Yii::$app->request->getCsrfToken();
        }
      
        $this->htmlOptions['id'] = $this->id;
        Html::addCssClass($this->htmlOptions, 'dropzone');
        echo Html::tag('div', '', $this->htmlOptions);
        
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

        $options = Json::encode($this->options);

        $js[] = $this->dropzoneName . ' = new Dropzone("#' . $this->id . '", ' . Json::encode($this->options) . ');';

        if (!empty($this->clientEvents)) {
            foreach ($this->clientEvents as $event => $handler) {
                $js[] = "{$this->dropzoneName}.on('$event', $handler);";
            }
        }
        $js[] = $this->addFilesJs();
        //$js[] = $this->settingsJs();
        //$js[] = $this->mediaModelJs();

        $view->registerJs(implode("\n", $js));
    }

    /**
     * Add the necassary dropzone events
     */
    public function addEvents()
    {
        $events['success'] = <<<JS
            function(file, data) {
                var dz = this;
                var pe = file.previewElement;
                if (data.hasOwnProperty('error')) {
                  pe.innerHTML = '<span class="text-danger">' + data.error + '</span>';
                  setTimeout(function() {
                      dz.removeFile(file);
                      }, 3000);
                } else {
                    pe.setAttribute('data-id', data.id);
                    pe.setAttribute('data-status', data.status);
                    pe.setAttribute('data-delete-url', data.deleteUrl);
                    dz.emit('thumbnail', file, data.thumbnailUrl);
                    
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
                var pe = file.previewElement;
                var deleteUrl = pe.dataset.deleteUrl;
                var csrftoken = yii.getCsrfToken();
                senddata = "id=" + pe.dataset.id;
                // We delete the file from the server
                var xhr = new XMLHttpRequest();
                xhr.open('POST', deleteUrl, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");             
                xhr.send("id=" + pe.dataset.id + "&_csrf=" + yii.getCsrfToken());
                
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
};
                
                
            }
JS;
        $this->clientEvents = ArrayHelper::merge($events, $this->clientEvents);
    }

    protected function addFilesJs($files = [])
    {
        $js = '';
        if (!empty($files)) {
            $js .= <<<JS
            var files = Json::encode($files);
            for (var i=0; i<files.length; i++) {
                addFile(files[i]);
            }
JS;
        }
        
        $js .= <<<JS
            function addFile(file)
            {
                {$this->dropzoneName}.emit('addedfile', file);
                {$this->dropzoneName}.emit('thumbnail', file, file.thumbnailUrl);
                {$this->dropzoneName}.emit('complete', file);
            }
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
