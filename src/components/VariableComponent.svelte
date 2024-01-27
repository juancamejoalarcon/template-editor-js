<script>
  import {onMount} from 'svelte';
  export let text = '';
  let container;

  const start = '{{'
  const end = '}}'

  onMount(() => {
		container.appendChild(text);
	});

</script>

<span>
  <span contenteditable="false">{ start }</span>
  <span class="variable-container" bind:this={container} />
  <span contenteditable="false">{ end }</span>
</span>

<style lang="scss">
  .variable-container {
    background-color: yellow;
  }
</style>
