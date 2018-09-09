<?php

namespace kmergen\media\controllers;

use Yii;
use yii\base\InvalidConfigException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * DropzoneController provide the actions for uploading files to the server
 * and save them as Media model and delete this files from the server.
 *
 * If you need more control over the upload or deletion you can also use your own controller to handle
 * the upload and delete actions. Therefore you can use [[\kmergen\media\traits\DropzoneUploadTrait]] in your controller.
 */
class DropzoneController extends Controller
{
    use \kmergen\media\traits\DropzoneUploadTrait;

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
     * @inheritdoc
     * @return string JSON will return with uploaded file information or if upload failed an error message.
     */
    public function actionUpload()
    {
        $params = Yii::$app->getRequest()->post();

        if (!isset($params['targetUrl'])) {
            throw new InvalidConfigException('TargetUrl is required.');
        }

        $vars = get_class_vars('kmergen\media\traits\DropzoneUploadTrait');

        foreach ($vars as $key => $value) {
            if (isset($params[$key])) {
                $this->$key = $params[$key];
            }
        }

        try {
            $this->saveUploadedMediaFile();
            $items = $this->responseItems;
        } catch (\yii\base\Exception $e) {
            $items['error'] = $e->getMessage();
        }

        return $items;
    }


    /**
     * Handle file deletion when clicking on dropzone remove link
     * @return mixed
     */
    public function actionDelete()
    {
        try {
            $id = $_POST['id'];
            $this->deleteUploadedFile($id);
            $items = $this->responseItems;
        } catch (\Exception $e) {
            $items['files'][]['error'] = $e->getMessage();
        }
        return $items;
    }

}
