export const hubspotItems = [
  {
    key: 'customSetup',
    icon: <i className="ri-settings-4-line text-white text-lg" />,
    cardSize: 'sm',
    titleFont: 'sm',
    iconBg: 'bg-blue-600 rounded-full'
  },
  {
    key: 'teamTraining',
    icon: <i className="ri-team-line text-white text-lg" />,
    cardSize: 'sm',
    titleFont: 'sm',
    iconBg: 'bg-blue-600 rounded-full'
  },
  {
    key: 'performanceOptimization',
    icon: <i className="ri-speed-up-line text-white text-lg" />,
    cardSize: 'sm',
    titleFont: 'sm',
    iconBg: 'bg-blue-600 rounded-full'
  },
  {
    key: 'dataMigration',
    icon: <i className="ri-database-2-line text-white text-lg" />,
    cardSize: 'sm',
    titleFont: 'sm',
    iconBg: 'bg-blue-600 rounded-full'
  }
];

export const automationItems = [
  {
    key: 'workflow',
    icon: <i className="ri-shape-line text-white text-lg" />,
    cardSize: 'lg',
    titleFont: 'sm',
    badge: "workflow.badge",
    iconBg: 'bg-blue-600',
    badgeColor: 'bg-blue-50 text-blue-600',
    bgColor: '#fff'
  },
  {
    key: 'email',
    icon: <i className="ri-mail-send-line text-white text-lg" />,
    titleFont: 'sm',
    cardSize: 'lg',
    badge: "email.badge",
    iconBg: 'bg-blue-600',
    badgeColor: 'bg-blue-50 text-blue-600',
    bgColor: '#fff'
  },
  {
    key: 'support',
    icon: <i className="ri-customer-service-2-line text-white text-lg" />,
    titleFont: 'sm',
    cardSize: 'lg',
    badge: "support.badge",
    iconBg: 'bg-blue-600',
    badgeColor: 'bg-blue-50 text-blue-600',
    bgColor: '#fff'
  },
  {
    key: 'reporting',
    icon: <i className="ri-bar-chart-box-line text-white text-lg" />,
    titleFont: 'sm',
    cardSize: 'lg',
    badge: "reporting.badge",
    iconBg: 'bg-blue-600',
    badgeColor: 'bg-blue-50 text-blue-600',
    bgColor: '#fff'
  }
];


export const auditItems = [
  {
    icon: <i className="ri-search-eye-line text-white text-lg" />,
    titleKey: "processAnalysis.title",
    descriptionKey: "processAnalysis.desc",
    bgColor: "#fff",
    iconBg: "bg-green-500 rounded-full",
    cardSize: "sm",
    titleFont: "sm"
  },
  {
    icon: <i className="ri-shield-check-line text-white text-lg" />,
    titleKey: "complianceReview.title",
    descriptionKey: "complianceReview.desc",
    bgColor: "#fff",
    iconBg: "bg-green-500 rounded-full",
    cardSize: "sm",
    titleFont: "sm"
  },
  {
    icon: <i className="ri-speed-up-line text-white text-lg" />,
    titleKey: "efficiencyAssessment.title",
    descriptionKey: "efficiencyAssessment.desc",
    bgColor: "#fff",
    iconBg: "bg-green-500 rounded-full",
    cardSize: "sm",
    titleFont: "sm"
  },
  {
    icon: <i className="ri-lightbulb-line text-white text-lg" />,
    titleKey: "recommendations.title",
    descriptionKey: "recommendations.desc",
    bgColor: "#fff",
    iconBg: "bg-green-500 rounded-full",
    cardSize: "sm",
    titleFont: "sm"
  }
];

export const industriesItems = [
  {
    key: 'realEstate',
    icon: <i className="ri-building-2-line text-xl" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    key: 'logistics',
    icon: <i className="ri-truck-line text-xl" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    key: 'retail',
    icon: <i className="ri-store-2-line text-xl" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    key: 'healthcare',
    icon: <i className="ri-heart-pulse-line text-xl" />,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
  {
    key: 'services',
    icon: <i className="ri-briefcase-4-line text-xl" />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  }
];

export const whyChooseItems = [
  {
    key: 'certifiedExperts',
    icon: <i className="ri-award-line text-yellow-600 text-2xl"></i>,
    iconBg: 'bg-amber-100/60',
    iconColor: 'text-yellow-600',
  },
  {
    key: 'provenTrackRecord',
    icon: <i className="ri-line-chart-line text-green-600 text-2xl"></i>,
    iconBg: 'bg-emerald-100/60',
    iconColor: 'text-green-600',
  },
  {
    key: 'customSolutions',
    icon: <i className="ri-settings-3-line text-blue-600 text-2xl"></i>,
    iconBg: 'bg-blue-100/60',
    iconColor: 'text-blue-600',
  },
  {
    key: 'technologyPartners',
    icon: <i className="ri-plug-line text-indigo-600 text-2xl"></i>, // логичная иконка для партнёров
    iconBg: 'bg-indigo-100/60',
    iconColor: 'text-indigo-600',
  },
  {
    key: 'ongoingSupport',
    icon: <i className="ri-customer-service-2-line text-indigo-600 text-2xl"></i>,
    iconBg: 'bg-indigo-100/60',
    iconColor: 'text-indigo-600',
  },
  {
    key: 'dataDrivenResults',
    icon: <i className="ri-bar-chart-line text-orange-600 text-2xl"></i>,
    iconBg: 'bg-orange-100/60',
    iconColor: 'text-orange-600',
  },
];

export const servicesData = {
  "services": [
    {
      "id": "bpa",
      "href": "/services/automation",
      "image": "https://readdy.ai/api/search-image?query=Modern%20business%20process%20automation%20workflow%20with%20digital%20systems%20and%20automated%20processes%2C%20clean%20technological%20interface%20showing%20workflow%20optimization%20and%20efficiency%20improvement%2C%20professional%20automation%20dashboard%20with%20interconnected%20processes%20and%20data%20flows%2C%20streamlined%20business%20operations%20with%20digital%20transformation%20elements&width=400&height=300&seq=automation-service&orientation=landscape",
      "iconBg": "bg-blue-50 text-blue-600",
      "iconClass": "ri-flow-chart text-blue-600 text-2xl"
    },
    {
      "id": "crm",
      "href": "/services/crm",
      "image": "https://readdy.ai/api/search-image?query=Professional%20CRM%20implementation%20with%20HubSpot%20dashboard%20interface%2C%20modern%20customer%20relationship%20management%20system%20showing%20sales%20analytics%20and%20customer%20data%2C%20clean%20business%20software%20interface%20with%20CRM%20tools%20and%20customer%20management%20features%2C%20professional%20sales%20team%20using%20CRM%20platform%20for%20business%20growth&width=400&height=300&seq=crm-service&orientation=landscape",
      "iconBg": "bg-orange-50 text-orange-600",
      "iconClass": "ri-customer-service-line text-orange-600 text-2xl"
    },
    {
      "id": "custom",
      "href": "/services/custom",
      "image": "https://readdy.ai/api/search-image?query=Custom%20software%20development%20workspace%20with%20developers%20creating%20tailored%20business%20solutions%2C%20modern%20programming%20environment%20with%20multiple%20monitors%20showing%20code%20and%20applications%2C%20professional%20software%20engineering%20team%20building%20custom%20platforms%20and%20digital%20solutions%2C%20clean%20tech%20workspace%20with%20development%20tools%20and%20custom%20applications&width=400&height=300&seq=development-service&orientation=landscape",
      "iconBg": "bg-purple-50 text-purple-600",
      "iconClass": "ri-code-s-slash-line text-purple-600 text-2xl"
    },
    {
      "id": "integrations",
      "href": "/services/integrations",
      "image": "https://readdy.ai/api/search-image?query=System%20integration%20concept%20with%20multiple%20platforms%20and%20applications%20connected%20through%20APIs%20and%20data%20flows%2C%20modern%20business%20software%20integration%20dashboard%20showing%20connected%20systems%20and%20data%20synchronization%2C%20professional%20IT%20infrastructure%20with%20integrated%20platforms%20and%20seamless%20data%20exchange&width=400&height=300&seq=integration-service&orientation=landscape",
      "iconBg": "bg-indigo-50 text-indigo-600",
      "iconClass": "ri-links-line text-indigo-600 text-2xl"
    },
    {
      "id": "audit",
      "href": "/services/audit",
      "image": "https://readdy.ai/api/search-image?query=Business%20process%20audit%20and%20analysis%20with%20professional%20consultants%20reviewing%20workflows%20and%20efficiency%20metrics%2C%20modern%20office%20environment%20with%20business%20analysts%20examining%20process%20documentation%20and%20performance%20charts%2C%20professional%20audit%20team%20conducting%20business%20process%20evaluation%20with%20data%20analysis%20tools&width=400&height=300&seq=audit-service&orientation=landscape",
      "iconBg": "bg-emerald-50 text-emerald-600",
      "iconClass": "ri-file-search-line text-emerald-600 text-2xl"
    }
  ]
}

export const servicesItems = [
  {
    id: 'bpa',
    href: '/services/automation',
    image: '/images/services/bpa.jpg',
    iconBg: 'bg-blue-50 text-blue-600',
    iconClass: 'ri-flow-chart text-blue-600 text-2xl',
  },
  {
    id: 'crm',
    href: '/services/crm',
    image: '/images/services/crm.jpg',
    iconBg: 'bg-orange-50 text-orange-600',
    iconClass: 'ri-customer-service-line text-orange-600 text-2xl',
  },
  {
    id: 'custom',
    href: '/services/custom',
    image: '/images/services/custom.jpg',
    iconBg: 'bg-purple-50 text-purple-600',
    iconClass: 'ri-code-s-slash-line text-purple-600 text-2xl',
  },
  {
    id: 'integrations',
    href: '/services/integrations',
    image: '/images/services/integrations.jpg',
    iconBg: 'bg-indigo-50 text-indigo-600',
    iconClass: 'ri-links-line text-indigo-600 text-2xl',
  },
  {
    id: 'audit',
    href: '/services/audit',
    image: '/images/services/audit.jpg',
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconClass: 'ri-file-search-line text-emerald-600 text-2xl',
  },
];