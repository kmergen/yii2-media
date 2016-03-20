<?php

use yii\db\Migration;

class m160200_120130_create_media_deleted extends Migration
{
    public function up()
    {
        $this->createTable('media_deleted', [
            'url' => $this->string()->notNull(),
            'type' => $this->string()->notNull()
        ]);
    }

    public function down()
    {
        $this->dropTable('media_deleted');
    }
}
