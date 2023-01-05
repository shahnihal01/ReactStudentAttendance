import { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';

function App() {
  const [students,setStudents] = useState(null);

  const [stuName,setStuName]=useState('');
  const [roll,setRoll] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [stuCount,setStuCount] = useState('');

  useEffect(()=>{
    const abortRel = new AbortController();

    setTimeout(()=>{
      fetch('http://localhost:8000/students')
      .then(res=>{
        return res.json();
      })
      .then((data)=>{
        setStudents(data);
      })
    },1000);
    return ()=> abortRel.abort();
  },[students]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const student={stuName, roll, checkIn, checkOut};
    console.log(student);

    fetch('http://localhost:8000/students',{
      method: 'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(student)
    }).then(()=>{
      console.log("new student info added");
    })
  }

  function countStu(){
    var today = new Date();
    const time = today.getHours() + ':' + today.getMinutes();
    var count = 0;
    students.forEach((student)=>{
      if(student.checkIn<time && student.checkOut>time){
        count+=1;
      }
    })
    setStuCount(count);
  }

  return (
    <div className="App">
      <h1>Student Attendance System</h1>
      <div>
        <form className='stuform' onSubmit={handleSubmit}>
          <label>Student Name: 
            <input 
              name="stuName" 
              value={stuName} 
              onChange={(e)=>setStuName(e.target.value)}
              type="text"
              required
            />
          </label><br/>
          <label>Student Roll Number: 
            <input 
              name="roll" 
              value={roll} 
              onChange={(e)=>setRoll(e.target.value)} 
              type="number"
              required
            />
          </label><br/>
          <label>Checkin Time: 
            <input
              type="time"
              name='checkIn'
              value={checkIn}
              onChange={(e)=>setCheckIn(e.target.value)}
              required
            />
          </label><br/>
          <label>CheckOut Time: 
            <input
              type="time"
              name='checkOut'
              value={checkOut}
              onChange={(e)=>setCheckOut(e.target.value)}
              required
            />
          </label><br/>
          <button type='submit'>Submit</button>
        </form>
      </div><br/><br/>
      <div>
        {students && <button onClick={countStu}>Check Number of students currently present in School</button>}
        <p>{stuCount}</p>
        {students && <Table students={students}/>}
      </div>
    </div>
  );
}

export default App;