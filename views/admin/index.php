<?php

use kmergen\grid\ActionColumn;
use kmergen\widgets\LinkPager;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $searchModel kmergen\media\models\MediaSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('media', 'Media');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="media-admin-index card">
    <div class="card-header">
        <h1 class="card-title"><?= Html::encode($this->title) ?></h1>
    </div>
    <div class="card-body">
        <?php // echo $this->render('_search', ['model' => $searchModel]);  ?>
        <?= Html::a(Yii::t('media', 'List no existing Files'), '/media/admin/no-existing-files', ['id' => 'a-no-existing-files']) ?>
        <div id="index-alert"></div>
        <?=
        GridView::widget([
            'dataProvider' => $dataProvider,
            'filterModel' => $searchModel,
            'pager' => [
                'class' => LinkPager::class,
                'firstPageLabel' => 'First',
                'lastPageLabel' => 'Last',
            ],
            'columns' => [
                //['class' => 'yii\grid\SerialColumn'],
                [
                    'class' => 'yii\grid\Column',
                    'header' => Yii::t('media', 'Preview'),
                    'content' => function ($model, $key, $index, $column) {
                        return Html::a(Html::img(Yii::$app->image->thumb($model->url, 'xsmall')), '@web/' . $model->url, ['target' => '_blank']);
                    }
                ],
                'id',
                'album_id',
                //'album_position',
                'user_id',
                //'name',
                'url',
                // 'type',
                // 'size',
                // 'created_at',
                // 'updated_at',
                'status',
                ['class' => ActionColumn::class],
            ],
        ]);
        ?>
    </div>
</div>

<?php
$js = <<<JS
$('#a-no-existing-files').click(function(event) {
    event.preventDefault();
  $('#index-alert').load($(this).attr('href'));
});
JS;
$this->registerJs($js);
?>
