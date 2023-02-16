from django.db import models

# Create your models here.
class MEDEstimationSheet(AuditUuidModelMixin):
    depot_wo_no = models.CharField(max_length=250, null=True, blank=True)
    depot_wo_no_date = models.CharField(max_length=250, null=True, blank=True)
    bwg_control_no = models.CharField(max_length=250, null=True, blank=True)
    bwg_control_date = models.CharField(max_length=250, null=True, blank=True)
    drawing_no = models.CharField(max_length=250, null=True, blank=True)
    precedence = models.CharField(max_length=250, null=True, blank=True)
    part_no = models.CharField(max_length=250, null=True, blank=True)
    nomenclature = models.CharField(max_length=250, null=True, blank=True)
    quantity = models.CharField(max_length=250, null=True, blank=True)
    material_inspection_by = models.CharField(max_length=250, null=True, blank=True)
    job_no = models.CharField(max_length=250, null=True, blank=True)
    year = models.CharField(max_length=250, null=True, blank=True)
    date = models.CharField(max_length=250, null=True, blank=True)
    status = models.CharField(max_length=250, null=True, blank=True)
    images = models.ImageField(upload_to="images", blank=True)

    class Meta:
        pass
