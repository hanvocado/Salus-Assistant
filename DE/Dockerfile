FROM python:3.11-slim
WORKDIR /app

RUN pip install pandas mysql-connector-python

COPY mysql_loader.py mysql_loader.py

CMD ["python", "mysql_loader.py"]
