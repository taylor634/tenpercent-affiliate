import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Globe, ExternalLink } from "lucide-react";

const faqs = [
  {
    q: "How does my link work?",
    a: "Your personalized URL (danharris.com/[yourname]) has a 30-day cookie. Anyone who clicks and subscribes within 30 days is a conversion credited to you — even if they didn't buy immediately.",
  },
  {
    q: "When do I get paid?",
    a: "Commissions are paid monthly, within 15 business days of month-end. You'll get a statement breaking down your clicks, conversions, and earnings — all of it.",
  },
  {
    q: "What's the minimum payout?",
    a: "Payouts go out once your balance hits $50. Anything below that rolls over to the next month automatically.",
  },
  {
    q: "How do I see my results?",
    a: "You'll have a real-time partner dashboard to track clicks, conversions, and cumulative earnings. Login details come through when you join.",
  },
  {
    q: "Can I promote multiple apps or brands?",
    a: "Yes — we don't require exclusivity. We just ask that you don't run a 10% With Dan Harris promo back-to-back with a competing meditation app in the same piece of content. That's it.",
  },
  {
    q: "What if someone already subscribes?",
    a: "The discount and commission apply to first-time annual subscribers only. If someone is already subscribed or is upgrading from monthly, no commission is earned on that one.",
  },
  {
    q: "Can I make a custom offer?",
    a: "The standard offer is 20% off an annual subscription. If you want to talk through a custom offer or campaign, reach out — we're open to it.",
  },
  {
    q: "What if my link isn't working?",
    a: "Email affiliate@danharris.com right away. We'll track down the issue and, where we can, credit any conversions that happened during the broken-link window.",
  },
  {
    q: "Are there materials I can't use?",
    a: "Please don't use screenshots, audio clips, or video from the app without written approval first. Approved assets can be requested from us — just ask.",
  },
  {
    q: "Do I have to disclose?",
    a: "Yes. FTC guidelines require disclosure of any material connection to a brand you're promoting — including affiliate arrangements. Something simple like \"This is a paid partnership\" or \"Ad:\" does the job.",
  },
];

const PartnerFAQ = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Partner FAQs</h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Let's Stay in Touch */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Let's Stay in Touch</h3>
        <p className="text-muted-foreground">
          Your partner manager is your go-to for anything in this toolkit — link issues, custom campaigns, extra assets, or just feedback on what's actually working out there.
        </p>

        <Card>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href="mailto:affiliate@danharris.com" className="text-sm font-medium text-primary hover:underline">
                  affiliate@danharris.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Website</p>
                <a href="https://danharris.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                  danharris.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ExternalLink className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Dashboard</p>
                <span className="text-sm font-medium text-muted-foreground">[Link coming soon]</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground pt-4">
          Thanks for being part of this. We're really glad you're here.<br />
          <span className="font-medium">— The 10% With Dan Harris Team</span>
        </p>
      </div>
    </div>
  );
};

export default PartnerFAQ;
