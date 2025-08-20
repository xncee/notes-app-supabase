import { AuthProvider } from "./context/auth-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import SignUpPage from "./pages/signup-page";
import ProtectedRoute from "./components/protected-route";
import NotesPage from "./pages/notes/page";
import LogoutPage from "./pages/logout-page";
import NoteDetailsPage from "./pages/notes/note-details-page";
import { ThemeProvider } from "./context/theme-context";
import { Toaster } from "sonner";
import OnboardingPage from "./pages/onboarding";
import NewNotePage from "./pages/notes/new-note-page";
import MainLayout from "./components/layouts/main-layout";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="bg-[var(--color-background)]">
          <Toaster dir="ltr" position="top-right" richColors />
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <MainLayout>
                    <LoginPage />
                  </MainLayout>
                }
              />
              <Route
                path="/signup"
                element={
                  <MainLayout>
                    <SignUpPage />
                  </MainLayout>
                }
              />
              <Route
                path="/logout"
                element={
                  <MainLayout>
                    <LogoutPage />
                  </MainLayout>
                }
              />
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <NotesPage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes/:noteId"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <NoteDetailsPage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes/new"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <NewNotePage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <OnboardingPage />
                    </MainLayout>
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
