import { useEffect, useState } from "react";

const useGetNewOrder = () => {
  const [newOrder, setNewOrder] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/order/get/all/new")
      .then((response) => response.json())
      .then((data) => {
        setNewOrder(data.data);
      });
  }, []);

  return newOrder;
};

export default useGetNewOrder;
