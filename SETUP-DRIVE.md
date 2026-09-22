# Storage is Google Drive only

No Gmail password. No database.

Each form creates files in **your** Drive folder:

- a `.json` note (name, phone, email, topic, message)
- the Jobs PDF/Word file, when one is attached

`/admin` reads that folder after the two committee emails sign in.

## Local `.env.local`

```
ADMIN_EMAIL_1=
ADMIN_EMAIL_2=
ADMIN_PASSWORD=

GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_SERVICE_ACCOUNT_JSON=
```

`GOOGLE_SERVICE_ACCOUNT_JSON` is the **entire** downloaded JSON key, usually on one line.

## Drive steps

1. Create a folder, e.g. `PTRA Committee Inbox`.
2. Copy the id from  
   `https://drive.google.com/drive/folders/FOLDER_ID`
3. Google Cloud → enable **Drive API** → Service account → JSON key.
4. Share the folder with the service account `client_email` as **Editor**.
5. Restart `npm run dev`.

You will see new files appear in that folder after a test submit. Same two Drive vars go in Vercel for production.
