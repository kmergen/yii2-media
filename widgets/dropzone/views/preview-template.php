<div class="dz-preview card">
    <img class="card-img-top" data-dz-thumbnail>
    <div class="card-body text-center">
        <!--            <div class="dz-filename"><span data-dz-name></span></div>-->
        <!--            <div class="dz-size" data-dz-size></div>-->
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
