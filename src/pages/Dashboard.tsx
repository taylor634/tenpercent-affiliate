import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/assets/logo.png";
import WelcomeSection from "@/components/WelcomeSection";
import BrandGuidelines from "@/components/BrandGuidelines";
import ReadyToUseCopy from "@/components/ReadyToUseCopy";
import PerformanceTips from "@/components/PerformanceTips";
import PartnerFAQ from "@/components/PartnerFAQ";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'hsl(0 0% 7%)' }}>
        <div className="mx-auto flex max-w-5xl items-center gap-5 px-4 py-5">
          <img src={logo} alt="10% With Dan Harris" className="h-10 object-contain" />
          <span className="text-3xl font-extrabold tracking-tight" style={{ color: 'hsl(0 0% 96%)' }}>Affiliate Toolkit</span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Tabs defaultValue="welcome" className="w-full">
          <TabsList className="mb-8 w-full flex-wrap h-auto gap-1 bg-transparent p-0">
            {[
              { value: "welcome", label: "Welcome" },
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
