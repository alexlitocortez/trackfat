FROM python:3.12

WORKDIR /api

COPY requirements.txt /api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

COPY ./api /nextjs-fastapi/api

CMD ["fastapi", "run", "api/index.py", "--proxy-headers", "--port", "80"]