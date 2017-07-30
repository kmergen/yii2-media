<?php

namespace kmergen\media\controllers;

use Yii;
use kmergen\media\models\Media;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\UploadedFile;
use yii\helpers\Url;
use yii\helpers\FileHelper;

/**
 * UploadController provide the upload and upload-delete actions for uploading files to the server
 * and save them as Media model.
 */
class UploadController extends Controller
{

    /** @inheritdoc */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'upload' => ['POST'], //Do this to prevent a direct call from the browser. We can not choose ajaxOnly because the upload process is not a real ajax request.
                    'delete' => ['POST'],
                ],
            ],
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                    //'roles' => ['admin'],
                    ],
                ],
            ],
        ];
    }

    /**
     * Upload a file via ajax.
     * @return string JSON string will return with uploaded file information or if upload failed an error message.
     */
    public function actionUpload()
    {
        try {
            $uploadedFile = UploadedFile::getInstanceByName('mediaUploadFile');
            if ($uploadedFile->hasError) {
                throw new Exception('Fileupload Error: ' . $uploadedFile->error);
            }

            $model = new Media();
            $request = Yii::$app->getRequest();
            Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

            $info = getimagesize($uploadedFile->tempName);
            $params = $request->post('WidgetSettings');


            //Save the uploaded file
            $newFileName = $uploadedFile->getBaseName() . '_' . uniqid(mt_rand(100, 1000)) . '.' . $uploadedFile->getExtension();
            $targetFileDirectory = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR . $params['targetUrl'];
            FileHelper::createDirectory($targetFileDirectory);
            $path = $targetFileDirectory . DIRECTORY_SEPARATOR . $newFileName;

            //We save the uploaded file
            $resize = (isset($params['imageMaxWidth']) && $params['imageMaxWidth'] < $info[0]) ||
                (isset($params['imageMaxHeight']) && $params['imageMaxHeight'] < $info[1]) ? true : false;
            $jpeg_quality = isset($params['jpeg_quality']) ? $params['jpeg_quality'] : 60;
            $png_compression_level = isset($params['png_compression_level']) ? $params['png_compression_level'] : 8;

            if ($resize) {
                $image = \kmergen\media\helpers\Image::resize($uploadedFile->tempName, $params['imageMaxWidth'], $params['imageMaxHeight'])
                    ->save($path, ['jpeg_quality' => $jpeg_quality, 'png_compression_level' => $png_compression_level]);
                $model->size = filesize($path);
            } else {
                $this->size = $uploadedFile->size;
                $uploadedFile->saveAs($path);
            }

            $model->name = $uploadedFile->name;
            $model->type = $uploadedFile->type;
            $model->url = $params['targetUrl'] . '/' . $newFileName;
            $model->status = $params['status'];

            //We save the media model
            if ($model->save()) {
                $items['baseUrl'] = Yii::getAlias('@web');
                $items['files'] = [
                    [
                        'id' => $model->id,
                        'name' => $model->name,
                        'size' => $model->size,
                        'url' => $model->url,
                        'thumbnailUrl' => is_array($info) ? Yii::$app->image->thumb($model->url, $params['thumbStyle']) : null,
                        'deleteUrl' => Url::to(['/media/upload/delete', 'id' => $model->id]),
                        'deleteType' => 'POST',
                        'status' => $model->status,
                        'type' => $model->type,
                    ]
                ];
            } else {
                $errorMessage = '';
                foreach ($model->getFirstErrors() as $error) {
                    $errorMessage .= "$error\n";
                }
                $items['files'] = [
                    ['error' => $errorMessage]
                ];
            }
        } catch (\Exception $e) {
            $items['files'] = [
                ['error' => $e->getMessage()]
            ];
        }

        return $items;
    }

    public function actionDelete($id)
    {
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

        $items['files'] = [];

        if (($model = Media::findOne($id)) !== null) {
            try {

                $model->delete();
                $items['files'][][$model->name] = true;
                $items['files'][][$id] = true;
                return $items;
            } catch (\Exception $e) {
                $items['files'][][$model->name] = false;
                $items['files'][][$id] = false;
                $items['files'][]['error'] = $e->getMessage();
                return $items;
            }
        } else {
            $items['files'][][$id] = false;
            $items['files'][]['error'] = 'The requested image file does not exist.';
            return $items;
        }
    }

    protected function getFileParams()
    {
        $params = Yii::$app->getRequest()->post('fileParams');
        if ($params === null) {
            return null;
        } else {
            
        }
    }

}
