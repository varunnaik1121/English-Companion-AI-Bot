import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '@clerk/clerk-react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const stripePromise = loadStripe(
  'pk_test_51PfzDtSA0aLBsyg4PqOBheKvLgWEKUtjAUp3Dl4HXV71TI58H1z6MURenXy83RpE959FKclKIKuKoNkvswwdsEs7009fai2ZFr'
);

const Pricing = () => {
  const { userId } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
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

  if (userDetails?.subscriptionStatus) {
    return (
      <div className="flex justify-between items-center p-6">
        <h2>Already a Preemium user</h2>
        <Link to={'/'} className="underline">
          Go to homepage
        </Link>
      </div>
    );
  }

  const handleClick = async () => {
    if (!userId) return;
    const { data } = await axios.post('http://localhost:7000/api/payment', {
      email: userDetails?.email, // Replace with dynamic email if needed
    });

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
        <img
          src="https://via.placeholder.com/150"
          alt="Membership"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Membership - ₹599</h1>
          <p className="text-gray-700 mb-6">Unlocks all scenarios</p>
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
