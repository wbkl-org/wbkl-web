<script lang="ts">
	import { Users, Globe, Award, Heart } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { t } from '$lib/i18n';

	interface Props {
		lang?: string;
	}

	let { lang = 'es' }: Props = $props();

	const values = $derived([
		{ icon: Users, key: 'community' },
		{ icon: Globe, key: 'global' },
		{ icon: Award, key: 'excellence' },
		{ icon: Heart, key: 'tradition' }
	]);
</script>

<section class="bg-dogi py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Left Column -->
			<div>
				<h2 class="text-midnight-900 mb-6 text-3xl font-bold">
					{t('about.heading', lang)} <span class="text-budo-red-500">WBKL</span>
				</h2>
				<p class="mb-4 text-slate-600">
					{t('about.description1', lang)}
				</p>
				<p class="mb-8 text-slate-600">
					{t('about.description2', lang)}
				</p>
				<Button variant="primary" size="lg" href="/{lang}/about">
					{t('about.learnMore', lang)}
				</Button>
			</div>

			<!-- Right Column - Values Grid -->
			<div class="grid grid-cols-2 gap-4 sm:gap-6">
				{#each values as value (value.key)}
					<div
						class="hover:border-budo-red-200 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:shadow-lg"
					>
						<div class="bg-budo-red-50 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
							<value.icon class="text-budo-red-500 h-6 w-6" />
						</div>
						<h3 class="text-midnight-900 mb-2 text-lg font-semibold">
							{t('about.values.' + value.key, lang)}
						</h3>
						<p class="text-sm text-slate-600">
							{t('about.values.' + value.key + 'Desc', lang)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
