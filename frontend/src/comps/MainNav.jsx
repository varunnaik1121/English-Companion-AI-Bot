import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
const MainNav = () => {
  return (
    <header className="flex justify-between border py-4 mb-4">
      <h2 className="font-bold text-xl">English Tutor</h2>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default MainNav;
