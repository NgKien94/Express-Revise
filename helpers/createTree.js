// Tree category
function createTree(items, parentId = "") {
    const tree = []
    items.forEach((item) => {
        const newItem = item;
        if (item.parent_id == parentId) {
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
    const tree = createTree(items,parentId)
    return tree;
}