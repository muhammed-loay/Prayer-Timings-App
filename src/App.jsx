import { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <div style={{ display: "", justifyContent: "center" }}>
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
