import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";

const useAllStaff = () => {
  const { staffRefresh } = useRefresh();
  const [allStaff, setAllStaff] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/client/all/staff`)
      .then((res) => res.json())
      .then((data) => {
        setAllStaff(data?.staff || []); // Set all staff data
      });
  }, [staffRefresh]);

  return { allStaff };
};

export default useAllStaff;
