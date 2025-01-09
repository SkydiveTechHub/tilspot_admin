import { useNavigate } from "react-router-dom";

export const useRefresh = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(`${window.location.pathname}`, { replace: true });
  };

  return handleRefresh;
};
