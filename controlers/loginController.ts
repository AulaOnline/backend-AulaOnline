import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('fodase todos mesmo usuários');
});

export default router;
