import React, { useEffect, useState } from 'react';
import orderService from './orderService';

function Check() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const params = {
          user_id: 108,
          currency_id: 2,
          rate: 1,
          payment_id: 1,
          delivery_price_id: 1,
          address: {
            country_id: 1,
            city_id: 1,
            street_house_number: 8322991,
            zip_code: '65500',
            location: {
              latitude: 47.4143302506288,
              longitude: 8.532059477976883,
            },
          },
          delivery_date: '2024-07-13 18:00',
          delivery_type: 'delivery',
          phone: '923128322991',
          notes: {},
          coupons: {},
          data: [
            {
              shop_id: 501,
              products: [
                {
                  stock_id: 1,
                  quantity: 1,
                },
              ],
            },
          ],
        };

        const response = await orderService.getAll(params);
        setOrders(response.data.data);
        console.log('Orders api response:', response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Check console</h1>
    </div>
  );
}

export default Check;
