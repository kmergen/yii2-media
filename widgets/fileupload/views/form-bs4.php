<?php

/** @var \dosamigos\fileupload\FileUploadUI $this */
use yii\helpers\Html;

$context = $this->context;
?>
<!-- The file upload form used as target for the file upload widget -->
<?= Html::beginTag('div', $context->options); ?>
<!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
<div class="row fileupload-buttonbar">
    <div class="col col-lg-7">
        <!-- The fileinput-button span is used to style the file input field as button -->
        <span class="btn btn-success fileinput-button">
            <i class="glyphicon glyphicon-plus"></i>
            <span><?= Yii::t('media', 'Add files') ?>...</span>
            <?= Html::fileInput($context->fileInputName, null, $context->fileInputOptions); ?>
        </span>
        <?php if ($context->clientOptions['autoUpload'] === false): ?>
            <a class="btn btn-primary start">
                <i class="glyphicon glyphicon-upload"></i>
                <span><?= Yii::t('media', 'Start upload') ?></span>
            </a>
            <a class="btn btn-warning cancel">
                <i class="glyphicon glyphicon-ban-circle"></i>
                <span><?= Yii::t('media', 'Cancel upload') ?></span>
            </a>
            <a class="btn btn-danger delete">
                <i class="glyphicon glyphicon-trash"></i>
                <span><?= Yii::t('media', 'Delete') ?></span>
            </a>
            <input type="checkbox" class="toggle">
        <?php endif; ?>
        <!-- The global file processing state -->
        <span class="fileupload-process"></span>
    </div>
    <!-- The global progress state -->
    <div class="col col-lg-5 fileupload-progress fade">
        <!-- The global progress bar -->
        <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-success" style="width:0%;"></div>
        </div>
        <!-- The extended global progress state -->
        <div class="progress-extended">&nbsp;</div>
    </div>
</div>
<!-- The table listing the files available for upload/download -->
<table role="presentation" class="table table-striped"><tbody class="files"></tbody></table>
<?= Html::endTag('div'); ?>