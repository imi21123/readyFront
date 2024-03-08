import { useEffect, useState } from "react";
import commonApis from "../utils/commonApis";

const apiUrl = `/order/history/fast`;

const useFetchQuickOrder = () => {
  const [quickOrder, setQuickOrder] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await commonApis.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          });
          setQuickOrder(response.data.receipts?.reverse());
        } catch (error) {
          console.error("Error fetching quick order data:", error);
        }
      } else {
        // isAuth가 false일 때 quickOrder 상태를 초기화합니다.
        console.log('fetching quick order is diabled');
        setQuickOrder([]);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return quickOrder;
};

export default useFetchQuickOrder;
