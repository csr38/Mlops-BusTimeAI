from django.shortcuts import HttpResponse
import requests
import json
from .models import EtapaTransporte
import random

def normalize_column(value, min_value, max_value):
    return (value - min_value) / (max_value - min_value)

def predict_from_flask(request):
    try:
        # URL del servicio de Flask en tu docker-compose
        flask_url = 'http://tensorflow:5000/predict'

        # Obtener datos al azar de la base de datos SQLite
        random_data = EtapaTransporte.objects.order_by('?').first()

        if random_data:
            # Extraer mes, día, hora y minuto de las fechas
            tiempo_subida = random_data.tiempo_subida
            tiempo_bajada = random_data.tiempo_bajada
            
            # Normalizar los datos
            input_data = [
                normalize_column(random_data.x_subida, 200000, 800000),
                normalize_column(random_data.y_subida, 0, 10000000),
                normalize_column(random_data.x_bajada, 200000, 800000),
                normalize_column(random_data.y_bajada, 0, 10000000),
                normalize_column(random_data.dist_ruta_paraderos, 0, 20000),
                normalize_column(tiempo_subida.month, 1, 12),
                normalize_column(tiempo_subida.day, 1, 31),
                normalize_column(tiempo_subida.hour, 0, 23),
                normalize_column(tiempo_subida.minute, 0, 59),
            ]

            data = {
                'input': [input_data]
            }

            # Realizar la solicitud POST a Flask
            response = requests.post(flask_url, json=data)

            # Verificar el estado de la respuesta
            if response.status_code == 200:
                prediction_data = response.json()
                print(f'Response from Flask: {prediction_data}')
                response_data = {
                    'prediction': prediction_data,
                    'input_data': input_data
                }
                return HttpResponse(json.dumps(response_data), content_type='application/json')
            else:
                print(f'Error in Flask request: {response.status_code}')
                return HttpResponse(json.dumps({'error': f'Error en la solicitud a Flask: {response.status_code}'}), status=response.status_code, content_type='application/json')

        else:
            print('No hay datos disponibles en la base de datos.')
            return HttpResponse(json.dumps({'error': 'No hay datos disponibles en la base de datos.'}), status=404, content_type='application/json')

    except Exception as e:
        print(f'Exception occurred: {str(e)}')
        return HttpResponse(json.dumps({'error': f'Exception occurred: {str(e)}'}), status=500, content_type='application/json')
