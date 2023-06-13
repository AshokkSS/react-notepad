import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Header, NotesContainer } from "./components";

function App() {
  return (
    <AppContainer>
      <Header titleContent="Ashokk's React Reminders" />
      <NotesContainer />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
`;
