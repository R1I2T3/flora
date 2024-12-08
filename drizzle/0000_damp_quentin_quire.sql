CREATE TYPE "public"."action_enum" AS ENUM('CREATE_CONTACT');--> statement-breakpoint
CREATE TYPE "public"."sidebar_icon_enum" AS ENUM('settings', 'chart', 'calendar', 'check', 'chip', 'compass', 'database', 'flag', 'home', 'info', 'link', 'lock', 'messages', 'notification', 'payment', 'power', 'receipt', 'shield', 'star', 'tune', 'videorecorder', 'wallet', 'warning', 'headphone', 'send', 'pipelines', 'person', 'category', 'contact', 'clipboardIcon');--> statement-breakpoint
CREATE TYPE "public"."invitation_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'REVOKED');--> statement-breakpoint
CREATE TYPE "public"."plans_enum" AS ENUM('price_1OYxkqFj9oKEERu1NbKUxXxN', 'price_1OYxkqFj9oKEERu1KfJGWxgN');--> statement-breakpoint
CREATE TYPE "public"."roles_enum" AS ENUM('AGENCY_OWNER', 'AGENCY_ADMIN', 'SUBACCOUNT_USER', 'SUBACCOUNT_GUEST');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "add_ons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"name" text NOT NULL,
	"active" boolean DEFAULT false,
	"priceId" text NOT NULL,
	"agencyId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"agencyId" uuid NOT NULL,
	"status" "invitation_status_enum" DEFAULT 'PENDING',
	"role" "roles_enum" DEFAULT 'SUBACCOUNT_GUEST',
	CONSTRAINT "invitations_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"plan" "plans_enum" NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"price" text,
	"active" boolean DEFAULT false,
	"priceId" text NOT NULL,
	"customerId" text NOT NULL,
	"currentPeriodEndDate" timestamp NOT NULL,
	"subscriptionsId" text NOT NULL,
	"agencyId" uuid NOT NULL,
	CONSTRAINT "subscription_subscriptionsId_unique" UNIQUE("subscriptionsId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "agency" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"connectAccountId" text DEFAULT '' NOT NULL,
	"customerId" text DEFAULT '' NOT NULL,
	"name" text,
	"agencyLogo" text,
	"companyEmail" text,
	"companyPhone" text,
	"whiteLabel" boolean DEFAULT true,
	"address" text,
	"city" text,
	"zipCode" text,
	"state" text,
	"country" text,
	"goal" integer DEFAULT 5,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "agencySideBarOption" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"icon" "sidebar_icon_enum" DEFAULT 'info',
	"link" text DEFAULT '#',
	"agencyId" uuid,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subAccount" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"connectAccountId" text DEFAULT '' NOT NULL,
	"name" text,
	"subAccountLogo" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"companyEmail" text,
	"companyPhone" text,
	"goal" integer DEFAULT 5,
	"address" text,
	"city" text,
	"zipCode" text,
	"state" text,
	"country" text,
	"agencyId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subAccountSideBarOption" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"icon" "sidebar_icon_enum" DEFAULT 'info',
	"link" text DEFAULT '#',
	"subAccountId" uuid,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"access" boolean NOT NULL,
	"subAccountId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"role" "roles_enum" DEFAULT 'SUBACCOUNT_USER',
	"agencyId" uuid,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ClassName" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"funnelId" uuid,
	"customerData" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "funnelPage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"pathname" text DEFAULT '' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"visits" integer DEFAULT 0,
	"content" text,
	"order" integer DEFAULT 0,
	"previewImage" text,
	"funnelId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "funnels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"published" boolean DEFAULT false,
	"subDomainName" text,
	"favicon" text,
	"subAccountId" uuid,
	"liveProducts" text,
	CONSTRAINT "funnels_subDomainName_unique" UNIQUE("subDomainName")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" text NOT NULL,
	"notification" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"subAccountId" uuid NOT NULL,
	"agencyId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ticket" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"laneId" text NOT NULL,
	"order" integer DEFAULT 0,
	"value" real DEFAULT 0,
	"description" text,
	"assignUserId" text,
	"customerId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lane" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"pipelineId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "action" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "action_enum" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"automationId" uuid,
	"laneId" uuid,
	"order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pipeline" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "automatons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"subAccountId" uuid,
	"triggerId" uuid,
	"published" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "triggers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "automation_instance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"automationId" uuid,
	"active" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"subAccountId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text,
	"name" text,
	"link" text,
	"subAccountId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "media_link_unique" UNIQUE("link")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"subAccountId" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subAccount" ADD CONSTRAINT "subAccount_agencyId_agency_id_fk" FOREIGN KEY ("agencyId") REFERENCES "public"."agency"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ClassName" ADD CONSTRAINT "ClassName_funnelId_funnels_id_fk" FOREIGN KEY ("funnelId") REFERENCES "public"."funnels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "funnelPage" ADD CONSTRAINT "funnelPage_funnelId_funnels_id_fk" FOREIGN KEY ("funnelId") REFERENCES "public"."funnels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
