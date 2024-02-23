import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('fodase os usuários');
});

export default router;
