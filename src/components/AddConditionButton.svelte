<script>
  import IfLogicIcon from '@/assets/icons/if-tool-icon.svg?raw'
  import ForLogicIcon from '@/assets/icons/for-tool-icon.svg?raw'
  export let onButtonClicked = () => {}
  export let type = 'if'

  const marginTop = type === 'if' ? '0px' : '50px'

</script>

<button 
  on:click={onButtonClicked}
  style:margin-top={marginTop}
  style="
  position: absolute;
  z-index: 99;
  width:40px;
  height:40px;
  background-color: #fff;
  border: 1px solid #E8E8EB;
  box-shadow: 0 3px 15px -3px #0d142121;
  border-radius: 6px;
  cursor: pointer;
">
  {#if type === 'if'}
    {@html IfLogicIcon}
  {:else}
    {@html ForLogicIcon}
  {/if}
</button>

<style lang="scss">
</style>
