<?php

namespace kmergen\media\behaviors;

use Yii;
use yii\base\Behavior;
use yii\db\ActiveRecord;
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
     * @var the album id of the [[attribute]]
     */
    private $_albumId;

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
            ActiveRecord::EVENT_BEFORE_INSERT => 'beforeInsert',
            ActiveRecord::EVENT_BEFORE_UPDATE => 'beforeUpdate',
            ActiveRecord::EVENT_AFTER_DELETE => 'beforeDelete',
        ];
    }

    /**
     * @inheritdoc
     * Load the files from the model media collection
     */
    public function afterFind($event)
    {
        if ($this->owner->{$this->attribute} !== null) {
            $this->_albumId = $this->owner->{$this->attribute};
            $this->owner->{$this->attribute} = Media::find()
                ->where(['album_id' => $this->_albumId])
                ->orderBy('album_position')
                ->asArray()
                ->all();
        }
    }

    /**
     * @inheritdoc
     */
    public function beforeInsert($event)
    {
        if (!empty($this->owner->{$this->attribute})) {
            //Create new album
            if (($album = $this->createMediaAlbum()) !== false) {
                foreach ($this->owner->{$this->attribute} as $pos => $file) {
                    Yii::$app->db->createCommand()->update('media', ['album_id' => $album->id, 'album_position' => $pos, 'status' => 1], ['id' => $file['id']])->execute();
                }
                $this->owner->{$this->attribute} = $album->id;
            } else {
                return false;
            }
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeUpdate($event)
    {
        if ($this->_albumId === null) {
            if (!empty($this->owner->{$this->attribute})) {
                if (($album = $this->createMediaAlbum()) !== false) {
                    $conn = Yii::$app->db;
                    foreach ($this->owner->{$this->attribute} as $pos => $file) {
                        $conn->createCommand()->update('media', ['status' => 1, 'album_id' => $album->id, 'album_position' => $pos], ['id' => $file['id']])->execute();
                    }
                    $this->owner->{$this->attribute} = $album->id;
                } else {
                    return false;
                }
            }
        } else {
            //We need the old files
            $oldFiles = Media::find()
                ->where(['album_id' => $this->_albumId])
                ->orderBy('album_position')
                ->asArray()
                ->all();

            $old_ids = [];
            foreach ($oldFiles as $v) {
                $old_ids[] = $v['id'];
            }

            $new_ids = [];
            if (!empty($this->owner->{$this->attribute})) {
                foreach ($this->owner->{$this->attribute} as $v) {
                    if ($v['id']) {
                        $new_ids[] = $v['id'];
                    }
                }
            }

            $delete_ids = array_diff($old_ids, $new_ids);
            //We delete the old images we never need
            foreach ($delete_ids as $id) {
                if (($model = Media::findOne($id)) !== null) {
                    $model->delete();
                }
            }

            if (empty($new_ids)) {
                if ($this->deleteMediaAlbum()) {
                    $this->owner->{$this->attribute} = null;
                    return true;
                } else {
                    return false;
                }
            } else {
                //We update all files for this model id also the already exsting ones, because it is possible that the position has been changed,
                //e.g. if the first file is deleted the second goes on first position.
                foreach ($new_ids as $position => $id) {
                    Yii::$app->db->createCommand()->update('media', ['status' => 1, 'album_id' => $this->_albumId, 'album_position' => $position], ['id' => $id])->execute();
                }
                $this->owner->{$this->attribute} = $this->_albumId;
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
            //We delete the images
            foreach ($this->owner->{$this->attribute} as $file) {
                if (($model = Media::findOne($file['id'])) !== null) {
                    $model->delete();
                }
            }

            if ($this->deleteMediaAlbum()) {
                return true;
            } else {
                return false;
            }
        }
    }

    protected function createMediaAlbum()
    {
        $album = new MediaAlbum();
        $album->name = $this->owner->formName() . '_' . $this->attribute;
        $album->parent = $this->mediaAlbumParent;
        if ($album->save()) {
            return $album;
        } else {
            Yii::warning('Cannot create Media Album.');
            return false;
        }
    }

    protected function deleteMediaAlbum()
    {
        if (($album = MediaAlbum::findOne($this->_albumId)) !== null) {
            $album->delete();
            return true;
        } else {
            Yii::warning('Cannot delete Media Album.');
            return false;
        }
    }

}
