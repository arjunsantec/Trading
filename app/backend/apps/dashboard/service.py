from uuid import UUID
from datetime import datetime

from apps.sales.models import ProjectCreation

from apps.wareshouse.models import WareHouseCreation, StorageZoneCreation, ZoneLevelCreation, ShelfCreationDetails


class DashboardService:

    @classmethod
    def count_project(cls):
        project_list = ProjectCreation.objects.count()
        return project_list

    @classmethod
    def count_warehouse(cls):
        warehouse_list = WareHouseCreation.objects.count()
        return warehouse_list

    @classmethod
    def count_rack(cls):
        rack_list = ZoneLevelCreation.objects.count()
        return rack_list

    @classmethod
    def count_shelf(cls):
        shelf_list = ShelfCreationDetails.objects.count()
        # notify=DashboardService.count_closed_shelf()
        return shelf_list

    @classmethod
    def count_closed_shelf(cls):
        closed_shelf = ShelfCreationDetails.objects.filter(status='1').all().count()
        # print('total', closed_shelf)
        return closed_shelf

    # @classmethod
    # def count_zone(cls):
    #     zone_list = StorageZoneCreation.objects.count()
    #     return zone_list
