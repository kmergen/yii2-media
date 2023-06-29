<?php

namespace kmergen\media\actions;

use yii\base\Action as BaseAction;
use kmergen\media\models\Media;
use kmergen\media\Module;
use Yii;

/**
 * Run all cron tasks.
 * You can run this action via a cronjob or manuell.
 */

class CronAction extends BaseAction
{
    private $mediaModule;

    public function run()
    {
        $this->mediaModule = Module::getInstance();


        $this->deleteDeletedFiles();
        $this->deleteTemporaryFiles();

        return '';
    }

    /**
     * Cron function
     * Delete expired soft deleted files
     */
    public function deleteDeletedFiles()
    {
        $ids = Yii::$app->db->createCommand("SELECT id FROM media WHERE status=:status AND DATE_ADD(updated_at, INTERVAL {$this->mediaModule->timespanDeleteDeletedFiles} DAY) < NOW()", [':status' => Media::STATUS_DELETED])->queryColumn();
        foreach ($ids as $id) {
            Media::findOne($id);
        }
    }

    /**
     * Cron function
     * Delete expired temporary files
     */
    public function deleteTemporaryFiles()
    {
        $ids = Yii::$app->db->createCommand("SELECT id FROM media WHERE status=:status AND DATE_ADD(updated_at, INTERVAL {$this->mediaModule->timespanDeleteTemporaryFiles} DAY) < NOW()", [':status' => Media::STATUS_TEMP])->queryColumn();
        foreach ($ids as $id) {
            Media::findOne($id);
        }
    }
}
