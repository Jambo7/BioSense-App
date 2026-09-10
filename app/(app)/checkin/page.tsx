import { redirect } from 'next/navigation'

/** Daily check-in is now Today's Context. */
export default function CheckinRedirect() {
  redirect('/context')
}
