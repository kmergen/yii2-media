<?php
/* @var $this yii\web\View */
/* @var $model common\models\ContactForm */
/* @var $formAction string */

/* @var $formTitle string */

use yii\helpers\Html;

$this->title = Yii::t('media', 'Update Media Alt attribute');
$this->params['breadcrumbs'][] = $this->title;
?>

<?= Html::beginForm(['/media/media/ajax-alt-update', 'id' => $model->id], 'post', ['class' => 'media-modal-form']) ?>
<?= Html::activeHiddenInput($model, 'name') ?>
<?php foreach ($languages as $language): ?>
    <div class="form-group row">
        <?= Html::label('Alt-' . $language, 'mediatranslation-' . $language . '-alt', ['class' => 'col-sm-2']); ?>
        <div class="col-sm-10">
            <?= Html::activeTextInput($model->translate($language), "[$language]alt", ['class' => $model->translate($language)->hasErrors('alt') ? 'form-control is-invalid' : 'form-control']) ?>
            <?= Html::error($model->translate($language), 'alt', ['class' => 'invalid-feedback']) ?>
        </div>
    </div>
    <?= Html::hiddenInput('languages[]', $language) ?>
<?php endforeach; ?>

<div class="form-group">
    <?= Html::submitButton('Submit', ['class' => 'btn btn-primary', 'name' => 'media-modal-form-submit']) ?>
</div>

<?= Html::endForm(); ?>
