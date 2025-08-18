import { AuthProvider } from "./context/auth-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import SignUpPage from "./pages/signup-page";
import ProtectedRoute from "./components/protected-route";
import NotesPage from "./pages/notes-page";
import LogoutPage from "./pages/logout-page";
import NoteDetails from "./pages/note-details";

function App() {
    return (
        <AuthProvider>
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
                                <NotesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/notes/:noteId"
                        element={
                            <ProtectedRoute>
                                <NoteDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute>
                                <NotesPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
