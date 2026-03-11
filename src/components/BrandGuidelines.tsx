import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle } from "lucide-react";

const voiceRows = [
  { tone: "Warm and honest", why: "Dan's own voice is conversational and genuinely self-deprecating — match that and you're already halfway there" },
  { tone: "Skeptic-friendly", why: "A lot of your audience has probably written off meditation before. Meet them where they are — no pressure, no preaching" },
  { tone: "Practical", why: "Keep it grounded: short sessions, real benefits (better sleep, sharper focus, less stress), real life" },
  { tone: "Personal", why: "Your own honest experience with the app is your most powerful tool — use it" },
  { tone: "Science-grounded", why: "The science here is genuinely solid. Lean on it if it feels natural to you" },
];

const avoidItems = [
  "Don't frame the app as spiritual, religious, or \"woo\" — that's literally the opposite of what this thing is about",
  "Don't promise specific health outcomes or make medical claims",
  "Don't use the phrase \"life-changing\" without personal qualification",
  "Don't compare the app unfavorably to competitors by name",
  "Don't share commission amounts with your audience",
];

const BrandGuidelines = () => {
  return (
    <div className="space-y-8">
      {/* How to Describe the App */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">How to Describe the App</h2>
        <p className="text-muted-foreground">
          These are the phrases that work best in the wild. Consistent language helps your audience understand exactly what they're signing up for — and makes them way more likely to follow through.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wide text-primary">Short (1 sentence)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground italic">
            [Your short description here]
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wide text-primary">Medium (2–3 sentences)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground italic">
            [Your medium description here]
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wide text-primary">Longer (newsletters / long-form)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground italic">
            [Your longer description here]
          </CardContent>
        </Card>
      </div>

      {/* Brand Voice */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold">Brand Voice</h3>
        <p className="text-muted-foreground">When you talk about the app, aim for this energy:</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] font-semibold">Tone to use</TableHead>
                <TableHead className="font-semibold">Why it works</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voiceRows.map((r) => (
                <TableRow key={r.tone}>
                  <TableCell className="font-medium">{r.tone}</TableCell>
                  <TableCell className="text-muted-foreground">{r.why}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* What to Avoid */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          What to Avoid
        </h3>
        <div className="space-y-2">
          {avoidItems.map((item, i) => (
            <Card key={i} className="border-destructive/20">
              <CardContent className="p-4 text-sm text-muted-foreground">
                {item}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandGuidelines;
