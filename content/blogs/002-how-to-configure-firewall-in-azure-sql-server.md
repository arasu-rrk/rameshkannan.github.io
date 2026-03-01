---
title: "How to configure firewall in Azure SQL Server?"
date: "2019-12-14"
excerpt: "Learn how to allow your IP address or IP range through the Azure SQL Server firewall so you can connect from outside Azure."
category: "Cloud"
author: "Ramesh Kannan"
coverImage: ""
tags: ["firewall", "azure-sql-server", "azure-sql-database", "azure"]
---

[Azure SQL Server](https://azure.microsoft.com/en-us/services/sql-database) is configured by default to connect to Azure Services alone. If you want to access the Azure SQL Server in your network you have to configure your IP address in Azure SQL Server Firewall.

1. Go to <https://portal.azure.com>

2. Navigate to your Azure SQL Server

3. From the navigation menu, select **Firewalls and virtual networks**

4. Configure your IP address in the page

   a. Click **Add Client IP** option to allow your current IP address in the firewall.

   b. Allow a particular IP address alone. For example `2.2.2.2`. In this case, Start IP and End IP will be the same.

   c. You can allow an IP address range. For example `127.0.0.1 - 127.0.0.5`.

   d. You can allow all IP addresses from `0.0.0.0 - 255.255.255.255`.
      > **NOTE:**
      > If you enter these from/to IP addresses, you can access the SQL Server from any IP address. But this is not preferable.

   e. Enable the option **Allow Azure services and resources to access this server** to allow your services hosted in Azure.
      > **NOTE:**
      > This option enables access to all services and resources (not only your resources) that are hosted in Azure.

5. Once you have configured IP addresses, click **Save** to save your changes.
