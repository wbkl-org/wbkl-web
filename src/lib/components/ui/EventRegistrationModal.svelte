<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	import { Calendar, MapPin, User, Mail, Phone, Building, Hash } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import type { Event } from '$lib/api/types';

	interface Props {
		open: boolean;
		onClose: () => void;
		event: Event | undefined;
		lang?: string;
	}

	let { open, onClose, event, lang = 'es' }: Props = $props();

	let formData = $state({
		fullName: '',
		email: '',
		phone: '',
		dojo: '',
		belt: '',
		category: ''
	});

	let isSubmitting = $state(false);
	let submitted = $state(false);

	function getTypeColor(type: string): string {
		switch (type) {
			case 'championship':
				return 'bg-budo-red-500 text-white';
			case 'clinic':
				return 'bg-gold-500 text-midnight-900';
			case 'seminar':
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

	function getCategories(event: Event): string[] {
		if (event.categories && Array.isArray(event.categories)) {
			return event.categories as string[];
		}
		return [];
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isSubmitting = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		isSubmitting = false;
		submitted = true;
	}

	function handleClose() {
		submitted = false;
		formData = {
			fullName: '',
			email: '',
			phone: '',
			dojo: '',
			belt: '',
			category: ''
		};
		onClose();
	}
</script>

<Modal {open} onClose={handleClose} size="lg" {lang}>
	{#if event}
		{#if submitted}
			<div class="py-8 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
				>
					<svg
						class="h-8 w-8 text-green-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<h3 class="text-midnight-900 mb-2 text-xl font-semibold">
					{t('registration.success', lang)}
				</h3>
				<p class="mb-6 text-slate-600">
					{t('registration.successMessage', lang).replace('{event}', event.name)}
				</p>
				<Button variant="primary" onclick={handleClose}>
					{t('registration.close', lang)}
				</Button>
			</div>
		{:else}
			<!-- Event Info Header -->
			<div class="mb-6 border-b border-slate-200 pb-6">
				<span
					class="mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium {getTypeColor(
						event.eventType
					)}"
				>
					{t('registration.type.' + event.eventType, lang)}
				</span>
				<h2 class="text-midnight-900 mb-2 text-xl font-semibold">{event.name}</h2>
				<div class="flex flex-wrap gap-4 text-sm text-slate-600">
					<div class="flex items-center gap-1.5">
						<Calendar class="text-budo-red-500 h-4 w-4" />
						<span>{formatDate(event.startDate)}</span>
					</div>
					{#if event.location}
						<div class="flex items-center gap-1.5">
							<MapPin class="text-budo-red-500 h-4 w-4" />
							<span>{event.location}</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Registration Form -->
			<form onsubmit={handleSubmit}>
				<h3 class="text-midnight-900 mb-4 font-semibold">
					{t('registration.participantInfo', lang)}
				</h3>

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="fullName" class="mb-1.5 block text-sm font-medium text-slate-700">
							{t('registration.fullName', lang)} *
						</label>
						<div class="relative">
							<User class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="text"
								id="fullName"
								bind:value={formData.fullName}
								required
								class="focus:border-budo-red-500 focus:ring-budo-red-500 w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none"
								placeholder={t('registration.placeholder.fullName', lang)}
							/>
						</div>
					</div>

					<div>
						<label for="email" class="mb-1.5 block text-sm font-medium text-slate-700">
							{t('registration.email', lang)} *
						</label>
						<div class="relative">
							<Mail class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								class="focus:border-budo-red-500 focus:ring-budo-red-500 w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none"
								placeholder={t('registration.placeholder.email', lang)}
							/>
						</div>
					</div>

					<div>
						<label for="phone" class="mb-1.5 block text-sm font-medium text-slate-700">
							{t('registration.phone', lang)} *
						</label>
						<div class="relative">
							<Phone class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="tel"
								id="phone"
								bind:value={formData.phone}
								required
								class="focus:border-budo-red-500 focus:ring-budo-red-500 w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none"
								placeholder={t('registration.placeholder.phone', lang)}
							/>
						</div>
					</div>

					<div>
						<label for="dojo" class="mb-1.5 block text-sm font-medium text-slate-700">
							{t('registration.dojo', lang)} *
						</label>
						<div class="relative">
							<Building class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="text"
								id="dojo"
								bind:value={formData.dojo}
								required
								class="focus:border-budo-red-500 focus:ring-budo-red-500 w-full rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none"
								placeholder={t('registration.placeholder.dojo', lang)}
							/>
						</div>
					</div>

					<div>
						<label for="belt" class="mb-1.5 block text-sm font-medium text-slate-700">
							{t('registration.belt', lang)} *
						</label>
						<div class="relative">
							<Hash class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<select
								id="belt"
								bind:value={formData.belt}
								required
								class="focus:border-budo-red-500 focus:ring-budo-red-500 w-full appearance-none rounded-lg border border-slate-300 py-2.5 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none"
							>
								<option value="">{t('registration.select', lang)}</option>
								<option value="white">{t('registration.belt.white', lang)}</option>
								<option value="orange">{t('registration.belt.orange', lang)}</option>
								<option value="blue">{t('registration.belt.blue', lang)}</option>
								<option value="yellow">{t('registration.belt.yellow', lang)}</option>
								<option value="green">{t('registration.belt.green', lang)}</option>
								<option value="brown">{t('registration.belt.brown', lang)}</option>
								<option value="shodan">{t('registration.belt.shodan', lang)}</option>
								<option value="nidan">{t('registration.belt.nidan', lang)}</option>
								<option value="sandan">{t('registration.belt.sandan', lang)}</option>
								<option value="yondan">{t('registration.belt.yondan', lang)}</option>
								<option value="godan">{t('registration.belt.godan', lang)}</option>
							</select>
						</div>
					</div>

					{#if event.eventType === 'championship' && getCategories(event).length > 0}
						<div>
							<label for="category" class="mb-1.5 block text-sm font-medium text-slate-700">
								{t('registration.category', lang)} *
							</label>
							<select
								id="category"
								bind:value={formData.category}
								required
								class="focus:border-budo-red-500 focus:ring-budo-red-500 w-full appearance-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-1 focus:outline-none"
							>
								<option value="">{t('registration.select', lang)}</option>
								{#each getCategories(event) as category, i (i)}
									<option value={category}>{category}</option>
								{/each}
							</select>
						</div>
					{/if}
				</div>

				<div class="mt-6 flex gap-3">
					<Button variant="outline" onclick={handleClose} class="flex-1">
						{t('registration.cancel', lang)}
					</Button>
					<Button variant="primary" class="flex-1" disabled={isSubmitting}>
						{isSubmitting ? t('registration.submitting', lang) : t('registration.register', lang)}
					</Button>
				</div>
			</form>
		{/if}
	{/if}
</Modal>
