<script>
  import CloseIcon from '../assets/icons/circle-xmark-solid.svg?raw'
  export let inline = false;
  export let conditionChanged = (condition) => {}
  export let onRemove = null

  const remove = onRemove || function () {}

  const startCondition = ''
  const endCondition = ''

  const onConditionChange = (e) => {
    const condition = e.target.textContent
    conditionChanged(condition)
  }
</script>

<span class="condition-container" class:inline>
  <span>{startCondition}</span>
  <span class="condition-input">
    IF (<span on:input={onConditionChange} class="condition-input-edit" contenteditable="true">condicion == resultado</span>)
  </span>
  <span>{endCondition}</span>
  {#if onRemove}
  <span class="close-icon" on:click={onRemove} on:keydown={onRemove} role="button" tabindex="0">
    {@html CloseIcon}
  </span>
  {/if}
</span>

<style lang="scss">
  .condition-container {
    &:hover {
      .close-icon {
        display: inline-block;
      }
    }
  }
  .condition-input {
    background-color: yellow;
    &-edit {
      border: none;
      outline: none;
    }
  }
  .close-icon {
    position: absolute;
    display: none;
    cursor: pointer;
    width: 10px;
  }
</style>
