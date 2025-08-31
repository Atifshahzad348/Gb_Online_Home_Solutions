const RecentActivity = () => {
  const activities = [
    { id: 1, user: 'John Doe', action: 'Requested plumbing service', time: '2 hours ago', status: 'Pending' },
    { id: 2, user: 'Jane Smith', action: 'Completed electrical service', time: '5 hours ago', status: 'Completed' },
    { id: 3, user: 'Mike Johnson', action: 'Cancelled cleaning service', time: '1 day ago', status: 'Cancelled' },
    { id: 4, user: 'Sarah Williams', action: 'Paid for carpentry service', time: '2 days ago', status: 'Completed' },
    { id: 5, user: 'David Brown', action: 'Requested emergency service', time: '3 days ago', status: 'In Progress' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      case 'In Progress': return 'primary';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="card" style={{ borderRadius: '15px', padding: '20px' }}>
      <h5 className="mb-4">Recent Activity</h5>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.user}</td>
                <td>{activity.action}</td>
                <td>{activity.time}</td>
                <td>
                  <span className={`badge bg-${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity ;