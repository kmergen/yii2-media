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
    const STATUS_PERMANENT = 1;
    const STATUS_TEMP = 0;

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
                'translationAttributes' => ['alt', 'title'],
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
     * Handle the upload process and save the uploaded file to filesystem path and insert the $model record to db.
     */
    public function upload()
    {
        $this->_imageInfo = getimagesize($this->mediaFile->tempName);
        $this->addMediaRules();

        if ($this->validate()) {
            $this->saveUploadedFile();
            $this->insert(false);
            return true;
        } else {
            return false;
        }
    }

   
    /**
     * Save the uploaded file to filesystem path and optional resize before save it.
     */
    protected function saveUploadedFile()
    {
        $uniqueId = uniqid(mt_rand(100, 1000));
        $newName = $this->mediaFile->getBaseName() . '_' . $uniqueId . '.' . $this->mediaFile->getExtension();
        $webroot = Yii::getAlias('@webroot');
        $dir = $webroot . DIRECTORY_SEPARATOR . $this->targetUrl;
        FileHelper::createDirectory($dir);
        $path = $dir . DIRECTORY_SEPARATOR . $newName;
        $this->name = $this->mediaFile->name;
        $this->url = $this->targetUrl . '/' . $newName;
        $this->type = $this->mediaFile->type;

        // resize the file (Check is done by [[addMediaRules]]
        if (is_array($this->resize)) {
            list($width, $height) = $this->resize;
            $image = \kmergen\media\helpers\Image::resize($this->mediaFile->tempName, $width, $height)->save($path);
            $this->size = filesize($path);
        } else {
            $this->size = $this->mediaFile->size;
            $this->mediaFile->saveAs($path);
        }
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
     * Instead of a soft delete behavior (need no history data here) we work with a helper table ´media_deleted_files´, in which only the path of the deleted file is stored.
     * This means that we delete this model record quite normal and can cleanup the filesystem with a cron job.
     * The advantage over a softdelete variant is that only a single overhead namely writing the erased path in the helper table. Changes to the table structure or the model class (new find function, etc) are not necessary.
     */
    public function beforeDelete()
    {
        if (parent::beforeDelete()) {
            Yii::$app->db->createCommand()->insert('media_deleted', ['url' => $this->url, 'type' => $this->type])->execute();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delete deleted files and thumbnails from file system
     * Use this function in a cronjob or in a cron action
     * We use it in this application in [[component\Cron.php]]
     */
    public static function deleteDeletedFiles()
    {
        $webroot = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR;
        $files = Yii::$app->db->createCommand("Select url, type FROM media_deleted")->queryAll();

        foreach ($files as $file) {
            //Delete file from path.
            $path = $webroot . $file['url'];
            @unlink($path);
            //We check if the file is an image. If so we delete the thumbnails of the image.
            //Note that we only check the mime type whether the file is an image. The big check whether the file is really an image has been done during upload.
            if (preg_match('/image\/\w*/', $file['type'])) {
                Yii::$app->image->deleteThumbs($file['url']);
            }
        }
        return Yii::$app->db->createCommand()->delete('media_deleted')->execute();
    }

    /**
     * Move temporary files into "media_deleted" table
     * Use this function in a cronjob or in a cron action
     * We use it in this application in [[component\Cron.php]]
     */
    public static function deleteTemporaryFiles($expire = null)
    {
        $status = self::STATUS_TEMP;
        if ($expire === null) {
            $expire = 86400; //24 hours
        }
        $expired = time() - $expire;
        $strExpired = date("Y-m-d H:i:s", $expired);
        Yii::$app->db->createCommand("INSERT INTO media_deleted (url, type) SELECT url, type FROM media WHERE status=$status AND created<'$strExpired'")->execute();
        return Yii::$app->db->createCommand()->delete('media', "status=$status AND created<'$strExpired'")->execute();
    }

//    public function transactions()
//    {
//        return [
//           // self::SCENARIO_DEFAULT => self::OP_INSERT | self::OP_UPDATE,
//        ];
//    }


    public function getTranslations()
    {
        return $this->hasMany(MediaTranslation::className(), ['media_id' => 'id']);
    }

}
