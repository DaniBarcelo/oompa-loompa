import Header from "../../components/Header"
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { selectOompaLoompaById } from "../../redux/oompaLoompaSlice";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";


export default function DetailView() {

    const { id } = useParams();
    const navigate = useNavigate();

    const oompaLoompa = useSelector((state: RootState) => id !== undefined ? selectOompaLoompaById(id)(state) : null);

    useEffect(() => {
        if (!oompaLoompa) {
            navigate('/')
        }
    })

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <Header />
            {oompaLoompa &&
                <Grid
                    container
                    alignSelf="center"
                    alignItems="center"
                    lg={10}
                    xs={11}
                    style={{
                        paddingTop: 70 + 80
                    }}
                >
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        lg={6}
                        xs={12}
                        style={{
                            padding: "0px 20px 20px 0px"
                        }}
                    >
                        <img src={oompaLoompa.image} alt="Oompa Loompa" style={{ width: "100%" }} />
                    </Grid>
                    <Grid
                        container
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        lg={6}
                        xs={12}
                    >
                        <Typography align="left" sx={{ width: 1, fontSize: 18, }} fontWeight="bold">
                            {oompaLoompa.first_name + " " + oompaLoompa.last_name}
                        </Typography>
                        <Typography align="left" sx={{ width: 1 }} color="grey">
                            {oompaLoompa.gender === "M" ? "Man" : "Woman"}
                        </Typography>
                        <Typography align="left" sx={{ width: 1, fontStyle: 'italic' }} color="grey" >
                            {oompaLoompa.profession}
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: oompaLoompa.description }} style={{ textAlign: "left", paddingTop: 20 }} />
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}