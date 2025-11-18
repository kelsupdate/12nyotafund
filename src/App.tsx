import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ApplicationForm } from './pages/ApplicationForm';
import { EligibilityCheck } from './pages/EligibilityCheck';
import { LoanPackages } from './pages/LoanPackages';
import { Payment } from './pages/Payment';
import { Verification } from './pages/Verification';
import { Confirmation } from './pages/Confirmation';
import { Profile } from './pages/Profile';
import { TrackingDashboard } from './pages/TrackingDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/eligibility-check" element={<EligibilityCheck />} />
        <Route path="/loan-packages" element={<LoanPackages />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tracking-dashboard" element={<TrackingDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
