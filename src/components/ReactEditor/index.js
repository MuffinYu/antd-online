import React, { Component } from 'react';
import HightlightCode from './HightlightCode';
import Editor from 'react-simple-code-editor';

export default class extends Component {
  render() {
    const { code, onValueChange, style, ...rest } = this.props;
    return (
      <Editor
        value={code}
        padding={10}
        highlight={HightlightCode}
        onValueChange={onValueChange}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          background: 'rgb(40, 44, 52)',
          lineHeight: '18px',
          ...style,
        }}
        {...rest}
      />
    );
  }
}
