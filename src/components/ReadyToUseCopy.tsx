import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, Mail, Mic, Radio, Share2 } from "lucide-react";
import { toast } from "sonner";

interface CopyBlockProps {
  title: string;
  content: string;
}

const CopyBlock = ({ title, content }: CopyBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Highlight [bracketed] text
  const highlighted = content.split(/(\[[^\]]+\])/).map((part, i) =>
    part.startsWith("[") ? (
      <span key={i} className="rounded bg-primary/10 px-1 font-medium text-primary">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm uppercase tracking-wide text-foreground">{title}</CardTitle>
        <Button size="sm" variant="outline" onClick={handleCopy} className="h-8 gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
          {highlighted}
        </p>
      </CardContent>
    </Card>
  );
};

const sections = [
  {
    icon: Mail,
    heading: "Newsletter",
    blocks: [
      {
        title: "Subject Line Options",
        content: `[Your subject line option 1]\n[Your subject line option 2]\n[Your subject line option 3]`,
      },
      {
        title: "Newsletter Body",
        content: `[Your newsletter body copy here — personalize with your own experience and voice. Include your affiliate link: danharris.com/[yourname]]`,
      },
    ],
  },
  {
    icon: Mic,
    heading: "Podcast",
    blocks: [
      {
        title: "Short Ad Read (30 sec)",
        content: `[Your 30-second ad read here. Keep it conversational and mention the 20% discount and your link: danharris.com/[yourname]]`,
      },
      {
        title: "Longer Ad Read (60 sec)",
        content: `[Your 60-second ad read here. Include a personal anecdote, the key app features, the 20% discount, and your link: danharris.com/[yourname]]`,
      },
    ],
  },
  {
    icon: Radio,
    heading: "Feed Drop / Solo Episode",
    blocks: [
      {
        title: "Feed Drop Intro (if Dan's team provides an episode)",
        content: `[Your intro for a feed drop episode — set the stage for your audience and include your link: danharris.com/[yourname]]`,
      },
      {
        title: "Solo Interview / Episode Closer",
        content: `[Your episode closer or solo episode mention — wrap up with a genuine recommendation and your link: danharris.com/[yourname]]`,
      },
    ],
  },
  {
    icon: Share2,
    heading: "Social Media",
    blocks: [
      {
        title: "Instagram / Facebook Post",
        content: `[Your Instagram/Facebook post here. Keep it authentic, mention the discount, and direct followers to the link in your bio: danharris.com/[yourname]]`,
      },
      {
        title: "X / Twitter Post",
        content: `[Your tweet here — concise, honest, include your link: danharris.com/[yourname]]`,
      },
      {
        title: "Instagram Stories (3–4 slides)",
        content: `Slide 1: [Hook — something personal or surprising about meditation]\nSlide 2: [What the app offers — keep it specific]\nSlide 3: [The deal — 20% off with your link]\nSlide 4: [CTA — swipe up or link in bio: danharris.com/[yourname]]`,
      },
    ],
  },
];

const ReadyToUseCopy = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Ready-to-Use Copy</h2>
        <p className="text-muted-foreground">
          These are plug-and-play scripts for every channel. Swap in anything in{" "}
          <span className="rounded bg-primary/10 px-1 font-medium text-primary">[brackets]</span>{" "}
          to make it yours. The more honest and personal your take, the better it lands — your audience can feel the difference.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.heading} className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <section.icon className="h-5 w-5 text-primary" />
            {section.heading}
          </h3>
          <div className="grid gap-4">
            {section.blocks.map((block) => (
              <CopyBlock key={block.title} {...block} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadyToUseCopy;
