<?php

namespace kmergen\media\behaviors;

use kmergen\media\models\Media;
use Yii;
use yii\base\Behavior;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;
use yii\db\Expression;


/**
 * MediaImageBehavior is an alternative to MediaAlbumBehavior. You can only use one of the two at a time.
 * It store the images as a json array to an field in the database table.
 * MediaImageBehavior handles various events and executes the necessary
 * steps in the media table and in the corresponding attribute of the model.
 * Therefore you have to set a database field in the owner model e.g. images.
 * The field have to be a json field and allow null.
 * In the validator set this property to 'safe'.
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class MediaImageBehavior extends Behavior
{
    /**
     * @var string the ad model images attribute.
     */
    public $attribute;

    /**
     * @var array The media files of the owner model
     */
    public $mediaFiles = [];

    /**
     * @var array The old media files of the owner model
     */
    protected $oldMediaFiles = [];

    /**
     * @inheritdoc
     */
    public function events()
    {
        return [
            ActiveRecord::EVENT_AFTER_FIND => 'afterFind',
            ActiveRecord::EVENT_AFTER_VALIDATE => 'afterValidate',
            ActiveRecord::EVENT_BEFORE_UPDATE => 'beforeSave',
            ActiveRecord::EVENT_BEFORE_DELETE => 'beforeDelete',
        ];
    }

    /**
     * @inheritdoc
     * Load the files from the model media collection
     */
    public function afterFind($event)
    {

        if ($this->owner->{$this->attribute} !== null && $this->owner->{$this->attribute} !== '"[]"') {
            $notdecoded = $this->owner->{$this->attribute};
            $decoded = json_decode($this->owner->{$this->attribute});
            $this->mediaFiles = Json::decode($this->owner->{$this->attribute});
        }
    }

    /**
     * @inheritdoc
     */
    public function afterValidate($event)
    {
        $this->oldMediaFiles = $this->mediaFiles;
        $newMediaFiles = Yii::$app->getRequest()->post('MediaFiles');
        if ($newMediaFiles !== null) {
            $this->mediaFiles = Media::find()->where(['id' => array_keys($newMediaFiles)])->all();
        } else {
            $this->mediaFiles = [];
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeSave($event)
    {
        if ($event->name === ActiveRecord::EVENT_BEFORE_UPDATE) {
            //Delete old images
            $ids = array_keys(array_diff_key(ArrayHelper::index($this->oldMediaFiles, 'id'), ArrayHelper::index($this->mediaFiles, 'id')));
            $this->deleteMediaFiles($ids);
        }
        //We update the posted files and create the new owner attribute (images)
        $images = [];
        $i = 0;
        foreach ($this->mediaFiles as $file) {
            $file->status = Media::STATUS_PERMANENT;
            $file->update(false); //TODO there is an error in translation, at the moment fixed with validate false

            $images[$i]['id'] = $file->id;
            $images[$i]['url'] = $file->url;
            $images[$i]['name'] = $file->name;
            $images[$i]['type'] = $file->type;
            $i++;
        }
        $this->owner->{$this->attribute} = Json::encode($images);
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeDelete($event)
    {
        if (!empty($this->mediaFiles)) {
            $ids = ArrayHelper::getColumn($this->mediaFiles, 'id');
            $this->deleteMediaFiles($ids);
        }
        return true;
    }

    /**
     * Soft delete files in table Media with the given Ids
     */
    protected function deleteMediaFiles($ids)
    {
        $deleteFiles = Media::find()->where(['id' => $ids])->all();
        foreach ($deleteFiles as $deleteFile) {
            // It is important to update the updated_at field, because that is the begin of the cronHhardDeleteTimespan
            $deleteFile->updateAttributes(['status' => Media::STATUS_DELETED, 'updated_at' =>  new Expression('NOW()')]);
        }
    }
}
