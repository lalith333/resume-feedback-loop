# Resume Analyzer - AI-Powered Resume Analysis Tool

A comprehensive full-stack application that uses AI to analyze resumes, extract detailed information, and provide personalized improvement suggestions and upskilling recommendations.

## 🌟 Features

### Core Functionality
- **PDF Resume Upload**: Upload and process PDF resume files
- **AI-Powered Analysis**: Uses Gemini AI for intelligent resume evaluation
- **Comprehensive Data Extraction**: Extracts all relevant information including:
  - Personal details (name, email, phone, location, social profiles)
  - Professional summary
  - Technical and soft skills
  - Work experience with detailed responsibilities
  - Education background
  - Projects and achievements
  - Certifications

### AI Insights
- **Resume Rating**: 1-10 scoring based on completeness, relevance, and market demand
- **Improvement Suggestions**: Specific, actionable recommendations
- **Upskilling Recommendations**: Targeted skill development suggestions
- **Analysis Summary**: Overall assessment of resume strengths

### User Experience
- **Dual-Tab Interface**: Upload new resumes and view historical data
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive History**: View all previously analyzed resumes
- **Detailed Modal Views**: In-depth analysis display for each resume
- **Real-time Processing**: Live feedback during upload and analysis

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **FastAPI** (Python) for API development
- **SQLAlchemy** for database ORM
- **SQLite** for data storage
- **Pydantic** for data validation
- **PyPDF2** for PDF text extraction
- **Langchain** with Gemini AI integration

### AI & Analysis
- **Google Gemini AI** for resume analysis
- **Custom parsing algorithms** for data extraction
- **Intelligent skill matching** using predefined skill databases

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Google API Key (for Gemini AI)

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Add your Google API key to .env
GOOGLE_API_KEY=your_gemini_api_key_here

# Start the backend server
python start.py
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
DATABASE_URL=sqlite:///./resume_analyzer.db
```

## 🎯 Usage

### Upload & Analysis
1. Navigate to the "Upload Resume" tab
2. Drag and drop or select a PDF resume file
3. Click "Analyze Resume" to process
4. View comprehensive analysis results

### Historical Data
1. Switch to "Resume History" tab
2. Browse all previously analyzed resumes
3. Click "Details" to view full analysis
4. Use the modal to review complete information

### API Endpoints
- `POST /api/upload-resume/` - Upload and analyze resume
- `GET /api/resumes/` - Get all resumes
- `GET /api/resumes/{id}/` - Get specific resume details

## 🧠 AI Analysis Features

### Resume Rating Algorithm
- **Skills Assessment**: Evaluates technical and soft skills relevance
- **Experience Quality**: Analyzes work history completeness and progression
- **Education Background**: Considers educational qualifications
- **Overall Presentation**: Assesses resume structure and professionalism

### Improvement Suggestions
- Missing sections identification
- Skills highlighting recommendations
- Format and presentation enhancements
- Industry-specific improvements

### Upskilling Recommendations
- Current market demand analysis
- Skill gap identification
- Technology trend awareness
- Career advancement paths

## 🛡️ Error Handling

### Robust Error Management
- **File Validation**: PDF type and size validation
- **Parsing Fallbacks**: Graceful handling of complex PDF formats
- **AI Service Resilience**: Mock analysis when AI service unavailable
- **Network Error Handling**: User-friendly error messages
- **Database Error Recovery**: Connection retry mechanisms

### User Feedback
- Loading states during processing
- Success confirmations
- Detailed error messages
- Retry mechanisms

## 📱 Responsive Design

### Mobile-First Approach
- **Adaptive Layouts**: Optimized for all screen sizes
- **Touch-Friendly Interfaces**: Large buttons and touch targets
- **Mobile Card Views**: Specialized layouts for small screens
- **Tablet Optimization**: Balanced layouts for medium screens

### Design System
- **8px Spacing System**: Consistent spacing throughout
- **Color Ramps**: Comprehensive color system with semantic meaning
- **Typography Scale**: Hierarchical text sizing and weights
- **Interactive States**: Hover, focus, and active state styling

## 🔍 Testing

### Recommended Test Cases
1. **Various Resume Formats**: Test different PDF layouts and styles
2. **Multiple Industries**: Software, marketing, healthcare, finance
3. **Experience Levels**: Fresh graduates to senior professionals
4. **Skill Diversity**: Technical and non-technical skill sets

### Sample Data
Add your own PDF resumes to the `sample_data/` folder for testing.

## 🚦 Development

### Backend Development
```bash
cd backend
python start.py  # Starts with auto-reload
```

### Frontend Development
```bash
npm run dev  # Starts Vite dev server with hot reload
```

### API Documentation
Visit `http://localhost:8000/docs` for interactive API documentation.

## 🏗️ Architecture

### Frontend Architecture
- **Component-Based**: Modular React components
- **Type Safety**: Full TypeScript implementation
- **State Management**: React hooks for local state
- **API Layer**: Centralized API service layer

### Backend Architecture
- **Clean Architecture**: Separated concerns and layers
- **Database Layer**: SQLAlchemy ORM with proper models
- **Service Layer**: Resume parsing and AI analysis services
- **API Layer**: FastAPI with automatic OpenAPI documentation

### Database Schema
- **Resumes Table**: Comprehensive resume data storage
- **JSON Fields**: Flexible storage for complex data structures
- **Indexing**: Optimized queries for historical data retrieval

## 🤝 Contributing

### Code Quality
- **ESLint**: Frontend code linting
- **Type Checking**: Full TypeScript coverage
- **Error Handling**: Comprehensive error management
- **Logging**: Structured logging throughout the application

### Best Practices
- **Modular Code**: Single responsibility components and services
- **Documentation**: Comprehensive inline documentation
- **Testing Ready**: Structure supports easy test addition
- **Performance**: Optimized for speed and efficiency

## 📄 License

This project is open-source and available under the MIT License.

## 🙏 Acknowledgments

- **Gemini AI** for intelligent resume analysis
- **Tailwind CSS** for beautiful, responsive design
- **FastAPI** for high-performance API development
- **React** ecosystem for modern frontend development

---

**Note**: This application is designed for educational and professional development purposes. Always ensure you have permission before analyzing someone else's resume.
