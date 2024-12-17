import { useState } from "react";

const useRefresh = () => {
  const [refresh, setRefresh] = useState(1);
  const [orderRefresh, setOrderRefresh] = useState(1);

  return { refresh, setRefresh, orderRefresh, setOrderRefresh };
};

export default useRefresh;
