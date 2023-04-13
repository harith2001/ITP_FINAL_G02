import React, { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import FileSaver from 'file-saver';

const Home = () => {

  const [getstockdata, setStockdata] = useState([]);
  console.log(getstockdata);

//Get Stock Data Fucntion 
  const getpdata = async(e)=>{

    const res = await fetch("/getdata", {
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status ===422|| !data){
      console.log("error");
    }else{
      setStockdata(data)
      console.log("get data ");
    }
  } 

  useEffect(()=>{
    getpdata();
  },[])

//Detele Stock Fucntion

  const deletestock =async (id)=>{
    const res2 = await fetch(`/deletestock/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const deletedata = await res2.json();
    console.log(deletedata);

    if(res2.status===422||!deletedata){
      console.log("error");
    }else{
      alert("Stock Data Deleted");
      console.log("stock deleted ");
      getpdata();
    }
  }

//PDF Genarate

const handleDownloadClick =() => {
  fetch('/generate-pdf')
  .then (response => response.blob())
  .then (blob => {
    FileSaver.saveAs(blob,'example.pdf');
  });
};

//Low Stock Notification

const Low_Stock = 100;

const checkStock = async()=>{
  const Stock = await Stock.find();

  Stock.forEach(getstockdata =>{
    if (getstockdata.Medicine_NO <Low_Stock){
      alert(`Low Stock Alert : ${getstockdata.Medicine_ID} has only ${getstockdata.Medicine_NO} units remaining !`);
    }
  });
}

setInterval(checkStock,3600000);

return (
    
  <div className ="home">

<table className="table">
  <thead>
    <tr className ="table-dark">
      <th scope="col">NO</th>
      <th scope="col">Medicine ID</th>
      <th scope="col">Medicine Name</th>
      <th scope="col">Number of Medicine</th>
      <th scope="col">Expire Date</th>
      <th scope="col">Purchased Date</th>
    </tr>
  </thead>
  <tbody>
    {
      getstockdata.map((element,id)=>{
        const date1 = element.Expire_Date.split("T")[0];
        const date2 = element.Purchased_Date.split("T")[0];
        return(
          <>
              <tr>
      <th scope="row">{id+1}</th>
      <td>{element.Medicine_ID}</td>
      <td><NavLink to ={`view/${element._id}`}>{element.Name}</NavLink></td>
      <td>{element.Medicine_NO}</td>
      <td>{date1}</td>
      <td>{date2}</td>
    </tr>
          </>
        )
      })
    }
  </tbody>
</table>
<div className='PDF'>
<button onClick={handleDownloadClick}>Genarate Report</button></div>

  </div>);
};

export default Home;
