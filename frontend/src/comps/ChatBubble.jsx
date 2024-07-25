import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';

const ChatBubble = ({ data, index, firstTex }) => {
  if (data?.role === 'model') {
    return (
      <div className="flex items-start p-4">
        <div className="mr-2 min-w-[30px] h-[30px]">
          <img
            src="https://cdn.dribbble.com/userupload/5114471/file/still-5c2db1fc26282fb3fb190bd5f19278a7.png?resize=400x0"
            className="w-full h-full  object-cover rounded-full"
            alt="model"
          />
        </div>
        <div className="bg-gray-200 text-black p-2 rounded-lg shadow-md">
          {data?.parts[0]?.text}
        </div>
      </div>
    );
  }
  if (data?.role === 'user') {
    return (
      <div className="flex justify-end items-start p-4">
        <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md">
          {data?.parts[0]?.text}
        </div>
        <div className="ml-2">
          <img
            className="w-[30px] h-[30px] object-cover rounded-full"
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&t=st=1721327958~exp=1721328558~hmac=c85b37d9fe8bc48737de82daa2673eaad03f1aa76e203ac2e4963c2e161a763a"
            alt="user"
          />
        </div>
      </div>
    );
  }
  //   };
  // };

  // export default ChatBubble;

  return null;
};
export default ChatBubble;

//   const ChatBubble = ({ data }) => {
//     if (data?.role === 'model') {
//       return (
//         <div className="flex items-start p-4">
//           <div className="mr-2 min-w-[30px] h-[30px]">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUMwObYT6MgkvNfnlKR0bl3wYXdpLQMtZK2dbfdnac67FOmkB6ymYH40UeN6YF2wGV3XE&usqp=CAU"
//               className="w-full h-full object-cover rounded-full"
//               alt="model"
//             />
//           </div>
//           <div className="bg-gray-200 text-black p-2 rounded-lg shadow-md">
//             {data?.content}
//           </div>
//         </div>
//       );
//     }
//     if (data?.role === 'user') {
//       return (
//         <div className="flex justify-end items-start p-4">
//           <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md">
//             {data?.content}
//           </div>
//           <div className="ml-2">
//             <img
//               className="w-[30px] h-[30px] object-cover rounded-full"
//               src="https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg"
//               alt="user"
//             />
//           </div>
//         </div>
//       );
//     }

//

//   const ChatBubble = ({ data }) => {
//     if (data?.role === 'model') {
//       return (
//         <div className="flex items-start p-4">
//           <div className="mr-2 min-w-[30px] h-[30px]">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUMwObYT6MgkvNfnlKR0bl3wYXdpLQMtZK2dbfdnac67FOmkB6ymYH40UeN6YF2wGV3XE&usqp=CAU"
//               className="w-full h-full  object-cover rounded-full"
//               alt="model"
//             />
//           </div>
//           <div className="bg-gray-200 text-black p-2 rounded-lg shadow-md">
//             {data?.parts?.map((part, index) => (
//               <p key={index}>{part.text}</p>
//             ))}
//           </div>
//         </div>
//       );
//     }
//     if (data?.role === 'user') {
//       return (
//         <div className="flex justify-end items-start p-4">
//           <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md">
//             {data?.parts?.map((part, index) => (
//               <p key={index}>{part.text}</p>
//             ))}
//           </div>
//           <div className="ml-2">
//             <img
//               className="w-[30px] h-[30px] object-cover rounded-full"
//               src="https://cdn.vectorstock.com/i/1000v/51/87/student-avatar-user-profile-icon-vector-47025187.jpg"
//               alt="user"
//             />
//           </div>
//         </div>
//       );
//     }

//     return null;
//   };
// };
// export default ChatBubble;
