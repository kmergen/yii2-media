<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model kmergen\media\models\MediaAlbum */

$this->title = Yii::t('media', 'Create Media Album');
$this->params['breadcrumbs'][] = ['label' => Yii::t('media', 'Media Albums'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="media-album-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
