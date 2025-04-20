const app = require('./app')

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from CommonJS server!');
});

// Define the port where the server will listen
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
