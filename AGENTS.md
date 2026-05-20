# AGENTS.md

This document provides guidelines and reference information for agents working on the WBKL Web project.

## Project Overview

- **Framework**: SvelteKit 2 with Svelte 5 (runes syntax: `$state`, `$props`, `$derived`, etc.)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: TailwindCSS v4 with `@tailwindcss/vite` plugin
- **Adapter**: Cloudflare Pages (`@sveltejs/adapter-cloudflare`)
- **Package Manager**: pnpm

---

## Commands

### Development

```bash
pnpm dev          # Start development server
pnpm preview     # Preview production build
```

### Type Checking

```bash
pnpm check              # Run svelte-check (types + svelte)
pnpm check:watch       # Watch mode for type checking
```

### Linting & Formatting

```bash
pnpm lint               # Run ESLint + Prettier checks
pnpm format             # Format all files with Prettier
```

### Building

```bash
pnpm build              # Production build
pnpm prepare            # Sync SvelteKit (runs automatically)
```

### Single Test

> **Note**: No test framework is currently configured. If adding tests, use Vitest.

---

## Code Style Guidelines

### General Principles

- Use **TypeScript** for all files; avoid plain JavaScript
- Enable **strict mode** in TypeScript (`tsconfig.json`)
- Use Svelte 5 **runes** syntax (`$state`, `$props`, `$derived`, `$effect`)
- Follow existing patterns in the codebase

### Formatting (Prettier)

Configuration is in `.prettierrc`:

- **Tabs** for indentation
- **Single quotes** for strings
- **No trailing commas**
- **Print width**: 100 characters
- Use `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`

Run formatting before committing:

```bash
pnpm format
```

### Linting (ESLint)

- Uses `eslint-plugin-svelte` and `typescript-eslint`
- Extends Prettier config (disables conflicting rules)
- Run linting before committing:

```bash
pnpm lint
```

### Imports

- Use `$lib` alias for internal imports (e.g., `$lib/components/Header.svelte`)
- Group imports in logical order:
  1. Svelte/framework imports
  2. External libraries
  3. Internal `$lib` imports
  4. Type imports

```typescript
import type { SvelteComponent } from 'svelte';
import { onMount } from 'svelte';
import Button from '$lib/components/Button.svelte';
import { formatDate } from '$lib/utils/date';
```

### Naming Conventions

| Element          | Convention            | Example                             |
| ---------------- | --------------------- | ----------------------------------- |
| Components       | PascalCase            | `Header.svelte`, `UserCard.svelte`  |
| Utilities        | camelCase             | `formatDate.ts`, `validateEmail.ts` |
| Types/Interfaces | PascalCase            | `UserData`, `ApiResponse`           |
| Constants        | UPPER_SNAKE_CASE      | `MAX_RETRY_COUNT`, `API_BASE_URL`   |
| CSS Classes      | kebab-case (Tailwind) | `bg-white`, `text-midnight`         |

### File Organization

```
src/
├── lib/
│   ├── components/    # Reusable UI components
│   ├── utils/         # Helper functions
│   ├── types/         # TypeScript types
│   └── stores/        # Svelte stores (if needed)
├── routes/
│   ├── +page.svelte   # Route page
│   ├── +layout.svelte # Layout wrapper
│   └── api/           # API routes
└── app.css            # Global styles
```

### Svelte 5 Runes Syntax

Use runes instead of legacy `export let` and reactive statements:

```svelte
<script lang="ts">
	// Props - use $props() instead of export let
	let { title = 'Default', count = 0 } = $props();

	// Reactive state - use $state()
	let isOpen = $state(false);

	// Derived values - use $derived()
	let doubled = $derived(count * 2);

	// Effects - use $effect()
	$effect(() => {
		console.log('Count changed:', count);
	});

	// Event handlers
	function handleClick() {
		isOpen = !isOpen;
	}
</script>

<button onclick={handleClick}>{title}: {count}</button>
```

### Error Handling

- Use try/catch with proper typing for async operations
- Return typed results from utility functions
- Display user-friendly error messages in UI

```typescript
async function fetchUser(id: string): Promise<User | null> {
	try {
		const response = await fetch(`/api/users/${id}`);
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		console.error('Failed to fetch user:', error);
		return null;
	}
}
```

### TailwindCSS v4

- Use utility classes for styling
- Custom colors defined in CSS (see `src/app.css`)
- Avoid custom CSS unless necessary; prefer Tailwind utilities

### TypeScript Best Practices

- Prefer `type` over `interface` for simple objects
- Use `import type` for type-only imports
- Avoid `any`; use `unknown` when type is uncertain
- Enable strict null checks

```typescript
// Good
type UserId = string;
interface User {
	id: UserId;
	name: string;
	email?: string; // Optional
}

// Avoid
interface User {
	id: any;
}
```

---

## Before Committing

1. Run type checking: `pnpm check`
2. Run linter: `pnpm lint`
3. Run formatter: `pnpm format`
4. Ensure build succeeds: `pnpm build`

---

## Useful Patterns

### Client-Side Navigation

```svelte
<a href="/about">About</a>
<button onclick={() => goto('/dashboard')}>Go</button>
```

### Loading Data in Routes

```typescript
// src/routes/+page.ts
export async function load() {
  return { data: 'example' };
}

// src/routes/+page.svelte
<script lang="ts">
  let { data } = $props();
</script>
```

### Form Actions

```typescript
// src/routes/+page.server.ts
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		// Handle form submission
	}
};
```
