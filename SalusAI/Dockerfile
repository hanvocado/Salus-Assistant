FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git && apt-get clean

RUN echo "Helllo"

RUN git clone https://github.com/DOCUTEE/SalusAI.git

RUN pip install flask requests pillow google-genai

RUN pip install google.generativeai

EXPOSE 8080 
CMD ["python", "SalusAI/run.py"]