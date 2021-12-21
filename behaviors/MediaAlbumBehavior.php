<?php

namespace kmergen\media\behaviors;

use kmergen\media\models\Media;
use kmergen\media\models\MediaAlbum;
use Yii;
use yii\base\Behavior;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;

/**
 * MediaAlbum behavior handles the uploaded images in a specific model and stored them in as kmergen\media\MediaAlbum.
 * In the owner table you have to set an attribute that provide the id from media_album table.
 * Before insert a new owner model we create a media album which persist until the owner model will be
 * deleted.
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class MediaAlbumBehavior extends Behavior
{
    /**
     * @var string the attribute that value is set to the album ID.
     * The attribute is null before an album will be created.
     * The MediaAlbum will be created first time, if it contain at minimum one file.
     */
    public $attribute;

    /**
     * @var array The media files of the owner model
     */
    public $mediaFiles = [];
    /**
     * @var integer|null the id of the parent media album
     */
    public $mediaAlbumParent;

    /**
     * @var boolean $deleteCascade
     * If true the mediaAlbum and the related files will be deleted.
     * If false the mediaAlbum and the related files will not be deleted.
     */
    public $deleteCascade = true;

    /**
     * @var boolean $asArray
     * If true it retrieves the mediaFiles as array,
     * if false it retrieves the mediaFiles as [[Media]] model.
     */
    public $asArray = true;

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
            ActiveRecord::EVENT_BEFORE_INSERT => 'beforeSave',
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
        $query = Media::find()
            ->with('translations')
            ->where(['album_id' => $this->owner->{$this->attribute}])
            ->orderBy('album_position');
        if ($this->asArray) {
            $query->asArray();
        }
        $this->mediaFiles = $query->all();
    }

    /**
     * @inheritdoc
     */
    public function afterValidate($event)
    {
        $this->oldMediaFiles = $this->mediaFiles;
        $this->loadPostedMediaFiles(Yii::$app->getRequest()->post('MediaFiles'));
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeSave($event)
    {
        if ($event->name === ActiveRecord::EVENT_BEFORE_INSERT) {
            // Create new mediaAlbum
            $album = new MediaAlbum();
            $album->name = $this->owner->formName() . '_' . $this->attribute;
            $album->parent = $this->mediaAlbumParent;
            $album->save(false);
            $this->owner->{$this->attribute} = $album->id;
        } else {
            //Delete old images
            $deleteFilesIds = array_keys(array_diff_key(ArrayHelper::index($this->oldMediaFiles, 'id'), ArrayHelper::index($this->mediaFiles, 'id')));
            $deleteFiles = Media::find()->where(['id' => $deleteFilesIds])->all();
            foreach ($deleteFiles as $deleteFile) {
                $deleteFile->delete();
            }
        }
        //We update the posted files
        $pos = 0;
        foreach ($this->mediaFiles as $file) {
            $file->status = 1;
            $file->album_id = $this->owner->{$this->attribute};
            $file->album_position = $pos;
            $file->update(false); //TODO there is an error in translation, at the moment fixed with validate false
            $pos++;
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeDelete($event)
    {
        if ($this->deleteCascade) {
            if ($this->owner->{$this->attribute} !== null) {
                MediaAlbum::findOne($this->owner->{$this->attribute})->delete();
            }
        }
        return true;
    }

    /**
     * Load and set the Media Files from the posted Media files ids
     * @param array the posted media files array
     * @return void
     */
    public function loadPostedMediaFiles($files)
    {
        if ($files !== null) {
            $this->mediaFiles = Media::find()->where(['id' => array_keys($files)])->all();
        } else {
            $this->mediaFiles = [];
        }
    }

}
