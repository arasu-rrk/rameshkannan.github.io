---
title: "How to Send Email Using SendGrid SMTP"
date: "2019-12-15"
modifiedDate: "2026-10-28T00:26:59+00:00"
displayModifiedDate: "2026-10-27"
excerpt: "Configure SendGrid SMTP email delivery: create a restricted API key, set the SMTP host and port, and connect your application to SendGrid's transactional email relay."
category: "Technical"
author: "Ramesh Kannan"
coverImage: "/images/blog/003/sendgrid-smtp.webp"
tags: ["sendgrid", "SendGrid SMTP", "SMTP", "SendGrid SMTP integration", "SendGrid SMTP server"]
---

> **Originally published** on [arasu-rrk.com](https://arasu-rrk.com/blog/how-to-send-an-smtp-mail-using-sendgrid).

[SendGrid](https://sendgrid.com) (now owned by [Twilio](https://www.twilio.com)) is used by some of the biggest names in the industry such as Uber, Spotify, Yelp, Airbnb, and Kinsta. It originally started as a transactional email SMTP and API service designed for developers. They also offer email marketing features.

1. Go to <https://app.sendgrid.com/settings/api_keys>

2. Click **Create API Key**.

3. From the dialog select **Restricted Access**.

4. Enable the option **Mail Send → Mail Send**.

5. Once the API key is generated, keep it in a safe place. You cannot retrieve the same key again — you would need to regenerate a new one.

6. Use the following SMTP configuration in your application:

| Field    | Value                                                     |
|----------|-----------------------------------------------------------|
| Host     | `smtp.sendgrid.net`                                       |
| Port     | `587` or `465` (SSL)                                      |
| Username | `apikey` (Yes, **apikey** is the username for all accounts) |
| Password | API key generated in the above steps                      |

## Code Samples

- [.NET](https://github.com/arasu-rrk/sendgrid-smtp-client/tree/master/src/dotnet)
- [Python](https://github.com/arasu-rrk/sendgrid-smtp-client/tree/master/src/python)

## SendGrid Documentation

- [Send email with SMTP](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/getting-started-smtp)
- [Create and manage API keys](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/api-keys)
