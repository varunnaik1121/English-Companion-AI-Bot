import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
const Scenerios = () => {
  //TODO: make the db call to fetch the scenerios and dispaly them using cards
  const { userId } = useAuth();
  const [scenerioData, setScenerioData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenerios = async () => {
      try {
        const data = await axios.get(
          'http://localhost:7000/api/scenerio/getAllScenerios'
        );

        setScenerioData(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchScenerios();
  }, []);

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
  }, [userId]);

  const handleClick = async (id, index) => {
    if (
      !userDetails?.subscriptionStatus &&
      scenerioData[index]?.subscriptionOnly
    ) {
      navigate('/pricing');
    } else {
      navigate(`/scenerios/${id}`);
    }
  };

  return (
    <div className="flex">
      <div className="lg:min-w-[250px] ">Sidebar</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 ">
        {scenerioData &&
          scenerioData.map((data, index) => (
            // <Card
            //   className="w-full max-w-md rounded-lg shadow-lg overflow-hidden "
            //   key={data._id}
            // >
            //   <img
            //     src={data.imageUrl}
            //     alt="Card Image"
            //     className="w-full h-48 object-cover"
            //   />
            //   <CardContent className="p-6 space-y-4">
            //     <h3
            //       className="text-2xl font-bold underline cursor-pointer"
            //       onClick={() => handleClick(data._id)}
            //     >
            //       {data.name}
            //     </h3>
            //     <p className="text-muted-foreground font-serif  max-h-[150px] no-scrollbar overflow-y-scroll">
            //       {data.description}
            //     </p>
            //   </CardContent>
            // </Card>
            <Card
              className="relative w-full max-w-md rounded-lg shadow-lg overflow-hidden"
              key={data._id}
              onClick={() => handleClick(data._id, index)}
            >
              <img
                src={data?.imageUrl}
                alt="Card Image"
                className="w-full h-48 object-cover"
              />

              {!data?.subscriptionOnly ||
                (!userDetails?.subscriptionStatus && (
                  <div className="absolute inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                    <Lock className="text-white text-4xl" />
                  </div>
                ))}

              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold underline cursor-pointer">
                  {data.name}
                </h3>
                <p className="text-muted-foreground font-serif max-h-[150px] no-scrollbar overflow-y-scroll">
                  {data.description}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Scenerios;
