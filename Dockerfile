FROM python:3.12

WORKDIR /nextjs-fastapi

COPY ./requirements.txt /nextjs-fastapi/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /nextjs-fastapi/requirements.txt

COPY ./api /nextjs-fastapi/api 

CMD ["fastapi", "run", "api/index.py", "--proxy-headers", "--port", "80"]