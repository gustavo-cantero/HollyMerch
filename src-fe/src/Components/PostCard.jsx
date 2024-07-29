const PostCard = ({ title, body, id }) => {
  return (
    <>
      <h4>{id}</h4>
      <h3>{title}</h3>
      <p>{body}</p>
    </>
  );
};

export default PostCard;
