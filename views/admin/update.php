<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model kmergen\media\models\Media */
/* @var $form yii\widgets\ActiveForm */


$this->title = Yii::t('app', 'Update {modelClass}: ', [
        'modelClass' => 'Media',
    ]) . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Media'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>

<div class="row">
    <div class="col-md-6">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title"><?= Html::encode($this->title) ?></h3>
            </div>

            <?php $form = ActiveForm::begin(); ?>
            <div class="box-body">
                <?= $form->field($model, 'id')->textInput() ?>

                <?= $form->field($model, 'album_id')->textInput() ?>

                <?= $form->field($model, 'album_position')->textInput() ?>

                <?= $form->field($model, 'user_id')->textInput() ?>

                <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

                <?= $form->field($model, 'url')->textInput(['maxlength' => true]) ?>

                <?= $form->field($model, 'type')->textInput(['maxlength' => true]) ?>

                <?= $form->field($model, 'size')->textInput() ?>

                <?= $form->field($model, 'created')->textInput() ?>

                <?= $form->field($model, 'status')->textInput() ?>

                <div class="form-group">
                    <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
                </div>
            </div>
            <?php ActiveForm::end(); ?>

        </div>
    </div>
</div>
