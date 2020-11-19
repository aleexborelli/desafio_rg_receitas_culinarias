import app from '../../../app';

app.get('/', (request, response) => {
  return response.json({ message: 'API RG SISTEMAS' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
