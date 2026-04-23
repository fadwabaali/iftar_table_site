# 🌙 Iftar Table Planner

A beautiful and modern web application for planning and organizing Ramadan Iftar meals. Create your perfect Iftar table by selecting from a variety of delicious dishes, sides, desserts, and drinks.

![Iftar Table Planner](https://img.shields.io/badge/React-19.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF) ![Firebase](https://img.shields.io/badge/Firebase-12.10.0-orange) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)

## ✨ Features

### 🍽️ Meal Management
- **Add New Meals**: Create and customize your own meal entries
- **Edit Meals**: Modify existing meal details directly from the interface
- **Delete Meals**: Remove meals from your table with hover-to-delete functionality
- **Multiple Categories**: Organize meals into Main Dishes, Side Dishes, Desserts, and Drinks

### 📱 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, Ramadan-themed design with smooth animations
- **Interactive Table**: Visual representation of your selected meals in a beautiful rectangle layout
- **Real-time Updates**: Changes reflect immediately across the application

### 🔧 Technical Features
- **Firebase Integration**: Cloud database for meal storage and synchronization
- **Fast Development**: Vite-powered development server with hot module replacement
- **Type-Safe**: Built with modern React patterns and best practices
- **Accessible**: Semantic HTML and keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for database functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fadwabaali/iftar_table_site.git
   cd iftar_table_site/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional - for full functionality)
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Update `src/firebase.js` with your Firebase configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 📖 Usage

### Creating Your Iftar Table

1. **Browse Meals**: Explore the available meals organized by category
2. **Add to Table**: Click the "Add to Table" button on any meal card
3. **Customize**: Add your own meals using the "Add New Meal" button
4. **Edit Meals**: Click on any meal card or use the edit button to modify details
5. **Remove Meals**: Hover over meals in the final review to see delete options

### Final Review
- View your complete Iftar table in a beautiful rectangular layout
- Print your meal plan for easy reference
- Share your table with family and friends
- Clear the table to start fresh

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Vite 7.3.1** - Fast build tool and development server
- **React Router 7.13.1** - Client-side routing
- **Framer Motion 12.34.3** - Smooth animations and transitions
- **React Icons 5.0.1** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Database
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Hosting** - Fast and secure web hosting

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugins** - React fast refresh and optimization

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── FoodCard.jsx    # Individual meal display
│   │   ├── CategorySection.jsx # Meal category sections
│   │   ├── SummaryTable.jsx # Table summary and final review
│   │   ├── AddMealModal.jsx # Add/edit meal modal
│   │   └── Footer.jsx      # Footer component
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Main page with meal selection
│   │   ├── FinalReview.jsx # Final table visualization
│   │   └── RecipePage.jsx  # Individual recipe view
│   ├── firebase.js         # Firebase configuration
│   ├── main.jsx           # Application entry point
│   └── App.jsx            # Root component
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md             # This file
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint for code quality checks
```

## 🎨 Design Philosophy

The Iftar Table Planner embraces the spirit of Ramadan with:
- **Warm color palette** featuring Ramadan-inspired browns and golds
- **Elegant typography** with clean, readable fonts
- **Smooth animations** that enhance user experience without being distracting
- **Responsive grid layouts** that work beautifully on all devices
- **Intuitive interactions** with hover states and clear visual feedback

## 🤝 Contributing

We welcome contributions to make the Iftar Table Planner even better!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Add proper TypeScript types where applicable
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ramadan Mubarak** to all who use this application during the blessed month
- Special thanks to the React and Firebase communities for amazing tools
- Inspired by the beautiful tradition of Iftar gatherings

## 📞 Support

If you encounter any issues or have suggestions for improvement:
- Open an issue on GitHub
- Contact the maintainers
- Check the documentation for common solutions

---

**Made with ❤️ for the Ramadan community**

*May your Iftars be blessed and your tables filled with delicious food and loving company!* 🌙🍽️
