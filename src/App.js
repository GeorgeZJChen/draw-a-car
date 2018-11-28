import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs'
import './App.css';
import Header from './js/header.js'

import Studio from './js/studio.js'
import Model from './js/model.js'

class App extends Component {
  constructor(props){
    super(props)
    window.App = this
  }
  componentDidMount(){
    this.model = new Model(()=>{
      this.refs.loading.className += ' off'
    })
    this.addContour('static/img/2.jpg')
  }
  generate(frame, canvas_id){
    if(!this.model) return alert('Model not loaded')

    window.timestart = new Date().getTime()
    const output = this.model.run({
      sketch: this.refs.studio.getSketch(),
      colour: this.refs.studio.getColour()||[58,60,200]
    })
    console.log('elapsed: '+(new Date().getTime()-window.timestart))


    const canvas = frame.refs.canvas
    tf.toPixels(tf.reshape(tf.cast(output, 'int32'), [256,256,3]), canvas)
    console.log('elapsed: '+(new Date().getTime()-window.timestart))



    frame.use()
    setTimeout(()=>{
      this.refs.studio.update()
    },100)
  }
  addContour(img_url, onerror){

    const img = new Image(256,256)
    img.src = img_url
    img.onload = ()=>{

      const IMG_WIDTH = 256
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

      tf.toPixels(tf.reshape(tf.cast(contour, 'int32'), [256,256,1]), canvas).then(()=>{
        const d_canvas = this.refs.studio.getSketch()
        d_canvas.getContext('2d').drawImage(canvas, 0, 0, d_canvas.width, d_canvas.height)
      })

    }
    img.onerror = (err)=>{
      onerror()
    }
  }
  render() {
    return (
      <div className="App">
        <Header title={'Draw A Car'} ref='header'/>
        <div className='main-body' style={{position:'relative', backgroundImage: 'url(static/img/bg.jpg)'}}>
          <Studio ref='studio'/>
        </div>
        <footer className='App-footer'></footer>
        <div className='loading' ref='loading'><span className='loading-text'>Loading...<br/><span style={{fontSize:20}}>正在加载...</span></span></div>
      </div>
    );
  }
}

export default App;
