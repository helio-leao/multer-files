# Project Overview

This project implements **Multer** for file upload and storage in many formats. The API has 2 main routes:

- **/disk**: Store files on disk
- **/memo**: Keeps files on memory

---

## Endpoints

- **GET /**: The list of files names in the server
- **GET /:fileName**: Gets a file that is in the server by name
- **DELETE /:fileName**: Deletes a file that is in the server by name

### /disk

- **POST /**: Saves file on server with it's original name
- **POST /fromBase64**: Saves base64 data as file on server
- **POST /fromUrl**: Saves image from url on server as file with it's original name

### /memo

- **POST /**: Receives file and keeps it in memory
- **POST /toDisk**: Receives file and saves it to disk from memory
- **POST /toBase64**: Receives the image and returns it converted to base64

---

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the server.  
   To use this command it's necessary to have the .env file in the root of the project. Optionally, you can add a custom `PORT` variable to it. If not defined, the application will run on port 3000.

---

## Example Usage

Once the server is running, you can access the API at `http://localhost:3000`.
