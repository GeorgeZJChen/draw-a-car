import Input from './input.js'
// import * as tf from '@tensorflow/tfjs'
import {loadFrozenModel} from '@tensorflow/tfjs-converter';


class Model{
  constructor(cb){

    this.load(()=>{
      console.log('Model loaded');
      cb()
    })

  }
  run(feed){
    const data = new Input(feed.sketch, feed.colour).getInput()
    return this.model.execute({input: data})
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
