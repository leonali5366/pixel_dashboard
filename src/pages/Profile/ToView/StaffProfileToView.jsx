import { useParams } from 'react-router-dom';

const StaffProfileToView = () => {
    const {email} = useParams()
    return (
        <div>
            <h1>{email}</h1>
        </div>
    );
};

export default StaffProfileToView;