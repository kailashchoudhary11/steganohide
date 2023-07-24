# SteganoHide

SteganoHide is a web application that enables users to perform steganography by hiding encrypted text within images. Users can upload an image, a password, and a secret text, which will be encrypted using the provided password. The encrypted text is then hidden within the image using steganography techniques. Users can also upload an image with hidden text and its password to extract and decrypt the secret text.

## Features

- Encrypt secret text using a user-provided password.
- Hide the encrypted text within an image using steganography.
- Extract and decrypt the hidden text from an image using the correct password.
- Option to copy the decrypted secret text for convenience.
- Secure password storage using hashing (user passwords are not accessible).
- Option for users to save their encrypted images for future retrieval.

## Technology Stack

SteganoHide is built using the following technologies:

- Frontend: HTML, CSS, JavaScript with React.
- Backend: Django Rest Framework with Python for server-side logic and API endpoints.
- Database: PostgreSQL.
- Image Processing: `stegano` library for image manipulation and steganography.
- Encryption: `pycryptodome` library for AES (Advanced Encryption Standard).

## Installation and Setup

### Clone the repository:
```
git clone https://github.com/your_username/SteganoHide.git
```

### Backend:
1. Install Python and pip.

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - Linux/macOS:
     ```
     source venv/bin/activate
     ```

4. Install required Python packages:
   ```
    pip install -r requirements.txt
   ```
5. Run database migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Create a `.env` file (similar to `.env.example`) and add Cloudinary details.

7. Start the backend server:
   ```
   python manage.py runserver
   ```
### Frontend:

1. Install npm and node.

2. Install dependencies:
   ```
   npm install
   ```
   
3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Access the application in your web browser at `http://localhost:5173`.


## Contributing

Contributions to SteganoHide are welcome! If you have any suggestions or bug fixes, please open an issue or submit a pull request.

## License

SteganoHide is open-source and released under the MIT License. See LICENSE for more details.

