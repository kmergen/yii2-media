<?php

namespace kmergen\media\controllers;

use Yii;
use kmergen\media\models\ThumbResetForm;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * AdminController implements the actions that can only called if user has admin rights.
 */
class AdminController extends Controller
{

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    /**
     * Reset(delete) thumbnails
     * @return void
     */
    public function actionThumbReset()
    {
        $model = new ThumbResetForm();
        $request = Yii::$app->getRequest();

        if (Yii::$app->request->isAjax && $model->load($request->post())) {
            Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
            return \yii\bootstrap\ActiveForm::validate($model);
        }


        if ($model->load($request->post())) {
            $preview = (array_key_exists('resetRun-button', $request->post())) ? false : true;
            if ($model->resetThumbs($preview)) {
                
            }
            return $this->render('thumbReset', [
                    'model' => $model
            ]);
        } else {
            return $this->render('thumbReset', [
                    'model' => $model
            ]);
        }
    }

}
