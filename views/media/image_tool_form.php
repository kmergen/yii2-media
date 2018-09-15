<?php
/* @var $this yii\web\View */
/* @var $model kmergen\media\models\Media */
/* @var $formAction string */

/* @var $formTitle string */

use yii\helpers\Html;

$this->title = Yii::t('media', 'Image tools');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="image-tool-box">
    <a href="#" id="rotate-image"><i class="fa fa-refresh fa-2x"></i></a>
</div>
<div id="imgContainer" class="">
    <?= Html::img('@web/' . $model->url . '?' . \time(), ['id' => 'image', 'class' => 'img-fluid']) ?>
</div>


<?= Html::beginForm(['/media/media/ajax-image-tools', 'id' => $model->id], 'post', ['class' => 'media-modal-form']) ?>
<?= Html::hiddenInput('image-rotate-deg', 0) ?>
<?= Html::hiddenInput('thumbstyle', $thumbstyle) ?>

<div class="form-group text-right">
    <?= Html::submitButton(Yii::t('media', 'Save'), ['class' => 'btn btn-primary', 'name' => 'media-modal-form-submit']) ?>
</div>

<?= Html::endForm(); ?>
