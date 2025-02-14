import React, { useContext } from 'react'
import logo from "../../assets/cart.png"
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,

} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';




export default function Navbar() {
    const { IsLoggedIn, setIsLoggedIn } = useContext(authContext)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate()
    const { userName } = useContext(authContext)

    function logout() {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/login")
    }

    const menuItems = [
        "Home",
        "Categories",
        "Brands"


    ];



    return (
        <NextUINavbar onMenuOpenChange={setIsMenuOpen} className='shadow-md'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <Link to="/">   <NavbarBrand>

                    <div className='flex items-center gap-3 text-2xl '>
                        <img src={logo} alt="" className='w-24 filter drop-shadow-lg shadow-fuchsia-100' />
                        <p className="font-extrabold text-[#ED3ECC] -mx-8">FreshCart</p>
                    </div>
                </NavbarBrand></Link>
            </NavbarContent>

            {IsLoggedIn && <NavbarContent className="hidden sm:flex gap-4" justify="center">

                {menuItems.map((item, index) => (
                    <NavbarItem key={index} >
                        <Link className='text-violet-900 font-medium hover:text-violet-700' to={item === menuItems[0] ? "/" : "/" + item}>
                            {item}
                        </Link>
                    </NavbarItem>

                ))}

            </NavbarContent>}
            {IsLoggedIn || <NavbarContent justify="end">
                <NavbarItem  >
                    <Link to="/login">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/register">Register</Link>
                </NavbarItem>
            </NavbarContent>}

            {IsLoggedIn && <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className='text-violet-900 font-medium hover:text-violet-700'
                            color={
                                "red"
                            }
                            to={item === menuItems[0] ? "/" : "/" + item}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>}
            {IsLoggedIn &&
                <NavbarContent as="div" justify="end" className='gap-5 items-center' >


                    <Dropdown placement="bottom-end"  >
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform text-white "
                                color="info"
                                name=""
                                size="sm"
                                src=""
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat" >
                            <DropdownItem key="profile" className=" gap-2 cursor-default" color='transparent' textValue='welcome'>

                                <p className="font-semibold text-lg">Welcome, {userName?.replace(userName[0], userName[0]?.toUpperCase())}</p>
                            </DropdownItem>
                            <DropdownItem key="cart" textValue='cart' ><Link to="/cart">Cart</Link></DropdownItem>
                            <DropdownItem key="orders" textValue='orders' ><Link to="/allorders">Orders</Link></DropdownItem>
                            <DropdownItem key="wishlist" textValue='wishlist'><Link to="/wishlist">Wishlist</Link></DropdownItem>
                            <DropdownItem key="logout" color='transparent' textValue='logout'>
                                <Button onPress={logout} className='w-full text-[#f72585] border-[#f72585]' variant='bordered'>Logout</Button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>


            }

        </NextUINavbar>
    );
}

