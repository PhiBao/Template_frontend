import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Category from "./components/Category";
import Container from "@mui/material/Container";
import Details from "./components/Details";
import Payment from "./components/Payment";
import Intake from "./components/Intake";
import Waiting from "./components/Waiting";
import ChatRoom from "./components/ChatRoom";
import VideoRoom from "./components/VideoRoom";
import Notes from "./components/Notes";
import Message from "./components/Message";

function App() {
  return (
    <Router>
      <NavBar />
      <Message />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/details" element={<Details />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/chat-room" element={<ChatRoom />} />
          <Route path="/video-room" element={<VideoRoom />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
