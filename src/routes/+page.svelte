<script>
	import { db } from '$lib/db/registry';
</script>

{#each await db.snippets.getAll() as snippet}
	<div>
		<p>{snippet.title}</p>
	</div>
{/each}

<form {...db.snippets.create}>
	<label>
		<p>Title</p>
		<input name="title" />
	</label>
	<label>
		<p>Content</p>
		<input name="content" />
	</label>

	<button type="submit">Submit</button>
</form>
