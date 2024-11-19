const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const songRecommendationRoutes = require('./routes/song-recommendations');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para procesar JSON

// Rutas
app.use('/api/song-recommendations', songRecommendationRoutes);

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((error) => console.error('Error conectando a MongoDB:', error));

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
