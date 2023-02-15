from apps.inventory.models import ProductTagging
from django.db.models import Sum


class InvoiceService:

    @classmethod
    def get_batch_number(cls):
        batch_list = ProductTagging.objects.all().values('batch_no').distinct()
        return batch_list

    @classmethod
    def get_quantity(cls, batch_no):
        quantity = ProductTagging.objects.filter(batch_no=batch_no).all().count()
        price = ProductTagging.objects.filter(batch_no=batch_no).aggregate(Sum('price'))
        # print('quantity', quantity, price)
        return list([quantity, price])

