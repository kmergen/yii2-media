<?php

namespace kmergen\media\widgets\dropzone;

use yii\helpers\Url;
use yii\helpers\Json;
use yii\helpers\ArrayHelper;
use kmergen\media\models\Media;
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
     * @var array the config settings from js module dropzone.
     * 
     */
    public $pluginOptions;

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();

        if (!extension_loaded('imagick')) {
            throw new \Exception('Media upload widget need an loaded Imagick PHP extension.');
            Yii::error('PHP Imagick not installed.');
        }

        DropzoneAsset::register($this->getView());

        if (empty($this->pluginOptions['previewTemplate'])) {
            $this->pluginOptions['previewTemplate'] = $this->render('preview-template');
        }
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
        #dz-input {display:none !important;}
        .dz-clickable {width: 100px; height: 100px; border: 2px dashed #ddd; color: #ddd; display:flex; justify-content:center; text-align:center;}
        .dz-clickable .inner {font-size: 2rem; line-height: 3;}
        .dz-message .error {color:red;}
        .dz-preview .card-body {padding: .35rem;}

CSS;
        $view->registerCss($css);
        $files = [];
        foreach ($this->model->mediaFiles as $file) {
            $image = [];
            $image['id'] = $file['id'];
            $image['size'] = (int)$file['size'];
            $image['url'] = $file['url'];
            $image['isTemp'] = $file['status'] == Media::STATUS_TEMP ? true : false;
            $image['type'] = $file['type'];
            $image['name'] = $file['name'];
            if (strpos($file['type'], 'image/') !== false) {
                $image['previewUrl'] = Yii::$app->image->thumb($file['url'], $this->pluginOptions['previewVariant']);
            }
            array_push($files, $image);
        }
        $this->pluginOptions['files'] = $files;

        $pluginOptions = Json::encode($this->pluginOptions);
        // $view->registerJsFile('@web/build/kmDropzone.js', ['position' => $view::POS_END]);
        $view->registerJs("document.addEventListener('DOMContentLoaded', function () {
            window.KmDropzoneInit($pluginOptions);
         });", $view::POS_END);

        echo $this->renderUITemplate();
    }

    /**
     * Render the UI for the dropzone
     */
    protected function renderUITemplate()
    {

        return '<div id="kmDropzone"><div class="clearfix"><div class="dz-previews"></div><label class="dz-clickable" for="dz-input">
        <input type="file" name="dz-input" id="dz-input" accept="' . implode(",", $this->pluginOptions['allowedFileTypes'] ?? ['image/jpeg', 'image/png', 'image/gif']) . '">
        <span class="inner">+</span>
        </label></div>
        <div class="dz-message" data-dz-message></div>
        </div>';
    }
}
