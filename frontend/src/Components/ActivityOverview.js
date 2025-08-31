import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActivityOverview = () => {
  const activityData = [
    { name: 'Mon', users: 20, professionals: 10, requests: 15 },
    { name: 'Tue', users: 35, professionals: 18, requests: 25 },
    { name: 'Wed', users: 50, professionals: 25, requests: 40 },
    { name: 'Thu', users: 40, professionals: 22, requests: 35 },
    { name: 'Fri', users: 55, professionals: 30, requests: 45 },
    { name: 'Sat', users: 30, professionals: 15, requests: 20 },
    { name: 'Sun', users: 15, professionals: 8, requests: 10 },
  ];

  return (
    <div className="card mb-4" style={{ borderRadius: '15px', padding: '20px' }}>
      <h5 className="mb-4">Weekly Activity Overview</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#4e73df" strokeWidth={2} />
          <Line type="monotone" dataKey="professionals" stroke="#1cc88a" strokeWidth={2} />
          <Line type="monotone" dataKey="requests" stroke="#f6c23e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ActivityOverview;