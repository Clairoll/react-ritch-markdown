/*
 * @Autor: Clairoll
 * @Date: 2020-08-27 14:58:04
 * @LastEditTime: 2020-08-27 17:23:28
 * @Email: 1755033445@qq.com
 * @description: 基于react-markdown-editor-lite 的图片上传组件
 */
import React from "react";
import { PluginComponent } from "react-markdown-editor-lite";
import {
  Upload,
  Icon,
  Modal,
  message,
  Button,
  Form,
  Input,
  Row,
  Col,
} from "antd";

import "./index.less";

class Counter extends PluginComponent {
  // 这里定义插件名称，注意不能重复
  static pluginName = "image-upload";
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = "left";

  constructor(props) {
    super(props);
    this.state = {
      isShowModel: false,
    };
  }

  handleClick = () => {
    // 更新一下自身的state
    this.setState({
      isShowModel: true,
    });
  };

  handleCancel = () => {
    this.setState({ isShowModel: false });
  };

  //图片上传回调
  uploadChange = (info) => {
    if (info.file.status === "done") {
      this.props.form.setFieldsValue({ url: info.file.response.url });
    } else if (info.file.status === "error") {
      message.error("图片上传失败");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 插入Markdown
        let str = `[![${values.desc}](${values.url} "${values.desc}")](${values.link} "${values.desc}")`;
        this.editor.insertText(str);
        this.setState({isShowModel:false})
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <span
          className="button button-type-counter"
          title="插入图片"
          onClick={() => this.handleClick()}
        >
          <Icon type="picture" />
        </span>
        <Modal
          title="添加图片"
          visible={this.state.isShowModel}
          onCancel={() => this.handleCancel()}
          footer={null}
        >
          <Form
            labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <Form.Item label="图片地址">
              <Row gutter={20}>
                <Col span={16}>
                  {getFieldDecorator("url", {
                    rules: [{ required: true, message: "请输入图片地址!" }],
                  })(<Input size="large" placeholder="请输入图片地址" />)}
                </Col>
                <Col span={8}>
                  <Upload
                    action="/api/site/markdown_image"
                    accept="image/*"
                    onChange={(info) => this.uploadChange(info)}
                    showUploadList={false}
                  >
                    <Button size="large">
                      <Icon type="upload" /> 本地上传
                    </Button>
                  </Upload>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="图片描述">
              {getFieldDecorator("desc", {})(
                <Input size="large" placeholder="请输入图片描述" />
              )}
            </Form.Item>
            <Form.Item label="图片链接">
              {getFieldDecorator("link", {})(
                <Input size="large" placeholder="请输入图片链接" />
              )}
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24 }, sm: { span: 24 } }}>
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
const Counters = Form.create()(Counter);
export default Counters;
