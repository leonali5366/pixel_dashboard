import { useParams } from "react-router-dom";

const ClientOrderSinglePage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default ClientOrderSinglePage;
