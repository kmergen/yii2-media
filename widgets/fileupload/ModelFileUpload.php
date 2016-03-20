<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\fileupload;

use Yii;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\base\InvalidConfigException;

/**
 * ModelFileUpload
 *
 * Widget to upload files to the server
 * @see https://github.com/blueimp/jQuery-File-Upload
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class ModelFileUpload extends FileUpload
{

    /**
     * @var object the model
     */
    public $model;

    /**
     * @var string the attribute that contains the files.
     */
    public $attribute;

    /**
     * @var string The input name of the attribute send as hidden input field with the model form to the model controller.
     */
    public $inputName;

    
    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        if ($this->model === null || $this->attribute === null) {
            throw InvalidConfigException('"model" and "attribute" cannot be empty.');
        }

        if ($this->inputName === null) {
            $this->inputName = $this->model->formName() . '[' . $this->attribute . ']';
        }
        //The status for new uploaded files must be Media::STATUS_TEMP, because if you upload a file with status Media::STATUS_PERMANENT and
        // the user abort the form without submitting it then then the files are without any reference to the model and useless stored in the media table.
        $this->mediaOptions['status'] = \kmergen\media\models\Media::STATUS_TEMP;
    }

    /**
     * @inheritdoc
     */
    public function run()
    {
        echo $this->render($this->uploadTemplateView);
        echo $this->render($this->downloadTemplateView);
        echo $this->render($this->formView);
        $this->addEvents();
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
        $js[] = $this->mediaModelJs();

        $view->registerJs(implode("\n", $js));
    }

    /**
     * Add the necassary events to fileupload script
     */
    public function addEvents()
    {
        $this->clientEvents['fileuploadcompleted'] = <<<JS
            function(e, data) {
                var files = data.result.files;
                jQuery.each( files, function( key, val ) {
                    if(typeof(val.error) == 'undefined') {
                        regenerateFileInputs();
                    } 
                });
            }
JS;
        $this->clientEvents['fileuploaddestroy'] = <<<JS
            function(e, data) {
                jQuery.each( data.context, function( key, val ) {
                    var filedata = $(this).data();
                    if (filedata.status == 1) { // Do not really delete the existing images from the model, only remove the table row.
                        e.preventDefault();
                        $(this).fadeOut("slow", function() {
                                $(this).remove();
                                regenerateFileInputs();
                        });
                    }
                });
            }
JS;
        $this->clientEvents['fileuploaddestroyed'] = <<<JS
            function(e, data) {
                regenerateFileInputs();
            }
JS;
    }

    /**
     * The specific js for the model files
     */
    protected function mediaModelJs()
    {
        //Prepair the files array akin the blueimp fileupload.
        if (!empty($this->model->{$this->attribute})) {
            $files = [];
            if (is_string($this->model->{$this->attribute})) {
                $files[] = \kmergen\media\models\Media::find()->where(['url' => $this->model->{$this->attribute}])->asArray()->one();
            } else {
                $files = $this->model->{$this->attribute};
            }
            
            foreach ($files as $key => $file) {

                $files[$key]['id'] = $file['id'];
                $files[$key]['name'] = $file['name'];
                $files[$key]['size'] = (int)$file['size'];
                $files[$key]['url'] = $file['url'];
                $files[$key]['status'] = $file['status'];
                if (strpos($file['type'], 'image/') !== false) {
                    $files[$key]['thumbnailUrl'] = Yii::$app->image->thumb($file['url'], array_key_exists('thumbStyle', $this->mediaOptions) ? $this->mediaOptions['thumbStyle'] : 'small');
                }
                $files[$key]['deleteUrl'] = Url::to(['/media/upload-delete', 'id' => $file['id']]);
                $files[$key]['deleteType'] = 'POST';
            }
        } else {
            $files = [];
        }

        $fuFiles = Json::encode($files);

        return <<<JS
            addExistFiles();
        
            function addExistFiles()
            {
                var fuFiles = $fuFiles;
                jQuery(document.createElement('div')).addClass('hidden-file-inputs').appendTo('form');

                var cOpt = $('#{$this->options['id']}').fileupload('option');
                var data = {};
                  data.formatFileSize = function(bytes) {
                    if (typeof bytes !== 'number') {
                        return '';
                    }
                    if (bytes >= 1000000000) {
                        return (bytes / 1000000000).toFixed(2) + ' GB';
                    }
                    if (bytes >= 1000000) {
                        return (bytes / 1000000).toFixed(2) + ' MB';
                    }
                    return (bytes / 1000).toFixed(2) + ' KB';
                };

                jQuery.each( fuFiles, function( index, filedata ) {
                    data.options = cOpt;
                    //Convert filedata to array
                    data.files = [filedata];
                    $('.files').append(tmpl('template-download', data));  
                    createFileInputs(index, filedata);
                    jQuery('.template-download').addClass('in');

                });
            }
                        
            function createFileInputs(index, filedata)
            {
                var inputName = '{$this->inputName}';
                
                jQuery(document.createElement('input')).attr({type: 'hidden', name: inputName + '[' + index + '][id]', value: filedata.id}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: inputName + '[' + index + '][name]', value: filedata.name}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: inputName + '[' + index + '][size]', value: filedata.size}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: inputName + '[' + index + '][url]', value: filedata.url}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: inputName + '[' + index + '][type]', value: filedata.type}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: inputName + '[' + index + '][status]', value: filedata.status}).appendTo('.hidden-file-inputs');
            }
                
            function regenerateFileInputs()
            {
                var inputName = '{$this->inputName}';
                jQuery('.hidden-file-inputs').empty();
                if (jQuery('.template-download').length === 0) {
                    jQuery(document.createElement('input')).attr({type: 'hidden', name: inputName, value: ""}).appendTo('.hidden-file-inputs');
                }
                jQuery('.template-download').each(function(index){
                    createFileInputs(index, $(this).data());
                })  
            }
JS;
    }

}
