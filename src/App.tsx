import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import { ScrollToHash } from './components/common/ScrollToHash';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function AppContent() {
  const { theme } = useTheme();

  return (
    <Router>
      <ScrollToHash />
      <div className={`flex flex-col min-h-screen font-sans ${theme} text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black transition-colors duration-200`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;