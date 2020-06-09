<?php
/**
 * Image component provides an application wide access to images and on the
 * fly image manipulation e.g. thumbnail creation.
 */

namespace kmergen\media\components;

use Exception;
use Yii;
use yii\base\InvalidConfigException;
use yii\helpers\FileHelper;
use yii\helpers\Url;

class Image extends \yii\base\BaseObject
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
        'medium_blur' => [100, 75, 80, 'blurThumbnail', []],
        'large_blur' => [400, 300, 80, 'blurThumbnail', []],
    ];

    /**
     * @var string The name of the thumbs directory.
     * This directory name is relative to the original image path e.g original image images/image_1.jpg than the thumb was images/thumbs/image_1.jpg
     */
    public $thumbDirectory = 'thumbs';

    /**
     * @var boolean
     * If true the thumb will created in an extra subdirectory under the [[thumbDirectoryName]] with the given thumbStyle.
     * If false the thumbnail will save under the [[thumbDirectory]] directory with the suffix of the keys from [[thumbStyles]] e.g images/thumbs/image_small.jpg or if it is a configuration with the width and height. e.g images/image_100x75.jpg
     */
    public $thumbExtraDirectory = true;

    /**
     * @var array A set of Placeholder images.
     * You can use:
     *  1. A placeholder provider to get a placeholder image. Use it in the following format: 'http://placehold.it/{width}x{height}'
     *  2. A local image from your public web directory e.g. 'images/bild1.jpg'
     *  To create a thumbnail or if you use a placeholder provider you should use [[placeholder()]].
     */
    public $placeholder = [
        'default' => '//placehold.it/{width}x{height}',
        'profile' => '//placehold.it/{width}x{height}',
        //'example' => 'https://placeimg.com/{width}/{height}/any',
        //'animal' => 'https://placeimg.com/{width}/{height}/animals',
        //'animal_grayscale' => 'https://placeimg.com/{width}/{height}/animals/grayscale',
        //'architecture' => 'https://placeimg.com/{width}/{height}/arch',
        //ipsum_placeholder => 'https://ipsumimage.appspot.com/{width}x{height},ff7700.png?l=Das ist nur ein Platzhalter'
    ];

    /**
     * Return the thumb url for a given original image and create and save the thumbnail
     * @param string $url The $url from the original image. It can be a relative url e.g. '/images/bild.jpg' or an absolute url e.g. 'http://frondend.dev/images/bild.jpg
     * @param string|array $config That can be a key from [[thumStyles]] or a thumbnail configuration array. The format must be the same as the value from [[thumbStyles]]
     * @param boolean $force Create thumbnail though it exists
     *
     */
    public function thumb($url, $config, $force = false)
    {
        if (is_string($config)) {
            if (!array_key_exists($config, $this->thumbStyles)) {
                throw new InvalidConfigException(sprintf('The thumb style %s does not exist.', $config));
            }
        } else {
            $this->resolveConfig($config);
        }
        return $this->createThumb($url, $config, $force);
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
     * A placeholder for an image.
     * @param string $name string The placeholder name. Defined in [[placeholder]].
     * @param string $config string A [[thumbStyles]] or a configuration array.
     */
    public
    function placeholder($name = 'default', $config = null)
    {
        if (array_key_exists($name, $this->placeholder)) {
            if (strpos($this->placeholder[$name], '{width}')) { //Check if it is a placeholder provider
                if ($config === null) {
                    throw new InvalidConfigException('As second parameter you must set either a configuration array or a thumbstyle');
                } else {
                    if (is_string($config)) {
                        $config = $this->thumbStyles[$config];
                    } else {
                        $this->resolveConfig($config);
                    }
                    return strtr($this->placeholder[$name], ['{width}' => $config[0], '{height}' => $config[1]]);
                }
            } elseif ($config === null) {
                return Url::isRelative($this->placeholder[$name]) ? Yii::getAlias('@web') . '/' . $this->placeholder[$name] : $this->placeholder[$name];
            } else {
                return $this->thumb($this->placeholder[$name], $config);
            }
        } else {
            throw new InvalidConfigException(sprintf('The placeholder name %s does not exist.', $name));
        }
    }

    /**
     * Creates a thumbnail and save it to the given url. This function is called from [[thumb]] function
     * @param string $url The url to the original image file
     * @param array $config A thumbnail configuration array or a [[thumbStyle]]
     * @param boolean $force Create thumbnail though it exists
     * @return The thumbnail url
     */
    protected
    function createThumb($url, $config, $force)
    {
        if (is_string($config)) {
            if ($this->thumbExtraDirectory === true) {
                $thumbDirectory = $this->thumbDirectory . DIRECTORY_SEPARATOR . $config;
                $suffix = '';
            } else {
                $thumbDirectory = $this->thumbDirectory;
                $suffix = '_' . $config;
            }
            $config = $this->thumbStyles[$config];
        } elseif ($this->thumbExtraDirectory === false || isArray($config)) {
            $thumbDirectory = $this->thumbDirectory;
            $suffix = '_' . $config[0] . 'x' . $config[1];
        }

        $info = !Url::isRelative($url) ? pathinfo(parse_url($url, PHP_URL_PATH)) : pathinfo($url);

        $dirname = ltrim($info['dirname'], '/\\');
        $thumbPath = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR . $dirname . DIRECTORY_SEPARATOR . $thumbDirectory;
        $thumbName = $info['filename'] . $suffix . '.' . $info['extension'];

        if (!file_exists($thumbPath . DIRECTORY_SEPARATOR . $thumbName) || $force) {
            if (!$suffix) {
                FileHelper::createDirectory($thumbPath, 0766);
            }

            //Create and save the thumbnail
            [$width, $height, $quality, $func, $param1] = $config;
            if (Url::isRelative($url)) {
                $url = Yii::$app->urlManager->createAbsoluteUrl($url); // Do this because Imagick has problems with relative Urls
            }

            try {
                // \yii\imagine\Image::$thumbnailBackgroundColor = '000';
                \kmergen\media\helpers\Image::$func($url, $width, $height, $param1)->save($thumbPath . DIRECTORY_SEPARATOR . $thumbName, ['quality' => $quality]);
                // \kmergen\media\helpers\Image::$func($url, $width, $height)->save($thumbPath . DIRECTORY_SEPARATOR . $thumbName, ['quality' => $quality]);
            } catch (Exception $ex) {
                if ($ex instanceof \Imagine\Exception\InvalidArgumentException) {
                    Yii::info('Imagine Invalid Argument Exception: ' . $ex->getMessage() . ' in file ' . $ex->getFile() . ' on line ' . $ex->getLine() . '.');
                } else {
                    Yii::info('Imagine Exception: ' . $ex->getMessage() . ' in file ' . $ex->getFile() . ' on line ' . $ex->getLine() . '.');
                }
                //  @todo if file not exists in path. At the moment we throw no Exception and don't manipulate the file nor set a placeholder.
                // Do this stuff on application side. To check the files with no file in path use the filter in media/admin/index to search this files.
                // throw new Exception($ex->getMessage());
            }
        }

        $thumbDirectory = str_replace('\\', '/', $thumbDirectory);
        return Yii::getAlias('@web') . '/' . $dirname . '/' . $thumbDirectory . '/' . $thumbName;
    }

    /**
     * Delete all thumbs from the thumbs directorys
     * You should use this function in conjunction with the [[deleteFile]] call function within a cron job.
     * @param string The url from the original file. This must be a relative url.
     */
    public
    function deleteThumbs($url)
    {
        if (!Url::isRelative($url)) {
            throw new \http\Exception\InvalidArgumentException('Url must be relative');
        }
        $info = pathinfo($url);
        $webroot = Yii::getAlias('@webroot');
        $thumbStyles = array_keys($this->thumbStyles);

        //Delete all files in the thumb styles directories
        foreach ($thumbStyles as $style) {
            $file = $webroot . DIRECTORY_SEPARATOR . $info['dirname'] . DIRECTORY_SEPARATOR . $this->thumbDirectory . DIRECTORY_SEPARATOR . $style . DIRECTORY_SEPARATOR . $info['basename'];
            @unlink($file);
        }

        //Delete the files in the thumbDirectory (default thumbs)
        //$pattern = $info['filename'] . '_[1-9]{1}[0-9]*x{1}[1-9]{1}[0-9]*\.(jpg|jpeg|gif|png)';
        $pattern = $info['filename'] . '_*x*.*';

        $files = glob($webroot . DIRECTORY_SEPARATOR . $info['dirname'] . DIRECTORY_SEPARATOR . $this->thumbDirectory . DIRECTORY_SEPARATOR . $pattern);
        foreach ($files as $file) {
            @unlink($file);
        }
        return $files;
    }
}
