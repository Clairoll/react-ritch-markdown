# react-ritch-markdown
基于React和antd 的编辑器（同时支持富文本和markdown，基于braft-editor和react-markdown-editor-lite的在封装）

## 相关依赖

```json
{
  "dependencies": {
    "@liradb2000/markdown-it-mermaid": "^0.4.1",
    "antd": "^4.9.4",
    "axios": "^0.21.1",
    "braft-editor": "^2.3.9",
    "braft-extensions": "^0.1.0",
    "highlight.js": "^10.5.0",
    "markdown-it": "^11.0.0",
    "markdown-it-toc": "^1.1.0",
    "react-markdown-editor-lite": "^1.2.2"
  }
}

```

## 支持参数

| 名称         | 描述           | 类型    | 默认  |                 备注                  |
| ------------ | -------------- | ------- | ----- | :-----------------------------------: |
| isRitch      | 是否显示富文本 | Boolean | false | true：显示富文本；false：显示markdown |
| defaultValue | 默认值         | string  | null  |                                       |

 ## 支持方法

### onChange实例

获取编辑器的值

```
onChange(value) {
	console.log(value)
}
```



## 基本使用示例

```jsx
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultValue: '',
        }
    }
	
    // 获取编辑器的内容
    onChange = (value) => {
        console.log(value)
    }

    refadd = React.createRef();

	// 设置默认值
    componentDidMount() {
        this.setState({ defaultValue: '1236' })
    }

    handleClickLastValue = async () => {
        this.setState({ defaultValue: '7896' })
    }
	
    // 清空编辑器
    handleClear = () => {
        this.refadd.current.clearContent()
    }

    render() {
        const { defaultValue } = this.state
        return <div>
            <Button onClick={() => this.handleClickLastValue()}>
                恢复上一次内容
            </Button>
            <Button onClick={() => this.handleClear()}>
                清除内容
            </Button>
            <Editors
                ref={this.refadd}
                onChange={this.onChange}
                isRitch={true}
                defaultValue={defaultValue}
            />
        </div>
    }
}
```

