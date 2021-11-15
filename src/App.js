import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css";
import Select from 'react-select'

const customStyles = {
  container: provided => ({
    ...provided,
    width: 190,
    color: 'black'
  })
};

function App() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState()
    const [id, setId] = useState()
    const [hari, setHari] = useState()
    const [olahraga1, setOlahraga1] = useState()
    const [olahraga2, setOlahraga2] = useState()
    const [olahraga3, setOlahraga3] = useState()
    const [olahraga4, setOlahraga4] = useState()


      
    const addData = async () => {
      const response = await axios.post("http://localhost:8080/", 
        {
          id : id,
          hari : hari,
          olahraga1 : olahraga1,
          olahraga2 : olahraga2,
          olahraga3 : olahraga3,
          olahraga4 : olahraga4})
        .then (window.location = "http://localhost:3000/")
      }
      const updateData = async () => {
        const response = await axios.put("http://localhost:8080/", 
          {
            id : id,
            hari : hari,
            olahraga1 : olahraga1,
            olahraga2 : olahraga2,
            olahraga3 : olahraga3,
            olahraga4 : olahraga4})
            .then (window.location = "http://localhost:3000/")
        }
      const deleteData = async (id) => {

      await axios.delete(`http://localhost:8080/${id}`)
      .then(alert(`Successfully deleting id = ${id}`))
      .then (window.location = "http://localhost:3000/")
      }

        useEffect(() => {
          const getAllData = async() => {
            const response = await axios.get("http://localhost:8080/")
            console.log(response.data);
            setData(response.data)
            setLoading(false)
          }
          getAllData();
        }, [])
          
    
        if(loading === true) return null;
        
     
  return (
    <>
      <div className="main">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"/>
      <center>
      <h1>WORKOUT DEDDY KOKGITU?</h1>
      <div>
      
 <div className="form-row">
      <form>
            <label> Id</label>
            <br></br>
            <input type="text"
              onChange={(e) => setId(e.target.value)}/><br></br>
            <label> Hari</label>
            <br></br>
            <input type="text"
              onChange={(e) => setHari(e.target.value)}/><br></br>
            <label> pemanasan</label>
            <br></br>
            <input type="text"
              onChange={(e) => setOlahraga1(e.target.value)}/><br></br> 
            <label> olahraga</label>
            <br></br>
            <input type="text"
              onChange={(e) => setOlahraga2(e.target.value)}/><br></br> 
            <label> olahraga</label>
            <br></br>
            <input type="text"  onChange={(e) => setOlahraga3(e.target.value)} /><br></br>
            <label> peregangan</label>
            <br></br>
            <input type="text"  onChange={(e) => setOlahraga4(e.target.value)} /><br></br>
            
      </form>
  </div>
      
      <button className="add" type="button" onClick={() => addData()}>Add</button>
    
      
    
      
      
      </div>
      </center>
      <div>
        <table className="table">
          
        <thead>
          <tr>
            <th>Hari</th>
            <th>Step 1</th>
            <th>Step 2</th>
            <th>Step 3</th>
            <th>Step 4</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
                  return(
                    <>
                    <tr>
                    <td>{data.hari}</td>
                    <td>{data.olahraga1}</td>
                    <td>{data.olahraga2}</td>
                    <td>{data.olahraga3}</td>
                    <td>{data.olahraga4}</td>
                    <td><button  onClick={() => deleteData(data.id)}>delete</button> <button  onClick={() => updateData(data.id)}>Edit</button></td>
                   
                    </tr>
                    </>
                  )
                })}
        </tbody>
        </table>
      </div>
      </div>
    </> 
  );
}

export default App;
