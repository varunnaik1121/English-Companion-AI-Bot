// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import ChatBubble from '@/comps/ChatBubble';
// import SpeechToText from '@/comps/SpeechToText';
// import { useRef } from 'react';
// import { useAuth } from '@clerk/clerk-react';
// const SingleScenerio = () => {
//   const { userId } = useAuth();
//   const divRef = useRef(null);
//   const { id } = useParams('id');
//   //   const navigate = useNavigate();
//   const [scenario, setScenario] = useState(null);
//   const [conversation, setConversation] = useState([]);
//   const [targetWords, setTargetWords] = useState([]);

//   //   useEffect(() => {
//   //     const fetchScenerioById = async () => {
//   //       if (!id) {
//   //         navigate('/');
//   //       }
//   //       try {
//   //         const data = await axios.post(
//   //           'http://localhost:7000/api/getScenerio/getScenerioById',
//   //           { id }
//   //         );
//   //         console.log(data);
//   //       } catch (error) {
//   //         console.log(error);
//   //       }
//   //     };

//   //     fetchScenerioById();
//   //   }, [id]);

//   useEffect(() => {
//     const fetchScenarioData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:7000/api/getScenerio/getScenerioById`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id: id }),
//           }
//         );

//         const data = await response.json();
//         if (data) {
//           setScenario(data);
//           // Initialize conversation with model prompt
//           const initialConversation = [
//             {
//               role: 'model',
//               parts: [
//                 {
//                   text: data.modelPrompt,
//                 },
//               ],
//             },
//           ];

//           // Fetch user progress
//           const progressResponse = await fetch(
//             `http://localhost:7000/api/getUserProgress`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ userId: userId, scenarioId: id }),
//             }
//           );

//           const progressData = await progressResponse.json();

//           if (progressData.progress) {
//             initialConversation.push(...progressData.progress.history);
//             setTargetWords(progressData.progress.completedWords);
//           }

//           setConversation(initialConversation);
//           console.log(conversation);
//         }
//       } catch (error) {
//         console.error('Error fetching scenario data:', error);
//       }
//     };

//     fetchScenarioData();
//   }, [id, userId]);

//   useEffect(() => {
//     if (divRef.current) {
//       divRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [conversation]);

//   function replaceSpecialCharacters(text) {
//     return text.replace(/[\*\?\n]/g, ' ');
//   }

//   const sendTranscriptToAPI = async (transcript) => {
//     if (!transcript) return;
//     // const userInput = {
//     //   role: 'user',
//     //   parts: [{ text: transcript }],
//     // };
//     const userInput = {
//       role: 'user',
//       content: transcript,
//     };

//     const newConversation = [...conversation, userInput];

//     // Update conversation state
//     setConversation(newConversation);

//     // Call Gemini API
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${`AIzaSyC7vXN0AK2qeDOzUwGvi5THiKedNidZQww`}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },

//         body: JSON.stringify({
//           contents: newConversation,
//           generationConfig: {
//             maxOutputTokens: 150,
//             // Limit the response to 150 tokens
//           },
//         }),
//       }
//     );

//     const data = await response.json();
//     console.log({ data });
//     const modelResponse = data.candidates[0].content.parts[0].text;
//     console.log({ modelResponse });
//     //remove the trash data and convert to
//     const cleanedText = replaceSpecialCharacters(modelResponse);
//     const utterance = new SpeechSynthesisUtterance(cleanedText);
//     utterance.pitch = 0.8;
//     utterance.rate = 1.1;

//     window.speechSynthesis.speak(utterance);

//     // Update conversation with model response
//     // const updatedConversation = [
//     //   ...newConversation,
//     //   { role: 'model', parts: [{ text: modelResponse }] },
//     // ];

//     const updatedConversation = [
//       ...newConversation,
//       { role: 'model', content: modelResponse },
//     ];
//     setConversation(updatedConversation);
//     // Save the updated conversation history to the database
//     try {
//       await fetch('http://localhost:7000/api/updateProgress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: userId, // Replace with the actual user ID
//           scenarioId: id, // Replace with the actual scenario ID
//           conversations: [
//             { role: 'user', content: transcript },
//             { role: 'model', content: modelResponse },
//           ],
//         }),
//       });
//     } catch (error) {
//       console.error('Error updating progress:', error);
//     }
//   };

//   return (
//     <div className="grid lg:grid-cols-4 relative py-24 border">
//       <div>
//         <h3>Target Words</h3>
//         {scenario?.targetWords?.map((word, index) => (
//           <div
//             key={index}
//             className={targetWords.includes(word) ? 'text-green-500' : ''}
//           >
//             {word}
//           </div>
//         ))}
//       </div>
//       <div className="col-span-2 min-h-[90vh] overflow-scroll ">
//         <div>
//           <h2>Conversation History</h2>

//           {conversation &&
//             conversation?.map((data, index) => {
//               return (
//                 <div
//                   ref={index === conversation.length - 1 ? divRef : null}
//                   key={index}
//                 >
//                   {data && <ChatBubble data={data} />}
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//       <div>
//         <h3>Scenario Description</h3>
//         <p>{scenario?.description}</p>
//       </div>
//       <SpeechToText sendTranscriptToAPI={sendTranscriptToAPI} />
//     </div>
//   );
// };

// export default SingleScenerio;

import { useEffect, useRef, useState } from 'react';
import 'regenerator-runtime';
import ChatBubble from '@/comps/ChatBubble';
import SpeechToText from '@/comps/SpeechToText';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const SingleScenerio = () => {
  // const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const { userId } = useAuth();
  const divRef = useRef(null);
  const { id } = useParams('id');
  const [conversation, setConversation] = useState([]);
  const [scenerio, setScenerio] = useState([]);
  const navigate = useNavigate();
  const [firstText, setFirstText] = useState('');
  const [scenarioTargetWords, setScenarioTaregtWords] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    window.speechSynthesis.cancel();
    const fetchScenerioById = async () => {
      if (!id) {
        navigate('/');
      }
      try {
        const data = await axios.post(
          'http://localhost:7000/api/getScenerio/getScenerioById',
          { id }
        );
        setScenerio(data.data);
        //
      } catch (error) {
        console.log(error);
      }
    };

    fetchScenerioById();
  }, [id]);

  useEffect(() => {
    const checkMessagesForWords = () => {
      const updatedWords = scenarioTargetWords?.map((word) => {
        const found = conversation?.some(
          (message) =>
            message.role === 'user' &&
            message.parts.some((part) =>
              part.text.toUpperCase().includes(word.toUpperCase())
            )
        );
        return found ? `~~${word}~~` : word;
      });
      setScenarioTaregtWords(updatedWords);
    };
    checkMessagesForWords();
  }, [conversation]);

  console.log();

  useEffect(() => {
    if (scenerio) {
      let modelInitialObj = {
        role: 'model',
        parts: [{ text: scenerio.modelPrompt }],
      };
      let arr = [];
      arr.push(modelInitialObj);
      setConversation(arr);
      if (scenerio) {
        setFirstText(scenerio.firstText);
      }
      console.log(scenerio);
      setScenarioTaregtWords(scenerio.targetWords);
    }
  }, [scenerio]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  //for to run when the id changes need to check the user is paid or not
  useEffect(() => {
    const fetchUserDetails = async () => {
      const data = await axios.post(
        'http://localhost:7000/api/createUser/getUser',
        {
          userId: userId,
        }
      );
      setUserDetails(data.data.user);
    };
    if (userId) {
      fetchUserDetails();
    }
  }, [id]);

  console.log({ userDetails });

  function replaceSpecialCharacters(text) {
    return text.replace(/[\*\?\n]/g, ' ');
  }

  const sendTranscriptToAPI = async (transcript) => {
    if (!transcript) {
      return;
    }
    const userInput = {
      role: 'user',
      parts: [{ text: transcript }],
    };

    const newConversation = [...conversation, userInput];

    // Update conversation state
    setConversation(newConversation);
    if (conversation.length >= 20 && !userDetails?.subscriptionStatus) {
      const arr = [
        'sorry to interupt but your free trail is over please upgrade to premium membership ',
        'sorry to say this your free tier is over buy premium now',
        'sorry to inform you that you need to buy the premium for the endless reponses',
      ];
      const randomResponse = arr[Math.floor(Math.random() * arr.length)];
      console.log({ randomResponse });
      const utterance = new SpeechSynthesisUtterance(randomResponse);
      utterance.pitch = 0.8;
      utterance.rate = 1.1;

      window.speechSynthesis.speak(utterance);

      // Update conversation with model response
      setConversation([
        ...newConversation,
        { role: 'model', parts: [{ text: randomResponse }] },
      ]);
    } else {
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

      const data = await response.json();

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
    }

    // Call Gemini API

    //after updating the conversation
    //just check every time  the conversation is
  };

  return (
    <div className="grid lg:grid-cols-4 relative py-24 border">
      <div className=" flex flex-col col-span-1 px-6">
        <h3 className="font-bold text-center underline mb-4">Target Words</h3>
        {scenarioTargetWords?.map((word) => (
          <div
            key={word}
            className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold  px-4 py-2 rounded-full mt-4 text-center capitalize"
          >
            {word}
          </div>
        ))}
      </div>
      <div className="col-span-2 min-h-[90vh] overflow-scroll no-scrollbar shadow-md ">
        <div>
          <div className="w-full bg-blue-600 p-3 shadow-sm flex gap-4 items-center rounded-sm">
            <img
              src="https://cdn.dribbble.com/userupload/5114471/file/still-5c2db1fc26282fb3fb190bd5f19278a7.png?resize=400x0"
              className="w-[60px] h-[60px] object-cover rounded-full"
              alt="bot"
            />
            <h2 className="font-bold text-white">AI Bot</h2>
          </div>
          <ChatBubble />

          {conversation?.map((data, index) => {
            return (
              <div
                ref={index === conversation.length - 1 ? divRef : null}
                key={index}
              >
                {index < 1 ? (
                  <div className="flex items-start p-4">
                    <div className="mr-2 min-w-[30px] h-[30px] ">
                      <img
                        src="https://cdn.dribbble.com/userupload/5114471/file/still-5c2db1fc26282fb3fb190bd5f19278a7.png?resize=400x0"
                        className="w-[30px] h-[30px]  object-cover rounded-full"
                        alt="model"
                      />
                    </div>
                    <div className="bg-gray-200 text-black p-2 rounded-lg shadow-md">
                      {scenerio?.firstText}
                    </div>
                  </div>
                ) : (
                  <ChatBubble
                    data={data}
                    index={index}
                    firstText={firstText}
                    key={index}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-4 mb-4">
        <div className="font-bold">Scenario</div>
        <p>{scenerio?.description}</p>
      </div>
      <SpeechToText sendTranscriptToAPI={sendTranscriptToAPI} />
    </div>
  );
};

export default SingleScenerio;
