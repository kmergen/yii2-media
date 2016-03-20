<?php

use yii\db\Migration;

class m160200_120110_create_media_album extends Migration
{

    public function up()
    {
        $tableOptions = null;

        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%media_album}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
            'parent' => $this->integer(),
            ], $tableOptions);
    }

    public function down()
    {
        $this->dropTable('media_album');
    }

}
