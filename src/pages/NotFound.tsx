import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center bg-white dark:bg-black transition-colors duration-200">
      <Layout>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-9xl font-black text-zinc-100 dark:text-zinc-900 mb-[-2rem] select-none">404</h1>
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 relative z-10 tracking-tight uppercase">Page Not Found</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 font-light">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
                <Home size={18} />
                Back to Home
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <ArrowLeft size={18} />
                Explore Blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default NotFound;
