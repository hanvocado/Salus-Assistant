from app import create_app
import socket


app = create_app()

if __name__ == '__main__':
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    app.run(debug=True, host=local_ip, port=8080)
