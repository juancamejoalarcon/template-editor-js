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

        if (indentLevel && block.holder && block.name !== 'IfEndCondition' && block.name !== 'IfCondition' && block.name !== 'IfElseCondition') {

            if (indentLevel) {
                block.holder.classList.add(`indent-${indentLevel}`)
            }
        }

        if ((block.name === 'IfEndCondition' || block.name === 'IfCondition' || block.name === 'IfElseCondition') && indentLevel > 1) {
            block.holder.classList.add(`indent-${indentLevel - 1}`)
        }
        // IfElseCondition

        if (block.name === 'IfEndCondition') {
            indentLevel -= 1
        }
    }
}