import React from "react";
import {Modal} from "antd";
import "./index.less";

class Tips {
  alert(content) {
    Modal.info({
      title: '个人中心',
      closable: false,
      centered: true,
      destroyOnClose: true,
      maskClosable: true,
      width: 300,
      content: (
        <div>
          <p>{content}</p>
        </div>
      )
    });
  }
}

export default Tips;
