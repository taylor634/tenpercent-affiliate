import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Save, User } from "lucide-react";

interface ProfileData {
  name: string;
  headshot: string;
  testimonial: string;
  lastUpdated: string;
}

const STORAGE_KEY = "affiliate-profile";

const AffiliateProfile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    headshot: "",
    testimonial: "",
    lastUpdated: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    const updated = { ...profile, lastUpdated: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProfile(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, headshot: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Your Affiliate Profile</h2>
        <p className="mt-1 text-muted-foreground">
          Upload your headshot and share your thoughts on the app. This information will be used on your affiliate web page.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Headshot Card */}
        <Card>
          <CardHeader className="items-center text-center">
            <CardTitle className="text-lg">Headshot</CardTitle>
            <CardDescription>Used on your affiliate page</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-40 w-40 border-2 border-border">
              {profile.headshot ? (
                <AvatarImage src={profile.headshot} alt="Affiliate headshot" className="object-cover" />
              ) : (
                <AvatarFallback className="bg-muted">
                  <User className="h-16 w-16 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              {profile.headshot ? "Change Photo" : "Upload Photo"}
            </Button>
          </CardContent>
        </Card>

        {/* Copy / Testimonial Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Bio & Testimonial</CardTitle>
            <CardDescription>
              Tell us how you use the app and why you recommend it. This copy will appear on your affiliate page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="affiliate-name">Display Name</Label>
              <Input
                id="affiliate-name"
                placeholder="Your name as you'd like it displayed"
                value={profile.name}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliate-testimonial">Your Testimonial / Copy</Label>
              <Textarea
                id="affiliate-testimonial"
                placeholder="Share your experience with 10% Happier — how you use the app, what it means to you, and why you recommend it to others..."
                className="min-h-[180px]"
                value={profile.testimonial}
                onChange={(e) => setProfile((prev) => ({ ...prev, testimonial: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Profile
              </Button>
              {saved && (
                <span className="text-sm font-medium text-green-600">✓ Saved successfully</span>
              )}
            </div>
            {profile.lastUpdated && (
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(profile.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      {(profile.name || profile.headshot || profile.testimonial) && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
            <CardDescription>This is how your profile will appear on your affiliate page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              {profile.headshot && (
                <Avatar className="h-24 w-24 shrink-0 border border-border">
                  <AvatarImage src={profile.headshot} alt="Preview" className="object-cover" />
                </Avatar>
              )}
              <div className="text-center sm:text-left">
                {profile.name && <p className="text-lg font-semibold text-foreground">{profile.name}</p>}
                {profile.testimonial && (
                  <blockquote className="mt-2 italic text-muted-foreground">"{profile.testimonial}"</blockquote>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AffiliateProfile;
