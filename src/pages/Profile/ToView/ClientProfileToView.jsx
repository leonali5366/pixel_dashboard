import { useParams } from "react-router-dom";

const ClientProfileToView = () => {
    const {email} = useParams()
    return (
        <div>
            <h1>{email}</h1>
        </div>
    );
};

export default ClientProfileToView;