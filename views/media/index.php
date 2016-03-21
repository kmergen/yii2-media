<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel kmergen\media\models\MediaSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Media');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="media-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]);  ?>
    <h2><?= Yii::t('media', 'Filename') ?></h2>

    <p>
        <?= Yii::t('media', 'Hello') ?>
        <?= Html::a(Yii::t('app', 'Create Media'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?=
    GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            //['class' => 'yii\grid\SerialColumn'],
            [
                'class' => 'yii\grid\Column',
                'header' => Yii::t('app', 'Preview'),
                'content' => function ($model, $key, $index, $column) {
                    return Html::a(Html::img(Yii::$app->image->thumb($model->url, 'xsmall')), '@web/' . $model->url, ['target' => '_blank']);
                }
                ],
                'id',
                'album_id',
                //'album_position',
                'user_id',
                //'name',
                'url:url',
                // 'type',
                // 'size',
                // 'created',
                'status',
                ['class' => 'yii\grid\ActionColumn'],
            ],
        ]);
        ?>
    </div>
