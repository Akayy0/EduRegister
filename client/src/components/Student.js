import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Paper, Container } from '@mui/material';

export default function Student() {

    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const [students, setStudents] = useState([])

    const handleClick = async (e) => {
        e.preventDefault();
        const student = { name, address };

        try {
            const response = await fetch("http://localhost:8080/student/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            });
            if (!response.ok) {
                throw new Error('Failed to add new student');
            }
            console.log("New Student added");
            window.location.reload();
        } catch (error) {
            console.error('Error adding new student:', error);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/student/getAll");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setStudents(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Student Name" variant="outlined" sx={{ m: 1, width: '25ch' }} value={name} onChange={(e) => setName(e.target.value)} />
                <TextField id="outlined-basic" label="Student Adress" variant="outlined" sx={{ m: 1, width: '25ch' }} value={address} onChange={(e) => setAddress(e.target.value)} />
                <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleClick}>Submit</Button>
            </form>
            <h1>Students</h1>

            <Paper elevation={3} style={paperStyle}>

                {students.map(student => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                        Name:{student.name}<br />
                        Address:{student.address}

                    </Paper>
                ))
                }

            </Paper>
        </Container>



    );
}