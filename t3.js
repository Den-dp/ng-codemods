export default function transformer (file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  return j(file.source)
    .find(j.ExpressionStatement, {
      expression: {
        value: 'use strict'
      }
    })
    .remove()
    .find(j.ExpressionStatement, {
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'FunctionExpression',
          body: {
            type: 'BlockStatement'
          }
        }
      }
    })
    .remove()
    /*
    .findVariableDeclarators('foo')
    .renameTo('bar')
    */
    /*.replaceWith(
      p => j.identifier(p.node.name.split('').reverse().join(''))
    )*/
    .toSource();
};
