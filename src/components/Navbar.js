import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";
import { loadStripe } from "@stripe/stripe-js";

const Navbar = () => {
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.REACT_APP_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
    }
    return stripePromise;
  };

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.REACT_APP_NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: `https://tipster-app.netlify.app/`,
      cancelUrl: `https://tipster-app.netlify.app/`,
      customerEmail: "test@test.com",
    });
    if (error) {
      console.warn(error.message);
    }
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const { authUser } = useContext(LoadingContext);

  const { logout } = useContext(AuthContext);

  const handlePost = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav className="nav">
      <div className="nav-links">
        <span className="logo">
          <img
            className="logoimg"
            src="https://cdn-icons-png.flaticon.com/512/9215/9215053.png"
          ></img>
          ipster
        </span>
        <Link to={"/"}>
          <img
            id="homeimg"
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
          ></img>
          <span id="home">Home</span>
        </Link>
        {authUser && (
          <Link id="premiumlink" onClick={handleCheckout}>
            <img
              id="premiumimg"
              src="https://cdn-icons-png.flaticon.com/512/4148/4148878.png"
            ></img>
            <span id="premiumtext">Premium</span>
          </Link>
        )}
        {getToken() ? (
          <>
            {authUser && (
              <Link to={`/users/profile/${authUser.username}`}>
                <img
                  id="profileimg"
                  alt="post"
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                ></img>
                <span id="profiletext">Profile</span>
              </Link>
            )}
            <Link className="postlink" to={"/"} onClick={handlePost}>
              <img
                id="postimg"
                alt="post"
                src="https://cdn-icons-png.flaticon.com/512/3573/3573196.png"
              ></img>
              <span id="posttxt">Post</span>
            </Link>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/signup"}>
              {" "}
              <img
                id="signupimg"
                alt="signup"
                src="https://cdn-icons-png.flaticon.com/512/748/748137.png"
              ></img>{" "}
              <span id="signuptxt">Signup</span>
            </Link>
            <Link className="loginlink" to={"/login"}>
              {" "}
              <img
                id="loginimg"
                alt="login"
                src="https://cdn-icons-png.flaticon.com/512/3580/3580168.png"
              ></img>
              <span id="logintxt">Login</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
