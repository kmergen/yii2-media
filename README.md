# Yii 2 Media
Yii2 extension to provide media file management with model fileupload

The preferred way to install this extension is through [composer](https://getcomposer.org/).

Either run

```bash
composer require "kmergen/yii2-media: "*"
```

or add

```
"kmergen/yii2-media": "*",
```

to the `require` section of your `composer.json` file.

## Installation

### 1. Run Migrations
Run `$ yii migrate migrationPath=@vendor/kmergen/yii2-media/migrations`

### 2. Configuration
In your configuration file set the following:
```php
'bootstrap' => [
    'kmergen\media\Bootstrap',
    ...
],
'modules' => [
    'media' => [
        'class' => 'kmergen\media\Module'
    ],
    ...
]
```

### 3. Image component
```php
'components' => [
    'image' => [
        'class' => 'kmergen\media\components\Image'
    ],
    ...
]
```
Now you can everywhere in your application e.g. get a thumb with "Yii::$app->image->thumb('path/to/original/image', '$thumbStyle')".


### 4. Different layouts
If you you want to switch between different layouts
e.g. in basic-template between a default and an admin layout you can do it as follows:

```php
'modules' => [
    'media' => [
        'class' => 'kmergen\media\Module',
        'on beforeAction' => function ($event) {
            if ($event->action->controller->id === 'admin') {
                if (Yii::$app->user->can('admin')) {
                    $event->sender->module->layoutPath = 'path/to/your/layout';
                    return true;
                } else {
                    return false;
                }
            }
        },
    ],
    ...
]
```
For theming views see [Yii2 Theming](http://www.yiiframework.com/doc-2.0/guide-output-theming.html)


> Note: This extension is under development. Use it not in production.

