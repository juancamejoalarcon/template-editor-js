import AddConditionButton from '../components/AddConditionButton.svelte'

const createIframe = () => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute'
    iframe.style.top = '0'
    iframe.style.width = '60px'
    iframe.style.height = '60px'
    iframe.style.right = '0'
    iframe.style.border = 'none'
    iframe.style.zIndex = '99'
    return iframe
}

const addCondition = (api, start, end) => {
    api.blocks.insert("IfCondition", { skipEndBlock: true }, {}, start, true);
    api.blocks.insert("EndCondition", {}, {}, end, true);
}

function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

export const onSelectionChanged = (api) => {

    let start = 0
    let end = 0

    let blockReference = null

    if (api) {
        const blockCount = api.blocks.getBlocksCount();
        let blocksSelectedCount = 0
        for (let i = 0; i < blockCount; i++) {
            const block = api.blocks.getBlockByIndex(i);

            if (block.selected) {
                blocksSelectedCount += 1
            }

            if (blocksSelectedCount > 1) {
                start = i
                break
            }
        }
        const showDropdown = blocksSelectedCount > 1

        if (showDropdown) {


            for (let i = start - 1; i < blockCount; i++) {
                const block = api.blocks.getBlockByIndex(i);

                if (!blockReference && checkVisible(block.holder)) {
                    blockReference = block.holder
                }
    
                if (!block.selected) {
                    end = i
                    break
                }
    
            }

            const iframe = createIframe();
            const { top, left } = blockReference.getBoundingClientRect()
            iframe.style.top = blockReference.offsetTop + 'px'
            iframe.style.left = left + 'px'

            document.querySelector('#editorjs').appendChild(iframe)

            var ifrDoc = iframe.contentWindow || iframe.contentDocument;
            if (ifrDoc.document) ifrDoc = ifrDoc.document;

            new AddConditionButton({ 
                target: iframe.contentDocument.body,
                props: { 
                    onButtonClicked: () => {
                        addCondition(api, start - 1, end + 1)
                        iframe.remove()
                    }
                } 
            })

            const onSelectionChanged = () => {
                iframe.remove()
                document.removeEventListener('selectionchange', onSelectionChanged)
            }

            document.addEventListener('selectionchange', onSelectionChanged)

        }
    }
}