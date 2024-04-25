import CancelRequest from './CancelRequestBtn';
const SentRequestCard = ({user, teamId, onCanceled}) => {

	return (
        <>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.username} </h2>
                    <b>ID: </b><p>{user.id}</p> 
                    <div className="card-actions justify-end">
                    <CancelRequest userId={user.id} teamId={teamId} onCanceled={onCanceled} />
                    </div>
            </div>
            </div>
        </>
        )
};

export default SentRequestCard;