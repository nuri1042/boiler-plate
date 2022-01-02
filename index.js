const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const { User } = require('./models/User');
const config = require('./config/key');

// body parser는 client에서 오는 정보를 server가 분석해서 가져올 수 있게 해주는 것

//application/x-www-form-urlencoded 형태의 데이터를 분석해서 가져올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 타입을 분석해서 가져올 수 있게 함
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hi !!');
});

app.post('/register', (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어줌

  // body parser를 이용해서 client에서 보내는 정보를 request.body 로 보내줌
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
