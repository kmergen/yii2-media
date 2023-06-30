<?php

/**
 * Image component provides an application wide access to images and on the
 * fly image manipulation e.g. thumbnail creation.
 */

namespace kmergen\media\components;

use Exception;
use Yii;
use yii\base\InvalidConfigException;
use yii\helpers\Url;

class image extends \yii\base\BaseObject
{

    /**
     * @var array The thumbnail styles configuration
     * [styles] The thumbnail style name as key and the configuration array as value.
     * The format is as follows: [width, height, quality, kmergen\media\Image::function, the fourth parameter are the $args of the function
     */
    public $thumbStyles = [
        'small' => [80, 60, 80, 'thumbnail', [0x00000001]],
        'medium' => [100, 75, 80, 'thumbnail', [0x00000001]],
        'large' => [400, 300, 80, 'thumbnail', [0x00000001]],
        'small_outbound' => [80, 60, 80, 'thumbnail', [0x00000002]],
        'medium_outbound' => [100, 75, 80, 'thumbnail', [0x00000002]],
        'large_outbound' => [400, 300, 80, 'thumbnail', [0x00000002]],
        'small_crop_center' => [80, 80, 80, 'cropCenter', []],
        'medium_crop_center' => [200, 200, 80, 'cropCenter', []],
        'large_crop_center' => [400, 400, 80, 'cropCenter', []],
        'small_blur' => [80, 60, 80, 'blurThumbnail', []],
        'medium_blur' => [320, 240, 80, 'blurThumbnail', []],
        'large_blur' => [560, 420, 80, 'blurThumbnail', []],
    ];

    /**
     * Return the thumb url for a given original image and create and save the thumbnail
     * @param string $url The $url from the original image. It can be a relative url e.g. '/images/bild.jpg' or an absolute url e.g. 'http://frondend.dev/images/bild.jpg
     * @param string|array $config That can be a key from [[thumStyles]] or a thumbnail configuration array. The format must be the same as the value from [[thumbStyles]]
     * @param boolean $absoluteUrl Should the return url absolute or relative. Default to absolute.
     * @param boolean $force Create thumbnail though it exists
     *
     */
    public function thumb($url, $config, $absoluteUrl = true, $force = false)
    {
        if (is_string($config)) {
            if (!array_key_exists($config, $this->thumbStyles)) {
                throw new InvalidConfigException(sprintf('The thumb style %s does not exist.', $config));
            }
        } else {
            $this->resolveConfig($config);
        }
        return $this->createThumb($url, $config, $absoluteUrl, $force);
    }

    /**
     * Resolve the thumb configuration
     *
     * @param string|array $config The thumb configuration.
     */
    protected function resolveConfig($config)
    {
        if (isset($config[0])) {
            if (!is_int($config[0]) || $config[0] < 1) {
                throw new Exception('Width should be an integer and equal or greater than 1.');
            }
        } else {
            throw new InvalidConfigException('Width is not defined.');
        }

        if (isset($config[1])) {
            if (!is_int($config[1]) || $config[1] < 1) {
                throw new Exception('Height should be an integer and equal or greater than 1.');
            }
        } else {
            throw new InvalidConfigException('Height is not defined.');
        }

        if (isset($config[2])) {
            if (!is_int($config[2]) || $config[2] < 1) {
                throw new Exception('Qualtity should be an integer and equal or greater than 1.');
            }
        }

        if (isset($config[3])) {
            $imagineFunctions = ['thumbnail', 'cropCenter', 'blurThumbnail'];
            if (!in_array($config[3], $imagineFunctions)) {
                throw new Exception('You can only choose: "' . implode(',', $imagineFunctions) . '"');
            }
        }
    }

    /**
     * Creates a thumbnail and save it to the given url. This function is called from [[thumb]] function
     * @param string $image The url to the original image file
     * @param array $config A thumbnail configuration array or a [[thumbStyle]]
     * @param boolean $absoluteUrl Should the return url absolute or relative. Default to absolute.
     * @param boolean $force Create thumbnail though it exists
     * @return string thumbnail path (Create absolute or relative Url in application)
     */
    protected
    function createThumb($image, $config, bool $absoluteUrl, $force)
    {
        if (is_string($config)) {
            $config = $this->thumbStyles[$config];
        }
        $suffix = '_' . $config[0] . 'x' . $config[1];

        $info = !Url::isRelative($image) ? pathinfo(parse_url($image, PHP_URL_PATH)) : pathinfo($image);

        $dirname = ltrim($info['dirname'], '/\\');
        $thumbPath = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR . $dirname;
        $thumbName = $info['filename'] . $suffix . '.' . $info['extension'];

        if (!file_exists($thumbPath . DIRECTORY_SEPARATOR . $thumbName) || $force) {
            //Create and save the thumbnail
            $image = "@webroot/$image"; // Please note that the path is without the webroot e.g. images/ad/photo_1.jpg, because we don't check it.
            [$width, $height, $quality, $func, $args] = $config;
            $funcArgs = array_merge([$image, $width, $height], $args);

            try {
                $thumbnail = \call_user_func_array(['kmergen\media\helpers\Image', $func], $funcArgs);
                $thumbnail->save($thumbPath . DIRECTORY_SEPARATOR . $thumbName, ['quality' => $quality]);
            } catch (Exception $ex) {
                Yii::info('Imagine Exception: ' . $ex->getMessage() . ' in file ' . $ex->getFile() . ' on line ' . $ex->getLine() . '.');
                return null;
            }
        }
        $path = "$dirname/$thumbName";
        return $absoluteUrl ? Yii::$app->getUrlManager()->createAbsoluteUrl($path) : Yii::getAlias('@web') . "/$path";
    }

    /**
     * Delete all thumbs from a given image
     * You should use this function in conjunction with the [[deleteFile]] call function within a cron job.
     * @param string The url from the original file. This must be a relative url.
     */
    public
    function deleteThumbs($url)
    {
        if (!Url::isRelative($url)) {
            //  throw new \http\Exception\InvalidArgumentException('Url must be relative');
        }
        $info = pathinfo($url);
        $webroot = Yii::getAlias('@webroot');
        $thumbStyles = array_keys($this->thumbStyles);

        //Delete thumbnails
        //$pattern = $info['filename'] . '_[1-9]{1}[0-9]*x{1}[1-9]{1}[0-9]*\.(jpg|jpeg|gif|png)';
        $pattern = $info['filename'] . '_*x*.*';

        $files = glob($webroot . DIRECTORY_SEPARATOR . $info['dirname'] . DIRECTORY_SEPARATOR . $pattern);
        foreach ($files as $file) {
            @unlink($file);
        }
        return $files;
    }
}
