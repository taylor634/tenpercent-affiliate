import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Mail, Share2 } from "lucide-react";

interface GraphicPlaceholderProps {
  title: string;
}

const GraphicPlaceholder = ({ title }: GraphicPlaceholderProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm uppercase tracking-wide text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 py-12 text-muted-foreground">
        <ImageIcon className="mb-2 h-8 w-8" />
        <p className="text-sm">Graphic coming soon</p>
      </div>
    </CardContent>
  </Card>
);

const sections = [
  {
    icon: Mail,
    heading: "Newsletter",
    graphics: ["Newsletter Banner", "Newsletter Inline Graphic"],
  },
  {
    icon: Share2,
    heading: "Social Media",
    graphics: [
      "Instagram / Facebook Post",
      "X / Twitter Post",
      "Instagram Stories (3–4 slides)",
    ],
  },
];

const ReadyToUseCopy = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Ready-to-Use Graphics</h2>
        <p className="text-muted-foreground">
          Download and use these graphics across your channels.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.heading} className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <section.icon className="h-5 w-5 text-foreground" />
            {section.heading}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.graphics.map((title) => (
              <GraphicPlaceholder key={title} title={title} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadyToUseCopy;
