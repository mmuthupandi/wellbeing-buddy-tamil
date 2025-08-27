import { AlertTriangle, Phone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SafetyDisclaimer() {
  return (
    <Alert className="border-emergency/20 bg-emergency/5 mb-4">
      <AlertTriangle className="h-4 w-4 text-emergency" />
      <AlertDescription className="text-sm">
        <strong className="text-emergency">Important:</strong> This app provides educational wellness support, not medical advice. 
        In emergencies, call <strong>112 (India)</strong> or contact a qualified mental health professional immediately.
        <div className="flex items-center gap-1 mt-1 text-emergency font-medium">
          <Phone className="w-3 h-3" />
          Crisis Helpline: 1800-599-0019
        </div>
      </AlertDescription>
    </Alert>
  );
}