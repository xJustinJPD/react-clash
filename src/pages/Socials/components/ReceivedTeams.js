import { AcceptTeamBtn, RejectTeamBtn } from './AcceptRejectTeamButton';

const ReceivedTeams = ({ teams, fetchReceivedTeams }) => {
  return (
    <div className="border-b-2 pb-4">
      <h1 className="text-3xl font-bold mb-4">Received Team Requests:</h1>
      {teams.map(teamRequest => (
        <div key={teamRequest.id} className="flex items-center justify-between">
          <p className="mr-4">{teamRequest.name}</p>
          <div>
            <AcceptTeamBtn teamId={teamRequest.id} onSuccess={fetchReceivedTeams} />
            <RejectTeamBtn teamId={teamRequest.id} onSuccess={fetchReceivedTeams} /> 
          </div>
          {console.log('Team ID:', teamRequest.id )}
        </div>
      ))}
    </div>
  );
};

export default ReceivedTeams;
