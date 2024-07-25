import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/clerk-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
const Header = () => {
  const { isSignedIn } = useAuth();
  return (
    <header className="w-full  flex justify-between items-center p-4 bg-primary ">
      <div className="flex items-center space-x-2">
        <LogInIcon className="w-8 h-8 text-white" />
        <span className="text-white text-2xl font-semibold">English Tutor</span>
      </div>
      <nav className="hidden md:flex space-x-8 text-white">
        <Link href="#" className="hover:text-gray-300">
          About
        </Link>
        <Link href="#" className="hover:text-gray-300">
          Features
        </Link>
        <Link href="#" className="hover:text-gray-300">
          Community
        </Link>
        <Link href="#" className="hover:text-gray-300">
          Pricing
        </Link>
      </nav>
      <Button variant="ghost" className="text-white border-white">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Button>
    </header>
  );
};

export default Header;

function LogInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
