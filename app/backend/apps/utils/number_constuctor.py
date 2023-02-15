
from apps.company.models import AppSettings
from sequences import get_next_value
from enum import Enum


class NumberConstructor():


    @classmethod
    def generate_next_sequence(cls,construction_format: Enum,fiscal_year_enable : bool) -> str:
        """
        The function used to generate the number format based on the construction format 
        return @String 
        """

        construction_prefix = AppSettings.objects.filter(app_key=construction_format.value)


        if construction_prefix.exists():
            if fiscal_year_enable:
                fiscal_year = AppSettings.objects.filter(app_key='FISCAL_YEAR')
                if fiscal_year.exists():
                    generated_sequence = get_next_value(sequence_name=construction_prefix[0].app_value,initial_value=1)
                    return str(construction_prefix[0].app_value) + '/' + str(fiscal_year[0].app_value) +'/' + str(generated_sequence)
                else:
                    raise Exception('Fiscal Year Setting is not defined')
            else:
                generated_sequence = get_next_value(sequence_name=construction_prefix[0].app_value,initial_value=1)
                return str(construction_prefix[0].app_value) + '-' + str(generated_sequence)
        else:
            raise Exception("Number construction not defined" + construction_format.value)
    




