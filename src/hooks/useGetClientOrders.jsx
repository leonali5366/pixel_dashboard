/* eslint-disable no-unused-vars */
import { AuthContext } from "@/Context/UserContext";
import { useContext, useEffect, useState } from "react";

const useGetClientOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [cancelOrder, setCancelOrder] = useState([]);
  const [rejectOrder, setRejectOrder] = useState([]);
  const [newTotalBudget, setNewTotalBudget] = useState(0);
  const [currentCount, setCurrentCount] = useState({
    totalBudget: 0,
    totalDue: 0,
    totalPaid: 0,
  });
  const [previousCount, setPreviousCount] = useState({
    total: 0,
  });
  const [clientOrderLoading, setClientOrderLoading] = useState(false);
  const [clientOrderError, setClientOrderError] = useState(null);
  const [clientOrderRefresh, setClientOrderRefresh] = useState(1);

  useEffect(() => {
    setClientOrderLoading(true);
    fetch(
      `http://localhost:5000/api/v1/order/get/clientAllOrder?email=${user?.email}`
    )
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
        const orders = data.data;

        // get current orders
        const currentOrders = orders.filter(
          (order) =>
            order.status === "assigned" ||
            order.status === "in progress" ||
            order.status === "on review" ||
            order.status === "delivered"
        );
        setCurrentOrders(currentOrders);

        // get previous orders
        const previousOrders = orders.filter(
          (order) => order.status === "finished"
        );
        setPreviousOrders(previousOrders);

        // get new orders
        const newOrders = orders.filter((order) => order.status === "new");
        setNewOrders(newOrders);

        // calculate total budget
        let newTotalBudget = 0;
        newOrders.forEach((order) => {
          newTotalBudget += order.budget;
        });
        setNewTotalBudget(newTotalBudget);

        // get canceled orders
        const canceledOrders = orders.filter(
          (order) => order.status === "cancelled"
        );
        setCancelOrder(canceledOrders);

        // get rejected orders
        const rejectedOrders = orders.filter(
          (order) => order.status === "rejected"
        );
        setRejectOrder(rejectedOrders);

        // calculate current order counts
        let totalBudget = 0;
        let totalDue = 0;
        let totalPaid = 0;
        currentOrders.forEach((order) => {
          totalBudget += order.budget;
          totalDue += order.moneyDue;
          totalPaid = totalBudget - totalDue;
        });
        setCurrentCount({ totalBudget, totalDue, totalPaid });
      })
      .finally(() => {
        setClientOrderLoading(false);
      });

    // calculate previous order counts
    let totalBudget = 0;
    previousOrders.forEach((order) => {
      totalBudget += order.budget;
    });
    setPreviousCount({ totalBudget });
  }, [user?.email, clientOrderRefresh]);

  return {
    orders,
    newOrders,
    newTotalBudget,
    currentOrders,
    previousOrders,
    cancelOrder,
    rejectOrder,
    currentCount,
    previousCount,
    clientOrderRefresh,
    setClientOrderRefresh,
  };
};

export default useGetClientOrders;
