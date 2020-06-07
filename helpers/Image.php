<?php
/**
 * Image helper class.
 */

namespace kmergen\media\helpers;

use Yii;
use yii\helpers\Url;
use Imagine\Image\Box;
use Imagine\Image\Point;
use Imagine\Image\ManipulatorInterface;

class Image extends \yii\imagine\BaseImage
{

    /**
     * Creates a crop thumbnail
     * @param string $filename the image file path or path alias.
     * @param integer $resizeWidth the width to resize the original image in pixels
     * @param integer $resizeHeight the height to resize the original image in pixels
     * @param integer $cropWidth the crop width in pixels
     * @param integer $cropHeight the crop height in pixels
     * @param array $start The point coordinates
     * @return ImageInterface
     */
    public static function resizeCrop($filename, $resizeWidth, $resizeHeight, $cropWidth, $cropHeight, array $start = [0, 0])
    {
        return self::getImagine()->open(Yii::getAlias($filename))
                ->resize(new Box($resizeWidth, $resizeHeight))
                ->crop(new Point($start[0], $start[1]), new Box($cropWidth, $cropHeight));
    }

    /**
     * Creates a centered crop thumbnail
     * @param string $filename the image file path or path alias.
     * @param integer $targetWidth the width in pixels
     * @param integer $height the height in pixels
     * @return ImageInterface
     */
    public static function cropCenter($filename, $targetWidth, $targetHeight, array $start = [])
    {
        // Box is Imagine Box instance
        // Point is Imagine Point instance
        $target = new Box($targetWidth, $targetHeight);
        $targetWidth = $target->getWidth();
        $targetHeight = $target->getHeight();
        $originalImage = self::getImagine()->open(Yii::getAlias($filename));
        $orgSize = $originalImage->getSize();
        $orgWidth = $orgSize->getWidth();
        $orgHeight = $orgSize->getHeight();

        if ($orgWidth > $orgHeight) {
            // Landscaped.. We need to crop image by horizontally
            $w = $orgWidth * ( $targetHeight / $orgHeight );
            $h = $targetHeight;
            $cropBy = new Point(( max($w - $targetWidth, 0) ) / 2, 0);
        } else {
            // Portrait..
            $w = $targetWidth; // Use target box's width and crop vertically
            $h = $orgHeight * ( $targetWidth / $orgWidth );
            $cropBy = new Point(0, ( max($h - $targetHeight, 0) ) / 2);
        }

        $tempBox = new Box($w, $h);
        $img = $originalImage->thumbnail($tempBox, 'outbound');
        // Here is the magic..
        return $img->crop($cropBy, $target); // Return "ready to save" final image instance
    }

    /**
     * Creates a thumbnail width a blur background from the image and the image thumbnail centered.
     * This function can be used if you need a fixed box and want to fill the rest of the box with background.
     * The mode of the thumbnail is always `ImageInterface::THUMBNAIL_INSET`
     * @param string $filename the image file path or path alias.
     * @param integer $width the width in pixels
     * @param integer $height the height in pixels
     * @param integer $blur How strong should the background blurred.
     * @param string $color The color of the background in hex format
     * @param integer $alpha the opacity of the background from 0-100.
     * @param string the background color
     * @return ImageInterface
     */
    public static function blurBackgroundThumb($filename, $width, $height, $blur = 3, $color = '#FFF', $alpha = 100) {
        $path = $filename;
        if (Url::isRelative($path)) {
        $path = Yii::$app->getUrlManager()->createAbsoluteUrl($path); // Do this for Imagick that has his problems with relative paths.
        }

        $bg = static::resize($path, $width, $height);
        $bg->effects()->blur($blur);

        static::$thumbnailBackgroundColor = $color;
        static::$thumbnailBackgroundAlpha = $alpha;
        $image = static::thumbnail($path, $width, $height, ManipulatorInterface::THUMBNAIL_INSET);
        $bg->paste($image, new Point(0, 0));
        return $bg;
    }

}
