<?php
/**
 * Image component provides an application wide access to images and on the
 * fly image manipulation.
 */

namespace app\components;

use Yii;
use yii\base\Exception;
use yii\base\InvalidConfigException;
use yii\helpers\FileHelper;

class Image extends \yii\base\Object
{

    /**
     * @var array The thumbnail styles configuration
     * [styles] The thumbnail style name as key and the configuration array as value.
     * The format is as follows: [width, height, quality]
     */
    public $thumbStyles = [
        'xsmall' => [60, 45, 80],
        'small' => [80, 60, 80],
        'medium' => [100, 75, 80],
        'large' => [140, 105, 80],
        'xlarge' => [200, 150, 80],
        'xsmall_crop' => [60, 60, 80],
        'small_crop' => [80, 80, 80],
        'medium_crop' => [100, 100, 80],
        'large_crop' => [140, 140, 80],
        'xlarge_crop' => [200, 200, 80]
    ];

    /**
     * @var string The name of the thumbs directory.
     * This directory name is relative to the original image path e.g original image images/image_1.jpg than the thumb was images/thumbs/image_1.jpg
     */
    public $thumbDirectory = 'thumbs';

    /**
     * @var boolean 
     * If true the thumb will created in an extra subdirectory under the [[thumbDirectoryName]] with the given thumbStyle.
     * If false the thumbnail will save under the [[thumbDirectory]] directory with the suffix of the keys width and height. e.g images/image_100x75.jpg
     */
    public $thumbExtraDirectory = true;

    /**
     * @var integer The default thumb quality
     */
    public $defaultQuality = 80;

    /**
     * @var array A set of Placeholder images.
     * The key is the placeholder name and the value is the placeholder url
     * To create a thumbnail from the placeholder image you can use [[placeholder()]].
     */
    public $placeholder = [
        'default' => 'images/placeholder/default.png',
        'profile' => 'images/placeholder/profile.png'
    ];

    /**
     * Return the thumb url for a given original image and create and save the thumbnail
     * @param string $url The $url from the original image it should be something like this 'images/bild.jpg'
     * @param string|array $config  That can be a thumbnail style name or a thumbnail configuration array 
     * 
     */
    public function thumb($url, $config)
    {
        if (is_array($config)) {
            $config = $this->resolveConfig($config);
        } else {
            if (!array_key_exists($config, $this->thumbStyles)) {
                throw new InvalidConfigException(sprintf('The thumb style %s does not exist.', $config));
            }
        }
        return $this->createThumb($url, $config);
    }

    /**
     * Resolve the thumb configuration
     * 
     * @param array $config The thumb configuration.
     */
    protected function resolveConfig($config)
    {
        if (isset($config[0])) {
            if (!is_int($config[0]) ||  $config[0] < 1) {
                throw new Exception('Width should be an integer and equal or greater than 1.');
            }
        } else {
            throw new InvalidConfigException('Width is not defined.');
        }

        if (isset($config[1])) {
            if (!is_int($config[1]) ||  $config[1] < 1) {
                throw new Exception('Height should be an integer and equal or greater than 1.');
            }
        } else {
            throw new InvalidConfigException('Height is not defined.');
        }
        
        if (isset($config[2])) {
            if (!is_int($config[2]) ||  $config[2] < 1) {
                throw new Exception('Qualtity should be an integer and equal or greater than 1.');
            }
        } else {
            $config[2] = $this->defaultQuality;
        }
        
        return $config;
    }

    /**
     * A placeholder for an image.
     * @param string $name string The placeholder name. Defined in [[placeholder]].
     * @param string $config string A [[thumbStyles]] or a configuration array.
     */
    public function placeholder($name = 'default', $config = null)
    {
        if (array_key_exists($name, $this->placeholder)) {
            return $this->thumb($this->placeholder[$name], $config);
        } else {
            throw new InvalidConfigException(sprintf('The placeholder name %s does not exist.', $name));
        }
    }

    /**
     * Creates a thumbnail and save it to the given url. This function is called from [[thumb]] function
     * @param string $url The url to the original image file 
     * @param array A thumbnail configuration array or a [[thumbStyle]]
     */
    protected function createThumb($url, $config)
    {
        if (is_string($config)) {
            if ($this->thumbExtraDirectory === true) {
                $thumbDirectory = $this->thumbDirectory . DIRECTORY_SEPARATOR . $config;
                $suffix = '';
            }
            $config = $this->thumbStyles[$config];
        } elseif ($this->thumbExtraDirectory === false || isArray($config)) {
            $thumbDirectory = $this->thumbDirectory;
            $suffix = '_' . $config[0] . 'x' . $config[1];
        }
       
        $url = ltrim($url, '/\\');       
        $info = pathinfo($url);
        $thumbName = $info['filename'] . $suffix . '.' . $info['extension'];
        $thumbPath = Yii::getAlias('@webroot') . DIRECTORY_SEPARATOR . $info['dirname'] . DIRECTORY_SEPARATOR . $thumbDirectory;

        if (!file_exists($thumbPath . DIRECTORY_SEPARATOR . $thumbName)) {

            if (!$suffix) {
                FileHelper::createDirectory($thumbPath, 0766);
            }

            //Create and save the thumbnail
            list($width, $height, $quality) = $config;

            $func = ($width === $height) ? 'cropCenter' : 'thumb';
            \yii\imagine\Image::$func($url, $width, $height)->save($thumbPath . DIRECTORY_SEPARATOR . $thumbName, ['quality' => $quality]);
        }

        $thumbDirectory = str_replace('\\', '/', $thumbDirectory);
        return Yii::getAlias('@web') . '/' . $info['dirname'] . '/' . $thumbDirectory . '/' . $thumbName;
    }

    /**
     * Delete all thumbs from the thumbs directorys
     * You should use this function in conjunction with the [[deleteFile]] call function within a cron job.
     * @param string The url from the original file.
     */
    public function deleteThumbs($url)
    {
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
