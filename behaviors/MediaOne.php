<?php

namespace kmergen\media\behaviors;

use Yii;
use yii\behaviors\AttributeBehavior;
use yii\db\ActiveRecord;
use kmergen\media\models\Media;

/**
 * MediaOne handles an uploaded file for the specific attribute.
 * This is only to set the value for one media file to the attribute. Use MediaCollection behavior if an attribute hold more then one media file.
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class MediaOne extends AttributeBehavior
{

    /**
     * @var string the attribute that provide the media collection files
     */
    public $attribute;

    /**
     * @inheritdoc
     */
    public function events()
    {
        return [
            ActiveRecord::EVENT_BEFORE_INSERT => 'beforeInsert',
            ActiveRecord::EVENT_BEFORE_UPDATE => 'beforeUpdate',
            ActiveRecord::EVENT_AFTER_DELETE => 'beforeDelete',
        ];
    }

    /**
     * @inheritdoc
     */
    public function beforeInsert($event)
    {
        $file = $this->owner->{$this->attribute};
        if (!empty($file)) {
            Yii::$app->db->createCommand()->update('media', ['status' => 1], ['url' => $file['url']])->execute();
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeUpdate($event)
    {
        $user = Yii::$app->user;
        $ident = $user->identity;
        
        
        $file = $this->owner->{$this->attribute};
        $oldUrl = $this->owner->getOldAttribute($this->attribute);

        if (!empty($file)) {
            $newUrl = $file[0]['url'];
            if ($newUrl !== $oldUrl) {
                Yii::$app->db->createCommand()->update('media', ['status' => 1], ['url' => $newUrl])->execute();
            }
            $this->owner->{$this->attribute} = $newUrl;
        } else {
            if ($oldUrl !== null) {
                $this->deleteMediaFile($oldUrl);
                $this->owner->{$this->attribute} = null;
            }
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public function beforeDelete($event)
    {
        if (($url = $this->owner->{$this->attribute}) !== null) {
            deleteMediaFile($url);
        }
        return true;
    }

    protected function deleteMediaFile($url)
    {
        if (($media = Media::findOne(['url' => $url])) !== null) {
            $media->delete();
            return true;
        } else {
            Yii::warning('Cannot delete Media File.');
            return false;
        }
    }

}
