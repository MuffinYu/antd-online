import React, { Component } from 'react';
import styles from './index.css';
import { Row, Col } from 'antd';

class BasicLayout extends Component {
  render(props) {
    console.log('BasicLayout');
    return (
      <Row type="flex" justify="center">
        <Col xxl={18} xl={19} lg={20} msd={24}>
          <div className={styles.normal}>
            {/* {React.cloneElement(, { widgetList })} */}
            {this.props.children}
          </div>
        </Col>
      </Row>
    );
  }
}

export default BasicLayout;
