import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "../views/Home/HomeView";
import DetailView from "../views/Detail/DetailView";

export default function MyRouter(routerProps: any) {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomeView />} {...routerProps} />
                <Route exact path="/:id" element={<DetailView />} {...routerProps} />
            </Routes>
        </BrowserRouter>
    )

}