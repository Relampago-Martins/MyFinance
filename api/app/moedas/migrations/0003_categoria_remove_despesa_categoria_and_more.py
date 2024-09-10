# Generated by Django 5.1 on 2024-09-10 14:01

import colorfield.fields
import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('moedas', '0002_despesa_receita_delete_orcamento_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('sigla', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('nome', models.CharField(max_length=50)),
                ('cor', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('is_base', models.BooleanField(default=False)),
                ('icone', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='despesa',
            name='categoria',
        ),
        migrations.RemoveField(
            model_name='receita',
            name='categoria',
        ),
        migrations.AlterField(
            model_name='movimentacao',
            name='data',
            field=models.DateField(default=datetime.date.today, help_text='Data da movimentação', null=True),
        ),
        migrations.AddField(
            model_name='movimentacao',
            name='categoria',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='moedas.categoria'),
        ),
    ]
