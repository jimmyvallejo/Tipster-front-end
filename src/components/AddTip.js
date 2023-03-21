import { useContext, useState } from "react";
import { LoadingContext } from "../context/loading.context";
import { post } from "../services/authService";

const AddTip = () => {
  const { authUser } = useContext(LoadingContext);

  const { getTips } = useContext(LoadingContext);

  const [newTip, newSetTip] = useState({
    owner: authUser.username,
    text: "",
    category: "Food",
    ownerId: authUser._id,
    ownerpicture: authUser.image,
    picture: "",
    location: "",
  });

  const handleFileSubmit = (e) => {
    let fileUpload = new FormData();
    fileUpload.append("picture", e.target.files[0]);
    post("/tips/add-picture", fileUpload)
      .then((result) => {
        newSetTip((recent) => ({ ...recent, picture: result.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    newSetTip((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocation = (e) => {
    const { name, value } = e.target;
    newSetTip((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/tips/add-tip", newTip)
      .then((results) => {
        getTips();
        newSetTip({
          ...newTip,
          category: "food",
          location: "",
          text: "",
          picture: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="tipImgName tipForm">
      <div className="tipImgBox">
        <img className="profilepic whoIsPosting" src={authUser.image} />
      </div>
      <form encType="multipart/form-data">
        <div>
          <label id="locationLabel" for="category">
            Location:{" "}
          </label>
          <input
            className="locationInput"
            type="text"
            name="location"
            onChange={handleLocation}
            value={newTip.location}
            placeholder="Location/City/State"
          />
        </div>
        <input
          className="commentInput"
          type="text"
          name="text"
          onChange={handleChange}
          value={newTip.text}
          placeholder="Enter tip here!"
          required
        />

        <label id="label" for="category">
          Category:{" "}
        </label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={newTip.category}
        >
          <option value="Food">Food</option>
          <option value="Traffic">Traffic</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button className="addButton" onClick={handleSubmit} type="submit">
          Submit
        </button>

        <div className="addPic">
          <input
            type="file"
            id="tipSubmitImg"
            name="picture"
            onChange={handleFileSubmit}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddTip;
