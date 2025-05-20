# Product Requirements Document (PRD) - MVP
## App: Book Notes Collector

---

## 1. Overview
1.1. A mobile app for digitizing handwritten or printed book notes using the device camera.
1.2. Each note must always refer to a specific book. Notes are organized and compiled under books.
1.3. Users can view and export their notes as Markdown files, grouped by book.

---

## 2. MVP User Stories
2.1. As a user, I want to take a picture of my notes, so I can digitize them easily.
2.2. As a user, I want the app to extract text from my pictures automatically.
2.3. As a user, I want to view all my saved notes in the app.
2.4. As a user, I want to export my notes as a Markdown file.

---

## 3. MVP Features & Requirements
### 3.1. Note Capture & OCR
3.1.1. Use device camera to capture images of book notes.
3.1.2. Integrate OCR using Google Gemini API to extract text from images.
3.1.3. Allow user to review and edit extracted text before saving.

### 3.2. Note Storage
3.2.1. Store notes locally in a database (SQLite).
3.2.2. Each note must be associated with a book and include:
  3.2.2.1. Reference to the parent book (book ID)
  3.2.2.2. Extracted text (editable)
  3.2.2.3. Timestamp
3.2.3. Books should have:
  3.2.3.1. Title (required)
  3.2.3.2. List of associated notes

### 3.3. Notes List & Viewer
3.3.1. Display a simple list of all books.
3.3.2. Allow users to tap a book to view its associated notes.
3.3.3. Allow users to tap a note to view and edit its text.

### 3.4. Export to Markdown
3.4.1. Export all notes from a selected book as a Markdown file.
3.4.2. Generate a basic Markdown (.md) file with notes grouped under their book.
3.4.3. Allow sharing the file via device share sheet.

### 3.5. UI/UX
3.5.1. Use Expo's built-in components for layouts and navigation.
3.5.2. Basic responsive design using Flexbox.
3.5.3. Simple, functional interface focused on core user tasks.

---

## 4. MVP Technical Requirements
4.1. Framework: React Native (Expo)
4.2. Database: SQLite (local-first)
4.3. OCR: Google Gemini API
4.4. Export: Basic Markdown file generation and sharing
4.5. TypeScript: Interfaces for core types
4.6. Styling: Simple styling with styles object
4.7. Navigation: React Navigation (minimal structure)

---

## 5. MVP Milestones & Steps
5.1. Project Setup
  5.1.1. Initialize Expo project with TypeScript.
  5.1.2. Set up basic navigation structure.
5.2. Camera & OCR Integration
  5.2.1. Implement camera screen.
  5.2.2. Integrate Google Gemini API to extract text from images.
5.3. Note Storage
  5.3.1. Set up SQLite database.
  5.3.2. Implement basic CRUD operations for books and notes.
5.4. Notes List & Viewer
  5.4.1. Create book list and note list views.
  5.4.2. Implement simple note editing.
5.5. Export Functionality
  5.5.1. Create Markdown export for books.
  5.5.2. Integrate share functionality.
5.6. Testing & Release
  5.6.1. Test core functionality.
  5.6.2. Fix critical bugs and prepare for release.

---

## 6. MVP Success Criteria
6.1. User can capture a note, associate it with a book, see OCR'd text from Google Gemini, and save it.
6.2. User can view and edit saved notes, organized under books.
6.3. User can export notes from a book as a Markdown file.
6.4. App provides a functional interface that supports the core user journey.