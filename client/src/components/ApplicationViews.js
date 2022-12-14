import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfileList from "./users/UserProfileList";
import UserDetails from "./users/UserDetails";
import Main from "./Main";
import ActivityList from "./activities/ActivityList";
import ActivityDetails from "./activities/ActivityDetails";
import ActivityForm from "./activities/ActivityForm";
import ActivityDelete from "./activities/DeleteActivity";
import SubjectList from "./subjects/SubjectList";
import TimeList from "./times/TimeList";
import GradeList from "./grades/GradeList";
import { Comment } from "./comments/Comment";
import ActivityEdit from "./activities/EditActivity";
import {ActivityChoice} from "./activities/ActivityChoice";
import { CommentNew } from "./comments/CommentNew";
import ActivityChoiceDetails from "./activities/ActivityChoiceDetails";
import { ActivityChoiceList } from "./activities/ActivityChoiceList";
import { CommentEdit } from "./comments/CommentEdit";
import { CommentDelete } from "./comments/CommentDelete";


export default function ApplicationViews() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<UserProfileList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/activity/:id" element={<ActivityDetails />} />
            <Route path="/createActivity" element={<ActivityForm />} />
            <Route path="/deleteActivity/:id" element={<ActivityDelete />} />
            <Route path="/editActivity/:id" element={<ActivityEdit />} />
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/times" element={<TimeList />} />
            <Route path="/grades" element={<GradeList />} />
            <Route path="/activity/:id/comments" element={<Comment />} />
            <Route path="/activity/:id/addComment" element={<CommentNew />} />
            <Route path="/commentEdit/:id" element={<CommentEdit />} />
            <Route path="/commentDelete/:id" element={<CommentDelete />} />
            <Route path="/activity/search/:id" element={<ActivityChoiceDetails />} />
            <Route path="/activity/search" element={<ActivityChoiceList />} />

            <Route path="/activity/search/:subjectId/:timeLeftId/:gradeId" element={<ActivityChoice />} />

            <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Routes>
    );
}