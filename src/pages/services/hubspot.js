
import AutomationSection from '../../app/services/AutomationSection';
import HubSpotSection from '../../app/services/HubSpotSection';
import { getAllHubSpotData } from '../../lib/api';

export default function HubSpotPage({ hubspotItems, automationItems, auditItems }) {
  return (
    <>
      <HubSpotSection items={hubspotItems} />
      <AutomationSection items={automationItems} />
      <AuditSection items={auditItems} />
    </>
  );
}

export async function getServerSideProps() {
  const { hubspotItems, automationItems, hubspotError, automationError, auditItems, auditError } = await getAllHubSpotData();

  return {
    props: {
      hubspotItems,
      automationItems,
      auditItems,
      auditError,
      hubspotError,
      automationError
    }
  };
}
