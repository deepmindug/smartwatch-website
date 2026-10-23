import { img, site } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'site-management',
  kind: 'solution',
  name: 'Site Management',
  short: 'Monitor equipment and access on construction and industrial sites.',
  hero: {
    eyebrow: 'Solutions · Site Management',
    title: 'Centralizing remote infrastructure for sites looking to optimize operational costs.',
    intro:
      'Site Management gives you overarching visibility of every one of your sites and remote assets, including their performance and any potential malfunctions that might occur.',
    tone: 'dark',
    media: img.siteTelecomTowers,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      eyebrow: 'Practical applications',
      title: 'Practical applications.',
      columns: 3,
      items: [
        {
          title: 'Energy optimization',
          image: site.energyOptimization,
          body: 'Smartwatch enables your organization to optimize your energy usage by securing active control over batteries’ charge/discharge status, and dynamic control through behavioural prediction mechanisms, for sites with multiple energy sources.',
        },
        {
          title: 'Remote management',
          image: site.remoteManagement,
          body: 'With Smartwatch, your organization can gain control over your remote energy assets, with speed and ease. Our products and solutions allow you to remotely sync and fix configuration issues across your site network, and receive regular reports, allowing for real-time response.',
        },
        {
          title: 'Operational cost savings',
          image: site.operationalCostSavings,
          body: 'Our full suite of products and solutions provides your organization with the ability to reduce fuel costs, improve asset durability and warranty, and fix common malfunctions from any remote location, generating significant operational cost savings.',
        },
        {
          title: 'Overarching visibility',
          image: site.overarchingVisibility,
          body: 'Our live map view of remote assets and sites and real-time alerts on site malfunctions and incidents empower site managers and owners to track individual site and asset performance along with that of the entire network, and make important decisions, ever in the know.',
        },
        {
          title: 'Energy asset health',
          image: site.energyAssetHealth,
          body: 'Smartwatch enables you to maintain the health of your energy assets for the long term. Our battery behaviour analysis, exception alerts and operating recommendations reduce the need for physical visits to the site, while extending your assets’ warranties.',
        },
        {
          title: 'Sustainability outlook',
          image: site.sustainabilityOutlook,
          body: 'With Smartwatch, your organization can lead the way towards more sustainable operations. Our solutions allow you to identify your organization’s most-polluting sites, track major carbon KPIs, and understand how the renewables you use on site actually reduce carbon emissions.',
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Optimize operations.',
      body: 'Overcoming uptime, continuity, malfunction detection and mitigation, and operational cost challenges at remote sites is time intensive. It requires a way to organize and display your remote infrastructure in a centralized place.',
      points: [
        {
          title: 'Overarching visibility of all your sites and remote assets',
          body: 'Site Management provides overarching visibility of every one of your sites and remote assets, including their performance and any potential malfunctions that might occur.',
        },
        {
          title: 'Comprehensive monitoring capabilities',
          body: 'Our Site Management solution includes the monitoring of doors, antenna lights in the case of telecom sites, security cameras, and other security and regulatory assets.',
        },
        {
          title: 'Live alerts, when you need them most',
          body: 'Live alerts are deployed in the event of any unexpected or forced entries, or outages detected by our broad network of sensors, to ensure speedy and efficient incident resolution.',
        },
      ],
      mediaLabel: 'technician checking a telecom site',
      media: img.siteTowerTechnician,
    },
    {
      kind: 'beforeAfter',
      id: 'generator-monitoring',
      eyebrow: 'How we enable your organization',
      title: 'Generator Monitoring',
      media: site.generatorMonitoring,
      body: 'Data-driven insights for peak generator performance. Generators – diesel or hybrid – are heavily relied upon in a variety of industrial use cases because they provide immediate power to remote sites and facilities. Our Generator Monitoring Module ensures that all your generators are properly installed, use the right voltage, run efficiently, and are not suffering from overuse. By tracking a wide variety of KPIs including efficiency, carbon emissions, active time, fuel costs and fuel usage, we enable active analysis and benchmarking across all of your assets. This module also provides predictive real-time alerts for any maintenance needs and malfunctions, driving efficiency, performance, and durability while reducing operational costs, all from the comfort of your office.',
      before: [
        'Generator usage and performance remains a mystery',
        'Fuel consumption and theft is a constant pain point',
      ],
      after: [
        'Automated reporting on sustainability and efficiency',
        'Fuel usage analysis tracks costs and projects refuels',
        'Programmable alerts to detect and resolve theft',
        'Active remote control easily activates, disables, or configures assets',
      ],
    },
    {
      kind: 'beforeAfter',
      id: 'analytics',
      eyebrow: 'Site Management module',
      title: 'Smartwatch Analytics',
      media: site.analytics,
      body: 'Unprecedented insights into your operations. Smartwatch Analytics transforms the data on your operations into actionable insights. Using the live cloud data and historical data collected from your facilities, we weave a story that identifies and highlights trends and anomalies and then summarize the results in periodic reports. Analytics is also where predictive alerts for maintenance issues and abnormal activity onsite begin – this is the product that makes your data work for you.',
      before: [
        'Disorganized remote data collection from various assets',
        'Detecting trends and potential issues over time is not possible',
        'Optimization of operations is reduced to guesswork',
        'Alerts, if implemented, are only raised after the fact and/or onsite',
      ],
      after: [
        'Data collection and live tracking are structured in a simple, visual interface',
        'Trends and anomalies in collected data are identified and highlighted',
        'Optimizations are based on KPI data and advanced modeling',
        'Predictive alerts prevent unexpected downtime and malfunctions',
      ],
    },
    {
      kind: 'beforeAfter',
      id: 'live',
      eyebrow: 'Site Management module',
      title: 'Smartwatch Live',
      media: site.live,
      body: 'Standardized data storage and reporting. Smartwatch Live provides users with data storage capabilities while standardizing the information collected. The platform is also able to create real-time logic-based flags and alarms according to the customer’s needs, giving users the controls they need to create live alerts to abnormal behaviour or potential malfunctions. Agnostic by nature, Smartwatch Live is the core of the digital twin that is created from standardized data, and from which actionable insights are gathered using advanced analytics. As such, data flow, collection, alert rules and proper data storage are better organized and streamlined for every site, in any configuration. Our solution also includes periodic reports and real-time push notifications for stakeholders.',
      before: [
        'Alerts are only detectable when physically onsite',
        'Periodic performance reviews performed via audit',
        'Lack of data standardization and proper storage',
        'Remote assets are limited to text-based status updates',
      ],
      after: [
        'Live alerts are provided through our web and mobile platforms',
        'Template-based and custom reports that focus solely on actionable data',
        'Intelligent data storage and organization',
        'A visual platform to monitor remote infrastructure with a map overlay, in real time',
      ],
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.product('sustainability'),
        routes.product('maintenance'),
        routes.solution('oil-and-gas'),
        routes.solution('communications-technology'),
      ],
    },
  ],
  meta: {
    title: 'Site Management',
    description:
      'Site Management gives you overarching visibility of every one of your sites and remote assets, including their performance and any potential malfunctions.',
  },
}
