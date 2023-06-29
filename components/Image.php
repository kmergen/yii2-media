<?php

/**
 * Image component provides an application wide access to images and on the
 * fly image manipulation e.g. thumbnail creation.
 */

namespace kmergen\media\components;

use Exception;
use yii\base\InvalidArgumentException;
use yii\helpers\Url;
use yii\helpers\FileHelper;
use kmergen\media\helpers\Image as ImageHelper;
use yii\base\InvalidConfigException;
use yii\web\NotFoundHttpException;
use Yii;
use \Imagick;

class Image extends \yii\base\BaseObject
{
    /**
     * @var array The allowed variant names.
     */
    public $variantNames = ['thumbCompositeBlur'];

    /**
     * @var array The thumbnail presets
     * As key name you can choose every name you want which is a allowed php array key name.
     * The value format is as follows:
     * The string is comma separated.
     * The first string is the name of a function in kmergen\media\helpers\Image.
     * The further strings are the arguments of this function.
     */
    public $thumbPresets = [
        'thumbCompositeBlur_xs' => 'thumbCompositeBlur,80,60,60,6',
        'thumbCompositeBlur_s' => 'thumbCompositeBlur,100,75,60,6',
        'thumbCompositeBlur_m' => 'thumbCompositeBlur,320,240,60,6',
        'thumbCompositeBlur_l' => 'thumbCompositeBlur,560,420,60,6',
    ];

    /**
     * Helper function for createVariant(). This function only returns the variants url.
     * Params are the same as in createVariant().
     * @see kmergen\media\components\Image::createVariant 
     * @return string url
     */
    public function thumb($imageRef, $variant, $absoluteUrl = true, $force = false, $target = null)
    {
        $thumb = $this->createVariant($imageRef, $variant, $absoluteUrl, $force, $target);
        return $thumb['url'] ?? null;
    }

    /**
     * Return the thumb url for a given original image and create and save the thumbnail
     * @param string $imageRef The $url from the original image. It can be a relative url e.g. 'images/bild.jpg' or an absolute url e.g. 'http://frondend.dev/images/bild.jpg
     * @param string|array $variant That can be a key from [[$thumbPresets]] or a variant configuration string. The format must be the same as the value from [[thumbPresets]]
     * @param boolean $absoluteUrl Should the return url absolute or relative. Default to absolute.
     * @param boolean $force Create thumbnail though it exists
     * @param null|string $target create the url for annother target dirname than that from imageRef.
     *
     */
    public function createVariant($imageRef, $variant, $absoluteUrl = true, $force = false, $target = null)
    {
        $variant = $this->thumbPresets[$variant] ?? $variant;

        $funcArgs = explode(',', $variant);
        $variantName = array_shift($funcArgs);

        $this->resolve($variantName, $funcArgs);

        $pathInfo = !Url::isRelative($imageRef) ? pathinfo(parse_url($imageRef, PHP_URL_PATH)) : pathinfo($imageRef);
        // $path  = parse_url($imageRef, PHP_URL_PATH);
        // $parts = pathinfo($path);
        $dirname = ltrim($pathInfo['dirname'], '/\\');
        $refDir = Yii::getAlias('@webroot') . '/' . $dirname;
        $refPath = FileHelper::normalizePath($refDir . '/' . $pathInfo['basename']);


        if (!file_exists($refPath)) {
            Yii::info('Ref Image not exists', __METHOD__);
            // We not return the function here. If the variant exists the thumbnail url will returned.
            // If not we catch it, because Imagick will then throw an Exception.
        }

        if ($variantName === 'thumbCompositeBlur') {
            [$width, $height, $quality, $sigma] = $funcArgs;
        } elseif ($variantName === 'resizeImage') {
            [$width, $height, $bestfit, $fill, $quality] = $funcArgs;
        }

        // Check if the variant already exists
        $strVariantValues = implode('_', $funcArgs);
        $variantDir = "$refDir/$variantName/$strVariantValues";
        $variantPath = Filehelper::normalizePath("$variantDir/" . $pathInfo['basename']);

        if (!file_exists($variantPath) || $force) {
            FileHelper::createDirectory($variantDir);
            try {
                $img = new Imagick($refPath);
                array_unshift($funcArgs, $img);
                $img = \call_user_func_array(['kmergen\media\helpers\Image', $variantName], $funcArgs);
                $img->writeImage($variantPath);
            } catch (Exception $e) {
                Yii::info('Imagick Exception: ' . $e->getMessage(), __METHOD__);
                return null;
            }
        }

        if ($target === null) {
            $target = $dirname;
        }

        $url = "$target/$variantName/$strVariantValues/{$pathInfo['basename']}";
        return [
            'name' => $variantName . '_' . $strVariantValues,
            'url' => $absoluteUrl ?
                Yii::$app->getUrlManager()->createAbsoluteUrl($url) : Yii::getAlias('@web') . "/$url"
        ];
    }

    /**
     * Check the variant configuration
     *
     * @param string $variantName The name of the variant.
     * @param array $variantArgs The function arguments of the variant.
     *  At the moment we check only the the variant name
     * @todo . Check also the function args of the specified variant e.g. height, width, quality etc.
     */
    protected function resolve($variantName, $variantArgs)
    {
        if (!in_array($variantName, $this->variantNames)) {
            throw new InvalidConfigException("$variantName is not a valid variant name");
        }
    }

    
}
