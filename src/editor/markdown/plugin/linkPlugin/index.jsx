/*
 * @Autor: Clairoll
 * @Date: 2020-08-27 14:58:04
 * @LastEditTime: 2020-12-23 15:10:21
 * @Email: 1755033445@qq.com
 * @description: 基于react-markdown-editor-lite 的链接组件
 */
import React from "react";
import { PluginComponent } from "react-markdown-editor-lite";
import { Modal, Button, Form, Input } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import "./index.less";

class Counter extends PluginComponent {
  // 这里定义插件名称，注意不能重复
  static pluginName = "link-plugin";
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = "left";

  constructor(props) {
    super(props);
    this.state = {
      isShowModel: false,
    };
  }

  formRef = React.createRef();

  handleClick = () => {
    // 更新一下自身的state
    this.setState({
      isShowModel: true,
    });
  };

  handleCancel = () => {
    this.setState({ isShowModel: false });
  };

  handleSubmit = (values) => {
    // 插入Markdown
    let str = `[${values.desc}](${values.url} "${values.desc}")`;
    this.editor.insertText(str);
    this.setState({ isShowModel: false });
    this.formRef.current.resetFields();
  };

  render() {
    return (
      <>
        <span
          className="button button-type-counter"
          title="插入链接"
          onClick={() => this.handleClick()}
        >
          <LinkOutlined />
        </span>
        <Modal
          title="添加链接"
          visible={this.state.isShowModel}
          onCancel={() => this.handleCancel()}
          footer={null}
        >
          <Form
            ref={this.formRef}
            onFinish={this.handleSubmit}
            className="login-form"
          >
            <Form.Item
              label="链接地址"
              name="url"
              rules={[{ required: true, message: "请输入链接地址!" }]}
            >
              <Input size="large" placeholder="请输入链接地址" />
            </Form.Item>
            <Form.Item
              label="链接标题"
              name="desc"
              rules={[{ required: true, message: "请输入链接标题!" }]}
            >
              <Input size="large" placeholder="请输入链接标题" />
            </Form.Item>

            <Form.Item>
              <div className="footer">
                <Button size="large" htmlType="submit">
                  确定
                </Button>
                <Button size="large" onClick={() => this.handleCancel()}>
                  取消
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
export default Counter;
