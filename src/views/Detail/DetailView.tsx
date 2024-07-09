import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography } from "@mui/material";

import Header from "../../components/Header";
import { OompaLoompa } from "../../Models/OompaLoompa";
import { RootState, AppDispatch } from "../../redux/store";
import { addDescription, selectOompaLoompaById } from "../../redux/oompaLoompaSlice";

export default function DetailView() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [oompaLoompa, setOompaLoompa] = useState(useSelector((state: RootState) => id !== undefined ? selectOompaLoompaById(id)(state) : null))

    const checkIfIsValidId = (value: string) => {
        const regex = /^\d+$/;
        return regex.test(value);
    }

    useEffect(() => {
        const initDetailView = async () => {
            if (id === undefined || !checkIfIsValidId(id)) {
                navigate('/')
            } else {
                if (!oompaLoompa || oompaLoompa.description === "") {
                    try {
                        const response = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`);
                        const data = await response.json();
                        const myOompaLoompa = OompaLoompa.toOompaLoompa(data)
                        dispatch(addDescription({ id: id, description: myOompaLoompa.description }))
                        setOompaLoompa(myOompaLoompa)
                    }
                    catch (e) {
                        navigate('/')
                    }
                }
            }
        }
        initDetailView()
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