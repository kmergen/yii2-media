<?php

/*
 * This file is part of the Yii2-media project
 *
 * (c) Klaus Mergen <http://github.com/kmergen>
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace kmergen\media\filters;

use yii\web\NotFoundHttpException;
use yii\base\ActionFilter;

/**
 * BackendFilter is used to allow access only to admin controller in backend when using Yii2-media with
 * Yii2 advanced template.
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class BackendFilter extends ActionFilter
{
    /**
     * @var array
     */
    public $controllers = [];

    /**
     * @param \yii\base\Action $action
     *
     * @return bool
     * @throws \yii\web\NotFoundHttpException
     */
    public function beforeAction($action)
    {
        if (in_array($action->controller->id, $this->controllers)) {
            throw new NotFoundHttpException('Not found');
        }

        return true;
    }
}
