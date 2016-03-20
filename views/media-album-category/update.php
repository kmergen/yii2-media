<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\mediaAlbumCategory */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Media Album Category',
]) . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Media Album Categories'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="media-album-category-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
