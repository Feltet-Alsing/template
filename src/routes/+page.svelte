<script>
	import { createSnippet, getAllSnippets } from '$lib/snippets.remote';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#each await getAllSnippets() as snippet}
	<div>
		<p>{snippet.title}</p>
	</div>
{/each}

<form {...createSnippet}>
	<label>
		<p>Title</p>
		<input name="title" />
	</label>
	<label>
		<p>Content</p>
		<input name="Content" />
	</label>

	<button type="submit">Submit</button>
</form>
