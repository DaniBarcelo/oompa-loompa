/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Grid, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";


import { OompaLoompa } from "../../Models/OompaLoompa";
import { hoverColor } from "../../utils/constants";
import SearchComponent from "../../components/Search";

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../../redux/store";
import { addDescription, addOompaLoompa } from "../../redux/oompaLoompaSlice";
import { advancePage } from "../../redux/pageCounterSlice"

export default function HomeView() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const oompaLoompas = useSelector((state: RootState) => state.oompaLoompa.oompaLoompas);
    const [search, setSearch] = useState("");
    let pageNumber = useSelector((state: RootState) => state.pageCounter.pageCounter);

    const getOompaLoompas = async () => {
        const response = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${pageNumber}`);
        const data = await response.json();
        data.results.map((item: any) => OompaLoompa.toOompaLoompa(item)).forEach((element: OompaLoompa) => {
            dispatch(addOompaLoompa(element));
        });
        dispatch(advancePage(pageNumber + 1))
        pageNumber++
    }

    const getOompaLoompasToRender = () => {
        if (pageNumber === 1 && oompaLoompas.length === 0) getOompaLoompas()
        const filteredOompaLoompas = oompaLoompas.filter((oompaLoompa: OompaLoompa) => {
            return (
                oompaLoompa.first_name + " " + oompaLoompa.last_name).toLowerCase().includes(search.toLowerCase())
                ||
                oompaLoompa.profession.toLowerCase().includes(search.toLowerCase()
                );
        });
        return filteredOompaLoompas
    }

    const getDescription = async (id: string) => {
        const response = await fetch(`https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`);
        const data = await response.json();
        const myOompaLoompa = OompaLoompa.toOompaLoompa(data)
        dispatch(addDescription({ id: id, description: myOompaLoompa.description }))
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                getOompaLoompas()
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <Header />
            <Grid
                container
                alignSelf="center"
                alignItems="center"
                lg={10}
                xs={11}
            >
                <Grid
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    style={{
                        paddingTop: 70 + 30
                    }}
                >
                    <SearchComponent search={search} setSearch={setSearch} />
                </Grid>
                <Typography
                    fontSize={"4rem"}
                    fontWeight={"500"}
                    sx={{ width: 1 }}
                >
                    Find your Oompa Loompa
                </Typography>
                <Typography
                    fontSize={"3rem"}
                    color={"grey"}
                    sx={{ width: 1 }}
                >
                    There are more than 100k
                </Typography>
                {getOompaLoompasToRender().map((oompaLoompa: OompaLoompa) => {
                    return (
                        <Grid
                            container
                            lg={4}
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                            onClick={async () => {
                                await getDescription(oompaLoompa.id)
                                navigate(`/${oompaLoompa.id}`)
                            }}
                            style={{
                                cursor: "pointer",
                                borderRadius: 10,
                                padding: 30,
                                paddingTop: 40
                            }}
                            sx={{ "&:hover": { color: hoverColor } }}
                        >
                            <img src={oompaLoompa.image} alt="Oompa Loompa" style={{ width: "100%" }} />
                            <Typography align="left" sx={{ width: 1, paddingTop: 3, fontSize: 18, }} fontWeight="bold">
                                {oompaLoompa.first_name + " " + oompaLoompa.last_name}
                            </Typography>
                            <Typography align="left" sx={{ width: 1 }} color="grey">
                                {oompaLoompa.gender === "M" ? "Man" : "Woman"}
                            </Typography>
                            <Typography align="left" sx={{ width: 1, fontStyle: 'italic' }} color="grey" >
                                {oompaLoompa.profession}
                            </Typography>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    );
}