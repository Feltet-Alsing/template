<script>
	import { db } from '$lib/db/registry';
</script>

<h1>Products</h1>

{#each await db.products.getAll() as product}
	<div>
		<strong>{product.name}</strong> - ${product.price}
		{#if product.description}
			<p>{product.description}</p>
		{/if}
	</div>
{/each}

<h2>Add Product</h2>
<form {...db.products.create}>
	<label>
		<p>Name</p>
		<input name="name" required />
	</label>

	<label>
		<p>Price</p>
		<input name="price" required />
	</label>

	<label>
		<p>Description</p>
		<textarea name="description"></textarea>
	</label>

	<button type="submit">Add Product</button>
</form>
