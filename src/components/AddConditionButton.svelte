<script>
  import LogicIcon from '../assets/icons/logic-icon.svg?raw'
  export let onButtonClicked = () => {}

</script>

<button 
  on:click={onButtonClicked}
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
  {@html LogicIcon}
</button>

<style lang="scss">
</style>
