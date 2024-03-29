from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import json

def custom_exception_handler(exc, context):
	# print("are we here?")
	# Call REST framework's default exception handler first,
	# to get the standard error response.
	dict_response = {}
	response = exception_handler(exc, context)
	exception_class = exc.__class__.__name__

	# The reason for handling separately for ValidationError is because:
	# A request.data object that will be returned is of list type in case of ValidationError
	# A request.data object that will be returned in other cases is of dict type.
	# Hence we cant do request.data['status_code'], as we cannot use list indices as string.
	if exception_class == 'ValidationError':
		# print(type(response.data))
		# # output-> <class 'list'>
		# print(response.status_code)
		# # output-> 400

		# Converting list response to a dict response
		dict_response = Response({},status=status.HTTP_400_BAD_REQUEST)
		dict_response.data['detail'] = json.dumps(response.data)
		dict_response.data['status_code'] = response.status_code
		# dict_response.data['myCustomInfo'] = ""
		return dict_response
	else:
	# # Playground
	# print(type(context))
	# # output-> <class 'dict'>
	# print(context)
	# # output-> {'view': <quickstart.views.UserList object at 0x7f7d9270cf98>, 'args': (), 'kwargs': {}, 'request': <rest_framework.request.Request object at 0x7f7d926fba58>}
	# print(context['request'].data)
	# # output-> {'first_name': 'ddd', 'last_name': 'fff', 'email': 'som@gmail.com'}
	# print(type(context['request']))
	# # output-> <class 'rest_framework.request.Request'>
	# print(context['view'].__class__.__name__)
	# # output-> UserList

	# If response is none, means there is no error.
	# If response is not none, we want additional information with response message.
	
		if response is not None:
			# print(type(response.data))
			# response.data['detail'] = json.dumps(response.data)
			# response.data['status_code'] = response.status_code
			# response.data['myCustomInfo'] = ""
			dict_response = Response({},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
			dict_response.data['detail'] = json.dumps(response.data)
			dict_response.data['status_code'] = response.status_code
			# dict_response.data['myCustomInfo'] = ""
			  
		return dict_response


# {
#     "detail": "Malformed request.",
#     "status_code": 400,
#     "myCustomInfo": "Read docs about posting carefully!"
# }