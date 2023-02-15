STEP 1: Clone project from Particular Branch .
STEP 2: Create and Activate Virtual Environment.(create with cmd python -m venv venv and activate with cmd venv\scripts\activate)
STEP 3: Created Database name has to be place in databases of settings file(i.e  In settingg.py file set  DATABASES->'NAME':'DB Name')
STEP 4: Install requirements with command "pip install -r requirments.txt"
STEP 5: python manage.py makemigrations
STEP 6: python manage.py migrate --database=dbname
example: python manage.py migrate --database=RDC
    'RDC': {
        'NAME': 'ST000037_RDC',
        'HOST': 'localhost',
        'ENGINE': 'django.db.backends.postgresql',
        'USER': 'postgres',
        'PASSWORD':'root',
        'PORT': '5432',
        'OPTIONS': {
            # 'autocommit': True,
        }
    }
and in .env file add DB_NAME=DEFAULT DBNAME that is in settings file(example:DB_NAME=GLOBALMASTER)
STEP 7:python tenant_manage.py RDC createsuperuser --database=RDC(here RDC is the DB name)
STEP 8: edit email manually in security table
STEP 9:  python manage.py runserver craftyouridea.local:8000