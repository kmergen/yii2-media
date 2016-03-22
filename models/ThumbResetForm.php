<?php

namespace kmergen\media\models;

use Yii;
use yii\base\Model;
use yii\helpers\FileHelper;

/**
 * ThumbResetForm is the model to reset a thumbStyle.
 */
class ThumbResetForm extends Model
{

    /**
     * @var string A predifined thumbstyle from image "kmergen\components\Image"
     */
    public $thumbstyle;

    /**
     * @var string The base path from where the thumb directorys should be deleted.
     */
    public $startPath;

    /**
     * @var array From the reset affected files
     */
    private $_affectedFiles = [];

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['thumbstyle'], 'required'],
            [['thumbstyle'], 'in', 'range' => array_keys(Yii::$app->image->thumbStyles)],
            [['startPath'], 'validateIsDirectory', 'skipOnEmpty' => false, 'skipOnError' => false],
        ];
    }

    /**
     * Inline validator for [[startPath]].
     */
    public function validateIsDirectory($attribute, $params)
    {
        if (empty($this->startPath)) {
            $this->addError($attribute, Yii::t('media', '{attribute} cannot be empty.', ['attribute' => $attribute]));
        }
        if (!is_dir(Yii::getAlias('@webroot') . '/' . $this->$attribute)) {
            $this->addError($attribute, Yii::t('media', '{attribute} must be a valid directory in the webroot.', ['attribute' => $attribute]));
        }
    }

    /**
     * @return array customized attribute labels
     */
    public function attributeLabels()
    {
        return [
            'thumbstyle' => Yii::t('media', 'Thumbstyle'),
            'startPath' => Yii::t('media', 'Start Path'),
        ];
    }

    /**
     * Delete all thumbnail files from the given [[thumbstyle]]
     */
    public function resetThumbs($preview)
    {
        if ($this->validate()) {
            $webroot = Yii::getAlias('@webroot');
            $path = $webroot . '/' . $this->startPath;

            if (Yii::$app->image->thumbExtraDirectory) {
                $iterator = new \RecursiveIteratorIterator(
                    new \RecursiveDirectoryIterator($path), \RecursiveIteratorIterator::SELF_FIRST);

                foreach ($iterator as $file) {
                    if ($file->isDir()) {
                        $filename = $file->getFilename();
                        if ($filename === $this->thumbstyle) {
                            $realpath = $file->getRealpath();
                            if (!empty(Yii::$app->image->thumbDirectory)) {
                                //The directory is only affected if the parent directory is the thumbDirectory
                                if (basename(dirname($realpath)) === Yii::$app->image->thumbDirectory) {
                                    $this->_affectedFiles[] = $realpath;
                                }
                            } else {
                                $this->_affectedFiles[] = $realpath;
                            }
                        }
                    }
                }

                //Remove all affected directories
                if ($preview === false) {
                    foreach ($this->_affectedFiles as $k => $dir) {
                        try {
                            FileHelper::removeDirectory($dir);
                            $this->_affectedFiles[$k] = $dir . ' deleted successfully';
                        } catch (Exception $ex) {
                            $this->_affectedFiles[$k] = $dir . $ex->getMessage();
                        }
                    }
                }
            } else {
                if (!empty(Yii::$app->image->thumbDirectory)) {
                    $iterator = new \RecursiveIteratorIterator(
                        new \RecursiveDirectoryIterator($path), \RecursiveIteratorIterator::SELF_FIRST);

                    foreach ($iterator as $file) {
                        if (!$file->isDir()) {
                            $realpath = $file->getRealpath();
                            if (basename(dirname($realpath)) === Yii::$app->image->thumbDirectory) {
                                if (strpos($file->getFilename(), '_' . $this->thumbstyle)) {
                                    $this->_affectedFiles[] = $realpath;
                                }
                            }
                        }
                    }
                } else {
                    $this->_affectedFiles = FileHelper::findFiles($path, ['only' => ['*_' . $this->thumbstyle . '.*']]);
                }

                //Delete all affected files
                if ($preview === false) {
                    foreach ($this->_affectedFiles as $k => $file) {
                        try {
                            unlink($file);
                            $this->_affectedFiles[$k] = $file . ' deleted successfully';
                        } catch (Exception $ex) {
                            $this->_affectedFiles[$k] = $file . $ex->getMessage();
                        }
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    public function getAffectedFiles()
    {
        return $this->_affectedFiles;
    }

}
