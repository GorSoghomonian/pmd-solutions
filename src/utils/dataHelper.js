import { getAllHubSpotData } from '../lib/api';
import { hubspotItems, automationItems, auditItems, industriesItems, whyChooseItems, servicesItems } from '../data/homeItems';

export async function getApiDataWithFallback() {
  try {
    const apiData = await getAllHubSpotData();
    
    return {
      hubspotItems: apiData.hubspotItems.length ? apiData.hubspotItems : hubspotItems,
      automationItems: apiData.automationItems.length ? apiData.automationItems : automationItems,
      auditItems: apiData.auditItems.length ? apiData.auditItems : auditItems,
      industriesItems: industriesItems, 
      whyChooseItems: whyChooseItems, 
      servicesItems: servicesItems,
      errors: {
        hubspot: apiData.hubspotError,
        automation: apiData.automationError,
        audit: apiData.auditError
      }
    };
  } catch (error) {
    console.error('API fallback to static data:', error);
    return {
      hubspotItems,
      automationItems,
      auditItems,
      industriesItems,
      whyChooseItems,
      servicesItems,
      errors: { hubspot: null, automation: null, audit: null }
    };
  }
}

export async function getSpecificData(type) {
  const allData = await getApiDataWithFallback();
  return allData[type] || [];
}
