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
        <p className="text-muted-foreground leading-relaxed">
          We're really glad you're here. You're part of a community built around a simple idea: meditation doesn't have to be spiritual or weird — it's just a skill, and it actually works. This toolkit has everything you need to share the app with your audience and start earning.
        </p>
      </div>

      {/* Quick Version */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">The Quick Version</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• You earn <strong>X% commission</strong> on every annual subscription purchase made through your link.</p>
          <p>• Your audience gets <strong>20% off</strong> their first annual subscription — exclusively through your link.</p>
          <p>• Your custom link: <strong className="text-primary">danharris.com/[yourname]</strong></p>
        </CardContent>
      </Card>

      {/* About the App */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold">About 10% With Dan Harris</h3>
        <p className="text-muted-foreground leading-relaxed">
          10% With Dan Harris is a meditation app for people who are skeptical of meditation — or who tried it once and quietly gave up. Dan Harris, former ABC News anchor and bestselling author of 10% Happier, built this thing on one core idea: you don't have to believe in anything. Meditation is just a skill. Practice it and you get measurably calmer, kinder, and better at dealing with difficult people. No crystals required.
        </p>
      </div>

      {/* App Features */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Brain,
            title: "Guided Meditations",
            desc: "A growing library of guided sessions covering stress, anxiety, focus, sleep, difficult people, and more. Short, practical, and taught by world-class teachers.",
          },
          {
            icon: Zap,
            title: "Meditation Challenges",
            desc: "Structured programs that give your practice an actual spine — clear goals, daily guidance, and a community of people doing it alongside you.",
          },
          {
            icon: Headphones,
            title: "The 10% Happier Podcast, Ad-Free",
            desc: "Subscribers get the full podcast completely ad-free — every new episode plus the entire archive going back over 10 years. Guests include the Dalai Lama, Brené Brown, Matthew McConaughey, and hundreds more.",
          },
          {
            icon: Users,
            title: "Community Connection",
            desc: "Real conversations with thousands of fellow meditators. The kind of community where you can admit you haven't sat in two weeks and get encouragement instead of judgment.",
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
          When someone clicks your link, they land on a page with your exclusive 20% off offer on an annual subscription. Every purchase gets tracked back to you automatically — nothing extra required on your end.
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
            <p>• 10% per sale</p>
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
            <Badge variant="outline" className="mt-2">Minimum payout: $120</Badge>
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
              Your link has a 90-day cookie window — meaning if someone clicks and subscribes any time in the following 90 days, that conversion is yours, even if they didn't buy on the spot.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeSection;
