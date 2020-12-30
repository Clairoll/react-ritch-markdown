/*
 * @Autor: Clairoll
 * @Date: 2020-12-24 14:06:00
 * @LastEditTime: 2020-12-30 15:24:15
 * @Email: 1755033445@qq.com
 * @description: 
 */
import React from 'react'
import { render } from 'react-dom'
import { Editors } from '../../components' // 引入组件
import { Button } from "antd";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultValue: '',
        }
    }

    onChange = (value) => {
        console.log(value)
    }

    refadd = React.createRef();

    componentDidMount() {
        this.setState({ defaultValue: '1236' })
    }

    handleClickLastValue = async () => {
        this.setState({ defaultValue: '7896' })
    }

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

render(<App />, document.getElementById('root'))