import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Link, Cookie, Zap, Headphones, Users, Brain } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const WelcomeSection = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("affiliate_profiles")
      .select("first_name")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.first_name) setFirstName(data.first_name);
      });
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">Welcome{firstName ? `, ${firstName}` : ""}!</h2>
        <p className="text-muted-foreground leading-relaxed text-base">
          We're really grateful you're here. Thank you for sharing our meditation app and community with your audience. This toolkit has everything you need to share the app with your audience and start earning.
        </p>
      </div>

      {/* Quick Version */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">The Quick Version</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• You earn <strong>20% commission</strong> on every annual subscription purchase made through your link.</p>
          <p>• Your audience gets <strong>20% off</strong> their first annual subscription — exclusively through your link.</p>
          <p>• Your custom link</p>
        </CardContent>
      </Card>

      {/* About the App */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold">About 10% With Dan Harris</h3>
        <p className="text-muted-foreground leading-relaxed">
          A simple, easy to use app including guided meditations, ad-free podcast access, live meditation and Q&A sessions, and a vibrant, supportive community of real people — led by Dan Harris and a rotating lineup of world-class teachers.
        </p>
      </div>

      {/* App Features */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Brain,
            title: "Guided Meditations",
            desc: "A library of guided sessions to help with stress, anxiety, focus, sleep, annoying people, and more",
          },
          {
            icon: Zap,
            title: "Meditation Challenges",
            desc: "Structured programs to deepen your practice with clear goals, daily guidance, and community support",
          },
          {
            icon: Headphones,
            title: "The 10% Happier Podcast, Ad-Free",
            desc: "Subscribers get the full podcast completely ad-free — every new episode plus the entire archive going back over 10 years. Guests include the Dalai Lama, Brené Brown, Matthew McConaughey, and hundreds more.",
          },
          {
            icon: Users,
            title: "Community Connection",
            desc: "Join conversations with thousands of other practitioners who get it. Share your struggles, celebrate wins, get support when you need it",
          },
        ].map((f) => (
          <Card key={f.title}>
            <CardContent className="flex gap-4 p-5">
              <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How it Works */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold">How the Affiliate Program Works</h3>
        <p className="text-muted-foreground leading-relaxed">
          When someone clicks your link, they land on a page with your exclusive 20% discount on an annual subscription. Every purchase gets tracked back to you automatically and your 20% commission will be paid out automatically each month. There is no cap on your potential earnings..
        </p>
        <Card className="border-primary/20">
          <CardContent className="flex items-center gap-3 p-4">
            <Link className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Your Partner Link</p>
              <p className="text-sm text-muted-foreground">Your personal link will be sent to you directly. It's unique to you and tracks every conversion automatically.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Structure */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-primary" />
              What You Earn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>• 20% per sale</p>
            <p>• Paid monthly</p>
            <p>• Tracked in real time</p>
            <p>• No earnings cap</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Getting Paid</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Commissions are tallied at the end of each month and paid out within 15 business days via PayPal.</p>
            <Badge variant="outline" className="mt-2">Minimum payout: $5</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Attribution */}
      <Card>
        <CardContent className="flex items-start gap-4 p-5">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">Attribution & Tracking</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your link has a 90-day cookie window; if someone clicks and subscribes any time in the following 90 days, that conversion is yours, even if they didn't buy on the spot.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeSection;
