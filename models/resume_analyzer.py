import re
import nltk
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
import string

class ResumeAnalyzer:
    """Main class for analyzing resumes against job descriptions"""
    
    def __init__(self):
        """Initialize the analyzer with required NLP tools"""
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
        
        # Load spaCy model (install with: python -m spacy download en_core_web_sm)
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            print("Warning: spaCy model not found. Install with: python -m spacy download en_core_web_sm")
            self.nlp = None
        
        # Common technical skills (can be expanded)
        self.technical_skills = {
            'programming': ['python', 'java', 'javascript', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift'],
            'web': ['html', 'css', 'react', 'angular', 'vue', 'node.js', 'django', 'flask', 'spring'],
            'database': ['sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch'],
            'cloud': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform'],
            'tools': ['git', 'jenkins', 'jira', 'confluence', 'slack', 'teams'],
            'data': ['pandas', 'numpy', 'matplotlib', 'scikit-learn', 'tensorflow', 'pytorch']
        }
    
    def preprocess_text(self, text):
        """Clean and preprocess text for analysis"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters but keep spaces
        text = re.sub(r'[^\w\s]', ' ', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    def extract_skills(self, text):
        """Extract technical skills from text"""
        text = self.preprocess_text(text)
        found_skills = []
        
        # Check for technical skills
        for category, skills in self.technical_skills.items():
            for skill in skills:
                if skill in text:
                    found_skills.append(skill)
        
        # Use spaCy for additional entity recognition if available
        if self.nlp:
            doc = self.nlp(text)
            for ent in doc.ents:
                if ent.label_ in ['ORG', 'PRODUCT']:  # Organizations and products might be technologies
                    skill = ent.text.lower()
                    if len(skill) > 2 and skill not in found_skills:
                        found_skills.append(skill)
        
        return list(set(found_skills))  # Remove duplicates
    
    def calculate_similarity(self, resume_text, job_description):
        """Calculate cosine similarity between resume and job description"""
        # Preprocess texts
        resume_clean = self.preprocess_text(resume_text)
        job_clean = self.preprocess_text(job_description)
        
        # Create TF-IDF vectors
        vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
        
        try:
            tfidf_matrix = vectorizer.fit_transform([resume_clean, job_clean])
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            return round(similarity * 100, 2)  # Convert to percentage
        except:
            return 0.0
    
    def extract_keywords(self, text, top_n=10):
        """Extract top keywords from text using TF-IDF"""
        clean_text = self.preprocess_text(text)
        
        try:
            vectorizer = TfidfVectorizer(stop_words='english', max_features=100)
            tfidf_matrix = vectorizer.fit_transform([clean_text])
            
            feature_names = vectorizer.get_feature_names_out()
            tfidf_scores = tfidf_matrix.toarray()[0]
            
            # Get top keywords
            keyword_scores = list(zip(feature_names, tfidf_scores))
            keyword_scores.sort(key=lambda x: x[1], reverse=True)
            
            return [kw[0] for kw in keyword_scores[:top_n]]
        except:
            return []
    
    def get_suggestions(self, missing_skills, resume_score):
        """Generate improvement suggestions based on analysis"""
        suggestions = []
        
        # Score-based suggestions
        if resume_score < 30:
            suggestions.append("Your resume has low relevance to this job. Consider highlighting more relevant experience.")
        elif resume_score < 50:
            suggestions.append("Your resume shows some relevance but could be improved significantly.")
        elif resume_score < 70:
            suggestions.append("Good match! Consider minor adjustments to better align with job requirements.")
        else:
            suggestions.append("Excellent match! Your resume aligns well with the job description.")
        
        # Skill-based suggestions
        if missing_skills:
            if len(missing_skills) <= 3:
                suggestions.append(f"Consider adding these key skills: {', '.join(missing_skills[:3])}")
            else:
                suggestions.append(f"Focus on developing these critical skills: {', '.join(missing_skills[:5])}")
        
        # General suggestions
        suggestions.extend([
            "Use action verbs to describe your achievements (e.g., 'implemented', 'designed', 'led')",
            "Quantify your accomplishments with specific numbers and metrics",
            "Tailor your resume keywords to match the job description",
            "Ensure your most relevant experience is prominently featured"
        ])
        
        return suggestions
    
    def analyze_resume(self, resume_text, job_description):
        """Main function to analyze resume against job description"""
        # Extract skills from both texts
        resume_skills = self.extract_skills(resume_text)
        job_skills = self.extract_skills(job_description)
        
        # Find matched and missing skills
        matched_skills = list(set(resume_skills) & set(job_skills))
        missing_skills = list(set(job_skills) - set(resume_skills))
        
        # Calculate similarity score
        similarity_score = self.calculate_similarity(resume_text, job_description)
        
        # Extract keywords
        resume_keywords = self.extract_keywords(resume_text)
        job_keywords = self.extract_keywords(job_description)
        
        # Calculate final score (weighted combination)
        skill_match_ratio = len(matched_skills) / max(len(job_skills), 1)
        keyword_overlap = len(set(resume_keywords) & set(job_keywords)) / max(len(job_keywords), 1)
        
        final_score = round((similarity_score * 0.4 + skill_match_ratio * 100 * 0.4 + keyword_overlap * 100 * 0.2), 1)
        final_score = min(final_score, 100)  # Cap at 100
        
        # Generate suggestions
        suggestions = self.get_suggestions(missing_skills, final_score)
        
        return {
            'score': final_score,
            'similarity_score': similarity_score,
            'matched_skills': matched_skills,
            'missing_skills': missing_skills,
            'resume_skills': resume_skills,
            'job_skills': job_skills,
            'resume_keywords': resume_keywords,
            'job_keywords': job_keywords,
            'suggestions': suggestions,
            'total_skills_found': len(resume_skills),
            'skills_match_ratio': round(skill_match_ratio * 100, 1)
        }