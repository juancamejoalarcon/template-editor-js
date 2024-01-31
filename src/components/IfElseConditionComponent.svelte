<script>
  export let inline = false;
  export let conditionChanged = (condition) => {}

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
    ELSEIF (<span on:input={onConditionChange} class="condition-input-edit" contenteditable="true">condicion == resultado</span>)
  </span>
  <span>{endCondition}</span>
</span>

<style lang="scss">
  .condition-input {
    background-color: #EFF0F1;
    font-family: monospace;
    &-edit {
      border: none;
      outline: none;
    }
  }
</style>
