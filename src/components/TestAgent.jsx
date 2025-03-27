import Table from './Table';

const TestAgent = () => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button onClick={() => alert(`Editing ${row.name}`)}>Edit</button>
      ),
    },
  ];

  const data = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  return (
    <div>
      <h1>Reusable Table Example</h1>
      <Table columns={columns} data={data} pageSize={5} />
    </div>
  );
};

export default TestAgent;
