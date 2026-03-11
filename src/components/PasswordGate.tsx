import { useState, type ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import logo from "@/assets/logo.png";

const PASS = "affiliate2026";

interface PasswordGateProps {
  children: ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("affiliate_auth") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASS) {
      sessionStorage.setItem("affiliate_auth", "true");
      setAuthenticated(true);
    } else {
      setError(true);
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center gap-4 pb-2">
          <img
            src={logo}
            alt="10% With Dan Harris"
            className="h-12 object-contain"
          />
          <h1 className="text-xl font-bold text-foreground text-center">
            Affiliate Partner Toolkit
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Enter the password to access your toolkit.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="pl-10"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">
                Incorrect password. Please try again.
              </p>
            )}
            <Button type="submit" className="w-full">
              Enter Toolkit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGate;
