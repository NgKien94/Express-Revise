// Tree category
let count = 0;
function createTree(items, parentId = "") {
    const tree = []
    items.forEach((item) => {

        if (item.parent_id === parentId) {
            const newItem = item;
            count++;
            newItem.index = count;
            const children = createTree(items, item.id)
            if (children.length > 0) {
                newItem.children = children;
            }

            tree.push(newItem);
        }

    });
    return tree;
}
//End tree category

module.exports.tree = (items,parentId="") =>{
    count = 0;
    const tree = createTree(items,parentId)
    return tree;
}