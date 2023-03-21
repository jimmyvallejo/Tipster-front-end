import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import Tip from "../components/Tip";
import Comment from "../components/AddComment";
import AddTip from "../components/AddTip";
import WeatherApp from "../components/WeatherWidget";
import { mobileService } from "../services/mobileService";

const Home = ({ dimBackground, isBackgroundDimmed, setIsBackgroundDimmed }) => {
  const { tips, getTips, comment, authUser } = useContext(LoadingContext);

  const {
    originalTipsContext,
    filteredTipsContext,
    setOriginalTipsContext,
    setFilteredTipsContext,
  } = useContext(LoadingContext);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!tips) {
      getTips();
    }
  }, []);

  useEffect(() => {
    if (tips) {
      setOriginalTipsContext(tips);
      setFilteredTipsContext(tips);
    }
  }, [tips, comment]);

  const filterTipList = (category) => {
    if (category === "All") {
      setFilteredTipsContext(originalTipsContext);
    } else {
      const filtered = originalTipsContext.filter(
        (tip) => tip.category === category
      );
      setFilteredTipsContext(filtered);
    }
  };

  const searchTipList = filteredTipsContext
    ? filteredTipsContext.filter((tip) => {
        const searchText = tip.text.toLowerCase();
        const searchCategory = tip.category.toLowerCase();
        const searchQuery = query.toLowerCase();

        return (
          searchText.includes(searchQuery) ||
          searchCategory.includes(searchQuery)
        );
      })
    : [];

  return (
    <div className="home">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search tips..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {comment ? (
        <Comment
          commentOwner={comment.owner}
          commentText={comment.text}
          commentKey={comment._id}
          authUser={authUser}
          isBackgroundDimmed={isBackgroundDimmed}
          setIsBackgroundDimmed={setIsBackgroundDimmed}
          commentPicture={comment.ownerpicture}
        />
      ) : (
        <p></p>
      )}

      <h2 id="homeh2">Home</h2>
      {window.innerWidth < mobileService && <WeatherApp />}
      {authUser && <AddTip />}
      <div
        className={
          authUser && window.innerWidth < mobileService
            ? "smallMainButtons"
            : "mainButtons"
        }
      >
        <button
          className="mainbutton"
          onClick={() => {
            filterTipList("Food");
          }}
        >
          Dining
        </button>
        <button onClick={() => filterTipList("Traffic")}>Traffic</button>
        <button onClick={() => filterTipList("Entertainment")}>
          Entertainment
        </button>
        <button onClick={() => filterTipList("All")}>All</button>
      </div>

      <div className="countries-container">
       
            {searchTipList.map((tip) => {
              return (
                <Tip
                  key={tip._id}
                  tip={tip}
                  dimBackground={dimBackground}
                  setFilteredTips={setFilteredTipsContext}
                  setOriginalTips={setOriginalTipsContext}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Home;
