import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useClientId = () => {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem("bob-corn-client-id");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("bob-corn-client-id", id);
    }
    setClientId(id);
  }, []);

  return clientId;
};

export default useClientId;
