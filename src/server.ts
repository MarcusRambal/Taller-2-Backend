import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
const products = [
  { id: '1', name: 'Guanabana', price: 1000000 },
  { id: '2', name: 'Queso', price: 34343434 },
  { id: '3', name: 'RTX PRO 6000 Blackwell', price: 1 },
  { id: '4', name: 'Empanada de carne', price: 999999 },
  { id: '5', name: 'Juan', price: 2 }
];

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    service: 'backend-api',
    status: 'ok'
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'backend-api'
  });
});

app.get('/api/products', (req: Request, res: Response) => {
  res.status(200).json({
    products
  });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  res.status(200).json({
    product
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});