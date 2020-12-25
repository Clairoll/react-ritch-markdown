/*
 * @Autor: Clairoll
 * @Date: 2020-12-24 14:06:00
 * @LastEditTime: 2020-12-25 15:16:53
 * @Email: 1755033445@qq.com
 * @description: 
 */
import React from 'react'
import { render } from 'react-dom'
import Editors from '../../components' // 引入组件

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    getEditorValue = (value) => {
        console.log(value)
    }

    refadd = React.createRef();

    componentDidMount() {
        console.log(this.refadd.current)
    }

    render() {
        return <Editors markUrl="/api/site/markdown_image" ref={this.refadd} isButton={true} getEditorValue={this.getEditorValue}/>
    }
}

render(<App />, document.getElementById('root'))