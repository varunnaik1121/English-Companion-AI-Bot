import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get('session_id');

      if (sessionId) {
        try {
          const { data } = await axios.get(
            `http://localhost:7000/api/payment/success`,
            {
              params: { session_id: sessionId },
            }
          );
          setSession(data);
        } catch (error) {
          setError('Failed to fetch session details');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No session ID found');
        setLoading(false);
      }
    };

    fetchSession();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase, {session.customer_details?.name}!
        </p>
        <p className="text-gray-700 mb-4">
          A confirmation email has been sent
          {session.customer_details?.email}.
        </p>
        <p className="text-gray-700">
          You have successfully subscribed to the Premium Membership.
        </p>
        <Link
          to={'/scenerios'}
          className="underline text-blue-500 text-center mt-4"
        >
          Go to Scenarios
        </Link>
      </div>
    </div>
  );
};

export default Success;
