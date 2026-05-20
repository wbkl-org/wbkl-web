<script lang="ts">
	import type { PageData } from './$types';
	import { FileText, Download } from 'lucide-svelte';
	import { getMediaUrl } from '$lib/api/media';
	import { t } from '$lib/i18n';
	import Button from '$lib/components/ui/Button.svelte';

	let { data }: { data: PageData } = $props();
	const locale = $derived(data.locale);

	let rulesDocs = $derived(data.documents.filter((d) => d.category === 'rules'));
	let techniquesDocs = $derived(data.documents.filter((d) => d.category === 'techniques'));
	let certificationsDocs = $derived(data.documents.filter((d) => d.category === 'certifications'));
	let administrativeDocs = $derived(data.documents.filter((d) => d.category === 'administrative'));

	function getCategoryColor(category: string): string {
		switch (category) {
			case 'rules':
				return 'bg-budo-red-500 text-white';
			case 'techniques':
				return 'bg-gold-500 text-midnight-900';
			case 'certifications':
				return 'bg-midnight-800 text-white';
			case 'administrative':
				return 'bg-slate-600 text-white';
			default:
				return 'bg-slate-500 text-white';
		}
	}

	function getSectionTitle(category: string): string {
		switch (category) {
			case 'rules':
				return t('documents.sections.rules', locale);
			case 'techniques':
				return t('documents.sections.techniques', locale);
			case 'certifications':
				return t('documents.sections.certifications', locale);
			case 'administrative':
				return t('documents.sections.administrative', locale);
			default:
				return category;
		}
	}

	function getSectionDescription(category: string): string {
		switch (category) {
			case 'rules':
				return t('documents.sections.rulesDesc', locale);
			case 'techniques':
				return t('documents.sections.techniquesDesc', locale);
			case 'certifications':
				return t('documents.sections.certificationsDesc', locale);
			case 'administrative':
				return t('documents.sections.administrativeDesc', locale);
			default:
				return '';
		}
	}

	function getFormatLabel(mime: string | undefined): string {
		if (!mime) return '';
		if (mime.includes('pdf')) return 'PDF';
		if (mime.includes('word') || mime.includes('document')) return 'DOC';
		if (mime.includes('spreadsheet') || mime.includes('excel')) return 'XLS';
		if (mime.includes('image')) return 'IMG';
		return mime.split('/').pop()?.toUpperCase() || '';
	}

	function getFileSize(size: number | undefined): string {
		if (!size) return '';
		if (size < 1024) return size + ' B';
		if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
		return (size / (1024 * 1024)).toFixed(1) + ' MB';
	}
</script>

<svelte:head>
	<title>
		{t('page.documents.title', locale)} - World Budo Karate League
	</title>
	<meta name="description" content={t('page.documents.metaDescription', locale)} />
</svelte:head>

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
				{t('documentsPage.heading', locale)}
				<span class="text-gold-500">
					{t('documentsPage.headingOfficial', locale)}
				</span>
			</h1>
			<p class="text-xl text-slate-300">
				{t('documentsPage.subheading', locale)}
			</p>
		</div>
	</div>
</section>

{#if rulesDocs.length > 0}
	<section class="bg-white py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-8">
				<h2 class="text-midnight-900 mb-2 text-2xl font-bold">
					{getSectionTitle('rules')}
				</h2>
				<p class="text-slate-600">{getSectionDescription('rules')}</p>
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each rulesDocs as doc (doc.documentId)}
					{@const fileUrl = getMediaUrl(doc.file)}
					<article
						class="hover:border-budo-red-200 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-lg"
					>
						<div
							class="bg-budo-red-50 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
						>
							<FileText class="text-budo-red-500 h-6 w-6" />
						</div>
						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center gap-2">
								<h3 class="text-midnight-900 font-semibold">{doc.title}</h3>
								<span
									class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium {getCategoryColor(
										doc.category
									)}"
								>
									{getFormatLabel(doc.file?.mime)}
								</span>
							</div>
							{#if doc.description}
								<p class="mb-3 line-clamp-2 text-sm text-slate-600">{doc.description}</p>
							{/if}
							<div class="flex items-center gap-4">
								{#if doc.file?.size}
									<span class="text-xs text-slate-500">{getFileSize(doc.file.size)}</span>
								{/if}
								{#if fileUrl}
									<a href={fileUrl} target="_blank" rel="noopener noreferrer">
										<Button variant="outline" size="sm">
											<Download class="mr-1.5 h-4 w-4" />
											{t('documentsPage.download', locale)}
										</Button>
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if techniquesDocs.length > 0}
	<section class="bg-dogi py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-8">
				<h2 class="text-midnight-900 mb-2 text-2xl font-bold">
					{getSectionTitle('techniques')}
				</h2>
				<p class="text-slate-600">{getSectionDescription('techniques')}</p>
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each techniquesDocs as doc (doc.documentId)}
					{@const fileUrl = getMediaUrl(doc.file)}
					<article
						class="hover:border-gold-200 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-lg"
					>
						<div class="bg-gold-100 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
							<FileText class="text-gold-600 h-6 w-6" />
						</div>
						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center gap-2">
								<h3 class="text-midnight-900 font-semibold">{doc.title}</h3>
								<span
									class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium {getCategoryColor(
										doc.category
									)}"
								>
									{getFormatLabel(doc.file?.mime)}
								</span>
							</div>
							{#if doc.description}
								<p class="mb-3 line-clamp-2 text-sm text-slate-600">{doc.description}</p>
							{/if}
							<div class="flex items-center gap-4">
								{#if doc.file?.size}
									<span class="text-xs text-slate-500">{getFileSize(doc.file.size)}</span>
								{/if}
								{#if fileUrl}
									<a href={fileUrl} target="_blank" rel="noopener noreferrer">
										<Button variant="outline" size="sm">
											<Download class="mr-1.5 h-4 w-4" />
											{t('documentsPage.download', locale)}
										</Button>
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if certificationsDocs.length > 0}
	<section class="bg-white py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-8">
				<h2 class="text-midnight-900 mb-2 text-2xl font-bold">
					{getSectionTitle('certifications')}
				</h2>
				<p class="text-slate-600">{getSectionDescription('certifications')}</p>
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each certificationsDocs as doc (doc.documentId)}
					{@const fileUrl = getMediaUrl(doc.file)}
					<article
						class="hover:border-midnight-300 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-lg"
					>
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100"
						>
							<FileText class="text-midnight-600 h-6 w-6" />
						</div>
						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center gap-2">
								<h3 class="text-midnight-900 font-semibold">{doc.title}</h3>
								<span
									class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium {getCategoryColor(
										doc.category
									)}"
								>
									{getFormatLabel(doc.file?.mime)}
								</span>
							</div>
							{#if doc.description}
								<p class="mb-3 line-clamp-2 text-sm text-slate-600">{doc.description}</p>
							{/if}
							<div class="flex items-center gap-4">
								{#if doc.file?.size}
									<span class="text-xs text-slate-500">{getFileSize(doc.file.size)}</span>
								{/if}
								{#if fileUrl}
									<a href={fileUrl} target="_blank" rel="noopener noreferrer">
										<Button variant="outline" size="sm">
											<Download class="mr-1.5 h-4 w-4" />
											{t('documentsPage.download', locale)}
										</Button>
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if administrativeDocs.length > 0}
	<section class="bg-dogi py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
			<div class="mb-8">
				<h2 class="text-midnight-900 mb-2 text-2xl font-bold">
					{getSectionTitle('administrative')}
				</h2>
				<p class="text-slate-600">{getSectionDescription('administrative')}</p>
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each administrativeDocs as doc (doc.documentId)}
					{@const fileUrl = getMediaUrl(doc.file)}
					<article
						class="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-lg"
					>
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100"
						>
							<FileText class="h-6 w-6 text-slate-600" />
						</div>
						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center gap-2">
								<h3 class="text-midnight-900 font-semibold">{doc.title}</h3>
								<span
									class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium {getCategoryColor(
										doc.category
									)}"
								>
									{getFormatLabel(doc.file?.mime)}
								</span>
							</div>
							{#if doc.description}
								<p class="mb-3 line-clamp-2 text-sm text-slate-600">{doc.description}</p>
							{/if}
							<div class="flex items-center gap-4">
								{#if doc.file?.size}
									<span class="text-xs text-slate-500">{getFileSize(doc.file.size)}</span>
								{/if}
								{#if fileUrl}
									<a href={fileUrl} target="_blank" rel="noopener noreferrer">
										<Button variant="outline" size="sm">
											<Download class="mr-1.5 h-4 w-4" />
											{t('documentsPage.download', locale)}
										</Button>
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}
