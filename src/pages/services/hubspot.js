// import HubSpotSection from '../../app/services/HubSpotSection';
// import { getHubSpotItems } from '../../lib/api';

// export default function HubSpotPage({ items, error = null }) {
//   return <HubSpotSection items={items} />;
// }

// export async function getServerSideProps() {
//   const { items, error } = await getHubSpotItems();

//   return {
//     props: {
//       items,
//       error: error ?? null
//     }
//   };
// }






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
