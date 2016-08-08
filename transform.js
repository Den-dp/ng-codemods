module.exports = function (fileInfo, api, options) {
    const j = api.jscodeshift;
    return j(fileInfo.source)
        // .find(j.FunctionExpression)
        // .find(j.ExpressionStatement)
        // .find(j.CallExpression)
        // .find(j.CallExpression, {callee: {object: {object: j.ThisExpression}, property: {name: 'bind'}}})


        // .find(j.CallExpression)
        // .filter(p=>{
        //     return p.node.callee.type=='MemberExpression' &&
        //         p.node.callee.property.type == 'Identifier' &&
        //         p.node.callee.property.name == 'module' &&
        //         p.node.callee.object.type == 'Identifier' &&
        //         p.node.callee.object.name == 'angular';
        // })

        // Find stuff that looks like this.xyz.bind(this)
        .find(j.CallExpression, {callee: {object: {object: j.ThisExpression}, property: {name: 'bind'}}})
        // Ensure that .bind() is being called with only one argument, and that argument is "this".
        .filter(p => p.value.arguments.length == 1 && p.value.arguments[0].type == "ThisExpression")
        // We can now replace it with ::this.xyz
        .replaceWith(p => j.bindExpression(null, p.value.callee.object))

        // .findVariableDeclarators('foo')
        // .renameTo('bar')
        .toSource();
}
