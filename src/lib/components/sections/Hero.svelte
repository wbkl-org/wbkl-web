<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import EventRegistrationModal from '$lib/components/ui/EventRegistrationModal.svelte';
	import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import type { Event } from '$lib/api/types';
	import { t } from '$lib/i18n';

	interface Props {
		events: Event[];
		lang?: string;
	}

	let { events, lang = 'es' }: Props = $props();

	let currentSlide = $state(0);
	let autoplayInterval: ReturnType<typeof setInterval>;
	let isModalOpen = $state(false);
	let selectedEvent = $state<Event | undefined>(undefined);

	const featuredSlides = $derived(events);

	function nextSlide() {
		if (featuredSlides.length === 0) return;
		currentSlide = (currentSlide + 1) % featuredSlides.length;
	}

	function prevSlide() {
		if (featuredSlides.length === 0) return;
		currentSlide = (currentSlide + featuredSlides.length - 1) % featuredSlides.length;
	}

	function goToSlide(index: number) {
		currentSlide = index;
		resetAutoplay();
	}

	function resetAutoplay() {
		clearInterval(autoplayInterval);
		autoplayInterval = setInterval(nextSlide, 4000);
	}

	function getTypeLabel(type: string): string {
		const key = ['championship', 'clinic', 'seminar'].includes(type) ? type : 'default';
		return t('hero.type.' + key, lang);
	}

	function formatDate(dateStr: string): string {
		try {
			const date = new Date(dateStr);
			return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}

	function openRegistrationModal(event: Event) {
		selectedEvent = event;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		selectedEvent = undefined;
	}

	$effect(() => {
		if (featuredSlides.length > 0) {
			autoplayInterval = setInterval(nextSlide, 4000);
		}
		return () => clearInterval(autoplayInterval);
	});
</script>

{#if featuredSlides.length > 0}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class="relative flex min-h-150 items-center overflow-hidden"
		onmouseenter={() => clearInterval(autoplayInterval)}
		onmouseleave={() => resetAutoplay()}
	>
		<!-- Background Layer -->
		<div class="absolute inset-0">
			{#each featuredSlides as slide, index (slide.documentId)}
				<div
					class="absolute inset-0 transition-opacity duration-700 {index === currentSlide
						? 'z-10 opacity-100'
						: 'z-0 opacity-0'}"
				>
					{#if slide.featuredImage}
						<img
							src={getMediaUrl(slide.featuredImage, 'large')}
							alt={slide.featuredImage.alternativeText || slide.name}
							class="h-full w-full object-cover"
						/>
						<div
							class="from-midnight-900/95 via-midnight-900/80 to-midnight-900/60 absolute inset-0 bg-linear-to-r"
						></div>
					{:else}
						<!-- Default Kanji Background -->
						<div
							class="from-midnight-900 via-midnight-800 to-midnight-900 absolute inset-0 bg-linear-to-br"
						></div>
						<div class="absolute inset-0 flex items-center justify-center">
							<img
								src="/images/kanji.svg"
								alt=""
								class="h-full w-full max-w-4xl object-contain opacity-5 invert"
							/>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Slides Container -->
		<div class="relative z-20 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
			{#each featuredSlides as slide, index (slide.documentId)}
				<div
					class="{index === currentSlide
						? 'translate-x-0 opacity-100'
						: 'pointer-events-none absolute inset-0 translate-x-8 opacity-0'} transition-all duration-500"
				>
					{#if index === currentSlide}
						<div class="max-w-3xl">
							<!-- Badge -->
							<div
								class="bg-dogi-700/60 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white"
							>
								<Calendar class="h-4 w-4" />
								<span class="text-sm font-medium">
									{getTypeLabel(slide.eventType)}
								</span>
							</div>

							<!-- Main Headline -->
							<h1 class="mb-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
								{slide.name}
							</h1>

							<!-- Description -->
							<p class="mb-8 max-w-2xl text-lg text-gray-300">
								{slide.location || ''}
							</p>

							<!-- Event Details -->
							<div class="mb-10 flex flex-wrap gap-6 text-gray-300">
								<div class="flex items-center gap-2">
									<Calendar class="text-budo-red-400 h-5 w-5" />
									<span>{formatDate(slide.startDate)}</span>
								</div>
								{#if slide.location}
									<div class="flex items-center gap-2">
										<MapPin class="text-budo-red-400 h-5 w-5" />
										<span>{slide.location}</span>
									</div>
								{/if}
							</div>

							<!-- CTA Buttons -->
							<div class="flex flex-wrap gap-4">
								{#if slide.registrationUrl}
									<Button variant="primary" size="lg" onclick={() => openRegistrationModal(slide)}>
										{t('hero.registerNow', lang)}
									</Button>
								{/if}
								<Button
									variant="secondary"
									size="lg"
									href="/{lang}/events/{slide.slug}"
									class="hover:border-gold-300! hover:bg-gold-300! hover:text-midnight-700! text-white"
								>
									{t('hero.seeDetails', lang)}
								</Button>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Navigation Arrows -->
		<button
			onclick={() => {
				prevSlide();
				resetAutoplay();
			}}
			class="absolute top-1/2 left-4 z-30 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
			aria-label={t('hero.prevSlide', lang)}
		>
			<ChevronLeft class="h-6 w-6" />
		</button>
		<button
			onclick={() => {
				nextSlide();
				resetAutoplay();
			}}
			class="absolute top-1/2 right-4 z-30 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
			aria-label={t('hero.nextSlide', lang)}
		>
			<ChevronRight class="h-6 w-6" />
		</button>

		<!-- Slide Indicators -->
		<div class="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
			{#each featuredSlides as slide, index (slide.documentId)}
				<button
					onclick={() => goToSlide(index)}
					class="{index === currentSlide
						? 'bg-budo-red-400 w-6'
						: 'bg-white/50 hover:bg-white/75'} h-2 w-2 rounded-full transition-all duration-200"
					aria-label={t('hero.goToSlide', lang).replace('{n}', String(index + 1))}
				></button>
			{/each}
		</div>

		<!-- Bottom Gradient Fade -->
		<div
			class="from-dogi absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t to-transparent"
		></div>
	</section>

	<EventRegistrationModal open={isModalOpen} onClose={closeModal} event={selectedEvent} {lang} />
{/if}
