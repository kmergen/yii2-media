<?php

namespace kmergen\media\models;

use Yii;
use yii\helpers\FileHelper;
use yii\helpers\Json;
use creocoder\translateable\TranslateableBehavior;

/**
 * This is the model class for table "media".
 *
 * @property integer $id
 * @property integer $album_id
 * @property integer $user_id
 * @property string $name
 * @property string $url
 * @property string $type
 * @property integer $size
 * @property string $created
 * @property integer $status
 */
class Media extends \yii\db\ActiveRecord
{

    /**
     * @const integer the possible settings for the model status
     */
    const STATUS_TEMP = 0;
    const STATUS_PERMANENT = 1;

    /**
     * @var array|false the returned array from getImageSize() or false if the uploaded file is no image will set by [[upload()]].
     */
    private $_imageInfo;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'media';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'translateable' => [
                'class' => TranslateableBehavior::className(),
                'translationAttributes' => ['alt'],
            //'translationRelation' => 'translations',
            // translationLanguageAttribute => 'language',
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['album_id', 'album_position', 'user_id', 'status'], 'integer'],
            [['status'], 'in', 'range' => [self::STATUS_TEMP, self::STATUS_PERMANENT]],
            [['name'], 'string', 'max' => 100],
            [['url', 'type', 'size'], 'safe']];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('media', 'ID'),
            'album_id' => Yii::t('media', 'Album ID'),
            'album_position' => Yii::t('media', 'Album position'),
            'user_id' => Yii::t('media', 'Uid'),
            'name' => Yii::t('media', 'Filename'),
            'url' => Yii::t('media', 'Url'),
            'type' => Yii::t('media', 'Filetype'),
            'size' => Yii::t('media', 'Filesize'),
            'created' => Yii::t('media', 'Created'),
            'status' => Yii::t('media', 'Status'),
        ];
    }

    /**
     * @inheritdoc
     */
    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if ($insert) {
                if (Yii::$app->user !== null) {
                    $this->user_id = Yii::$app->user->id;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * @inheritdoc
     * Delete media file from path before media model will be deleted.
     */
    public function beforeDelete()
    {
        if (parent::beforeDelete()) {
            $path = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR . $this->url;
            @unlink($path);
            $this->deleteThumbnails();
            return true;
        } else {
            return false;
        }
    }

    /**
     * @inheritdoc
     * Delete thumbnails from a media file
     * First this function check if the file is an image. and then delete the thumbnails.
     */
    protected function deleteThumbnails()
    {
        if (preg_match('/image\/\w*/', $this->type)) {
            Yii::$app->image->deleteThumbs($this->url);
        }
    }

    /**
     * Delete all files with status =[[self::STATUS_TEMP]] and if it is image also the thumbnails.
     * We use here DAO to keep the memory consumption as low as possible. 
     * You may call this function in a cronjob or cron action.
     * @param integer $expire Default is 86400 (24 hours). That means that all temporary files which older than 24 hours from create date on are affected.
     */
    public static function deleteTemporaryFiles($expire = 86400)
    {
        $expired = time() - $expire;
        $strExpired = date("Y-m-d H:i:s", $expired);
        $tablename = static::tableName();

        $ids = Yii::$app->db->createCommand("SELECT id FROM $tablename WHERE status=:status AND created<:expired", [':status' => self::STATUS_TEMP, ':expired' => $strExpired])->queryColumn();
        $i = 0;
        foreach ($ids as $id) {
            static::findOne($id)->delete();
            $i++;
        }
        
        Yii::info("$i temporary media files have been deleted.");
        
        return $i;
    }

    public function getTranslations()
    {
        return $this->hasMany(MediaTranslation::className(), ['media_id' => 'id']);
    }

}
