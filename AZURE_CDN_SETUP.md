# Azure CDN Setup Guide

This guide explains how to configure the GitHub Action to upload assets to Azure CDN.

## Prerequisites

1. An Azure account with an active subscription
2. An Azure Storage Account configured for static website hosting
3. (Optional) An Azure CDN Profile and Endpoint pointing to the storage account

## Required GitHub Secrets

Configure the following secrets in your GitHub repository (Settings → Secrets and variables → Actions):

### Required Secrets

- `AZURE_CREDENTIALS` - Azure service principal credentials in JSON format:
  ```json
  {
    "clientId": "<GUID>",
    "clientSecret": "<STRING>",
    "subscriptionId": "<GUID>",
    "tenantId": "<GUID>"
  }
  ```

- `AZURE_STORAGE_ACCOUNT` - Name of your Azure Storage Account

- `AZURE_STORAGE_KEY` - Access key for your Azure Storage Account

- `AZURE_RESOURCE_GROUP` - Name of the Azure Resource Group

### Optional Secrets (for CDN cache purging)

- `AZURE_CDN_PROFILE` - Name of your Azure CDN Profile

- `AZURE_CDN_ENDPOINT` - Name of your Azure CDN Endpoint

## Azure Setup Steps

### 1. Create Azure Storage Account

```bash
# Create resource group
az group create --name cdn-fundamentals-rg --location eastus

# Create storage account
az storage account create \
  --name cdnfundamentals \
  --resource-group cdn-fundamentals-rg \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2

# Enable static website hosting
az storage blob service-properties update \
  --account-name cdnfundamentals \
  --static-website \
  --index-document index.html
```

### 2. Create Service Principal

```bash
# Create service principal with contributor access
az ad sp create-for-rbac \
  --name "cdn-fundamentals-github-action" \
  --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/cdn-fundamentals-rg \
  --sdk-auth
```

Copy the JSON output and save it as the `AZURE_CREDENTIALS` secret.

### 3. (Optional) Create Azure CDN

```bash
# Create CDN profile
az cdn profile create \
  --name cdn-fundamentals-profile \
  --resource-group cdn-fundamentals-rg \
  --sku Standard_Microsoft

# Create CDN endpoint
az cdn endpoint create \
  --name cdn-fundamentals-endpoint \
  --profile-name cdn-fundamentals-profile \
  --resource-group cdn-fundamentals-rg \
  --origin cdnfundamentals.z13.web.core.windows.net
```

## How It Works

The GitHub Action workflow automatically uploads files from the `assets/` directory to Azure Storage whenever:

1. Changes are pushed to the `main` or `copilot/create-basic-react-app` branch that affect files in the `assets/` directory
2. The workflow is manually triggered via workflow_dispatch

The workflow performs the following steps:

1. Checks out the repository
2. Authenticates with Azure
3. Uploads all files from the `assets/` directory to the `$web` container in Azure Storage
4. (Optional) Purges the CDN cache to ensure the latest content is served
5. Logs out from Azure

## Accessing Your Assets

After the workflow completes, your assets will be available at:

- **Storage URL**: `https://<STORAGE_ACCOUNT>.z13.web.core.windows.net/<filename>`
- **CDN URL** (if configured): `https://<CDN_ENDPOINT>.azureedge.net/<filename>`

Example: `https://cdnfundamentals.z13.web.core.windows.net/sample-image.svg`
