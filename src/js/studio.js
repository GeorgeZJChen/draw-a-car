import React, { Component } from 'react';
import Draw from './draw.js'
import '../App.css'

class Studio extends Component {
  constructor(props){
    super(props)
    this.state = {
      renderFlag: 0,
      hasUnusedFrame: true
    }
    this.frames = []
  }
  componentDidMount(){
    this.addFrame()
  }
  getSketch(){
    return this.refs.draw.refs.element
  }
  getColour(){
    if(this.pickedColour)
      return this.pickedColour.slice()
    else
      return null
  }
  pickColour(colour){
    this.pickedColour = colour.slice()
  }
  pickTool(toolName){
    if(toolName==='RUBBER'){
      this.refs.draw.setMode(0)
    }
    else if (toolName==='PENCIL') {
      this.refs.draw.setMode(1)
    }
  }
  addFrame(){

    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = chars.length
    let id = ''
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    this.frames.unshift(id)

    this.setState((prevState)=>{
      return {
        renderFlag: ~prevState.renderFlag,
        hasUnusedFrame: true
      }
    })
  }
  getUnusedFrame(){
    const frame = this.refs[String(this.frames[0])]
    return frame
  }
  update(){
    const frame = this.refs[String(this.frames[0])]
    if(frame.state.used){
      this.setState({
        hasUnusedFrame: false
      })
    }
  }
  rotate(){
    if(!this.contour_n){
      this.contour_n = 1
    }
    else {
      ++ this.contour_n
    }
    const img_url = 'static/img/'+this.contour_n+'.jpg'
    window.App.addContour(img_url, ()=>{
      this.contour_n = 0
      this.rotate()
    })
  }
  render() {
    return (
      <React.Fragment>
      <div className='studio'>
        <div className='frame frame-input' style={{position:'relative', backgroundImage: 'url(static/img/timg.jpg)'}}>
          <div className='toolkit'>
            <div className='tool'>
              <input className='tool-radio' onChange={()=>this.pickTool('RUBBER')} type='radio' name='pick-tool'/>
              <div className='tool-manifest'>
                <img className='tool-icon' src='static/img/rubber.svg' alt=''/>
              </div>
            </div>
            <div className='tool'>
              <input className='tool-radio' onChange={()=>this.pickTool('PENCIL')} type='radio' name='pick-tool' defaultChecked/>
              <div className='tool-manifest'>
                <img className='tool-icon' src='static/img/pencil.svg' alt=''/>
              </div>
            </div>
            <div className='tool right'>
              <input className='tool-radio ckeckbox' onChange={()=>this.refs.draw.clear()} type='checkbox' name='clear'/>
              <div className='tool-manifest'>
                <img className='tool-icon' src='static/img/clear.png' alt=''/>
              </div>
            </div>
            <div className='tool right'>
              <input className='tool-radio ckeckbox' onChange={()=>this.rotate()} type='checkbox' name='clear'/>
              <div className='tool-manifest'>
                <img className='tool-icon' src='static/img/rotate.png' alt=''/>
              </div>
            </div>
          </div>
          <Draw ref='draw'/>
        </div>
        <div className='display' ref='display'>
          <div className='colour-picker' style={{display: this.state.hasUnusedFrame?'':'none'}}>
            <div className='colour-block'>
              <input className='colour-picker-radio' onChange={()=>{this.pickColour([20,20,200])}}  type='radio' name='pick-colour' defaultChecked/>
              <div className='colour-block-bg' style={{backgroundColor:'rgb(20, 20, 200)'}}></div>
            </div>
            <div className='colour-block'>
              <input className='colour-picker-radio' onChange={()=>{this.pickColour([200, 20, 20])}} type='radio' name='pick-colour'/>
              <div className='colour-block-bg' style={{backgroundColor:'rgb(200, 20, 20)'}}></div>
            </div>
            <div className='colour-block'>
              <input className='colour-picker-radio' onChange={()=>{this.pickColour([250, 250, 250])}} type='radio' name='pick-colour'/>
              <div className='colour-block-bg' style={{backgroundColor:'rgb(250, 250, 250)'}}></div>
            </div>
            <div className='colour-block'>
              <input className='colour-picker-radio' onChange={()=>{this.pickColour([130, 130, 130])}} type='radio' name='pick-colour'/>
              <div className='colour-block-bg' style={{backgroundColor:'rgb(130, 130, 130)'}}></div>
            </div>
            <div className='colour-block'>
              <input className='colour-picker-radio' onChange={()=>{this.pickColour([20,20,20])}} type='radio' name='pick-colour'/>
              <div className='colour-block-bg' style={{backgroundColor:'rgb(20, 20, 20)'}}></div>
            </div>
          </div>
          <button className='btn-add-frame' onClick={()=>this.addFrame()}
            style={{display:this.state.hasUnusedFrame?'none':''}}
          >+</button>
          {
            this.frames.map((data,index)=>{
              return (
                <OutputFrame ref={data} key={data}/>
              )
            })
          }
        </div>
      </div>
      </React.Fragment>

    )
  }


}
class OutputFrame extends Component {
  constructor(props){
    super(props)
    this.state = {
      used: false
    }
  }
  use(){
    this.setState({
      used: true
    })
  }
  render(){
    return(
      <div className='frame'>
        <canvas width={256} height={256} className='output' ref='canvas'></canvas>
        {
          this.state.used?null:(
            <div className='output-control'>
              <button className='btn-go' onClick={()=>{window.App.generate(this)}}>GO</button>
            </div>
          )
        }
      </div>
    )
  }
}

export default Studio
