<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\widgets\dropzone;

use yii\web\AssetBundle;

/**
 * Dropzone asset
 * 
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class DropzoneAsset extends AssetBundle
{

    public $sourcePath = '@vendor/kmergen/yii2-media/widgets/dropzone/assets';
    public $css = [
        'css/dropzone.min.css',
    ];
    public $js = [
        'js/dropzone.min.js'
    ];
    public $depends = [
      //  'yii\web\JqueryAsset',
       // 'yii\bootstrap\BootstrapPluginAsset',
    ];

    public function init()
    {
        parent::init();

        if (YII_DEBUG) {
            $this->css = [
                'css/dropzone.css'
            ];
            $this->js = [
                'js/dropzone.js',
            ];
        }
    }

}
