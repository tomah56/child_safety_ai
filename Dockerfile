FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    && apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ /app/app/
COPY .env /app/

EXPOSE 5000

CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]