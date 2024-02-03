import ConditionComponent from '@/components/ConditionComponent.svelte'

export const indentConditions = (api) => {
    const blockCount = api.blocks.getBlocksCount();
    let indentLevel = 0
    for (let i = 0; i < blockCount; i++) {
        const block = api.blocks.getBlockByIndex(i);

        block.holder.classList.forEach(className => {
            if (className.includes('indent')) block.holder.classList.remove(className)
        })


        if (block.name === 'IfCondition') {
            indentLevel += 1
        }

        if (block.name === 'ForCondition') {
            indentLevel += 1
        }

        if (indentLevel && block.holder && block.name !== 'IfEndCondition' && block.name !== 'ForEndCondition' && block.name !== 'IfCondition' && block.name !== 'ForCondition' && block.name !== 'ElseCondition') {

            if (indentLevel) {
                block.holder.classList.add(`indent-${indentLevel}`)
            }
        }

        if ((block.name === 'IfEndCondition' || block.name === 'IfCondition' || block.name === 'ElseCondition') && indentLevel > 1) {
            block.holder.classList.add(`indent-${indentLevel - 1}`)
        }

        if ((block.name === 'ForEndCondition' || block.name === 'ForCondition') && indentLevel > 1) {
            block.holder.classList.add(`indent-${indentLevel - 1}`)
        }
        // ElseCondition
        if (block.name === 'IfEndCondition' || block.name === 'ForEndCondition') {
            indentLevel -= 1
        }
    }
}

export const reapplyConditionsToBlocks = (api) => {
    const blockCount = api.blocks.getBlocksCount();
    for (let i = 0; i < blockCount; i++) {
        const block = api.blocks.getBlockByIndex(i);
        if (block.name === 'header' || block.name === 'paragraph') {
            block.holder.querySelectorAll('.condition-start').forEach(element => {
                const statement = element.firstElementChild.getAttribute('data-statement')
                const condition = element.querySelector('.condition-input-edit').textContent
                const id = Array.from(element.classList).find(className => className.includes('condition-id-'))
                const { ifConditionContainer, endifConditionContainer } = getConditionContainers(id, condition, statement.toLowerCase())

                const currentEnd = block.holder.querySelector('.condition-end.' + id)
                element.replaceWith(ifConditionContainer)
                currentEnd.replaceWith(endifConditionContainer)

                onRemoveObserver(ifConditionContainer, id)
            });
        }
    }
}

export const getConditionContainers = (randomId, conditionText, type = 'if') => {
    const condition = conditionText || type === 'if' ? 'condicion == resultado' : 'item in items'
    const ifConditionContainer = document.createElement('span');
    ifConditionContainer.classList.add('condition-start')
    ifConditionContainer.classList.add(randomId)
    new ConditionComponent({
        target: ifConditionContainer,
        props: {
            statement: type === 'if' ? 'IF' : 'FOR',
            inline: true,
            condition,
            onRemove: () => {
                const containers = ifConditionContainer.parentElement.querySelectorAll(`.${randomId}`)
                containers.forEach((container) => {
                    container.remove()
                })
            }
        }
    })

    ifConditionContainer.setAttribute('contenteditable', 'false');

    const endifConditionContainer = document.createElement('span');
    endifConditionContainer.classList.add('condition-end')
    endifConditionContainer.classList.add(randomId)
    new ConditionComponent({
        target: endifConditionContainer,
        props: {
            statement: type === 'if' ? 'ENDIF' : 'ENDFOR',
            inline: true,
            isEnd: true
        }
    })

    endifConditionContainer.setAttribute('contenteditable', 'false')

    return {
        ifConditionContainer,
        endifConditionContainer
    }

}

export const onRemoveObserver = (el, randomId) => {
    const observer = new MutationObserver(function (mutations_list) {
        mutations_list.forEach(function (mutation) {
            mutation.removedNodes.forEach(function (removed_node) {
                if (removed_node.classList.contains(randomId)) {
                    const containers = el.parentElement?.querySelectorAll(`.${randomId}`)
                    containers?.forEach((container) => {
                        container.remove()
                    })
                    observer.disconnect()
                }
            });
        });
    });

    observer.observe(el.parentElement, { subtree: false, childList: true });
}