import edjsHTML from 'editorjs-html'

function IfCondition({data}){
    return `<% if (${data.condition}) { %>`
}

function IfElseCondition({data}){
    return `<% } else if (${data.condition}) { %>`
}

function IfEndCondition({data}){
    return `<% } %>`
}


export const transformToEjs = (blocksData) => {

    const edjsParser2 = edjsHTML({
        IfCondition,
        IfElseCondition,
        IfEndCondition
    });

    const parsed = edjsParser2.parse(blocksData);

    

    console.log(parsed.join());

}