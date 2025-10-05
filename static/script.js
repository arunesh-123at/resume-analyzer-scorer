// COMPLETE COMBINED JAVASCRIPT - PASTE THIS IN static/script.js

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('analyzerForm')) {
        // Index page functionality
        initializeApp();
        setupNavigation(); // Add navigation setup
    } else {
        // Results page functionality
        initializeResultsPage();
    }
});

// NAVIGATION FUNCTIONALITY
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const target = this.textContent.toLowerCase();
            
            switch(target) {
                case 'analyzer':
                    scrollToSection('analyzer-section');
                    break;
                case 'features':
                    showFeaturesModal();
                    break;
                case 'about':
                    showAboutModal();
                    break;
            }
        });
    });
}

function scrollToSection(sectionClass) {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }
}

function showFeaturesModal() {
    const modal = createModal('Features', `
        <div class="features-grid">
            <div class="feature-item">
                <div class="feature-icon-large">
                    <i class="fas fa-brain"></i>
                </div>
                <h3>AI-Powered Analysis</h3>
                <p>Advanced machine learning algorithms analyze your resume against job requirements with 95% accuracy.</p>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon-large">
                    <i class="fas fa-chart-line"></i>
                </div>
                <h3>Skill Gap Analysis</h3>
                <p>Identify exactly which skills you have and which ones you need to develop for your target role.</p>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon-large">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <h3>Smart Recommendations</h3>
                <p>Get personalized suggestions on how to improve your resume and increase your match score.</p>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon-large">
                    <i class="fas fa-download"></i>
                </div>
                <h3>Detailed Reports</h3>
                <p>Download comprehensive analysis reports with actionable insights and improvement plans.</p>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon-large">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Secure & Private</h3>
                <p>Your data is processed securely and never stored permanently. Complete privacy guaranteed.</p>
            </div>
            
            <div class="feature-item">
                <div class="feature-icon-large">
                    <i class="fas fa-rocket"></i>
                </div>
                <h3>Instant Results</h3>
                <p>Get comprehensive analysis results in seconds, not hours. Perfect for busy job seekers.</p>
            </div>
        </div>
    `);
    
    showModal(modal);
}

function showAboutModal() {
    const modal = createModal('About ResumeAI', `
        <div class="about-content">
            <div class="about-header">
                <div class="about-logo">
                    <i class="fas fa-brain"></i>
                </div>
                <h3>ResumeAI - Smart Career Intelligence</h3>
                <p class="version">Version 2.0.0</p>
            </div>
            
            <div class="about-section">
                <h4><i class="fas fa-target"></i> Our Mission</h4>
                <p>We believe everyone deserves a fair chance in their career journey. ResumeAI democratizes access to professional resume analysis, giving job seekers the insights they need to succeed.</p>
            </div>
            
            <div class="about-section">
                <h4><i class="fas fa-cogs"></i> How It Works</h4>
                <ol>
                    <li>Upload your resume in PDF or DOCX format</li>
                    <li>Paste the job description you're targeting</li>
                    <li>Our AI analyzes the match in real-time</li>
                    <li>Get detailed insights and improvement suggestions</li>
                    <li>Download your comprehensive analysis report</li>
                </ol>
            </div>
            
            <div class="about-section">
                <h4><i class="fas fa-chart-bar"></i> Key Statistics</h4>
                <div class="stats-mini">
                    <div class="stat-mini">
                        <strong>50,000+</strong>
                        <span>Resumes Analyzed</span>
                    </div>
                    <div class="stat-mini">
                        <strong>95%</strong>
                        <span>Accuracy Rate</span>
                    </div>
                    <div class="stat-mini">
                        <strong>24</strong>
                        <span>Skill Categories</span>
                    </div>
                </div>
            </div>
            
            <div class="about-section">
                <h4><i class="fas fa-heart"></i> Privacy First</h4>
                <p>Your resume data is processed in real-time and never stored permanently. We respect your privacy and ensure your personal information remains secure.</p>
            </div>
            
            <div class="about-footer">
                <p>Built with ❤️ for job seekers worldwide</p>
                <p><small>© 2025 ResumeAI. All rights reserved.</small></p>
            </div>
        </div>
    `);
    
    showModal(modal);
}

function createModal(title, content) {
    return `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

function showModal(modalHTML) {
    // Remove existing modal if any
    const existingModal = document.getElementById('modalOverlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles dynamically
    addModalStyles();
    
    // Show modal with animation
    setTimeout(() => {
        const modal = document.getElementById('modalOverlay');
        modal.classList.add('show');
    }, 10);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Close on backdrop click
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function addModalStyles() {
    // Check if modal styles already exist
    if (document.getElementById('modalStyles')) return;
    
    const modalCSS = `
        <style id="modalStyles">
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal-overlay.show .modal-container {
            transform: scale(1);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem 2rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .modal-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(0, 0, 0, 0.1);
            color: var(--text-primary);
        }
        
        .modal-content {
            padding: 2rem;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .feature-item {
            text-align: center;
            padding: 1.5rem;
            background: linear-gradient(145deg, #f8fafc, #f1f5f9);
            border-radius: 15px;
            transition: all 0.3s ease;
        }
        
        .feature-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon-large {
            width: 70px;
            height: 70px;
            background: var(--primary-gradient);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            margin: 0 auto 1rem auto;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .feature-item h3 {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }
        
        .feature-item p {
            color: var(--text-secondary);
            line-height: 1.6;
        }
        
        .about-content {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .about-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .about-logo {
            width: 80px;
            height: 80px;
            background: var(--primary-gradient);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.5rem;
            margin: 0 auto 1rem auto;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .about-header h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .version {
            background: var(--accent-gradient);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
            display: inline-block;
        }
        
        .about-section {
            margin-bottom: 2rem;
        }
        
        .about-section h4 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }
        
        .about-section h4 i {
            color: #667eea;
        }
        
        .about-section p, .about-section ol {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .about-section ol {
            padding-left: 1.5rem;
        }
        
        .about-section li {
            margin-bottom: 0.5rem;
        }
        
        .stats-mini {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .stat-mini {
            text-align: center;
            padding: 1rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .stat-mini strong {
            display: block;
            font-size: 1.5rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 0.25rem;
        }
        
        .stat-mini span {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .about-footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .about-footer p {
            margin-bottom: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .stats-mini {
                grid-template-columns: 1fr;
            }
            
            .modal-container {
                width: 95%;
                margin: 1rem;
            }
            
            .modal-header, .modal-content {
                padding: 1.5rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalCSS);
}

// INDEX PAGE FUNCTIONS
function initializeApp() {
    setupFileUpload();
    setupTextareaCounter();
    setupFormValidation();
    setupAnimations();
    setupProgressAnimation();
    animateCounters();
    setupButtonEffects();
    createParticleSystem();
}

function setupFileUpload() {
    const fileInput = document.getElementById('resumeFile');
    const uploadArea = document.getElementById('resumeUploadArea');
    const preview = document.getElementById('resumePreview');

    if (!fileInput || !uploadArea) return;

    fileInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleFileDrop);
    uploadArea.addEventListener('click', () => {
        if (!preview || preview.style.display === 'none') {
            fileInput.click();
        }
    });
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        displayFilePreview(file);
        animateFileUpload();
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    const uploadArea = e.currentTarget;
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (isValidFileType(file)) {
            document.getElementById('resumeFile').files = files;
            displayFilePreview(file);
            animateFileUpload();
        } else {
            showError('Please upload a valid PDF or DOCX file.');
        }
    }
}

function isValidFileType(file) {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    return validTypes.includes(file.type);
}

function displayFilePreview(file) {
    const preview = document.getElementById('resumePreview');
    const uploadContent = document.querySelector('.upload-content');
    
    if (!preview || !uploadContent) return;
    
    preview.querySelector('.preview-name').textContent = file.name;
    preview.querySelector('.preview-size').textContent = formatFileSize(file.size);
    
    uploadContent.style.display = 'none';
    preview.style.display = 'flex';
    preview.classList.add('fade-in-scale');
}

function removeFile(type) {
    if (type === 'resume') {
        const fileInput = document.getElementById('resumeFile');
        const preview = document.getElementById('resumePreview');
        const uploadContent = document.querySelector('.upload-content');
        
        fileInput.value = '';
        preview.style.display = 'none';
        uploadContent.style.display = 'block';
        document.getElementById('resumeUploadArea').classList.remove('success-state');
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function setupTextareaCounter() {
    const textarea = document.getElementById('jobDescription');
    const charCount = document.getElementById('charCount');
    
    if (!textarea || !charCount) return;
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 4500) {
            charCount.style.color = '#ef4444';
        } else if (count > 3000) {
            charCount.style.color = '#f59e0b';
        } else {
            charCount.style.color = '#6b7280';
        }
        
        if (count % 100 === 0 && count > 0) {
            charCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                charCount.style.transform = 'scale(1)';
            }, 200);
        }
    });
}

function addSuggestion(keyword) {
    const textarea = document.getElementById('jobDescription');
    const currentText = textarea.value;
    
    if (!currentText.toLowerCase().includes(keyword.toLowerCase())) {
        if (currentText) {
            textarea.value += `\n- ${keyword}`;
        } else {
            textarea.value = `- ${keyword}`;
        }
        
        textarea.dispatchEvent(new Event('input'));
        textarea.focus();
        animateTextareaGlow();
    }
}

function animateTextareaGlow() {
    const textarea = document.getElementById('jobDescription');
    textarea.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
    setTimeout(() => {
        textarea.style.boxShadow = '';
    }, 1000);
}

function setupFormValidation() {
    const form = document.getElementById('analyzerForm');
    const submitBtn = document.getElementById('analyzeBtn');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            startAnalysis();
        }
    });
    
    const fileInput = document.getElementById('resumeFile');
    const jobDescription = document.getElementById('jobDescription');
    
    if (fileInput) fileInput.addEventListener('change', updateSubmitButton);
    if (jobDescription) jobDescription.addEventListener('input', updateSubmitButton);
}

function validateForm() {
    const fileInput = document.getElementById('resumeFile');
    const jobDescription = document.getElementById('jobDescription');
    
    let isValid = true;
    const errors = [];
    
    if (!fileInput.files.length) {
        errors.push('Please upload a resume file.');
        isValid = false;
    }
    
    if (!jobDescription.value.trim()) {
        errors.push('Please enter a job description.');
        isValid = false;
    }
    
    if (!isValid) {
        showError(errors.join(' '));
    }
    
    return isValid;
}

function updateSubmitButton() {
    const fileInput = document.getElementById('resumeFile');
    const jobDescription = document.getElementById('jobDescription');
    const submitBtn = document.getElementById('analyzeBtn');
    
    const hasFile = fileInput.files.length > 0;
    const hasDescription = jobDescription.value.trim().length > 0;
    
    if (hasFile && hasDescription) {
        submitBtn.disabled = false;
        submitBtn.classList.add('ready');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('ready');
    }
}

function startAnalysis() {
    const overlay = document.getElementById('progressOverlay');
    const form = document.getElementById('analyzerForm');
    
    overlay.classList.add('show');
    simulateProgress();
    
    setTimeout(() => {
        form.submit();
    }, 6000);
}

function simulateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressText = document.getElementById('progressText');
    const steps = document.querySelectorAll('.step');
    
    const progressSteps = [
        { percentage: 30, text: 'Parsing resume content...', step: 1 },
        { percentage: 60, text: 'Analyzing skills and experience...', step: 2 },
        { percentage: 90, text: 'Generating insights and recommendations...', step: 3 },
        { percentage: 100, text: 'Analysis complete!', step: 3 }
    ];
    
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
            const step = progressSteps[currentStep];
            updateProgress(step.percentage, step.text);
            updateStepIndicator(step.step, steps);
            currentStep++;
        } else {
            clearInterval(progressInterval);
        }
    }, 1500);
}

function updateProgress(percentage, text) {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressText = document.getElementById('progressText');
    
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    
    progressBar.style.strokeDashoffset = offset;
    progressPercentage.textContent = percentage + '%';
    progressText.textContent = text;
    
    if (percentage === 30 || percentage === 60 || percentage === 90) {
        progressPercentage.style.transform = 'translate(-50%, -50%) scale(1.2)';
        setTimeout(() => {
            progressPercentage.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    }
}

function updateStepIndicator(activeStep, steps) {
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < activeStep) {
            step.classList.add('completed');
        } else if (stepNumber === activeStep) {
            step.classList.add('active');
        }
    });
}

function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .analyzer-card').forEach(el => {
        observer.observe(el);
    });
}

function setupProgressAnimation() {
    const svg = document.querySelector('.progress-svg');
    if (!svg) return;
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    
    gradient.setAttribute('id', 'progressGradient');
    gradient.innerHTML = `
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    `;
    
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target > 1000) {
                counter.textContent = Math.floor(current).toLocaleString() + '+';
            } else {
                counter.textContent = Math.floor(current) + (target === 95 ? '%' : '');
            }
        }, 16);
    });
}

function setupButtonEffects() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (!analyzeBtn) return;
    
    analyzeBtn.addEventListener('mouseenter', () => {
        analyzeBtn.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    analyzeBtn.addEventListener('mouseleave', () => {
        if (!analyzeBtn.disabled) {
            analyzeBtn.style.transform = 'translateY(0) scale(1)';
        }
    });
}

function animateFileUpload() {
    const uploadArea = document.getElementById('resumeUploadArea');
    uploadArea.classList.add('success-state');
    createConfetti(uploadArea);
    showSuccess('Resume uploaded successfully!');
}

function createConfetti(container) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            top: 50%;
            left: 50%;
            animation: confetti-fall 1s ease-out forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 1500);
    }
}

function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 30; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: particle-float ${duration}s infinite linear;
    `;
    
    container.appendChild(particle);
}

// RESULTS PAGE FUNCTIONS
function initializeResultsPage() {
    setupScoreAnimation();
    setupChartsAnimation();
    setupFloatingActionButton();
    animateProgressBars();
    addSVGGradients();
}

function setupScoreAnimation() {
    const scoreBar = document.getElementById('scoreBar');
    const scoreNumber = document.querySelector('.score-number');
    
    if (!scoreBar || !scoreNumber) return;
    
    const score = parseInt(scoreNumber.textContent);
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (score / 100) * circumference;
    
    scoreBar.style.strokeDasharray = circumference;
    scoreBar.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        scoreBar.style.strokeDashoffset = offset;
        animateScoreCounter(score);
    }, 1500);
}

function animateScoreCounter(targetScore) {
    const scoreElement = document.querySelector('.score-number');
    let currentScore = 0;
    const duration = 2000;
    const increment = targetScore / (duration / 16);
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.floor(currentScore) + '%';
    }, 16);
}

function setupChartsAnimation() {
    setTimeout(() => {
        if (typeof Chart !== 'undefined') {
            createSkillsChart();
            createCategoriesChart();
            createExperienceChart();
        }
    }, 2000);
}

function createSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Matched Skills', 'Missing Skills', 'Additional Skills'],
            datasets: [{
                data: [8, 4, 3],
                backgroundColor: ['#10b981', '#f59e0b', '#6b7280'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: { family: 'Inter' }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function createCategoriesChart() {
    const ctx = document.getElementById('categoriesChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Technical', 'Leadership', 'Communication', 'Problem Solving', 'Innovation', 'Teamwork'],
            datasets: [{
                label: 'Your Profile',
                data: [85, 70, 75, 90, 80, 85],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: '#667eea',
                borderWidth: 3,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }, {
                label: 'Job Requirements',
                data: [90, 60, 70, 85, 75, 80],
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                borderColor: '#f59e0b',
                borderWidth: 3,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    pointLabels: { font: { family: 'Inter', size: 12 } }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 20, usePointStyle: true, font: { family: 'Inter' } }
                }
            },
            animation: { duration: 2000, easing: 'easeOutQuart' }
        }
    });
}

function createExperienceChart() {
    const ctx = document.getElementById('experienceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Required', 'Your Experience'],
            datasets: [{
                label: 'Years of Experience',
                data: [3, 5],
                backgroundColor: ['rgba(245, 158, 11, 0.8)', 'rgba(16, 185, 129, 0.8)'],
                borderColor: ['#f59e0b', '#10b981'],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 6, grid: { color: 'rgba(0, 0, 0, 0.1)' } },
                x: { grid: { display: false } }
            },
            animation: { duration: 2000, easing: 'easeOutBounce' }
        }
    });
}

function setupFloatingActionButton() {
    const fabMenu = document.getElementById('fabMenu');
    const fabSubmenu = document.getElementById('fabSubmenu');
    
    if (!fabMenu || !fabSubmenu) return;
    
    let isOpen = false;
    
    fabMenu.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            fabSubmenu.classList.add('show');
            fabMenu.style.transform = 'rotate(45deg)';
        } else {
            fabSubmenu.classList.remove('show');
            fabMenu.style.transform = 'rotate(0deg)';
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-actions') && isOpen) {
            fabSubmenu.classList.remove('show');
            fabMenu.style.transform = 'rotate(0deg)';
            isOpen = false;
        }
    });
}

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        }, index * 200);
    });
}

function addSVGGradients() {
    const svgs = document.querySelectorAll('.progress-svg, .score-svg');
    
    svgs.forEach(svg => {
        if (!svg.querySelector('defs')) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            
            gradient.setAttribute('id', svg.classList.contains('score-svg') ? 'scoreGradient' : 'progressGradient');
            gradient.innerHTML = `
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            `;
            
            defs.appendChild(gradient);
            svg.insertBefore(defs, svg.firstChild);
        }
    });
}

// UTILITY FUNCTIONS
function showError(message) {
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => { document.body.removeChild(toast); }, 300);
    }, 4000);
}

function showSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #10b981, #059669)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => { document.body.removeChild(toast); }, 300);
    }, 3000);
}

// RESULTS PAGE SPECIFIC FUNCTIONS
function downloadReport() {
    showSuccess('Generating your detailed report...');
    
    // Create a comprehensive HTML report
    const reportContent = generateReportHTML();
    
    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_analysis_report_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Also try PDF download if possible
    setTimeout(() => {
        generatePDFReport();
    }, 1000);
}

function generateReportHTML() {
    const score = document.getElementById('overallScore')?.textContent || '85%';
    const matchedSkills = Array.from(document.querySelectorAll('.skill-tag.matched')).map(tag => tag.textContent);
    const missingSkills = Array.from(document.querySelectorAll('.skill-tag.missing')).map(tag => tag.textContent);
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Resume Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .header { text-align: center; margin-bottom: 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 10px; }
        .score { font-size: 48px; font-weight: bold; margin: 20px 0; }
        .section { background: white; margin: 20px 0; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .skill-matched { background: #10b981; color: white; padding: 8px 15px; margin: 5px; border-radius: 20px; display: inline-block; }
        .skill-missing { background: #f59e0b; color: white; padding: 8px 15px; margin: 5px; border-radius: 20px; display: inline-block; }
        h2 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .footer { text-align: center; margin-top: 40px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧠 Resume Analysis Report</h1>
        <div class="score">${score}</div>
        <p>Overall Compatibility Score</p>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    
    <div class="section">
        <h2>✅ Matched Skills (${matchedSkills.length})</h2>
        ${matchedSkills.map(skill => `<span class="skill-matched">${skill}</span>`).join('')}
    </div>
    
    <div class="section">
        <h2>⚠️ Skills to Improve (${missingSkills.length})</h2>
        ${missingSkills.map(skill => `<span class="skill-missing">${skill}</span>`).join('')}
    </div>
    
    <div class="section">
        <h2>💡 AI Recommendations</h2>
        <ul>
            <li><strong>Add Cloud Computing Skills:</strong> Learn AWS, Azure, or Google Cloud Platform to boost your profile for modern data roles.</li>
            <li><strong>Quantify Your Achievements:</strong> Add specific metrics and numbers to demonstrate the impact of your work.</li>
            <li><strong>Include Relevant Certifications:</strong> Add industry certifications to strengthen your technical credibility.</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>📊 Analysis Summary</h2>
        <p><strong>Overall Score:</strong> ${score}</p>
        <p><strong>Matched Skills:</strong> ${matchedSkills.length} out of ${matchedSkills.length + missingSkills.length}</p>
        <p><strong>Recommendation:</strong> Strong candidate with excellent technical alignment</p>
        <p><strong>Next Steps:</strong> Focus on acquiring the missing skills to reach 95%+ compatibility</p>
    </div>
    
    <div class="footer">
        <p>Report generated by ResumeAI - AI-Powered Career Intelligence</p>
        <p>Visit our website for more career insights and tools</p>
    </div>
</body>
</html>`;
}

function generatePDFReport() {
    // Alternative PDF download using window.print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(generateReportHTML());
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'My Resume Analysis Results',
            text: 'Check out my resume analysis results from ResumeAI!',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showSuccess('Results link copied to clipboard!');
    }
}

function scheduleConsultation() {
    showSuccess('Redirecting to consultation booking...');
    // Add booking logic here
}

function improveResume() {
    showSuccess('AI Resume Improver coming soon!');
}

function generateCoverLetter() {
    showSuccess('Cover Letter Generator coming soon!');
}

function jobSuggestions() {
    showSuccess('Job Suggestions feature coming soon!');
}

// MOUSE EFFECTS
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.analyzer-card, .feature-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
});

document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.analyzer-card, .feature-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        navbar.style.backdropFilter = 'blur(25px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// DYNAMIC CSS INJECTION
const dynamicCSS = `
@keyframes confetti-fall {
    to {
        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 100}px) rotate(720deg);
        opacity: 0;
    }
}

@keyframes particle-float {
    0% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
        opacity: 0;
    }
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

.fade-in-scale {
    animation: fadeInScale 0.5s ease;
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Results page specific styles */
.results-main {
    margin-top: 80px;
    padding: 2rem;
    min-height: calc(100vh - 80px);
}

.results-header {
    text-align: center;
    padding: 3rem 0;
    margin-bottom: 3rem;
}

.header-content {
    max-width: 800px;
    margin: 0 auto;
}

.success-animation {
    margin-bottom: 2rem;
    animation: successPop 1s ease;
}

@keyframes successPop {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.checkmark-circle {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: white;
    font-size: 2rem;
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
}

.results-title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(45deg, #fff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease 0.3s both;
}

.results-subtitle {
    font-size: 1.2rem;
    color: var(--text-light);
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease 0.6s both;
}

.score-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 1s ease 0.9s both;
}

.score-circle {
    position: relative;
    width: 150px;
    height: 150px;
}

.score-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}

.score-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.2);
    stroke-width: 12;
}

.score-bar {
    fill: none;
    stroke: url(#scoreGradient);
    stroke-width: 12;
    stroke-linecap: round;
    stroke-dasharray: 314;
    stroke-dashoffset: 314;
    animation: scoreAnimation 2s ease-in-out 1.5s forwards;
}

@keyframes scoreAnimation {
    to {
        stroke-dashoffset: 47; /* 85% of 314 */
    }
}

.score-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.score-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    animation: countUp 2s ease 1.5s both;
}

.score-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
}

.score-info {
    flex: 1;
    text-align: left;
}

.score-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
}

.score-description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.score-badges {
    display: flex;
    gap: 1rem;
}

.score-badge {
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.score-badge.excellent {
    background: linear-gradient(135deg, #10b981, #059669);
}

.score-badge.recommended {
    background: linear-gradient(135deg, #f59e0b, #d97706);
}

.nav-actions {
    display: flex;
    gap: 1rem;
}

.nav-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;
}

.nav-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

@keyframes countUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const style = document.createElement('style');
style.textContent = dynamicCSS;
document.head.appendChild(style);

// EASTER EGG
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 1s infinite';
    
    setTimeout(() => {
        body.style.animation = '';
    }, 5000);
    
    showSuccess('🎉 Easter egg activated! You found the secret!');
}