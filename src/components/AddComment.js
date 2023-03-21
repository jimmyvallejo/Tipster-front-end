import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { post } from "../services/authService";
import { LoadingContext } from "../context/loading.context";

const Comment = ({
  commentOwner,
  commentKey,
  commentText,
  authUser,
  setIsBackgroundDimmed,
  commentPicture,
}) => {
  const { setComment, getTips } = useContext(LoadingContext);

  const [newComment, newSetComment] = useState({
    ownerpicture: authUser.image,
    owner: authUser.username,
    text: "",
    likes: 0,
    id: commentKey,
    picture: "",
  });

  const handleExit = () => {
    setIsBackgroundDimmed(false);
    setComment(null);
  };

  const handleChange = (e) => {
    newSetComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/tips/add-comment", newComment)
      .then((results) => {
        setIsBackgroundDimmed(false);
        setComment(null);
        getTips();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="commentContainer">
      <div className="commentbox" key={commentKey}>
        <div className="tipImgName">
          <div className="tipImgBox">
            <img className="profilepic" alt="profilepic" src={commentPicture} />
          </div>
          <p className="commentOwner">{commentOwner}</p>
          <h3 className="exitComment">
            <Link className="handleExit" onClick={handleExit}>
              Exit
            </Link>
          </h3>
        </div>
        <p className="tipText">{commentText}</p>
        <p className="replying">Replying to @{commentOwner}</p>
        <div className="tipImgName">
          <div className="tipImgBox commentImgBox">
            <img className="profilepic" alt="profilepic" src={authUser.image} />
          </div>
          <form>
            <input
              className="commentText"
              type="text"
              name="text"
              onChange={handleChange}
              value={newComment.text}
              placeholder="Sharing is caring!"
            />
            <button id="commentButton" onClick={handleSubmit} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;
