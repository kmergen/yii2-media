<?php

namespace kmergen\media\helpers;

use Imagine\Image\Box;
use Imagine\Image\BoxInterface;
use Imagine\Image\ImageInterface;
use Imagine\Image\ManipulatorInterface;
use Imagine\Image\Point;
use Imagine\Image\Palette\RGB;
use Yii;

use \Imagick;

/**
 * Image provides a set of static methods for generating and manipulate images.
 * Therefore most of the time we use Imagick:
 *
 * @author Klaus Mergen
 * @since 2.0
 */
class Image extends \yii\imagine\BaseImage
{
    public static function resizeImage(Imagick $img, $width, $height = null, $bestFit = false, $fill = false, $quality = 60)
    {

        $img->setImageCompressionQuality($quality);
        $img->thumbnailImage($width, $height, $bestFit, $fill);
        // The same result you will get with this function
        // $img->resizeImage($this->maxWidth, null, Imagick::FILTER_LANCZOS, false);

        return $img;
    }
    /**
     * Set a blur background with an exact width and height of the same image that is then
     * composite to the background.
     * $img an Imagick image. This is the image from which we create the background and the foreground.
     * $width The fixed width of the image
     * $height The fixed width of the image
     * $quality The quality of the image, higher is better quality.
     * $sigma The strength of the blur. Values possible from 0 to 100. Higher is stronger blur.
     * $radius The radius of the blur. Radius 0 is the strongest blur effect.
     */
    public static function thumbCompositeBlur(Imagick $img, $width, $height, $quality = 62, $sigma = 6, $radius = 0)
    {
        $imgRatio = $img->getImageWidth() / $img->getImageHeight();
        if ($imgRatio === $width / $height) {
            // We need only the thumbnail without a blur background
            $img->setImageCompressionQuality($quality);
            $img->thumbnailImage($width, null);
            return $img;
        }
        // Otherwise we need a background to composite the image on top of it.
        $bgImg = clone $img;
        $bgImg->setImageCompressionQuality($quality); // This is the quality of the composite image. The setting on $img has no effect on the composite image.
        $bgImg->thumbnailImage(($width / 2), ($height / 2));
        $bgImg->blurImage($radius, $sigma);
        $bgImg->thumbnailImage(($width), ($height));
        //   return $bgImg;
        $img->setImageCompressionQuality($quality);
        $img->thumbnailImage($width, $height, true);
        //  return $img;
        $startX = ($width - $img->getImageWidth()) / 2;
        $startY = ($height - $img->getImageHeight()) / 2;

        $bgImg->compositeImage($img, Imagick::COMPOSITE_ATOP, $startX, $startY);
        return $bgImg;
    }

   

    public static function autorotateImage(Imagick $image)
    {
        switch ($image->getImageOrientation()) {
            case Imagick::ORIENTATION_TOPLEFT:
                break;
            case Imagick::ORIENTATION_TOPRIGHT:
                $image->flopImage();
                break;
            case Imagick::ORIENTATION_BOTTOMRIGHT:
                $image->rotateImage("#000", 180);
                break;
            case Imagick::ORIENTATION_BOTTOMLEFT:
                $image->flopImage();
                $image->rotateImage("#000", 180);
                break;
            case Imagick::ORIENTATION_LEFTTOP:
                $image->flopImage();
                $image->rotateImage("#000", -90);
                break;
            case Imagick::ORIENTATION_RIGHTTOP:
                $image->rotateImage("#000", 90);
                break;
            case Imagick::ORIENTATION_RIGHTBOTTOM:
                $image->flopImage();
                $image->rotateImage("#000", 90);
                break;
            case Imagick::ORIENTATION_LEFTBOTTOM:
                $image->rotateImage("#000", -90);
                break;
            default: // Invalid orientation
                break;
        }
        $image->setImageOrientation(Imagick::ORIENTATION_TOPLEFT);
    }

   // Here begins the old functions

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
