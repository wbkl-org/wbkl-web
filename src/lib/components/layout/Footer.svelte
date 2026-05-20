<script lang="ts">
	import { MapPin, Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-svelte';
	import { t } from '$lib/i18n';

	interface Props {
		lang?: string;
	}

	let { lang = 'es' }: Props = $props();

	const quickLinks = $derived([
		{ name: t('nav.home', lang), href: `/${lang}` },
		{ name: t('nav.about', lang), href: `/${lang}/about` },
		{ name: t('nav.branches', lang), href: `/${lang}/branches` },
		{ name: t('nav.footerNews', lang), href: `/${lang}/news` },
		{ name: t('nav.programs', lang), href: `/${lang}/programs` },
		{ name: t('nav.documents', lang), href: `/${lang}/documents` }
	]);

	const socialLinks = [
		{ name: 'Facebook', icon: Facebook, href: 'https://facebook.com/wbkl' },
		{ name: 'Instagram', icon: Instagram, href: 'https://instagram.com/wbkl' },
		{ name: 'YouTube', icon: Youtube, href: 'https://youtube.com/wbkl' }
	];

	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-midnight relative overflow-hidden text-white">
	<!-- Decorative Japanese Character -->
	<div class="pointer-events-none absolute top-8 right-4 opacity-5 select-none" aria-hidden="true">
		<span class="mr-32 font-serif text-[12rem] leading-none">押忍</span>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Column 1: About -->
			<div>
				<div class="mb-4 flex items-center gap-3">
					<img src="/images/wbkl_logo_embedded.svg" alt="WBKL Logo" class="h-10 w-auto" />
					<span class="text-lg font-bold tracking-tight uppercase">WBKL</span>
				</div>
				<p class="mb-6 text-sm text-gray-400">
					{t('footer.aboutText', lang)}
				</p>
				<div class="flex gap-4">
					{#each socialLinks as social (social.name)}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="text-gray-400 transition-colors duration-200 hover:text-white"
							aria-label={social.name}
						>
							<social.icon class="h-5 w-5" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Column 2: Quick Links -->
			<div>
				<h3 class="mb-4 text-lg font-bold uppercase">{t('footer.quickLinks', lang)}</h3>
				<ul class="space-y-2">
					{#each quickLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Column 3: Contact -->
			<div>
				<h3 class="mb-4 text-lg font-bold uppercase">{t('footer.contact', lang)}</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<MapPin class="text-budo-red mt-0.5 h-5 w-5 shrink-0" />
						<span class="text-sm text-gray-400">
							{t('footer.worldHQ', lang)}<br />
							{t('footer.tokyo', lang)}
						</span>
					</li>
					<li class="flex items-center gap-3">
						<Mail class="text-budo-red h-5 w-5 shrink-0" />
						<a
							href="mailto:info@wbkl.org"
							class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
						>
							info@wbkl.org
						</a>
					</li>
					<li class="flex items-center gap-3">
						<Phone class="text-budo-red h-5 w-5 shrink-0" />
						<span class="text-sm text-gray-400">+81 3-1234-5678</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row"
		>
			<p class="text-xs text-gray-500">
				&copy; {currentYear} World Budo Karate League. {t('footer.copyright', lang)}
			</p>
			<p class="text-xs text-gray-500">
				<span class="text-budo-red">押忍</span> - {t('footer.motto', lang)}
			</p>
		</div>
	</div>
</footer>
