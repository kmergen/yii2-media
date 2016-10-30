<?php

namespace kmergen\media\models;

use Yii;

/**
 * This is the model class for table "media_translation".
 *
 * @property integer $media_id
 * @property string $language
 * @property string $alt
 * @property string $title
 */
class MediaTranslation extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'media_translation';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['language'], 'required'],
            [['media_id'], 'integer'],
            [['language'], 'string', 'max' => 16],
            [['alt', 'title'], 'string', 'max' => 255],
            [['media_id'], 'exist', 'skipOnError' => true, 'targetClass' => Media::className(), 'targetAttribute' => ['media_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'media_id' => Yii::t('media', 'Media ID'),
            'language' => Yii::t('media', 'Language'),
            'alt' => Yii::t('media', 'Alt'),
            'title' => Yii::t('media', 'Title'),
        ];
    }
}
