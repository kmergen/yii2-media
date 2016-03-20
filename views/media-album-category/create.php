<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\mediaAlbumCategory */

$this->title = Yii::t('app', 'Create Media Album Category');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Media Album Categories'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="media-album-category-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
