# Cochrane Library Reviews App

A React-based Single Page Application for visualizing and searching Cochrane Library medical research reviews.

## Features

- Display list of medical research reviews from Cochrane Library
- Search functionality with auto-suggestions by topic
- Responsive design for all screen sizes
- Infinite scroll pagination (10 reviews initially, load more on scroll)
- Color-coded interface using the primary color #962d91

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd cochrane-library-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Server

To start the development server:

```bash
npm start
```

This will open the application in your browser at `http://localhost:3000`.

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `build` folder.

### Running Tests

To run the test suite:

```bash
npm test
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ReviewList/     # Component for displaying list of reviews
│   ├── ReviewCard/     # Individual review card component
│   ├── SearchBox/      # Search input component
│   └── AutoSuggest/    # Auto-suggestion dropdown component
├── data/               # Data files
│   └── cochrane_reviews.json  # Sample review data
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles and CSS
│   └── global.css      # Global styles with theme variables
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Browser Compatibility

This application is built with React 18 and supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- The application uses TypeScript for type safety
- Global styles are defined in `src/styles/global.css` with CSS custom properties
- The primary color theme is #962d91 as specified in requirements
- Responsive design uses CSS Grid and Flexbox
- Accessibility features include proper ARIA labels and keyboard navigation

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**: The development server will automatically try the next available port
2. **Dependencies not installing**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
3. **Build errors**: Ensure you're using Node.js version 14 or higher

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure all dependencies are properly installed
3. Verify that you're using a supported Node.js version

## License

This project is created for educational and demonstration purposes.