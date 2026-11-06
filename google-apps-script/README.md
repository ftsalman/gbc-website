# Lead backend — Google Apps Script + Google Sheets

The website is static (FTP hosting), so the server side of Meta Pixel + Conversions API
runs here instead of Express. `Code.gs` is NOT bundled or deployed by the website build —
it is pasted into Google Apps Script once.

## 1. Create the Sheet + script
1. In the GBC Google Workspace account, create a Google Sheet, e.g. **GBC Website Leads**.
2. **Extensions → Apps Script**. Delete the sample code, paste all of `Code.gs`, save.

## 2. Add the Meta credentials (server-side only)
**Project Settings (gear) → Script Properties → Add property**:

| Property | Value |
|---|---|
| `META_DATASET_ID` | Dataset ID given by GBC Ads |
| `META_ACCESS_TOKEN` | Access token given by GBC Ads |
| `META_API_VERSION` | `v25.0` |
| `META_TEST_EVENT_CODE` | Test Event Code — **only while testing** |
| `NOTIFY_EMAIL` | (optional) `sales@connectgbc.com` — email per lead |

Never put the access token in the React code, a `VITE_` variable, or git.

## 3. Test Meta from the editor
Select `testMetaLead` in the function dropdown → **Run** → approve permissions.
Events Manager → GBC Ads Dataset → **Test Events** should show a Server `Lead`.

## 4. Deploy as web app
**Deploy → New deployment → type: Web app**
- Execute as: **Me**
- Who has access: **Anyone**

Copy the Web app URL (`https://script.google.com/macros/s/.../exec`) into the website `.env`:

```
VITE_LEAD_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
VITE_META_PIXEL_ID=<pixel / dataset id>
```

Then rebuild/redeploy the site (push to `main`).

> After editing `Code.gs` later: **Deploy → Manage deployments → Edit → Version: New version**.
> Otherwise the live URL keeps running the old code.

## 5. End-to-end test (guide step 6)
1. Submit a test enquiry on the website.
2. A row appears in the **Leads** sheet with an Event ID and `Meta CAPI status = sent`.
3. Test Events shows **Browser Lead** and **Server Lead** with the same event ID, deduplicated.
4. **Go live:** delete the `META_TEST_EVENT_CODE` property (no redeploy needed).

## Notes
- If Meta fails, the lead is still saved; the row shows `FAILED: …` so you can see/resend it.
- Apps Script can't read the visitor IP, so CAPI events carry user agent, hashed email/phone/first
  name, and `_fbp`/`_fbc` cookies instead. Match quality is still good.
- Phones are normalised to digits with country code; local UAE numbers like `050…` become `97150…`.
