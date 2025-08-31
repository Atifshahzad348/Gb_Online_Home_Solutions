import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ServiceRequestsBreakdown = () => {
  const serviceData = [
    { name: 'Plumbing', value: 35 },
    { name: 'Electrical', value: 25 },
    { name: 'Cleaning', value: 20 },
    { name: 'Carpentry', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#4e73df', '#1cc88a', '#f6c23e', '#e74a3b', '#858796'];

  return (
    <div className="card mb-4" style={{ borderRadius: '15px', padding: '20px' }}>
      <h5 className="mb-4">Service Requests Breakdown</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={serviceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {serviceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServiceRequestsBreakdown ;