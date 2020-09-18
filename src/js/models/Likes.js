export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
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
}