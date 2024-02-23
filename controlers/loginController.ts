import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota para obter todos os usuários');
});

export default router;
