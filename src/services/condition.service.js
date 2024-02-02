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

        if (indentLevel && block.holder && block.name !== 'EndCondition' && block.name !== 'IfCondition' && block.name !== 'ElseCondition') {

            if (indentLevel) {
                block.holder.classList.add(`indent-${indentLevel}`)
            }
        }

        if ((block.name === 'EndCondition' || block.name === 'IfCondition' || block.name === 'ElseCondition') && indentLevel > 1) {
            block.holder.classList.add(`indent-${indentLevel - 1}`)
        }
        // ElseCondition

        if (block.name === 'EndCondition') {
            indentLevel -= 1
        }
    }
}