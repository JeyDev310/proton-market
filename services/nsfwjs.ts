import * as nsfwjs from 'nsfwjs';

class NSFWjs {
  model;
  constructor() {
    (async () => {
      if (typeof window !== 'undefined') {
        this.model = await nsfwjs.load('http://localhost:3000/nsfw-models/');
        console.log(this.model);
      }
    })();
  }
}

export default new NSFWjs();
