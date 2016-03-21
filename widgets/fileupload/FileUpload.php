<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\widgets\fileupload;

use Yii;
use yii\helpers\Json;

/**
 * FileUpload
 *
 * Widget to upload files to the server
 * @see https://github.com/blueimp/jQuery-File-Upload
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class FileUpload extends BaseUpload
{

    /**
     * @var string the ID of the upload template, given as parameter to the tmpl() method to set the uploadTemplate option.
     */
    public $uploadTemplateId;

    /**
     * @var string the ID of the download template, given as parameter to the tmpl() method to set the downloadTemplate option.
     */
    public $downloadTemplateId;

    /**
     * @var string the form view path to render the JQuery File Upload UI
     */
    public $formView = 'form';

    /**
     * @var string the upload view path to render the js upload template
     */
    public $uploadTemplateView = 'upload';

    /**
     * @var string the download view path to render the js download template
     */
    public $downloadTemplateView = 'download';

    /**
     * @var string|array the accepted file extension. We send This list of file extensions will send with the form to the server as rule property
     * file Validator. The clientOption ´acceptFileTypes´ will be set programmatically to this value. Therefore set this property instead the clientOption 'acceptFileTypes'.
     */
    public $acceptFileExtensions = 'jpg,jpeg,png';

    /**
     * @var array override public properties from Media model.
     * This properties will send to the server during uploading a media file.
     * Do not set here file or image rule properties. This properties will automatically build from widget options and clientOptions.
     */
    public $mediaOptions = [];

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        //Convert fileInputOptions[accept] to a string because we need it further more to send as property in file rule see[[createMediaJs()]].
        if (array_key_exists('accept', $this->fileInputOptions)) {
            if (is_array($this->fileInputOptions['accept'])) {
                implode(',', $this->fileInputOptions['accept']);
            }
        } else {
            $this->fileInputOptions['accept'] = 'image/*';
        }

        //Convert acceptFileExtension to a string because we need it further more to send as property in file rule see[[createMediaJs()]].
        if (is_array($this->acceptFileExtensions)) {
            implode(',', $this->acceptFileExtensions);
        }

        $aft = str_replace(',', '|', $this->acceptFileExtensions);
        $this->clientOptions['acceptFileTypes'] = new \yii\web\JsExpression("/(\.|\/)($aft)$/i");
        $this->fileInputOptions['multiple'] = true;
        
        //Set default client options
        $clientOptions['maxNumberOfFiles'] = 100;
        $clientOptions['maxFileSize'] = 10000000;
        $clientOptions['minFileSize'] = 100;
        
        $this->clientOptions = array_merge($clientOptions, $this->clientOptions);

        //Messages i18n
        $messages = [
              
            'maxNumberOfFiles' => Yii::t('app', 'You can only upload {n,plural,=1{one file} other{# files}}.', ['n' => $this->clientOptions['maxNumberOfFiles']]),
            'acceptFileTypes' => Yii::t('media', 'Only {filetypes} are allowed.', ['filetypes' => $this->acceptFileExtensions]),
            'maxFileSize' => Yii::t('media', 'The maximum filesize is {filesize}.', ['filesize' => $this->clientOptions['maxFileSize']]),
            'minFileSize' => Yii::t('media', 'The minimum filesize is {filesize}.', ['filesize' => $this->clientOptions['minFileSize']])
        ];

        if (array_key_exists('messages', $this->clientOptions) && isArray($this->clientOptions['messages'])) {
            $this->clientOptions = array_merge($messages, $this->clientOptions['messages']);
        } else {
            $this->clientOptions['messages'] = $messages;
        }
                
        $this->options['id'] = $this->fileInputOptions['id'] . '-fileupload';
        $this->options['data-upload-template-id'] = $this->uploadTemplateId ? : 'template-upload';
        $this->options['data-download-template-id'] = $this->downloadTemplateId ? : 'template-download';
    }

    /**
     * @inheritdoc
     */
    public function run()
    {
        echo $this->render($this->uploadTemplateView);
        echo $this->render($this->downloadTemplateView);
        echo $this->render($this->formView);
        $this->registerClientScript();
    }

    /**
     * Registers required script for the plugin to work as jQuery File Uploader
     */
    public function registerClientScript()
    {
        $view = $this->getView();
        FileUploadAsset::register($view);

        $options = Json::encode($this->clientOptions);
        $id = $this->options['id'];

        $js[] = ";jQuery('#$id').fileupload($options);";
        if (!empty($this->clientEvents)) {
            foreach ($this->clientEvents as $event => $handler) {
                $js[] = "jQuery('#$id').on('$event', $handler);";
            }
        }
        $js[] = $this->createMediaJs();

        $view->registerJs(implode("\n", $js));
    }

    public function createMediaJs()
    {
        $mediaProperties = Json::encode($this->mediaOptions);

        return <<<JS
        createMediaRules();
        setMediaProperties();
        
        function createMediaRules()
        {
            //The clientOptions of the blueimp fileupload  
            var cOpt = $('#{$this->options['id']}').fileupload('option');

            //We declare a file rule and an image rule and send it with the form to the server
            var fileRule  = {
                extensions: '{$this->acceptFileExtensions}',
                mimeTypes: '{$this->fileInputOptions['accept']}',
                maxSize: cOpt.maxFileSize,
                minSize: cOpt.minFileSize,
                maxFiles: cOpt.maxNumberOfFiles //Please note that when you set this value > 1 then the uploaded files must be an array otherwise the ´yii\validators\FileValidator´ add an error.
            }
                
            var imageRule = {
                maxWidth: cOpt.imageMaxWidth,
                maxHeight: cOpt.imageMaxHeight
            }
            
            var mediaRules = {
                file: fileRule,
                image: imageRule
            }
            
            //Append mediaRules to the form
            jQuery(document.createElement('input')).attr({type: 'hidden', name: 'Media[mediaRules]', value: JSON.stringify(mediaRules)}).appendTo('form');
        }
            
        function setMediaProperties()
        {
            var mediaProperties = $mediaProperties;
            
            jQuery.each( mediaProperties, function( propKey, propValue ) {
                jQuery(document.createElement('input')).attr({type: 'hidden', name: 'Media[' + propKey + ']', value: propValue}).appendTo('form');
            });
        }
JS;
    }

}
