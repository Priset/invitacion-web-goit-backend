const express = require('express');
const router = express.Router();
const SongRecommendation = require('../models/SongRecommendation');

// Obtener todas las recomendaciones de canciones
router.get('/', async (req, res) => {
    try {
        const recommendations = await SongRecommendation.find();
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las recomendaciones.' });
    }
});

// Obtener una recomendación por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const recommendation = await SongRecommendation.findById(id);

        if (!recommendation) {
            return res.status(404).json({ error: 'Recomendación no encontrada.' });
        }

        res.status(200).json(recommendation);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la recomendación.' });
    }
});

// Crear una nueva recomendación de canción
router.post('/', async (req, res) => {
    try {
        const { artist, song } = req.body;
        if (!artist || !song) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }
        const newRecommendation = new SongRecommendation({ artist, song });
        await newRecommendation.save();
        res.status(201).json(newRecommendation);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la recomendación.' });
    }
});

// Actualizar una recomendación existente
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { artist, song } = req.body;

        if (!artist || !song) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const updatedRecommendation = await SongRecommendation.findByIdAndUpdate(
            id,
            { artist, song },
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedRecommendation) {
            return res.status(404).json({ error: 'Recomendación no encontrada.' });
        }

        res.status(200).json(updatedRecommendation);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la recomendación.' });
    }
});

// Eliminar una recomendación
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRecommendation = await SongRecommendation.findByIdAndDelete(id);

        if (!deletedRecommendation) {
            return res.status(404).json({ error: 'Recomendación no encontrada.' });
        }

        res.status(200).json({ message: 'Recomendación eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la recomendación.' });
    }
});

module.exports = router;
