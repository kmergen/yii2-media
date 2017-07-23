<?php

namespace kmergen\media\controllers;

use Yii;
use kmergen\media\models\Media;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\UploadedFile;
use yii\helpers\Url;

/**
 * UploadController provide the upload and upload-delete actions for uploading files to the server
 * and save them as Media model.
 */
class DropzoneController extends Controller
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
        //klausi mausi
        $model = new Media();
        $model->scenario = Media::SCENARIO_UPLOAD;
        $request = Yii::$app->getRequest();

        try {
            $model->mediaFile = UploadedFile::getInstanceByName('mediaUploadFile');
            $model->load($request->post());
            Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            if ($model->upload()) {
                $items['baseUrl'] = Yii::getAlias('@web');
                $items['files'] = [
                    [
                        'id' => $model->id,
                        'name' => $model->name,
                        'size' => $model->size,
                        'url' => $model->url,
                        'thumbnailUrl' => $model->isImage ? Yii::$app->image->thumb($model->url, $model->thumbStyle) : null,
                        'deleteUrl' => Url::to(['/media/upload/delete', 'id' => $model->id]),
                        'deleteType' => 'POST',
                        'status' => $model->status,
                        'type' => $model->type,
                    ]
                ];
            } else {
                if ($model->hasErrors()) {
                    $errorMessage = '';
                    foreach ($model->getFirstErrors() as $error) {
                        $errorMessage .= "$error\n";
                    }
                    $items['files'] = [
                        ['error' => $errorMessage]
                    ];
                }
            }
        } catch (Exception $e) {
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
}
