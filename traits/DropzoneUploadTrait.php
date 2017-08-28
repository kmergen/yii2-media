<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\traits;

use Yii;
use yii\base\InvalidConfigException;
use yii\web\NotFoundHttpException;
use kmergen\media\models\Media;
use yii\web\UploadedFile;
use yii\helpers\Url;
use yii\helpers\FileHelper;

/**
 * Dropzone Upload trait
 *
 * Use this trait in your controller upload action.
 * This trait provide specific functions to save your uploaded file and send a response back to the upload form.
 *  
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
trait DropzoneUploadTrait
{

    /**
     * @var array An array of items to send within the response back to the client
     */
    public $responseItems = [];

    /**
     * @var integer
     * @inheritdoc
     * If you provide a upload alongside a model the status for new uploaded files should be Media::STATUS_TEMP, because if you upload a file with status Media::STATUS_PERMANENT and
     * the user abort the form without submitting it then the files are without any reference to the model and useless stored in the media table.
     */
    public $status = \kmergen\media\models\Media::STATUS_TEMP;

    /**
     * @var integer the max height of an image. That mean that the image will resize on the server to the dimension [[imageMaxWidth]] x [[imageMaxHeight]].
     * Therefore it is important that you set also the [[maxImageHeight]] because we resize the image on server side with [[Imagine::Resize()]] that need
     * a width and a height argument. This function always preserved the aspect ratio of the image.
     * If you want only to resize the image on client side use the dropzone option [[resizeWidth]] and not set [[maxImageWidth]].
     * If you want both resize on client and server side you can set dropzone option [[resizeWidth]] and [[maxImageWidth]].
     */
    public $imageMaxWidth;

    /**
     * @var integer the max height of an image. That mean that the image will resize on the server to the dimension [[imageMaxWidth]] x [[imageMaxHeight]].
     * Therefore it is important that you set also the [[maxImageWidth]] because we resize the image on server side with [[Imagine::Resize()]] that need
     * a width and a height argument. This function always preserved the aspect ratio of the image.
     *  * If you want only to resize the image on client side use the dropzone option [[resizeHeight]] and not set [[maxImageHeight]].
     * If you want both resize on client and server side you can set dropzone option [[resizeHeight]] and [[maxImageHeight]].
     */
    public $imageMaxHeight;

    /**
     * @var string The web accessable url like e.g. "images". Do not prefix it with the "@web" alias.
     * The url always should be web accessable and the prefix should set in the function which fetch this file (Normally "Html::img()".
     */
    public $targetUrl;

    /**
     * @var boolean unique the uploaded file with a unique id
     */
    public $autoUniqueFilename = true;

    /**
     * @var string a prefix for the uploaded filename.
     */
    public $filenamePrefix = '';

    /**
     * @var string a suffix for the uploaded filename.
     */
    public $filenameSuffix = '';

    /**
     * @var integer The quality to store of a jpeg file.
     */
    public $jpeg_quality = 60;

    /**
     * @var integer The compression level to store of a png file.
     */
    public $png_compression_level = 8;

    public function saveUploadedMediaFile()
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $params = Yii::$app->getRequest()->post();

        $uploadedFile = UploadedFile::getInstanceByName($params['paramName']);
        if ($uploadedFile->hasError) {
            throw new Exception('Fileupload Error: ' . $uploadedFile->error);
        }

        $model = new Media();
        $info = getimagesize($uploadedFile->tempName);


        //Save the uploaded file
        $newFileName = $this->filenamePrefix . $uploadedFile->getBaseName();
        if ($this->autoUniqueFilename === true) {
            $newFileName .= '_' . uniqid(mt_rand(100, 1000));
        }
        $newFileName .= $this->filenameSuffix . '.' . $uploadedFile->getExtension();

        $targetFileDirectory = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR . $this->targetUrl;
        FileHelper::createDirectory($targetFileDirectory);
        $path = $targetFileDirectory . DIRECTORY_SEPARATOR . $newFileName;


        $model->name = $uploadedFile->name;
        $model->type = $uploadedFile->type;
        $model->url = $this->targetUrl . '/' . $newFileName;
        $model->status = $this->status;

        //We save the media model and the uploaded file
        if ($model->validate()) {

            if (isset($this->imageMaxWidth) && isset($this->imageMaxHeight) && ($this->imageMaxWidth < $info[0] || $this->imageMaxHeight < $info[1])) {
                \kmergen\media\helpers\Image::resize($uploadedFile->tempName, $this->imageMaxWidth, $this->imageMaxHeight)
                    ->save($path, ['jpeg_quality' => $this->jpeg_quality, 'png_compression_level' => $this->png_compression_level]);
                $model->size = filesize($path);
            } elseif (isset($this->imageMaxWidth) && !isset($this->imageMaxHeight)) {
                throw new InvalidConfigException('If you set "maxImageWidth" you must also set "imageMaxHeight".');
            } elseif (isset($this->imageMaxHeight) && !isset($this->imageMaxWidth)) {
                throw new InvalidConfigException('If you set "maxImageHeight" you must also set "imageMaxWidth".');
            } else {
                //No resizing needed
                $model->size = $uploadedFile->size;
                $uploadedFile->saveAs($path);
            }

            $model->save();
            
            $this->responseItems = [
                'baseUrl' => Yii::getAlias('@web'),
                'id' => $model->id,
                'name' => $model->name,
                'size' => $model->size,
                'url' => $model->url,
                'deleteUrl' => $params['deleteUrl'],
                'status' => $model->status,
                'type' => $model->type,
            ];
            
            if (isset($params['thumbStyle'])) {
                $this->responseItems['thumbnailUrl'] = Yii::$app->image->thumb($model->url, $params['thumbStyle']);
            }
            
        } else {
            $errorMessage = '';
            foreach ($model->getFirstErrors() as $error) {
                $errorMessage .= "$error\n";
            }
            throw new Exception($errorMessage);
        }
    }

    public function deleteUploadedFile($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        if (($model = Media::findOne($id)) !== null) {
            $model->delete();
            $this->responseItems['fileData']['id'] = $model->id;
            $this->responseItems['fileData']['name'] = $model->name;
        } else {
            throw new NotFoundHttpException('The requested file does not exist.');
        }
    }

}
