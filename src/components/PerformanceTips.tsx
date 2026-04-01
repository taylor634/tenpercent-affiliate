import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Target } from "lucide-react";

const bigPicture = [
  {
    bold: "Repetition.",
    detail:
      "The same frequency and duration of promotion won't work for everyone, and you know what makes the most sense for your organization, but repetition matters. If your audience is like ours, many people tune in and out (and in and out again), so one or two mentions only hits a small fraction of your audience; and many of those people need to hear the offer more than once.",
  },
  {
    bold: "Consider a clear campaign across channels.",
    detail:
      "Again, if your audience is like ours, they interact with you on multiple channels but their attention and engagement varies across all of them. Syncing a podcast drop, then running a few short promos, paired with a few newsletter spots or mentions and social posts is best practice.",
  },
];

const tactics = [
  {
    bold: "A Genuine endorsement.",
    detail:
      "Lead with what you actually noticed or why you're a fan of Dan's if you're not personally into meditation.",
  },
  {
    bold: "Repeat the URL.",
    detail:
      "In audio,, say your URL twice: once naturally in the flow, once slowly and clearly at the end. On social, put it in the caption and your link in bio.",
  },
  {
    bold: "Repeat the discount if space allows.",
    detail:
      "The 20% off is a real incentive, so don't bury it! Be Specific. Instead of \"it helps with stress,\" e.g., try something like: \"I did a 7-minute session before a big meeting and felt noticeably calmer.\"",
  },
  {
    bold: "Double Check.",
    detail:
      "We're here for you every step of the way, but do your thing and double check your link and URL before you push your content out in the world.",
  },
];

const PerformanceTips = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Performance Tips</h2>
        <p className="text-muted-foreground">​</p>
      </div>

      {/* Big Picture */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Big Picture</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {bigPicture.map((tip, i) => (
            <Card key={i}>
              <CardContent className="flex gap-3 p-5">
                <div>
                  <p className="font-semibold text-sm">{tip.bold}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tip.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tactics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Tactics</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {tactics.map((tip, i) => (
            <Card key={i}>
              <CardContent className="flex gap-3 p-5">
                <div>
                  <p className="font-semibold text-sm">{tip.bold}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tip.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceTips;
