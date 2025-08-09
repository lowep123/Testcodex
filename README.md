# Testcodex

This repository contains a small web application that recreates the classic Flappy Bird game using HTML5 canvas and vanilla JavaScript.
A minimal Python server hosts the static files.

## Running locally

```bash
python server.py
```

Open [http://localhost:8000](http://localhost:8000) in a browser to play.

## Docker

Build and run with Docker:

```bash
docker build -t flappy .
docker run -p 8000:8000 flappy
```
