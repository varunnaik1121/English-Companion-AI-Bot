const ChatBubble = ({ data, index, firstText }) => {
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
  return null;
};
export default ChatBubble;
