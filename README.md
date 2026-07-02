# Ashikur Rahman Likhon — Portfolio

Django REST Framework backend + React (Vite) frontend. Elegant, professional
design with a signature touch: the site is framed around the real language of
a REST API developer — `GET /projects`, `POST /contact` — used as section
labels throughout, plus a hero panel that "types out" a live JSON response.

All your CV content (experience, projects, skills, education, achievements)
is already loaded into the database. Everything else — new projects, blog
posts, editing your bio — is managed through the Django admin, no code
required.

## Project structure

```
portfolio/
├── backend/     Django + DRF API (SQLite database, already seeded)
└── frontend/    React app (Vite)
```

## 1. Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver 8000
```

The database (`db.sqlite3`) already has your CV content loaded and an admin
user is already created:

- **Admin URL:** http://127.0.0.1:8000/admin/
- **Username:** `admin`
- **Password:** `admin123`

⚠️ Change that password immediately (`python manage.py changepassword admin`)
before you ever deploy this anywhere public.

If you ever want to wipe and reseed the sample content:

```bash
python manage.py seed_data
```

(Careful — this deletes and recreates Profile/Skills/Experience/Projects/
Education/Achievements/Blog rows. It does not touch contact messages.)

## 2. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. The frontend talks to the API at
`http://127.0.0.1:8000/api` (configured in `frontend/src/api/client.js` —
change `API_BASE` there if you deploy the backend elsewhere).

Both servers need to be running at the same time for the site to show data.

## 3. Editing your content

Go to http://127.0.0.1:8000/admin/ and log in. From there you can:

- **Profile** — edit your name, title, bio, contact links, availability
- **Skill groups / Skills** — add or reorder your toolbox
- **Experience** — add jobs, each with its own bullet-point highlights
- **Projects** — add/edit projects, mark ones as "featured" to show on the homepage
- **Education / Achievements**
- **Blog posts** — the three placeholder posts are yours to rewrite; write in
  plain paragraphs, separated by a blank line
- **Contact messages** — read-only inbox of everything submitted through your
  site's contact form

Anything you add in admin shows up on the site immediately (just refresh).

## 4. Before you deploy

- Change `SECRET_KEY` in `backend/core/settings.py`
- Set `DEBUG = False` and set `ALLOWED_HOSTS` properly
- Change the admin password
- Update `CORS_ALLOWED_ORIGINS` in settings.py to your real frontend domain
- Update `API_BASE` in `frontend/src/api/client.js` to your real backend domain
- Run `npm run build` in `frontend/` to produce a static `dist/` folder you
  can deploy to Vercel/Netlify (or serve via Django + whitenoise)
- Typical backend hosts: Railway, Render, PythonAnywhere

## Notes

- Your CV didn't include a LinkedIn URL, only the text "LinkedIn" — I set a
  placeholder (`linkedin.com/in/ashikur-rahman-likhon`) in the seed data.
  Update it in Django admin under **Profile**.
- The "Online Shop System" and "E-Learning Platform API" projects are marked
  `archived` (no live demo links in your CV) rather than `live` — change the
  status in admin if that's not accurate.
