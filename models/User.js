const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // nuri 1042@naver.com 입력하면 글자사이 공백을 없애줌
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  // 유효성 관리
  token: {
    type: String,
  },
  //token 유효기간
  tokenExp: {
    type: Number,
  },
});

// Schema 를 model 로 감싸서 사용
const user = mongoose.model('User', userSchema);

module.exports = { User };
