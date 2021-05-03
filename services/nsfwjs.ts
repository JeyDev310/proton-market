import * as nsfwjs from 'nsfwjs';

class NSFWjs {
  model;
  constructor() {
    (async () => {
      this.model = await nsfwjs.load('/public/nsfw-models/');
      console.log(this.model);
    })();
  }
}

export default new NSFWjs();
