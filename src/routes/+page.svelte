<div class="container">
	<h1>SvelteKit Database Template</h1>
	<p>
		A <strong>code-first database template</strong> that auto-generates everything from a single configuration
		file.
	</p>

	<h2>🚀 Quick Start</h2>
	<pre>
		<code>
	1. Edit src/lib/db/entities.config.ts
	2. Run: yarn generate-entities
	3. Start using your database!
			</code>
		</pre>

	<h2>📦 What You Get</h2>
	<ul>
		<li>✅ Auto-generated SQL migrations</li>
		<li>✅ Type-safe CRUD operations</li>
		<li>✅ Zod validation</li>
		<li>✅ Form handlers</li>
		<li>✅ Database setup</li>
	</ul>

	<h2>💡 Example</h2>
	<p><strong>1. Define Entity (src/lib/db/entities.config.ts):</strong></p>
	<pre><code
			>export const entities = &#123;
  products: &#123;
    table: 'products',
    schema: z.object(&#123;
      name: z.string().min(1),
      price: z.number().positive()
    &#125;),
    fields: ['name', 'price']
  &#125;
&#125;;</code
		></pre>

	<p><strong>2. Generate:</strong></p>
	<pre><code>yarn generate-entities</code></pre>

	<p><strong>3. Use:</strong></p>
	<pre><code
			>&lt;script&gt;
  import &#123; db &#125; from '$lib/db/registry';
&lt;/script&gt;

&#123;#each await db.products.getAll() as product&#125;
  &lt;p&gt;&#123;product.name&#125; - $&#123;product.price&#125;&lt;/p&gt;
&#123;/each&#125;

&lt;form &#123;...db.products.create&#125;&gt;
  &lt;input name="name" required /&gt;
  &lt;input name="price" type="number" required /&gt;
  &lt;button&gt;Create&lt;/button&gt;
&lt;/form&gt;</code
		></pre>

	<h2>🛠️ Core Technologies</h2>
	<div>
		<span class="badge badge-yes">SvelteKit 2</span>
		<span class="badge badge-yes">PostgreSQL</span>
		<span class="badge badge-yes">Postgres.js</span>
		<span class="badge badge-yes">Zod</span>
		<span class="badge badge-yes">Docker</span>
		<span class="badge badge-yes">TypeScript</span>
	</div>

	<h2>📂 Project Structure</h2>
	<pre><code
			>src/lib/db/
  ├── entities.config.ts      ← Edit this to add entities
  ├── crud-factory.ts         Generic CRUD generator
  ├── entities.remote.ts      Auto-generated exports
  └── registry.ts             Auto-generated registry</code
		></pre>

	<h2>✅ Ideal For</h2>
	<div>
		<span class="badge badge-yes">Rapid prototyping</span>
		<span class="badge badge-yes">Template projects</span>
		<span class="badge badge-yes">Simple CRUD apps</span>
		<span class="badge badge-yes">Learning</span>
	</div>

	<h2>❌ Not Ideal For</h2>
	<div>
		<span class="badge badge-no">Complex migrations</span>
		<span class="badge badge-no">Production with existing data</span>
		<span class="badge badge-no">Migration rollbacks</span>
		<span class="badge badge-no">Multiple environments</span>
	</div>

	<h2>📖 Full Documentation</h2>
	<p>See <code>WORKFLOW_GUIDE.md</code> in the project root for complete details.</p>

	<hr style="margin: 3rem 0;" />

	<p style="text-align: center; color: #666;">
		<strong>Philosophy:</strong> Configuration over Implementation
	</p>
</div>

<style>
	.container {
		max-width: 900px;
		margin: 2rem auto;
		padding: 0 2rem;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}
	h1 {
		border-bottom: 3px solid #ff3e00;
		padding-bottom: 0.5rem;
	}
	h2 {
		margin-top: 2rem;
		color: #ff3e00;
	}
	pre {
		background: #f4f4f4;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
	}
	code {
		background: #f4f4f4;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9em;
	}
	.badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		margin: 0.25rem;
		border-radius: 4px;
		font-size: 0.85rem;
		font-weight: 500;
	}
	.badge-yes {
		background: #d4edda;
		color: #155724;
	}
	.badge-no {
		background: #f8d7da;
		color: #721c24;
	}
</style>
