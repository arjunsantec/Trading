from uuid import UUID
from django.db import transaction
from django.db.models import Sum
import ast

from .models import ProductTagging


class InventoryService:

    @classmethod
    def get_tagging_zone_list(cls, w_id):
        product_list = ProductTagging.objects.filter(ware_house_id=w_id).all().values('ware_house_id').distinct()
        print("product list", product_list)
        return list(product_list)

    @classmethod
    def get_tagging_product_list(cls, z_id, w_id):
        product_list = ProductTagging.objects.filter(zone_id=z_id, ware_house_id=w_id).all().values(
            'product_id', 'product_id__product_name').distinct()
        # print("product list", product_list)
        return list(product_list)

    @classmethod
    def get_all_tagging_product_list(cls, w_id):
        product_list = ProductTagging.objects.filter(ware_house_id=w_id).all().values(
            'product_id', 'product_id__product_name').distinct()
        # print("product list", product_list)
        return list(product_list)


    @classmethod
    def get_tagging_batch_list(cls, prod_id, z_id, w_id):
        batch_list = ProductTagging.objects.filter(product_id=prod_id, zone_id=z_id, ware_house_id=w_id).all().values(
            'trc_no',
            'trc_date',
            'kit_no',
            'batch_no',
            'expiry',
            'serial_number',
            'manufacture',
            'min_temp',
            'max_temp',
            'recevied_qty',
            'available_qty', )
        print("batch list", batch_list)
        return list(batch_list)

    @classmethod
    def get_product_tagging_list(cls, project, f_date, to_date):
        product_list = ProductTagging.objects.filter(project_id=project, load_date__gte=f_date,
                                                     load_date__lte=to_date).all().values(
            'id',
            'product',
            'product__product_name',
            # 'inwardType',
            'trc_no',
            'trc_date',
            'kit_no',
            'batch_no',
            'expiry',
            'serial_number',
            'manufacture',
            'min_temp',
            'max_temp',
            'recevied_qty',
            'available_qty',
            'price',
            'ware_house',
            'ware_house__warehouse_name',
            'zone',
            'zone__zone_name',
            'rack',
            'rack__rack_name',
            'level',
            'level__level_name',
            'shelf',
            'shelf__shelf_name',
            'project',
            'project__project_name',
            'storage_type',
            'type_name',
            'load_date',
            'unload_date', )

        return list(product_list)
