## Ant Design Online 在线组件编辑

> ant design 是业界非常优秀的react组件库，但是有个缺点就是，组件的使用无法直接在官方文档中进行编辑和查看效果，虽然接入了CodeSandBox和CodePen，但是碍于网速，每次打开都非常慢，因此做了一个简单的在线编辑的页面。

### 实现技术方式

- 通过谷歌的[CDN](https://unpkg.com/)引入[@babel/standalone](https://unpkg.com/@babel/standalone/babel.min.js)，并注册一个babel插件 --babel-module，主要将 `import { Button } from 'antd'` 这样的ES6模块语法转换成 `var { Button } = window['antd']` 这样的属性读取方式，代码如下。

```javascript 
Babel.registerPlugin("babel-module", function (babel) {
var t = babel.types; // AST模块
return {
  visitor: {
    Identifier(path) {
      if (path.node.name === "ReactDOM") {
        path.replaceWith(
          t.memberExpression(
            t.identifier("window"),
            t.stringLiteral("ReactDOM"),
            true
          )
        );
      }
    },
    ImportDeclaration(path) {
      const { node } = path;
      const {
        objectPattern,
        objectProperty,
        variableDeclaration,
        variableDeclarator
      } = t;
      var specifiers = node.specifiers.filter(
        specifier => specifier.type === "ImportSpecifier"
      );
      var memberExp = t.memberExpression(
        t.identifier("window"),
        node.source,
        true
      ); // 成员表达式
      var varDeclare = variableDeclaration("var", [
        variableDeclarator(
          objectPattern(
            specifiers.map(specifier =>
              objectProperty(
                specifier.local,
                specifier.local,
                false,
                true
              )
            )
          ),
          memberExp
        )
      ]);
      path.replaceWith(varDeclare);
    }
  }
};
});
``` 

- 同样通过CDN，引入antd，react，react-dom，momnet的umd格式的包，不懂的同学，可以去看webpack的[output.libraryTarget](https://www.webpackjs.com/configuration/output/#output-librarytarget)相关说明。

- react-simple-code-editor 提供编辑器功能，prism-react-renderer 提供语法高亮（目前的高亮还是有点辣眼睛，以后会完善下）。

- 通过fetch抓取对应组件的文档，[DOMParser](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser) 拿到对应的文档内容，插入到页面中，实现切换和显示不同组件的文档。

### 说明

这样一个简单的在线组件编辑功能就实现完成了，欢迎大家使用，如果有任何问题、疑问或者交流，请在issue里面提出，作者会尽快回复。:bowtie: