import { Grid, TextField, Divider, InputAdornment } from "@mui/material";
import Search from "../assets/search.png";

const SearchComponent = ({search, setSearch} : {search: string, setSearch: any}) => {
    return (
        <Grid>
            <TextField
                label="Search"
                variant="outlined"
                InputProps={{
                    style: {
                        borderRadius: "10px",
                    },
                    endAdornment: (
                        <InputAdornment position="start">
                            <Divider sx={{ height: 28, m: 0.5, color: "grey" }} orientation="vertical" />
                            <img src={Search} alt="Search icon" style={{ display: "contain", height: 20, paddingLeft: 14 }} />
                        </InputAdornment>
                    )
                }}
                style={{
                    borderRadius: 50
                }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
        </Grid >
    )
};

export default SearchComponent;