<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { t } from '$lib/i18n';

	interface Props {
		lang?: string;
	}

	let { lang = 'es' }: Props = $props();

	const navLinks = $derived([
		{ name: t('nav.home', lang), href: `/${lang}` },
		{ name: t('nav.about', lang), href: `/${lang}/about` },
		{ name: t('nav.branches', lang), href: `/${lang}/branches` },
		{ name: t('nav.news', lang), href: `/${lang}/news` },
		{ name: t('nav.programs', lang), href: `/${lang}/programs` },
		{ name: t('nav.documents', lang), href: `/${lang}/documents` }
	]);

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="border-slate-light sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
	<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo Section -->
			<a href={`/${lang}`} class="flex shrink-0 items-center gap-3">
				<img src="/images/wbkl_logo_embedded.svg" alt="WBKL Logo" class="h-10 w-auto" />
				<div class="hidden flex-col sm:flex">
					<span class="text-midnight text-lg font-bold tracking-tight uppercase">WBKL</span>
					<span class="hidden text-xs text-gray-500 lg:inline">World Budo Karate League</span>
				</div>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden items-center space-x-8 md:flex">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="text-midnight hover:text-budo-red text-sm font-medium tracking-wider uppercase transition-colors duration-200"
					>
						{link.name}
					</a>
				{/each}
			</div>

			<!-- Right Section: CTA + Mobile Toggle -->
			<div class="flex items-center gap-4">
				<button
					onclick={toggleMenu}
					class="text-midnight hover:text-budo-red focus:ring-budo-red rounded-lg p-2 transition-colors duration-200 focus:ring-2 focus:outline-none md:hidden"
					aria-label={isMenuOpen ? t('modal.close', lang) : 'Menu'}
					aria-expanded={isMenuOpen}
				>
					{#if isMenuOpen}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
	</nav>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="border-slate-light border-b bg-white shadow-lg md:hidden">
			<div class="space-y-2 px-4 py-4">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						onclick={closeMenu}
						class="text-midnight hover:text-budo-red block py-2 text-sm font-medium uppercase transition-colors duration-200"
					>
						{link.name}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</header>
