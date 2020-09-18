export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // Persist data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    // find the index of the id within the likes
    // if the item is NOT there, then this will be -1
    // so test if the index is DIFFERENT from -1. then we will return true

    return this.likes.findIndex(el => el.id === id) !== -1;

  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // if there are likes in localStorage, then restore them
    if (storage) this.likes = storage;
  }
}