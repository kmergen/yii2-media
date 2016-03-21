<?php
/**
 * @copyright Copyright (c) Klaus Mergen
 * @license http://opensource.org/licenses/BSD-3-Clause
 */

namespace kmergen\media\widgets\fileupload;

use Yii;
use yii\base\Widget;
use yii\base\InvalidConfigException;
use yii\helpers\Url;

/**
 * Base Upload widget
 *
 * Base fileUpload widget.
 * Use this class not directly but extend your fileUpload widgets from this class
 * @see https://github.com/blueimp/jQuery-File-Upload
 *
 * @author Klaus Mergen <kmergenweb@gmail.com>
 */
class BaseUpload extends Widget
{

    /**
     * @var array The html options for the upload wrapper div tag
     */
    public $options = ['class' => 'fileupload-wrapper'];

    /**
     * @var string The name of the file input element
     */
    public $fileInputName = 'mediaUploadFile';

    /**
     * @var array The html options for the file input element
     */
    public $fileInputOptions = [];

    /**
     * @var string|array upload route. Here you can set optional parameters to handle the request in the controller.
     */
    public $url = ['/media/upload/upload'];

    /**
     * @var array the plugin options. For more information see the jQuery File Upload options documentation.
     * @see https://github.com/blueimp/jQuery-File-Upload/wiki/Options
     */
    public $clientOptions = [];

    /**
     * @var array the event handlers for the jQuery File Upload plugin.
     * Please refer to the jQuery File Upload plugin web page for possible options.
     * @see https://github.com/blueimp/jQuery-File-Upload/wiki/Options#callback-options
     */
    public $clientEvents = [];

    /**
     * @inheritdoc
     * @throws \yii\base\InvalidConfigException
     */
    public function init()
    {
        parent::init();

        if (empty($this->url)) {
            throw new InvalidConfigException('"url" cannot be empty.');
        }

        $this->clientOptions['url'] = Url::to($this->url);
        
        if (empty($this->fileInputOptions['id'])) {
            $this->fileInputOptions['id'] = $this->id;
        }
    }

}
