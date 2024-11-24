import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
    const [showSearch, setShowSearch] = useState(false);     
    const {getTotalCartAmount} = useContext(StoreContext);

    const handleSearchIconClick = () => {
      setShowSearch((prev) => !prev);          // toggle searchbox visibility
    }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => {setMenu("home")}} className={menu==="home"? "active": ""}>home</Link>
        <a href='#explore-menu' onClick={() => {setMenu("menu")}} className={menu==="menu"? "active": ""}>menu</a>
        <a href='#app-download' onClick={() => {setMenu("mobile-app")}} className={menu==="mobile-app"? "active": ""}>mobile-app</a>
        <a href='$footer' onClick={() => {setMenu("contact-us")}} className={menu==="contact-us"? "active": ""}>contact us</a>
      </ul>
      <div className="navbar-right">
       <div className={`search-wrapper ${showSearch ? "active" : ""}`}>
        <img className='search-food-icon' onClick={handleSearchIconClick} src={assets.search_icon} alt="" />
        {showSearch && (
          <input type='text' placeholder='Search for food items...' className='navbar-search-input' onChange={(e) => console.log(e.target.value)} />
        )}
       </div>
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar;
