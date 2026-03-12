import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import WelcomeSection from "@/components/WelcomeSection";
import BrandGuidelines from "@/components/BrandGuidelines";
import ReadyToUseCopy from "@/components/ReadyToUseCopy";
import PerformanceTips from "@/components/PerformanceTips";
import PartnerFAQ from "@/components/PartnerFAQ";
import AffiliateProfile from "@/components/AffiliateProfile";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { signOut, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'hsl(0 0% 7%)' }}>
        <div className="mx-auto flex max-w-5xl items-center gap-5 px-4 py-5">
          <img src={logo} alt="10% With Dan Harris" className="h-10 object-contain" />
          <span className="text-3xl font-extrabold tracking-tight" style={{ color: 'hsl(0 0% 96%)' }}>Affiliate Toolkit</span>
          <div className="ml-auto flex items-center gap-2">
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="gap-1.5 hover:bg-primary hover:text-primary-foreground" style={{ backgroundColor: 'hsl(8 78% 56%)', color: 'white', borderColor: 'hsl(8 78% 56%)' }}>
                <Shield className="h-3.5 w-3.5" /> Admin
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5" style={{ color: 'hsl(0 0% 96%)' }}>
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Tabs defaultValue="welcome" className="w-full">
          <TabsList className="mb-8 w-full flex-wrap h-auto gap-1 bg-transparent p-0">
            {[
              { value: "welcome", label: "Welcome" },
              { value: "profile", label: "Your Profile" },
              { value: "brand", label: "Brand Guidelines" },
              { value: "copy", label: "Ready-to-Use Copy" },
              { value: "tips", label: "Performance Tips" },
              { value: "faq", label: "FAQ & Support" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full border px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="welcome"><WelcomeSection /></TabsContent>
          <TabsContent value="profile"><AffiliateProfile /></TabsContent>
          <TabsContent value="brand"><BrandGuidelines /></TabsContent>
          <TabsContent value="copy"><ReadyToUseCopy /></TabsContent>
          <TabsContent value="tips"><PerformanceTips /></TabsContent>
          <TabsContent value="faq"><PartnerFAQ /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
