<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
    <tr class="template-download" data-id="{%=file.id%}" data-name="{%=file.name%}" data-size="{%=file.size%}" data-url="{%=file.url%}" data-type="{%=file.type%}" data-status="{%=file.status%}">
        <td>
            <span class="preview">
                {% if (file.thumbnailUrl) { %}
                    <a href="/{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>
                {% } %}
            </span>
        </td>
        <td>
            <p class="name">
                {% if (file.url) { %}
                    <a href="/{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
                {% } else { %}
                    <span>{%=file.name%}</span>
                {% } %}
            </p>
            {% if (file.error) { %}
                <div><span class="label label-danger"><?= Yii::t('media', 'Error') ?></span> {%=file.error%}</div>
            {% } %}
        </td>
        <td>
            <span class="size">{%=o.formatFileSize(file.size)%}</span>
        </td>
        <td>
            {% if (file.deleteUrl) { %}
                <button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='{"withCredentials":true}'{% } %}>
                    <i class="glyphicon glyphicon-trash"></i>
                    <span><?= Yii::t('media', 'Delete') ?></span>
                </button>
                {% if (o.options.autoUpload === false) { %}
                    <input type="checkbox" name="delete" value="1" class="toggle">
                {% } %}
            {% } else { %}
                <button class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span><?= Yii::t('media', 'Cancel') ?></span>
                </button>
            {% } %}
        </td>
        <td>
           <span class="toggle-translation"><i class="fas fa-arrow-down" aria-hidden="true"></i>Translate<span>
        </td>
    </tr>
    <tr class=" template-translation hidden-xl-down processing">
        <td colspan="5">
            {% if (file.translations) { %}
                {% for (var i = 0, lang = o.languages, len = lang.length; i < len; i++) { %}
                    {%
                       var valueAlt="", valueTitle="";
                       if  (typeof file.translations[lang[i]] !== 'undefined') {
                           valueAlt = file.translations[lang[i]].alt;
                           valueTitle = file.translations[lang[i]].title;
                       }
                    %}
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group">
                                <div class="input-group-addon"><?= Yii::t('media', 'Alt') ?> {%=lang[i]%}</div>
                                <input type="text" maxlength="255" name="MediaFiles[{%=file.id%}][translations][{%=lang[i]%}][alt]" class="form-control input-sm" value="{%=valueAlt%}">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group">
                                <div class="input-group-addon"><?= Yii::t('media', 'Title') ?> {%=lang[i]%}</div>
                                <input type="text" maxlength="255" name="MediaFiles[{%=file.id%}][translations][{%=lang[i]%}][title]" class="form-control input-sm" value="{%=valueTitle%}">
                            </div>
                        </div>
                    </div>
                {% } %}
            {% } else { %}
                <?php foreach ($this->context->languages as $lang): ?>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group">
                                <div class="input-group-addon"><?= Yii::t('media', 'Alt') . ' ' . $lang ?></div>
                                <input type="text" maxlength="255" name="MediaFiles[{%=file.id%}][translations][<?= $lang ?>][alt]" class="form-control input-sm">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group">
                                <div class="input-group-addon"><?= Yii::t('media', 'Title') . ' ' . $lang ?></div>
                                <input type="text" maxlength="255" name="MediaFiles[{%=file.id%}][translations][<?= $lang ?>][title]" class="form-control input-sm">
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            {% } %}
        </td>
    </tr>
{% } %}

</script>
