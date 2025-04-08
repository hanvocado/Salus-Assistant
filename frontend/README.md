## 1. Build Image
```sh
    # Clone the repository
    git clone <repo-url>

    # Open Docker (make sure Docker Desktop is running)

    # Navigate to the frontend directory
    cd repo/frontend

    # Build the Docker image
    docker build -t nameImage .
```

## 2. Run Container
```sh
    docker run -it -p 5173:5173 --name ContainerName ImageName
```