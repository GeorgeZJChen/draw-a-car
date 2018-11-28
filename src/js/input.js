import * as tf from '@tensorflow/tfjs'

class sketch{

  constructor(sketch, colour){

    const IMG_WIDTH = 256

    let c, data
    if(sketch.tagName==="IMAGE"){
      sketch.width = IMG_WIDTH
      sketch.height = IMG_WIDTH
      const canvas = document.createElement('canvas')
      canvas.width = IMG_WIDTH
      canvas.height = IMG_WIDTH
      c = canvas.getContext("2d")
      c.drawImage(sketch, 0, 0)
      data = c.getImageData(0, 0, IMG_WIDTH, IMG_WIDTH).data
    }
    else if (sketch.tagName==="CANVAS") {
      if(sketch.width!==IMG_WIDTH||sketch.height!==IMG_WIDTH){
        const canvas_2 = document.createElement('canvas')
        canvas_2.width = IMG_WIDTH
        canvas_2.height = IMG_WIDTH
        const context_2 = canvas_2.getContext('2d')
        context_2.drawImage(sketch, 0, 0, IMG_WIDTH, IMG_WIDTH)
        data = context_2.getImageData(0, 0, IMG_WIDTH, IMG_WIDTH).data
      }else {
        data = c.getImageData(0, 0, IMG_WIDTH, IMG_WIDTH).data
      }
    }
    const fix = (num)=>{
      if(num>128) return 0
      return 2
    }
    const contour =  new Uint8Array(new ArrayBuffer(IMG_WIDTH * IMG_WIDTH), 0, IMG_WIDTH * IMG_WIDTH)
    let j = 0
    for (let i = 0; i < data.length; i+=4) {
      contour[j++] = fix(data[i])
    }

    this.contour = contour
    this.colour = colour || [255,255,255]

  }

  getInput(){
    const t_colour = this.colour
    t_colour[0] = t_colour[0] /255 *2 -1
    t_colour[1] = t_colour[1] /255 *2 -1
    t_colour[2] = t_colour[2] /255 *2 -1

    const t_contour = this.contour
    const IMG_WIDTH = 256
    const data =  new Float32Array(new ArrayBuffer(IMG_WIDTH * IMG_WIDTH * 4 * 4), 0, IMG_WIDTH * IMG_WIDTH * 4)
    let j = 0
    for (let i = 0; i < data.length; i+=4) {
      data[i] = t_colour[0]
      data[i+1] = t_colour[1]
      data[i+2] = t_colour[2]
      data[i+3] = t_contour[j++]-1
    }
    return tf.tensor(data, [1, IMG_WIDTH, IMG_WIDTH, 4])
  }
}

export default sketch
