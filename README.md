# 🚀 AI Resume Analyzer & Scorer

A sophisticated Flask-based web application that analyzes resume-JD compatibility using advanced machine learning techniques and intelligent scoring algorithms. Unlike basic keyword-matching ATS tools, this analyzer provides context-aware, realistic scoring with role-specific weighting.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3.0-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🎯 What Makes This Different

### 🧠 **Intelligent Hybrid Scoring**
- **Skill-based matching** with word-boundary detection (prevents false positives)
- **TF-IDF cosine similarity** for semantic understanding between resume and JD
- **Blended approach** (60% skills + 25% TF-IDF + 15% uniqueness factor)

### 🎯 **Role-Specific Dynamic Weighting**
- Auto-detects job role from description (Data Scientist, DevOps, Frontend, etc.)
- Applies adaptive skill weights (Docker=3x for DevOps, Python=3x for Data Science)
- Prevents generic scoring across different domains

### 📊 **Resume Uniqueness Factor**
- Measures vocabulary diversity and content richness
- Differentiates candidates with similar skill sets
- Rewards well-written, detailed resumes

### 🔧 **Robust Document Processing**
- Real PDF/DOCX parsing with `pdfminer.six` and `python-docx`
- Intelligent fallback for low-quality extractions
- Word-boundary regex prevents substring false matches

### ⚖️ **Realistic Score Calibration**
- 45-95% score range (avoids unrealistic 3-5% or saturated 98%)
- Dynamic bonuses for experience, education, achievements
- Domain-specific caps (e.g., DevOps without Docker capped at 75%)

## 🚀 Features

- **Multi-format Support**: PDF, DOCX, DOC, and TXT files
- **Real-time Analysis**: Instant scoring with detailed breakdown
- **Smart Recommendations**: Actionable insights for resume improvement
- **Role Detection**: Automatic job role identification from descriptions
- **Semantic Understanding**: TF-IDF with n-grams for better text similarity
- **False Positive Prevention**: Word-boundary matching for accurate skill detection
- **Responsive UI**: Modern, mobile-friendly interface

## 📁 Project Structure

```
resume_analyzer_scorer/
├── app.py                          # Main Flask application
├── requirements.txt                 # Python dependencies
├── README.md                       # Project documentation
├── .venv/                          # Virtual environment
├── uploads/                        # Temporary file storage
├── static/                         # Static assets
│   └── script.js                   # Frontend JavaScript
├── templates/                      # HTML templates
│   ├── index.html                  # Main upload page
│   └── result.html                 # Results display page
├── models/                         # ML models and analysis
│   └── resume_analyzer.py          # Core analysis logic
├── utils/                          # Utility functions
│   └── file_parser.py              # File parsing utilities
└── tempCodeRunnerFile.py           # Development file
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/resume_analyzer_scorer.git
cd resume_analyzer_scorer
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## 📋 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Flask | 2.3.3 | Web framework |
| scikit-learn | 1.3.0 | TF-IDF and ML algorithms |
| nltk | 3.8.1 | Natural language processing |
| spacy | 3.6.1 | Advanced NLP |
| python-docx | 0.8.11 | DOCX file parsing |
| pdfminer.six | 20221105 | PDF text extraction |
| numpy | 1.24.3 | Numerical computing |
| pandas | 2.0.3 | Data manipulation |
| werkzeug | 2.3.7 | WSGI utilities |
| reportlab | 4.0.4 | PDF generation |

## 🎮 Usage

### 1. Upload Resume
- Navigate to `http://localhost:5000`
- Upload your resume (PDF, DOCX, DOC, or TXT)
- Paste the job description

### 2. View Analysis
- Get overall compatibility score (45-95%)
- See matched and missing skills
- Review detailed recommendations
- Check console logs for scoring breakdown

### 3. Test Different Scenarios
- Try different job descriptions with the same resume
- Test different resumes with the same job description
- Compare role-specific scoring (DevOps vs Data Science)

## 🔍 Scoring Algorithm

### Base Score Calculation
```python
# Role-specific skill weighting
role_weights = {
    'data_scientist': {'python': 3, 'machine learning': 3, 'sql': 2, ...},
    'devops': {'aws': 3, 'docker': 3, 'kubernetes': 3, ...},
    'frontend': {'javascript': 3, 'react': 2, 'angular': 2, ...}
}

# Weighted score calculation
weighted_ratio = weighted_score / total_weight
base_score = 40 + (weighted_ratio * 60)  # 40-100 range
```

### Bonus System
- **Experience**: 2-10 points based on years
- **Education**: 2-8 points (Bachelor's to PhD)
- **Achievements**: 4-6 points for quantified results
- **Content Quality**: 3-8 points for resume length/detail

### Final Score
```python
final_score = 0.6 * skill_score + 0.25 * tfidf_score + 0.15 * uniqueness_factor
```

## 🧪 Testing

### Sample Job Descriptions

**DevOps Engineer**
```
We are hiring a DevOps Engineer with 3-5 years of experience. Required skills: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD (Jenkins), Git, Python scripting. Responsibilities: build CI/CD pipelines, containerize applications, manage Kubernetes clusters, automate deployments.
```

**Data Scientist**
```
Seeking a Data Scientist with 2-4 years of experience. Skills: Python, Machine Learning (ML/AI), Pandas, NumPy, TensorFlow/Keras, SQL, AWS (S3, EC2). Responsibilities: build ML models, analyze datasets, create predictive algorithms, deploy models to production.
```

**Frontend Developer**
```
Looking for a Frontend Developer with 1-3 years of experience. Skills: JavaScript, React, HTML, CSS, Git, Node.js basics. Responsibilities: build responsive UI components, integrate APIs, optimize performance, implement design systems.
```

### Test Endpoints
- Main app: `http://localhost:5000`
- Test scoring: `http://localhost:5000/test-score`

## 🎯 Key Features Explained

### 1. Word-Boundary Matching
Prevents false positives like:
- "ai" matching "maintain" 
- "docker" matching "dockerize"
- "r" matching "programming"

### 2. Role Detection
Automatically identifies job type and applies appropriate weights:
- **DevOps**: Docker, Kubernetes, AWS get 3x weight
- **Data Science**: Python, ML, TensorFlow get 3x weight
- **Frontend**: JavaScript, React get 3x weight

### 3. TF-IDF Enhancement
- Uses n-grams (1-2 word phrases) for better semantic matching
- Custom preprocessing to preserve technical terms
- Aggressive scaling for better differentiation

### 4. Uniqueness Factor
- Measures vocabulary diversity (unique words / total words)
- Rewards well-written, detailed resumes
- Prevents identical scores for different candidates

## 🚀 Future Enhancements

- [ ] Named Entity Recognition (NER) for skill extraction
- [ ] Job role classification with ML models
- [ ] A/B testing for score calibration
- [ ] Resume template suggestions
- [ ] Industry-specific skill databases
- [ ] Multi-language support
- [ ] API endpoints for integration
- [ ] Batch processing capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/arunesh-123at)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: mohit.mtpatna123@gmail.com

## 🙏 Acknowledgments

- Flask community for the excellent web framework
- scikit-learn team for ML algorithms
- Contributors to pdfminer.six and python-docx libraries
- All testers and feedback providers

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/resume_analyzer_scorer?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/resume_analyzer_scorer?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/resume_analyzer_scorer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/resume_analyzer_scorer)

---

⭐ **Star this repository if you found it helpful!**
