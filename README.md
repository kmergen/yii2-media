# Yii 2 Media

Yii2 extension to provide media file management with model fileupload
Uploaded files managed all in a database table.

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

Run `$ yii migrate --migrationPath=@vendor/kmergen/yii2-media/migrations`

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

Now you can everywhere in your application e.g. get a thumb with "Yii::$app->imageOld->thumbOld('path/to/original/image', '$thumbStyle')".

### 4. Upload files with integrated dropzone widget

> Note: This extension is under development. Use it not in production.
