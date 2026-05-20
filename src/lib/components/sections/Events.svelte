<script lang="ts">
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import { Calendar, MapPin, ArrowRight } from 'lucide-svelte';
	import type { Event } from '$lib/api/types';
	import { t } from '$lib/i18n';

	interface Props {
		events: Event[];
		lang?: string;
	}

	let { events, lang = 'es' }: Props = $props();

	const tabs = $derived([
		{ id: 'upcoming', label: t('events.tabs.upcoming', lang) },
		{ id: 'championships', label: t('events.tabs.championships', lang) },
		{ id: 'clinics', label: t('events.tabs.clinics', lang) }
	]);

	const upcomingEvents = $derived(events);
	const championshipEvents = $derived(events.filter((e) => e.eventType === 'championship'));
	const clinicEvents = $derived(
		events.filter((e) => e.eventType === 'clinic' || e.eventType === 'seminar')
	);

	const eventsByTab = $derived<Record<string, Event[]>>({
		upcoming: upcomingEvents,
		championships: championshipEvents,
		clinics: clinicEvents
	});

	let activeTab = $state('upcoming');

	function handleTabChange(tabId: string) {
		activeTab = tabId;
	}

	function getTypeBadge(type: string): {
		label: string;
		variant: 'default' | 'secondary' | 'outline';
	} {
		const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
			championship: 'default',
			clinic: 'secondary',
			seminar: 'secondary'
		};
		const key = ['championship', 'clinic', 'seminar'].includes(type) ? type : 'default';
		return { label: t('events.type.' + key, lang), variant: variants[type] || 'default' };
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

<section class="bg-dogi-100 py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h2 class="text-midnight-900 mb-4 text-3xl font-bold">
				{t('events.heading', lang)}
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-slate-600">
				{t('events.description', lang)}
			</p>
		</div>

		<!-- Tabs -->
		<Tabs {tabs} {activeTab} onTabChange={handleTabChange}>
			{#snippet children(activeTab)}
				<!-- Event Cards -->
				<div class="space-y-4">
					{#each eventsByTab[activeTab] || [] as event (event.documentId)}
						<a
							href="/{lang}/events/{event.slug}"
							class="group hover:border-budo-red-200 flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:shadow-lg"
						>
							<!-- Date Badge -->
							<div
								class="bg-midnight-800 hidden h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg text-white sm:flex"
							>
								<span class="text-xl font-bold">{formatDate(event.startDate)}</span>
							</div>

							<!-- Event Info -->
							<div class="min-w-0 flex-1">
								<div class="mb-2 flex flex-wrap items-center gap-2">
									<Badge variant={getTypeBadge(event.eventType).variant}>
										{getTypeBadge(event.eventType).label}
									</Badge>
									{#if event.featured}
										<Badge variant="outline">
											{t('events.featured', lang)}
										</Badge>
									{/if}
								</div>
								<h3
									class="text-midnight-900 group-hover:text-budo-red-500 mb-2 text-lg font-semibold transition-colors duration-200"
								>
									{event.name}
								</h3>
								<div class="flex flex-wrap items-center gap-4 text-sm text-slate-500">
									<div class="flex items-center gap-1.5">
										<Calendar class="h-4 w-4" />
										<span>{formatDate(event.startDate)}</span>
									</div>
									{#if event.location}
										<div class="flex items-center gap-1.5">
											<MapPin class="h-4 w-4" />
											<span>{event.location}</span>
										</div>
									{/if}
								</div>
							</div>

							<!-- Arrow -->
							<div
								class="group-hover:text-budo-red-500 shrink-0 text-slate-400 transition-colors duration-200"
							>
								<ArrowRight
									class="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
								/>
							</div>
						</a>
					{/each}
				</div>
			{/snippet}
		</Tabs>

		<!-- Footer -->
		<div class="mt-8 text-center">
			<Button variant="outline" size="lg" href="/{lang}/news">
				{t('events.allEvents', lang)}
			</Button>
		</div>
	</div>
</section>
