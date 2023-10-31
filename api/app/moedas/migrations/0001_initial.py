# Generated by Django 4.1 on 2023-10-29 00:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movimentacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('data', models.DateField()),
                ('descricao', models.CharField(max_length=100)),
                ('tipo', models.CharField(choices=[('D', 'Despesa'), ('R', 'Receita')], max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Orcamento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('mes', models.IntegerField()),
                ('ano', models.IntegerField()),
                ('descricao', models.CharField(max_length=100)),
            ],
        ),
    ]