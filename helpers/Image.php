<?php
/**
 * Image helper class.
 */

namespace kmergen\media\helpers;

use Imagine\Image\Box;
use Imagine\Image\BoxInterface;
use Imagine\Image\ImageInterface;
use Imagine\Image\ManipulatorInterface;
use Imagine\Image\Point;
use Imagine\Image\Palette\RGB;
use Yii;

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
            $w = $orgWidth * ($targetHeight / $orgHeight);
            $h = $targetHeight;
            $cropBy = new Point((max($w - $targetWidth, 0)) / 2, 0);
        } else {
            // Portrait..
            $w = $targetWidth; // Use target box's width and crop vertically
            $h = $orgHeight * ($targetWidth / $orgWidth);
            $cropBy = new Point(0, (max($h - $targetHeight, 0)) / 2);
        }

        $tempBox = new Box($w, $h);
        $img = $originalImage->thumbnail($tempBox, 'outbound');
        // Here is the magic..
        return $img->crop($cropBy, $target); // Return "ready to save" final image instance
    }

    /**
     * Creates a thumbnail width a blur background from the image and the image thumbnail centered.
     * This function can be used if you need a fixed box and want to fill the rest of the box with background.
     * If the source image has the same ratio as the thumbnail and the source image is not smaller as  the thumbnail
     * only the thumbnail will returned.
     * The mode of the thumbnail is always `ImageInterface::THUMBNAIL_INSET`
     * @param string $image the image file path or path alias.
     * @param integer $width the width in pixels
     * @param integer $height the height in pixels
     * @param integer $blur How strong should the background blurred.
     * @param string $color The color of the background overlay in hex format
     * @param integer $alpha the opacity of the background overlay from 0-100.
     * @return ImageInterface
     */
    public static function blurThumbnail($image, $width, $height, $blur = 5, $color = '#000', $alpha = 10)
    {
        $img = self::ensureImageInterfaceInstance($image);

        $thumbnailBox = new Box($width, $height);
        $thumbnail = $img->thumbnail($thumbnailBox, ImageInterface::THUMBNAIL_INSET);
        $size = $thumbnail->getSize();
        if ($size->getWidth() < $width || $size->getHeight() < $height) {
            $palette = new RGB();
            // create empty image to preserve aspect ratio of thumbnail
            $bgColor = $palette->color($color, $alpha);
            $bgOverlay = static::getImagine()->create($thumbnailBox, $bgColor);
            $bg = $img->resize($thumbnailBox);
            $bg->paste($bgOverlay, new Point(0,0));
            $bg->effects()->blur($blur);
            // Get the sizes
            $size = $thumbnail->getSize();
            $startX = ($width - $size->getWidth()) / 2;
            $startY = ($height - $size->getHeight()) / 2;
            $bg->paste($thumbnail, new Point($startX, $startY));
            return $bg;
        } else {
            return $thumbnail;
        }
    }

}
