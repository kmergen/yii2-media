<?php

namespace kmergen\media\behaviors;

use Yii;
use yii\base\Behavior;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;
use kmergen\media\models\Media;
use kmergen\media\models\MediaAlbum;

/**
 * MediaAlbum behavior handles the uploaded images in a specific model and stored them in as kmergen\media\MediaAlbum.
 * In the owner table must be an attribute that provide the id from media_album table.
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
        if ($this->owner->{$this->attribute} !== null) {
            $this->mediaFiles = Media::find()
                ->with('translations')
                ->where(['album_id' => $this->owner->{$this->attribute}])
                ->orderBy('album_position')
                ->asArray()
                ->all();
        }
    }

    /**
     * @inheritdoc
     */
    public function afterValidate($event)
    {
        $this->oldMediaFiles = $this->mediaFiles;
        $postedFiles = Yii::$app->request->post('MediaFiles');

        if ($postedFiles !== null) {
            $this->mediaFiles = [];
            foreach ($postedFiles as $postedFile) {
                $file = Media::findOne($postedFile['id']);
                //Media translations
                if (isset($postedFile['translations'])) {
                    foreach ($postedFile['translations'] as $language => $data) {
                        foreach ($data as $attribute => $translation) {
                            $file->translate($language)->$attribute = $translation;
                        }
                    }

                }
                $this->mediaFiles[] = $file;
            }
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
        if (!empty($this->mediaFiles) && $this->owner->{$this->attribute} === null) { //Create new mediaAlbum
            $album = new MediaAlbum();
            $album->name = $this->owner->formName() . '_' . $this->attribute;
            $album->parent = $this->mediaAlbumParent;
            $album->save(false);
            $this->owner->{$this->attribute} = $album->id;
        } elseif (!empty($this->mediaFiles)) { //Update mediaAlbum
            $albumId = $this->owner->{$this->attribute};
            $deleteFiles = array_diff_key(ArrayHelper::index($this->oldMediaFiles, 'id'), ArrayHelper::index($this->mediaFiles, 'id'));
            //We delete the old images we never need
            foreach ($deleteFiles as $id => $file) {
                if (($model = Media::findOne($id)) !== null) {
                    $model->delete();
                }
            }
            //We update the posted files
            $pos = 0;
            foreach ($this->mediaFiles as $file) {
                $file->status = 1;
                $file->album_id = $albumId;
                $file->album_position = $pos;
                $file->update(false); //TODO there is an error in translation, at the moment fixed with validate false
                $pos++;
            }
        } else {
            if (!empty($this->oldMediaFiles)) { //Delete the old media files
                foreach ($this->oldMediaFiles as $oldFile) {
                    Media::find()->where(['album_id' => $oldFile['album_id']])->one()->delete();
                }
            }
        }
        return true;
    }

}
