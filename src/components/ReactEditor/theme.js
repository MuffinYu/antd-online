export default {
  plain: {
    // color: "#C5C8C6",
    color: '#ffffff',
    backgroundColor: '#1D1F21',
  },
  styles: [
    {
      types: ['prolog', 'comment', 'doctype', 'cdata'],
      style: {
        color: 'hsl(30, 20%, 50%)',
      },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
      style: {
        // color: "hsl(350, 40%, 70%)"
        color: 'rgb(252, 146, 158)',
      },
    },
    {
      types: ['attr-name', 'char', 'builtin', 'insterted'],
      style: {
        color: 'hsl(75, 70%, 60%)',
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable', 'language-css'],
      style: {
        color: 'hsl(40, 90%, 60%)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#e90',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: 'rgb(197, 165, 197)',
      },
    },
    {
      types: ['punctuation', 'symbol'],
      style: {
        opacity: '0.7',
        color: 'rgb(136, 198, 190)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(121, 182, 242)',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(250, 200, 99)',
      },
    },
    // {
    //   types: ["string"],
    //   style: {
    //     color: "#fff"
    //   }
    // }
  ],
};
