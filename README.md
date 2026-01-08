# 💜 Purple Love Charity Foundation

A responsive, full-stack charity website designed to facilitate donations, volunteer management, and ministry outreach. This project bridges the gap between donors and those in need through a seamless digital experience.

**Live Demo:** [Insert your Vercel Link Here]

## 🚀 Key Features

### 🌐 Frontend (User Experience)
* **Fully Responsive Design:** Optimized for mobile, tablet, and desktop devices.
* **Hero Carousel:** Dynamic image slider showcasing the foundation's impact.
* **Payment Gateway Integration:** Secure, multi-currency donation system (NGN, USD, GBP) powered by **Paystack**.
* **Modern UI/UX:** Built with clean HTML5, CSS3, and JavaScript with a focus on accessibility and brand identity (Purple & Gold theme).

### ⚙️ Backend Automation (n8n Workflow)
This project utilizes a serverless backend architecture to handle form submissions without a traditional database server.
* **Spam Protection:** Custom "Honeypot" logic to filter out bot submissions.
* **Automated Data Entry:** Form data is instantly sanitized and appended to a **Google Sheets** database.
* **Multi-Channel Notifications:**
    * **User:** Receives an instant, personalized auto-reply via **Gmail**.
    * **Admin:** Receives a detailed summary email.
    * **Team:** Receives an urgent real-time alert via **Discord Webhooks**.

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Payments:** Paystack API
* **Automation/Backend:** n8n (Workflow Automation)
* **Database:** Google Sheets
* **Communication:** Gmail SMTP, Discord Webhooks

## 🧩 The Automation Workflow

The contact form is powered by a robust n8n workflow designed to handle data logic:

1.  **Webhook Trigger:** Listens for `POST` requests from the website.
2.  **Security Check:** Evaluates the hidden `bot_check` field. If populated, the workflow terminates (blocking the bot).
3.  **Database Action:** Appends verified data (Name, Email, Subject, Message, Timestamp) to Google Sheets.
4.  **Communication:**
    * Sends a "Thank You" email to the visitor.
    * Sends an "Action Needed" alert to the foundation admins.
    * Pings the internal Discord server for immediate visibility.
5.  **Response:** Returns a `200 OK` JSON response to the frontend to update the UI.

## 📦 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/purple-love-charity.git](https://github.com/your-username/purple-love-charity.git)
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd purple-love-charity
    ```
3.  **Launch:**
    Open `index.html` in your browser.

## 👨‍💻 Author

**Toluwani Akintoye**
* [LinkedIn](https://linkedin.com/in/toluwani-akintoye)

---
*Built with ❤️ for the Purple Love Charity Foundation.*
