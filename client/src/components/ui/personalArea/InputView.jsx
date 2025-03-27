import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion.jsx";
import Input from "./Input.jsx";
import { Mail, MapPin, User } from "lucide-react";

const sections = [
  {
    id: "1",
    title: "מידע אישי",
    icon: <User className="size-4 stroke-2 text-muted-foreground" />,
    children: (
      <div className="flex flex-col gap-2 font-bold">
        <Input type="text" placeholder="שם פרטי" />
        <Input type="text" placeholder="שם משפחה" />
      </div>
    ),
  },
  {
    id: "2",
    icon: <Mail className="size-4 stroke-2 text-muted-foreground" />,
    title: "יצירת קשר",
    children: (
      <div className="flex flex-col gap-2 font-bold">
        <Input type="email" placeholder="אימייל"/>
        <Input type="tel" placeholder="טלפון" className="placeholder:text-right"/>
      </div>
    ),
  },
  {
    id: "3",
    icon: <MapPin className="size-4 stroke-2 text-muted-foreground" />,
    title: "כתובת",
    children: (
      <div className="flex flex-col gap-2 font-bold">
        <Input type="text" placeholder="רחוב" />
        <Input type="text" placeholder="עיר" />
        <Input type="text" placeholder="מדינה" />
      </div>
    ),
  },
];

function FormSectionAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-[400px]">
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="group">
            <div className="flex items-center gap-2 w-50">
              {section.icon}
              <span>{section.title}</span>
              {section.isComplete && (
                <span className="ml-2 text-sm text-green-500">✓</span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>{section.children}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { FormSectionAccordion };
