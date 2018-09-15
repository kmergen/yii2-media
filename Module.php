<?php

namespace kmergen\media;

use kmergen\media\MediaAsset;

/**
 * Admin module definition class
 */
class Module extends \yii\base\Module
{

    /**
     * @inheritdoc
     */
    public $controllerNamespace = 'kmergen\media\controllers';
    public $defaultRoute = 'media/index';

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        // custom initialization code goes here
      //  MediaAsset::register(\Yii::$app->getView());

    }

}
