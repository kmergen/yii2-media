<?php

namespace kmergen\media\controllers;

use Yii;
use kmergen\media\models\Media;
use kmergen\media\models\MediaSearch;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

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
     * Lists all Media models.
     * @return mixed
     */
    public function actionIndex()
    {
       
    }

}
