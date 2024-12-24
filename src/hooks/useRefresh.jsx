import { useState } from "react";

const useRefresh = () => {
  const [refresh, setRefresh] = useState(1);
  const [orderRefresh, setOrderRefresh] = useState(1);
  const [clientRefresh, setClientRefresh] = useState(1);
  const [staffRefresh, setStaffRefresh] = useState(1);
  const [ticketRefresh, setTicketRefresh] = useState(1);
  const [packageRefresh, setPackageRefresh] = useState(1);

  return {
    refresh,
    setRefresh,
    orderRefresh,
    setOrderRefresh,
    clientRefresh,
    setClientRefresh,
    staffRefresh,
    setStaffRefresh,
    ticketRefresh,
    setTicketRefresh,
    packageRefresh, setPackageRefresh
  };
};

export default useRefresh;
