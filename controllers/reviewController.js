const Review = require('../modelos/review');
const mongoose = require('mongoose');

// Obtener todas las reviews (opcionalmente filtradas por juego)
const getReviews = async (req, res) => {
  const { juegoId } = req.query;

  const filtro = {};
  if (juegoId && mongoose.Types.ObjectId.isValid(juegoId)) {
    filtro.juegoId = juegoId;
  }

  const reviews = await Review.find(filtro).sort({ createdAt: -1 });
  res.status(200).json(reviews);
};

// Obtener una review por id
const getReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'review inexistente' });
  }
  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({ error: 'Review no encontrado' });
  }
  res.status(200).json(review);
};

// Crear review
const crearReview = async (req, res) => {
  const { usuarioId, juegoId, textoReseña } = req.body;

  try {
    const review = await Review.create({ usuarioId, juegoId, textoReseña });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar review
const eliminarReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'review inexistente' });
  }
  const review = await Review.findOneAndDelete({ _id: id });
  res.status(200).json(review);
};

// Actualizar review
const updateReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'review inexistente' });
  }

  const review = await Review.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!review) {
    return res.status(404).json({ error: 'Review no encontrado' });
  }

  res.status(200).json(review);
};

module.exports = {
  getReviews,
  getReview,
  crearReview,
  eliminarReview,
  updateReview
};