<?php

use yii\db\Migration;

class m160200_120140_create_media_translation extends Migration
{

    public function up()
    {
        $tableOptions = null;

        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%media_translation}}', [
        'media_id' => $this->integer(11)->notNull(),
        'language' => $this->string(16)->notNull(),
        'alt' => $this->string(255),
        'title' => $this->string(255),
        ], $tableOptions);

        // add foreign key for table `media`
        $this->addForeignKey(
            'fk-media_translation-media_id',
            'media_translation',
            'media_id',
            'media',
            'id',
            'CASCADE'
        );

        $this->addPrimaryKey('media_translation_pk', 'media_translation', ['media_id', 'language']);
    }


    public function down()
    {
        $this->dropTable('{{%media_translation}}');
    }

}
