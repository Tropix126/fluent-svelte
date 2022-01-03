<section class="page-section" {...$$restProps}>
	<div class="page-section-inner">
		<slot />
	</div>
	<slot name="outer" />
</section>

<style lang="scss">
	@use "./PageSection";
</style>
