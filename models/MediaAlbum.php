<?php

namespace kmergen\media\models;

use Yii;

/**
 * This is the model class for table "media_album".
 *
 * @property integer $id
 * @property string $name
 * @property integer $parent
 *
 * @property Article[] $articles
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
            [['name'], 'required'],
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
            'parent' => Yii::t('media', 'Parent ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getArticles()
    {
        return $this->hasMany(Article::className(), ['image_album' => 'id']);
    }

    /**
     * @inheritdoc
     * @return MediaAlbumQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new MediaAlbumQuery(get_called_class());
    }
}
