import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs'
import logo from './logo.svg';
import './App.css';

import PARAMS from './js/params.js'
import Draw from './js/draw.js'
import Model from './js/model.js'

class App extends Component {
  componentDidMount(){
    this.model = new Model()
    this.initContour()
  }
  generate(){
    if(!this.model) return alert('Model not loaded')

    const input = this.refs.draw.refs.element
    this.model.run({ sketch: input, colour: this.pickedColour||[58,60,200] })
  }
  pickColour(colour){
    console.log(colour);
    this.pickedColour = colour
  }
  initContour(){

    const IMAGE_URL = 'static/img/1234.jpg'
    const img = new Image(256,256)
    img.src = IMAGE_URL
    img.onload = ()=>{

      window.timestart = new Date().getTime()

      const IMG_WIDTH = PARAMS.IMG_WIDTH
      const canvas = document.createElement('canvas')
      canvas.width = IMG_WIDTH
      canvas.height = IMG_WIDTH
      const c = canvas.getContext("2d")
      c.drawImage(img, 0, 0)

      const data = c.getImageData(0, 0, IMG_WIDTH, IMG_WIDTH).data

      const fix = (num)=>{
        if(num>128) return 255
        return 0
      }
      const contour =  new Uint8Array(new ArrayBuffer(IMG_WIDTH * IMG_WIDTH), 0, IMG_WIDTH * IMG_WIDTH)
      let j = 0
      for (let i = 0; i < data.length; i+=4) {
        contour[j++] = fix(data[i])
      }

      tf.toPixels(tf.reshape(tf.cast(contour, 'int32'), [256,256,1]), this.refs.draw.refs.element)

      console.log('elapsed: '+(new Date().getTime()-window.timestart))
    }



  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span style={{position: 'relative'}}>
            <Draw ref='draw'/>
            <canvas id='123456' width={256} height={256} className='display'></canvas>
          </span>
          <div style={{
            position: 'relative'
          }}>
            <button style={{
              marginRight: 6,
              width: 75
            }} onClick={()=>{this.refs.draw.clear()}}>CLEAR</button>

            <input className='pick-colour' onChange={()=>{this.pickColour([20,20,200])}} defaultChecked type='radio' name='pick-colour'/>
            <span className='colour-radio' style={{backgroundColor:'rgb(20, 20, 200)'}}></span>
            <input className='pick-colour' onChange={()=>{this.pickColour([200,20,20])}} type='radio' name='pick-colour'/>
            <span className='colour-radio' style={{backgroundColor:'rgb(200, 20, 20)'}}></span>
            <input className='pick-colour' onChange={()=>{this.pickColour([250,250,250])}} type='radio' name='pick-colour'/>
            <span className='colour-radio' style={{backgroundColor:'rgb(250, 250, 250)'}}></span>
            <input className='pick-colour' onChange={()=>{this.pickColour([150,150,150])}} type='radio' name='pick-colour'/>
            <span className='colour-radio' style={{backgroundColor:'rgb(150, 150, 150)'}}></span>
            <input className='pick-colour' onChange={()=>{this.pickColour([20,20,20])}} type='radio' name='pick-colour'/>
            <span className='colour-radio' style={{backgroundColor:'rgb(20, 20, 20)'}}></span>

            <button style={{
              marginLeft: 10,
              width: 50
            }} onClick={()=>{this.generate()}}>GO</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
