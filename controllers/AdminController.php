<?php

namespace kmergen\media\controllers;

use Yii;
use kmergen\media\models\ThumbResetForm;
use kmergen\media\models\Media;
use kmergen\media\models\MediaSearch;
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
     * Renders the index view for the module
     * @return string
     */
    public function actionMediaUpload()
    {
        $model = new Media();
        $model->loadDefaultValues();

        return $this->render('media-upload', ['model' => $model]);
    }

    /**
     * Lists all Media models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new MediaSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * List all file ids they have no existing file in path
     * @return string
     */
    public function actionNoExistingFiles()
    {
        $files = Media::find()->asArray()->all();
        $webroot = Yii::getAlias('@webroot');
        $notExistingFiles = [];
        foreach ($files as $r) {
            $path = $webroot . DIRECTORY_SEPARATOR . $r['url'];
            if (!\file_exists($path)) {
                $notExistingFiles[] = $r['id'];
            }
        }

        $count = count($notExistingFiles);
        if ($count > 0) {
            $i = 0;
            $content = 'The following ' . $count . ' files not exist in filepath:<br>';
            foreach ($notExistingFiles as $fileId) {
                if ($i >= 20) {
                    $content .= '<br>';
                    $i = 0;
                }
                $content .= $fileId . ',';
                $i++;
            }
            $content = \rtrim($content, ',');
        } else {
            $content = 'All files exists in file path';
        }

        return $this->renderAjax('_alert', [
            'content' => $content,
        ]);
    }

    /**
     * Displays a single Media model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Updates an existing Media model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Media model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Media model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Media the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Media::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
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
