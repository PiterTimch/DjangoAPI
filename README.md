## Startup

```

py -m venv .venv

.venv\\Scripts\\activate.bat

python.exe -m pip install --upgrade pip

py -m pip install Django

django-admin startproject atbapi

pip install -r requirements.txt

py manage.py runserver 9581

```

## Install Posgres

```
pip install psycopg2-binary
lexon24938@rograc.com
lexon24938@rograc.comA

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': 'ep-blue-wind-ag3yo940-pooler.c-2.eu-central-1.aws.neon.tech/neondb',
        'NAME': 'neondb',
        'USER': 'neondb_owner',
        'PASSWORD': 'npg_us0rMh2LjpXU',
        'PORT': '5432'
    }
}

py manage.py makemigrations users
py manage.py migrate

```

## Create vite react

```
npm create vite@latest
```

## Working topic (myredit)

```
py manage.py startapp topics
```