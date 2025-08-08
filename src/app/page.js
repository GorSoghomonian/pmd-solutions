import {redirect} from 'next/navigation';

export default function RootRedirect() {
  redirect('/home'); // или другой путь
  return null;
}