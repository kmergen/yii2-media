<?php
/* @var $this yii\web\View */
/* @var $model kmergen\media\models\Media */
/* @var $formAction string */
/* @var $thumbstyle string */

/* @var $formTitle string */

use yii\helpers\Html;

$this->title = Yii::t('media', 'Image tools');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="image-tool-box mb-1">
    <a href="#" id="btn-rotate-image">
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
<title><?= Yii::t('media/dropzone', 'Spin image') ?> </title>
            <g>
                <rect fill="none" width="24" height="24"/>
                <path d="M12,6c-3.314,0-6,2.686-6,6s2.686,6,6,6s6-2.686,6-6h2c0,4.418-3.582,8-8,8s-8-3.582-8-8s3.582-8,8-8
		c1.977,0,3.834,0.722,5.271,1.981l0.806-0.565c0.227-0.158,0.538-0.104,0.696,0.123c0.063,0.088,0.094,0.193,0.09,0.301
		l-0.098,3.557c-0.008,0.276-0.238,0.494-0.514,0.486c-0.049-0.002-0.097-0.01-0.143-0.025l-3.387-1.116
		c-0.263-0.087-0.404-0.369-0.318-0.632c0.033-0.102,0.1-0.19,0.188-0.252l0.975-0.684C14.553,6.423,13.312,6,12,6z"/>
            </g>
</svg>
    </a>
</div>
<div id="imgContainer" class="m-2 overflow-hidden">
    <?= Html::img('@web/' . $model->url . '?' . \time(), ['class' => 'image-to-rotate img-fluid']) ?>
</div>


<?= Html::beginForm(['/media/media/ajax-image-tools', 'id' => $model->id], 'post', ['class' => 'media-modal-form']) ?>
<?= Html::hiddenInput('image-rotate-deg', 0) ?>
<?= Html::hiddenInput('thumbstyle', $thumbstyle) ?>

<div class="form-group text-right">
    <?= Html::submitButton(Yii::t('media', 'Save'), ['class' => 'btn btn-primary', 'name' => 'media-modal-form-submit']) ?>
</div>

<?= Html::endForm(); ?>

