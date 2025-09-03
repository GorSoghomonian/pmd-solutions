"use client";
import Link from 'next/link';
import { usePageNotAvailableModal } from './PageNotAvailableModal';

export default function SafeServiceLink({ href, locale, children, className, serviceId }) {
  const { Modal, showModal } = usePageNotAvailableModal();

  const handleClick = (e) => {
    // Список доступных страниц
    const availablePages = [
      '/services',
      '/services/automation', 
      '/services/audit', 
      '/services/hubspot',
      '/services/software'
    ];
    
    const fullPath = `/${locale}${href}`;
    const pageExists = availablePages.some(page => fullPath.includes(page));
    
    if (!pageExists) {
      e.preventDefault();
      showModal(serviceId);
      return;
    }
  };

  return (
    <>
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
      <Modal />
    </>
  );
}
