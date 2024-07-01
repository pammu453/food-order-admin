import React, { useState } from 'react';
import "./Add.css";
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = () => {
  const [productDetail, setProductDetail] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: '',
    image: ''
  });

  const [image, setImage] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productDetail.name);
    formData.append('description', productDetail.description);
    formData.append('category', productDetail.category);
    formData.append('price', Number(productDetail.price));
    formData.append('image', productDetail.image);

    try {
      const { data } = await axios.post(`${BASE_URL}/food/addFoodItem`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (data.success) {
        setProductDetail({
          name: '',
          description: '',
          category: 'Salad',
          price: '',
          image: ''
        })
        setImage(null);
        toast.success(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  };

  return (
    <div className='add'>
      <form onSubmit={handleSubmit}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className='upload-image'
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload area"
            />
            <input
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setProductDetail({ ...productDetail, image: file });
              }}
              type="file"
              id="image"
              name='image'
              accept="image/*"
              hidden
              required
            />
          </label>
        </div>
        <div className="add-product-name">
          <p>Product Name</p>
          <input
            value={productDetail.name}
            type="text"
            required
            onChange={(event) => setProductDetail({ ...productDetail, name: event.target.value })}
            placeholder='Type here'
          />
        </div>
        <div className="add-product-description">
          <p>Product Description</p>
          <textarea
            type="text"
            required
            rows={6}
            cols={2}
            value={productDetail.description}
            onChange={(event) => setProductDetail({ ...productDetail, description: event.target.value })}
            placeholder='Write content here'
          />
        </div>
        <div className="add-product-category">
          <p>Select Category</p>
          <select
            required
            value={productDetail.category}
            onChange={(event) => setProductDetail({ ...productDetail, category: event.target.value })}
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="add-product-price">
          <p>Product Price</p>
          <input
            value={productDetail.price}
            onChange={(event) => setProductDetail({ ...productDetail, price: event.target.value })}
            type="number"
            required
            placeholder='Rs 25/-'
            min={10}
            max={1000}
          />
        </div>
        <button type='submit' className='add-button'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
