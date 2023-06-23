<?php

namespace kmergen\media\widgets\dropzone;

use yii\helpers\Json;
use Yii;
use \Imagick;

/**
 * KmDropzone is an image Uploader
 * mainly developed for uploading ad images and show them on the ad edit form.
 
 * @author KlausMergen <kmergenweb@gmail.com>
 */
class Dropzone extends \yii\base\Widget
{

    /**
     * @var object the model which hold the already stored files (in Media Module the media files are provided and stored by the MediaAlbumBehavior)
     * There is no need to declare an extra attribute variable because the name of the attribute is always [[mediaFiles]] and can you can get them by calling [[$this->model->mediaFiles]]
     */
    public $model;

    /**
     * @var string The url where to upload the image.
     */
    public $uploadUrl;

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
     * @var array the existing files to add to the dropzone.
     * The array should be in the Media model format
     * If [[model]] is set, then the files array will filled with the prepared mediaFiles from the model.
     * @see function [[prepareMediaFiles()]]
     */
    private $files = [];

    /**
     * @var array the options for kmDropzone js module
     * 
     */
    public $pluginOptions;

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();
        DropzoneAsset::register($this->getView());
    }


    /**
     * {@inheritdoc}
     */
    public function run()
    {
        $view = $this->getView();
        //Important to set autoDiscover to POS_END, not working on POS_READY
        $css = <<<CSS
        #kmDropzone {margin: 1rem 0 1rem 0;}
        #kmDz-input {display:none !important;}
        .kmDz-clickable {width: 100px; height: 100px; border: 2px dashed #ddd; color: #ddd; display:flex; justify-content:center; text-align:center;}
        .kmDz-clickable .inner {font-size: 2rem; line-height: 3;}
        .kmDz-message .error {color:red;}
        .kmDz-preview .card-body {padding: .35rem;}

CSS;
        $view->registerCss($css);

        $pluginOptions = Json::encode($this->pluginOptions);
        // $view->registerJsFile('@web/build/kmDropzone.js', ['position' => $view::POS_END]);
        $view->registerJs("document.addEventListener('DOMContentLoaded', function () {
            window.KmDropzoneInit($pluginOptions);
         });", $view::POS_END);

        $allowedFileTypes = $this->pluginOptions['allowedFileTypes'] ?? ['image/jpeg', 'image/png', 'image/gif'];

        if (!extension_loaded('imagick')) {
            echo 'imagick not installed';
        }

        echo '<div id="kmDropzone"><div class="clearfix"><div class="kmDz-previews"></div><label class="kmDz-clickable" for="kmDz-input">
        <input type="file" name="kmDz-input" id="kmDz-input" accept="' . implode(",", $allowedFileTypes) . '">
        <span class="inner">+</span>
        </label></div>
        <div class="kmDz-message"></div>
        </div>';
    }
}
