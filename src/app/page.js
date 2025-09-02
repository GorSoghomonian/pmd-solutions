import {redirect} from 'next/navigation';

export default function RootRedirect() {
  redirect('/en'); // Редирект на английскую версию по умолчанию
  return null;
}