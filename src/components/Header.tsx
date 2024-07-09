import { useNavigate } from "react-router-dom";
import { AppBar, Grid, Typography } from "@mui/material";
import { headerBackgroundColor } from "../utils/constants";


const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar
            style={{
                backgroundColor: headerBackgroundColor,
                marginBottom: 70 + 50
            }}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="center"
            >
                <Grid
                    container
                    alignItems="center"
                    lg={10}
                    xs={11}
                    style={{
                        cursor: "pointer",
                        height: 70
                    }}
                    onClick={() => navigate("/")}
                >
                    {/* <img src={Logo} alt="App logo" style={{ display: "contain", padding: "10px 30px 10px 0px", height: 50 }} /> */}
                    <Typography
                        color="black"
                        fontWeight="bold"
                    >
                        Oompa Loompa's Crew
                    </Typography>
                </Grid>
            </Grid>
        </AppBar>
    )
};

export default Header;
