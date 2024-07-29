import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import { fetchPostAction } from '../Redux/Actions';

const ListPostCard = () => {
  const postList = useSelector((state) => state.posts.postList);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value} = event.target
    setFormData({...formData, [name]: value});
  }

  /**
   * <input name="nameDelInput" value={formData.dificultad}
   *
   * 
   * 
   */

  useEffect(() => {
    dispatch(fetchPostAction())
    console.log(postList) //En este caso como lo que estoy haciendo es mostrar la data cuando CARGO la pagina. hago el dispatch en useEffect, pero sino lo haria en onClick o algo asi. 
  }, [dispatch]);

  return (
    <>
      <h1>Mis Publicaciones Bellas</h1>
      <div>
        {postList.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} id={post.id} />
        ))}
      </div>
    </>
  );
};

export default ListPostCard;
