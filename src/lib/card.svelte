<script>
	import { fade, fly } from "svelte/transition";

	export let name;
	export let imageLink;
	export let price;
	export let trait1Value;
	export let trait1Extra;
	export let trait1Name;
	export let trait2Value;
	export let trait2Extra;
	export let trait2Name;
	export let buyLink;

	export let handleSelect;

	let displayName = name;

</script>

<div
	on:mouseover={() => displayName = "SELECT"}
	on:focus={() => displayName = "SELECT"}
	on:mouseout={() => displayName = name}
	on:blur={() => displayName = name}
	on:click={() => handleSelect()}
	in:fly
	out:fade
	class="group cursor-pointer bg-gray-800 rounded-lg p-2 w-72 flex flex-col shadow-lg border-solid border-4 border-gray-600
					hover:bg-cyan-400 hover:text-cyan-900 hover:border-cyan-400
					 hover:transform hover:-translate-y-4
					 transition-all duration-300 ease-in-out
					"
>
	<h3 class="font-medium self-start text-lg mb-8 pl-4 pt-3">{displayName.toUpperCase()}</h3>
	<img class="object-contain h-36 mb-8" src={imageLink} alt="" />
	<div class="text-2xl mb-8 self-center font-medium">${price}</div>
	<div class="flex justify-around mb-8">
		<div>
			<div class="text-2xl font-medium">{trait1Value} <span class="text-sm">{trait1Extra}</span></div>
			<div class="font-medium">{trait1Name}</div>
		</div>
		<div>
			<div class="text-2xl font-medium">{trait2Value} <span class="text-sm">{trait2Extra}</span></div>
			<div class="font-medium">{trait2Name}</div>
		</div>
	</div>
	<div class="flex justify-around mb-2">
		<button
			class="bg-emerald-400 py-2 px-4 rounded-md text-emerald-50 font-medium shadow-xl group-hover:bg-cyan-900 transition-all duration-300 ease-in-out"
			>Buy on Amazon</button
		>
	</div>
</div>
