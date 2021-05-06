import * as nsfwjs from 'nsfwjs';
import * as tf from '@tensorflow/tfjs'

class NSFWjs {
  model;
  constructor() {
    (async () => {
      if (typeof window !== 'undefined') {
        let baseUrl = 'http://localhost:3000';
        if (process.env.NODE_ENV === 'production') {
          baseUrl = `https://${window.location.host}`;
          tf.enableProdMode();
        }
        try {
          this.model = await nsfwjs.load('indexeddb://nsfw-model', { size: 299 });
        } catch (e) {
          this.model = await nsfwjs.load(`${baseUrl}/nsfw-models/`, { size: 299 });
          await this.model.model.save('indexeddb://nsfw-model');
        }
      }
    })();
  }

  classify = async (id) => {
    let nsfw = false;
    try {
      const img = document.getElementById(id);
      console.log('IMG: ', img);
      if (img) {
        const predictions = await this.model.classify(img);
        console.log('PREDICTIONS: ', predictions);
        predictions.forEach((type) => {
          if ((type.className === 'Sexy' ||
          type.className === 'Porn' ||
          type.className === 'Hentai') && type.probability > 0.5) {
            nsfw = true;
          }
        })
      }
      return nsfw;
    } catch (e) {
      console.warn('Error classifying: ', e);
      return nsfw;
    }
  }

  classifyGif = async (id) => {
    let nsfw = false;
    try {
      const img = document.getElementById(id);
      const predictions = await this.model.classify(img);
      predictions.forEach((type) => {
        if ((type.className === 'Sexy' ||
        type.className === 'Porn' ||
        type.className === 'Hentai') && type.probability > 0.5) {
          nsfw = true;
        }
      })
      return nsfw;
    } catch (e) {
      console.warn('Error classifying: ', e);
      return nsfw;
    }
  }
}

export default new NSFWjs();
