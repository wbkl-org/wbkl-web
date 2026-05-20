<script lang="ts">
	import type { Snippet } from 'svelte';
	import { X } from 'lucide-svelte';
	import { t } from '$lib/i18n';

	interface Props {
		open: boolean;
		onClose: () => void;
		title?: string;
		children: Snippet;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		lang?: string;
	}

	let { open, onClose, title, children, size = 'md', lang = 'es' }: Props = $props();

	const sizeClasses: Record<string, string> = {
		sm: 'max-w-sm',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl'
	};

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div
			class="relative w-full {sizeClasses[
				size
			]} max-h-[90vh] overflow-auto rounded-xl bg-white shadow-2xl"
		>
			<!-- Header -->
			{#if title}
				<div class="border-b border-slate-200 px-6 py-4">
					<div class="flex items-center justify-between">
						<h2 class="text-midnight-900 text-xl font-semibold">{title}</h2>
						<button
							onclick={onClose}
							class="rounded-full p-2 transition-colors duration-200 hover:bg-slate-100"
							aria-label={t('modal.close', lang)}
						>
							<X class="h-5 w-5 text-slate-500" />
						</button>
					</div>
				</div>
			{:else}
				<button
					onclick={onClose}
					class="absolute top-4 right-4 rounded-full p-2 transition-colors duration-200 hover:bg-slate-100"
					aria-label={t('modal.close', lang)}
				>
					<X class="h-5 w-5 text-slate-500" />
				</button>
			{/if}

			<!-- Content -->
			<div class="p-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
