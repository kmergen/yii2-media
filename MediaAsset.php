<?php
/**
 * KM Websolutions Projects
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2010 KM Websolutions
 * @license http://www.yiiframework.com/license/
 */

namespace kmergen\media;

use yii\web\AssetBundle;

/**
 * This asset bundle provides the css and javascript files for Media Module
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 * @since 1.0
 */
class MediaAsset extends AssetBundle
{
    public $sourcePath = '@kmergen/media/assets';
    public $css = [
        'css/media.css'
    ];
    public $js = [
        'js/media.js'
    ];
    public $depends = [

    ];
}
