import React from "react";
import { Typography } from "@mui/material";


function BGLogo() {
    return (<Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
        }}
    >
        BGPooling
    </Typography>);
}

export default BGLogo;