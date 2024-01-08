import './App.css';
import {Route, Routes} from "react-router-dom";
import Match from "./components/match/match";
import MatchWithTeamsView from "./components/matchWithTeamsView/matchWithTeamsView";
import MatchWithCapacity from "./components/matchWithCapacityView/matchWithCapacityView";
import MatchWithHostTeamsAndPlayers
    from "./components/matchWithHostTeamsAndPlayersView/matchWithHostTeamsAndPlayersView";
import MatchWithGuestTeamsAndPlayers
    from "./components/matchWithGuestTeamsAndPlayersView/matchWithGuestTeamsAndPlayersView";
import Spectator from "./components/spectator/spectator";


import SpectatorAttendence from "./components/spectatorAttedenceView/spectatorAttedenceView";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import AddNewMatch from "./components/addNewMatch/addNewMatch";
import MatchDetails from "./components/matchDetails/matchDetails";
import Aggregation from "./components/aggregation/aggregation";
import ChangePlayersTeam from "./components/changePlayersTeam/changePlayersTeam";

function App() {
    return (
        <>
            <Navbar bg="secondary" variant="light" expand="lg" className={"fw-bolder"}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <Nav.Link href="/match">All matches</Nav.Link>

                            <NavDropdown title="Views" id="basic-nav-dropdown"
                                         className="justify-content-center">
                                <NavDropdown.Item href="/matchWithCapacity">
                                    Future matches with seats available
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/matchWithTeams">
                                    Teams participating in matches
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/matchWithGuestTeamsAndPlayers">
                                    Matches with guest team and their players respectevly
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/matchWithHostTeamsAndPlayers">
                                    Matches with host team and their players respectevly
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/spectatorAttendence">
                                    Spectator's attedence records
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/aggregations">Aggregations</Nav.Link>

                            <Nav.Link href="/playersContract">Player's contract</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/match" element={<Match/>}/>
                <Route path="/matchWithTeams" element={<MatchWithTeamsView/>}/>
                <Route path="/matchWithCapacity" element={<MatchWithCapacity/>}/>
                <Route path="/matchWithHostTeamsAndPlayers" element={<MatchWithHostTeamsAndPlayers/>}/>
                <Route path="/matchWithGuestTeamsAndPlayers" element={<MatchWithGuestTeamsAndPlayers/>}/>
                <Route path="/spectator" element={<Spectator/>}/>
                <Route path="/spectatorAttendence" element={<SpectatorAttendence/>}/>
                <Route path="/match/add" element={<AddNewMatch/>}/>
                <Route path="/matchdetails/:id" element={<MatchDetails/>}/>
                <Route path="/aggregations" element={<Aggregation/>}/>
                <Route path="/playersContract" element={<ChangePlayersTeam/>}/>
            </Routes>
        </>

    );
}


export default App;
