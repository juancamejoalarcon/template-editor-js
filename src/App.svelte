<script>
  import { onMount } from "svelte";
  import { TemplateEditor } from "./classes/TemplateEditor";
  import { transformToEjs } from "./services/transform-to-ejs.service";

  let editor = null;
  const placeholder = "Start writing here";

  const demoData = {
    time: 1706888827368,
    blocks: [
      {
        id: "M8NhuqNELz",
        type: "header",
        data: {
          text: "Contrato",
          level: 3,
        },
      },
      {
        id: "PQ5Y6kGKW4",
        type: "IfCondition",
        data: {
          type: "IF",
          condition: "contrato == 'paga en 4'",
        },
      },
      {
        id: "hEPlK-l0W1",
        type: "paragraph",
        data: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vulputate arcu ut nisi ultrices, at dictum dolor consectetur. <span class="condition-start condition-id-55tq7h" contenteditable="false"><span class="condition-container s-gOXKldPR30XW inline"><span class="s-gOXKldPR30XW">[</span> <span class="condition-input s-gOXKldPR30XW">IF (<span class="condition-input-edit s-gOXKldPR30XW" contenteditable="true">tipocosa == caca</span>)</span> <span class="s-gOXKldPR30XW">]</span> <span class="close-icon s-gOXKldPR30XW" role="button" tabindex="0"></span></span></span>Donec nec augue quis orci tempor hendrerit nec eget est<span class="condition-end condition-id-55tq7h" contenteditable="false"><span class="condition-container s-gOXKldPR30XW inline"><span class="s-gOXKldPR30XW">[</span> <span class="condition-input s-gOXKldPR30XW">ENDIF</span> <span class="s-gOXKldPR30XW">]</span> </span></span>. Maecenas accumsan sagittis risus at condimentum. Fusce metus dui, iaculis eu finibus a, iaculis at .Donec lobortis accumsan bibendum.',
        },
      },
      {
        id: "3uPd2Trp_a",
        type: "EndCondition",
        data: {
          type: "ENDIF",
        },
      },
    ],
    version: "2.28.2",
  };

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
        transformToEjs(outputData)
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
