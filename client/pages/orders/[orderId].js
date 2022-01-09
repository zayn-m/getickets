import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: (payment) => Router.push('/orders'),
  })

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={(token) => doRequest({ token: id })}
        stripeKey="pk_test_51KFhziIOCViZ40O3wmHIkJvLBtOsQddXYoW8w8cIHo9pDLZ3r2yXrCeoRCDR34twv0NtcRX3k0T9g8ucPJGTcaGx00RDkovY8O"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
