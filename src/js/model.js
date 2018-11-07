import Input from './input.js'
import * as tf from '@tensorflow/tfjs'
import {loadFrozenModel} from '@tensorflow/tfjs-converter';


class Model{
  constructor(){
    console.log('go');

    const IMAGE_URL = 'static/img/12345.jpg'
    const img = new Image(256,256)
    img.src = IMAGE_URL
    img.onload = ()=>{

      const input = new Input(img)

      const data = input.getInput()


      this.load(()=>{
        setTimeout(()=>{
          const output = this.model.execute({input: data})
          const canvas = document.getElementById('123456')
          window.timestart = new Date().getTime()
          tf.toPixels(tf.reshape(tf.cast(output, 'int32'), [256,256,3]), canvas)
          console.log('elapsed: '+(new Date().getTime()-window.timestart))
        },50)

      })



    }

  }

  load(cb){
    const MODEL_URL = 'static/model/JS_MODEL_1/tensorflowjs_model.pb';
    const WEIGHTS_URL = 'static/model/JS_MODEL_1/weights_manifest.json';

    const model = loadFrozenModel(MODEL_URL, WEIGHTS_URL)
    .then((v)=> {

      this.model = v
      cb()

    }, function(err) {
      console.log(err); // failure
    })
  }
}

export default Model
