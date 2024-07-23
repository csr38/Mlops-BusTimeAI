import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';

const Prediction = () => {
  const [model, setModel] = useState(null);

  const loadModel = async () => {
    try {
      const modelUrl = `${window.location.origin}/model.json`; // Ruta correcta para el archivo model.json
      const loadedModel = await loadGraphModel(modelUrl);
      setModel(loadedModel);
      console.log('Modelo cargado:', loadedModel);
    } catch (error) {
      console.error('Error cargando el modelo:', error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div>
      <h1>Predicción</h1>
      {model ? <p>Modelo cargado correctamente.</p> : <p>Cargando modelo...</p>}
    </div>
  );
};

export default Prediction;
