import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './category.scss';
import { Link } from 'react-router-dom';

const Category = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryName = searchParams.get('name');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/v1/news?category=${categoryName}`)
      .then(response => {
        setArticles(response.data.data);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, [categoryName]);

  return (
    <div className='category-container'>
      <div className='category-info'>
        <h1 className='category-title'>Category: {categoryName}</h1>
      </div>
      <div className='row'>
        {articles.map(article => (
          <div className='col-md-4' key={article.id}>
            <Card
              id={article.id}
              image={article.photo}
              title={article.news_title}
              content={article.news_body}
              author={article.source}
              category={article.news_class}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Card = (props) => (
  <div className='category-card'>
    <div className='category-card__body'>
      <img className='category-card__image' src={props.image} alt={props.title} />
      <h2 className='category-card__title'>{props.title}</h2>
      <div className='category-card__authandcat'>
        <div className='category-card__author'>{props.author}</div>
        <div className='category-card__category'>{props.category}</div>
      </div>
      <p className='category-card__content'>{props.content}</p>
    </div>
    <Link to={`/post/${props.id}`} className='category-card__btn'>Read More</Link>
  </div>
);

export default Category;
