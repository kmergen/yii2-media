<?php

use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\modules\backend\models\Media */
/* @var $form ActiveForm */


$this->title = Yii::t('backend', 'Media Center');
$this->params['titleSuffix'] = Yii::t('backend', 'Manage and upload your Media Files');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="backend-media-upload">
    <div class="row form">
        <div class="col-md-12 col-lg-9">
            <div class="box box-info">
                <div class="box-header with-border"><h3 class="box-title"><?= Yii::t('backend', 'Upload Form') ?></h3></div>
                    <?php $form = ActiveForm::begin(); ?>
                <div class="box-body">
                    <?= $form->field($model, 'album_id') ?>
                    <?= $form->field($model, 'album_position') ?>
                    <?= $form->field($model, 'status') ?>
                    <?=
                    $form->field($model, 'targetUrl', [
                        'inputTemplate' => '<div class="input-group"><span class="input-group-addon">' . Yii::getAlias('@web') . '/</span>{input}</div>',
                    ]);
                    ?>


                    <?php
                    echo \kmergen\fileupload\FileUpload::widget([
                        'url' => ['upload'],
                        'acceptFileExtensions' => 'jpg,jpeg,png',
                        'fileInputOptions' => [
                            'accept' => 'image/*'
                        ],
                        'mediaOptions' => [
                            //'targetUrl' => 'images/vanderfurz'
                            'thumbStyle' => 'xsmall'
                        ],
                        'clientOptions' => [
                            'autoUpload' => true,
                            //'maxNumberOfFiles' =>5,
                            'maxFileSize' => 10000000, // 10 MB
                            'minFileSize' => 100,
                            'disableValidation' => true,
                            'disableImageResize' => '/Android(?!.*Chrome)|Opera/
                          .test(window.navigator && navigator.userAgent)',
                            'disableImageResize' => true,
                        //'imageMaxWidth' => 1200,
                        //'imageMaxHeight' => 900,
//                       'imageCrop' => false // Force cropped images
                        ]
                    ]);
                    ?>
                </div>
            </div>
        </div>
    </div><!-- _form -->
</div>



