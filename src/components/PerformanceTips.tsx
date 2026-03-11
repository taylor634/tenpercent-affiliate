import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

const whatWorks = [
  { bold: "Personal stories outperform scripts.", detail: "Lead with what you actually noticed. Your audience can feel the difference between a real recommendation and a script." },
  { bold: "Skepticism is a selling point.", detail: "The best-performing reads start with something like \"I was skeptical\" or \"I don't usually plug things like this.\" That kind of honesty is exactly on-brand for Dan — and it converts." },
  { bold: "Repeat the link.", detail: "On podcasts, say your URL twice — once naturally in the flow, once slowly and clearly at the end. On social, put it in the caption and your link in bio." },
  { bold: "Mention the discount explicitly.", detail: "The 20% off is a real incentive — don't bury it. Say it clearly and say it more than once." },
  { bold: "Specificity converts.", detail: "Instead of \"it helps with stress,\" try something like: \"I did a 7-minute session before a big meeting and felt noticeably calmer.\" Specific details are way more persuasive than vague claims." },
  { bold: "Test your link.", detail: "Before anything goes live, click your own link and make sure it's working and the 20% off is showing up correctly." },
];

const whatToAvoid = [
  "Don't stack this in a cluster of back-to-back sponsor reads. If your audience hears three ads in a row, yours is the one they tune out.",
  "Don't set it and forget it. Swap in fresh copy every few months — audiences stop hearing words they've already heard.",
  "Don't rush the URL. Slow down, especially on podcasts — people actually need a second to write it down.",
  "Don't position the app as a fix for serious mental illness. It's a wellness tool — genuinely useful, but not a replacement for therapy or professional care.",
];

const PerformanceTips = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Performance Tips</h2>
        <p className="text-muted-foreground">
          These are the things that actually move the needle — we've seen them work over and over.
        </p>
      </div>

      {/* What Works */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">What Works</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {whatWorks.map((tip, i) => (
            <Card key={i}>
              <CardContent className="flex gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-sm">{tip.bold}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tip.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* What to Avoid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">What to Avoid</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {whatToAvoid.map((item, i) => (
            <Card key={i} className="border-destructive/20">
              <CardContent className="flex gap-3 p-5">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceTips;
