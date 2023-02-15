from django.db import transaction
import pandas as pd
from datetime import datetime
from django.http import HttpResponse, JsonResponse
from .models import ReportEngineModel

# once i can import method from helper/db_service.py then uncomment below line
# from helper import db_service
from django.db import connection
import ast


class ReportServices:
    @classmethod
    def get_report(cls, data_id, from_dt, to_dt, where_caluse):
        where_condition: str
        # print('all', data_id, from_dt, to_dt, where_caluse)
        init_df = list(ReportEngineModel.objects.filter(id=data_id).all().values(
            "id",
            "report_name",
            "sql_query",
            "is_active",
            "report_main_header",
            "report_sub_header",
            "numerical_columns",
        ))
        # sql_ary contains query to be executed.
        # print('init_df', init_df)
        sql_qry1 = (init_df[0])['sql_query']
        # print('sql_qry1', sql_qry1)
        if (from_dt.upper() == "NULL"):
            from_date = '"2000-01-01"'
        else:
            from_date = '"' + from_dt + '"'
        # print('from_date', from_date)
        if (to_dt.upper() == "NULL"):
            to_date = '"' + datetime.today().strftime('%Y-%m-%d') + '"'
        else:
            to_date = '"' + to_dt + '"'
        # print('to_date', to_date)
        if (where_caluse == '' or where_caluse == "NULL" or where_caluse == "[]"):
            where_condition = ''
            # print('where_caluse', where_caluse)
            sql_qry = sql_qry1.format(from_date=from_date, to_date=to_date)
        else:
            # print('where_caluse', where_caluse)
            where_condition = cls.createWhereStatement(ast.literal_eval(where_caluse))
            sql_qry = sql_qry1.format(from_date=from_date, to_date=to_date, where_condition=where_condition)

        df = {}
        df['report_name'] = init_df[0]['report_name']
        df['report_main_header'] = init_df[0]['report_main_header']
        df['report_sub_header'] = init_df[0]['report_sub_header']
        str_numCols = str(init_df[0]['numerical_columns'])

        # If any character present then replace it with ' 'space.
        for chars in ',./?\&+':
            str_numCols = str_numCols.replace(chars, ' ')
        # Spliting words based on spaces.
        list_numCols = str_numCols.split()

        # print(list_numCols)
        df['numerical_columns'] = list_numCols
        if init_df[0]['is_active'] == True:
            df['sql_output'] = custom_sql(sql_qry)
        else:
            df['sql_output'] = 'Report is Not Active'
        # print('sql', df['sql_output'])
        return JsonResponse(df, safe=False)

    @classmethod
    def createWhereStatement(cls, condition_data: list):
        condition_string: str = ''
        for condition in condition_data:
            if condition["column_value"] != '':
                condition_string += " and " + condition["column_name"] + '="' + str(condition["column_value"]) + '"'
        return condition_string


def custom_sql(query):
    cursor = connection.cursor()
    cursor.execute(query)
    # print('check query', cursor.execute(query))
    final_list = {}
    columns = [col[0] for col in cursor.description]
    for col in columns:
        final_list[col] = []
    for row in cursor.fetchall():
        for i in range(len(row)):
            final_list[columns[i]].append(row[i])
    # print('final_list', final_list)
    return final_list
