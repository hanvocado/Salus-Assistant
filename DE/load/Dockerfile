FROM python:3.11-slim

WORKDIR /app

COPY load/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY azure/azure_helper.py .
COPY load/mysql_loader.py .

CMD ["python", "mysql_loader.py"]
