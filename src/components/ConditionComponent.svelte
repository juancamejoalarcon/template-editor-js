<script>
  import CloseIcon from '@/assets/icons/xmark-solid.svg?raw'
  export let inline = false;
  export let conditionChanged = (condition) => {}
  export let onRemove = null
  export let statement = 'IF'
  export let condition = statement === 'IF' ? 'condicion == resultado' : 'item in items'
  export let isEnd = false

  const remove = onRemove || function () {}

  const startCondition = '['
  const endCondition = ']'

  const startBracket = '('
  const endBracket = ')'

  const onConditionChange = (e) => {
    condition = e.target.textContent
    conditionChanged(condition)
  }
</script>

<span class="condition-container" class:inline data-statement={statement}>
  <span>{startCondition}</span>

  {#if !isEnd}
    <span class="condition-input">
      {statement} {startBracket}<span on:input={onConditionChange} class="condition-input-edit" contenteditable="true">{condition}</span>{endBracket}
    </span>
  {:else}
    <span class="condition-input">
      {statement}
    </span>
  {/if}

  <span>{endCondition}</span>

  {#if onRemove}
    <span class="close-icon" on:click={onRemove} on:keydown={onRemove} role="button" tabindex="0">
      {@html CloseIcon}
    </span>
  {/if}
</span>

<style lang="scss">

  .condition-container {
    cursor: default;

    &:hover,
    &:focus {
      .close-icon {
        display: inline-block;
      }
    }
    &.inline {
      .close-icon {
        margin-left: -22px;
        margin-top: -5px;
        top: auto;
      }
    }
  }
  .condition-input {
    background-color: #EFF0F1;
    font-family: monospace;
    cursor: default;
    &-edit {
      border: 1px solid transparent;
      outline: none;
      cursor: text;
      &:hover,
      &:focus {
        border: 1px dashed gray;
      }
    }
  }
  .close-icon {
    position: absolute;
    display: none;
    cursor: pointer;
    width: 10px;
    top: 2px;
    padding-left: 5px;
    color: grey;
  }
</style>
