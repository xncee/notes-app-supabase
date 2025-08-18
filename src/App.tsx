import { AuthProvider } from "./context/auth-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import SignUpPage from "./pages/signup-page";
import ProtectedRoute from "./components/protected-route";
import NotesPage from "./pages/notes-page";
import LogoutPage from "./pages/logout-page";
import NoteDetails from "./pages/note-details";
import { ThemeProvider } from "./context/theme-context";
import NavBar from "./components/nav-bar";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <div className="bg-[var(--color-background)]">
                    <Router>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                            <Route path="/logout" element={<LogoutPage />} />
                            <Route
                                path="/notes"
                                element={
                                    <ProtectedRoute>
                                        <NavBar />
                                        <NotesPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/notes/:noteId"
                                element={
                                    <ProtectedRoute>
                                        <NavBar />
                                        <NoteDetails />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/protected"
                                element={
                                    <ProtectedRoute>
                                        <NavBar />
                                        <NotesPage />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Router>
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
