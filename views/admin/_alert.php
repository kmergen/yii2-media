<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $content string */
/* @var $alertClass string */
?>

<?php $alertClass = empty($alertClass) ? 'secondary' : $alertClass?>

<div class="alert alert-<?= $alertClass ?> alert-dismissible fade show" role="alert">
    <?= $content ?>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

