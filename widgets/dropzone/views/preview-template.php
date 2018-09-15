<?php

use yii\helpers\Html;
use yii\helpers\Url;

?>
<div class="dz-preview card">
    <img class="card-img-top" data-dz-thumbnail>
    <div class="card-body text-center">
        <!--            <div class="dz-filename"><span data-dz-name></span></div>-->
        <!--            <div class="dz-size" data-dz-size></div>-->

        <div class="dz-links">
            <?php if (!empty($this->context->toolOptions['showLink'])): ?>
                <?= Html::a('<i class="fa fa-circle-o-notch" title="' . Yii::t('media/dropzone', 'Spin image') . '"></i>', '#', $this->context->toolOptions) ?>
            <?php endif; ?>
            <?php if (!empty($this->context->altOptions['showLink'])): ?>
                <?= Html::a('<i class="fa fa-pencil" title="' . Yii::t('media/dropzone', 'Set image title') . '"></i>', '#', $this->context->altOptions) ?>
            <?php endif; ?>
        </div>

        <!--        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>-->
        <div class="dz-progress progress">
            <div class="dz-upload progress-bar" data-dz-uploadprogress></div>
        </div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
    </div>
</div>
