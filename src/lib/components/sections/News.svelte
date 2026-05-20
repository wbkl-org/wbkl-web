<script lang="ts">
	import { Calendar } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import type { NewsArticle } from '$lib/api/types';
	import { t } from '$lib/i18n';

	interface Props {
		articles: NewsArticle[];
		lang?: string;
	}

	let { articles, lang = 'es' }: Props = $props();

	function getCategoryColor(category: string): string {
		switch (category) {
			case 'news':
				return 'bg-budo-red-500 text-white';
			case 'event':
				return 'bg-gold-500 text-midnight-900';
			case 'result':
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
				month: 'long',
				year: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}
</script>

<section class="bg-white py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12 flex items-center justify-between">
			<h2 class="text-midnight-900 text-3xl font-bold">
				{t('news.heading', lang)}
			</h2>
			<a
				href="/{lang}/news"
				class="text-budo-red-500 hover:text-budo-red-600 font-medium transition-colors duration-200"
			>
				{t('news.seeAll', lang)} →
			</a>
		</div>

		<!-- News Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each articles as article (article.documentId)}
				<a
					href="/{lang}/news/{article.slug}"
					class="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-lg"
				>
					<!-- Image -->
					<div class="relative aspect-video overflow-hidden">
						{#if article.featuredImage}
							<img
								src={getMediaUrl(article.featuredImage, 'medium') || article.featuredImage.url}
								alt={article.featuredImage.alternativeText || article.title}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center bg-slate-100">
								<Calendar class="h-12 w-12 text-slate-300" />
							</div>
						{/if}
						<!-- Category Badge -->
						<span
							class="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium {getCategoryColor(
								article.category
							)}"
						>
							{t('news.category.' + (article.category || 'news'), lang)}
						</span>
					</div>

					<!-- Content -->
					<div class="p-6">
						<!-- Date -->
						<div class="mb-3 flex items-center gap-1.5 text-sm text-slate-500">
							<Calendar class="h-4 w-4" />
							<span>{formatDate(article.publishedAt)}</span>
						</div>

						<!-- Title -->
						<h3
							class="text-midnight-900 group-hover:text-budo-red-500 mb-2 line-clamp-2 text-lg font-semibold transition-colors duration-200"
						>
							{article.title}
						</h3>

						<!-- Excerpt -->
						{#if article.excerpt}
							<p class="line-clamp-3 text-sm text-slate-600">
								{article.excerpt}
							</p>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
