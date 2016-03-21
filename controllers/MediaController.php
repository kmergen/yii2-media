<?php

namespace kmergen\media\controllers;

use Yii;
use kmergen\media\models\Media;
use kmergen\media\models\MediaSearch;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\UploadedFile;
use yii\helpers\Url;

/**
 * MediaController implements the CRUD actions for Media model.
 */
class MediaController extends Controller
{

    /** @inheritdoc */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                    'upload' => ['POST'], //Do this to prevent a direct call from the browser. We can not choose ajaxOnly because the upload process is not a real ajax request.
                    'upload-delete' => ['POST'],
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
                        'deleteUrl' => Url::to(['/media/upload-delete', 'id' => $model->id]),
                        'deleteType' => 'POST',
                        'status' => $model->status,
                        'type' => $model->type
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
        } catch (\Exception $e) {
            $items['files'] = [
                ['error' => $e->getMessage()]
            ];
        }

        return $items;
    }

    public function actionUploadDelete($id)
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
     * Creates a new Media model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Media();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('create', [
                    'model' => $model,
            ]);
        }
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

}
