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
<div class="box">
    <div class="box-header with-border">
        <h3 class="box-title"><?= Html::encode($this->title) ?></h3>
        <?php // echo $this->render('_search', ['model' => $searchModel]);  ?>
    </div>
    <div class="box-body">
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
</div>