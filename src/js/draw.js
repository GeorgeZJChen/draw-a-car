import React, { Component } from 'react';
import PARAMS from './params.js'
import '../App.css';

class Draw extends Component {
  componentDidMount(){
    this.context = this.refs.element.getContext('2d')


  }
  render() {
    return (
      <canvas width={PARAMS.IMG_WIDTH} height={PARAMS.IMG_WIDTH} className='draw' ref='element'
        onMouseDown={(e)=>{this.onMouseDown(e)}}
      ></canvas>
    )
  }
  clear(){
    this.context.fillStyle = 'white'
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.beginPath();
  }
  computePosition(ele){
    const pos = [0,0]
    do{
      pos[0] += ele.offsetLeft
      pos[1] += ele.offsetTop
      ele = ele.parentNode
    }while(ele!=document.body)
    return pos
  }
  onMouseDown(e){
    this.basicDraw(e)
  }
  basicDraw(e){
    const x = e.pageX || (e.changedTouches?e.changedTouches[0].pageX:0)
    const y = e.pageY || (e.changedTouches?e.changedTouches[0].pageY:0)

    let container
    let containerPos
    let idInterval
    let RL
    let RT

    let moved = false
    const move = (e)=>{
      let mx = e.pageX || (e.changedTouches?e.changedTouches[0].pageX:0)
      let my = e.pageY || (e.changedTouches?e.changedTouches[0].pageY:0)
      if(!moved&&Math.abs(my-y)<4&&Math.abs(mx-x)<4) return
      if(!moved){
        moved = true
        container = this.refs.element
        containerPos = this.computePosition(container)
        RT = containerPos[1] - container.scrollTop
        RL = containerPos[0] - container.scrollLeft

        this.context.moveTo(x - RL, y - RT)
        idInterval = setInterval(()=>{
          this.context.stroke()
        },30)
      }
      this.context.lineTo(mx - RL, my - RT)

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
        this.context.stroke()
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
