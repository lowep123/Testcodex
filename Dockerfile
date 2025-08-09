FROM python:3.11-slim
WORKDIR /app
COPY public /app/public
COPY server.py /app/
EXPOSE 8000
CMD ["python", "server.py"]
