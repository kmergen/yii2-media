<?php

/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\widgets\dropzone;

use yii\web\AssetBundle;

/**
 * Dropzone Asset
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class DropzoneAsset extends AssetBundle
{

    public $sourcePath = '@vendor/kmergen/yii2-media/widgets/dropzone/assets';

    public $js = [
        'dropzone.js'
    ];
}
