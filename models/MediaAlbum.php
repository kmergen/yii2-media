<?php

namespace kmergen\media\models;

use Yii;

/**
 * This is the model class for table "media_album".
 *
 * @property integer $id
 * @property string $name
 * @property integer $parent
 */
class MediaAlbum extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'media_album';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['parent'], 'integer'],
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('media', 'ID'),
            'name' => Yii::t('media', 'Name'),
            'parent' => Yii::t('media', 'Parent'),
        ];
    }

    /**
     * @inheritdoc
     * @return MediaAlbumQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new MediaAlbumQuery(get_called_class());
    }

    /**
     * Delete media files from this album
     */
    public function beforeDelete()
    {
        if (!parent::beforeDelete()) {
            return false;
        }
        $files = Media::find()
            ->where(['album_id' => $this->id])
            ->all();

        foreach ($files as $file) {
            $file->delete();
        }
        return true;
    }
}
