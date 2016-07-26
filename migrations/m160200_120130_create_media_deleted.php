<?php

use yii\db\Migration;

class m160200_120130_create_media_deleted extends Migration
{
    public function up()
    {
         $tableOptions = null;

        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }
        
        $this->createTable('media_deleted', [
            'url' => $this->string()->notNull(),
            'type' => $this->string()->notNull()
        ], $tableOptions);
    }

    public function down()
    {
        $this->dropTable('media_deleted');
    }
}
