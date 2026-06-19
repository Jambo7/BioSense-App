import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandWordmark } from '@/components/brand-mark'

export const metadata: Metadata = {
  title: 'Privacy Policy — BioSense',
  description:
    'How BioSense collects, uses, stores and protects your health, wearable and account data.',
}

const LAST_UPDATED = '17 June 2026'
const CONTACT_EMAIL = 'privacy@bio-sense.ai'
// Replace with your registered legal entity name once confirmed.
const LEGAL_ENTITY = 'BioSense'

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-24">
      <h2 className="font-sans text-h2 text-ink mb-3">{title}</h2>
      <div className="space-y-3 text-body text-ink-2 leading-relaxed">{children}</div>
    </section>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-sand">
      <header className="border-b border-line">
        <div className="mx-auto max-w-[760px] px-6 py-6 flex items-center justify-between">
          <Link href="/" aria-label="BioSense home">
            <BrandWordmark height={24} priority />
          </Link>
          <span className="text-caption text-ink-3">Privacy Policy</span>
        </div>
      </header>

      <article className="mx-auto max-w-[760px] px-6 py-12">
        <p className="text-eyebrow uppercase text-sage-deep">Legal</p>
        <h1 className="font-sans text-display text-ink mt-2 mb-3">Privacy Policy</h1>
        <p className="text-caption text-ink-3">Last updated: {LAST_UPDATED}</p>

        <p className="mt-6 text-body text-ink-2 leading-relaxed">
          This Privacy Policy explains how {LEGAL_ENTITY} (&ldquo;BioSense&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, shares and protects your
          information when you use the BioSense application and related services (the
          &ldquo;Service&rdquo;). BioSense provides educational health insights only and does
          not provide medical advice, diagnosis or treatment. We take the privacy of your
          health data seriously and only process it to deliver the Service to you.
        </p>

        <Section id="information-we-collect" title="1. Information we collect">
          <p>We collect the following categories of information:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account information.</strong> Name, email address, password (stored in
              hashed form), and basic profile details such as date of birth, sex and health
              goals that you provide during onboarding.
            </li>
            <li>
              <strong>Wearable &amp; health data.</strong> With your explicit consent, we
              receive data from connected devices and services (for example WHOOP, Oura,
              Garmin, Fitbit, Apple Health and similar) via our data aggregation partner,
              Terra. This may include heart rate, heart-rate variability (HRV), resting heart
              rate, sleep, recovery, strain, steps, workouts and related metrics.
            </li>
            <li>
              <strong>Biomarker &amp; blood-test data.</strong> Information you upload or enter
              about blood results and other biomarkers.
            </li>
            <li>
              <strong>Daily check-ins.</strong> Self-reported information such as mood, energy,
              sleep quality and lifestyle inputs.
            </li>
            <li>
              <strong>Usage &amp; device data.</strong> Log data, app interactions, and basic
              technical information (such as device type and IP address) used to operate and
              secure the Service.
            </li>
          </ul>
        </Section>

        <Section id="how-we-use" title="2. How we use your information">
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide the Service, including calculating your personalised health score and insights.</li>
            <li>To sync, store and display data from your connected wearables and uploads.</li>
            <li>To operate, maintain, secure and improve the Service.</li>
            <li>To communicate with you about your account and important changes.</li>
            <li>To comply with our legal obligations.</li>
          </ul>
          <p>
            We do <strong>not</strong> sell your personal or health data, and we do not use it
            for third-party advertising.
          </p>
        </Section>

        <Section id="legal-bases" title="3. Legal bases for processing">
          <p>
            Where the UK/EU General Data Protection Regulation (GDPR) or comparable laws apply,
            we rely on the following legal bases: your <strong>explicit consent</strong> for
            processing health and wearable data; <strong>performance of a contract</strong> to
            provide the Service you sign up for; and our <strong>legitimate interests</strong>{' '}
            in operating and securing the Service. You may withdraw consent at any time (see
            &ldquo;Your rights&rdquo; below).
          </p>
        </Section>

        <Section id="connected-services" title="4. Connected devices &amp; third-party services">
          <p>
            When you connect a wearable or health account, you authorise that provider to share
            data with us through Terra. The connection uses secure OAuth, and we never receive
            your provider login credentials. You can disconnect a provider at any time from
            within the app or from the provider&rsquo;s own settings, which stops further data
            from being shared. For WHOOP specifically, you can revoke access in your WHOOP
            account settings.
          </p>
        </Section>

        <Section id="sharing" title="5. How we share information">
          <p>We share information only with:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Service providers (processors)</strong> who help us run the Service, such
              as Terra (wearable data aggregation), our cloud hosting and database providers,
              and providers that power our AI insights. These parties process data only on our
              instructions and under contract.
            </li>
            <li>
              <strong>Legal &amp; safety</strong> recipients, where required by applicable law
              or to protect the rights and safety of users.
            </li>
          </ul>
          <p>We do not sell or rent your data to anyone.</p>
        </Section>

        <Section id="security" title="6. Data storage &amp; security">
          <p>
            Data is encrypted in transit and stored with reputable cloud infrastructure
            providers. We apply access controls, authentication and other safeguards designed to
            protect your information. No method of transmission or storage is completely secure,
            but we work to protect your data using industry-standard measures.
          </p>
        </Section>

        <Section id="retention" title="7. Data retention">
          <p>
            We retain your information for as long as your account is active or as needed to
            provide the Service. When you delete your account, we delete or anonymise your
            personal and health data within a reasonable period, except where we are required to
            retain certain records by law.
          </p>
        </Section>

        <Section id="your-rights" title="8. Your rights">
          <p>
            Depending on your location (including under UK/EU GDPR and applicable UAE/DIFC data
            protection law), you may have the right to access, correct, delete, export or
            restrict processing of your personal data, and to withdraw consent. To exercise any
            of these rights, contact us at{' '}
            <a className="text-sage-deep underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section id="deleting-data" title="9. Deleting your data">
          <p>
            You can request deletion of your account and associated data at any time from within
            the app or by emailing{' '}
            <a className="text-sage-deep underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            . Disconnecting a wearable stops new data from being collected from that provider.
          </p>
        </Section>

        <Section id="international" title="10. International transfers">
          <p>
            Your information may be processed in countries other than where you live. Where we
            transfer data internationally, we use appropriate safeguards as required by
            applicable law.
          </p>
        </Section>

        <Section id="children" title="11. Children">
          <p>
            The Service is not directed to children under 16, and we do not knowingly collect
            data from them. If you believe a child has provided us data, please contact us so we
            can remove it.
          </p>
        </Section>

        <Section id="changes" title="12. Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. We will post the updated version
            here and revise the &ldquo;Last updated&rdquo; date above. Material changes will be
            communicated through the Service where appropriate.
          </p>
        </Section>

        <Section id="contact" title="13. Contact us">
          <p>
            If you have questions about this Privacy Policy or how we handle your data, contact
            us at{' '}
            <a className="text-sage-deep underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <p className="mt-12 text-micro text-ink-3 leading-relaxed">
          BioSense provides educational health insights only. It does not provide medical advice,
          diagnosis or treatment. Always consult a qualified healthcare professional.
        </p>
      </article>
    </main>
  )
}
