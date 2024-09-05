import { Button } from '@/components/ui/button';

import { useAuth } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';
import Header from '@/comps/Header';

const Layout = ({ children }) => {
  const { userId, isLoaded } = useAuth();
  const clerk = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!userId) {
    return (
      <div className="w-full min-h-[100vh]  flex justify-center items-center">
        <Button onClick={() => clerk.openSignIn({})}>Authenticate</Button>
      </div>
    );
  }
  return (
    <div className={`antialiased border flex flex-col`}>
      <Header />
      <div className=" bg-secondary p-4 md:p-8">{children}</div>
    </div>
  );
};

export default Layout;
