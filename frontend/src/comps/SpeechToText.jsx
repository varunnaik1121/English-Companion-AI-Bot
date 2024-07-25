import { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { MicOff } from 'lucide-react';
import { AudioLines } from 'lucide-react';
const SpeechToText = ({ sendTranscriptToAPI }) => {
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const handleMicrophoneClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      // Send the transcript to the API
      sendTranscriptToAPI(transcript);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      window.speechSynthesis.cancel();
      setIsRecording(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 bg-gray-100 w-full flex justify-center">
      <div className="p-4 a flex w-fit justify-center items-center border gap-6">
        <input
          type="text"
          value={transcript}
          readOnly
          placeholder="Your speech will appear here..."
          className="border  md:min-w-[500px] p-4 rounded"
        />
        <button
          onClick={handleMicrophoneClick}
          className={`p-2 rounded-full ${
            isRecording ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          {isRecording ? <AudioLines /> : <MicOff />}
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
