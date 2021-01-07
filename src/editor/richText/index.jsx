/*
 * @Autor: Clairoll
 * @Date: 2020-08-25 15:17:35
 * @LastEditTime: 2021-01-06 16:32:46
 * @Email: 1755033445@qq.com
 * @description: 富文本编辑器
 */
import React from "react";
import { Upload, message } from "antd";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { FolderAddOutlined, PictureOutlined } from "@ant-design/icons";
import Axios from "axios";
import Table from "braft-extensions/dist/table";
import "braft-editor/dist/index.css";
import "braft-extensions/dist/table.css";

import "./index.less";

const options = {
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: 'border="1" style="border-collapse: collapse"', // 指定输出HTML时附加到table标签上的属性字符串
};

BraftEditor.use(Table(options));
class RichTexts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      defaultValue: BraftEditor.createEditorState(null),
    };

    this.extendControls = [
      {
        key: "antd-uploader",
        type: "component",
        component: (
          <Upload
            action="/api/site/image"
            accept="image/*"
            onChange={(info) =>
              this.uploadImageChange(info, this.state.editorState)
            }
            showUploadList={false}
            name="0"
            data={{
              name: "0",
            }}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <PictureOutlined />
            </button>
          </Upload>
        ),
      },
      {
        key: "antd-directory",
        type: "component",
        component: (
          <Upload
            action="/api/site/annex"
            onChange={(info) =>
              this.uploadFileChange(info, this.state.editorState)
            }
            name="0"
            showUploadList={false}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="上传文件"
            >
              <FolderAddOutlined />
            </button>
          </Upload>
        ),
      },
    ];
  }

  //图片上传回调
  uploadImageChange = (info, editorState) => {
    if (info.file.status === "done") {
      // 富文本图片上传成功，将图片地址加入富文本内容
      let data = ContentUtils.insertMedias(editorState, [
        { type: "IMAGE", url: info.file.response.data.url },
      ]);
      this.setState({ editorState: data });
      // 回调给父组件
      this.props.getValue(data.toHTML());
    } else if (info.file.status === "error") {
      message.error("图片上传失败");
    }
  };

  //文件上传回调
  uploadFileChange = (info, editorState) => {
    if (info.file.status === "done") {
      // 富文本文件上传成功，将图片地址加入富文本内容
      let data = ContentUtils.insertHTML(
        editorState,
        `<a target="_blank" href="${info.file.response.data.url}">${info.file.response.data.file_name}</a>`
      );

      this.setState({ editorState: data });
      // 回调给父组件
      this.props.getValue(data.toHTML());
    } else if (info.file.status === "error") {
      message.error("文件上传失败");
    }
  };

  // 内容改变
  onChange = (editorState) => {
    this.setState(
      {
        editorState: editorState,
      },
      this.props.getValue(editorState.toHTML())
    );
  };

  // 清空编辑器
  clearContent = () => {
    this.setState({ editorState: ContentUtils.clear(this.state.editorState) });
  };

  // 粘贴图片上传
  myUploadFn = (param) => {
    let obj = new FormData();
    obj.append("name", param.file.name);
    obj.append("0", param.file);
    Axios.post("/api/site/image", obj)
      .then((res) => {
        if (res.data && res.data.code === 0) {
          let data = res.data.data;
          param.success({
            url: data.url,
            meta: {
              id: data.id,
              title: data.name,
              alt: data.name,
            },
          });
        }
        console.log(res);
      })
      .catch((err) => {
        param.error({
          msg: "上传失败!",
        });
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.state.defaultValue) {
      this.setState({
        editorState: BraftEditor.createEditorState(prevProps.defaultValue),
        defaultValue: prevProps.defaultValue,
      });
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div id="myRitch">
        <BraftEditor
          value={editorState}
          onChange={this.onChange}
          media={{
            uploadFn: this.myUploadFn,
          }}
          id="editor-id"
          extendControls={this.extendControls}
        />
      </div>
    );
  }
}

RichTexts.defaultProps = {
  getValue: (data) => {
    return data;
  },
  defaultValue:''
};

export default RichTexts;
