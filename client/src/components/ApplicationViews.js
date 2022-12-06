import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfileList from "./users/UserProfileList";
import UserDetails from "./users/UserDetails";
import Main from "./Main";
import ActivityList from "./activities/ActivityList";
import { ActivityDetails } from "./activities/ActivityDetails";
import ActivityForm from "./activities/ActivityForm";
import ActivityDelete from "./activities/DeleteActivity";


export default function ApplicationViews() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<UserProfileList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/activities/:id" element={<ActivityDetails />} />
            <Route path="/createActivity" element={<ActivityForm />} />
            <Route path="/deleteActivity/:id" element={<ActivityDelete />} />

            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
}