from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponseRedirect
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import functools
import math

from backend.models import *

class Serializers(object):
    @staticmethod 
    def compute_balance(day):
        days = Day.objects.filter(date__lte=day.date)
        expenses = map(lambda x : x.expenses.all(), days)
        values = map(lambda x : map(lambda y : y.value, x), expenses)
        flattened_values = map(lambda x : functools.reduce(lambda y, z : y + z, x, 0), values)
        balance = functools.reduce(lambda x, y : x + y, flattened_values, 0)
        return balance;

    @staticmethod
    def day_serializer(day):
        data = {}
        data["date"] = day.date
        data["expenses"] = map(Serializers.expense_serializer, day.expenses.all().order_by("name"))
        data["balance"] = Serializers.compute_balance(day)
        data["id"] = day.id
        return data

    @staticmethod
    def expense_serializer(expense):
        data = {}
        data["name"] = expense.name
        data["value"] = expense.value
        data["description"] = expense.description
        data["id"] = expense.id
        return data


class NewExpense(APIView):
    def AddExpenseToDay(expense, date):
        days = Day.objects.filter(date=date)
        #Day found, put expense in it
        if days.count() > 0:
            days[0].expenses.add(expense)
        #Day not found, add day and add expense to it
        else:
            new_day = Day(date=date)
            new_day.save()
            new_day.expenses.add(expense)

    def post(self, request):
        name = request.POST.get('name')
        date = request.POST.get('date')
        value = math.floor(float(float(request.POST.get('value')) * 100))
        description = request.POST.get('description')

        # Putting existing expense in given date
        if value == 0:
            expenses = Expense.objects.filter(name=name)
            #Expense found
            if expenses.count() > 0:
                expense = expenses[0]
                NewExpense.AddExpenseToDay(expense, date)

        # Creating new expense
        else:
            new_expense = Expense(name=name, value=value, description=description)
            new_expense.save()
            NewExpense.AddExpenseToDay(new_expense, date)

        return Response(None)

class SearchDays(APIView):
    def get(self, request):
        lower_date = request.GET.get('lower_date')
        upper_date = request.GET.get('upper_date')

        days = Day.objects.filter(date__gte=lower_date).filter(date__lte=upper_date).order_by("date")

        return Response({'days' : map(Serializers.day_serializer, days)})

