<script>
  import { onMount } from "svelte";
  import { TemplateEditor } from "./classes/TemplateEditor";
  import { transformToEjs } from './services/transform-to-ejs.service'

  let editor = null;

  onMount(() => {
    editor = new TemplateEditor({
      holder: "editorjs",
      placeholder: "Let`s write an awesome story!",
    });
  });

  window.saveData = () => {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
        // transformToEjs(outputData)
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };
</script>

<main>
  <div id="editorjs"></div>
</main>

<style>
</style>
