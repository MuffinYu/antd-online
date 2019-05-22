// import React, { Component } from 'react';
// import styles from './index.css';
// import { Row, Col } from 'antd';

// class BasicLayout extends Component {
//   render(props) {
//     console.log('BasicLayout');
//     return (
//       <Row type="flex" justify="center">
//         <Col xxl={18} xl={19} lg={20} msd={24}>
//           <div className={styles.normal}>
//             {/* {React.cloneElement(, { widgetList })} */}
//             {this.props.children}
//           </div>
//         </Col>
//       </Row>
//     );
//   }
// }

// export default BasicLayout;

import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip, message } from 'antd';
import './index.css';
import '../pages/index.css';
import ReactEditor from '../components/ReactEditor';
import ApiContainer from '../components/ApiContainer';
import copy from 'copy-to-clipboard';
import antdonline from '../assets/antdesign-online.svg';

export default class extends Component {
  state = {
    error: null,
    sourceCode: `import { Button } from 'antd';
class Demo extends React.Component {
  btnClick = () => {
    console.log('button clicked');
  }
  render() {
    return (
      <div style={{ width: 450, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
    )
  }
}
ReactDOM.render(
  <Demo />
, mountNode);
    `,
  };

  componentDidMount() {
    this._runCode();
  }

  onValueChange = v => {
    console.log('onValueChange', v);
    this.setState({
      sourceCode: v,
    });
  };
  _runCode = () => {
    try {
      const { sourceCode } = this.state;
      // eslint-disabled
      const compiledCode = window.Babel.transform(sourceCode, {
        presets: ['react'],
        plugins: ['babel-module', 'proposal-class-properties'],
        ast: true,
      }).code;
      // eslint-disable-next-line no-new-func
      new Function('React', 'ReactDOM', 'mountNode', compiledCode)(
        React,
        window.ReactDOM,
        document.getElementById('result-preview'),
      );
      this.setState({
        error: null,
      });
    } catch (error) {
      this.setState({
        error,
      });
      window.ReactDOM.render(null, document.getElementById('result-preview'));
      console.error('error', error);
    }
  };

  render() {
    console.log('pages');

    const { sourceCode, error } = this.state;

    return (
      <Row className="main" type="flex" justify="center">
        <Col xxl={18} xl={19} lg={20} msd={24}>
          <h1 style={{ margin: '20px 0px', color: '#666' }}>
            <img
              src={antdonline}
              alt="antdesign-online"
              style={{ width: '40px', height: '40px', marginRight: 24 }}
            />
            Ant Design Online
            <a
              className="gh-btn"
              href="https://github.com/MuffinYu/antd-online.git"
              target="_blank"
            >
              <span className="gh-ico" aria-hidden="true" />
              <span className="gh-text">Star</span>
            </a>
          </h1>
          <div className="result" id="result-preview" />
          {error && <span className="showerr">{error.message || error}</span>}
          <div className="editor">
            <Row type="flex" justify="end" className="operation">
              <Tooltip placement="top" title="复制代码">
                <Icon
                  type="copy"
                  style={{ fontSize: '24px', cursor: 'pointer', marginRight: '20px' }}
                  onClick={() => {
                    copy(sourceCode);
                    message.success('已复制');
                  }}
                />
              </Tooltip>
              <Tooltip placement="top" title="运行">
                <Icon
                  type="play-circle"
                  style={{ fontSize: '24px', cursor: 'pointer' }}
                  onClick={this._runCode}
                />
              </Tooltip>
            </Row>
            <ReactEditor
              code={sourceCode}
              onValueChange={this.onValueChange}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                color: 'rgb(136, 198, 190)',
                minHeight: 300,
                maxHeight: 600,
                overflow: 'auto',
              }}
              padding={10}
            />
          </div>
          <ApiContainer />
        </Col>
      </Row>
    );
  }
}
