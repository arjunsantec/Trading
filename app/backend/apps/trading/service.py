from uuid import UUID
from datetime import datetime
from .models import *

class StockService:
    @classmethod
    def trade(cls):
        data_list = Trade.objects.count()
        return list(data_list)