import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useIntl } from "react-intl";

type DeleteDialogProps = {
  title: string;
  description: string;
  buttonText?: React.ReactNode;
  handleDelete: () => void;
  insideButton?: string;
};

export function DeleteDialog({
  title,
  description,
  handleDelete,
  buttonText,
  insideButton,
}: DeleteDialogProps) {
  const intl = useIntl();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          {buttonText || intl.formatMessage({ id: "dialog.delete" })}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            {intl.formatMessage({ id: "dialog.cancel" })}
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            {insideButton || intl.formatMessage({ id: "dialog.delete" })}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
