import React, { Component } from 'react';
import { Row, Select, Spin } from 'antd';
import './index.css';

const { Option } = Select;
const ANTD = 'https://ant.design';

export default class extends Component {
  state = {
    widgetList: [],
    currentComponent: '/components/button-cn/',
    loadingDoc: true
  };
  componentDidMount() {
    this._fetchUrl(this.state.currentComponent, [this.pickApi, this.pickWidget]);
  }

  _fetchUrl(url, cbs = []) {
    console.log('will fetch', ANTD + url);
    fetch(ANTD + url)
      .then(res => res.text())
      .then(res => {
        cbs.forEach(item => item(res));
      })
      .catch(err => {
        console.error('err', err);
      });
  }

  pickApi = res => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(res, 'text/html');
    // console.log('pickApi', res, doc);
    const apiContent = doc.getElementsByClassName('api-container');
    // console.log('apiContent', apiContent);
    
    if (apiContent && apiContent[0]) {
      const container = document.getElementById('component-container');
      if (container.childNodes[0]) {
        container.replaceChild(apiContent[0], container.childNodes[0],);
      } else {
        container.appendChild(apiContent[0]);
      }
    }
    this.setState({
      loadingDoc: false
    });
  };

  pickWidget = res => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(res, 'text/html');
    // 左侧菜单栏
    const nav = doc.getElementsByClassName('ant-menu-submenu ant-menu-submenu-inline');
    const widgetList = Array.prototype.slice
      .apply(nav[0].querySelectorAll('a[href^="/components"]'))
      .map(item => {
        return {
          name: item.innerText,
          // url: item.href.replace('http://localhost:8000', ''),
          url: item.href.match(/\/components\D+/)[0],
        };
      });
    this.setState({
      widgetList,
    });
    // console.log('widgetList', nav[0].querySelectorAll('a[href^="/components"]'), widgetList);
  };

  chooseWidget = url => {
    console.log('url', url);
    this.setState({
      loadingDoc: true,
      currentComponent: url
    });
    this._fetchUrl(url, [this.pickApi])
  };

  render() {
    const { widgetList, currentComponent, loadingDoc } = this.state;
    return (
      <Row>
        <Row type="flex" style={{ padding: '16px 16px 16px 0px', marginTop: 24 }}>
          <Row style={{ lineHeight: '32px', marginRight: 12, fontSize: '16px' }}>
            选择组件文档：
          </Row>
          <Select
            style={{ width: 250 }}
            showSearch
            onChange={this.chooseWidget}
            value={currentComponent}
          >
            {widgetList.map(item => {
              return (
                <Option key={item.url} value={item.url}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <Row>
            <a
              style={{ lineHeight: '32px', marginLeft: 12, fontSize: '16px' }}
              href={`${ANTD}${currentComponent}#API`}
              target="_blank"
              rel="noopener noreferrer"
            >
              官方文档
            </a>
          </Row>
        </Row>
        <Spin spinning={loadingDoc}>
          <div id="component-container" />
        </Spin>
      </Row>
    );
  }
}
