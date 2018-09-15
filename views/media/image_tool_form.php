<?php
/* @var $this yii\web\View */
/* @var $model kmergen\media\models\Media */
/* @var $formAction string */

/* @var $formTitle string */

use yii\helpers\Html;

$this->title = Yii::t('media', 'Image tools');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="image w-100">
<div id="imgContainer" class="w-50">
    <?= Html::img('@web/' . $model->url, ['id' => 'image', 'class' => 'img-fluid w-50']) ?>
</div>
<a href="#" id="rotate-image"><i class="fa fa-refresh"></i></a>
</div>

<?= Html::beginForm(['/media/media/ajax-image-tools', 'id' => $model->id], 'post', ['class' => 'media-modal-form']) ?>
<?= Html::hiddenInput('image-rotate-deg', 0) ?>

<div class="form-group">
    <?= Html::submitButton('Submit', ['class' => 'btn btn-primary', 'name' => 'media-modal-form-submit']) ?>
</div>

<?= Html::endForm(); ?>
