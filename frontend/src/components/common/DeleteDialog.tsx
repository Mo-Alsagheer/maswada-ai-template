import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useIntl } from "react-intl"

type DeleteDialogProps = {
  handleDelete: () => void
  title: string
  description: string
  buttonText?: string
}

export function DeleteDialog({ handleDelete, title, description, buttonText }: DeleteDialogProps) {
  const intl = useIntl()
  const defaultButtonText = intl.formatMessage({ id: 'noteDetail.delete' })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{buttonText || defaultButtonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{intl.formatMessage({ id: 'dialog.cancel' })}</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete}>
            {intl.formatMessage({ id: 'dialog.confirmDelete' })}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
