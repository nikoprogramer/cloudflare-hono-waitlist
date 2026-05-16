import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  return (
    <div>
      <h1 className="text-center text-lg">Server Status:</h1>
      <p className="text-center text-green-600">{status}</p>
    </div>
  );
};
