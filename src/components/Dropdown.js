import { useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dropdown=({name})=>{
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.userState);


    const toggleDropdown = () => setShow(prevShow => !prevShow);

    const items = [
        {
            id:1,
            label:'Profile',
            link : '/profile'
        },
        {
          id:2,
          label:user.roles[0].name === 'ADMIN' && 'Admin DashBoard',
          link: user.roles[0].name === 'ADMIN' && '/admin'
        },
        {
            id:3,
            label:'LogOut',
            link : ''
        }
    ];

    const handleItemClick = (item) => {
      if(item.label==='LogOut'){
        localStorage.removeItem("cart");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem('email');
        navigate("/");
        window.location.reload();
        return;
      }
        setShow(false);// Close the dropdown after selecting an item
        navigate(item.link);
      };
    
      // Close dropdown when clicking outside
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShow(false);
        }
      };

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
  
    return (
        <DropdownContainer ref={dropdownRef}>
          <DropdownButton onClick={toggleDropdown}>
          <FaUserAlt /> {name} <IoIosArrowDropdownCircle />
          </DropdownButton>
          <DropdownContent show={show}>
            {items.map((item, index) => (
              <DropdownItem key={index} onClick={() => handleItemClick(item)}>
                  {item.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownContainer>
    );
  };

// Styled components
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right:2rem;
`;

const DropdownButton = styled.button`
  background-color: #f2837c;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const DropdownContent = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
`;

const DropdownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  
  &:hover {
    background-color: #f1f1f1;
  }
`;


export default Dropdown;

