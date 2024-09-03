"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import { Urbanist } from "next/font/google";



const urbanist = Urbanist({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
  });

const MenuList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElCategories, setAnchorElCategories] = useState(null);
  const openCategories = Boolean(anchorElCategories);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCategories = (event) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseCategories = () => {
    setAnchorElCategories(null);
  };

  return (
    
    <Box  className={urbanist.className}>
      <Button
        aria-controls={open ? "about-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
         <Typography className={urbanist.className} sx={{ color: "black", fontSize: "1.15rem" , textTransform: "none" }}>Sobre nosotros</Typography>
      </Button>
      <Menu
        id="about-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "about-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/about" passHref legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <Box p={2}>
                <Typography className={urbanist.className} variant="h6">IndumentaryBrix</Typography>
                <Typography className={urbanist.className} variant="body2">
                  Sumergete al apasionante mundo de la moda con nuestra web
                  IndumentaryBrix.
                </Typography>
              </Box>
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/shop" passHref legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography className={urbanist.className} >Tienda</Typography>
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/offers" passHref legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography className={urbanist.className} >Ofertas</Typography>
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/" passHref legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
            <Typography className={urbanist.className} >Accesorios</Typography>
            </a>
          </Link>
        </MenuItem>
      </Menu>

      <Button
        aria-controls={openCategories ? "category-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openCategories ? "true" : undefined}
        onClick={handleClickCategories}
      >
        <Typography className={urbanist.className} sx={{ color: "black", fontSize: "1.15rem" , textTransform:"none"}}>Categorias</Typography>

      </Button>
      <Menu
        id="category-menu"
        anchorEl={anchorElCategories}
        open={openCategories}
        onClose={handleCloseCategories}
        MenuListProps={{
          "aria-labelledby": "category-button",
        }}
      >
        <MenuItem onClick={handleCloseCategories}>
                <Link href="/categories" passHref legacyBehavior>
                    <a style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography className={urbanist.className} sx={{ color: "black", fontSize: "1.15rem" }}>Todas las Categorías</Typography>
                    </a>
                </Link>
        </MenuItem>

        {components.map((component) => (
          <MenuItem key={component.title} onClick={handleCloseCategories}>
            <Link href={component.href} passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Box>
                  <Typography className={urbanist.className} variant="body1">{component.title}</Typography>
                  <Typography className={urbanist.className} variant="body2">
                    {component.description}
                  </Typography>
                </Box>
              </a>
            </Link>
          </MenuItem>
        ))}
      </Menu>

      <Button  sx={{ textTransform: "none" }}>
        <Link href="/contact" passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
        <Typography className={urbanist.className} sx={{ color: "black", fontSize: "1.15rem" , textTransform:"none"}}>Contactos</Typography>
           
          </a>
        </Link>
      </Button>
      
    </Box>
  );
};

export default MenuList;

const components = [
  {
    title: "Remera",
    href: "/category/remeras",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Buzo",
    href: "/category/buzos",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Pantalon",
    href: "/category/pantalones",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];
