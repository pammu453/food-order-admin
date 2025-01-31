import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {

  const [food_list, setFoodList] = useState([])

  const getFoodList = async () => {
    try {
      const res = await axios.get(`/api/food/getAllFoodItems`);
      setFoodList(res.data.foodItems);
    } catch (error) {
      console.error('Error fetching food items:', error);
      toast.error('Failed to fetch food items');
    }
  };

  useEffect(() => {
    getFoodList();
  }, []);

  const deleteFoodItem = async (id) => {
    try {
      const { data } = await axios.delete(`/api/food/deleteFood/${id}`);
      toast.success(data.message);
      getFoodList(); // Refresh the food list after deleting
    } catch (error) {
      console.error('Error deleting food item:', error);
      toast.error('Failed to delete food item');
    }
  };


  return (
    <div className='list'>
      <div className="list-title">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      <hr />
      <div className="list-items">
        {
          food_list.map((item, index) => (
            <div className="list-item" key={index}>
              <img src={`/api/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <button onClick={() => deleteFoodItem(item._id)}>X</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List
