<?php

use yii\db\Migration;

class m160200_120120_create_media extends Migration
{

    public function up()
    {
        $tableOptions = null;

        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%media}}', [
        'id' => $this->primaryKey(),
        'album_id' => $this->integer(),
        'album_position' => $this->integer()->defaultValue(Null),
        'user_id' => $this->integer(),
        'name' => $this->string()->notNull(),
        'url' => $this->string()->notNull(),
        'type' => $this->string()->notNull(),
        'size' => $this->integer()->notNull(),
        'created' => $this->timestamp(),
        'status' => $this->smallInteger(4)->notNull()->defaultValue(1),
        'alt' => $this->string()->string(100),
        'caption' => $this->string()->string(100),
        ], $tableOptions);
    
        $this->createIndex('idx-media-album_id', 'media', 'album_id');
        $this->createIndex('idx-media-url', 'media', 'url', true);
    }
    

    public function down()
    {
        $this->dropTable('{{%media}}');
    }

}
