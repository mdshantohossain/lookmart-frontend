import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Props = {
  icon?: IconName;
  title: string;
  message?: string;
  buttonTitle?: string;
  href?: () => void;
};

export default function FormSubmissionSuccess({
  icon = "check-circle-2",
  title,
  message,
  buttonTitle,
  href,
}: Props) {
  return (
    <div className="text-center">
      <CardHeader>
        <div
          className={`flex justify-center mb-2 ${
            icon === "loader" ? "animate-spin" : ""
          }`}
        >
          <DynamicIcon
            name={icon}
            className={`w-12 h-12 ${
              icon === "check-circle-2"
                ? "text-green-500"
                : icon === "loader"
                ? "text-gray-500"
                : "text-red-500"
            }`}
          />
        </div>
        <CardTitle className="text-2xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent >
        <p className="text-gray-700 mt-3 ">{message}</p>
        {buttonTitle && (
          <Button
            onClick={href}
            className="inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-3"
          >
            {buttonTitle}
          </Button>
        )}
      </CardContent>
    </div>
  );
}
