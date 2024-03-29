from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'username', 'email', 'password', 'is_staff']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['username'] = validated_data['email']
        print(validated_data)
        user = super().create(validated_data)
        return user
    
    def to_representation(self, instance):
        res = super(UserSerializer, self).to_representation(instance)
        # res['headOfDepartment'] = res
        # self.fields['headOfDepartment'] =  UserSerializer(instance,read_only=True,many=True)
        res['id'] = instance.id
        return res


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user_id'] = self.user.id
        data['first_name'] = self.user.first_name
        data['phone_number'] = self.user.phone_number
        data['permission'] = self.user.get_all_permissions()

        return data
