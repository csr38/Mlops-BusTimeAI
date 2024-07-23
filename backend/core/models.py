from django.db import models

# Create your models here.
class EtapaTransporte(models.Model):
    tiempo_subida = models.DateTimeField()
    tiempo_bajada = models.DateTimeField()
    tiempo_etapa = models.FloatField()
    x_subida = models.FloatField()
    y_subida = models.FloatField()
    x_bajada = models.FloatField()
    y_bajada = models.FloatField()
    dist_ruta_paraderos = models.FloatField()
    servicio_subida = models.CharField(max_length=20)
    par_subida = models.CharField(max_length=20)
    par_bajada = models.CharField(max_length=20)
    comuna_subida = models.CharField(max_length=50)
    comuna_bajada = models.CharField(max_length=50)
    patente = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.servicio_subida} - {self.patente}"