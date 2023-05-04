#import timeit
import time
# Raw Package
import numpy as np
import pandas as pd
from datetime import datetime, timedelta,date
#Data Source
import yfinance as yf
import os
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')
# start_time = time.strftime('%X %x %Z')
# print("Start Time", start_time)

import numpy as np
import pandas as pd
from scipy.stats import rankdata
from scipy.signal import convolve2d

# This is to get actual numbers (Eg: 123.456789 instead of -1.2345678e+02)
np.set_printoptions(suppress=True)
start_time = time.strftime('%X %x %Z')
print("START Time ", start_time)



class StockService:
    @classmethod
    # def trade(cls):
    #     data_list = StockService.Trade.objects.count()
    #     return list(data_list)
    
    def construct_df_fold_price(df, fold_num):
    # Input data df has 91 rows & fold_num in the range of 1 to 
        df_fold = df.copy()
    # Dropping the 1st row 
        df_fold_shape_0 = df_fold.shape[0]
        data_price_np_arr = df_fold.drop([0],axis=0).values.flatten()
        df_fold['data_price'] = np.append(data_price_np_arr, [np.nan])
        if fold_num == 1:
            df_fold['price'] = df_fold['data_price'].shift(-8)
            df_fold['diff'] = df_fold['price'].rolling(window=2).apply(np.diff) 
        elif fold_num == 2:
            df_fold['price'] = df_fold['data_price'].shift(-7)
            df_fold['price'].iloc[df_fold_shape_0 - 8] = np.nan
            df_fold['diff'] = df_fold['price'].rolling(window=2).apply(np.diff)
            # Making the last difference element at index 82 as np.nan as it is not necessary
            df_fold['diff'][82] = np.nan
        elif fold_num in range(3,10):
            num_shifts = 9 - fold_num
            df_fold['price'] = df_fold['data_price'].shift(-num_shifts)
            nan_count = 8 - num_shifts 
            nan_list = [np.nan for i in range(nan_count)]
            nan_index = [82+i for i in range(nan_count)]
            df_fold['price'].iloc[nan_index] = nan_list
            df_fold['diff'] = df_fold['price'].rolling(window=2).apply(np.diff)
        else:
            print("Enter valid fold number within the range of 1 to 9")
        return df_fold
    

    def construct_df_fold_diff(df, fold_num):
  # Input data df has 90 rows & fold_num in the range of 1 to 9
        df_fold = df.copy()
        df_fold_shape_0 = df_fold.shape[0]
        df_fold['data_diff'] = df_fold['data'].rolling(window=2).apply(np.diff)
        data_diff_np_arr = df_fold['data_diff'].drop([0],axis=0).values.flatten()
        df_fold['data_diff'] = np.append(data_diff_np_arr, [np.nan])
        if fold_num == 1:
            df_fold['price_diff'] = df_fold['data_diff'].shift(-8)
            df_fold['diff'] = df_fold['price_diff'].rolling(window=2).apply(np.diff) 
        elif fold_num == 2:
            df_fold['price_diff'] = df_fold['data_diff'].shift(-7)
            df_fold['price_diff'].iloc[df_fold_shape_0 - 8] = np.nan
            df_fold['diff'] = df_fold['price_diff'].rolling(window=2).apply(np.diff)
            # Making the last difference element at index 82 as np.nan as it is not necessary
            df_fold['diff'][82] = np.nan
        elif fold_num in range(3,10):
            num_shifts = 9 - fold_num
            df_fold['price_diff'] = df_fold['data_diff'].shift(-num_shifts)
            nan_count = 8 - num_shifts 
            nan_list = [np.nan for i in range(nan_count)]
            nan_index = [82+i for i in range(nan_count)]
            df_fold['price_diff'].iloc[nan_index] = nan_list
            df_fold['diff'] = df_fold['price_diff'].rolling(window=2).apply(np.diff)
        else:
            print("Enter valid fold number within the range of 1 to 9")
        return df_fold
    



        # Step 1 - Converting 81 values into np array
    def step_1_func(df):
        step_1_op = np.array(df['diff'][~df['diff'].isna()])
        return step_1_op
    
    def step_2_func(step_1_op):
        step_2_op = step_1_op.reshape(9, 3, 3) 
        return step_2_op
    
    def step_2_cal_1(step_2_op):
    # Step 2 - Calculation 1 
        calculation_1_op = np.array([np.mean(mat) for mat in step_2_op]).reshape(3,3)
        return calculation_1_op

    def step_2_cal_2(step_2_op):
        # Step 2 - Calculation 2 
        # Calculation 2 
        calculation_2_op = np.mean(step_2_op, axis=0)
        return calculation_2_op 
    
    def step_3_func_cal(step_2_op, calculation_1_op):
        step_3_op_lst = []
        calculation_1_op_flatten = calculation_1_op.flatten()
        for i in range(step_2_op.shape[0]):
            for j in range(len(calculation_1_op_flatten)):
                if i == j:
                    step_3_op = ((calculation_1_op_flatten[j] - step_2_op[i])/step_2_op[i]) * 100
                    step_3_op_lst.append(step_3_op)
            step_3_op_lst = np.array(step_3_op_lst)
            return step_3_op_lst
        
        
    def step_4_func_cal(step_2_op, calculation_1_op):
        step_4_op_lst = []
        calculation_1_op_flatten = calculation_1_op.flatten()
        for i in range(step_2_op.shape[0]):
            for j in range(len(calculation_1_op_flatten)):
                if i == j:
                    step_4_op = (calculation_1_op_flatten[j] - step_2_op[i])
                    step_4_op_lst.append(step_4_op)
            step_4_op_lst = np.array(step_4_op_lst)
            return step_4_op_lst    
        

    ###Step 6(1)
    def step_6_calculation(step_4_calc_op):
        step_6_calc_matrix = []
        for i in range(step_4_calc_op.shape[0]):
            emp_mat = []
            zero_mat = np.zeros([3,3])
            for j in range(0, step_4_calc_op.shape[0]):
                calc = step_4_calc_op[i] * step_4_calc_op[j]    
                emp_mat.append(calc)
            emp_mat = np.array(emp_mat)
            emp_mat[i] = zero_mat
            step_6_calc_matrix.append(emp_mat)
        step_6_calc_matrix = np.array(step_6_calc_matrix)
        step_6_calculatns_swap = step_6_calc_matrix.copy()
        step_6_calculatns_swap[6] = step_6_calc_matrix[8]
        step_6_calculatns_swap[8] = step_6_calc_matrix[6]
        return step_6_calculatns_swap



    ###Step 6 (Sum)
    def step_6_calc_sum(step_6_calc_op, calculation_5_op):
        calculation_5_op_flat = calculation_5_op.flatten()
        sum_list_outer = []
        for i in range(step_6_calc_op.shape[0]):
            sum_list_1 = []
            for j in range(step_6_calc_op[i].shape[0]):
                sum_list_1.append(np.sum(step_6_calc_op[i][j]))
                if sum_list_1[j] == 0:
                    sum_list_1[j] = calculation_5_op_flat[j]
            sum_list_1 = np.array(sum_list_1).reshape(3,3)
            sum_list_outer.append(sum_list_1)
        sum_list_outer_array = np.array(sum_list_outer)
        return sum_list_outer_array
        

     # Function to swap the 7th & 9th matrices
    def step_7_swapping(step_6_calc_sum_op):
        step_6_calculatns_sum_new = step_6_calc_sum_op.copy()
        step_6_calculatns_sum_new[6] = step_6_calc_sum_op[8]
        step_6_calculatns_sum_new[8] = step_6_calc_sum_op[6]
        return step_6_calculatns_sum_new   
    


        # Step 8 (1) (a)
    def step_8_1_a(calculation_5_op, step_6_calc_sum_swap):
        calculation_5_op_flat = calculation_5_op.flatten()
        lst_1 = []
        for i in range(calculation_5_op_flat.size):
                lst_0 = []
                step_6_calc_sum_swap_flat = step_6_calc_sum_swap[i].flatten()
                for j in range(step_6_calc_sum_swap_flat.size):
                    lst_0.append(step_6_calc_sum_swap_flat[j]/np.sqrt(calculation_5_op_flat[i] * calculation_5_op_flat[j]))
                    lst_0 = np.array(lst_0).reshape(3,3)
                    lst_1.append(lst_0)
        step_8_1_a_op = np.array(lst_1)
        return step_8_1_a_op
    


    # Step 8 (b)
    def step_8_b(step_8_1_a_op):
        step_8_1_a_op_h_1 = np.hstack((step_8_1_a_op[0], step_8_1_a_op[1], step_8_1_a_op[2]))
        step_8_1_a_op_h_2 = np.hstack((step_8_1_a_op[3], step_8_1_a_op[4], step_8_1_a_op[5])) 
        step_8_1_a_op_h_3 = np.hstack((step_8_1_a_op[6], step_8_1_a_op[7], step_8_1_a_op[8])) 
        step_8_1_b_op_v = np.vstack((step_8_1_a_op_h_1, step_8_1_a_op_h_2, step_8_1_a_op_h_3))
        return step_8_1_b_op_v
    

        # Step 8 (1)
    def calculation_8_1(step_8_1_b_op_v):
        kernel = np.ones((3,3)) / 9.
        calc_8_1_op = convolve2d(step_8_1_b_op_v, kernel, mode='valid')
        calc_8_1_op_final = calc_8_1_op[:3,:3]
        return calc_8_1_op_final
    

        ###Step 8(2)
    def step_8_2_a(step_8_1_a_op):
        step_8_2_a_op = step_8_1_a_op.copy()
        step_8_2_a_op[0] = step_8_1_a_op[1]
        step_8_2_a_op[1] = step_8_1_a_op[2]
        step_8_2_a_op[2] = step_8_1_a_op[3]
        step_8_2_a_op[3] = step_8_1_a_op[4]
        step_8_2_a_op[4] = step_8_1_a_op[5]
        step_8_2_a_op[6] = step_8_1_a_op[7]
        step_8_2_a_op[7] = step_8_1_a_op[8]
        step_8_2_a_op[8] = step_8_1_a_op[0]
        return step_8_2_a_op
    
    def calculation_8_2(step_8_2_a_op_v):
        kernel = np.ones((3,3)) / 9.
        calc_8_2_op = convolve2d(step_8_2_a_op_v, kernel, mode='valid')
        calc_8_2_op_final = calc_8_2_op[:3,:3]
        return calc_8_2_op_final


    
        ###Step 8(3)
    def step_8_3_a(step_8_1_a_op):
        step_8_3_a_op = step_8_1_a_op.copy()
        step_8_3_a_op[0] = step_8_1_a_op[2]
        step_8_3_a_op[1] = step_8_1_a_op[3]
        step_8_3_a_op[2] = step_8_1_a_op[4]
        step_8_3_a_op[3] = step_8_1_a_op[5]
        step_8_3_a_op[4] = step_8_1_a_op[5]
        step_8_3_a_op[5] = step_8_1_a_op[7]
        step_8_3_a_op[6] = step_8_1_a_op[8]
        step_8_3_a_op[7] = step_8_1_a_op[0]
        step_8_3_a_op[8] = step_8_1_a_op[1]
        return step_8_3_a_op
    


        ###Step 8(4)
    def step_8_4_a(step_8_1_a_op):
        step_8_4_a_op = step_8_1_a_op.copy()
        step_8_4_a_op[0] = step_8_1_a_op[3]
        step_8_4_a_op[1] = step_8_1_a_op[4]
        step_8_4_a_op[2] = step_8_1_a_op[5]
        step_8_4_a_op[3] = step_8_1_a_op[5]
        step_8_4_a_op[4] = step_8_1_a_op[7]
        step_8_4_a_op[5] = step_8_1_a_op[8]
        step_8_4_a_op[6] = step_8_1_a_op[0]
        step_8_4_a_op[7] = step_8_1_a_op[1]
        step_8_4_a_op[8] = step_8_1_a_op[2]
        return step_8_4_a_op
    


        ###Step 8(5)
    def step_8_5_a(step_8_1_a_op):
        step_8_5_a_op = step_8_1_a_op.copy()
        step_8_5_a_op[0] = step_8_1_a_op[4]
        step_8_5_a_op[1] = step_8_1_a_op[5]
        step_8_5_a_op[2] = step_8_1_a_op[5]
        step_8_5_a_op[3] = step_8_1_a_op[7]
        step_8_5_a_op[4] = step_8_1_a_op[8]
        step_8_5_a_op[5] = step_8_1_a_op[0]
        step_8_5_a_op[6] = step_8_1_a_op[1]
        step_8_5_a_op[7] = step_8_1_a_op[2]
        step_8_5_a_op[8] = step_8_1_a_op[3]
        return step_8_5_a_op
    


    ###Step 8(6)
    def step_8_6_a(step_8_1_a_op):
        step_8_6_a_op = step_8_1_a_op.copy()
        step_8_6_a_op[0] = step_8_1_a_op[5]
        step_8_6_a_op[1] = step_8_1_a_op[4]
        step_8_6_a_op[2] = step_8_1_a_op[3]
        step_8_6_a_op[3] = step_8_1_a_op[2]
        step_8_6_a_op[4] = step_8_1_a_op[1]
        step_8_6_a_op[5] = step_8_1_a_op[0]
        step_8_6_a_op[6] = step_8_1_a_op[2]
        step_8_6_a_op[7] = step_8_1_a_op[3]
        step_8_6_a_op[8] = step_8_1_a_op[4]
        return step_8_6_a_op
    

    ###Step 8(7)
    def step_8_7_a(step_8_1_a_op):
        step_8_7_a_op = step_8_1_a_op.copy()
        step_8_7_a_op[0] = step_8_1_a_op[6]
        step_8_7_a_op[1] = step_8_1_a_op[5]
        step_8_7_a_op[2] = step_8_1_a_op[4]
        step_8_7_a_op[3] = step_8_1_a_op[3]
        step_8_7_a_op[4] = step_8_1_a_op[2]
        step_8_7_a_op[5] = step_8_1_a_op[1]
        step_8_7_a_op[6] = step_8_1_a_op[3]
        step_8_7_a_op[7] = step_8_1_a_op[4]
        step_8_7_a_op[8] = step_8_1_a_op[5]
        return step_8_7_a_op
    


    ###Step 8(8)
    def step_8_8_a(step_8_1_a_op):
        step_8_8_a_op = step_8_1_a_op.copy()
        step_8_8_a_op[0] = step_8_1_a_op[7]
        step_8_8_a_op[1] = step_8_1_a_op[6]
        step_8_8_a_op[2] = step_8_1_a_op[5]
        step_8_8_a_op[3] = step_8_1_a_op[4]
        step_8_8_a_op[4] = step_8_1_a_op[3]
        step_8_8_a_op[5] = step_8_1_a_op[2]
        step_8_8_a_op[6] = step_8_1_a_op[4]
        step_8_8_a_op[7] = step_8_1_a_op[5]
        step_8_8_a_op[8] = step_8_1_a_op[6]
        return step_8_8_a_op
    


        ###Step 8(9)
    def step_8_9_a(step_8_1_a_op):
        step_8_9_a_op = step_8_1_a_op.copy()
        step_8_9_a_op[0] = step_8_1_a_op[8]
        step_8_9_a_op[1] = step_8_1_a_op[7]
        step_8_9_a_op[2] = step_8_1_a_op[6]
        step_8_9_a_op[3] = step_8_1_a_op[5]
        step_8_9_a_op[4] = step_8_1_a_op[4]
        step_8_9_a_op[5] = step_8_1_a_op[3]
        step_8_9_a_op[6] = step_8_1_a_op[5]
        step_8_9_a_op[7] = step_8_1_a_op[6]
        step_8_9_a_op[8] = step_8_1_a_op[7]
        return step_8_9_a_op
    

        ###Step 10(1)
    def step_10_1_a(calculation_5_a_op, calc_9_final_op):
        step_10_1_a_op = []
        for i in range(calculation_5_a_op.shape[0]):
            for j in range(calculation_5_a_op.shape[1]):
                step_10_1_a_op.append((calculation_5_a_op[i][j]/calculation_5_a_op)*calc_9_final_op[i][j])
        step_10_1_a_op = np.array(step_10_1_a_op)
        return step_10_1_a_op
    

    def step_12_1(step_10_all_ops, calculation_1_op):
        step_12_1_op = []
        for step_10_i_op in step_10_all_ops:
            # Call step_8_b function here
            step_10_i_op_reshaped = StockService.step_8_b(step_10_i_op)
            calculatn_12_1_a = StockService.calculation_8_1(step_10_i_op_reshaped)
            calculation_12_1_a_final = calculatn_12_1_a * calculation_1_op
            step_12_1_op.append(calculation_12_1_a_final)
        step_12_1_op = np.array(step_12_1_op)
        return step_12_1_op
    



    def step_14_func(step_2_op, calc_9_final_op, calc_13_final_op):
        step_2_op_flat = np.array([matrix.flatten() for matrix in step_2_op])
        step_2_op_flat_reshape = []
        for i in range(step_2_op_flat.shape[0]):
            step_2_op_flat_reshape.append(step_2_op_flat[i][i])
        step_2_op_flat_reshape = np.array(step_2_op_flat_reshape).reshape(3,3)
        step_14_op = ((-1 * calc_9_final_op) * step_2_op_flat_reshape) + calc_13_final_op
        return step_14_op
    


    # 20 - first function
# i stands for the index of flattened calculation_2_op - calculation_2_op_flat
    def step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, i):
        calculation_2_op_flat = calculation_2_op.flatten()
        calculation_2_op_i = calculation_2_op_flat[i]
        step_20_first_op = ((-1 * calc_9_final_op) * calculation_2_op_i) + calc_13_final_op 
        return step_20_first_op
    

        # 20 - second function
    def step_20_second(step_20_first_op, y_factor, x_factor):
        step_20_second_op = (y_factor - step_20_first_op)/x_factor
        return step_20_second_op


        ###STEP 20 - Calculation
    def step_20_calculation(step_20_second_op_i):
        avg = np.mean(step_20_second_op_i)
        return avg
    


        ###STEP 20 - Calculation
    def step_20_calculation(step_20_second_op_i):
        avg = np.mean(step_20_second_op_i)
        return avg
    

    def step_21(step_20_calc_op_lst, step_18_op_lst, int_open):
        step_21_op = (int_open - step_20_calc_op_lst) + step_18_op_lst
        return step_21_op
    

    def calc_30_map_ranks(step_9_op, rank_calculation_5):
        rank_calculation_5_flat = rank_calculation_5.flatten()
        step_13_op_flat = step_9_op.flatten()
        calc_13_op_sorted = np.sort(step_13_op_flat)[::-1][:9]
        calc_13_final_op = calc_13_op_sorted[rank_calculation_5_flat - 1].reshape(3,3)
        return calc_13_final_op
    

    def step_in_funct(step_14ans,step_4ans,calculation_5_op_step_in):
        li=[]
        temp_val_1=step_14ans[1][0]
        temp_val_2=step_4ans[1][1]
        temp_val=temp_val_1*temp_val_2
        step_14ans=step_14ans.flatten()
        for i in step_14ans:
            li.append(i*step_4ans)
        np_li=np.array(li)
        np_li[0][1][1]=temp_val
        np_sq=np.square(np_li)
        sum_val=np.sum(np_sq)
        return sum_val/calculation_5_op_step_in
    

    def function_first_22_steps(df):
        # Step 1 - Converting 81 values into np array
        step_1_op = StockService.step_1_func(df)

        # Step 2 - Reshaping the 81 values into multidimensional matrix of shape (9, 3, 3)
        # Function : step_2_func, IP : step_1_op (9, 3, 3), OP : step_2_op
        step_2_op = StockService.step_2_func(step_1_op) 

        # Step 2 : Calculation 1 
        calculation_1_op = StockService.step_2_cal_1(step_2_op)

        # Step 2 : Calculation 2 
        calculation_2_op = StockService.step_2_cal_2(step_2_op)

        # Step 3 
        step_3_op_lst = StockService.step_3_func_cal(step_2_op, calculation_1_op)

        # Step 4 Calculation
        step_4_calc_op =StockService. step_4_func_cal(step_2_op, calculation_1_op)


        step_4_in_inter_1=step_4_calc_op[1]
        
        

        # Step 5 
        step_5_op = step_4_calc_op ** 2

        ## Calculation 5 - sum of elements of each matrix of step_5_op
        calculation_5_op = np.array([np.sum(step_5_op[i]) for i in range(step_5_op.shape[0])]).reshape(3,3)
        calculation_5_op_step_in=calculation_5_op[0][1]

        ## Calculation 5(a)
        calculation_5_a_op = np.sqrt(calculation_5_op/9)

        ## ranking - linked to calculation 5
        rank_calculation_5 = np.array(len(list(calculation_5_op.flatten())) + 1 - rankdata(calculation_5_op).astype(int)).reshape(3,3)
        
        ## x_factor
        x_factor = np.mean(calculation_5_op)

        # Step 6 
        ## Step 6(1)
        step_6_calc_op = StockService.step_6_calculation(step_4_calc_op)

        ## Step 6 (Sum)
        step_6_calc_sum_op = StockService.step_6_calc_sum(step_6_calc_op, calculation_5_op)

        # Step 7 
        step_6_calc_sum_swap =StockService. step_7_swapping(step_6_calc_sum_op)

        # Step 8
        ## Step 8(1)
        step_8_1_a_op = StockService.step_8_1_a(calculation_5_op, step_6_calc_sum_swap)
        step_8_1_b_op_v = StockService.step_8_b(step_8_1_a_op)
        calc_8_1_op_final =StockService.calculation_8_1(step_8_1_b_op_v)

        ## Step 8(2)
        step_8_2_a_op = StockService.step_8_2_a(step_8_1_a_op)
        step_8_2_a_op_v = StockService.step_8_b(step_8_2_a_op)
        calc_8_2_op_final = StockService.calculation_8_2(step_8_2_a_op_v)

        ## Step 8(3)
        step_8_3_a_op = StockService.step_8_3_a(step_8_1_a_op)
        step_8_3_a_op_v = StockService.step_8_b(step_8_3_a_op)
        calc_8_3_op_final =StockService. calculation_8_2(step_8_3_a_op_v)

        ## Step 8(4)
        step_8_4_a_op = StockService.step_8_4_a(step_8_1_a_op)
        step_8_4_a_op_v = StockService.step_8_b(step_8_4_a_op)
        calc_8_4_op_final = StockService.calculation_8_2(step_8_4_a_op_v)

        ## Step 8(5)
        step_8_5_a_op = StockService.step_8_5_a(step_8_1_a_op)
        step_8_5_a_op_v = StockService.step_8_b(step_8_5_a_op)
        calc_8_5_op_final = StockService.calculation_8_2(step_8_5_a_op_v)

        ## Step 8(6)
        step_8_6_a_op = StockService.step_8_6_a(step_8_1_a_op)
        step_8_6_a_op_v = StockService.step_8_b(step_8_6_a_op)
        calc_8_6_op_final = StockService.calculation_8_2(step_8_6_a_op_v)
        
        ## Step 8(7)
        step_8_7_a_op = StockService.step_8_7_a(step_8_1_a_op)
        step_8_7_a_op_v = StockService.step_8_b(step_8_7_a_op)
        calc_8_7_op_final = StockService.calculation_8_2(step_8_7_a_op_v)
        
        ## Step 8(8)
        step_8_8_a_op = StockService.step_8_8_a(step_8_1_a_op)
        step_8_8_a_op_v = StockService.step_8_b(step_8_8_a_op)
        calc_8_8_op_final = StockService.calculation_8_2(step_8_8_a_op_v)

        ## Step 8(9)
        step_8_9_a_op = StockService.step_8_9_a(step_8_1_a_op)
        step_8_9_a_op_v = StockService.step_8_b(step_8_9_a_op)
        calc_8_9_op_final = StockService.calculation_8_2(step_8_9_a_op_v)

        # Step 9 
        step_9_op = np.array([calc_8_1_op_final, calc_8_2_op_final, calc_8_3_op_final,
                                calc_8_4_op_final, calc_8_5_op_final, calc_8_6_op_final,
                                calc_8_7_op_final, calc_8_8_op_final, calc_8_9_op_final])
        
        step_9_op_flat = step_9_op.flatten()
        calc_9_op_sorted = np.sort(step_9_op_flat)[::-1][:9]

        rank_calculation_5_flat = rank_calculation_5.flatten()
        calc_9_final_op = calc_9_op_sorted[rank_calculation_5_flat - 1].reshape(3,3)

        # Step 10 
        ###Step 10(1)
        step_10_1_a_op = StockService.step_10_1_a(calculation_5_a_op, calc_9_final_op)

        ####Special Calculations (Marked in RED) - 1
        step_10_1_a_op[2][1][0] = ((calculation_5_a_op[0][2]/calculation_5_a_op) * calc_9_final_op[1][0])[1][0]
        # Special Calculation (Marked in RED) - 2
        step_10_1_a_op[3][1][0] = ((calculation_5_a_op[1][0]/calculation_5_a_op) * calc_9_final_op[2][0])[1][0]
        # Special Calculation (Marked in RED) - 3
        step_10_1_a_op[4][1][2] = ((calculation_5_a_op[1][1]/calculation_5_a_op) * calc_9_final_op[2][1])[1][2]

        ###Step 10(2)
        step_10_2_op = step_10_1_a_op[[1,2,3,4,5,6,7,8,0]]

        ###Step 10(3)
        step_10_3_op = step_10_1_a_op[[2,3,4,5,6,7,8,0,1]]

        ###Step 10(4)
        step_10_4_op = step_10_1_a_op[[3,4,5,6,7,8,0,1,2]]

        ###Step 10(5)
        step_10_5_op = step_10_1_a_op[[4,5,6,7,8,0,1,2,3]]

        ###Step 10(6)
        step_10_6_op = step_10_1_a_op[[5,4,7,2,1,1,2,3,4]]

        ###Step 10(7)
        step_10_7_op = step_10_1_a_op[[6,5,2,3,2,2,3,4,5]]

        ###Step 10(8)
        step_10_8_op = step_10_1_a_op[[7,6,3,4,3,3,4,5,6]]

        ###Step 10(9)
        step_10_9_op = step_10_1_a_op[[8,7,4,5,4,4,5,6,7]]
        
        # Step 11
        step_11_op = step_10_1_a_op * step_2_op

        # Step 12
        ## Step 12(1)
        step_10_1_a_op_reshaped = StockService.step_8_b(step_10_1_a_op)
        calculatn_12_1_a = StockService.calculation_8_1(step_10_1_a_op_reshaped)

        step_10_2_op_reshaped = StockService.step_8_b(step_10_2_op)
        calculatn_12_1_b = StockService.calculation_8_1(step_10_2_op_reshaped)

        ## Storing all step 10 outputs in a list
        step_10_all_ops = [step_10_1_a_op, step_10_2_op, step_10_3_op, 
                        step_10_4_op, step_10_5_op, step_10_6_op, 
                        step_10_7_op, step_10_8_op, step_10_9_op]

        ####Step 12(1) Calculations
        step_12_1_op = StockService.step_12_1(step_10_all_ops, calculation_1_op)
        step_12_1_op_reshaped = StockService.step_8_b(step_12_1_op)
        calculatn_12_1_op = StockService.calculation_8_1(step_12_1_op_reshaped)

            ###Step 12(2) 
        step_12_2_op = step_12_1_op[[1,2,3,4,5,6,7,8,0]]
        step_12_2_op_reshaped = StockService.step_8_b(step_12_2_op)
            ####Step 12(2) Calculation
        calculatn_12_2_op = StockService.calculation_8_1(step_12_2_op_reshaped)

            ###Step 12(3)
        step_12_3_op = step_12_1_op[[2,3,4,5,6,7,8,0,1]]
        step_12_3_op_reshaped = StockService. step_8_b(step_12_3_op)
            ####Step 12(3) Calculation
        calculatn_12_3_op = StockService.calculation_8_1(step_12_3_op_reshaped)

            ###Step 12(4)
        step_12_4_op = step_12_1_op[[3,4,5,6,7,8,0,1,2]]
        step_12_4_op_reshaped = StockService.step_8_b(step_12_4_op)
            ####Step 12(4) Calculation
        calculatn_12_4_op =StockService.calculation_8_1(step_12_4_op_reshaped)

            ###Step 12(5)
        step_12_5_op = step_12_1_op[[4,5,6,7,8,0,1,2,3]]
        step_12_5_op_reshaped = StockService.step_8_b(step_12_5_op)
            ####Step 12(5) Calculation
        calculatn_12_5_op = StockService.calculation_8_1(step_12_5_op_reshaped)

            ###Step 12(6)
        step_12_6_op = step_12_1_op[[5,4,3,2,1,0,8,7,6]]
        step_12_6_op_reshaped = StockService.step_8_b(step_12_6_op)
            ###Step 12(6) Calculation
        calculatn_12_6_op = StockService.calculation_8_1(step_12_6_op_reshaped)

            ###Step 12(7)
        step_12_7_op = step_12_1_op[[6,5,4,3,2,1,0,8,7]]
        step_12_7_op_reshaped = StockService.step_8_b(step_12_7_op)
            ####Step 12(7) Calculation
        calculatn_12_7_op = StockService.calculation_8_1(step_12_7_op_reshaped) 

            ###Step 12(8)
        step_12_8_op = step_12_1_op[[7,6,5,4,3,2,1,0,8]]
        step_12_8_op_reshaped = StockService.step_8_b(step_12_8_op)
            ####Step 12(8) Calculation
        calculatn_12_8_op = StockService.calculation_8_1(step_12_8_op_reshaped)

            ###Step 12(9)
        step_12_9_op = step_12_1_op[[8,7,6,5,4,3,2,1,0]]
        step_12_9_op_reshaped = StockService.step_8_b(step_12_9_op)
            ####Step 12(9) Calculation
        calculatn_12_9_op =StockService.calculation_8_1(step_12_9_op_reshaped)              
        
        # Step 13 
        step_13_op = np.array([calculatn_12_1_op, calculatn_12_2_op, calculatn_12_3_op,
                            calculatn_12_4_op, calculatn_12_5_op, calculatn_12_6_op,
                            calculatn_12_7_op, calculatn_12_8_op, calculatn_12_9_op])
                            
        step_13_op_flat = step_13_op.flatten()
        calc_13_op_sorted = np.sort(step_13_op_flat)[::-1][:9]
        calc_13_final_op = calc_13_op_sorted[rank_calculation_5_flat - 1].reshape(3,3)	

        # Step 14 
        step_14_op = StockService.step_14_func(step_2_op, calc_9_final_op, calc_13_final_op)
        sum_val_from_stepin=StockService.step_in_funct(step_14_op,step_4_in_inter_1,calculation_5_op_step_in)

        # Step 15 
        step_15_op = step_14_op**2
        a1 = np.sum(step_15_op)
        a2 = np.sqrt(a1/9)

        # Step 16 
        step_16_op = step_4_calc_op * step_14_op
        calculatn_16_op = np.array([np.sum(matrix) for matrix in step_16_op]).reshape(3,3)

        # Step 17 
        step_17_op = a1 / np.sqrt(a1 * calculation_5_op)
        demom_v1=a1*calculation_5_op[0][1]
        denom_v1_sq=np.sqrt(demom_v1)

        step_17_op[0][1]=sum_val_from_stepin/denom_v1_sq
        # Step 18 
        step_18_op = calculation_2_op / step_17_op
        y_factor = np.mean(step_18_op)
        
        # Step 19
        step_19_op = (y_factor - step_14_op)/x_factor
        int_open = np.mean(step_19_op) - y_factor

        # Step 20 
        ###STEP 20(1)
        # For the 1st calculation, 0 is the index value to be passed
        step_20_first_op_1 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 0)
        step_20_second_op_1 = StockService.step_20_second(step_20_first_op_1, y_factor, x_factor)

        ###STEP 20(2)
        step_20_first_op_2 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 1)
        step_20_second_op_2 = StockService.step_20_second(step_20_first_op_2, y_factor, x_factor)

        ###STEP 20(3)
        step_20_first_op_3 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 2)
        step_20_second_op_3 = StockService.step_20_second(step_20_first_op_3, y_factor, x_factor)

        ###STEP 20(4)
        step_20_first_op_4 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 3)
        step_20_second_op_4 = StockService.step_20_second(step_20_first_op_4, y_factor, x_factor)

        ###STEP 20(5)
        step_20_first_op_5 =StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 4)
        step_20_second_op_5 = StockService.step_20_second(step_20_first_op_5, y_factor, x_factor) 

        ###STEP 20(6)
        step_20_first_op_6 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 5)
        step_20_second_op_6 = StockService.step_20_second(step_20_first_op_6, y_factor, x_factor)

        ###STEP 20(7)
        step_20_first_op_7 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 6)
        step_20_second_op_7 = StockService.step_20_second(step_20_first_op_7, y_factor, x_factor)

        ###STEP 20(8)
        step_20_first_op_8 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 7)
        step_20_second_op_8 = StockService.step_20_second(step_20_first_op_8, y_factor, x_factor)

        ###STEP 20(9)
        step_20_first_op_9 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 8)
        step_20_second_op_9 = StockService.step_20_second(step_20_first_op_9, y_factor, x_factor)
        
        ### Average calculation for each output from step 20
        avg_1 =StockService.step_20_calculation(step_20_second_op_1)
        avg_2 = StockService.step_20_calculation(step_20_second_op_2)
        avg_3 = StockService.step_20_calculation(step_20_second_op_3)
        avg_4 = StockService.step_20_calculation(step_20_second_op_4)
        avg_5 = StockService.step_20_calculation(step_20_second_op_5)
        avg_6 = StockService.step_20_calculation(step_20_second_op_6)
        avg_7 = StockService.step_20_calculation(step_20_second_op_7)
        avg_8 = StockService.step_20_calculation(step_20_second_op_8)
        avg_9 = StockService.step_20_calculation(step_20_second_op_9)

        ### Storing all the avg values in np array (3,3)
        step_20_calc_op = np.array([avg_1, avg_2, avg_3, avg_5, avg_5, avg_6, avg_7, avg_8, avg_9]).reshape(3,3)

        # Flattening the arrays for step 21
        step_20_calc_op_lst = step_20_calc_op.reshape(-1)
        step_18_op_lst = step_18_op.reshape(-1)

        # Step 21
        step_21_op = StockService.step_21(step_20_calc_op_lst, step_18_op_lst, int_open)
        return step_21_op
    

    def function_next_22_steps(step_1_op):
        # Step 1 - Converting 81 values into np array
        # step_1_op = step_1_func(df)

        # Step 2 - Reshaping the 81 values into multidimensional matrix of shape (9, 3, 3)
        # Function : step_2_func, IP : step_1_op (9, 3, 3), OP : step_2_op
        step_2_op = StockService.step_2_func(step_1_op) 

        # Step 2 : Calculation 1 
        calculation_1_op = StockService.step_2_cal_1(step_2_op)

        # Step 2 : Calculation 2 
        calculation_2_op = StockService.step_2_cal_2(step_2_op)

        # Step 3 
        step_3_op_lst = StockService.step_3_func_cal(step_2_op, calculation_1_op)

        # Step 4 Calculation
        step_4_calc_op =StockService.step_4_func_cal(step_2_op, calculation_1_op)
        step_4_in_inter_1=step_4_calc_op[1]
        # Step 5 
        step_5_op = step_4_calc_op ** 2

        ## Calculation 5 - sum of elements of each matrix of step_5_op
        calculation_5_op = np.array([np.sum(step_5_op[i]) for i in range(step_5_op.shape[0])]).reshape(3,3)
        calculation_5_op_step_in=calculation_5_op[0][1]

        ## Calculation 5(a)
        calculation_5_a_op = np.sqrt(calculation_5_op/9)

        ## ranking - linked to calculation 5
        rank_calculation_5 = np.array(len(list(calculation_5_op.flatten())) + 1 - rankdata(calculation_5_op).astype(int)).reshape(3,3)
        rank_calculation_5_flat = rank_calculation_5.flatten() 
        
        ## x_factor
        x_factor = np.mean(calculation_5_op)

        # Step 6 
        ## Step 6(1)
        step_6_calc_op = StockService.step_6_calculation(step_4_calc_op)

        ## Step 6 (Sum)
        step_6_calc_sum_op = StockService.step_6_calc_sum(step_6_calc_op, calculation_5_op)

        # Step 7 
        step_6_calc_sum_swap = StockService.step_7_swapping(step_6_calc_sum_op)

        # Step 8
        ## Step 8(1)
        step_8_1_a_op =StockService. step_8_1_a(calculation_5_op, step_6_calc_sum_swap)
        step_8_1_b_op_v = StockService.step_8_b(step_8_1_a_op)
        calc_8_1_op_final =StockService. calculation_8_1(step_8_1_b_op_v)

        ## Step 8(2)
        step_8_2_a_op = StockService.step_8_2_a(step_8_1_a_op)
        step_8_2_a_op_v =StockService. step_8_b(step_8_2_a_op)
        calc_8_2_op_final = StockService.calculation_8_2(step_8_2_a_op_v)

        ## Step 8(3)
        step_8_3_a_op = StockService.step_8_3_a(step_8_1_a_op)
        step_8_3_a_op_v = StockService.step_8_b(step_8_3_a_op)
        calc_8_3_op_final =StockService.calculation_8_2(step_8_3_a_op_v)

        ## Step 8(4)
        step_8_4_a_op = StockService.step_8_4_a(step_8_1_a_op)
        step_8_4_a_op_v = StockService.step_8_b(step_8_4_a_op)
        calc_8_4_op_final =StockService. calculation_8_2(step_8_4_a_op_v)

        ## Step 8(5)
        step_8_5_a_op =StockService. step_8_5_a(step_8_1_a_op)
        step_8_5_a_op_v =StockService. step_8_b(step_8_5_a_op)
        calc_8_5_op_final = StockService.calculation_8_2(step_8_5_a_op_v)

        ## Step 8(6)
        step_8_6_a_op =StockService. step_8_6_a(step_8_1_a_op)
        step_8_6_a_op_v =StockService. step_8_b(step_8_6_a_op)
        calc_8_6_op_final =StockService. calculation_8_2(step_8_6_a_op_v)
        
        ## Step 8(7)
        step_8_7_a_op = StockService.step_8_7_a(step_8_1_a_op)
        step_8_7_a_op_v = StockService.step_8_b(step_8_7_a_op)
        calc_8_7_op_final = StockService.calculation_8_2(step_8_7_a_op_v)
        
        ## Step 8(8)
        step_8_8_a_op =StockService. step_8_8_a(step_8_1_a_op)
        step_8_8_a_op_v = StockService.step_8_b(step_8_8_a_op)
        calc_8_8_op_final =StockService. calculation_8_2(step_8_8_a_op_v)

        ## Step 8(9)
        step_8_9_a_op = StockService.step_8_9_a(step_8_1_a_op)
        step_8_9_a_op_v = StockService.step_8_b(step_8_9_a_op)
        calc_8_9_op_final = StockService.calculation_8_2(step_8_9_a_op_v)

        # Step 9 (NEW Calculation - Fixed)
        step_9_op = np.array([calc_8_1_op_final, calc_8_2_op_final, calc_8_3_op_final,
                                calc_8_4_op_final, calc_8_5_op_final, calc_8_6_op_final,
                                calc_8_7_op_final, calc_8_8_op_final, calc_8_9_op_final])
        
        #step_9_op_flat = step_9_op.flatten()
        #calc_9_op_sorted = np.sort(step_9_op_flat)[::-1][:9]

        #rank_calculation_5_flat = rank_calculation_5.flatten()
        #calc_9_final_op = calc_9_op_sorted[rank_calculation_5_flat - 1].reshape(3,3)
        
        calc_9_final_op = StockService.calc_30_map_ranks(step_9_op, rank_calculation_5)
        
        # Step 10 
        ###Step 10(1)
        step_10_1_a_op = StockService.step_10_1_a(calculation_5_a_op, calc_9_final_op)

        ####Special Calculations (Marked in RED) - 1
        step_10_1_a_op[2][1][0] = ((calculation_5_a_op[0][2]/calculation_5_a_op) * calc_9_final_op[1][0])[1][0]
        # Special Calculation (Marked in RED) - 2
        step_10_1_a_op[3][1][0] = ((calculation_5_a_op[1][0]/calculation_5_a_op) * calc_9_final_op[2][0])[1][0]
        # Special Calculation (Marked in RED) - 3
        step_10_1_a_op[4][1][2] = ((calculation_5_a_op[1][1]/calculation_5_a_op) * calc_9_final_op[2][1])[1][2]

        ###Step 10(2)
        step_10_2_op = step_10_1_a_op[[1,2,3,4,5,6,7,8,0]]

        ###Step 10(3)
        step_10_3_op = step_10_1_a_op[[2,3,4,5,6,7,8,0,1]]

        ###Step 10(4)
        step_10_4_op = step_10_1_a_op[[3,4,5,6,7,8,0,1,2]]

        ###Step 10(5)
        step_10_5_op = step_10_1_a_op[[4,5,6,7,8,0,1,2,3]]

        ###Step 10(6)
        step_10_6_op = step_10_1_a_op[[5,4,7,2,1,1,2,3,4]]

        ###Step 10(7)
        step_10_7_op = step_10_1_a_op[[6,5,2,3,2,2,3,4,5]]

        ###Step 10(8)
        step_10_8_op = step_10_1_a_op[[7,6,3,4,3,3,4,5,6]]

        ###Step 10(9)
        step_10_9_op = step_10_1_a_op[[8,7,4,5,4,4,5,6,7]]
        
        # Step 11
        step_11_op = step_10_1_a_op * step_2_op

        # Step 12
        ## Step 12(1)
        step_10_1_a_op_reshaped =StockService. step_8_b(step_10_1_a_op)
        calculatn_12_1_a = StockService.calculation_8_1(step_10_1_a_op_reshaped)

        step_10_2_op_reshaped =StockService. step_8_b(step_10_2_op)
        calculatn_12_1_b = StockService.calculation_8_1(step_10_2_op_reshaped)

        ## Storing all step 10 outputs in a list
        step_10_all_ops = [step_10_1_a_op, step_10_2_op, step_10_3_op, 
                        step_10_4_op, step_10_5_op, step_10_6_op, 
                        step_10_7_op, step_10_8_op, step_10_9_op]

        ####Step 12(1) Calculations
        step_12_1_op = StockService.step_12_1(step_10_all_ops, calculation_1_op)
        step_12_1_op_reshaped = StockService.step_8_b(step_12_1_op)
        calculatn_12_1_op =StockService. calculation_8_1(step_12_1_op_reshaped)

            ###Step 12(2) 
        step_12_2_op = step_12_1_op[[1,2,3,4,5,6,7,8,0]]
        step_12_2_op_reshaped =StockService.step_8_b(step_12_2_op)
            ####Step 12(2) Calculation
        calculatn_12_2_op = StockService.calculation_8_1(step_12_2_op_reshaped)

            ###Step 12(3)
        step_12_3_op = step_12_1_op[[2,3,4,5,6,7,8,0,1]]
        step_12_3_op_reshaped = StockService.step_8_b(step_12_3_op)
            ####Step 12(3) Calculation
        calculatn_12_3_op = StockService.calculation_8_1(step_12_3_op_reshaped)

            ###Step 12(4)
        step_12_4_op = step_12_1_op[[3,4,5,6,7,8,0,1,2]]
        step_12_4_op_reshaped = StockService.step_8_b(step_12_4_op)
            ####Step 12(4) Calculation
        calculatn_12_4_op = StockService.calculation_8_1(step_12_4_op_reshaped)

            ###Step 12(5)
        step_12_5_op = step_12_1_op[[4,5,6,7,8,0,1,2,3]]
        step_12_5_op_reshaped =StockService. step_8_b(step_12_5_op)
            ####Step 12(5) Calculation
        calculatn_12_5_op = StockService.calculation_8_1(step_12_5_op_reshaped)

            ###Step 12(6)
        step_12_6_op = step_12_1_op[[5,4,3,2,1,0,8,7,6]]
        step_12_6_op_reshaped =StockService. step_8_b(step_12_6_op)
            ###Step 12(6) Calculation
        calculatn_12_6_op = StockService.calculation_8_1(step_12_6_op_reshaped)

            ###Step 12(7)
        step_12_7_op = step_12_1_op[[6,5,4,3,2,1,0,8,7]]
        step_12_7_op_reshaped = StockService.step_8_b(step_12_7_op)
            ####Step 12(7) Calculation
        calculatn_12_7_op =StockService. calculation_8_1(step_12_7_op_reshaped) 

            ###Step 12(8)
        step_12_8_op = step_12_1_op[[7,6,5,4,3,2,1,0,8]]
        step_12_8_op_reshaped =StockService. step_8_b(step_12_8_op)
            ####Step 12(8) Calculation
        calculatn_12_8_op =StockService. calculation_8_1(step_12_8_op_reshaped)

            ###Step 12(9)
        step_12_9_op = step_12_1_op[[8,7,6,5,4,3,2,1,0]]
        step_12_9_op_reshaped =StockService. step_8_b(step_12_9_op)
            ####Step 12(9) Calculation
        calculatn_12_9_op =StockService.calculation_8_1(step_12_9_op_reshaped)              
        
        # Step 13 
        step_13_op = np.array([calculatn_12_1_op, calculatn_12_2_op, calculatn_12_3_op,
                            calculatn_12_4_op, calculatn_12_5_op, calculatn_12_6_op,
                            calculatn_12_7_op, calculatn_12_8_op, calculatn_12_9_op])
                            
        step_13_op_flat = step_13_op.flatten()
        calc_13_op_sorted = np.sort(step_13_op_flat)[::-1][:9]
        calc_13_final_op = calc_13_op_sorted[rank_calculation_5_flat - 1].reshape(3,3)	

        # Step 14 
        step_14_op = StockService.step_14_func(step_2_op, calc_9_final_op, calc_13_final_op)
        sum_val_from_stepin= StockService.step_in_funct(step_14_op,step_4_in_inter_1,calculation_5_op_step_in)
        # Step 15 
        step_15_op = step_14_op**2
        a1 = np.sum(step_15_op)
        a2 = np.sqrt(a1/9)

        # Step 16 
        step_16_op = step_4_calc_op * step_14_op
        calculatn_16_op = np.array([np.sum(matrix) for matrix in step_16_op]).reshape(3,3)

        # Step 17 
        step_17_op = a1 / np.sqrt(a1 * calculation_5_op)
        demom_v1=a1*calculation_5_op[0][1]
        denom_v1_sq=np.sqrt(demom_v1)

        step_17_op[0][1]=sum_val_from_stepin/denom_v1_sq


        # Step 18 
        step_18_op = calculation_2_op / step_17_op
        y_factor = np.mean(step_18_op)
        
        # Step 19
        step_19_op = (y_factor - step_14_op)/x_factor
        int_open = np.mean(step_19_op) - y_factor

        # Step 20 
        ###STEP 20(1)
        # For the 1st calculation, 0 is the index value to be passed
        step_20_first_op_1 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 0)
        step_20_second_op_1 =StockService. step_20_second(step_20_first_op_1, y_factor, x_factor)

        ###STEP 20(2)
        step_20_first_op_2 =StockService. step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 1)
        step_20_second_op_2 = StockService.step_20_second(step_20_first_op_2, y_factor, x_factor)

        ###STEP 20(3)
        step_20_first_op_3 =StockService. step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 2)
        step_20_second_op_3 =StockService. step_20_second(step_20_first_op_3, y_factor, x_factor)

        ###STEP 20(4)
        step_20_first_op_4 =StockService. step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 3)
        step_20_second_op_4 =StockService. step_20_second(step_20_first_op_4, y_factor, x_factor)

        ###STEP 20(5)
        step_20_first_op_5 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 4)
        step_20_second_op_5 =StockService. step_20_second(step_20_first_op_5, y_factor, x_factor) 

        ###STEP 20(6)
        step_20_first_op_6 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 5)
        step_20_second_op_6 = StockService.step_20_second(step_20_first_op_6, y_factor, x_factor)

        ###STEP 20(7)
        step_20_first_op_7 =StockService. step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 6)
        step_20_second_op_7 = StockService.step_20_second(step_20_first_op_7, y_factor, x_factor)

        ###STEP 20(8)
        step_20_first_op_8 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 7)
        step_20_second_op_8 = StockService.step_20_second(step_20_first_op_8, y_factor, x_factor)

        ###STEP 20(9)
        step_20_first_op_9 = StockService.step_20_first(calc_13_final_op, calc_9_final_op, calculation_2_op, 8)
        step_20_second_op_9 =StockService. step_20_second(step_20_first_op_9, y_factor, x_factor)
        
        ### Average calculation for each output from step 20
        avg_1 = StockService.step_20_calculation(step_20_second_op_1)
        avg_2 = StockService.step_20_calculation(step_20_second_op_2)
        avg_3 = StockService.step_20_calculation(step_20_second_op_3)
        avg_4 = StockService.step_20_calculation(step_20_second_op_4)
        avg_5 = StockService.step_20_calculation(step_20_second_op_5)
        avg_6 = StockService.step_20_calculation(step_20_second_op_6)
        avg_7 = StockService.step_20_calculation(step_20_second_op_7)
        avg_8 = StockService.step_20_calculation(step_20_second_op_8)
        avg_9 = StockService.step_20_calculation(step_20_second_op_9)

        ### Storing all the avg values in np array (3,3)
        step_20_calc_op = np.array([avg_1, avg_2, avg_3, avg_5, avg_5, avg_6, avg_7, avg_8, avg_9]).reshape(3,3)

        # Flattening the arrays for step 21
        step_20_calc_op_lst = step_20_calc_op.reshape(-1)
        step_18_op_lst = step_18_op.reshape(-1)

        # Step 21
        step_21_op = StockService.step_21(step_20_calc_op_lst, step_18_op_lst, int_open)
        step_21_op_sorted = np.sort(step_21_op)[::-1][:9]

        return step_21_op_sorted
    


    def first_fold(df):
  # We will get 9 values after running 21 steps 
        step_21_op = StockService.function_first_22_steps(df)
        # First 81 values
        step_1_op =  StockService.step_1_func(df)
        step_1_op_first_8_out = step_1_op[8:]
        # Concatenating the first 8 values of step_21_op to the step_1_op 
        step_1_op_2nd_time = np.concatenate((step_1_op_first_8_out, step_21_op[:8]))
        # Passing step_1_op_2nd_time to function_next_22_folds
        first_fold_9_vals_op =  StockService.function_next_22_steps(step_1_op_2nd_time)
        return first_fold_9_vals_op
    

    def second_to_nine_fold(df):
        # We will get 9 values after running 21 steps 
        step_21_op = StockService.function_first_22_steps(df)
        # First 81 values 
        step_1_op = StockService.step_1_func(df)
        step_1_op_first_8_and_last_1_out = step_1_op[9:]
        # Concatenating the 9 values of step_21_op to the step_1_op_first_8_and_last_1_out 
        step_1_op_2nd_time = np.concatenate((step_1_op_first_8_and_last_1_out, step_21_op))
        # Passing step_1_op_2nd_time to function_next_22_folds
        first_fold_9_vals_op = StockService.function_next_22_steps(step_1_op_2nd_time)
        return first_fold_9_vals_op 
    

    def calc_nine_folds_diff(list_of_values_diffs):
        nine_folds_diff = np.array(list_of_values_diffs)
        return nine_folds_diff
    

    def calc_nine_avgs_diff(nine_folds_diff):
        nine_folds_diff_transposed = nine_folds_diff.T
        nine_avgs_diff = np.array([np.mean(li) for li in nine_folds_diff_transposed])
        return nine_avgs_diff
    

    def calc_inter_1(nine_avgs_diff,nine_folds_diff,df_fold_diff_1):
        # Storing the first & last means from the nine_avgs 
        #   n_3 = nine_avgs_diff[0]
        #   n_11 = nine_avgs_diff[-1]

        #   # Taking average of nine_avgs excluding the first (n_3) & the last avgs (n_11)
        #   p_7 = np.mean(nine_avgs_diff[list(range(1,len(nine_avgs_diff)-1))])

        #   nine_folds_diff_doubled = nine_folds_diff * 2

        #   # Multiply nine_avgs by 2
        #   nine_avgs_diff_doubled = nine_avgs_diff * 2

        #   # Storing the first & last means from the nine_avgs_doubled
        #   n_14 = nine_avgs_diff_doubled[0]
        #   n_22 = nine_avgs_diff_doubled[-1]

        #   # Multiply the average by 2
        #   p_18 = (p_7 * 2).round(5)

        #   # Open - Need more clarity , for now storing manually -> Is this right?
        s_3_open = df_fold_diff_1['data_diff'][89]

        return s_3_open
    


    def step_2(s_3_open, nine_avgs_diff_doubled, nine_avgs_diff):
        r_12 = s_3_open + nine_avgs_diff_doubled[-2]
        r_13 = s_3_open + nine_avgs_diff[1]
        s_13 = ((r_12 + r_13)/2)
        return s_13 
    

    def calc_nine_folds_price(list_of_values_price):
        nine_folds_price = np.array(list_of_values_price)
        return nine_folds_price
    

    def step_4_add_x(nine_folds_price, x_sign_changed):
        nine_folds_price_transposed = nine_folds_price.T
        nine_avgs_price = np.array([np.mean(li) for li in nine_folds_price_transposed])
        nine_avgs_price_avg = (nine_avgs_price + x_sign_changed)
        return nine_avgs_price_avg



    def getting_9_fold_values_price_diff(df1):
        list_of_9_fold_price=[]
        list_of_9_fold_diff=[]
        for i in range(1,10):
            df_fold_price_1 = StockService.construct_df_fold_price(df1, i)
            df_fold_diff_1 = StockService.construct_df_fold_diff(df1, i)
            if(i==1):
                list_of_9_fold_diff.append(StockService.first_fold(df_fold_diff_1))
                list_of_9_fold_price.append(StockService.first_fold(df_fold_price_1))
            else:
                list_of_9_fold_diff.append(StockService.second_to_nine_fold(df_fold_diff_1))
                list_of_9_fold_price.append(StockService.second_to_nine_fold(df_fold_price_1))
        return list_of_9_fold_price,list_of_9_fold_diff
    

    def getting_final_dict_8vals(list_of_9_fold_price,list_of_9_fold_diff,df_fold_diff_12,df_temp):
        nine_folds_diff =StockService.calc_nine_folds_diff(list_of_9_fold_diff)
        nine_avgs_diff=StockService.calc_nine_avgs_diff(nine_folds_diff)

        nine_folds_diff_doubled = nine_folds_diff * 2
        nine_avgs_diff_doubled = nine_avgs_diff * 2
        s_3_open = StockService.calc_inter_1(nine_avgs_diff,nine_folds_diff,df_fold_diff_12)
        s_13 = StockService.step_2(s_3_open, nine_avgs_diff_doubled, nine_avgs_diff)
        x_sign_changed = -1 * s_13
        nine_folds_price=StockService.calc_nine_folds_price(list_of_9_fold_price)
        nine_avgs_price_avg = StockService.step_4_add_x(nine_folds_price, x_sign_changed)
            # Taking average of nine_avgs excluding the first (n_30) & the last avgs (n_38)
        p_34 = np.mean(nine_avgs_price_avg[list(range(1,len(nine_avgs_price_avg)-1))])
        # Multiply the nine_folds_z by 2
        nine_folds_price_doubled = nine_folds_price * 2
        avg_step_4_double = StockService.step_4_add_x(nine_folds_price_doubled, x_sign_changed)
        # Taking average of nine_avgs excluding the first (n_42) & the last avgs (n_48)
        p_45 = np.mean(avg_step_4_double[list(range(1,len(avg_step_4_double)-1))])
        # Open at R3
        open_R_3 = df_fold_diff_12['data_diff'].iloc[-2]
        # Open - S26 
        open_S_26 = df_temp['data'].iloc[-1]
        # Actual Last Price - S28
        last_price_S_28 = df_temp['data'].iloc[-2]
        ### Calculations after Step 4
        # R32 = N41 + S26
        R_32 = (open_S_26 + avg_step_4_double[0])

        # R33 = N30 + S26
        R_33 = (open_S_26 + nine_avgs_price_avg[0])

        # Last Price - S27
        last_price_S_27 = (R_33 - (R_32 - R_33))

        # R_40 
        R_40 = (open_S_26 + avg_step_4_double[-2] + x_sign_changed)

        # R_41 
        R_41 = (nine_avgs_price_avg[1] + open_S_26)

        # S_41 
        S_41 = ((R_40 + R_41)/2)
        ###Calculation - Step 4 (Below V31)
        # z (U32)
        z_U_32 = last_price_S_28 - last_price_S_27

        # y (U33)
        y_U_33 = nine_avgs_price_avg[0]

        # A1 (U34)
        A1_U_34 = (open_S_26 + avg_step_4_double[0])

        # A2 (U35)
        A2_U_35 = (open_S_26 + nine_avgs_price_avg[0])

        # A3 (U36)
        A3_U_36 = A1_U_34 - (2 * y_U_33) - z_U_32

        # A4 (U37)
        A4_U_37 = (A1_U_34 + A3_U_36)/2

        # ERROR1 (U38)
        Error1 = A1_U_34 - A2_U_35

        # A5 (U39)
        A5_U_39 = A4_U_37 + Error1 

        # A6 (U40)
        A6_U_40 = A4_U_37 - Error1

        # Error2 (U41)
        Error2 = A6_U_40 - open_S_26

        # Error3 (U42)
        Error3 = ((A6_U_40 + A4_U_37) / 2) - S_41 

        # H1 
        H1_U_43 = A5_U_39 - Error2 

        # H3 
        H3_U_44 = A4_U_37 - Error2

        # H2 
        H2_U_45 = ((A6_U_40 + A4_U_37) / 2) - Error2

        # L1 
        L1_U_46 = A6_U_40 - Error1 - Error2

        # L2 
        L2_U_47 = A6_U_40 - Error1 - Error3
        # H1 at G_54 
        H1_G_54 = H1_U_43

        # H2 at H_54 
        H2_H_54 = H2_U_45

        # H3 at I_54 
        H3_I_54 = H3_U_44

        # L1 at J_54 
        L1_J_54 = L1_U_46

        # L2 at K_54 
        L2_K_54 = L2_U_47

        # Support at L_54 
        Support_L_54 = S_41

        # Open at M_54 
        Open_M_54 = (H3_I_54 + L1_J_54)/2

        # Error4 at N54 
        Error4 = Support_L_54 - Open_M_54

        # H1 at G55 
        H1_G_55 = H1_G_54 - Error4

        # H2 at H55 
        H2_H_55 = H2_H_54 - Error4

        # H3 at I55 
        H3_I_55 = H3_I_54 - Error4

        # L1 at J55 
        L1_J_55 = (L1_J_54 - Error4)

        # L2 at K55 
        L2_K_55 = (L2_K_54 - Error4)

        # Support at L55 
        Support_L_55 = (Support_L_54 - Error4)
        #     dict_data = {
        #     "H1" : [H1_G_54, H1_G_55],
        #     "H2" : [H2_H_54, H2_H_55],
        #     "H3" : [H3_I_54, H3_I_55],
        #     "L1" : [L1_J_54, L1_J_55],
        #     "L2" : [L2_K_54, L2_K_55],
        #     "Support" : [Support_L_54, Support_L_55],
        #     "Open" : [Open_M_54.round(2), " "],
        #     "Error 4" : [Error4.round(2), " "]}
        #     dict_data = {
        #     "H1" : [H1_G_54, H1_G_55],
        #     "H2" : [H2_H_54, H2_H_55],
        #     "H3" : [H3_I_54, H3_I_55],
        #     "L1" : [L1_J_54, L1_J_55],
        #     "L2" : [L2_K_54, L2_K_55],
        #     "Support" : [Support_L_54, Support_L_55],
        #     "Open" : [Open_M_54, " "],
        #     "Error 4" : [Error4, " "]  
        #     }
        #     return dict_data
        dict_data = {
        "H1" : H1_G_54,
        "H2" : H2_H_54,
        "H3" : H3_I_54,
        "L1" : L1_J_54,
        "L2" : L2_K_54,
        "Support" : Support_L_54,
        "Open" : Open_M_54,
        "Error 4" : Error4}
        dict_data1 = {
        "H1" : H1_G_55,
        "H2" : H2_H_55,
        "H3" : H3_I_55,
        "L1" : L1_J_55,
        "L2" : L2_K_55,
        "Support" : Support_L_55,
        "Open" : Open_M_54,
        "Error 4" : ""}
        return dict_data,dict_data1
    

    def func_2_up(a):
        a['H1']=a['H1']+a['Error 4']
        a['H2']=a['H2']+a['Error 4']
        a['H3']=a['H3']+a['Error 4']
        a['L1']=a['L1']+a['Error 4']
        a['L2']=a['L2']+a['Error 4']
        a['Open']=a['Open']+a['Error 4']
        a['Support']=a['Support']+a['Error 4']
        return a
    
    def change_of_first_3_values(df_source,df_dest):
        DF_final_v1_temp_first3=df_source.iloc[0:3].apply(StockService.func_2_up,axis=1)
        df_dest.iloc[0:3][['H1','H2','H3','L1','L2','Support','Open']]=DF_final_v1_temp_first3[['H1','H2','H3','L1','L2','Support','Open']]
        return df_dest
    
    def change_of_first_all_values(df_source,df_dest):
        DF_final_v1_temp_first3=df_source.apply(StockService.func_2_up,axis=1)
        df_dest[['H1','H2','H3','L1','L2','Support','Open']]=DF_final_v1_temp_first3[['H1','H2','H3','L1','L2','Support','Open']]
        return df_dest
    

    def getting_list_of_dict(df_temp):
        list_of_9_fold_price,list_of_9_fold_diff=StockService.getting_9_fold_values_price_diff(df_temp)
        df_fold_diff_1_maual_table=StockService.construct_df_fold_diff(df_temp, 1)
        dict_val=StockService.getting_final_dict_8vals(list_of_9_fold_price,list_of_9_fold_diff,df_fold_diff_1_maual_table,df_temp)
        return dict_val
    

    def get_100_val_dict(df_2):
        li_list_of_dict=[]
        li_list_of_dict2=[]
        for i in range(0,9):
            df_temp1=df_2.iloc[9-i:100-i]
            if(df_temp1.shape[0]==91):
                df_temp1.reset_index(inplace=True,drop=True)

                dict_val_temp,dict_val_temp1=StockService.getting_list_of_dict(df_temp1[['data']])
                dict_val_temp['date_time']=df_temp1['date'].iloc[-1]
                dict_val_temp1['date_time']=df_temp1['date'].iloc[-1]
                li_list_of_dict.append(dict_val_temp)
                li_list_of_dict2.append(dict_val_temp1)
        return li_list_of_dict,li_list_of_dict2
    

    # df_temp=df_2.iloc[8:99]

    # df_temp.reset_index(inplace=True,drop=True)

    def create_data_frame(list_of_dict):
        df_table1 = pd.DataFrame.from_dict(list_of_dict)
        return df_table1
    

    def calculate_pressure_error(df_Fin_v1,df_Fin_v1a,df_Fin_v2,df_Fin_v2a):
        A_val_H1=(df_Fin_v1a['H1'].mean()+df_Fin_v2a['H1'].mean())/2
        B_val_H3=(df_Fin_v1a['H3'].mean()+df_Fin_v2a['H3'].mean())/2
        ERROR_FINAL=A_val_H1-B_val_H3
        C_val_L1=(df_Fin_v2a['L1'].mean()+df_Fin_v1a['L1'].mean())/2
        D_val_L2=(df_Fin_v2a['L2'].mean()+df_Fin_v1a['L2'].mean())/2
        E_val=(B_val_H3+C_val_L1)/2
        F_val=E_val-df_Fin_v1.iloc[-1]['Open']
        pressure=(C_val_L1-F_val)-(D_val_L2-F_val)
        return pressure,ERROR_FINAL
        



    def high_of_high_and_low_of_low(df_use,interval):
        df_use.reset_index(inplace=True)
        
        if(interval in ['60m','1h']):
            max_1=np.max(df_use.iloc[92:99]['High'])
            min_1=np.min(df_use.iloc[92:99]['Low'])
        else:
            max_1=np.max(df_use.iloc[90:99]['High'])
            min_1=np.min(df_use.iloc[90:99]['Low'])
        return max_1,min_1



    def second_max_min(Begindate,ticker_value,interval_val_1):
        if(interval_val_1 in ['1h','60m']):
            interval_val='5m'
        elif(interval_val_1 in ['2h','3h']):
            interval_val='15m'
        elif(interval_val_1 =='1d'):
            interval_val='1h'
        elif(interval_val_1 =='1wk'):
            interval_val='1d'
        elif(interval_val_1 =='1mo'):
            interval_val='1wk'
    
    
    
        
    
        list_of_interval={'1m':5,'2m':5,'5m':5,'15m' :15,'30m':18,'60m':30,'90m':40,'1h':70,'2h':70,'3h':70,'1d':250,'5d':1100,'1wk':1200,'1mo':6000,'3mo':10000}

        if(interval_val in ['2h','3h']):
            data = yf.download(tickers=ticker_value, start=Begindate-timedelta(days=list_of_interval[interval_val]),end=Begindate+timedelta(days=1), interval='1h').reset_index()
            if(interval_val=='3h'):
                data['Datetime']=data['Datetime'].dt.strftime("%Y-%m-%d %H:%M")
                data['Datetime']=pd.to_datetime(data['Datetime'],format='%Y-%m-%d %H:%M')
                data=data[(data['Datetime'].dt.strftime("%H:%M:%S") =='09:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='12:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='15:15:00')]
                df_data_filter=data[data['Datetime']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Datetime','Open']]
                df_final_filter_high_low=df_data_filter1[['Datetime','High','Low']]
                df_final_filter.rename(columns={'Datetime':'date','Open':'data'},inplace=True)
            else:
      
                data['Datetime']=data['Datetime'].dt.strftime("%Y-%m-%d %H:%M")
                data['Datetime']=pd.to_datetime(data['Datetime'],format='%Y-%m-%d %H:%M')
                data=data[(data['Datetime'].dt.strftime("%H:%M:%S") =='09:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='11:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='13:15:00')| (data['Datetime'].dt.strftime("%H:%M:%S") =='15:15:00')]
                df_data_filter=data[data['Datetime']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Datetime','Open']]
                df_final_filter_high_low=df_data_filter1[['Datetime','High','Low']]
                df_final_filter.rename(columns={'Datetime':'date','Open':'data'},inplace=True)

        else:
            data = yf.download(tickers=ticker_value, start=Begindate-timedelta(days=list_of_interval[interval_val]),end=Begindate+timedelta(days=1), interval=interval_val).reset_index()
            if(interval_val in ['1d','5d','1wk','1mo','3mo']):
                data['Date']=data['Date'].dt.strftime("%Y-%m-%d")
                data['Date']=pd.to_datetime(data['Date'],format='%Y-%m-%d')
                Begindate=Begindate.date()
                Begindate=pd.to_datetime(Begindate,format='%Y-%m-%d')
                df_data_filter=data[data['Date']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Date','Open']]
                df_final_filter_high_low=df_data_filter1[['Date','High','Low']]
                df_final_filter.rename(columns={'Date':'date','Open':'data'},inplace=True)
            else:
        
                data['Datetime']=data['Datetime'].dt.strftime("%Y-%m-%d %H:%M")
                data['Datetime']=pd.to_datetime(data['Datetime'],format='%Y-%m-%d %H:%M')

                df_data_filter=data[data['Datetime']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Datetime','Open']]
                df_final_filter_high_low=df_data_filter1[['Datetime','High','Low']]
                df_final_filter.rename(columns={'Datetime':'date','Open':'data'},inplace=True)
        print("high_low_1",df_final_filter_high_low.iloc[-1])

        return df_final_filter_high_low.iloc[-1]['High'],df_final_filter_high_low.iloc[-1]['Low']


    def calucation_final_10values(e,pressure,H1,L1):
        #calculate Centric high (CH) 
        A1 = L1 + 2*(e*0.618) + 2*(e*0.022) - e*0.786
        print("A1",A1)
        #To calculate Centric low (CL) =
        B1 = H1-2*(e*0.618)- 2*(e*0.022) + e*0.786
        print("B1",B1)
        Los_up=B1+e*0.618+e*0.236
        Los_dow=A1 - e*0.618 - e*0.236
        hh1=A1-e*0.618 + e*1
        HH2=B1+e*0.618+e*0.786
        HL1=B1+e*0.618 - e*1
        HL2=A1-e*0.618-e*0.786
        Level1_up = A1
        Level2_up = Level1_up+e+0.022*e*2.618
        Level1_dow = B1
        Level2_dow = Level1_dow -e - 0.022*e*2.618
        SL1_uptrend=HH2-e*0.786+e
        SL1_down_trend=HL2+e*0.786-e
        SS_1=Los_up-e*0.236+e*0.382
        SS_2=Los_dow+e*0.236-e*0.382
        print("Line of Strength (Los)(uptrend)   :",Los_up )
        print("Line of strength (Los) (down trend)   :",Los_dow )
        print("Hypothetical high (hh1)   :",hh1 )
        print("Hypothetical High (HH2)   :",HH2 )
        print("Hypothetical low (HL1)   :",HL1 )
        print("Hypothetical low (HL2)   :",HL2 )
        print("Upside level 1   :",Level1_up)
        print("Upside level 2   :",Level2_up)
        print("Down side level 1   :",Level1_dow)
        print("Down side level 2   :",Level2_dow)
        print("Stop loss uptrend",SL1_uptrend)
        print("Stop loss downtrend",SL1_down_trend)
        print("SS 1",SS_1)
        print("SS 2",SS_2)



    def calucation_final_10values_wrapper(error,pressure,high_value1,Low_value1,high_value2,Low_value2):
        print("Part-A calulcation")
        StockService.calucation_final_10values(error,pressure,high_value1,Low_value1)
        print("-----------------------------------------------------------------------")
        print("Part-B calulcation")
        StockService.calucation_final_10values(error,pressure,high_value2,Low_value2)





    ### Execution  ###
    
    ### Execution  ###
    def inputs_final(self,date_entered, ticker_valued, interval_vald):
        print("Excecutionable Values"+ date_entered+ ticker_valued+interval_vald)
        start_time1 = time.strftime('%X %x %Z')
        # date_enter=input("Enter the date")
        date_enter=date_entered


        print("You entered  date value: " + date_enter)
        Begindate = datetime.strptime(date_enter, "%Y-%m-%d %H:%M")

        list_of_interval={'1m':5,'2m':5,'5m':5,'15m' :15,'30m':18,'60m':30,'90m':40,'1h':70,'2h':70,'3h':70,'1d':250,'5d':1100,'1wk':1200,'1mo':6000,'3mo':10000}
        # ticker_value=input("enter the ticker name of the stock")
        ticker_value=ticker_valued
        print ("yoy have entered ticker :" + ticker_value)
        print("Please select the intervel from the list  1m,2m,5m,15m,30m,60m,90m,1h,2h,3h,1d,5d,1wk,1mo,3mo")
        # interval_val=input("enter the interval value")
        interval_val=interval_vald
        print("you eneterd the interval :" + interval_val)
        high_value1,Low_value1=StockService.second_max_min(Begindate,ticker_value,interval_val)
        if interval_val in ['2h', '3h']:
            data = yf.download(tickers=ticker_value, start=Begindate-timedelta(days=list_of_interval[interval_val]),end=Begindate+timedelta(days=1), interval='1h').reset_index()
            if(interval_val=='3h'):
                data['Datetime']=data['Datetime'].dt.strftime("%Y-%m-%d %H:%M")
                data['Datetime']=pd.to_datetime(data['Datetime'],format='%Y-%m-%d %H:%M')
                data=data[(data['Datetime'].dt.strftime("%H:%M:%S") =='09:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='12:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='15:15:00')]
                df_data_filter=data[data['Datetime']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Datetime','Open']]
                df_final_filter_high_low=df_data_filter1[['Datetime','High','Low']]
                df_final_filter.rename(columns={'Datetime':'date','Open':'data'},inplace=True)
            else:
        
                data['Datetime']=data['Datetime'].dt.strftime("%Y-%m-%d %H:%M")
                data['Datetime']=pd.to_datetime(data['Datetime'],format='%Y-%m-%d %H:%M')
                data=data[(data['Datetime'].dt.strftime("%H:%M:%S") =='09:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='11:15:00') | (data['Datetime'].dt.strftime("%H:%M:%S") =='13:15:00')| (data['Datetime'].dt.strftime("%H:%M:%S") =='15:15:00')]
                df_data_filter=data[data['Datetime']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Datetime','Open']]
                df_final_filter_high_low=df_data_filter1[['Datetime','High','Low']]
                df_final_filter.rename(columns={'Datetime':'date','Open':'data'},inplace=True)

        else:
            data = yf.download(tickers=ticker_value, start=Begindate-timedelta(days=list_of_interval[interval_val]),end=Begindate+timedelta(days=1), interval=interval_val).reset_index()
            if(interval_val in ['1d','5d','1wk','1mo','3mo']):
                data['Date']=data['Date'].dt.strftime("%Y-%m-%d")
                data['Date']=pd.to_datetime(data['Date'],format='%Y-%m-%d')
                Begindate=Begindate.date()
                Begindate=pd.to_datetime(Begindate,format='%Y-%m-%d')
                df_data_filter=data[data['Date']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Date','Open']]
                df_final_filter_high_low=df_data_filter1[['Date','High','Low']]
                df_final_filter.rename(columns={'Date':'date','Open':'data'},inplace=True)
            else:
        
                data['Datetime']=data['Datetime'].dt.strftime("%Y-%m-%d %H:%M")
                data['Datetime']=pd.to_datetime(data['Datetime'],format='%Y-%m-%d %H:%M')

                df_data_filter=data[data['Datetime']<=Begindate]
                df_data_filter1=df_data_filter.tail(100)
                df_final_filter=df_data_filter1[['Datetime','Open']]
                df_final_filter_high_low=df_data_filter1[['Datetime','High','Low']]
                df_final_filter.rename(columns={'Datetime':'date','Open':'data'},inplace=True)

        df1_tt = df_final_filter.reset_index(drop=True).copy()
        high_value2,Low_value2=StockService.high_of_high_and_low_of_low(df_final_filter_high_low.copy(),interval_val)
        print("high_low_2",high_value2,Low_value2)
        print(df1_tt.shape)
        df_copy=df1_tt.copy()
        df_copy1=df1_tt.copy()
        data_frame_f1_dict,data_frame_f1_dict2=StockService.get_100_val_dict(df_copy)
        DF_final_v1=StockService.create_data_frame(data_frame_f1_dict).iloc[::-1]
        DF_final_v1_1=StockService.create_data_frame(data_frame_f1_dict2).iloc[::-1]
        df_copy1['data'].iloc[91:]=DF_final_v1['Support']
        data_frame_f2_dict,data_frame_f2_dict1=StockService.get_100_val_dict(df_copy1)
        DF_final_v2=StockService.create_data_frame(data_frame_f2_dict).iloc[::-1]
        DF_final_v2_1=StockService.create_data_frame(data_frame_f2_dict1).iloc[::-1]
        DF_final_v1_1a=StockService.change_of_first_3_values(DF_final_v1.copy(),DF_final_v1_1.copy())
        DF_final_v2_1a=StockService.change_of_first_all_values(DF_final_v2.copy(),DF_final_v2_1.copy())
        pressure_value,error_value=StockService.calculate_pressure_error(DF_final_v1_1,DF_final_v1_1a,DF_final_v2_1,DF_final_v2_1a)
        print()
        print("---------------------------------------------------------------------------------------------------------------")
        print("the pressure and error on",DF_final_v2['date_time'].iloc[-1],"and for open price ",DF_final_v1['Open'].iloc[-1])
        print(pressure_value,error_value)
        print("---------------------------------------------------------------------------------------------------------------")
        StockService.calucation_final_10values_wrapper(error_value,pressure_value,high_value1,Low_value1,high_value2,Low_value2)
        end_time1 = time.strftime('%X %x %Z')
        print(start_time1,end_time1)
        df_for_return = df1_tt.append({'date':{"pressure_value":pressure_value}, 'data':{"error_value":error_value}}, ignore_index=True)
        currentDT = datetime.now()
        STRING_DATE=currentDT.strftime("%Y_%m_%d_%H_%M_%S")
        #df_for_return.to_excel(excel_writer=ticker_value[1:]+STRING_DATE+".xlsx",index=False)
        # pressure_value ,error_value ,df_for_return
    