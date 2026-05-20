<script lang="ts">
	import { ArrowLeft, MapPin, User, ExternalLink, Mail, Phone } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import { t } from '$lib/i18n';
	import type { Dojo, Person } from '$lib/api/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCountry = $state<string | null>(null);

	const COUNTRY_FLAGS: Record<string, string> = {
		Spain: '🇪🇸',
		España: '🇪🇸',
		Brazil: '🇧🇷',
		Brasil: '🇧🇷',
		Chile: '🇨🇱',
		Uruguay: '🇺🇾',
		Japan: '🇯🇵',
		Japón: '🇯🇵'
	};

	const COUNTRY_NAMES: Record<string, Record<string, string>> = {
		Spain: { es: 'España', en: 'Spain' },
		España: { es: 'España', en: 'Spain' },
		Brazil: { es: 'Brasil', en: 'Brazil' },
		Brasil: { es: 'Brasil', en: 'Brazil' },
		Chile: { es: 'Chile', en: 'Chile' },
		Uruguay: { es: 'Uruguay', en: 'Uruguay' },
		Japan: { es: 'Japón', en: 'Japan' },
		Japón: { es: 'Japón', en: 'Japan' }
	};

	const locale = $derived(data.locale);

	const dojosByCountry = $derived(() => {
		const grouped: Record<string, Dojo[]> = {};
		for (const dojo of data.dojos) {
			const country = dojo.country;
			if (!grouped[country]) {
				grouped[country] = [];
			}
			grouped[country].push(dojo);
		}
		return grouped;
	});

	const countries = $derived(() => {
		const grouped = dojosByCountry();
		return Object.keys(grouped)
			.sort()
			.map((country) => ({
				id: country,
				name: COUNTRY_NAMES[country]?.[locale] ?? country,
				flag: COUNTRY_FLAGS[country] ?? '🌍',
				dojoCount: grouped[country].length
			}));
	});

	const membersByCountry = $derived(() => {
		const grouped: Record<string, Person[]> = {};
		for (const member of data.members) {
			if (member.country) {
				if (!grouped[member.country]) {
					grouped[member.country] = [];
				}
				grouped[member.country].push(member);
			}
		}
		return grouped;
	});

	function getLocalizedCountryName(country: string): string {
		return COUNTRY_NAMES[country]?.[locale] ?? country;
	}

	function selectCountry(countryId: string) {
		selectedCountry = countryId;
	}

	function goBack() {
		selectedCountry = null;
	}
</script>

<svelte:head>
	<title>{t('page.branches.title', locale)} - World Budo Karate League</title>
	<meta name="description" content={t('page.branches.metaDescription', locale)} />
</svelte:head>

<!-- Page Header -->
<section
	class="from-midnight-900 via-midnight-800 to-midnight-900 relative flex min-h-150 items-center overflow-hidden bg-linear-to-br py-20 sm:py-28"
>
	<!-- Background Kanji -->
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
				{t('branchesPage.heading1', locale)}
				<span class="text-gold-500">{t('branchesPage.heading2', locale)}</span>
			</h1>
			<p class="text-xl text-slate-300">
				{t('branchesPage.subheading', locale)}
			</p>
		</div>
	</div>
</section>

<!-- About Dojos Section -->
<section class="bg-white py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl">
			<h2 class="text-midnight-900 mb-6 text-3xl font-bold">
				{t('branchesPage.ourDojos', locale)}
			</h2>
			<div class="space-y-4 leading-relaxed text-slate-600">
				<p>
					{t('branchesPage.description1', locale)}
				</p>
				<p>
					{t('branchesPage.description2', locale)}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Countries / Dojos Section -->
<section class="bg-dogi py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Back Button (shown when country is selected) -->
		{#if selectedCountry}
			<button
				onclick={goBack}
				class="hover:text-budo-red-500 mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors duration-200"
			>
				<ArrowLeft class="h-4 w-4" />
				<span>{t('branchesPage.countries', locale)}</span>
			</button>
		{/if}

		<!-- Container with fixed min-height for both views -->
		<div class="min-h-112.5">
			<!-- Countries View -->
			{#if !selectedCountry}
				<div class="mb-12 text-center">
					<h2 class="text-midnight-900 mb-4 text-3xl font-bold">
						{t('branchesPage.selectCountry', locale)}
					</h2>
					<p class="mx-auto max-w-2xl text-slate-600">
						{t('branchesPage.selectCountryDesc', locale)}
					</p>
				</div>
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each countries() as country (country.id)}
						<button
							onclick={() => selectCountry(country.id)}
							class="hover:border-budo-red-200 group rounded-xl border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:shadow-lg"
						>
							<div class="mb-4 text-4xl">{country.flag}</div>
							<h3
								class="text-midnight-900 group-hover:text-budo-red-500 mb-2 text-xl font-semibold transition-colors duration-200"
							>
								{country.name}
							</h3>
							<p class="text-budo-red-500 text-sm font-medium">
								{country.dojoCount}
								{country.dojoCount === 1
									? t('branchesPage.dojoSingular', locale)
									: t('branchesPage.dojoPlural', locale)}
							</p>
						</button>
					{/each}
				</div>
			{:else}
				<!-- Dojos View -->
				<div class="mb-8">
					<h2 class="text-midnight-900 text-3xl font-bold">
						{t('branchesPage.dojosIn', locale)}
						{getLocalizedCountryName(selectedCountry)}
					</h2>
					<p class="mt-2 text-slate-600">
						{t('branchesPage.dojosInDesc', locale)}
					</p>
				</div>
				<div class="max-h-100 overflow-y-auto pr-2">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each dojosByCountry()[selectedCountry] ?? [] as dojo (dojo.documentId)}
							<div
								class="hover:border-budo-red-200 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:shadow-lg"
							>
								<div class="mb-4 flex items-start justify-between">
									<div class="flex items-center gap-3">
										{#if dojo.logo}
											<img
												src={getMediaUrl(dojo.logo, 'thumbnail')}
												alt={dojo.name}
												class="h-10 w-10 shrink-0 rounded object-contain"
											/>
										{/if}
										<h3 class="text-midnight-900 text-lg font-semibold">{dojo.name}</h3>
									</div>
									{#if dojo.verified}
										<span
											class="bg-budo-red-50 text-budo-red-600 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
										>
											✓ {t('branchesPage.verified', locale)}
										</span>
									{/if}
								</div>
								<div class="space-y-2">
									{#if dojo.city}
										<div class="flex items-center gap-2 text-sm text-slate-600">
											<MapPin class="text-budo-red-500 h-4 w-4 shrink-0" />
											<span>{dojo.city}</span>
										</div>
									{/if}
									{#if dojo.address}
										<p class="text-sm text-slate-600">{dojo.address}</p>
									{/if}
									{#if dojo.phone}
										<div class="flex items-center gap-2 text-sm text-slate-600">
											<Phone class="h-4 w-4 shrink-0 text-slate-400" />
											<span>{dojo.phone}</span>
										</div>
									{/if}
									{#if dojo.email}
										<div class="flex items-center gap-2 text-sm text-slate-600">
											<Mail class="h-4 w-4 shrink-0 text-slate-400" />
											<a href="mailto:{dojo.email}" class="hover:text-budo-red-500 underline"
												>{dojo.email}</a
											>
										</div>
									{/if}
									{#if dojo.website}
										<div class="flex items-center gap-2 text-sm text-slate-600">
											<ExternalLink class="h-4 w-4 shrink-0 text-slate-400" />
											<a
												href={dojo.website}
												target="_blank"
												rel="noopener noreferrer"
												class="hover:text-budo-red-500 underline"
											>
												{t('branchesPage.website', locale)}
											</a>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Members Section -->
				{#if membersByCountry()[selectedCountry] && membersByCountry()[selectedCountry].length > 0}
					<div class="mt-12">
						<h3 class="text-midnight-900 mb-6 text-2xl font-bold">
							{t('branchesPage.affiliated', locale)}
						</h3>
						<p class="mb-6 text-slate-600">
							{t('branchesPage.affiliatedDesc', locale)}
							{getLocalizedCountryName(selectedCountry)}.
						</p>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{#each membersByCountry()[selectedCountry] as member (member.documentId)}
								<div class="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
									{#if member.image}
										<img
											src={getMediaUrl(member.image, 'thumbnail')}
											alt={member.name}
											class="bg-budo-red-50 h-10 w-10 shrink-0 rounded-full object-cover"
										/>
									{:else}
										<div
											class="bg-budo-red-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
										>
											<User class="text-budo-red-500 h-5 w-5" />
										</div>
									{/if}
									<div>
										<h4 class="text-midnight-900 font-semibold">{member.name}</h4>
										{#if member.title}
											<p class="text-budo-red-500 text-sm font-medium">{member.title}</p>
										{/if}
										{#if member.dan}
											<p class="text-sm text-slate-600">{member.dan} dan</p>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</section>
