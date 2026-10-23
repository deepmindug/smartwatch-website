import { site } from './site'

export type LegalDoc = {
  slug: string
  title: string
  intro: string
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  meta: { title: string; description: string }
}

const address = 'Plot 7, Mundeka Road, Bugolobi, Balenzi Building, 1st Floor, P.O. Box 2359, Kampala, Uganda'

/** Transcribed from smartwatchsolutions.com/privacy-policy/ (contact email normalised to customer support). */
export const privacy: LegalDoc = {
  slug: 'privacy-policy',
  title: 'Privacy policy',
  intro:
    "Welcome to Smartwatch Solutions Ltd! Your privacy matters to us, and we're committed to keeping your information safe and secure while you use our website, www.smartwatchsolutions.com.",
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        "Smartwatch Solutions Ltd is East Africa's leading provider of fleet and mobile asset management solutions.",
        'Founded in 2011, we provide Software-as-a-Service (SaaS) for fleet management, workshop management, and IoT smart solutions that improve safety, security, and productivity.',
        `Address: ${address}`,
        `Email: ${site.email}`,
      ],
    },
    {
      heading: 'Your privacy',
      paragraphs: [
        'We respect your privacy and only collect the information we need to make our website work better for you.',
        'We do not sell, rent, or share your personal data with third parties for marketing.',
        "Here's what we do:",
      ],
      bullets: [
        'We collect information only by fair and lawful means.',
        'We explain why we collect it before or when we do.',
        'We use it only for the reason we collected it.',
        'We keep it safe and protect it from unauthorised access.',
        'We keep it only for as long as needed to serve you better.',
      ],
    },
    {
      heading: 'Cookies: what they are',
      paragraphs: [
        'Like most websites, we use cookies.',
        'Cookies are small text files stored on your device that help the website remember your preferences and improve your browsing experience.',
        'Some cookies are essential for the website to work, while others help us understand how visitors use our site.',
      ],
    },
    {
      heading: 'How we use cookies',
      paragraphs: ['These cookies help us make our website more useful and relevant to you. We use cookies to:'],
      bullets: [
        'Remember your settings and preferences (like language or login).',
        'Improve website performance and user experience.',
        'Understand how visitors interact with our site using analytics tools.',
      ],
    },
    {
      heading: 'Managing or turning off cookies',
      paragraphs: [
        'You can choose to accept or reject cookies through your browser settings.',
        "If you turn them off, some parts of the site may not work properly, but you'll still be able to browse most of it.",
        "You can learn how to manage cookies in your browser's Help section.",
      ],
    },
    {
      heading: 'Third-party cookies',
      paragraphs: [
        'We may use trusted third-party tools like Google Analytics to understand how visitors use our website and improve our services.',
        'These tools collect anonymous usage data, not your personal details. You can learn more at the official Google Analytics privacy page.',
      ],
    },
    {
      heading: 'Email communication',
      paragraphs: [
        "If you sign up to receive updates or newsletters, we'll only send you information related to our services.",
        'You can unsubscribe anytime using the link in our emails.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [`Just email us at ${site.email} and we'll be happy to help. You can contact us anytime to:`],
      bullets: [
        'Ask what information we have about you.',
        'Request a correction or deletion.',
        'Withdraw your consent for future data collection.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'We may update this Cookie & Privacy Policy from time to time. Any changes will be posted on this page with the updated date.',
      ],
    },
    {
      heading: 'Contact us',
      paragraphs: [
        'If you have any questions about this policy or how we handle your data, please contact:',
        `${site.legalName}, ${address}`,
        site.email,
      ],
    },
  ],
  meta: {
    title: 'Privacy policy',
    description:
      'How Smartwatch Solutions Ltd collects, uses and protects your information, and how cookies are used on www.smartwatchsolutions.com.',
  },
}

/** Transcribed from smartwatchsolutions.com/terms-and-conditions/ (contact email normalised to customer support). */
export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms and conditions',
  intro:
    'Welcome to the Smartwatch Solutions Ltd ("Smartwatch Solutions") website, www.smartwatchsolutions.com. By browsing our website you agree to our cookies policy.',
  sections: [
    {
      heading: 'Terms',
      paragraphs: [
        "If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our Privacy Policy govern Smartwatch Solutions' relationship with you in relation to this website. If you do not wish to be bound by these terms, you may not access, display, use, download, copy, or distribute any of the content on this website. Smartwatch Solutions Ltd is East Africa's leading provider of fleet and mobile asset management solutions, established in 2011.",
        `The company's registered address is ${address}. The term "you" refers to the user or viewer of our website.`,
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'This website uses cookies to enhance user experience and improve our services. The information they collect does not identify you personally. You can choose to disable cookies in your browser settings, but this may affect your experience on the website. For more details, please refer to our Privacy Policy.',
        'Cookies may collect information such as:',
      ],
      bullets: ['Browser type and version', 'Device platform', 'Language preference', 'Location (non-identifiable)'],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'Smartwatch Solutions, its directors, employees, partners, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use this website or any information contained herein. You agree to indemnify and hold harmless Smartwatch Solutions from any loss, liability, claim, or expense (including legal fees) arising from your use of the website or violation of these Terms. Unauthorised use of this website may give rise to a claim for damages and/or constitute a criminal offence.',
      ],
    },
    {
      heading: 'Copyright and intellectual property',
      paragraphs: [
        'All material on this website, including design, layout, graphics, text, and software, is owned by or licensed to Smartwatch Solutions Ltd. Reproduction, redistribution, or modification of any content is prohibited without prior written consent. All trademarks reproduced on this website that are not the property of, or licensed to, Smartwatch Solutions are acknowledged on the website. All rights not expressly granted are reserved.',
      ],
    },
    {
      heading: 'Use licence',
      paragraphs: [
        'The content of this website is for general information and use only. Smartwatch Solutions may change the content at any time without notice. Smartwatch Solutions reserves the right, at its discretion, to suspend or terminate access to this website, or to modify software and/or hardware requirements. While we aim for uninterrupted service, there is no guarantee that the website will always be available or error-free.',
        'Your use of this website is subject to the following terms:',
      ],
      bullets: [
        'You agree to use the website for lawful purposes only.',
        "You may not use this website in any way that could damage, disable, overburden, or impair it, or interfere with any other party's use.",
        'You may not gain unauthorised access to other systems, data, or information through this website.',
      ],
    },
    {
      heading: 'External links',
      paragraphs: [
        `This website may include links to other websites for your convenience. These links do not signify endorsement, and Smartwatch Solutions has no control over the content or availability of linked sites. Reliance on external websites is at your own risk. Any organisation wishing to link to this website must first obtain written permission by contacting ${site.email}.`,
      ],
    },
    {
      heading: 'Jurisdiction',
      paragraphs: [
        'Your use of this website and any dispute arising from it shall be governed by the laws of the Republic of Uganda, and you consent to the exclusive jurisdiction of Ugandan courts.',
      ],
    },
    {
      heading: 'Waiver',
      paragraphs: [
        'Failure by Smartwatch Solutions to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.',
      ],
    },
    {
      heading: 'Disclaimer',
      paragraphs: [
        'Smartwatch Solutions makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information contained therein. Your use of any materials or information on this website is entirely at your own risk, and Smartwatch Solutions shall not be liable for any inaccuracies or errors.',
        'The website and all content are provided on an "as is" and "as available" basis. Smartwatch Solutions does not warrant that this website, its servers, or any emails sent are free from viruses or other harmful components.',
      ],
    },
    {
      heading: 'Privacy policy',
      paragraphs: [
        `Smartwatch Solutions values your privacy. Please read our Privacy Policy (available on the website) for details on how we collect, use, and protect your personal information. For any privacy-related queries, you can contact us at ${site.email}.`,
        'We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.',
        'Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.',
        'We will collect and use personal information solely for fulfilling those purposes specified by us and for other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.',
        'Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.',
        'We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorised access, disclosure, copying, use or modification.',
        'We will only retain personal information for as long as necessary for the fulfilment of those purposes.',
        'Smartwatch Solutions welcomes constructive feedback but reserves the right to remove or disregard unlawful, defamatory, or inappropriate submissions.',
        "Thank you for visiting Smartwatch Solutions Ltd's website. Need more information? Contact us.",
      ],
    },
  ],
  meta: {
    title: 'Terms and conditions',
    description: 'The terms and conditions of use for the Smartwatch Solutions Ltd website, www.smartwatchsolutions.com.',
  },
}
