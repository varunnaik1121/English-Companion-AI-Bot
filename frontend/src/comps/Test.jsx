import { useEffect, useRef, useState } from 'react';
import 'regenerator-runtime';
import ChatBubble from './ChatBubble';
import SpeechToText from './SpeechToText';
const Test = () => {
  // const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const divRef = useRef(null);
  const [conversation, setConversation] = useState([
    {
      role: 'model',
      parts: [
        {
          text: `You're William, assisting a user buying an iPhone in a mall. Start with a friendly greeting and ask about their phone needs, e.g., "Hello! Looking for a new phone today? What features are you interested in?" Guide them through options like models and colors briefly. Ask about their budget and suggest suitable choices. Answer queries about specifications concisely, e.g., "The iPhone X has a great camera for photos." Simplify technical terms as needed. Confirm their decision and offer help with the purchase. Ensure they're satisfied with the choice. If asked about unrelated topics, politely respond, in your way that you dont know that dont just use the single sentence .`,
        },
      ],
    },
  ]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [conversation]);

  function replaceSpecialCharacters(text) {
    return text.replace(/[\*\?\n]/g, ' ');
  }

  const sendTranscriptToAPI = async (transcript) => {
    const userInput = {
      role: 'user',
      parts: [{ text: transcript }],
    };

    const newConversation = [...conversation, userInput];

    // Update conversation state
    setConversation(newConversation);

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${`AIzaSyC7vXN0AK2qeDOzUwGvi5THiKedNidZQww`}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          contents: newConversation,
          generationConfig: {
            maxOutputTokens: 150,
            // Limit the response to 150 tokens
          },
        }),
      }
    );

    console.log({ newConversation });

    const data = await response.json();
    console.log(data);
    const modelResponse = data.candidates[0].content.parts[0].text;
    //remove the trash data and convert to
    const cleanedText = replaceSpecialCharacters(modelResponse);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.pitch = 0.8;
    utterance.rate = 1.1;

    window.speechSynthesis.speak(utterance);

    // Update conversation with model response
    setConversation([
      ...newConversation,
      { role: 'model', parts: [{ text: modelResponse }] },
    ]);
  };

  return (
    <div className="grid lg:grid-cols-4 relative py-24 border">
      <div>Target words</div>
      <div className="col-span-2 min-h-[90vh] overflow-scroll ">
        <div>
          <h2>Conversation History</h2>

          {conversation.map((data, index) => {
            return (
              <div
                ref={index === conversation.length - 1 ? divRef : null}
                key={index}
              >
                <ChatBubble data={data} />
              </div>
            );
          })}
        </div>
      </div>
      <div>Description about the scenerio</div>
      <SpeechToText sendTranscriptToAPI={sendTranscriptToAPI} />
    </div>
  );
};

export default Test;
