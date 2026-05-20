<script lang="ts">
	import type { PageData } from './$types';
	import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import { t } from '$lib/i18n';
	import type { Event } from '$lib/api/types';
	import Button from '$lib/components/ui/Button.svelte';
	import EventRegistrationModal from '$lib/components/ui/EventRegistrationModal.svelte';
	import StrapiBlocks from '$lib/components/StrapiBlocks.svelte';

	let { data }: { data: PageData } = $props();
	const locale = $derived(data.locale);

	let event = $derived(data.event);

	let isModalOpen = $state(false);

	function getTypeLabel(type: string): string {
		switch (type) {
			case 'championship':
				return t('eventDetail.type.championship', locale);
			case 'clinic':
				return t('eventDetail.type.clinic', locale);
			case 'seminar':
				return t('eventDetail.type.seminar', locale);
			default:
				return t('eventDetail.type.default', locale);
		}
	}

	function getTypeColor(type: string): string {
		switch (type) {
			case 'championship':
				return 'bg-budo-red-500 text-white';
			case 'clinic':
				return 'bg-gold-500 text-midnight-900';
			case 'seminar':
				return 'bg-midnight-800 text-white';
			default:
				return 'bg-budo-red-500 text-white';
		}
	}

	function formatDate(dateStr: string): string {
		try {
			const date = new Date(dateStr);
			return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'es-ES', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}

	function getCategories(evt: Event): string[] {
		if (evt.categories && Array.isArray(evt.categories)) {
			return evt.categories as string[];
		}
		return [];
	}

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<svelte:head>
	{#if event}
		<title>{event.name} - World Budo Karate League</title>
	{:else}
		<title>{t('eventDetail.notFound', locale)} - World Budo Karate League</title>
	{/if}
</svelte:head>

{#if event}
	<section class="border-b border-slate-200 bg-white py-8">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<a
				href="/{locale}/news?tab=events"
				class="hover:text-budo-red-500 mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors duration-200"
			>
				<ArrowLeft class="h-4 w-4" />
				<span>{t('eventDetail.back', locale)}</span>
			</a>
			<div class="mb-4 flex flex-wrap items-center gap-3">
				<span class="rounded-full px-3 py-1 text-xs font-medium {getTypeColor(event.eventType)}">
					{getTypeLabel(event.eventType)}
				</span>
			</div>
			<h1 class="text-midnight-900 mb-4 text-3xl font-bold sm:text-4xl">{event.name}</h1>
			<div class="flex flex-wrap items-center gap-4 text-slate-600">
				<div class="flex items-center gap-1.5">
					<Calendar class="text-budo-red-500 h-5 w-5" />
					<span>{formatDate(event.startDate)}</span>
				</div>
				{#if event.location}
					<div class="flex items-center gap-1.5">
						<MapPin class="text-budo-red-500 h-5 w-5" />
						<span>{event.location}</span>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<section class="bg-dogi py-12 sm:py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
				<div class="lg:col-span-2">
					{#if event.featuredImage}
						<img
							src={getMediaUrl(event.featuredImage, 'large')}
							alt={event.featuredImage.alternativeText || event.name}
							class="mb-8 w-full rounded-xl"
						/>
					{/if}

					{#if event.description}
						<div class="mb-8">
							<StrapiBlocks blocks={event.description} />
						</div>
					{/if}

					{#if event.schedule}
						<div class="mb-8">
							<h2 class="text-midnight-900 mb-4 text-xl font-semibold">
								{t('eventDetail.schedule', locale)}
							</h2>
							<p class="text-slate-600">{event.schedule}</p>
						</div>
					{/if}

					{#if getCategories(event).length > 0}
						<div class="mb-8">
							<h2 class="text-midnight-900 mb-4 text-xl font-semibold">
								{t('eventDetail.categories', locale)}
							</h2>
							<ul class="space-y-2">
								{#each getCategories(event) as category, i (i)}
									<li class="flex items-start gap-2 text-slate-600">
										<span class="text-budo-red-500 mt-1">•</span>
										<span>{category}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>

				<div class="lg:col-span-1">
					<div class="sticky top-24 rounded-xl border border-slate-200 bg-white p-6">
						<h3 class="text-midnight-900 mb-4 text-lg font-semibold">
							{t('eventDetail.details', locale)}
						</h3>

						<div class="space-y-4">
							<div class="flex items-start gap-3">
								<Calendar class="text-budo-red-500 mt-0.5 h-5 w-5" />
								<div>
									<p class="text-midnight-900 font-medium">
										{t('eventDetail.date', locale)}
									</p>
									<p class="text-sm text-slate-600">{formatDate(event.startDate)}</p>
								</div>
							</div>

							{#if event.location}
								<div class="flex items-start gap-3">
									<MapPin class="text-budo-red-500 mt-0.5 h-5 w-5" />
									<div>
										<p class="text-midnight-900 font-medium">
											{t('eventDetail.location', locale)}
										</p>
										<p class="text-sm text-slate-600">{event.location}</p>
									</div>
								</div>
							{/if}

							{#if event.schedule}
								<div class="flex items-start gap-3">
									<Clock class="text-budo-red-500 mt-0.5 h-5 w-5" />
									<div>
										<p class="text-midnight-900 font-medium">
											{t('eventDetail.schedule', locale)}
										</p>
										<p class="text-sm text-slate-600">{event.schedule}</p>
									</div>
								</div>
							{/if}
						</div>

						<div class="mt-6 space-y-3">
							<Button variant="primary" size="lg" class="w-full" onclick={openModal}>
								{t('eventDetail.register', locale)}
							</Button>
							<Button variant="outline" size="lg" class="w-full">
								{t('eventDetail.shareEvent', locale)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<EventRegistrationModal open={isModalOpen} onClose={closeModal} {event} lang={locale} />
{:else}
	<section class="bg-dogi py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<h1 class="text-midnight-900 mb-4 text-3xl font-bold">
				{t('eventDetail.notFound', locale)}
			</h1>
			<p class="mb-8 text-slate-600">
				{t('eventDetail.notFoundDesc', locale)}
			</p>
			<a
				href="/{locale}/news?tab=events"
				class="text-budo-red-500 hover:text-budo-red-600 font-medium transition-colors duration-200"
			>
				{t('eventDetail.back', locale)}
			</a>
		</div>
	</section>
{/if}
