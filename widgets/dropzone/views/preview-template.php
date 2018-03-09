<div class="dz-preview col-md-3">
    <div class="dz-preview-file text-center">
        <div class="dz-details">
<!--            <div class="dz-filename"><span data-dz-name></span></div>-->
<!--            <div class="dz-size" data-dz-size></div>-->
            <img data-dz-thumbnail/>
        </div>
        <?php if (!empty($this->context->languages)): ?>
            <div><a href="#" class="dz-alt-trigger">Bildbeschreibung</a></div>
            <div class="dz-alt-inputs"></div>
        <?php endif; ?>
<!--        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>-->
            <div class="dz-progress progress">
                <div class="dz-upload progress-bar" data-dz-uploadprogress></div>
            </div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
    </div>
</div>
