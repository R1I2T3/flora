import {
  Html,
  Head,
  Font,
  Row,
  Section,
  Text,
  Link,
} from "@react-email/components";
import React from "react";
interface VerificationEmailProps {
  purpose: string;
  url: string;
}

export default function VerificationEmail({
  purpose,
  url,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Link href={url}>Here&apos;s your verification Link: click here</Link>
      <Section>
        <Row>
          <Text>{purpose}</Text>
        </Row>
        <Row>
          <Link>{url}</Link>
        </Row>
      </Section>
    </Html>
  );
}
