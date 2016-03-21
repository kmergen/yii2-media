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
In your modules configuration:
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

> Note: This extension is under development. Use it not in production.

