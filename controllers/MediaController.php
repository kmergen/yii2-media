<?php

namespace kmergen\media\controllers;

use Yii;
use kmergen\media\models\Media;
use kmergen\media\models\MediaSearch;
use kmergen\media\helpers\Image;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\web\BadRequestHttpException;
use yii\filters\VerbFilter;
use yii\web\Response;


/**
 * MediaController implements the CRUD actions for Media model.
 */
class MediaController extends Controller
{
    /**
     * {@inheritdoc}
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
        ];
    }


    /**
     * Open a form to set the alt attributes
     * @return mixed
     */
    public function actionAjaxAltUpdate($id)
    {
        $request = Yii::$app->getRequest();

        if (!$request->getIsAjax()) {
            throw new BadRequestHttpException();
        }
        $post = $request->post();
        $model = $this->findModel($id);

        if (isset($post['showLanguages'])) {
            if ($post['showLanguages'] === 'one') {
                $languages = (array)Yii::$app->language;
            } elseif ($post['showLanguages'] === 'all') {
                $urlManager = Yii::$app->getUrlManager();
                if ($urlManager->hasProperty('languages')) {
                    $languages = $urlManager->languages;
                } else {
                    (array)Yii::$app->language;
                }
            }
        }

        if ($model->load($post)) {
            $languages = $post['languages'];

            foreach ($request->post('MediaTranslation', []) as $language => $data) {
                foreach ($data as $attribute => $translation) {
                    $model->translate($language)->$attribute = $translation;
                }
            }

            if ($model->validate()) {
                if ($model->save()) {
                    $data['success'] = Yii::t('media', 'Changes successfully saved.');
                } else {
                    $data['error'] = Yii::t('media', 'Error! Cannot update changes');
                }
                return $this->asJson($data);
            }
        }
        $items = [];
        $items['content'] = $this->renderAjax('update_alt_form', [
            'model' => $model,
            'languages' => $languages
        ]);
        return $this->asJson($items);
    }

    /**
     * Open a form to rotate the image
     * Also it gives informations about the image
     * @return mixed
     */
    public function actionAjaxImageTools($id)
    {
        $request = Yii::$app->getRequest();

        if (!$request->getIsAjax()) {
            throw new BadRequestHttpException();
        }

        $post = $request->post();
        $model = $this->findModel($id);

        if (isset($post['image-rotate-deg'])) {
            try {
                $deg = (int)$post['image-rotate-deg'];
                if ($deg !== 0) {
                    $imagine = Image::getImagine();
                    $image = $imagine->open(Yii::getAlias('@webroot') . '/' . $model->url);
                    $image->rotate($deg)
                        ->save(Yii::getAlias('@webroot') . '/' . $model->url, ['jpeg_quality' => 100]);

                    // Delete all thumbnails of the image
                    Yii::$app->image->deleteThumbs($model->url);
                    // Create current thumbnail
                    Yii::$app->image->thumb($model->url, $post['thumbstyle'], true);
                    $data['refreshThumbnail'] = true;
                    $data['id'] = $id;
                }

                $data['success'] = Yii::t('media', 'Changes successfully saved.');
            } catch (\Exception $e) {
                $data['error'] = Yii::t('media', 'Error! Cannot update changes');
                if (YII_DEBUG) {
                    $data['error'] .= "\n" . $e->getMessage();
                }
            }
            return $this->asJson($data);
        }
        $items = [];
        $items['content'] = $this->renderAjax('image_tool_form', [
            'model' => $model,
            'thumbstyle' => $post['thumbstyle']
        ]);

        return $this->asJson($items);


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
     * @throws NotFoundHttpException if the model cannot be found
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
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Media model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update_form', [
            'model' => $model,
            'languages' => ['de']
        ]);
    }

    /**
     * Deletes an existing Media model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
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
        if (($model = Media::find()->where(['id' => $id])->with('translations')->one()) !== null) {
            return $model;
        }

        throw new NotFoundHttpException(Yii::t('media', 'The requested page does not exist.'));
    }
}
