{extends './pane.tpl'}

{block 'media_pane_options' append}
	{$id = 'tab-media-photoset'}
{/block}

{block 'media_pane_footer' prepend}
	{include 'components/button/button.tpl'
		sMods    = 'primary'
		sClasses = 'js-media-insert-button js-media-insert-photoset'
		sText    = {lang name='media.photoset.submit'}}
{/block}