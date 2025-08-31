import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EarningsOverview = () => {
  const earningsData = [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 },
    { name: 'Apr', earnings: 2780 },
    { name: 'May', earnings: 5890 },
    { name: 'Jun', earnings: 4390 },
    { name: 'Jul', earnings: 6000 },
  ];

  return (
    <div className="card mb-4" style={{ borderRadius: '15px', padding: '20px' }}>
      <h5 className="mb-4">Monthly Earnings Overview</h5>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={earningsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="earnings" stroke="#4e73df" fill="#e0e6ff" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default EarningsOverview;