<!-- eslint-disable svelte/no-at-html-tags -->
<script lang="ts">
	import type { StrapiBlock, StrapiBlockChild, StrapiMedia } from '$lib/api/types';
	import { getMediaUrl } from '$lib/api/media';

	interface Props {
		blocks: StrapiBlock[] | null | undefined;
	}

	let { blocks }: Props = $props();

	function renderChildren(children: StrapiBlockChild[]): string {
		return children
			.map((child) => {
				let text = child.text || '';

				text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

				if (child.bold && child.italic) {
					text = `<strong><em>${text}</em></strong>`;
				} else if (child.bold) {
					text = `<strong>${text}</strong>`;
				} else if (child.italic) {
					text = `<em>${text}</em>`;
				}
				if (child.underline) {
					text = `<u>${text}</u>`;
				}
				if (child.strikethrough) {
					text = `<s>${text}</s>`;
				}
				if (child.code) {
					text = `<code>${text}</code>`;
				}

				if (child.type === 'link' && child.href) {
					const linkText = child.children
						? renderChildren(child.children as StrapiBlockChild[])
						: text;
					return `<a href="${child.href}" class="text-budo-red-500 hover:underline">${linkText}</a>`;
				}

				return text;
			})
			.join('');
	}
</script>

{#if blocks && blocks.length > 0}
	<div class="strapi-blocks">
		{#each blocks as block, i (i)}
			{#if block.type === 'paragraph' && block.children}
				<p class="mb-4 leading-relaxed text-slate-600">
					{@html renderChildren(block.children)}
				</p>
			{:else if block.type === 'heading' && block.children}
				{#if block.level === 1}
					<h1 class="text-midnight-900 mb-4 text-3xl font-bold">
						{@html renderChildren(block.children)}
					</h1>
				{:else if block.level === 2}
					<h2 class="text-midnight-900 mb-3 text-2xl font-bold">
						{@html renderChildren(block.children)}
					</h2>
				{:else if block.level === 3}
					<h3 class="text-midnight-900 mb-3 text-xl font-semibold">
						{@html renderChildren(block.children)}
					</h3>
				{:else if block.level === 4}
					<h4 class="text-midnight-900 mb-2 text-lg font-semibold">
						{@html renderChildren(block.children)}
					</h4>
				{:else if block.level === 5}
					<h5 class="text-midnight-900 mb-2 text-base font-semibold">
						{@html renderChildren(block.children)}
					</h5>
				{:else}
					<h6 class="text-midnight-900 mb-2 text-sm font-semibold">
						{@html renderChildren(block.children)}
					</h6>
				{/if}
			{:else if block.type === 'list' && block.children}
				{#if block.format === 'ordered'}
					<ol class="mb-4 list-decimal space-y-1 pl-6 text-slate-600">
						{#each block.children as listItem, j (j)}
							<li>
								{#if listItem.children}
									{@html renderChildren(listItem.children)}
								{/if}
							</li>
						{/each}
					</ol>
				{:else}
					<ul class="mb-4 list-disc space-y-1 pl-6 text-slate-600">
						{#each block.children as listItem, j (j)}
							<li>
								{#if listItem.children}
									{@html renderChildren(listItem.children)}
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			{:else if block.type === 'quote' && block.children}
				<blockquote class="border-budo-red-500 mb-4 border-l-4 pl-4 text-slate-600 italic">
					{@html renderChildren(block.children)}
				</blockquote>
			{:else if block.type === 'image' && block.image}
				<figure class="mb-4">
					<img
						src={getMediaUrl(block.image as StrapiMedia, 'large') ||
							(block.image as StrapiMedia).url}
						alt={(block.image as StrapiMedia).alternativeText || ''}
						class="rounded-lg"
					/>
				</figure>
			{:else if block.children}
				<div class="mb-4 text-slate-600">
					{@html renderChildren(block.children)}
				</div>
			{/if}
		{/each}
	</div>
{/if}
