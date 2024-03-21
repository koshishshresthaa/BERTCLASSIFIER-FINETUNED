import React, { useState } from 'react';
import './newwrite.scss'; // Make sure to import your CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewWrite = () => {
  
  window.scrollTo(0, 0);
  const [article, setArticle] = useState({
    news_title: "",
    source: "",
    photo: null,
    news_body: ""
  });
  const [loading, setLoading] = useState(false); // State to track loading status

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setArticle((prev) => ({ ...prev, photo: e.target.files[0] }));
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when classification starts
    try {
      const formData = new FormData();
      formData.append('news_title', article.news_title);
      formData.append('source', article.source);
      formData.append('news_body', article.news_body);
      formData.append('photo', article.photo);

       const response = await axios({
        method: "post",
        url: "http://localhost:3001/v1/news",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })

      const categoryName = response.data.data.news_class;


      if (response.status === 200) {
        navigate(`/category?name=${categoryName}`);
      } 
      else if (response.status === 400){
        console.log(response.data.message)
      }
      else {
        console.log("Unexpected status code:", response.status);
        // Handle unexpected status code here
      }
    } catch (err) {
      //alert("Only Nepali language is allowed!")
      console.error("Error:", err);
      
      
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false after classification completes
    }
  };

  return (
    <div className='write-form-wrapper'>
   
      <div className='write-form'>
        {/* Display loading screen if loading is true */}
        {loading ? (
          <div className="loading-screen">
          <p>Loading...</p>
        </div>
        ) : (
          <>
            
              <div className='classify-your-article'>
               
                </div>
              <div className='inputtitle'>
                <input
                  type='text'
                  placeholder='Title'
                  onChange={handleChange}
                  name='news_title'
                  value={article.news_title}
                />
              </div>
              <div className='inputauthor'>
                <input
                  type='text'
                  placeholder='Author'
                  onChange={handleChange}
                  name='source'
                  value={article.source}
                />
              </div>
            
            
            <div className='news-article'>
             
                <textarea
                  placeholder="Enter your news article"
                  onChange={handleChange}
                  name='news_body'
                  value={article.news_body}
                  required
                ></textarea>
            </div>
            <div className='image-and-button'>
              <div className='inputimage'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  name='photo'
                />
              </div>
              <div className='classify-button'>
                <button className='button-27' onClick={handleClick}>
                  Classify
                </button>
                </div>
            </div>
            
          </>
        )}
      </div>
      </div>
  );
};

export default NewWrite;


        