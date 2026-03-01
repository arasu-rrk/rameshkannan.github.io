---
title: "How to send an SMTP mail using SendGrid?"
date: "2019-12-15"
excerpt: "Set up SendGrid's SMTP relay in minutes — create a restricted API key with mail send permissions and plug in the credentials."
category: "Technical"
author: "Ramesh Kannan"
coverImage: ""
tags: ["sendgrid", "smtp", "csharp"]
---

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

## Code Sample

A sample C# application is available at:

<https://github.com/arasu-rrk/sendgrid-smtp-client>
