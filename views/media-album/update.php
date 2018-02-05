<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model kmergen\media\models\MediaAlbum */

$this->title = Yii::t('media', 'Update {modelClass}: ', [
    'modelClass' => 'Media Album',
]) . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('media', 'Media Albums'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('media', 'Update');
?>
<div class="media-album-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
