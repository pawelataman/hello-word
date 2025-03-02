# Słówka Madzi (Madzia's Words)

A comprehensive language learning application designed to help users master English and Polish vocabulary through interactive features like flashcards, quizzes, and daily word exercises.

## 🌟 Features

### 📚 Dictionary & Flashcards
- **Comprehensive Dictionary**: Browse through an extensive collection of English-Polish word pairs
- **Custom Flashcards**: Create and organize personalized flashcard collections
- **Color Coding**: Customize flashcard colors for better organization
- **Word Management**: Add, edit, and organize words in your personal dictionary

### 🎯 Quiz System
- **Multiple Quiz Modes**: Various learning modes to test and improve your vocabulary
- **Bi-directional Learning**: Practice translations from English to Polish and vice versa
- **Interactive Interface**: User-friendly quiz interface with immediate feedback
- **Progress Tracking**: Monitor your learning progress over time

### 📅 Daily Learning
- **Word of the Day**: New word pairs presented daily
- **Audio Pronunciation**: Listen to correct pronunciations in both languages
- **Grammar Information**: Part of speech indicators for better understanding
- **Visual Learning**: Clear visual representation with country flags for language indication

## 🛠 Technical Stack

### Frontend (Mobile)
- **Framework**: React Native with Expo
- **Styling**: TailwindCSS (via NativeWind)
- **State Management**: 
  - Zustand for application state
  - React Query for server state
- **Navigation**: Expo Router
- **Forms**: React Hook Form
- **Authentication**: Clerk

### Backend
- **Language**: Go (Golang)
- **Database**: PostgreSQL
- **Web Framework**: Fiber
- **Migration Tool**: Goose
- **Authentication**: Clerk SDK

## 📱 Screenshots
[Add screenshots here]

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Go (v1.16 or higher)
- PostgreSQL
- Expo CLI

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
```

2. **Frontend Setup**
```bash
cd mobile
npm install
```

3. **Backend Setup**
```bash
cd api
go mod download
```

4. **Environment Setup**
Create `.env` files in both `mobile` and `api` directories:

```env
# mobile/.env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key

# api/.env
DB_URL=postgresql://admin:password@localhost:5432/hello-word
```

5. **Database Setup**
```bash
cd api
make upgrade
```

### Running the Application

1. **Start the Backend**
```bash
cd api
make run
```

2. **Start the Frontend**
```bash
cd mobile
npm start
```

## 🔧 Development

### Available Scripts

#### Frontend
- `npm start` - Start the Expo development server
- `npm run ios` - Start the iOS simulator
- `npm run android` - Start the Android emulator
- `npm run web` - Start the web version
- `npm test` - Run tests
- `npm run lint` - Run linter

#### Backend
- `make run` - Run the server
- `make build` - Build the application
- `make migration` - Create a new database migration
- `make upgrade` - Run database migrations
- `make docker-dev` - Run development environment in Docker

## 🤝 Contributing
[Add contribution guidelines here]

## 📄 License
[Add license information here]

## 👥 Authors
[Add authors information here]

## 🙏 Acknowledgments
- Clerk for authentication
- Expo team for the amazing mobile development framework
- All contributors and supporters of the project

## 📞 Contact
[Add contact information here]

---

Made with ❤️ for language learners