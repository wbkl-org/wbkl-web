<script lang="ts">
	import type { PageData } from './$types';
	import { Clock, Award, Users, ArrowLeft } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import { t } from '$lib/i18n';
	import StrapiBlocks from '$lib/components/StrapiBlocks.svelte';

	let { data }: { data: PageData } = $props();
	const locale = $derived(data.locale);

	let program = $derived(data.program);

	function getCategoryLabel(category: string): string {
		switch (category) {
			case 'kyokushin':
				return t('programDetail.category.kyokushin', locale);
			case 'combat':
				return t('programDetail.category.combat', locale);
			default:
				return t('programDetail.category.default', locale);
		}
	}

	function getCategoryColor(category: string): string {
		switch (category) {
			case 'kyokushin':
				return 'bg-budo-red-500 text-white';
			case 'combat':
				return 'bg-gold-500 text-midnight-900';
			default:
				return 'bg-midnight-800 text-white';
		}
	}

	function getFeaturesList(features: Record<string, unknown> | null): string[] {
		if (!features) return [];
		if (Array.isArray(features)) return features as string[];
		return [];
	}
</script>

<svelte:head>
	{#if program}
		<title>{program.title} - World Budo Karate League</title>
		<meta name="description" content={program.excerpt || program.title} />
	{:else}
		<title>
			{t('programDetail.notFound', locale)} - World Budo Karate League
		</title>
	{/if}
</svelte:head>

{#if program}
	<section class="bg-white py-8">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<a
				href="/{locale}/programs"
				class="hover:text-budo-red-500 mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors duration-200"
			>
				<ArrowLeft class="h-4 w-4" />
				<span>{t('programDetail.back', locale)}</span>
			</a>
			<div class="mb-4">
				<span
					class="rounded-full px-3 py-1 text-xs font-medium {getCategoryColor(program.category)}"
				>
					{getCategoryLabel(program.category)}
				</span>
			</div>
			<h1 class="text-midnight-900 mb-4 text-3xl font-bold sm:text-4xl">{program.title}</h1>
			{#if program.excerpt}
				<p class="max-w-3xl text-lg text-slate-600">{program.excerpt}</p>
			{/if}
		</div>
	</section>

	<section class="bg-dogi py-12 sm:py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
				<div class="lg:col-span-2">
					{#if program.image}
						<img
							src={getMediaUrl(program.image, 'large')}
							alt={program.image?.alternativeText || program.title}
							class="mb-8 w-full rounded-xl"
						/>
					{/if}

					{#if program.content}
						<div class="mb-8">
							<StrapiBlocks blocks={program.content} />
						</div>
					{/if}

					{#if getFeaturesList(program.features).length > 0}
						<div class="mb-8">
							<h2 class="text-midnight-900 mb-4 text-xl font-semibold">
								{t('programDetail.whatYouLearn', locale)}
							</h2>
							<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
								{#each getFeaturesList(program.features) as feature, i (i)}
									<div
										class="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
									>
										<Award class="text-budo-red-500 mt-0.5 h-5 w-5 shrink-0" />
										<span class="text-slate-700">{feature}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<div class="lg:col-span-1">
					<div class="sticky top-24 rounded-xl border border-slate-200 bg-white p-6">
						<h3 class="text-midnight-900 mb-4 text-lg font-semibold">
							{t('programDetail.programInfo', locale)}
						</h3>

						<div class="space-y-4">
							{#if program.level}
								<div class="flex items-start gap-3">
									<Users class="text-budo-red-500 mt-0.5 h-5 w-5" />
									<div>
										<p class="text-midnight-900 font-medium">
											{t('programDetail.level', locale)}
										</p>
										<p class="text-sm text-slate-600">{program.level}</p>
									</div>
								</div>
							{/if}

							{#if program.schedule}
								<div class="flex items-start gap-3">
									<Clock class="text-budo-red-500 mt-0.5 h-5 w-5" />
									<div>
										<p class="text-midnight-900 font-medium">
											{t('programDetail.schedule', locale)}
										</p>
										<p class="text-sm text-slate-600">{program.schedule}</p>
									</div>
								</div>
							{/if}

							<div class="border-t border-slate-200 pt-4">
								<p class="mb-2 text-slate-600">
									{t('programDetail.interested', locale)}
								</p>
								<a
									href="/{locale}/branches"
									class="text-budo-red-500 hover:text-budo-red-600 font-medium transition-colors duration-200"
								>
									{t('programDetail.findDojo', locale)} →
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="bg-dogi py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<h1 class="text-midnight-900 mb-4 text-3xl font-bold">
				{t('programDetail.notFound', locale)}
			</h1>
			<p class="mb-8 text-slate-600">
				{t('programDetail.notFoundDesc', locale)}
			</p>
			<a
				href="/{locale}/programs"
				class="text-budo-red-500 hover:text-budo-red-600 font-medium transition-colors duration-200"
			>
				{t('programDetail.back', locale)}
			</a>
		</div>
	</section>
{/if}
