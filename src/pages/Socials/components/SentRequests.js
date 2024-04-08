import CancelRequestBtn from './CancelRequestBtn';

const SentRequests = ({ sentRequests, onCancelRequest }) => {
  return (
    <div className="border-b-2 pt-4 pb-4">
      <h1 className="text-3xl font-bold mb-4">Sent Friend Requests:</h1>
      {sentRequests.map(request => (
        <div key={request.id} className='flex items-center justify-between ml-5'>
          <p>{request.friend_info.username}</p>
          <CancelRequestBtn friendId={request.friend_info.id} onCancelRequest={onCancelRequest} />
        </div>  
      ))}
    </div>
  );
};

export default SentRequests;
