# Usar una imagen base con TensorFlow y Flask
FROM intel/intel-optimized-tensorflow:2.15.0-pip-base

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar el script de la aplicación y el modelo preentrenado
COPY predictor.py /app/predictor.py
COPY model.h5 /app/model.h5

# Instalar Flask
RUN pip install flask
RUN pip install flask-cors
RUN pip install requests 

# Exponer el puerto en el que correrá la aplicación
EXPOSE 5000

# Establecer las variables de entorno
ENV MODEL_PATH /app/model.h5

# Ejecutar la aplicación
CMD ["python", "predictor.py"]
