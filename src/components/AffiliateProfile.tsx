import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Save, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const AffiliateProfile = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [headshotUrl, setHeadshotUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("affiliate_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setDisplayName(data.display_name);
        setTestimonial(data.testimonial);
        setHeadshotUrl(data.headshot_url);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("affiliate_profiles")
      .update({ display_name: displayName, testimonial })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save profile.");
    } else {
      toast.success("Profile saved!");
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);

    const filePath = `${user.id}/headshot-${Date.now()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("headshots")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed.");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("headshots")
      .getPublicUrl(filePath);

    await supabase
      .from("affiliate_profiles")
      .update({ headshot_url: publicUrl })
      .eq("user_id", user.id);

    setHeadshotUrl(publicUrl);
    setUploading(false);
    toast.success("Photo uploaded!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Your Affiliate Profile</h2>
        <p className="mt-1 text-muted-foreground">
          Upload your headshot and share your thoughts on the app. This information will be used on your affiliate web page.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <Card>
          <CardHeader className="items-center text-center">
            <CardTitle className="text-lg">Headshot</CardTitle>
            <CardDescription>Used on your affiliate page</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-40 w-40 border-2 border-border">
              {headshotUrl ? (
                <AvatarImage src={headshotUrl} alt="Affiliate headshot" className="object-cover" />
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
              disabled={uploading}
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              {uploading ? "Uploading..." : headshotUrl ? "Change Photo" : "Upload Photo"}
            </Button>
          </CardContent>
        </Card>

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
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliate-testimonial">Your Testimonial / Copy</Label>
              <Textarea
                id="affiliate-testimonial"
                placeholder="Share your experience with 10% Happier — how you use the app, what it means to you, and why you recommend it to others..."
                className="min-h-[180px]"
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
              />
            </div>
            <Button onClick={handleSave} className="gap-2" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {(displayName || headshotUrl || testimonial) && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
            <CardDescription>This is how your profile will appear on your affiliate page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              {headshotUrl && (
                <Avatar className="h-24 w-24 shrink-0 border border-border">
                  <AvatarImage src={headshotUrl} alt="Preview" className="object-cover" />
                </Avatar>
              )}
              <div className="text-center sm:text-left">
                {displayName && <p className="text-lg font-semibold text-foreground">{displayName}</p>}
                {testimonial && (
                  <blockquote className="mt-2 italic text-muted-foreground">"{testimonial}"</blockquote>
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
