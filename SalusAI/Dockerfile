FROM python:3.9-slim

WORKDIR /app

RUN echo "Helllo"

COPY . .

RUN pip install flask requests pillow google-genai

RUN pip install google.generativeai

EXPOSE 8080 
CMD ["python", "run.py"]