import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from django.utils import timezone  # Importa timezone desde Django
from core.models import EtapaTransporte



class Command(BaseCommand):
    help = 'Import data from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        csv_file = options['csv_file']

        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)

            for row in reader:
                tiempo_subida_str = row['tiempo_subida']
                tiempo_bajada_str = row['tiempo_bajada']
                tiempo_etapa_str = row['tiempo_etapa'].strip()  # Eliminar espacios en blanco alrededor
                if tiempo_etapa_str:
                    try:
                        tiempo_etapa = float(tiempo_etapa_str)
                        tiempo_subida = timezone.make_aware(datetime.strptime(tiempo_subida_str, '%Y-%m-%d %H:%M:%S.%f'))
                        tiempo_bajada = timezone.make_aware(datetime.strptime(tiempo_bajada_str, '%Y-%m-%d %H:%M:%S.%f'))

                        EtapaTransporte.objects.create(
                            tiempo_subida=tiempo_subida,
                            tiempo_bajada=tiempo_bajada,
                            tiempo_etapa=tiempo_etapa,
                            x_subida=float(row['x_subida']),
                            y_subida=float(row['y_subida']),
                            x_bajada=float(row['x_bajada']),
                            y_bajada=float(row['y_bajada']),
                            dist_ruta_paraderos=float(row['dist_ruta_paraderos']),
                            servicio_subida=row['servicio_subida'],
                            par_subida=row['par_subida'],
                            par_bajada=row['par_bajada'],
                            comuna_subida=row['comuna_subida'],
                            comuna_bajada=row['comuna_bajada'],
                            patente=row['patente']
                        )

                    except ValueError as e:
                        self.stdout.write(self.style.ERROR(f"Error procesando línea: {e}"))

                else:
                    self.stdout.write(self.style.WARNING("Campo 'tiempo_etapa' vacío en la línea. Se omite la creación del objeto."))