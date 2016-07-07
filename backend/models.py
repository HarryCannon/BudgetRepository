from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Comment(models.Model):
    author = models.CharField(max_length=100, default="")
    text = models.TextField(default="")

class Day(models.Model):
    date = models.DateField()

    def __str__(self):
        return self.title

class Expense(models.Model):
    # Name of the expense
    name = models.CharField(max_length=200, default="")
    # Value of the expense in cents. E.g. 500 is a gain of 5 dollars, -3 is a loss of 3 cents
    value = models.IntegerField(default=0)
    # Description of the expense
    description = models.CharField(max_length=200, default="")
    # Days the expense was made
    days = models.ManyToManyField(Day, related_name="expenses")

    def __str__(self):
        return self.name
