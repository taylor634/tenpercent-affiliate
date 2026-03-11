import PasswordGate from "@/components/PasswordGate";
import Dashboard from "@/pages/Dashboard";

const Index = () => {
  return (
    <PasswordGate>
      <Dashboard />
    </PasswordGate>
  );
};

export default Index;
