import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export  const AdminUpdatedata = () => {
    const { id } = useParams();  // Get the id from the URL
    
    const [data,setData] =useState({
      dataname: '',
      email: '',
       phone: '',
     })
     const navigate = useNavigate();

    const handleInput = (e) => {
      let name=e.target.name;
      let value=e.target.value;
      
      setData({
       ...data,
        [name]: value,
      })
     }
    
    const { authorizationToken } = useAuth();
    const {user} =useAuth();
    
  
    // Fetch data data by ID
    const fetchdata = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/admin/users/${id}`, {
          headers: {
           
            Authorization: authorizationToken,
          },
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log("Error fetching data data:", error);
      }
    };
  
    useEffect(() => {
      fetchdata();  // Fetch data when component mounts
    }, []);
  
   
    
        //To update the data dynamically
     const handleSubmit = async (e) => {
        e.preventDefault();
       try {
        const response= await fetch(`http://localhost:5001/api/admin/users/update/${id}`,{
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
                Authorization: authorizationToken,
            },
            body: JSON.stringify(data),
            
        }
        
    )
    if (response.ok){
      const updateddata = await response.json();
      setData(updateddata);  
      toast.success("Updated Succesfully")
      
      navigate(`/admin/users`);  // Redirect to datas page after success
    }
    console.log("Upadated data:",data);
    
    
       } catch (error) {
        console.log("Error from Handle submit in Update data: ",error);
        
       }

       
      };
  
    return (
      <div className="container">
        <h2 className="text-3xl">Edit data: {data.username}</h2>
        {/* Display data info here for editing */}
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name='username'
              value={data.username || '' }
              onChange={handleInput}
              className='text-black'
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name='email'
              value={data.email || ''}
              onChange={handleInput}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name='phone'
              value={data.phone || ''}
              onChange={handleInput}
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
        </form>
      </div>
    );
  }

