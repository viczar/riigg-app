<script>
	import Card from '$lib/card.svelte';
	import cpus from '$lib/data/cpus.js';
	import gpus from '$lib/data/gpus.js';
	import lunr from 'lunr';
	import _ from 'lodash';
	import { fade } from 'svelte/transition';

	let cpuIdx = lunr(function () {
		this.ref('id');
		this.field('name');
		this.field('manufacturer');
		this.field('architecture');

		cpus.forEach(function (cpu) {
			this.add(cpu);
		}, this);
	});

	let gpuIdx = lunr(function () {
		this.ref('id');
		this.field('name');
		this.field('manufacturer');

		gpus.forEach(function (gpu) {
			this.add(gpu);
		}, this);
	});

	let selectedCpu;
	let selectedGpu;

	let searchCpu = '';
	let searchGpu = '';

	$: cpuList =
		searchCpu === ''
			? cpus
			: cpus.filter((cpu) =>
					cpuIdx
						.search(searchCpu)
						.map((i) => i.ref)
						.includes(String(cpu.id))
			  );
	$: gpuList =
		searchGpu === ''
			? gpus
			: gpus.filter((gpu) =>
					gpuIdx
						.search(searchGpu)
						.map((i) => i.ref)
						.includes(String(gpu.id))
			  );

	let listMode = 'cpu';

	$: displayCpu = selectedCpu ? selectedCpu.name : 'Select CPU';
	$: displayGpu = selectedGpu ? selectedGpu.name : 'Select GPU';
</script>

<div
	class="w-full z-10 flex justify-center gap-x-10 items-center bg-gray-700 py-4 shadow-lg text-gray-400 fixed top-0"
>
	{#key selectedCpu}
		<button
			on:click={() => {
				listMode = 'cpu';
			}}
			class={`
			px-4 py-2 rounded-md border-4 flex justify-center items-center
			${
				selectedCpu
					? 'bg-gray-800 text-cyan-500 border-solid  border-cyan-500'
					: 'bg-gray-600 text-gray-400 border-dashed border-gray-400'
			}
			hover:bg-cyan-400 hover:border-cyan-400 hover:text-cyan-900 
			transform hover:-translate-y-2 hover:shadow-lg
			transition duration-300`}
		>
			<div class="font-bold text-xl">{displayCpu}</div>
		</button>
	{/key}
	<div class:text-cyan-500={selectedCpu && selectedGpu} class="select-none font-display text-2xl">
		+
	</div>
	<button
		on:click={() => {
			listMode = 'gpu';
		}}
		class={`
			px-4 py-2 rounded-md border-4 flex justify-center items-center
			${
				selectedGpu
					? 'bg-gray-800 text-cyan-500 border-solid  border-cyan-500'
					: 'bg-gray-600 text-gray-400 border-dashed border-gray-400'
			}
			hover:bg-cyan-400 hover:border-cyan-400 hover:text-cyan-900 
			hover:transform hover:-translate-y-2 hover:shadow-lg
			transition-all duration-300 ease-in-out`}
	>
		<div class="font-bold text-xl">{displayGpu}</div>
	</button>
</div>

<div class="text-gray-200 pt-32 px-4 fixed left-2 w-96 flex flex-col gap-8">
	<div>
		<div class="mb-2 text-lg">The Witcher 3</div>
		<div class="flex gap-4">
			<img src="/images/the_witcher_3_285x380.jpg" alt="" class="object-fill w-24" />
			<div>
				<div class="text-lg">High: <span class="text-2xl font-medium">60</span></div>
				<div class="text-lg">Medium: <span class="text-2xl font-medium">60</span></div>
				<div class="text-lg">Low: <span class="text-2xl font-medium">60</span></div>
			</div>
		</div>
	</div>
	<div>
		<div class="mb-2 text-lg">GTA V</div>
		<div class="flex gap-4">
			<img src="/images/grand_theft_auto_V_285x380.jpg" alt="" class="object-fill w-24" />
			<div>
				<div class="text-lg">High: <span class="text-2xl font-medium">60</span></div>
				<div class="text-lg">Medium: <span class="text-2xl font-medium">60</span></div>
				<div class="text-lg">Low: <span class="text-2xl font-medium">60</span></div>
			</div>
		</div>
	</div>
</div>

<div class="mt-32">
	{#if listMode === 'cpu'}
		<div class="flex justify-center mt-16">
			<input
				bind:value={searchCpu}
				class="p-2 rounded-lg text-base bg-gray-900 border-gray-400 border-4 text-gray-100 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-gray-900"
				placeholder="Search for cpus..."
			/>
		</div>

		<div class="ml-60 text-gray-200 flex mx-12 mt-10 flex-wrap gap-x-24 gap-y-10 justify-center">
			{#each cpuList as cpu}
				<Card
					handleSelect={() => (selectedCpu = cpu)}
					name={cpu.name}
					imageLink={`https://storage.rii.gg/${cpu.image_route}`}
					price={cpu.amazon_price}
					trait1Value={cpu.cores}
					trait1Extra={`(${cpu.threads})`}
					trait1Name="Cores"
					trait2Value={cpu.core_clock_base}
					trait2Extra="Ghz"
					trait2Name="Clock Speed"
					buyLink={cpu.amazon_link}
				/>
			{/each}
		</div>
	{:else if listMode === 'gpu'}
		<div class="flex justify-center mt-16">
			<input
				bind:value={searchGpu}
				class="p-2 rounded-lg text-base bg-gray-900 border-gray-400 border-4 text-gray-100 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:border-gray-900"
				placeholder="Search for gpus..."
			/>
		</div>

		<div class="ml-60 text-gray-200 flex mx-12 mt-10 flex-wrap gap-x-24 gap-y-10 justify-center">
			{#each gpuList as gpu}
				<Card
					handleSelect={() => (selectedGpu = gpu)}
					name={gpu.name}
					imageLink={`https://storage.rii.gg/${gpu.image_route}`}
					price={gpu.amazon_price}
					trait1Value={gpu.memory_size}
					trait1Extra="Gbs"
					trait1Name="Memory"
					trait2Value={gpu.boost_clock}
					trait2Extra="Mhz"
					trait2Name="Boost Clock"
					buyLink={gpu.amazon_link}
				/>
			{/each}
		</div>
	{/if}
</div>
