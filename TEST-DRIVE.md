# Test Drive connection locally

1. Create a Drive folder `PTRA Committee Inbox`.
2. Copy the folder id from  
   `https://drive.google.com/drive/folders/FOLDER_ID`
3. Google Cloud → enable **Google Drive API** → Service account → JSON key.
4. Share the folder with the service account `client_email` as **Editor**.
5. In the project root create `.env.local`:

```
ADMIN_EMAIL_1=you@email.com
ADMIN_EMAIL_2=other@email.com
ADMIN_PASSWORD=at-least-8-chars
GOOGLE_DRIVE_FOLDER_ID=FOLDER_ID
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...whole key...}
```

6. Restart:

```
npm run dev
```

7. Open `/apply`, send a short clean note.
8. Refresh the Drive folder — a `.json` should appear.
9. Open `/admin`, sign in, see the card in **Inbox**.
10. Click **Approve → Jobs** or **Approve → Advertise**, then check `/jobs` or `/advertise`.

If step 7 says Drive is not connected, the JSON key is not one line / folder is not shared with that `client_email`.
