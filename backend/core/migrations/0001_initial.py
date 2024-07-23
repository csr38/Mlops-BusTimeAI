# Generated by Django 5.0.6 on 2024-06-24 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EtapaTransporte',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tiempo_subida', models.DateTimeField()),
                ('tiempo_bajada', models.DateTimeField()),
                ('tiempo_etapa', models.FloatField()),
                ('x_subida', models.FloatField()),
                ('y_subida', models.FloatField()),
                ('x_bajada', models.FloatField()),
                ('y_bajada', models.FloatField()),
                ('dist_ruta_paraderos', models.FloatField()),
                ('servicio_subida', models.CharField(max_length=20)),
                ('par_subida', models.CharField(max_length=20)),
                ('par_bajada', models.CharField(max_length=20)),
                ('comuna_subida', models.CharField(max_length=50)),
                ('comuna_bajada', models.CharField(max_length=50)),
                ('patente', models.CharField(max_length=10)),
            ],
        ),
    ]