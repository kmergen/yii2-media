<?php

namespace kmergen\media\controllers;

use Yii;
use yii\web\MethodNotAllowedHttpException;
use kmergen\media\models\Media;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\UploadedFile;
use yii\helpers\FileHelper;
use yii\helpers\Json;
use yii\base\Exception;
use \Imagick;
use kmergen\media\helpers\Image;

/**
 * UploadController save the uploaded from dropzone widget and creates variants from the uploaded file.
 * and save them as Media model.
 */
class UploadController extends Controller
{
    public $enableCsrfValidation = false;

    /**
     * @var array An array of items to send within the response back to the client
     */
    public $responseData = [];

    /**
     * @var integer
     * @inheritdoc
     * If you provide a upload alongside a model the status for new uploaded files should be Media::STATUS_TEMP, because if you upload a file with status Media::STATUS_PERMANENT and
     * the user abort the form without submitting it then the files are without any reference to the model and useless stored in the media table.
     */
    public $status = Media::STATUS_TEMP;

    /**
     * @var array
     * The allowed filetypes that can uploaded If empty all filetypes are allowed.
     */
    public $allowedFileTypes = [];

    /**
     * @var boolean Check the orientation with reading exif data orientation and rotate the image if necessary.
     * You should do this in any case but you can set it to false if it is done on client or the user can rotate the image after upload.
     */
    public $fixOrientation = true;

    /**
     * @var string The web accessable url like e.g. "images". Do not prefix it with the "@web" alias.
     */
    public $targetUrl = 'media';

    /**
     * @var boolean unique the uploaded file with a unique id
     */
    public $generateUniqueFilename = false;

    /**
     * @var integer The quality of a new created image.
     * In imagick is that the imageCompression() function.
     * Possible values from 0 to 100; (higher is better quality)
     */
    public $imageQuality = 60;

    /**
     * @var integer Resize the orginal image to a maxWidth. If this is not set the image will saved in its original dimensions.
     */
    public $maxWidth;

    /**
     * @var array Create variants (e.g. thumbnails) of the original image.
     */
    public $variants = [];


    /**
     * Properties need to json decode
     */
    protected $needDecodingParams = ['variants', 'fixOrientation', 'allowedFileTypes'];

    /**
     * @var object The Media Model instance
     */
    private $model;


    /** @inheritdoc */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'index' => ['POST'], //Do this to prevent a direct call from the browser. We can not choose ajaxOnly because the upload process is not a real ajax request.
                ],
            ],
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                    ],
                ],
            ],
        ];
    }

    /**
     * Upload a file via ajax.
     * @return string JSON string will return with uploaded file information or if upload failed an error message.
     */
    public function actionIndex()
    {
        $request = Yii::$app->getRequest();

        if (!$request->isAjax) {
            throw new MethodNotAllowedHttpException();
        }

        try {
            // Check which file to proceed.
            $params = $request->post();
            // Nur zum Testen
            //$params['fileRef'] = 'media/test-create/Bild 001.jpg';


            $vars = get_class_vars('kmergen\media\controllers\UploadController');

            foreach ($vars as $key => $value) {
                if (isset($params[$key])) {
                    $this->$key = in_array($key, $this->needDecodingParams) ? Json::decode($params[$key]) : $params[$key];
                }
            }

            // Create media Model from uploaded file.
            $this->saveUploadedMediaFile();


            $this->responseData['success'] = 'Media created.';
        } catch (\Exception $e) {
            $this->responseData['error'] = $e->getMessage();
        }

        return $this->asJson($this->responseData);
    }

    protected function saveUploadedMediaFile()
    {
        $uploadedFile = UploadedFile::getInstanceByName('upfile');
        if ($uploadedFile->hasError) {
            throw new Exception('Fileupload Error: ' . $uploadedFile->error);
        }
        if (!in_array($uploadedFile->type, $this->allowedFileTypes)) {
            throw new Exception('Filetype not allowed');
        }

        $sanitizedBaseFileName = $this->sanitizeFileName($uploadedFile->getBaseName());
        $fileName = "$sanitizedBaseFileName." . $uploadedFile->getExtension();
        if ($this->generateUniqueFilename) {
            $uniqueID = $this->createUniqueId();
            $fileName = $sanitizedBaseFileName . "-$uniqueID." . $uploadedFile->getExtension();
        }

        $this->model = new Media();
        $this->model->name = $fileName;
        $this->model->type = $uploadedFile->type;
        $this->model->size = $uploadedFile->size;
        $this->model->status = $this->status;

        //We save the media model and the uploaded file
        if ($this->model->save()) {
            $this->model->updateAttributes(['url' => $this->targetUrl . '/' . $this->model->id . '/' . $fileName]);
            // Save the image to filesystem
            $this->saveToFileSystem($uploadedFile->tempName);
        } else {
            $errorMessage = '';
            foreach ($this->model->getFirstErrors() as $error) {
                $errorMessage .= "$error\n";
            }
            throw new Exception($errorMessage);
        }
    }


    protected function saveToFileSystem($sourceFile)
    {
        if (!class_exists('Imagick')) {
            Yii::error('Imagick class not exists.', __METHOD__);
            throw new Exception('Internal Error');
        }
        $img = new Imagick($sourceFile);

        if ($this->fixOrientation) {
            Image::autorotateImage($img);
            $img->stripImage(); // if you want to get rid of all EXIF data
        }
        if ($this->maxWidth) {
            $img = Image::resizeImage($img, $this->maxWidth, $this->maxWidth, true, true);
        }


        $model = $this->model;

        $targetFileDir = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR . $this->targetUrl . DIRECTORY_SEPARATOR . $this->model->id;
        FileHelper::createDirectory($targetFileDir);

        $img->setImageCompressionQuality($this->imageQuality);
        $fileRefUrl =  $model->url;
        $img->writeImage($targetFileDir . DIRECTORY_SEPARATOR . $model->name);
        $img->getImageBlob();
        $image1Size = $img->getImageLength();


        if ($model->type !== 'image/webp') {
            $img->setImageFormat('webp');
            $this->imageQuality = 30;
            $img->setImageCompressionQuality($this->imageQuality);
            $webpFileName = $this->getBaseName($model->name) . '.webp';
            $img->writeImage($targetFileDir . DIRECTORY_SEPARATOR . $webpFileName);
            $img->getImageBlob();
            if ($img->getImageLength() < $image1Size) {
                $fileRefUrl = $this->targetUrl . '/' . $model->id . '/' . $webpFileName;
            }
        }

        // Create the variants
        $variants = [];
        if (!empty($this->variants)) {
            $variantData = [];
            foreach ($this->variants as $variant) {
                $data = Yii::$app->image->createVariant(Yii::getAlias('@web') . "/$fileRefUrl", $variant);
                $variants[$data['name']] =  $data['url'];
            }
        }
        $this->responseData = [
            'id' => $model->id,
            'downloadUrl' => Yii::$app->urlManager->createAbsoluteUrl($fileRefUrl),
            'variants' => $variants,
            'isTemp' => $model->status == Media::STATUS_TEMP ? true : false,

        ];
    }

    /**
     * Sanitize the filename of the uploaded file.
     * @param string $name The fileBaseName without extension.
     * @return string The sanitized filename without extension.
     */
    protected function sanitizeFileName($name) {
        $arr = ['?','[',']','/','\\','=','<','>',':',';',',', "'",'"','&','$','#','*','(',')','|','~','`','!','{','}','%','+','’','«','»','”','“'];
               
        $name = str_replace( $arr, '', $name );
        $name = preg_replace( '/[\. _-]+/', '-', $name );
        $name = trim( $name, '-' );
        
        return $name; 
       }

    /**
     * @return string original file base name
     */
    protected function getBaseName($name)
    {
        // https://github.com/yiisoft/yii2/issues/11012
        $pathInfo = pathinfo('_' . $name, PATHINFO_FILENAME);
        return mb_substr($pathInfo, 1, mb_strlen($pathInfo, '8bit'), '8bit');
    }

    protected function createUniqueId()
    {
        return uniqid(mt_rand(100, 1000));
    }
}
