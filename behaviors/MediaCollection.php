<?php

namespace kmergen\media\behaviors;

use Yii;
use yii\base\Behavior;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;
use kmergen\media\models\Media;
use kmergen\media\models\MediaAlbum;

/**
 * MediaCollection handles the uploaded images in a specific model.
 * In the owner table must be an attribute that provide the id from media_album table.
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class MediaCollection extends Behavior
{

    /**
     * @var string the attribute that value is set to the album ID if the filesAttribute contains files, if not it is set to null.
     */
    public $attribute;

    /**
     * @var array|null The media files of the owner model
     */
    public $mediaFiles;

    /**
     * @var array|null The old media files of the owner model
     */
    protected $oldMediaFiles = [];

    /**
     * @var integer|null the id of the parent media album (default to model_media_collection). Null if media album should have no parent
     */
    public $mediaAlbumParent = 4;

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

        if ($this->owner->{$this->attribute}) {
            $this->mediaFiles = Media::find()
                ->with('translations')
                ->where(['album_id' => $this->owner->{$this->attribute}])
                ->orderBy('album_position')
                ->asArray()
                ->indexBy('id')
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
            $activeLanguages = !empty(Yii::$app->urlManager->languages) ? Yii::$app->urlManager->languages : (array)Yii::$app->language;
            $deleteTranslationLanguages = array_flip($activeLanguages);
            foreach ($postedFiles as $id => $postedFile) {
                $file = Media::findOne($id);
                //Media translations
                foreach ($postedFile['translations'] as $language => $data) {
                    if ($data['alt'] !== "" || $data['title'] !== "") {
                        unset($deleteTranslationLanguages[$language]);
                        foreach ($data as $attribute => $translation) {
                            $file->translate($language)->$attribute = $translation;
                        }
                    }
                }

                //Delete all empty or not posted translations
                foreach ($deleteTranslationLanguages as $lang => $val) {
                    Yii::$app->db->createCommand()->delete('media_translation', ['media_id' => $file['id'], 'language' => $lang])->execute();
                }
                $this->mediaFiles[$id] = $file;
            }
        } else {
            $this->mediaFiles = null;
        }

        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeSave($event)
    {
        if ($this->mediaFiles !== null) {
            if ($this->owner->{$this->attribute} === null) { //Insert a new owner model
                $album = $this->createMediaAlbum();
                $albumId = $album->id;
            } else { //Update owner model record
                $albumId = $this->owner->{$this->attribute};
                $deleteFiles = array_diff_key(ArrayHelper::index($this->oldMediaFiles, 'id'), $this->mediaFiles);
                //We delete the old images we never need
                foreach ($deleteFiles as $id => $file) {
                    if (($model = Media::findOne($id)) !== null) {
                        $model->delete();
                    }
                }
            }
            //We update the posted files
            $pos = 0;
            foreach ($this->mediaFiles as $id => $file) {
                $file->status = 1;
                $file->album_id = $albumId;
                $file->album_position = $pos;
                $file->update();
                $pos++;
            }
        } else {
            if ($this->owner->{$this->attribute} !== null) { //Update owner model
                $this->deleteMediaAlbum();
            }
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeDelete($event)
    {
        if (!empty($this->owner->{$this->attribute})) {
            if ($this->deleteMediaAlbum()) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * Create a new media album
     */
    protected function createMediaAlbum()
    {
        $album = new MediaAlbum();
        $album->name = $this->owner->formName() . '_' . $this->attribute;
        $album->parent = $this->mediaAlbumParent;
        if ($album->save()) {
            $this->owner->{$this->attribute} = $album->id;
            return $album;
        } else {
            Yii::warning('Cannot create Media Album.');
            return false;
        }
    }

    /**
     * Delete a media album and all its media files
     */
    protected function deleteMediaAlbum()
    {
        $files = Media::find()
            ->where(['album_id' => $this->owner->{$this->attribute}])
            ->asArray()
            ->all();

        foreach ($files as $file) {
            if (($model = Media::findOne($file['id'])) !== null) {
                $model->delete();
            }
        }

        if (($album = MediaAlbum::findOne($this->owner->{$this->attribute})) !== null) {
            $album->delete();
            $this->owner->{$this->attribute} = null;
            return true;
        } else {
            Yii::warning('Cannot delete Media Album.');
            return false;
        }
    }

}
