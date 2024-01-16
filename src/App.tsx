
import React from 'react';
import './App.css';
import ChipInput from './components/chipInput';

const App: React.FC = () => {
  const items = [
    { name: 'Aarav Sharma', email: 'aarav@gmail.com' },
    { name: 'Nidhi Patel', email: 'nidhi@gmail.com' },
    { name: 'Arjun Singh', email: 'arjun@gmail.com' },
    { name: 'Meera Reddy', email: 'meera@gmail.com' },
    { name: 'Advait Joshi', email: 'advait@gmail.com' },
    { name: 'Aisha Verma', email: 'aisha@gmail.com' },
    { name: 'Rohan Kumar', email: 'rohan@gmail.com' },
    { name: 'Kavya Desai', email: 'kavya@gmail.com' },
    { name: 'Dev Patel', email: 'dev@gmail.com' },
    { name: 'Riya Kapoor', email: 'riya@gmail.com' },
    { name: 'Aryan Khanna', email: 'aryan@gmail.com' },
    { name: 'Ananya Singh', email: 'ananya@gmail.com' },
    { name: 'Rohit Gupta', email: 'rohit@gmail.com' },
    { name: 'Naina Sharma', email: 'naina@gmail.com' },
    { name: 'Kabir Malhota', email: 'kabir@gmail.com' },
    { name: 'Ishita Das', email: 'ishita@gmail.com' },
    { name: 'Arnav Yadav', email: 'arnav@gmail.com' },
    { name: 'Gurpreet Singh', email: 'guppy123@gmail.com' },
    { name: 'Varun Mehra', email: 'varun@gmail.com' },
    { name: 'Sanya Arora', email: 'sanya@gmail.com' }
  ];

  return (
    <div className='center'>
      <h1>Pick Users</h1>
      <ChipInput items={items} />
    </div>
  );
};

export default App;
