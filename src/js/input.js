import * as tf from '@tensorflow/tfjs'
import PARAMS from './params.js'

class Input{

  constructor(img){

    const IMG_WIDTH = PARAMS.IMG_WIDTH

    const canvas = document.createElement('canvas')
    canvas.width = IMG_WIDTH
    canvas.height = IMG_WIDTH
    const c = canvas.getContext("2d")
    c.drawImage(img, 0, 0)
    const data = c.getImageData(0, 0, IMG_WIDTH, IMG_WIDTH).data
    const fix = (num)=>{
      if(num>150) return 2
      return 0
    }
    const contour =  new Uint8Array(new ArrayBuffer(IMG_WIDTH * IMG_WIDTH), 0, IMG_WIDTH * IMG_WIDTH)
    let j = 0
    for (let i = 0; i < data.length; i+=4) {
      contour[j++] = fix(data[i])
    }

    this.contour = contour
    this.colour = [253,252,255]

    const fix_2 = (num)=>{
      if(num==2) return 0
      return 255
    }
    const contour_2 =  new Uint8Array(new ArrayBuffer(IMG_WIDTH * IMG_WIDTH), 0, IMG_WIDTH * IMG_WIDTH)
    for (let i = 0; i < data.length; i++) {
      contour_2[i] = fix_2(contour[i])
    }
    tf.toPixels(tf.reshape(tf.cast(contour_2, 'int32'), [256,256,1]), document.getElementById('1234567'))


  }
  getInput(){
    const t_colour = this.colour
    t_colour[0] = t_colour[0] /255 *2 -1
    t_colour[1] = t_colour[1] /255 *2 -1
    t_colour[2] = t_colour[2] /255 *2 -1

    const t_contour = this.contour
    const IMG_WIDTH = PARAMS.IMG_WIDTH
    const data =  new Float32Array(new ArrayBuffer(IMG_WIDTH * IMG_WIDTH * 4 * 4), 0, IMG_WIDTH * IMG_WIDTH * 4)
    let j = 0
    for (let i = 0; i < data.length; ) {
      data[i++] = t_colour[0]
      data[i++] = t_colour[1]
      data[i++] = t_colour[2]
      data[i++] = t_contour[j++]-1
    }
    return tf.tensor(data, [1, IMG_WIDTH, IMG_WIDTH, 4])
  }
}

export default Input
