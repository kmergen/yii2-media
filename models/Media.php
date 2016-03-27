<?php

namespace kmergen\media\models;

use Yii;
use Exception;
use yii\helpers\FileHelper;
use yii\helpers\Json;

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
     * @const string scenarios
     */
    const SCENARIO_UPLOAD = 'upload';

    /**
     * @const integer the possible settings for the model status
     */
    const STATUS_PERMANENT = 1;
    const STATUS_TEMP = 0;

    /**
     * @var UploadedFile
     */
    public $mediaFile;

    /**
     * @var string The path where to save the file
     */
    public $targetUrl = 'images/furzenhuber';

    /**
     * @var array mediaRules are send when a file is uploaded.
     * media provide predifined file and image rule properties.
     * This properties will merged width the default ones in [[addMediaRules()]]
     */
    public $mediaRules = [];

    /**
     * @var boolean If true the image will be risized if it is too big (width > ´maxWidth´ or height > ´maxHeight´ or size > maxSize).
     */
    public $resize = true;
    
    /**
     * @var string the style for the preview thumbnails. That must be a predefined thumbstyle from [[app\components\Image]]
     */
    public $thumbStyle = 'small';

    /**
     * @var array The validation rules
     * We save the rules in a property because we add during upload process file and image rules.
     */
    private $_rules = [
        [['album_id', 'album_position', 'user_id', 'status'], 'integer'],
        [['status'], 'in', 'range' => [self::STATUS_TEMP, self::STATUS_PERMANENT]],
        [['name', 'targetUrl'], 'string', 'max' => 100],
        [['url', 'type', 'size', 'mediaRules', 'resize'], 'safe'],
    ];

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
    public function scenarios()
    {
        
        $scenarios = [
            'upload' => ['status', 'targetUrl', 'resize', 'thumbStyle', 'mediaRules', 'mediaFile']
        ];
        
        return array_merge(parent::scenarios(), $scenarios);
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return $this->_rules;
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
     * If a file is uploaded it send an array ´mediaRules´ with predefined file and image rules.
     * The function create the nessacary rules and add them to the rules array.
     * There is a fallback if there is no file or image rule. Then the default properties will use as validation rules for image or file validator.
     * But you should always send a file and image properties array to override the default values.
     */
    protected function addMediaRules()
    {
        $this->mediaRules = Json::decode($this->mediaRules);
        
        $rule = ['mediaFile'];
        $fileDefaultProperties = ['skipOnEmpty' => false, 'extensions' => 'jpg,jpeg,png', 'maxSize' => 10000000, 'minSize' => 50, 'mimeTypes' => 'image/*', 'maxFiles' => 1];
        $imageDefaultProperties = ['skipOnEmpty' => false, 'maxWidth' => 1920, 'maxHeight' => 1080, 'minWidth' => 50, 'minHeight' => 50];

        if (array_key_exists('file', $this->mediaRules) && array_key_exists('image', $this->mediaRules)) {
            if ($this->_imageInfo !== false) {
                $properties = array_merge($fileDefaultProperties, $imageDefaultProperties, $this->mediaRules['file'], $this->mediaRules['image']);
                $rule[] = 'image';
            } else {
                $properties = array_merge($fileDefaultProperties, $this->mediaRules['file']);
                $rule[] = 'file';
            }
        } else {
            if ($this->_imageInfo !== false) {
                $properties = array_merge($fileDefaultProperties, $imageDefaultProperties);
                $rule[] = 'image';
            } else {
                $properties = $fileDefaultProperties;
                $rule[] = 'file';
            }
        }
        $rule = $rule + $properties;

        //We must check now if the image should be resized 
        if ($this->_imageInfo !== false && $this->resize === true) {
            list($width, $height) = $this->_imageInfo;
            if ($width > $rule['maxWidth'] || $height > $rule['maxHeight']) {
                $this->resize = [];
                $this->resize[] = $rule['maxWidth'];
                $this->resize[] = $rule['maxHeight'];
                unset($rule['maxWidth'], $rule['maxHeight']);
            }
        } else {
            $this->resize = false;
            
        }
        //We must set the maxFiles key to 1 if the media_file is not an array because FileValidator accepts only an array of file objects if maxFiles > 1
        if (!is_array($this->mediaFile)) {
            $rule['maxFiles'] = 1;
        }
        array_push($this->_rules, $rule);
    }

    /**
     * Save the uploaded file to filesystem path and optional resize before save it.
     */
    protected function saveUploadedFile()
    {
        $uniqueId = uniqid(mt_rand(1, 1000));
        $newName = $this->mediaFile->baseName . '_' . $uniqueId . '.' . $this->mediaFile->extension;
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
            $image = \yii\imagine\Image::thumb($this->mediaFile->tempName, $width, $height)->save($path);
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
     * Is the uploaded file an image.
     */
    public function getIsImage()
    {
        if ($this->_imageInfo) {
            return true;
        } else {
            return false;
        }
    }

}
