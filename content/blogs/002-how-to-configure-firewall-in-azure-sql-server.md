---
title: "How to configure firewall in Azure SQL Server"
date: "2019-12-14"
displayModifiedDate: "2026-10-23"
excerpt: "Learn how to allow a trusted public IP address through the Azure SQL Database logical server firewall."
category: "Cloud"
author: "Ramesh Kannan"
coverImage: "/images/blog/002/azure-sql-firewall.png"
tags: ["firewall", "azure-sql-server", "azure-sql-database", "azure"]
---

> **Originally published** on [arasu-rrk.com](https://arasu-rrk.com/blog/how-to-configure-firewall-in-azure-sql-server). The steps below apply to Azure SQL Database, not Azure SQL Managed Instance.

[Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/) uses a logical server with a public endpoint. By default, its server-level firewall blocks connections to that endpoint. To connect from a computer on the internet, add that computer's public IP address as a firewall rule. A server-level rule allows the matching IP address to connect to **all databases on that logical server**.

## Add your public IP address in the Azure portal

1. Sign in to the [Azure portal](https://portal.azure.com/) and open your SQL database or its logical server.
2. From the database overview, select **Set server firewall**. Alternatively, from the logical server overview, select **Networking** under **Settings**.
3. Set **Public network access** to **Selected networks**. Under **Firewall rules**, add a rule for your client's public IP address. If the portal offers to add your current client IP, use that option; otherwise, enter it as both the start and end IP address.
4. To allow a specific range, enter its first and last public IP addresses as the start and end IP. Do not use loopback addresses such as `127.0.0.1`; they are not your internet-facing client IP.
5. Select **Save**. Firewall changes can take several minutes to take effect.

Use the narrowest IP range possible. Avoid allowing every IP address: that exposes the SQL public endpoint to connection attempts from anywhere, so access must rely on authentication and database permissions alone. For private connectivity, consider a [private endpoint](https://learn.microsoft.com/azure/azure-sql/database/private-endpoint-overview) instead of the public endpoint.

## Allow connections from Azure services

If you enable **Allow Azure services and resources to access this server**, Azure SQL adds a firewall rule that allows connections from Azure services across **all Azure subscriptions**, not just services in your subscription. This broad exception is off by default for new logical servers. Enable it only when required; for tighter network access, consider a [private endpoint](https://learn.microsoft.com/azure/azure-sql/database/private-endpoint-overview) or a [virtual network service endpoint](https://learn.microsoft.com/azure/azure-sql/database/vnet-service-endpoint-rule-overview).

For more details and other ways to manage firewall rules, see Microsoft's [IP firewall rules for Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/firewall-configure).
