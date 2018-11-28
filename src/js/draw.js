import React, { Component } from 'react';
import '../App.css';

class Draw extends Component {
  constructor(props){
    super(props)
    this.mode = 1
  }
  setMode(mode){
    this.mode = mode
  }
  componentDidMount(){

  }
  render() {
    return (
      <React.Fragment>
      <div className='cursor' ref='cursor'></div>
      <canvas width={512} height={512} className='draw' ref='element'
        onMouseDown={(e)=>{this.onMouseDown(e)}}
        onTouchStart={(e)=>{this.onMouseDown(e)}}
        onMouseMove={(e)=>{this.onMouseMove(e)}}
        onMouseEnter={(e)=>{this.onMouseEnter(e)}}
        onMouseLeave={(e)=>{this.onMouseLeave(e)}}
      ></canvas>
      </React.Fragment>

    )
  }
  clear(){
    const context = this.refs.element.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
  }
  computePosition(ele){
    const pos = [0,0]
    do{
      pos[0] += ele.offsetLeft
      pos[1] += ele.offsetTop
      ele = ele.parentNode
    }while(ele!==document.body)
    return pos
  }
  onMouseMove(e){
    e.preventDefault()
    if(this.onCursor){
      this.moveCursor(e)
    }
  }
  onMouseDown(e){
    e.preventDefault()
    this.basicDraw(e, this.mode)
  }
  onMouseEnter(e){
    e.preventDefault()
    const cursor = this.refs.cursor
    const img = new Image()
    img.width = 20
    img.height = 20
    if(this.mode===1){
      img.src = 'static/img/pencil.svg'
    }else if (this.mode===0) {
      img.src = 'static/img/rubber.svg'
    }
    img.alt = ''
    img.onload = ()=>{
      cursor.appendChild(img)
      cursor.className += ' on'
    }
    this.onCursor = true
  }
  onMouseLeave(){
    this.onCursor = false
    const cursor = this.refs.cursor
    cursor.className = 'cursor'
    cursor.innerHTML = ''
  }
  moveCursor(e){
    let mx = e.clientX || (e.changedTouches?e.changedTouches[0].clientX:0)
    let my = e.clientY || (e.changedTouches?e.changedTouches[0].clientY:0)
    const cursor = this.refs.cursor
    cursor.style.top = my +'px'
    cursor.style.left = mx +'px'

  }
  basicDraw(e, mode){
    const x = e.pageX || (e.changedTouches?e.changedTouches[0].pageX:0)
    const y = e.pageY || (e.changedTouches?e.changedTouches[0].pageY:0)
    let container
    let containerPos
    let idInterval
    let context
    let RL
    let RT

    let moved = false

    const move = (e)=>{
      e.preventDefault()
      let mx = e.pageX || (e.changedTouches?e.changedTouches[0].pageX:0)
      let my = e.pageY || (e.changedTouches?e.changedTouches[0].pageY:0)
      if(!moved&&Math.abs(my-y)<4&&Math.abs(mx-x)<4) return
      if(!moved){
        moved = true
        container = this.refs.element
        containerPos = this.computePosition(container)
        RT = containerPos[1] - container.scrollTop
        RL = containerPos[0] - container.scrollLeft
        context = this.refs.element.getContext('2d')
        context.beginPath()
        context.moveTo(x - RL, y - RT)
        idInterval = setInterval(()=>{
          context.stroke()
        },30)
        if(mode===0){ //rubber
          context.lineWidth = 15
          context.strokeStyle = '#fff'
        }else {
          context.lineWidth = 1
          context.strokeStyle = '#000'
        }
      }
      context.lineTo(mx - RL, my - RT)
    }
    const tm = function(e){e.preventDefault()}
    const up = (e)=>{
      document.removeEventListener('touchmove', tm, {passive: false})
      document.removeEventListener('mousemove', move, false)
      document.removeEventListener('mouseup', up, false)
      document.removeEventListener("touchmove", move, false)
      document.removeEventListener("touchend", up, false)
      document.removeEventListener("touchcancel", up, false)
      if(moved){
        clearInterval(idInterval)
        context.stroke()
      }
    }
    document.addEventListener('touchmove', tm, {passive: false})
    document.addEventListener('mousemove', move, false)
    document.addEventListener('mouseup', up, false)
    document.addEventListener("touchmove", move, false)
    document.addEventListener("touchend", up, false)
    document.addEventListener("touchcancel", up, false)
  }


}

export default Draw
