<script>
  export let inline = false;

  const startCondition = ''
  const endCondition = ''
</script>

<span class="condition-container" class:inline>
  <span>{startCondition}</span>
  <span class="condition-input">
    ENDIF
  </span>
  <span>{endCondition}</span>
</span>

<style lang="scss">
  .condition-input {
    background-color: yellow;
  }
</style>
