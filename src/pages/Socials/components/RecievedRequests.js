import { AcceptRequestBtn, RejectRequestBtn } from './AcceptRejectButtons';

const ReceivedRequests = ({ receivedRequests, fetchReceivedRequests }) => {
  return (
    <div className="border-b-2 pb-4">
      <h1 className="text-3xl font-bold mb-4">Received Friend Requests:</h1>
      {receivedRequests.map(request => (
        <div key={request.id} className="flex items-center justify-between">
          <p className="mr-4">{request.friend.username}</p>
          <div>
            <AcceptRequestBtn requestId={request.id} onSuccess={fetchReceivedRequests} />
            <RejectRequestBtn requestId={request.id} onSuccess={fetchReceivedRequests} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceivedRequests;
