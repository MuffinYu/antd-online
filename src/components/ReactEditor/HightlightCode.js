import Highlight, { Prism } from 'prism-react-renderer';
import theme from './theme';

export default code => (
  <Highlight Prism={Prism} code={code} theme={theme} language="jsx">
    {({ /**className, style, */ tokens, getLineProps, getTokenProps }) =>
      tokens.map((line, i) => (
        <div {...getLineProps({ line, key: i })}>
          {line.map((token, key) => (
            <span {...getTokenProps({ token, key })} />
          ))}
        </div>
      ))
    }
  </Highlight>
);
