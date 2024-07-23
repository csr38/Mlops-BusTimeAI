import tensorflow as tf
from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import logging
logging.basicConfig(level=logging.DEBUG) 
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        model_path = os.getenv('MODEL_PATH', '/app/model.h5')
        logging.debug(f'Model path: {model_path}')

        model = tf.keras.models.load_model(model_path)
        logging.debug(f'Model loaded: {model}')

        data = request.json
        logging.debug(f'Received data: {data}')

        input_data = tf.convert_to_tensor(data['input'], dtype=tf.float32)
        logging.debug(f'Input data shape: {input_data.shape}')

        if input_data.shape[1] != 9:
            raise ValueError(f"Invalid input shape: expected (None, 9), got {input_data.shape}")

        # Realizar la predicción
        prediction = model(input_data)

        # Convertir la predicción a una lista para poder devolverla en el JSON
        response = prediction.numpy().item()

        return jsonify({'prediction': response})
    except Exception as e:
        logging.error(f'Prediction error: {str(e)}')
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
