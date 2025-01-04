import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";

const useOrders = () => {
  const { orderRefresh } = useRefresh();
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [developmentOrders, setDevelopmentOrders] = useState([]);
  const [hostingOrders, setHostingOrders] = useState([]);
  const [seoOrders, setSeoOrders] = useState([]);
  const [ppcOrders, setPpcOrders] = useState([]);
  const [mernOrders, setMernOrders] = useState([]);
  const [wordpressOrders, setWordpressOrders] = useState([]);
  const [shopifyOrders, setShopifyOrders] = useState([]);
  const [wixOrders, setWixOrders] = useState([]);
  const [totalSales, setTotalSales] = useState({
    week: 0,
    month: 0,
    year: 0,
    total: 0,
  });
  const [activeSales, setActiveSales] = useState(0);
  const [cancelSales, setCancelSales] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/order/get/all")
      .then((response) => response.json())
      .then((data) => {
        const fetchedOrders = data.data || [];
        setOrders(fetchedOrders);

        // Separate orders by status
        setNewOrders(fetchedOrders.filter((order) => order.status === "new"));
        setActiveOrders(
          fetchedOrders.filter((order) =>
            ["in progress", "delivered", "on review", "assigned"].includes(order.status)
          )
        );
        setFinishedOrders(
          fetchedOrders.filter((order) => order.status === "finished")
        );
        setCancelledOrders(
          fetchedOrders.filter((order) => order.status === "cancelled")
        );
        setRejectedOrders(
          fetchedOrders.filter((order) => order.status === "rejected")
        );

        // Separate orders by service with ongoing status
        const ongoingStatuses = [
          "in progress",
          "delivered",
          "on review",
          "assigned",
        ];
        setDevelopmentOrders(
          fetchedOrders.filter(
            (order) =>
              order.service === "development" &&
              ongoingStatuses.includes(order.status)
          )
        );
        setHostingOrders(
          fetchedOrders.filter(
            (order) =>
              order.service === "hosting" &&
              ongoingStatuses.includes(order.status)
          )
        );
        setSeoOrders(
          fetchedOrders.filter(
            (order) =>
              order.service === "seo" && ongoingStatuses.includes(order.status)
          )
        );
        setPpcOrders(
          fetchedOrders.filter(
            (order) =>
              order.service === "ppc" && ongoingStatuses.includes(order.status)
          )
        );

        // Separate orders by specific technologies
        setMernOrders(
          fetchedOrders.filter(
            (order) =>
              order.technology === "mern" &&
              ongoingStatuses.includes(order.status)
          )
        );
        setWordpressOrders(
          fetchedOrders.filter(
            (order) =>
              order.technology === "wordpress" &&
              ongoingStatuses.includes(order.status)
          )
        );
        setShopifyOrders(
          fetchedOrders.filter(
            (order) =>
              order.technology === "shopify" &&
              ongoingStatuses.includes(order.status)
          )
        );
        setWixOrders(
          fetchedOrders.filter(
            (order) =>
              order.technology === "wix" &&
              ongoingStatuses.includes(order.status)
          )
        );

        // Calculate total sales (only from finished orders)
        const now = new Date();
        const weekAgo = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        const monthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const yearAgo = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );

        let total = 0,
          week = 0,
          month = 0,
          year = 0;

        fetchedOrders
          .filter((order) => order.status === "finished")
          .forEach((order) => {
            const { budget = 0, finishedAt } = order;
            total += budget;

            const finishedDate = new Date(finishedAt);
            if (finishedDate >= weekAgo) week += budget;
            if (finishedDate >= monthAgo) month += budget;
            if (finishedDate >= yearAgo) year += budget;
          });

        setTotalSales({ total, week, month, year });

        // Calculate active and cancelled sales
        setActiveSales(
          fetchedOrders
            .filter((order) =>
              ["in progress", "delivered", "on review", "assigned"].includes(
                order.status
              )
            )
            .reduce((acc, order) => acc + (order.budget || 0), 0)
        );

        setCancelSales(
          fetchedOrders
            .filter((order) => order.status === "cancelled")
            .reduce((acc, order) => acc + (order.budget || 0), 0)
        );
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [orderRefresh]);

  return {
    orders,
    newOrders,
    activeOrders,
    finishedOrders,
    cancelledOrders,
    rejectedOrders,
    developmentOrders,
    hostingOrders,
    seoOrders,
    ppcOrders,
    mernOrders,
    wordpressOrders,
    shopifyOrders,
    wixOrders,
    totalSales,
    activeSales,
    cancelSales,
  };
};

export default useOrders;
