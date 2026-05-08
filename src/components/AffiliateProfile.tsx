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
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const AffiliateProfile = () => {
  const { user, isReady } = useAuth();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState("");
  const [slug, setSlug] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [headshotUrl, setHeadshotUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: profile, isLoading: loading } = useQuery({
    queryKey: ["affiliate-profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("affiliate_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
    enabled: isReady && !!user,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setTestimonial(profile.testimonial);
      setHeadshotUrl(profile.headshot_url);
    }
  }, [profile]);

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
                <AvatarImage src={headshotUrl} alt="Affiliate headshot" className="object-cover object-top" />
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
            <h3 className="text-lg font-semibold text-foreground">Testimonial Preview</h3>
            <p className="text-sm text-muted-foreground">This is how your Testimonial will appear on your affiliate page</p>
          </div>
          <div className="rounded-xl overflow-hidden border border-border bg-background">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border">
              <span className="text-sm font-semibold tracking-wide uppercase text-foreground">DAN HARRIS</span>
              <span className="text-sm font-medium text-foreground">MENU</span>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left column */}
              <div className="flex flex-col justify-center px-6 md:px-10 py-8 md:py-12 space-y-6">
                <div className="inline-flex">
                  <span className="bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-full">
                    10%<sup className="text-[8px]">with</sup> → Dan Harris
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-foreground">
                  The world is insane.<br />You don't have to be.
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                  Your meditation practice starts here. Guided meditations, ad-free podcast access, live sessions, and a community of real people — led by Dan Harris and a rotating lineup of world-class teachers.
                </p>
                <div className="space-y-3">
                  <button className="bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-md">
                    Start for Free Today
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Already a member? <span className="underline">Log in</span>
                  </p>
                </div>
              </div>

              {/* Right column — photo with testimonial overlay */}
              <div className="relative min-h-[400px] md:min-h-[500px]">
                {headshotUrl ? (
                  <img
                    src={headshotUrl}
                    alt={displayName || "Affiliate headshot"}
                    className="h-full w-full object-cover object-top absolute inset-0"
                  />
                ) : (
                  <div className="h-full w-full absolute inset-0 bg-muted flex items-center justify-center">
                    <User className="h-20 w-20 text-muted-foreground/40" />
                  </div>
                )}
                {(testimonial || displayName) && (
                  <div className="absolute bottom-0 right-0 w-full md:w-[90%] bg-foreground/90 p-3 md:p-4">
                    {testimonial && (
                      <blockquote className="text-xs md:text-sm leading-relaxed text-background font-light break-words">
                        &ldquo;{testimonial}&rdquo;
                      </blockquote>
                    )}
                    {displayName && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="block h-[2px] w-5 bg-primary" />
                        <span className="text-[9px] tracking-widest uppercase text-background/70">
                          {displayName}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateProfile;
