<script lang="ts">
	export let title = "";
	export let description = "";
</script>

<title>{title}</title>
<meta content={title} name="og:title" />
<meta content={title} name="twitter:title" />

<meta content={description} name="description" />
<meta content={description} name="og:description" />
<meta content={description} name="twitter:description" />
