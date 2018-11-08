import Input from './input.js'
import * as tf from '@tensorflow/tfjs'
import {loadFrozenModel} from '@tensorflow/tfjs-converter';


class Model{
  constructor(){

    this.load(()=>{
      console.log('Model loaded');
    })

  }
  run(feed){
    const data = new Input(feed.sketch, feed.colour).getInput()
    data.print()
    const output = this.model.execute({input: data})
    tf.toPixels(tf.reshape(tf.cast(output, 'int32'), [256,256,3]), document.getElementById('123456'))
  }

  load(cb){
    const MODEL_URL = 'static/model/JS_MODEL_1/tensorflowjs_model.pb';
    const WEIGHTS_URL = 'static/model/JS_MODEL_1/weights_manifest.json';

    loadFrozenModel(MODEL_URL, WEIGHTS_URL).then((v)=> {

      this.model = v
      cb()

    }, function(err) {
      console.log(err); // failure
    })
  }
}

export default Model
