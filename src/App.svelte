<script>
  import { onMount } from "svelte";
  import { TemplateEditor } from "./classes/TemplateEditor";
  import { transformToEjs } from "./services/transform-to-ejs.service";

  let editor = null;
  const placeholder = "Start writing here";

  const demoData = {};

  onMount(() => {
    editor = new TemplateEditor({
      holder: "editorjs",
      placeholder,
      data: demoData,
    });
  });

  window.saveData = () => {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
        transformToEjs(outputData);
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
