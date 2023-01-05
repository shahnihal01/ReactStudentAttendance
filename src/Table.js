import './App.css';

const Table = ({students})=>{
    return (
        <div>
            <table className="stuTable">
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                </tr>
                {students.map((student,i)=>(
                    <tr key={student.id}>
                        <td>{student.stuName}</td>
                        <td>{student.roll}</td>
                        <td>{student.checkIn}</td>
                        <td>{student.checkOut}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;