from apps.inventory.models import ProductTagging


class SalesService:

    @classmethod
    def get_product_tagging_list(cls, batch_no):
        product_tagging_list = ProductTagging.objects.filter(batch_no=batch_no).all().values(
            'product',
            'product__product_name',
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

        )
        # print('product tagging', product_tagging_list)
        return list(product_tagging_list)

