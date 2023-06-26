<?php

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model kmergen\media\models\ThumbResetForm */

$this->title = 'Thumb reset Form';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="row">
    <div class="col-md-6">
        <div class="box box-info">
            <div class="box-header with-border">
                <h4><?= Html::encode($this->title) ?></h4>
                <p>
                    Use this form to delete all thumbnails directories of the submitted "thumbstyle" recursive from the submitted startPath.
                    This is useful if you change the thumbStyle configuration e.g. the width or height.
                </p>
            </div>
            <?php
            $form = ActiveForm::begin(['id' => 'thumb-reset-form']);
            $thumbStyles = array_keys(Yii::$app->imageOld->thumbStyles);
            $items = array_combine($thumbStyles, $thumbStyles);
            ?>

            <div class="box-body card-block">
                <?=
                $form->field($model, 'startPath', [
                    'inputTemplate' => '<div class="input-group"><span class="input-group-addon">' . Yii::getAlias('@webroot') . '/</span>{input}</div>',
                    'enableAjaxValidation' => true
                ]);
                ?>
                <?= $form->field($model, 'thumbstyle')->dropDownList($items) ?>

                <div class="form-group">
                    <?= Html::submitButton(Yii::t('media', 'Preview'), ['class' => 'btn btn-default', 'name' => 'resetPreview-button']) ?>
                    <?= Html::submitButton(Yii::t('media', 'Run reset'), ['class' => 'btn btn-primary', 'name' => 'resetRun-button']) ?>
                </div>
                <?php ActiveForm::end(); ?>
                <?php if ($model->getAffectedFiles() !== null) : ?>
                    <div><label>Affected Files</label>
                        <pre><?php print_r($model->getAffectedFiles()) ?></pre>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>