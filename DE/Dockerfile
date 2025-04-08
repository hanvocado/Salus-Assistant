FROM python:3.11-slim

WORKDIR /app

COPY mysql_loader_requirements.txt .

RUN pip install --no-cache-dir -r mysql_loader_requirements.txt

COPY azure_helper.py .
COPY mysql_loader.py .

CMD ["python", "mysql_loader.py"]
