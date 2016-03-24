<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model kmergen\media\models\Media */

$this->title = Yii::t('app', 'Create Media');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Media'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="media-create">

    <h1><?= Html::encode($this->title) ?></h1>
    
    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
