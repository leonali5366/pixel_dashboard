const GetSingleOrder = (id, setOrder, setClient) => {
  fetch(`http://localhost:5000/api/v1/order/get/single/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setOrder(data?.data || {}); // Set order data
      setClient(data?.client || {}); // Set client data
    });
};

export default GetSingleOrder;
