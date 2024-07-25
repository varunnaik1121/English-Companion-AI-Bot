import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#5a4fcf] flex flex-col items-center">
      <main className="flex flex-col items-center text-center mt-20 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
          Real-Time English Conversation Practice
          <AudioWaveformIcon className="inline w-8 h-8 text-purple-500" /> of AI
          with English Tutor
        </h1>
        <p className="text-white text-lg md:text-xl mb-8">
          Enter English Tutor chat bot, your gateway to unleashing the
          unparalleled power of AI
        </p>
        <Button
          className="bg-white text-black hover:bg-white px-6 py-3 rounded-full"
          onClick={() => navigate('/scenerios')}
        >
          Get started
        </Button>
        <div className="relative mt-12">
          <img
            src="https://assets.www.happyfox.com/v2/images/hero-fold/CB_Image.webp"
            alt="AI Hand"
            className="w-full max-w-md"
          />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-80 bg-black p-4 rounded-xl text-white">
            <p className="text-sm">
              Hi, Daniel! I am your english tutor how can i help you?
            </p>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-80 bg-purple-500 p-4 rounded-xl text-white mt-4">
            <p className="text-sm">
              I need to improve my communication skills.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

function AudioWaveformIcon(props) {
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
      <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
    </svg>
  );
}

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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
