<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Events from '$lib/components/sections/Events.svelte';
	import News from '$lib/components/sections/News.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Dojos from '$lib/components/sections/Dojos.svelte';
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const locale = $derived(data.locale);
</script>

<svelte:head>
	<title>{t('page.home.title', locale)}</title>
</svelte:head>

<Hero events={data.featuredEvents} lang={locale} />
<Events events={data.featuredEvents} lang={locale} />
<News articles={data.latestNews} lang={locale} />
<About lang={locale} />
<Dojos lang={locale} />
