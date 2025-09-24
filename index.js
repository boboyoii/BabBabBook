import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recipesRouter from './routes/recipes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(()=> console.log('MongoDB successfully connected.'))
  .catch(err => console.error('MongoDB connection error:', err));

// 라우트 연결
app.use('/api/recipes', recipesRouter);

// 기본 라우트
app.get('/', (req, res) => {
    res.send('밥밥북 Express 서버에 오신 것을 환영합니다!');
});

//서버 시작 
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
