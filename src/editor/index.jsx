import React, { useState } from "react";
import RichTexts from "./richText/index.jsx";
import MarkDown from "./markdown/index.jsx";
import { Button } from "antd";
import "./index.less";

const Editors = (props) => {
  const [isRitch, setIsRitch] = useState(true);
  const getValue = (value) => {
    console.log(value, "123");
    //  返回给父组件
    // props.change()
  };
  return (
    <div id="editors">
      <div className="changeButton">
        <Button onClick={() => setIsRitch(!isRitch)}>
          {isRitch ? "文本格式" : "MarkDown"}
        </Button>
      </div>
      {isRitch ? (
        <RichTexts getValue={getValue} />
      ) : (
        <MarkDown getValue={getValue} />
      )}
    </div>
  );
};

export default Editors;
