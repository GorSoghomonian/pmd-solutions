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






import HubSpotSection from '../../app/services/HubSpotSection';
import { getAllHubSpotData } from '../../lib/api';

export default function HubSpotPage({ hubspotItems, automationItems }) {
  return (
    <>
      <HubSpotSection items={hubspotItems} />
      <HubSpotSection items={automationItems} />
    </>
  );
}

export async function getServerSideProps() {
  const { hubspotItems, automationItems, hubspotError, automationError } = await getAllHubSpotData();

  return {
    props: {
      hubspotItems,
      automationItems,
      hubspotError,
      automationError
    }
  };
}
