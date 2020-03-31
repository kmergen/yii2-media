<?php

use yii\helpers\Html;
use yii\helpers\Url;

?>
<div class="dz-preview card">
    <img class="card-img-top" data-dz-thumbnail>
    <div class="card-body text-center">
        <!--            <div class="dz-filename"><span data-dz-name></span></div>-->
        <!--            <div class="dz-size" data-dz-size></div>-->

        <div class="dz-links">
            <?php if (!empty($this->context->toolOptions['showLink'])): ?>
                <?= Html::a('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
<title>' . Yii::t('media/dropzone', 'Spin image') . '</title>
<g>
	<rect fill="none" width="24" height="24"/>
	<path d="M12,6c-3.314,0-6,2.686-6,6s2.686,6,6,6s6-2.686,6-6h2c0,4.418-3.582,8-8,8s-8-3.582-8-8s3.582-8,8-8
		c1.977,0,3.834,0.722,5.271,1.981l0.806-0.565c0.227-0.158,0.538-0.104,0.696,0.123c0.063,0.088,0.094,0.193,0.09,0.301
		l-0.098,3.557c-0.008,0.276-0.238,0.494-0.514,0.486c-0.049-0.002-0.097-0.01-0.143-0.025l-3.387-1.116
		c-0.263-0.087-0.404-0.369-0.318-0.632c0.033-0.102,0.1-0.19,0.188-0.252l0.975-0.684C14.553,6.423,13.312,6,12,6z"/>
</g>
</svg>', '', $this->context->toolOptions) ?>
            <?php endif; ?>
            <?php if (!empty($this->context->altOptions['showLink'])): ?>
                <?= Html::a('<svg class="dz-icon dz-icon-edit" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>' . Yii::t('media/dropzone', 'Set image title') . '</title>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect opacity="0" x="0" y="0" width="24" height="24"></rect>
        <path class="path-1" d="M7.10343995,21.9419885 L6.71653855,8.03551821 C6.70507204,7.62337518 6.86375628,7.22468355 7.15529818,6.93314165 L10.2341093,3.85433055 C10.8198957,3.26854411 11.7696432,3.26854411 12.3554296,3.85433055 L15.4614112,6.9603121 C15.7369117,7.23581259 15.8944065,7.6076995 15.9005637,7.99726737 L16.1199293,21.8765672 C16.1330212,22.7048909 15.4721452,23.3869929 14.6438216,23.4000848 C14.6359205,23.4002097 14.6280187,23.4002721 14.6201167,23.4002721 L8.60285976,23.4002721 C7.79067946,23.4002721 7.12602744,22.7538546 7.10343995,21.9419885 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.418039, 13.407631) rotate(-135.000000) translate(-11.418039, -13.407631) "></path>
    </g>
</svg>', '', $this->context->altOptions) ?>
            <?php endif; ?>
        </div>

        <!--        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>-->
        <div class="dz-progress progress">
            <div class="dz-upload progress-bar" data-dz-uploadprogress></div>
        </div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
    </div>
</div>
