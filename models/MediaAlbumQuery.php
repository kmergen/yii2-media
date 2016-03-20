<?php

namespace kmergen\media\models;

/**
 * This is the ActiveQuery class for [[MediaAlbum]].
 *
 * @see MediaAlbum
 */
class MediaAlbumQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * @inheritdoc
     * @return MediaAlbum[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return MediaAlbum|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
