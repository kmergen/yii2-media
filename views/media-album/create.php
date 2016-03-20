<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\mediaAlbum */

$this->title = Yii::t('app', 'Create Media Album');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Media Albums'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="media-album-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
