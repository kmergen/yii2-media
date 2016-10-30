<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\widgets\fileupload;

use Yii;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
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
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        if ($this->model === null) {
            throw InvalidConfigException('"model" cannot be empty.');
        }

        //The status for new uploaded files must be Media::STATUS_TEMP, because if you upload a file with status Media::STATUS_PERMANENT and
        // the user abort the form without submitting it then the files are without any reference to the model and useless stored in the media table.
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
            $('.template-translation').removeClass('in');
            }
JS;
        $this->clientEvents['fileuploaddestroy'] = <<<JS
            function(e, data) {
                jQuery.each( data.context, function( key, val ) {
                    var filedata = $(this).data();
                    //Remove the alt and title row
                    $(this).next('tr').remove();
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
        if (!empty($this->model->mediaFiles)) {
            $files = [];
            if (is_string($this->model->mediaFiles)) {
                // $files[] = \kmergen\media\models\Media::find()->where(['url' => $this->model->mediaFiles])->asArray()->one();
                $files[] = \kmergen\media\models\Media::find()->where(['url' => $this->model->mediaFiles])->one();
            } else {
                $files = $this->model->mediaFiles;
            }

            foreach ($files as $file) {
//                $id = $file['id'];
//                $fuFiles[$id]['id'] = $file['id'];
//                $fuFiles[$id]['name'] = $file['name'];
//                $fuFiles[$id]['size'] = (int)$file['size'];
//                $fuFiles[$id]['url'] = $file['url'];
//                $fuFiles[$id]['status'] = $file['status'];
//                $fuFiles[$id]['type'] = $file['type'];
//                if (strpos($file['type'], 'image/') !== false) {
//                    $fuFiles[$id]['thumbnailUrl'] = Yii::$app->image->thumb($file['url'], array_key_exists('thumbStyle', $this->mediaOptions) ? $this->mediaOptions['thumbStyle'] : 'small');
//
//                    //We need the translation array indexed by language
//                    $translations = $file['translations'];
//                    if (isset($translations[0])) {
//                        $fuFiles[$id]['translations'] = ArrayHelper::index($translations, 'language');
//                    } else {
//                        $fuFiles[$id]['translations'] = $file['translations'];
//                    }
//                }
//                $fuFiles[$id]['deleteUrl'] = Url::to(['/media/upload-delete', 'id' => $file['id']]);
//                $fuFiles[$id]['deleteType'] = 'POST';



                $fuFiles[$file->id]['id'] = $file->id;
                $fuFiles[$file->id]['name'] = $file->name;
                $fuFiles[$file->id]['size'] = (int)$file->size;
                $fuFiles[$file->id]['url'] = $file->url;
                $fuFiles[$file->id]['status'] = $file->status;
                $fuFiles[$file->id]['type'] = $file->type;
                if (strpos($file->type, 'image/') !== false) {
                    $fuFiles[$file->id]['thumbnailUrl'] = Yii::$app->image->thumb($file->url, array_key_exists('thumbStyle', $this->mediaOptions) ? $this->mediaOptions['thumbStyle'] : 'small');
                    //We need the translation array indexed by language
                    $translations = (array)$file->translations;
                    if (isset($translations[0])) {
                        $fuFiles[$file->id]['translations'] = ArrayHelper::index($translations, 'language');
                    } else {
                        $fuFiles[$file->id]['translations'] = $file->translations;
                    }
                }
                $fuFiles[$file->id]['deleteUrl'] = Url::to(['/media/upload-delete', 'id' => $file->id]);
                $fuFiles[$file->id]['deleteType'] = 'POST';
            }
        } else {
            $fuFiles = [];
        }

        $fuFiles = Json::encode($fuFiles);
        $languages = Json::encode($this->languages);

        return <<<JS
            addExistFiles();
        
            function addExistFiles()
            {
                var fuFiles = $fuFiles;
                jQuery(document.createElement('div')).addClass('hidden-file-inputs').appendTo('form');

                var cOpt = $('#{$this->options['id']}').fileupload('option');
                var data = {};
                data.languages = $languages
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
                    //Convert the translations for better handling in download template
                    data.options = cOpt;
                    //Convert filedata to array
                    data.files = [filedata];
                    $('.files').append(tmpl('template-download', data));
                    //Enable all translation input fields they are not empty and check the enable translation checkbox
                    var translationRows = $('.template-translation').find('.row');
                    $(translationRows).each(function(){
                        var inputs = $(this).find('input[type=text]');
                        if (inputs.eq(0).val() || inputs.eq(1).val()) {
                            $(inputs).prop('disabled', false);    
                            $(this).find('input[type=checkbox]').prop('checked', true);   
                        }
                    });
                    createFileInputs(filedata);
                    jQuery('.template-download').addClass('in');

                });
            }
                        
            function createFileInputs(filedata)
            {
                jQuery(document.createElement('input')).attr({type: 'hidden', name: 'MediaFiles[' + filedata.id + '][id]', value: filedata.id}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: 'MediaFiles[' + filedata.id + '][name]', value: filedata.name}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: 'MediaFiles[' + filedata.id + '][size]', value: filedata.size}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: 'MediaFiles[' + filedata.id + '][url]', value: filedata.url}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: 'MediaFiles[' + filedata.id + '][type]', value: filedata.type}).appendTo('.hidden-file-inputs');
                jQuery(document.createElement('input')).attr({type: 'hidden', name: 'MediaFiles[' + filedata.id + '][status]', value: filedata.status}).appendTo('.hidden-file-inputs');
            }
                
            function regenerateFileInputs()
            {
                jQuery('.hidden-file-inputs').empty();
                jQuery('.template-download').each(function(index){
                    createFileInputs($(this).data());
                })  
            }
JS;
    }

}
