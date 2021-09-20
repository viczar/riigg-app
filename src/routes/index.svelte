<script>
	import Card from '$lib/card.svelte';
	import cpus from '$lib/data/cpus.js';
	import gpus from '$lib/data/gpus.js';

	let selectedCpu;
	let selectedGpu;

	let listMode = "cpu";

	$: displayCpu = selectedCpu ? selectedCpu.name : "Select CPU"
	$: displayGpu = selectedGpu ? selectedGpu.name : "Select GPU"
</script>

<h1 class="text-4xl text-gray-100 pt-10 py-20 px-20 font-display">riigg</h1>

<div class="flex justify-center gap-44">
	<div
		on:click={() => {listMode = "cpu"}}
		class="select-none bg-gray-600 text-gray-400 px-16 py-8 rounded-md border-dashed border-8 flex justify-center items-center border-gray-400 cursor-pointer
						hover:bg-cyan-400 hover:border-cyan-400 hover:text-cyan-900 transition-all duration-300 ease-in-out
						hover:transform hover:-translate-y-2 hover:shadow-lg"
	>
		<div class="font-bold text-4xl">{displayCpu}</div>
	</div>

	<div
		on:click={() => {listMode = "gpu"}}
		class="select-none bg-gray-600 text-gray-400 px-16 py-8 rounded-md border-dashed border-8 flex justify-center items-center border-gray-400 cursor-pointer
						hover:bg-cyan-400 hover:border-cyan-400 hover:text-cyan-900 transition-all duration-300 ease-in-out
						hover:transform hover:-translate-y-2 hover:shadow-lg"
	>
		<div class="font-bold text-4xl">{displayGpu}</div>
	</div>
</div>

{#if listMode === "cpu"}
<div class="text-gray-200 flex mx-12 mt-20 flex-wrap gap-x-24 gap-y-10 justify-center">
	{#each cpus as cpu}
		<Card
			handleSelect={() => selectedCpu = cpu}
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
{:else if listMode === "gpu"}
<div class="text-gray-200 flex mx-12 mt-20 flex-wrap gap-x-24 gap-y-10 justify-center">
	{#each gpus as gpu }
		<Card
			handleSelect={() => selectedGpu = gpu}
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
