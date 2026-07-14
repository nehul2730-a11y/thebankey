# Unified Google Sheets Integration Guide

This document explains how to configure a single Google Sheet and a unified Google Apps Script to collect submissions from **both** the **Careers (Join Employee) Form** and the **Contact Us Form**.

---

## How It Works

The React application sends form submissions as JSON payloads to a single deployed Google Apps Script Web App. The script analyzes the payload:
- If the payload contains **Contact Form** fields (`subject` or `message`), it appends a row to a tab named **"Contact Messages"** (creating it automatically if needed).
- Otherwise, it treats it as a **Careers Form** submission and appends a row to a tab named **"Employee Applications"**.

---

## Step-by-Step Setup

### Step 1: Open Your Google Sheet
1. Open your existing Google Sheet (e.g., "Employee Applications").
2. Ensure the first tab is named **"Employee Applications"** and has these exact column headers in Row 1:
   - `Full Name` (A)
   - `Email` (B)
   - `Phone` (C)
   - `Position` (D)
   - `Experience` (E)
   - `Cover Letter` (F)
   - `Resume File` (G)
   - `Timestamp` (H)

*(Note: The script will automatically create a second tab named **"Contact Messages"** with `Timestamp`, `Name`, `Email`, `Subject`, and `Message` headers once the first contact message is submitted.)*

---

### Step 2: Paste the Unified Apps Script Code
1. In your Google Sheet, click **Extensions > Apps Script** in the top menu.
2. Delete any existing code in the editor (`Code.gs`) and paste the following unified script:

```javascript
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    // 1. Check if the submission is a Contact Form message
    if (data.subject !== undefined || data.message !== undefined) {
      let sheet = ss.getSheetByName("Contact Messages");
      
      // Create Contact Messages tab if it doesn't exist
      if (!sheet) {
        sheet = ss.insertSheet("Contact Messages");
        sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);
        // Bold the headers
        sheet.getRange("A1:E1").setFontWeight("bold");
      }
      
      const row = [
        data.timestamp || new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.subject || '',
        data.message || ''
      ];
      
      sheet.appendRow(row);
      
    } else {
      // 2. Otherwise, treat as Careers / Job Application form
      let sheet = ss.getSheetByName("Employee Applications");
      
      // Fallback to active sheet if the renamed tab isn't found
      if (!sheet) {
        sheet = ss.getActiveSheet();
      }
      
      const row = [
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.position || '',
        data.experience || '',
        data.coverLetter || '',
        data.resumeFileName || '',
        data.timestamp || new Date().toISOString()
      ];
      
      sheet.appendRow(row);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET endpoint to verify connection
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'OK', message: 'Unified spreadsheet script is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

### Step 3: Deploy/Re-deploy as a Web App
1. In the upper-right corner of the Apps Script editor, click **Deploy > New deployment** (or **Manage deployments > Edit** if updating an existing deployment).
2. Choose **Web app** as the type.
3. Configure the settings:
   - **Description**: "Unified Forms Endpoint"
   - **Execute as**: "Me" (your email address)
   - **Who has access**: "Anyone"
4. Click **Deploy**. (Authorise access if prompted by Google).
5. Copy the generated **Web App URL** (looks like `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Configure the React Application `.env`
1. Open the `.env` file in the root of your project.
2. Paste the **same** Web App URL to both variables:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/your-deployed-script-id/exec
VITE_CONTACT_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/your-deployed-script-id/exec
```

3. Save the file and restart your React development server.

---

## Troubleshooting & FAQ

- **Why are contact entries empty on the Careers tab?**
  This happens if you submit the Contact Form to the older Apps Script code that doesn't route entries. Make sure you copy-paste the new code block above into your Apps Script editor and deploy it as a **New Version**.
- **Can I use separate spreadsheets?**
  Yes! If you want separate spreadsheets, deploy the script separately on each spreadsheet, and input their distinct Web App URLs into their respective environment variables in `.env`.