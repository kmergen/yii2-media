<?php
/*
 * This file is part of the yii2-media project.
 *
 * (c) Yii2-media project <http://github.com/kmergen/yii2-media/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace kmergen\media;

use yii\base\BootstrapInterface;
use yii\i18n\PhpMessageSource;

/**
 * Bootstrap class registers media module and image application component. It also implement the translation for the module also for the fileupload
 * widgets.
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class Bootstrap implements BootstrapInterface
{

    /** @inheritdoc */
    public function bootstrap($app)
    {
        if ($app->hasModule('media') && ($module = $app->getModule('media')) instanceof Module) {

            $app->get('i18n')->translations['media*'] = [
                'class' => PhpMessageSource::class,
                'basePath' => __DIR__ . '/messages',
            ];
        }
    }

}
