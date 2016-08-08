export default function transformer (file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const { comments } = root.find(j.Program).get('body', 0).node;
  const {expression, statement, statements} = j.template;
  console.log(comments);
  root.find(j.VariableDeclaration).replaceWith(
    j.expressionStatement(j.callExpression(
      j.identifier('foo'),
      []
    ))
  );
  root.get().node.comments = comments;

  return root.toSource();
};
