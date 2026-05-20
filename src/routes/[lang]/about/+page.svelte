<script lang="ts">
	import { Sparkles, Flame, Shield, Star, Users } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const locale = $derived(data.locale);

	const kyokushinValues = $derived([
		{
			icon: Sparkles,
			title: t('aboutPage.values.truth', locale),
			description: t('aboutPage.values.truthDesc', locale)
		},
		{
			icon: Flame,
			title: t('aboutPage.values.indomitable', locale),
			description: t('aboutPage.values.indomitableDesc', locale)
		},
		{
			icon: Shield,
			title: t('aboutPage.values.fullContact', locale),
			description: t('aboutPage.values.fullContactDesc', locale)
		},
		{
			icon: Star,
			title: t('aboutPage.values.excellence', locale),
			description: t('aboutPage.values.excellenceDesc', locale)
		}
	]);

	const timeline = $derived([
		{
			year: '1970',
			title: t('aboutPage.timeline.1970.title', locale),
			description: t('aboutPage.timeline.1970.desc', locale)
		},
		{
			year: '1995',
			title: t('aboutPage.timeline.1995.title', locale),
			description: t('aboutPage.timeline.1995.desc', locale)
		},
		{
			year: '2015',
			title: t('aboutPage.timeline.2015.title', locale),
			description: t('aboutPage.timeline.2015.desc', locale)
		},
		{
			year: '2020',
			title: t('aboutPage.timeline.2020.title', locale),
			description: t('aboutPage.timeline.2020.desc', locale)
		},
		{
			year: '2025',
			title: t('aboutPage.timeline.2025.title', locale),
			description: t('aboutPage.timeline.2025.desc', locale)
		}
	]);
</script>

<svelte:head>
	<title>{t('page.about.title', locale)}</title>
	<meta name="description" content={t('page.about.metaDescription', locale)} />
</svelte:head>

<!-- Page Header -->
<section
	class="from-midnight-900 via-midnight-800 to-midnight-900 relative flex min-h-150 items-center overflow-hidden bg-linear-to-br py-20 sm:py-28"
>
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
		<img
			src="/images/kanji.svg"
			alt=""
			class="h-full w-full max-w-4xl object-contain opacity-5 invert"
		/>
	</div>
	<div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="max-w-2xl">
			<h1 class="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
				{t('aboutPage.heading', locale)} <span class="text-gold-500">WBKL</span>
			</h1>
			<p class="text-xl text-slate-300">
				{t('aboutPage.subheading', locale)}
			</p>
		</div>
	</div>
</section>

<!-- About Organization Section -->
<section class="bg-white py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<h2 class="text-midnight-900 mb-6 text-3xl font-bold">
				{t('aboutPage.orgHeading', locale)}
			</h2>
			<div class="space-y-4 leading-relaxed text-slate-600">
				<p>
					{t('aboutPage.orgDescription1', locale)}
				</p>
				<p>
					{t('aboutPage.orgDescription2', locale)}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- About Kyokushinkai Section -->
<section class="bg-dogi py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
			<div>
				<h2 class="text-midnight-900 mb-6 text-3xl font-bold">
					{t('aboutPage.whatIsHeading', locale)}
				</h2>
				<div class="space-y-4 leading-relaxed text-slate-600">
					{#if locale === 'en'}
						<p>
							<strong class="text-midnight-900">Kyokushinkai</strong> means "Society of the ultimate
							truth", derived from three words: <em>Kyou</em> (ultimate), <em>Shin</em> (truth or
							reality), and <em>Kai</em> (gathering or association).
						</p>
						<p>
							Founded by master <strong class="text-midnight-900">Masutatsu Oyama</strong> in 1964, this
							martial art combines the best of boxing, muay thai, goju ryu and shotokan, creating a full-contact
							technique where victory in kumite is achieved only by KO.
						</p>
						<p>
							The <strong class="text-midnight-900">World Budo Karate League</strong> represents these
							same values, preserving the essence of authentic Kyokushinkai and promoting personal and
							mental improvement through the way of the warrior.
						</p>
					{:else}
						<p>
							El <strong class="text-midnight-900">Kyokushinkai</strong> significa "Escuela de la
							más alta verdad", derivado de tres vocablos: <em>Kyou</em> (lo más alto),
							<em>Shin</em> (verdad o realidad) y <em>Kai</em> (reunión o asociarse).
						</p>
						<p>
							Fundado por el maestro
							<strong class="text-midnight-900">Masutatsu Oyama</strong> en 1964, este arte marcial combinar
							lo mejor del boxeo, muay thai, goju ryu y shotokan, creando una técnica de contacto pleno
							donde la victoria en kumite se logra únicamente por KO.
						</p>
						<p>
							La <strong class="text-midnight-900">World Budo Karate League</strong> representa estos
							mismos valores, preservando la esencia del Kyokushinkai auténtico y promoviendo la mejora
							personal y mental a través del camino del guerrero.
						</p>
					{/if}
				</div>
			</div>

			<div>
				<h3 class="text-midnight-900 mb-4 text-xl font-semibold">
					{t('aboutPage.valuesHeading', locale)}
				</h3>
				<p class="mb-6 text-slate-600">
					{t('aboutPage.valuesIntro', locale)}
				</p>
				<div class="grid grid-cols-2 gap-3">
					{#each kyokushinValues as value (value.title)}
						{@const Icon = value.icon}
						<div
							class="bg-dogi hover:border-budo-red-200 rounded-xl border border-slate-200 p-3 transition-all duration-200 hover:shadow-lg"
						>
							<div class="bg-budo-red-50 mb-2 flex h-8 w-8 items-center justify-center rounded-lg">
								<Icon class="text-budo-red-500 h-4 w-4" />
							</div>
							<h4 class="text-midnight-900 text-sm font-semibold">{value.title}</h4>
							<p class="mt-1 text-xs leading-tight text-slate-600">{value.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Timeline Section -->
<section class="bg-midnight-800 py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-dogi mb-4 text-3xl font-bold">
				{t('aboutPage.timelineHeading', locale)}
			</h2>
			<p class="mx-auto max-w-2xl text-slate-200">
				{t('aboutPage.timelineIntro', locale)}
			</p>
		</div>
		<div class="relative">
			<!-- Timeline Line -->
			<div
				class="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-slate-300 md:block"
			></div>

			<!-- Timeline Items -->
			<div class="space-y-12">
				{#each timeline as item, index (item.year)}
					<div class="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
						<div class="md:w-1/2 {index % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-3'}">
							<div
								class="hover:shadow-dogi-300 hover:border-budo-red-300 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-md"
							>
								<span class="text-gold-500 text-lg font-bold">{item.year}</span>
								<h3 class="text-midnight-900 mt-2 mb-2 text-xl font-semibold">{item.title}</h3>
								<p class="text-sm text-slate-600">{item.description}</p>
							</div>
						</div>
						<!-- Timeline Dot -->
						<div
							class="bg-budo-red-500 z-10 hidden h-4 w-4 rounded-full border-4 border-white shadow-md md:order-2 md:flex"
						></div>
						<div class="md:w-1/2 {index % 2 === 0 ? 'md:order-3' : 'md:order-1'}"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Leadership Section -->
<section class="bg-dogi py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-midnight-900 mb-4 text-3xl font-bold">
				{t('aboutPage.leadershipHeading', locale)}
			</h2>
			<p class="mx-auto max-w-2xl text-slate-600">
				{t('aboutPage.leadershipIntro', locale)}
			</p>
		</div>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each data.directors as person (person.documentId)}
				<div
					class="hover:border-budo-red-200 rounded-xl border border-slate-200 bg-white p-5 text-center transition-all duration-200 hover:shadow-lg"
				>
					{#if person.image}
						<img
							src={getMediaUrl(person.image, 'small')}
							alt={person.name}
							class="mx-auto mb-3 h-24 w-24 rounded-full object-cover"
						/>
					{:else}
						<div
							class="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-slate-200"
						>
							<Users class="h-12 w-12 text-slate-400" />
						</div>
					{/if}
					<h3 class="text-midnight-900 text-base font-semibold">{person.name}</h3>
					{#if person.boardPosition}
						<p class="text-budo-red-500 mt-1 text-xs font-medium">{person.boardPosition}</p>
					{/if}
					{#if person.role}
						<p class="text-sm text-slate-600">{person.role}</p>
					{/if}
					{#if person.country}
						<p class="mt-1 text-xs text-slate-500">{person.country}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
