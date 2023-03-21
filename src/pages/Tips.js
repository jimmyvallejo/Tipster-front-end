import { useEffect, useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import Tip from "../components/Tip";

const Tips = () => {
  const { tips, getTips } = useContext(LoadingContext);

  useEffect(() => {
    if (!tips) {
      getTips();
    }
  }, []);

  return (
    <div>
      <div className="tips-container">
        {!tips ? (
          <h4>Loading...</h4>
        ) : (
          tips.map((tip) => {
            return <Tip key={tip._id} tip={tip} />;
          })
        )}
      </div>
    </div>
  );
};

export default Tips;
