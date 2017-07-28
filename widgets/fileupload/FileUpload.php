<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\widgets\fileupload;

use Yii;
use yii\helpers\Json;
use kmergen\media\models\Media;

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
     * @var string the url where the file should be saved
     */
    public $targetUrl = 'images';

    /**
     * @var string The status of the file. permanet 1 or temporär 0. The default is set in [[init]]
     */
    public $status = Media::STATUS_PERMANENT;

    /**
     * @var string A thumbstyle for the thumbnail that shows the uploaded file.
     */
    public $thumbStyle = 'small';

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        if ($this->status !== Media::STATUS_TEMP && $this->status !== Media::STATUS_TEMP) {
            throw InvalidConfigException('Status can only be ' . Media::STATUS_TEMP . 'or ' . Media::STATUS_PERMANENT);
        }

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
            'maxNumberOfFiles' => Yii::t('media', 'You can only upload {n,plural,=1{one file} other{# files}}.', ['n' => $this->clientOptions['maxNumberOfFiles']]),
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
        $this->options['data-upload-template-id'] = $this->uploadTemplateId ?: 'template-upload';
        $this->options['data-download-template-id'] = $this->downloadTemplateId ?: 'template-download';

        if ($this->bsVersion === 'bs4') {
            $this->formView .= '-' . $this->bsVersion;
            $this->uploadTemplateView .= '-' . $this->bsVersion;
            $this->downloadTemplateView .= '-' . $this->bsVersion;
        }
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
        if ($this->bsVersion === 'bs4') {
            FileUploadAssetBs4::register($view);
        } else {
            FileUploadAsset::register($view);
        }

        $options = Json::encode($this->clientOptions);
        $id = $this->options['id'];

        $js[] = ";jQuery('#$id').fileupload($options);";
        if (!empty($this->clientEvents)) {
            foreach ($this->clientEvents as $event => $handler) {
                $js[] = "jQuery('#$id').on('$event', $handler);";
            }
        }
        $js[] = $this->settingsJs();

        $view->registerJs(implode("\n", $js));
    }

    public function settingsJs()
    {

        return <<<JS
        
        //The clientOptions of the blueimp fileupload  
        var cOpt = $('#{$this->options['id']}').fileupload('option');
        var params = {
            thumbStyle: '{$this->thumbStyle}',
            targetUrl: '{$this->targetUrl}',
            status: '{$this->status}',
            acceptFileExtensions: '{$this->acceptFileExtensions}',
            mimeTypes: '{$this->fileInputOptions['accept']}',
            maxFileSize: cOpt.maxFileSize,
            minFileSize: cOpt.minFileSize,
            maxNumberOfFiles: cOpt.maxNumberOfFiles,
            imageMaxWidth: cOpt.imageMaxWidth,
            imageMaxHeight: cOpt.imageMaxHeight
        }

        //Append parmas to the form
        jQuery.each(params, function(key, val) {
            jQuery(document.createElement('input')).attr({type: 'hidden', name: 'WidgetSettings[' + key + ']', value: val}).appendTo('form');
        });
        
            
        //Show or hide the media translations for alt and title
        $(document).on("click", ".toggle-translation", function() {
            var element = $(this).parents('tr').next();
            if (element.hasClass('hidden')) {
                element.removeClass('hidden hidden-xl-down');
            } else {
                element.addClass('hidden hidden-xl-down');
            }
        });
        //Disable media translation for specific language
        $(document).on("change", ".enable-translation", function() {
            var elements = $(this).parents('.row').find('input[type=text]');
            if (this.checked) {
                elements.prop('disabled', false);
            } else {
                elements.prop('disabled', true)
            }
        });
JS;
    }

}
