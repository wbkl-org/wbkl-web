<script lang="ts">
	import { Calendar, MapPin, ArrowRight } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import { t } from '$lib/i18n';
	import type { Event } from '$lib/api/types';

	interface Props {
		event: Event;
		lang?: string;
	}

	let { event, lang = 'es' }: Props = $props();

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
			return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}
</script>

<a href="/{lang}/events/{event.slug}" class="group">
	<article
		class="flex flex-col gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-lg sm:flex-row sm:gap-6 sm:p-6"
	>
		{#if event.featuredImage}
			<div
				class="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg sm:aspect-square sm:w-48"
			>
				<img
					src={getMediaUrl(event.featuredImage, 'medium')}
					alt={event.featuredImage.alternativeText || event.name}
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
		{:else}
			<div
				class="relative flex aspect-video w-full shrink-0 items-center justify-center rounded-lg bg-slate-100 sm:aspect-square sm:w-32"
			>
				<Calendar class="h-8 w-8 text-slate-300" />
			</div>
		{/if}

		<div class="min-w-0 flex-1">
			<div class="mb-2 flex flex-wrap items-center gap-2">
				<span class="rounded-full px-3 py-1 text-xs font-medium {getTypeColor(event.eventType)}">
					{t('events.type.' + event.eventType, lang)}
				</span>
				{#if event.featured}
					<span
						class="border-budo-red-500 text-budo-red-500 rounded-full border px-3 py-1 text-xs font-medium"
					>
						{t('events.featured', lang)}
					</span>
				{/if}
			</div>
			<h3
				class="text-midnight-900 group-hover:text-budo-red-500 mb-2 text-lg font-semibold transition-colors duration-200"
			>
				{event.name}
			</h3>
			{#if event.location}
				<p class="mb-4 line-clamp-2 text-sm text-slate-600">
					{event.location}
				</p>
			{/if}
			<div class="flex flex-wrap items-center gap-4 text-sm text-slate-500">
				<div class="flex items-center gap-1.5">
					<Calendar class="text-budo-red-500 h-4 w-4" />
					<span>{formatDate(event.startDate)}</span>
				</div>
				{#if event.location}
					<div class="flex items-center gap-1.5">
						<MapPin class="text-budo-red-500 h-4 w-4" />
						<span>{event.location}</span>
					</div>
				{/if}
			</div>
		</div>

		<div
			class="group-hover:text-budo-red-500 hidden items-center text-slate-400 transition-colors duration-200 sm:flex"
		>
			<ArrowRight class="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
		</div>
	</article>
</a>
