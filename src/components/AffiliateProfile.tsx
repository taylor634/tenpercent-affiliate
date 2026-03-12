import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Save, User, Loader2, ImageIcon } from "lucide-react";
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
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const { error } = await supabase
        .from("affiliate_profiles")
        .update({ display_name: displayName, testimonial })
        .eq("user_id", user.id)
        .abortSignal(controller.signal);

      if (error) {
        toast.error("Failed to save profile.");
      } else {
        toast.success("Profile saved!");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        toast.error("Save timed out. Please try again.");
      } else {
        toast.error("Failed to save profile.");
      }
    } finally {
      window.clearTimeout(timeoutId);
      setSaving(false);
    }
  };

  const resizeImage = (file: File, maxSize = 800): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > height) {
          if (width > maxSize) { height = (height * maxSize) / width; width = maxSize; }
        } else {
          if (height > maxSize) { width = (width * maxSize) / height; height = maxSize; }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Resize failed"))),
          "image/jpeg",
          0.85
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);

    try {
      const resized = await resizeImage(file);
      const filePath = `${user.id}/headshot-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("headshots")
        .upload(filePath, resized, { upsert: true, contentType: "image/jpeg" });

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
      toast.success("Photo uploaded!");
    } catch {
      toast.error("Upload failed.");
    }
    setUploading(false);
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
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Preview</h3>
            <p className="text-sm text-muted-foreground">This is how your Testimonial will appear on your affiliate page</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px] gap-1 rounded-xl">
            {/* Left: testimonial rectangle */}
            <div className="flex flex-col justify-between bg-foreground p-8 md:p-10 rounded-lg min-h-[320px]">
              {testimonial && (
                <blockquote className="text-lg md:text-xl italic leading-relaxed text-background font-light break-words overflow-wrap-anywhere">
                  &ldquo;{testimonial}&rdquo;
                </blockquote>
              )}
              {displayName && (
                <div className="mt-8 flex items-center gap-3 shrink-0">
                  <span className="block h-[2px] w-8 bg-primary" />
                  <span className="text-sm tracking-widest uppercase text-background/70">
                    {displayName}
                  </span>
                </div>
              )}
            </div>
            {/* Right: headshot matches left block height */}
            {headshotUrl && (
              <div className="rounded-lg overflow-hidden md:w-[320px]">
                <img
                  src={headshotUrl}
                  alt={displayName || "Affiliate headshot"}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateProfile;
