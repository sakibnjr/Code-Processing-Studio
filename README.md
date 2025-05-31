# Code Processing Studio

A modern web application for processing and analyzing C code with various features including comment removal, tokenization, code optimization, AST visualization, IR generation, symbol table generation, and syntax validation.

## Features

- **Comment Removal**: Automatically removes single-line and multi-line comments from C code
- **Code Tokenization**: Breaks down code into tokens (keywords, identifiers, operators, etc.)
- **Code Optimization**: Performs various optimizations including:
  - Dead code removal
  - Constant folding
  - Strength reduction
  - Redundant operation removal
  - Variable declaration optimization
- **AST Visualization**: Generates and displays Abstract Syntax Tree for C code
- **IR Generation**: Creates Intermediate Representation of the code
- **Symbol Table**: Generates a comprehensive symbol table showing variables, functions, and their properties
- **Syntax Validation**: Validates C code syntax and reports errors

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Framer Motion for animations
- React Icons
- Vite for build tooling

### Backend

- Node.js
- Express.js
- Tree-sitter for AST generation
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sakibnjr/Code-Processing-Studio.git
cd Code-Processing-Studio
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
code-processing-studio/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── App.jsx         # Main application component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
└── backend/
    ├── controllers/       # Request handlers
    ├── services/         # Business logic
    ├── routes/           # API routes
    ├── config/           # Configuration files
    └── server.js         # Backend entry point
```

## API Endpoints

- `POST /api/process` - Remove comments from code
- `POST /api/tokenize` - Tokenize code
- `POST /api/optimize` - Optimize code
- `POST /api/validate-syntax` - Validate code syntax
- `POST /api/generate-ir` - Generate intermediate representation
- `POST /api/generate-ast` - Generate abstract syntax tree
- `POST /api/generate-symbol-table` - Generate symbol table

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tree-sitter for C language parsing
- React and Tailwind CSS communities for their excellent documentation
- All contributors who have helped improve this project
