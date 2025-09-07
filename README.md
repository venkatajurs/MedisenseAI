# 🧠 MedSenseAI – AI-Powered Personal Health Dashboard

MedSenseAI is an intelligent health companion that helps users **upload, analyze, and track their medical reports**.  
It leverages **AI summarization** and structured **health parameter extraction** to provide insights, risk levels, and personalized recommendations – empowering people to take control of their health.

---

## 🚀 Features

- 📂 **Upload Medical Reports** (PDF/Text/JSON)
- 🔍 **AI Summarization** of reports using OpenRouter LLMs
- 📊 **Extracted Parameters**: cholesterol, glucose, BMI, BP, and more
- 🧾 **Insights & Recommendations**: diet, lifestyle, exercise
- 📅 **Reminders & Notifications**
- 👤 **User Profile**: age, gender, habits, family history
- 📈 **Dashboard View** for all reports with trends and health score
- 🔐 **API Key Integration** with `.env.local` for secure usage
- 🌍 **Deployment Ready** (Netlify, Vercel, AWS, GCP)

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite + SWC) + TailwindCSS + shadcn/ui  
- **PDF Parsing**: `pdfjs-dist`  
- **AI Integration**: OpenRouter API (LLM-based summarization & analysis)  
- **State Management**: React Context API (`HealthContext.tsx`)  
- **Deployment**: Netlify (with environment variables)  

---


