import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  testimonial: string;
  headshot_url: string | null;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchProfiles();
  }, [isAdmin, authLoading, navigate]);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("affiliate_profiles")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      toast.error("Failed to load profiles.");
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (profileId: string) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    const { error } = await supabase
      .from("affiliate_profiles")
      .delete()
      .eq("id", profileId);
    if (error) {
      toast.error("Failed to delete profile.");
    } else {
      toast.success("Profile deleted.");
      setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'hsl(0 0% 7%)' }}>
        <div className="mx-auto flex max-w-5xl items-center gap-5 px-4 py-5">
          <img src={logo} alt="10% With Dan Harris" className="h-10 object-contain" />
          <span className="text-3xl font-extrabold tracking-tight" style={{ color: 'hsl(0 0% 96%)' }}>Admin Dashboard</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Affiliate Profiles ({profiles.length})</h2>
          <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolkit
          </Button>
        </div>

        {profiles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No affiliate profiles yet. Affiliates will appear here once they sign up.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {profiles.map((profile) => (
              <Card key={profile.id}>
                <CardContent className="flex items-start gap-4 p-5">
                  <Avatar className="h-16 w-16 shrink-0 border border-border">
                    {profile.headshot_url ? (
                      <AvatarImage src={profile.headshot_url} alt={profile.display_name} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-muted">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-foreground">
                      {profile.display_name || "No name set"}
                    </p>
                    {profile.testimonial ? (
                      <blockquote className="mt-1 italic text-muted-foreground line-clamp-3">
                        "{profile.testimonial}"
                      </blockquote>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">No testimonial provided</p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Updated: {new Date(profile.updated_at).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(profile.id)}
                    className="shrink-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
