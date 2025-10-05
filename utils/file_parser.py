import os
import PyPDF2
from docx import Document

class FileParser:
    """Class to parse text from different file types"""

    def extract_text(self, filepath):
        """Extract text from a given file based on its extension."""
        file_extension = os.path.splitext(filepath)[1].lower()

        if file_extension == '.pdf':
            return self._extract_pdf_text(filepath)
        elif file_extension == '.docx':
            return self._extract_docx_text(filepath)
        else:
            return ""

    def _extract_pdf_text(self, filepath):
        """Extract text from a PDF file."""
        text = ""
        try:
            with open(filepath, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text() or ""
            return text
        except Exception as e:
            print(f"Error extracting text from PDF: {e}")
            return ""

    def _extract_docx_text(self, filepath):
        """Extract text from a DOCX file."""
        text = ""
        try:
            doc = Document(filepath)
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        except Exception as e:
            print(f"Error extracting text from DOCX: {e}")
            return ""